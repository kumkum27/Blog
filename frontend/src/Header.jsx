// Header.js
import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Header = ({ onSearch }) => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    // const [redirect,setredirect] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/profile`, {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfos => {
                setUserInfo(userInfos);
            });
        });
    }, [setUserInfo]);

    const logout = () => {
        fetch(`${API_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
        // setredirect(true);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term); // Send the search term to App.js
    };

    const username = userInfo?.username;
    // if(redirect){
    //   return <Navigate to={"/login"}/>
    // }

    return (
        <header>
            <Link to='/' className='logo'>My Blog</Link>

            {username && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search posts by tags or keywords..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            )}

            <nav>
                {username ? (
                    <React.Fragment>
                        <Link to='/create'>Create new post</Link>
                        <Link to='/logout' onClick={logout}>Logout</Link>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>  
                    </React.Fragment>
                )}
            </nav>
        </header>
    );
}

export default Header;










// const [username,setusername] = useState('');
// useEffect(()=>{
//   fetch("http://localhost:4000/profile",{
//   credentials:'include'
// }).then(response=>{
//   response.json().then(userInfo=>{
//     setusername(userInfo.username);
//   })
// })
// },[]);


// const logout=()=>{
//   fetch("http://localhost:4000/logout",{
//   method:'POST',
//   credentials:'include'
// })
//   setusername(null);
// }


// {username && (
//   <React.Fragment>
//   <Link to='/create'>Create post</Link>
//   <a onSubmit={logout}>Logout</a>
//   </React.Fragment>
// )}

// {!username && (
//   <React.Fragment>
//   <Link to='/login'>Login</Link>
//   <Link to='/register'>Register</Link>
//   </React.Fragment>
// )}

// <a onClick={logout}>Logout</a>