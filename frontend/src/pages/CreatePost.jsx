import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(''); // Initialize tags as a string
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('tags', tags); // Send tags as comma-separated string

        const response = await fetch(`${API_URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <input type="text" placeholder="Summary" value={summary} onChange={(ev) => setSummary(ev.target.value)} />
            <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
            <ReactQuill value={content} onChange={(newval) => setContent(newval)} />
            <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(ev) => setTags(ev.target.value)} />
            <button style={{ marginTop: '5px', backgroundColor: '#212121',color: 'white', padding: '10px',width: '8rem', margin: "0% 40%",  borderRadius: "8px"  }}>Create post</button>
        </form>
    );
}

export default CreatePost;
