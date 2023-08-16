import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useParams, useHistory } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './edit.css';

const supabaseUrl = 'https://lqxmjloqwdyjexlkqjcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG1qbG9xd2R5amV4bGtxamNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTk1MzAsImV4cCI6MjAwNzYzNTUzMH0.bo5HKMJgZAcNIG9DyQgC3YqvYnTGcOvJAH0YvE4Y7zc';
const supabase = createClient(supabaseUrl, supabaseKey);

function Edit() {
  const history = useHistory(); // Objeto history do React Router
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('newpost').select('*').eq('id', postId);

      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        const post = data[0];
        setTitle(post.title);
        setDescription(post.description);
        setContent(post.content);
      }
    }

    fetchPost();
  }, [postId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSaveChanges = async () => {
    // Atualize os dados da postagem no Supabase
    const { data, error } = await supabase
      .from('newpost')
      .update([{ id: postId, title, description, content }])
      .eq('id', postId);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      // Volta à página do feed
      history.goBack();
    }
  };

  return (
    <div>
      <Header />
      <div className="card-post">
        <h1>Edit Post</h1>
        <div className="fields">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="fields">
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="fields">
          <label>Content:</label>
          <textarea value={content} onChange={handleContentChange} />
        </div>
        <div className="btn-post">
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
