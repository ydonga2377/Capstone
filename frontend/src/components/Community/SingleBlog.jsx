import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './community.css';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(""); // State for new comment
  const [userName, setUserName] = useState(""); // State for user's name
  const [commentError, setCommentError] = useState(""); // To show validation error

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogRoutes/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching blog post');
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !comment) {
      setCommentError("Both name and comment are required.");
      return;
    }

    try {
      // Send POST request to add comment
      const response = await axios.post(
        `http://localhost:5000/api/blogRoutes/${id}/comment`,
        { user_id: userName, content: comment }
      );

      // Update the blog state with the new comment
      setBlog(response.data);
      setComment(""); // Clear the comment input
      setUserName(""); // Clear the name input
      setCommentError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="single-blog-container">
      {blog ? (
        <div>
          <h1 className="single-blog-title">{blog.title}</h1>
          <p className="single-blog-author">By {blog.author}</p>
          {blog.feature_image && (
            <img 
              src={`${process.env.PUBLIC_URL}${blog.feature_image}`} 
              alt={blog.title} 
              className="single-blog-image" 
            />
          )}
          <div className="single-blog-content">
            <p>{blog.content}</p>
          </div>

          <h3 className="single-blog-comments-header">Comments</h3>
          <div className="single-blog-comments">
            {blog.comments.length > 0 ? (
              blog.comments.map((comment, index) => (
                <p key={index}>
                  <strong>{comment.user_id}</strong>: {comment.content}
                </p>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Add comment form */}
          <h4>Add a comment</h4>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <textarea
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <p className="single-blog-loading">Blog post not found.</p>
      )}
    </div>
  );
};

export default SingleBlog;
