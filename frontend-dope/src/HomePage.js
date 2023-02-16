import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
    const [savedSongs, setSavedSongs] = useState([]);
    const [userProfile, setUserProfile] = useState([[]]);
    const navigate = useNavigate();
    
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        // console.log(token)
        const SAVED_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/tracks`;
        const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
        
        const getUserInfo = async () => {
            const { data } = await axios.get(USER_PROFILE_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            // console.log(data)
            setUserProfile(data);
            FetchData(token); // example API call infra
        };
    
        const searchSavedSongs = async () => {
            const { data } = await axios.get(SAVED_TRACKS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 10,
            },
            });
            setSavedSongs(data.items);
        };

        if(token === '' || token === null) {
            return;
        } else {
            getUserInfo();
            searchSavedSongs();
        }
    }, [])

    const SavedSongs = () => {
        return savedSongs.map((favorite) => (
        <div key={favorite.track.id}>
            <p>{favorite.track.name}</p>
            {/* {favorite.track.images[0].url} */}
        </div>
        ));
    };

    const LogOut = () => {
        window.localStorage.removeItem("token");
        navigate('/', {replace: true});
    }

    const FetchData = async (token) => {
        const data = {
            token: token
        };
        const response = await fetch('http://localhost:5000/defaultplaylist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data),
        });
        const result = await response.text();
        console.log(result);
    };

    return (
        <> {/* if not logged in (no token) navigate back to login page */}
        {! window.localStorage.getItem("token") ? <Navigate replace to='/'/> 
        :
        <div className="homepage">
            <button className="logout-button" onClick={LogOut}>
            Sign Out
            </button>
            <div>
                <h2>Hi, {userProfile.display_name}</h2>
                {/* 
                    https://daveceddia.com/react-before-render/ 
                    check for null/undefined value since render happens before data is ready
                */}
                {userProfile && userProfile.images && userProfile.images[0] ? (
                    <img className="profileImg" src={userProfile.images[0].url} alt="" />
                ) : (
                    <div>[No Profile Image]</div>
                )}
            </div>
            <div>
                <h4>Your Saved Songs</h4>
                <SavedSongs />
            </div>
        </div>
        }
        
        </>
        
    );
}

export default HomePage;