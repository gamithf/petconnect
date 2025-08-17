// src/components/AddPost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api';
import { FaImage, FaTimes } from 'react-icons/fa';

function AddPost() {
  const [postData, setPostData] = useState({
    type: 'Adopt',
    description: '',
    details: '',
    location: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !postData.description || !postData.details || !postData.location) {
      setError('All fields and an image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', postData.type);
    formData.append('description', postData.description);
    formData.append('details', postData.details);
    formData.append('location', postData.location);
    
    setLoading(true);
    setError('');

    try {
      await apiRequest('/adoption-lost', 'POST', formData);
      navigate('/pet-adoption-lost');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800">
              <FaImage className="text-4xl text-gray-500 mb-2" />
              <span className="text-gray-400">Click to upload an image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-400">Type</label>
            <select name="type" value={postData.type} onChange={handleChange} className="w-full bg-gray-800 border-gray-700 rounded-lg p-2.5 focus:ring-teal-500 focus:border-teal-500">
              <option value="Adopt">For Adoption</option>
              <option value="LostFound">Lost / Found</option>
            </select>
          </div>
          
          <input type="text" name="description" placeholder="Description (e.g., 'Friendly Golden Retriever')" value={postData.description} onChange={handleChange} className="w-full bg-gray-800 border-gray-700 rounded-lg p-2.5" />
          <textarea name="details" placeholder="Details (e.g., '3 months old, vaccinated...')" value={postData.details} onChange={handleChange} className="w-full bg-gray-800 border-gray-700 rounded-lg p-2.5 h-24" />
          <input type="text" name="location" placeholder="Location (e.g., 'Malabe, Sri Lanka')" value={postData.location} onChange={handleChange} className="w-full bg-gray-800 border-gray-700 rounded-lg p-2.5" />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg transition duration-300 disabled:bg-gray-500">
            {loading ? 'Submitting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;