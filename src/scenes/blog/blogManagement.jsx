import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/apiConfig';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from Strapi API
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blog-posts`);
        setPosts(response.data.data); // Strapi data structure
      } catch (err) {
        setError(err);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.attributes.title}</h3>
            <p>{post.attributes.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
