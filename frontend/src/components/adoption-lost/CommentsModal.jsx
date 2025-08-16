import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { apiRequest } from '../../api/api';

function CommentsModal({ post, onClose, onCommentAdded }) {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // When the component opens, populate with the user's name for optimistic updates
  useEffect(() => {
    const populatedComments = post.comments.map(c => ({
      ...c,
      user: c.user || { name: 'You' } // Handle case where user isn't populated yet
    }));
    setComments(populatedComments);
  }, [post.comments]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);

    // Optimistic update
    const tempId = Date.now().toString();
    const optimisticComment = {
      _id: tempId,
      text: newComment,
      user: { name: 'You' }, // Placeholder name
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, optimisticComment]);
    onCommentAdded(); // Update comment count on main screen immediately

    try {
      const response = await apiRequest(`/adoption-lost/${post._id}/comment`, 'POST', { text: newComment });
      // Replace optimistic comment with real data from server
      setComments(response.data); 
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Revert optimistic update on failure
      setComments(prev => prev.filter(c => c._id !== tempId));
      onCommentAdded(-1); // Decrement count on failure
    } finally {
      setNewComment('');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-gray-800 w-full max-w-md h-[75vh] rounded-t-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 className="font-bold text-lg">Comments ({comments.length})</h2>
          <button onClick={onClose}><FaTimes /></button>
        </header>
        <div className="flex-grow p-4 overflow-y-auto">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment._id} className="flex gap-3 mb-4">
                <div className="flex-shrink-0 bg-teal-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {comment?.user?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-semibold text-sm">{comment?.user?.name || 'Anonymous User'}</p>
                  <p className="text-gray-300">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No comments yet. Be the first!</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex gap-2 flex-shrink-0">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-gray-700 rounded-full p-2.5 px-4 focus:ring-teal-500 focus:border-teal-500"
          />
          <button type="submit" disabled={loading} className="bg-teal-600 rounded-full p-3 hover:bg-teal-500 disabled:bg-gray-600">
            <FaPaperPlane />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CommentsModal;