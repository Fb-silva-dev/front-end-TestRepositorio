import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './feed.css';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import More from '../../images/three-dots-more-indicator.svg';
import DeleteButton from '../../components/DeleteButton/deletbutton';

const supabaseUrl = 'https://lqxmjloqwdyjexlkqjcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG1qbG9xd2R5amV4bGtxamNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTk1MzAsImV4cCI6MjAwNzYzNTUzMH0.bo5HKMJgZAcNIG9DyQgC3YqvYnTGcOvJAH0YvE4Y7zc'; // Replace with your Supabase API key
const supabase = createClient(supabaseUrl, supabaseKey);

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('newpost').select('*');

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data);
      }
    }

    fetchPosts();
  }, []);

  // Edit post function
  const editPost = (postId) => {
    // Navigate to the edit page using react-router-dom or your preferred routing method
    // For example:
    window.location.href = `/edit/${postId}`;
  };

  return (
    <div>
      <HeaderMain />
      <main>
        <div className="cards">
          {posts.map((post) => (
            <div className="card" key={post.id}>
              <header>
                <h2>{post.title}</h2>
                <img src={More} alt="More Options" />
              </header>
              <div className="line"></div>
              <p>{post.description}</p>
              <div className="btns">
                <div className="btn-edit">
                  <button onClick={() => editPost(post.id)}>Edit</button>
                </div>
                <div className="btn-readmore">
                  <Link to={`/lermais/${post.id}`}>
                    <button>Ler Mais</button>
                  </Link>
                </div>
                <div className="btn-delete">
                  <DeleteButton postId={post.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Feed;
