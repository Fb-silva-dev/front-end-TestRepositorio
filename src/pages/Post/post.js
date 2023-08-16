import React from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';

import './post.css';

const supabaseUrl = 'https://lqxmjloqwdyjexlkqjcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG1qbG9xd2R5amV4bGtxamNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTk1MzAsImV4cCI6MjAwNzYzNTUzMH0.bo5HKMJgZAcNIG9DyQgC3YqvYnTGcOvJAH0YvE4Y7zc';
const supabase = createClient(supabaseUrl, supabaseKey);

function Post() {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPost = async (data) => {
    if (!data.title || !data.description || !data.content) {
      console.error('All fields are required');
      return;
    }

    try {
      const { data: post, error } = await supabase.from('newpost').insert([
        {
          title: data.title,
          description: data.description,
          content: data.content,
        },
      ]);

      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        console.log('Post created:', post);
        history.push('/');
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className='card-post'>
          <h1>New Post</h1>
          <div className='line-post'></div>
          <div className='card-body-post'>
            <form onSubmit={handleSubmit(addPost)}>
              <div className='fields'>
                <label>Title</label>
                <input
                  type='text'
                  name='title'
                  {...register('title', { required: 'Title is required' })}
                />
                <p className='error-message'>{errors.title?.message}</p>
              </div>
              <div className='fields'>
                <label>Description</label>
                <input
                  type='text'
                  name='description'
                  {...register('description', { required: 'Description is required' })}
                />
                <p className='error-message'>{errors.description?.message}</p>
              </div>
              <div className='fields'>
                <label>Content</label>
                <textarea
                  name='content'
                  {...register('content', { required: 'Content is required' })}
                ></textarea>
                <p className='error-message'>{errors.content?.message}</p>
              </div>
              <div className='btn-post'>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Post;
