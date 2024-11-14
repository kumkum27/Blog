// Layout.js
import React, { useContext } from 'react';
import Header from '../Header';
import Footer from '../footer';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Layout = ({ searchTerm, setSearchTerm }) => {
    const { userInfo } = useContext(UserContext); // Access userInfo from context

    return (
        <React.Fragment>
            <main>
                <Header onSearch={setSearchTerm} />
                <Outlet />
            </main>
            {/* Conditionally render Footer only if user is logged in */}
            {userInfo && <Footer />}
        </React.Fragment>
    );
};

export default Layout;
