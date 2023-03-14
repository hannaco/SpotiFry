/**

A React component that displays the results of a generated playlist.
@module ResultPage
@requires react
@requires react-router-dom
@requires './ResultPage.css'
*/
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

/**

ResultPage component

@function

@returns {JSX.Element} JSX.Element
*/
const ResultPage = () => {
    
    const [playlist, setPlaylist] = useState([[]]);
    const {state} = useLocation();
    const navigate = useNavigate();

    /**

    A hook that is called on component mount and when the state variable changes.
    Fetches the playlist state from local storage if state is null and sets it as playlist.
    Otherwise, sets the state as playlist and updates local storage.
    @memberof module:ResultPage
    @inner
    @function
    @param {Array} state - the state variable of the component
    */
    useEffect(() => {
        if(state == null && localStorage.getItem('result')) {
            setPlaylist(JSON.parse(localStorage.getItem('result')));
        }
        else {
            setPlaylist(state);
            localStorage.setItem('result', JSON.stringify(state));
        }
    }, [state])

    const FetchCustomizePlaylist = () => {
        navigate('/homepage');
    }

    const GoToCustomize = () => {
        navigate('/customize');
    }

    return (
        <> {/* if not logged in (no token) navigate back to login page */}
        {!window.localStorage.getItem("token") ? <Navigate replace to='/' />
            :
            <div>
                <div className="resultpage">
                    <div>
                        {playlist && playlist.images ? (
                            <div>
                                <div>
                                    <h4>Successfully created! ✅ Click on the image to see!</h4>
                                    <button
                                        className="button"
                                        type="button"
                                        onClick={FetchCustomizePlaylist}
                                    >See all your generated playlists</button>
                                </div>
                                <h4><i>{playlist.name}</i></h4>
                                <a href={playlist.external_urls["spotify"]} target="_blank" rel="noreferrer">
                                    <img className="playlistImg" src={playlist.images[0].url} alt="" />
                                </a>
                            </div>
                        ) : (
                            <div>
                                <h4>Go Create a playlist! 👇</h4>
                                <button
                                    className="button"
                                    type="button"
                                    onClick={GoToCustomize}
                                >Customize</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        </>

    );
}

export default ResultPage;