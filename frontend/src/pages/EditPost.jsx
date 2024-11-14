import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, Navigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(''); // Initialize tags state
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    // Fetch post data to prepopulate the form
    useEffect(() => {
        fetch(`${API_URL}/post/${id}`)
            .then(response => response.json())
            .then(post => {
                setTitle(post.title);
                setSummary(post.summary);
                setContent(post.content);
                setTags(post.tags ? post.tags.join(', ') : ''); // Join tags into a comma-separated string
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    const updatePost = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('tags', tags); // Convert tags to array

        const response = await fetch(`${API_URL}/post/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
            />
            <input
                type="file"
                onChange={(ev) => setFiles(ev.target.files)}
            />
            <ReactQuill
                value={content}
                onChange={(newval) => setContent(newval)}
            />
            <input type="text" 
            placeholder="Tags (comma-separated)" 
            value={tags} onChange={(ev) => setTags(ev.target.value)} />
            <button style={{ marginTop: '5px', backgroundColor: '#212121',color: 'white', padding: '10px',width: '8rem', margin: "0% 40%",  borderRadius: "8px"  }}>
            Update Post</button>
        </form>
    );
};

export default EditPost;
