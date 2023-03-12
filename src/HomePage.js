import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
    const [Token, setToken] = useState([]);
    const [generatedPlaylists, setGeneratedPlaylists] = useState([]);
    const [userProfile, setUserProfile] = useState([[]]);
    const navigate = useNavigate();
    
    const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;
    
    useEffect(() => {
        const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
        
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

        const FetchGeneratedPlaylists = async () => {
            const data = {
                token: token
            };
            const response = await fetch('/getplaylists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const playlists = await response.text();
            // console.log(playlists);
            setGeneratedPlaylists(JSON.parse(playlists));
        }

        if (token === '' || token === null) {
            return;
        } else {
            getUserInfo();
            FetchGeneratedPlaylists();
        }
        // setToken would be taking place after the useEffect finished running
        // thus we need to use token instead of Token in the above code
        setToken(token);
    }, [])


    const FetchDefaultPlaylist = async () => {
        const data = {
            token: Token
        };

        try {
            const response = await fetch('/defaultplaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                });
                const playlistID = await response.text();
                // console.log(playlistID);
                
                const returnPlaylist = await fetch(GET_PLAYLIST_ENDPOINT + playlistID, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.log(returnPlaylist);
                const playlist = await returnPlaylist.json();
                console.log(playlist);
                navigate('/result', {state : playlist.data});
        } catch (error) {
            console.error('Error fetching default playlist:', error);
            alert("Error fetching playlist, please try again.")
        }
        
    };

    return (
        <> {/* if not logged in (no token) navigate back to login page */}
        {!window.localStorage.getItem("token") ? <Navigate replace to='/' />
            :
            <div>
                <div className="homepage">
                    {userProfile && userProfile.images && userProfile.images[0] ? (
                        <div className="container">
                            <div>
                                <img className="profileImg" src={userProfile.images[0].url} alt="" />
                            </div>
                            <div className="greeting">
                                <h2>Hi, {userProfile.display_name}</h2>
                            </div>
                        </div>
                    ) : (
                        <div>[No Profile Image]</div>
                    )}
                    <div className="past">
                    <h4>Recently Generated Playlists (Last 5) 👇</h4>
                        {generatedPlaylists.length ? 
                            <ul>
                                {
                                    generatedPlaylists.map((playlist, index) => (
                                        <li key={index}> 
                                            <a href={playlist.link}>{playlist.name}</a>
                                        </li>                
                                    )).slice(-5)
                                }
                            </ul> : <></>
                        }
                    </div>
                    <div>
                        <h4>Creat playlists of your top artists 👇</h4>
                        <button
                            className="logout-button"
                            type="button"
                            onClick={FetchDefaultPlaylist}
                        >Click here</button>
                    </div>
                </div>
            </div>
        }
        </>

    );
}

export default HomePage;