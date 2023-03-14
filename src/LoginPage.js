/**

A component representing the login page of the Spotifry app.
@module Login
@requires react
@requires react-router-dom
@requires "./LoginPage.css"
*/

import "./LoginPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


/**

A functional component representing the login page of the Spotifry app.
@function Login
@returns {JSX.Element} - The JSX representation of the Login component.
*/
function Login() {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const redirect_uri = "https://spotifry-app.herokuapp.com/";
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
    /**
     * A hook that executes on mount and updates the token if a new one is received.
     * @name useEffect
     * @function
     * @param {Function} navigate - A function from the react-router-dom library used to navigate to the homepage.
     */
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        // if (!token && hash) { if token exists still compute new token
        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.localStorage.setItem("token", token)
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