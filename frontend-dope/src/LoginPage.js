import "./LoginPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    // const client_secret = process.env.REACT_APP_CLIENT_SECRET;
    // const refresh_token = process.env.REACT_APP_REFRESH_TOKEN;
    const redirect_uri = "http://localhost:3000";
    const response_type = "token";
    const scope = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
        "ugc-image-upload",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
        "user-library-modify",
        "user-library-read"
    ];

    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    // const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        let token = null;
        if(window.localStorage.getItem("token")) {
            token = JSON.parse(window.localStorage.getItem("token")).token;
            let expiration = JSON.parse(window.localStorage.getItem("token")).expiration;
            if (expiration && Date.now() > expiration) {
                // The data has expired, remove it from localStorage
                localStorage.removeItem('token');
            }
        }
        
        // if (!token && hash) { if token exists still compute new token
        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            // console.log(token)
            const expiration = Date.now() + 1 * 60 * 1000; 
            window.localStorage.setItem("token", JSON.stringify({token, expiration}))
            navigate('/homepage', { replace: true });
        }
    }, [navigate]);

    const handleClick = async () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&show_dialog=true`;
    };

    return (
        <div className="Login">
            <header className="header">
                <div className="welcome">Welcome to</div>
                <div>
                    <img className="egg" src="/spotifry.png" alt="logo"></img>
                </div>
                <div className="begin">
                    To begin, log in with
                    <img className="logo" src="/Spotify_Logo.png" alt="spotify logo" />
                </div>
                <button className="login-button" onClick={handleClick}>
                    Login with Spotify
                </button>
            </header>
        </div>
    );
}

export default Login;
