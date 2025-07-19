import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaInfoCircle, FaFilter } from 'react-icons/fa';

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
      image: 'https://via.placeholder.com/400',
      description: 'Adorable puppy looking for a forever home!',
      details: 'Breed: Golden Retriever, Age: 3 months, Location: San Francisco',
    },
    {
      id: 2,
      type: 'Lost/Found',
      image: 'https://via.placeholder.com/400',
      description: 'Lost cat near downtown area. Please help!',
      details: 'Breed: Siamese, Last seen: Yesterday evening, Contact: 555-555-5555',
    },
    {
      id: 3,
      type: 'Adopt',
      image: 'https://via.placeholder.com/400',
      description: 'Friendly cat ready for adoption.',
      details: 'Breed: Domestic Shorthair, Age: 1 year, Location: Oakland',
    },
    {
      id: 4,
      type: 'Lost/Found',
      image: 'https://via.placeholder.com/400',
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
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [filteredPosts.length]);

  const applyFilters = () => {
    console.log('Filters applied');
    setFiltersApplied(true);
    setFiltersVisible(false);
  };

  const clearFilters = () => {
    console.log('Filters cleared');
    setFiltersApplied(false);
    setFiltersVisible(false);
  };

  const handleAddPostClick = () => {
    console.log('Add Post button clicked');
    // navigate('/add-post');
  };

  return (
    <div className="min-h-screen bg-[#3AAFA9] text-white flex flex-col items-center">
      {/* Tabs */}
      <div className="flex justify-center mb-6 pt-6 gap-4">
        {['Adopt', 'Lost/Found'].map(tab => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow ${
              activeTab === tab
                ? 'bg-white text-[#3AAFA9] scale-105'
                : 'bg-[#2B7A78] hover:bg-[#254E58]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter & Add Post Buttons */}
      <div className="flex justify-start w-full max-w-sm px-4 mb-4 gap-3">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
            filtersApplied ? 'bg-yellow-500 text-black' : 'bg-[#17252A] text-[#feffff]'
          } hover:opacity-90`}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <FaFilter />
          {filtersApplied ? 'Filtered' : 'Filter'}
        </button>
        <button
          className="bg-[#17252A] text-[#feffff] px-4 py-2 rounded-full hover:opacity-90 transition text-sm"
          onClick={handleAddPostClick}
        >
          + Add a Post
        </button>
      </div>

      {/* Filter UI (toggleable) */}
      {filtersVisible && (
        <div className="bg-white text-black rounded-lg p-4 mb-4 shadow max-w-sm w-[90%]">
          <h4 className="font-semibold mb-2">Apply Filter</h4>
          <div className="flex flex-col gap-2">
            <label>
              <input type="checkbox" /> Only Puppies
            </label>
            <label>
              <input type="checkbox" /> Within 5km
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400"
              onClick={clearFilters}
            >
              Clear
            </button>
            <button
              className="bg-[#3AAFA9] text-white text-sm px-3 py-1 rounded hover:opacity-90"
              onClick={applyFilters}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Posts Section */}
      <div className="w-full max-w-sm mx-auto relative">
        {/* Scrollable posts */}
        <div
          ref={postContainerRef}
          className="overflow-y-scroll snap-y snap-mandatory h-[calc(100vh-240px)] scrollbar-hide"
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="post-item snap-start w-full h-[calc(100vh-240px)] flex items-center justify-center relative"
            >
              <div className="bg-[#2B7A78] p-4 rounded-xl shadow-lg text-[#feffff] w-[90%] mx-2 h-full">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <img
                      src={post.image}
                      alt={post.description}
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{post.description}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-[-60px] top-0 h-[calc(100vh-240px)] flex flex-col justify-center items-center space-y-4 text-xl text-white">
          <button className="hover:scale-125 transition">
            <FaHeart />
          </button>
          <button className="hover:scale-125 transition">
            <FaComment />
          </button>
          <button className="hover:scale-125 transition">
            <FaShare />
          </button>
          <button
            className="hover:scale-125 transition"
            onClick={() => alert(filteredPosts[visiblePostIndex]?.details)}
          >
            <FaInfoCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetAdoptionLost;
