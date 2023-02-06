import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./NavBar.css"

const NavBar = () => {
    const navigate = useNavigate();

    const LogOut = () => {
        // window.localStorage.removeItem("token");
        // navigate('/', {replace: true});
        console.log("logout")
    }

    return (
        <div className='nav'>
            <div className='container'>
            <div className="option"><img src="/Spotify_Logo.png" alt="spotify logo" /></div>
            <button className="option" onClick={() => console.log("home")}>Home</button>
            <button className="option" onClick={() => console.log("customize")} >Customize</button>
            <button className="option" onClick={() => console.log("meet the team")}>Meet the Team</button>
            <button className="option" onClick={LogOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default NavBar;