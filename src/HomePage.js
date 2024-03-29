/**

This module exports the HomePage component, which renders the home page of the application.
@module HomePage
*/

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./HomePage.css";


/**

Represents the home page of the application.

@function HomePage

@returns {JSX.Element}
*/
const HomePage = () => {
    const [Token, setToken] = useState([]);
    const [generatedPlaylists, setGeneratedPlaylists] = useState([]);
    const [userProfile, setUserProfile] = useState([[]]);
    const navigate = useNavigate();
    
    const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;
     
    useEffect(() => {
        const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
        
        let token = window.localStorage.getItem("token");
        
        /**
        Fetches the user information from Spotify API.
        @function getUserInfo
        @async
        @returns {void}
        */
        const getUserInfo = async () => {
            const response = await fetch(USER_PROFILE_ENDPOINT, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
              }

            const data = await response.json();
            setUserProfile(data);
          };

        /**
        Fetches the generated playlists from the server.
        @function FetchGeneratedPlaylists
        @async
        @returns {void}
        */
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

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
              }

            const playlists = await response.text();
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

    /**
    Fetches the default playlist from the server and navigates to the ResultPage.
    @function FetchDefaultPlaylist
    @async
    @returns {void}
    */
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
                await new Promise(r => setTimeout(r, 2000));
                const returnPlaylist = await fetch(GET_PLAYLIST_ENDPOINT + playlistID, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const playlist = await returnPlaylist.json();
                navigate('/result', {state : playlist});
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