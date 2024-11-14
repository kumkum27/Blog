// IndexPage.js
import React, { useEffect, useState } from 'react';
import Post from './Post';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const IndexPage = ({ searchTerm }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/post`)
            .then(response => response.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const filteredPosts = posts.filter(post => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term))) ||
            post.title.toLowerCase().includes(term) ||
            post.summary.toLowerCase().includes(term)
        );
    });

    return (
        <div className="post-list">
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => <Post key={post._id} {...post} />)
            ) : (
                <p>No posts found matching your search.</p>
            )}
        </div>
    );
};

export default IndexPage;
