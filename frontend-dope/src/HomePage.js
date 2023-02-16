import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
    const [Token, setToken] = useState([]);
    const [clickText, setClickText] = useState("Click here");
    const [instructionText, setInstructionText] = useState("Creat playlists of your top artists 👇");
    const [playlist, setPlaylist] = useState([[]]);
    const [userProfile, setUserProfile] = useState([[]]);
    const navigate = useNavigate();
    
    const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
    const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;
    
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        // console.log(token)

        const getUserInfo = async () => {
            const { data } = await axios.get(USER_PROFILE_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(data)
            setUserProfile(data);
            // FetchData(token); // example API call infra
        };

        if (token === '' || token === null) {
            return;
        } else {
            getUserInfo();
        }
        // setToken would be taking place after the useEffect finished running
        // thus we need to use token instead of Token in the above code
        setToken(token);
    }, [])

    const FetchDefaultPlaylist = async () => {
        setInstructionText("Successfully created! ✅ Click on the image to see!")
        setClickText("Create another?")
        const data = {
            token: Token
        };
        const response = await fetch('http://localhost:8000/defaultplaylist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        const playlistID = await response.text();
        // console.log(playlistID);
        
        const returnPlaylist = await axios.get(GET_PLAYLIST_ENDPOINT + playlistID, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        // console.log(returnPlaylist.data);
        setPlaylist(returnPlaylist.data);
    };

    return (
        <> {/* if not logged in (no token) navigate back to login page */}
        {!window.localStorage.getItem("token") ? <Navigate replace to='/' />
            :
            <div>
                <div className="homepage">
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
                        <h4>{instructionText}</h4>
                        <button
                            className="logout-button"
                            type="button"
                            onClick={FetchDefaultPlaylist}
                        > {clickText}</button>
                    </div>
                    <div>
                        {playlist && playlist.images ? (
                            <div>
                                <h4><i>{playlist.name}</i></h4>
                                <a href={playlist.external_urls["spotify"]} target="_blank">
                                    <img className="playlistImg" src={playlist.images[0].url} alt="" />
                                </a>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        }
        </>

    );
}

export default HomePage;