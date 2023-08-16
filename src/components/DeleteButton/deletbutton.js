import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqxmjloqwdyjexlkqjcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG1qbG9xd2R5amV4bGtxamNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTk1MzAsImV4cCI6MjAwNzYzNTUzMH0.bo5HKMJgZAcNIG9DyQgC3YqvYnTGcOvJAH0YvE4Y7zc'; 
const supabase = createClient(supabaseUrl, supabaseKey);

function DeleteButton({ postId }) {
    const handleDelete = async () => {
      try {
        const { error } = await supabase.from('newpost').delete().eq('id', postId);
  
        if (error) {
          console.error('Error deleting post:', error.message);
        } else {
          console.log('Post deleted');
          window.location.reload(); // Recarrega a página após a exclusão
        }
      } catch (error) {
        console.error('Error deleting post:', error.message);
      }
    };
  
    return (
      <button onClick={handleDelete}>Delete</button>
    );
  }
  
  export default DeleteButton;
  
