import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaMapMarkerAlt, FaUserCircle, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from "../../api/api";
import CommentsModal from '../../components/adoption-lost/CommentsModal.jsx';

// --- Helper Component for a loading skeleton ---
const PostSkeleton = () => (
    <div className="w-full h-[calc(100vh_-_230px)] flex items-center justify-center p-4">
      <div className="bg-gray-700/50 w-full h-full rounded-2xl animate-pulse p-5 flex flex-col justify-end">
        <div className="h-6 w-1/2 bg-gray-600 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-600 rounded mb-4"></div>
        <div className="h-4 w-1/3 bg-gray-600 rounded"></div>
      </div>
    </div>
);

// This should come from your auth context, but for now, this is the placeholder.
const CURRENT_USER_ID = "685f50af83ac76a8eef89010";

function PetAdoptionLost() {
  const [activeTab, setActiveTab] = useState('Adopt');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate();
  const postContainerRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentingPost, setCommentingPost] = useState(null);
  const [visiblePostIndex, setVisiblePostIndex] = useState(0);

  useEffect(() => {
    // Reset scroll and visible index when tab changes
    if(postContainerRef.current) postContainerRef.current.scrollTop = 0;
    setVisiblePostIndex(0);
    
    const controller = new AbortController();
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await apiRequest(`/adoption-lost?type=${activeTab}`, "GET");
        setPosts(response.data.data || []);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Failed to fetch posts:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    return () => controller.abort();
  }, [activeTab]);

  const handleLikeClick = async (postId) => {
    const originalPosts = [...posts];
    const updatedPosts = posts.map(p => {
        if (p._id === postId) {
            const isLiked = p.likes.includes(CURRENT_USER_ID);
            const newLikes = isLiked
                ? p.likes.filter(id => id !== CURRENT_USER_ID)
                : [...p.likes, CURRENT_USER_ID];
            return { ...p, likes: newLikes };
        }
        return p;
    });
    setPosts(updatedPosts);
    
    try {
        await apiRequest(`/adoption-lost/${postId}/like`, 'PATCH');
    } catch (error) {
        console.error("Failed to like post:", error);
        setPosts(originalPosts); // Revert on failure
    }
  };

  const handleCommentCountUpdate = (postId, increment = 1) => {
    // This function can be improved to handle the actual comment data later
    // For now, it just updates the length correctly for the UI
    setPosts(prevPosts =>
      prevPosts.map(p =>
        p._id === postId
          ? { ...p, comments: { length: p.comments.length + increment } } // Avoid creating a large fake array
          : p
      )
    );
  };

  const handleAddPostClick = () => navigate('/add-pet-post');
  
  // This is a placeholder for actual filtering logic
  const filteredPosts = posts;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 text-white flex flex-col items-center font-sans overflow-hidden">
      
      {/* Top Controls: Tabs, Filter, Add Post */}
      <div className="w-full max-w-md mx-auto px-4 pt-4 z-10">
        <motion.div
          className="flex justify-center gap-4 mb-4"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {['Adopt', 'LostFound'].map(tab => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                activeTab === tab ? 'bg-teal-500 text-white scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab === 'LostFound' ? 'Lost & Found' : tab}
            </button>
          ))}
        </motion.div>
        <motion.div
            className="flex justify-between items-center w-full mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
            {/* <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition shadow-lg hover:scale-105 ${
                filtersApplied ? 'bg-yellow-500 text-black' : 'bg-gray-700/80 backdrop-blur-sm text-white'
                }`}
                onClick={() => setFiltersVisible(!filtersVisible)}
            >
                <FaFilter />
                {filtersApplied ? 'Filtered' : 'Filter'}
            </button> */}
            <button
                className="bg-teal-500 text-white px-4 py-2 rounded-full hover:scale-105 hover:bg-teal-400 transition shadow-lg text-sm font-bold"
                onClick={handleAddPostClick}
            >
                + Add Post
            </button>
        </motion.div>
      </div>

      {/* Posts Section */}
      <div
        ref={postContainerRef}
        className="w-full max-w-md flex-1 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
      >
        {loading ? (
            <PostSkeleton />
        ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
                const isLikedByCurrentUser = post.likes.includes(CURRENT_USER_ID);
                return (
                    <motion.div
                        key={post._id}
                        className="post-item snap-center w-full h-full flex-shrink-0 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    >
                        <div className="relative bg-gray-800 rounded-2xl w-full h-full shadow-2xl overflow-hidden">
                          
                          {/* START: Missing Content Restored */}
                          <img
                            src={post.imageUrl}
                            alt={post.description}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                              <div className="flex items-center gap-3 mb-3">
                                  <FaUserCircle size={36} className="text-gray-300" />
                                  <div>
                                      <p className="font-bold text-base">{post.postedBy.name}</p>
                                      <p className="text-xs text-gray-300">{new Date(post.createdAt).toLocaleDateString()}</p>
                                  </div>
                              </div>
                              <h3 className="text-xl font-bold mb-1">{post.description}</h3>
                              <p className="text-sm font-light text-gray-200 mb-2 leading-snug">{post.details}</p>
                              <div className="flex items-center gap-2 text-xs text-teal-300">
                                  <FaMapMarkerAlt />
                                  <span>{post.location}</span>
                              </div>
                          </div>
                          {/* END: Missing Content Restored */}
                          
                          {/* Floating Action Buttons */}
                          <motion.div className="absolute bottom-5 right-3 flex flex-col items-center gap-5 text-white">
                              <motion.button 
                                  onClick={() => handleLikeClick(post._id)}
                                  className={`flex flex-col items-center transition-transform duration-200 hover:scale-110 ${isLikedByCurrentUser ? 'text-red-500' : 'text-white'}`}
                                  whileTap={{ scale: 0.9 }}
                              >
                                  <FaHeart size={28} />
                                  <span className="text-xs font-bold">{post.likes.length}</span>
                              </motion.button>

                              <motion.button
                                  onClick={() => setCommentingPost(post)}
                                  className="flex flex-col items-center hover:text-teal-400 transition-transform duration-200 hover:scale-110"
                                  whileTap={{ scale: 0.9 }}
                              >
                                  <FaComment size={28} />
                                  <span className="text-xs font-bold">{post.comments.length}</span>
                              </motion.button>
                              {/* You can add the Share button here if needed */}
                          </motion.div>
                        </div>
                    </motion.div>
                );
            })
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 text-center text-gray-400">
            <p>No posts found for "{activeTab === 'LostFound' ? 'Lost & Found' : activeTab}".<br/>Why not add one?</p>
          </div>
        )}
      </div>
      
      {/* Comment Modal */}
      <AnimatePresence>
          {commentingPost && (
              <CommentsModal
                  post={commentingPost}
                  onClose={() => setCommentingPost(null)}
                  onCommentAdded={(inc) => handleCommentCountUpdate(commentingPost._id, inc)}
              />
          )}
      </AnimatePresence>
    </div>
  );
}

export default PetAdoptionLost;