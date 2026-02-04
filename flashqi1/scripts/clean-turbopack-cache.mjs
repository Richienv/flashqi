import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const turbopackCacheDir = path.join(root, ".next", "dev", "cache", "turbopack");

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function removeAppleDoubleFiles(dir) {
  let removed = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += await removeAppleDoubleFiles(fullPath);
      continue;
    }
    if (entry.name.startsWith("._")) {
      await fs.unlink(fullPath);
      removed += 1;
    }
  }
  return removed;
}

async function main() {
  if (!(await pathExists(nextDir))) {
    return;
  }

  const removed = await removeAppleDoubleFiles(nextDir);

  if (removed > 0 && (await pathExists(turbopackCacheDir))) {
    await fs.rm(turbopackCacheDir, { recursive: true, force: true });
  }
}

await main();
