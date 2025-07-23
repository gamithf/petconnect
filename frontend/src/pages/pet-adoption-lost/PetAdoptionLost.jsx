import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaInfoCircle, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import adoptdog from '../../assets/adopt-lost/adopt_dog_1.jpg';
import adoptcat from '../../assets/adopt-lost/adopt_cat_1.jpg';
import lostdog from '../../assets/adopt-lost/lost_dog_1.jpg';
import lostcat from '../../assets/adopt-lost/lost_cat_1.jpg';

function PetAdoptionLost() {
  const [activeTab, setActiveTab] = useState('Adopt');
  const [visiblePostIndex, setVisiblePostIndex] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate();
  const postContainerRef = useRef(null);

  const posts = [
    {
      id: 1,
      type: 'Adopt',
      image: adoptdog,
      description: 'Adorable puppy looking for a forever home!',
      details: 'Breed: Golden Retriever, Age: 3 months, Location: San Francisco',
    },
    {
      id: 2,
      type: 'Lost/Found',
      image: lostcat,
      description: 'Lost cat near downtown area. Please help!',
      details: 'Breed: Siamese, Last seen: Yesterday evening, Contact: 555-555-5555',
    },
    {
      id: 3,
      type: 'Adopt',
      image: adoptcat,
      description: 'Friendly cat ready for adoption.',
      details: 'Breed: Domestic Shorthair, Age: 1 year, Location: Oakland',
    },
    {
      id: 4,
      type: 'Lost/Found',
      image: lostdog,
      description: 'Found dog wandering near the park.',
      details: 'Breed: Unknown, Found on: Main Street, Contact: Animal Shelter',
    },
  ];

  const filteredPosts = posts.filter(post => post.type === activeTab);

  useEffect(() => {
    setVisiblePostIndex(0);
  }, [activeTab]);

  const handleScroll = () => {
    if (postContainerRef.current) {
      const containerHeight = postContainerRef.current.clientHeight;
      const scrollTop = postContainerRef.current.scrollTop;
      const postHeight = postContainerRef.current.querySelector('.post-item')?.clientHeight || 0;
      if (postHeight === 0) return;
      const index = Math.round(scrollTop / postHeight);
      setVisiblePostIndex(index);
    }
  };

  useEffect(() => {
    const container = postContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [filteredPosts.length]);

  const applyFilters = () => {
    setFiltersApplied(true);
    setFiltersVisible(false);
  };

  const clearFilters = () => {
    setFiltersApplied(false);
    setFiltersVisible(false);
  };

  const handleAddPostClick = () => {
    // navigate('/add-post');
    console.log('Add Post button clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white flex flex-col items-center px-4">
      {/* Tabs */}
      <motion.div
        className="flex justify-center gap-4 mt-6 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {['Adopt', 'Lost/Found'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-lg ${
              activeTab === tab
                ? 'bg-white text-[#3AAFA9] scale-105'
                : 'bg-[#2B7A78] hover:bg-[#254E58]'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Filter + Add Post */}
      <motion.div
        className="flex justify-start w-full max-w-sm mb-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition shadow-lg ${
            filtersApplied ? 'bg-yellow-400 text-black' : 'bg-[#17252A] text-white'
          } hover:scale-105`}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <FaFilter />
          {filtersApplied ? 'Filtered' : 'Filter'}
        </button>
        <button
          className="bg-[#17252A] text-white px-4 py-2 rounded-full hover:scale-105 transition shadow-lg text-sm"
          onClick={handleAddPostClick}
        >
          + Add a Post
        </button>
      </motion.div>

      {/* Filter UI */}
      {filtersVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-black rounded-xl p-4 mb-4 shadow-xl max-w-sm w-[90%]"
        >
          <h4 className="font-semibold mb-2">Apply Filters</h4>
          <div className="flex flex-col gap-2 text-sm">
            <label><input type="checkbox" /> Only Puppies</label>
            <label><input type="checkbox" /> Within 5km</label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={clearFilters}
              className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              className="bg-[#3AAFA9] text-white text-sm px-3 py-1 rounded hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}

      {/* Posts Section */}
      <div className="w-full max-w-sm mx-auto relative">
        <div
          ref={postContainerRef}
          className="overflow-y-scroll snap-y snap-mandatory h-[calc(100vh-230px)] scrollbar-hide"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="post-item snap-start w-full h-[calc(100vh-230px)] flex items-center justify-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg text-white w-[90%] h-full mx-2 border border-white/20">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <img
                      src={post.image}
                      alt={post.description}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{post.description}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-[-60px] top-0 h-[calc(100vh-230px)] flex flex-col justify-center items-center space-y-4 text-xl text-white">
          <motion.button className="hover:scale-125 transition" whileTap={{ scale: 0.9 }}>
            <FaHeart />
          </motion.button>
          <motion.button className="hover:scale-125 transition" whileTap={{ scale: 0.9 }}>
            <FaComment />
          </motion.button>
          <motion.button className="hover:scale-125 transition" whileTap={{ scale: 0.9 }}>
            <FaShare />
          </motion.button>
          <motion.button
            onClick={() => alert(filteredPosts[visiblePostIndex]?.details)}
            className="hover:scale-125 transition"
            whileTap={{ scale: 0.9 }}
          >
            <FaInfoCircle />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default PetAdoptionLost;
