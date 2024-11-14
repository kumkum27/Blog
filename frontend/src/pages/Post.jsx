import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import './PostPage.css';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Post = ({ _id, title, summary, cover, createdAt, author, tags }) => {
    const limitWords = (text, limit = 30) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + " ...";
        }
        return text;
    };

    return (
        <div className='post animate-fadeIn'>
            <Link to={`/post/${_id}`} className='post-image'>
                <img src={`${API_URL}/${cover}`} alt={title} />
            </Link>
            <div className='post-content'>
                <Link to={`/post/${_id}`}>
                    <h2 className='post-title'>{title}</h2>
                </Link>
                <p className='post-meta animate-slideInRight'>
                    <span className='post-author'>{author.username}</span>
                    <time className='post-date'>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className='post-summary animate-slideInLeft'>{limitWords(summary)}</p>
                {tags && tags.length > 0 && (
                    <div className='post-tags animate-slideInBottom'>
                        {tags.map((tag, index) => (
                            <span key={index} className='post-tag'>{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Post;