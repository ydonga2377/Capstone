import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom'; // For navigation
import './community.css'; // Assuming you have CSS styles

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);  // State to hold blog posts
  const [loading, setLoading] = useState(true);  // Loading state for async operation
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogRoutes'); // API call to fetch blog posts
        setBlogs(response.data);  // Set the fetched blogs in state
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Error fetching blog posts');  // Set error state if request fails
        setLoading(false);  // Set loading to false if there's an error
      }
    };
    
    getBlogs();  // Fetch the blog posts when the component mounts
  }, []);  // Empty dependency array to run this effect once on mount

  if (loading) return <p>Loading...</p>;  // Display loading message
  if (error) return <p style={{ color: 'red' }}>{error}</p>;  // Display error message if there's an error

  return (
    <div className="blog-list-container">
      <h1>Community Blogs</h1>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div className="blog-card" key={blog._id}>
            {blog.feature_image && (
              <img 
                src={`${process.env.PUBLIC_URL}${blog.feature_image}`} 
                alt={blog.title} 
                className="blog-image" 
              />
            )}
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">By {blog.author}</p>
            <Link to={`/community/${blog._id}`} className="read-more-button">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
