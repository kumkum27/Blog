// App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from "./pages/Login";
import Register from "./pages/Register";
import IndexPage from './pages/IndexPage';
import UserContextProvider from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import LogoutPage from './pages/LogoutPage';
import './App.css';
import ScrollToTop from './pages/Scroll';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <UserContextProvider>
            <ScrollToTop />
            <Routes>
                {/* Pass searchTerm and setSearchTerm to Layout */}
                <Route path="/" element={<Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
                    <Route index element={<IndexPage searchTerm={searchTerm} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/logout' element={<LogoutPage/>}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
