import { formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './PostPage.css';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const PostPage = () => {
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    fetch(`${API_URL}/post/${id}`),
                    fetch(`${API_URL}/post/${id}/comments`)
                ]);

                const postData = await postResponse.json();
                const commentsData = await commentsResponse.json();

                setPostInfo(postData);
                setIsLiked(postData.likedBy?.includes(userInfo?.id));
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, userInfo?.id]);

    const addComment = async () => {
        const response = await fetch(`${API_URL}/post/${id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: commentText }),
            credentials: 'include'
        });

        if (response.ok) {
            const newComment = await response.json();
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    const deleteComment = async (commentId) => {
        const response = await fetch(`${API_URL}/comment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            setComments(comments.filter(comment => comment._id !== commentId));
        }
    };

    const toggleLike = async () => {
        const response = await fetch(`${API_URL}/post/${id}/like`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const { likes, isLiked } = await response.json();
            setPostInfo(prev => ({ ...prev, likes }));
            setIsLiked(isLiked);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading amazing content...</p>
            </div>
        );
    }

    if (!postInfo) return 'Error loading post.';

    return (
        <div className="post-page">
            <div className="post-content">
                <h1 className="post-title">{postInfo.title}</h1>
                
                <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                <div className="author">{postInfo.author.username}</div>

                {postInfo.tags && postInfo.tags.length > 0 && (
                    <div className="tags">
                        {postInfo.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}

                <div className="post-image">
                    <img src={`${API_URL}/${postInfo.cover}`} alt={postInfo.title} />
                </div>
                
                <div className="post-body" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

                <div className="post-actions">
                    {userInfo.id === postInfo.author._id && (
                        <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            Edit this post
                        </Link>
                    )}
                    <button onClick={toggleLike} className={`like-btn ${isLiked ? 'liked' : ''}`}>
                        <span className="heart-icon">❤️</span>
                        <span className="like-count">{postInfo.likes || 0}</span>
                    </button>
                </div>

                <div className="comments-section">
                    <h2>Comments</h2>
                    {comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <p><strong>Anonymous:</strong> {comment.content}</p>
                            {userInfo.id === comment.author && (
                                <button onClick={() => deleteComment(comment._id)} className="delete-btn">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}

                    {userInfo && (
                        <div className="add-comment">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button onClick={addComment} className="add-comment-btn">
                                Add Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;