'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Comment as CommentType } from '@/types';
import { formatDate } from '@/lib/utils';

interface CommentProps {
  comment: CommentType;
  onReply?: (parentId: string) => void;
  onDelete?: (commentId: string) => void;
}

export function Comment({ comment, onReply, onDelete }: CommentProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4 hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm mr-2">
            {comment.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="font-medium text-slate-900">
            {comment.user?.name || 'Anonymous'}
          </div>
        </div>
        <div className="text-xs text-slate-500">
          {formatDate(comment.created_at)}
        </div>
      </div>
      <div className="text-slate-700 mb-3 pl-10">
        {comment.content}
      </div>
      <div className="flex space-x-2 pl-10">
        {onReply && (
          <button 
            onClick={() => onReply(comment.id)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Reply
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(comment.id)}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => void;
  parentId?: string;
  placeholder?: string;
  buttonText?: string;
  onCancel?: () => void;
}

export function CommentForm({ 
  onSubmit, 
  parentId, 
  placeholder = 'Add a comment...',
  buttonText = 'Submit',
  onCancel 
}: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    onSubmit(content, parentId);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        required
      />
      <div className="flex justify-end space-x-2 mt-2">
        {onCancel && (
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
            size="sm"
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit"
          variant="primary"
          disabled={isSubmitting || !content.trim()}
          size="sm"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

interface CommentSectionProps {
  comments: CommentType[];
  onAddComment: (content: string, parentId?: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

export function CommentSection({ comments, onAddComment, onDeleteComment }: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  // Filter top-level comments and replies
  const topLevelComments = comments.filter(comment => !comment.parent_id);
  const replies = comments.filter(comment => comment.parent_id);
  
  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
  };
  
  const handleCancelReply = () => {
    setReplyingTo(null);
  };
  
  const handleSubmitReply = (content: string, parentId?: string) => {
    onAddComment(content, parentId);
    setReplyingTo(null);
  };

  return (
    <div>
      <CommentForm 
        onSubmit={onAddComment} 
        placeholder="Share your thoughts or questions..."
        buttonText="Post Comment"
      />
      
      {topLevelComments.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-slate-500">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topLevelComments.map(comment => (
            <div key={comment.id}>
              <Comment 
                comment={comment} 
                onReply={handleReply}
                onDelete={onDeleteComment}
              />
              
              {/* Show replies for this comment */}
              <div className="ml-8 space-y-4">
                {replies
                  .filter(reply => reply.parent_id === comment.id)
                  .map(reply => (
                    <Comment 
                      key={reply.id} 
                      comment={reply} 
                      onDelete={onDeleteComment}
                    />
                  ))
                }
                
                {/* Show reply form if user is replying to this comment */}
                {replyingTo === comment.id && (
                  <div className="mt-2">
                    <CommentForm 
                      onSubmit={handleSubmitReply}
                      parentId={comment.id}
                      placeholder={`Reply to ${comment.user?.name || 'Anonymous'}...`}
                      buttonText="Post Reply"
                      onCancel={handleCancelReply}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 