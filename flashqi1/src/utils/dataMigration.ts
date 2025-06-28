import { OptimizedSpacedRepetitionService } from '@/services/optimizedSpacedRepetition';

interface LegacySpacedRepetitionData {
  [cardId: string]: {
    lastReviewed: number | null;
    status: 'new' | 'known' | 'due';
    reviewCount: number;
    intervalDays: number;
  };
}

export class DataMigration {
  private static readonly LEGACY_KEY = 'flashqi-spaced-repetition';
  private static readonly MIGRATION_KEY = 'flashqi-migration-completed';

  /**
   * Check if migration has been completed
   */
  static isMigrationCompleted(): boolean {
    return localStorage.getItem(this.MIGRATION_KEY) === 'true';
  }

  /**
   * Get legacy data from localStorage
   */
  static getLegacyData(): LegacySpacedRepetitionData | null {
    try {
      const data = localStorage.getItem(this.LEGACY_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading legacy data:', error);
      return null;
    }
  }

  /**
   * Migrate legacy localStorage data to Supabase
   */
  static async migrateLegacyData(): Promise<boolean> {
    try {
      // Check if migration already completed
      if (this.isMigrationCompleted()) {
        console.log('Migration already completed');
        return true;
      }

      const legacyData = this.getLegacyData();
      if (!legacyData || Object.keys(legacyData).length === 0) {
        console.log('No legacy data to migrate');
        this.markMigrationCompleted();
        return true;
      }

      console.log(`Migrating ${Object.keys(legacyData).length} card records...`);

      // Convert legacy data to new format and batch update
      const updates = Object.entries(legacyData).map(([cardId, data]) => ({
        card_id: cardId,
        is_correct: data.status === 'known', // Approximate - 'known' means last review was correct
        strength_level: 'medium' as const // Default to medium
      }));

      // Process in batches of 10
      const batchSize = 10;
      for (let i = 0; i < updates.length; i += batchSize) {
        const batch = updates.slice(i, i + batchSize);
        
        // Queue each update
        batch.forEach(update => {
          OptimizedSpacedRepetitionService.queueReviewUpdate(update);
        });
        
        // Wait a bit between batches to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Force sync to ensure all updates are sent
      await OptimizedSpacedRepetitionService.forceSync();

      // Mark migration as completed
      this.markMigrationCompleted();
      
      // Clear legacy data
      localStorage.removeItem(this.LEGACY_KEY);
      
      console.log('Migration completed successfully');
      return true;
    } catch (error) {
      console.error('Migration failed:', error);
      return false;
    }
  }

  /**
   * Mark migration as completed
   */
  private static markMigrationCompleted(): void {
    localStorage.setItem(this.MIGRATION_KEY, 'true');
  }

  /**
   * Reset migration status (for testing)
   */
  static resetMigrationStatus(): void {
    localStorage.removeItem(this.MIGRATION_KEY);
  }

  /**
   * Auto-migrate on app start if needed
   */
  static async autoMigrate(): Promise<void> {
    try {
      if (!this.isMigrationCompleted()) {
        console.log('Starting automatic data migration...');
        await this.migrateLegacyData();
      }
    } catch (error) {
      console.error('Auto-migration failed:', error);
    }
  }
} 