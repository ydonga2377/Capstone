import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Fetch all blog posts
export const fetchBlogPosts = async () => {
    const { data } = await API.get('/blogRoutes');
    return data;
  };
  
  // Fetch a single blog post
  export const fetchBlogPostById = async (id) => {
    const { data } = await API.get(`/blogRoutes/${id}`); // Fetch a single blog by its ID
    return data;
  };

// Create a new blog post
export const createBlogPost = async (blogData) => {
    const { data } = await API.post('/blogRoutes', blogData);
    return data;
  };