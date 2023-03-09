import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
    const [Token, setToken] = useState([]);
    const [playlist, setPlaylist] = useState([[]]);
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

        if (token === '' || token === null) {
            return;
        } else {
            getUserInfo();
        }
        // setToken would be taking place after the useEffect finished running
        // thus we need to use token instead of Token in the above code
        setToken(token);
       
        const temp_data = {
            token: token
        }

        // UNCOMMENT BELOW TO TEST /getplaylists endpoint and print data to console

    //     const test_endpoint = async () => {
    //         const response = await fetch('http://localhost:8000/getplaylists', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(temp_data),
    //             });

    //         const playlists_data = await response.json();
    //         console.log(playlists_data);
    //     }
    //     test_endpoint();
    }, [])

    const FetchDefaultPlaylist = async () => {
        const data = {
            token: Token
        };

        try {
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
                navigate('/result', {state : returnPlaylist.data});
        } catch (error) {
            console.error('Error fetching default playlist:', error);
            // TODO: HANDLE ERRORS HERE
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