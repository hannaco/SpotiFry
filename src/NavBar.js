import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {

    const navigate = useNavigate();

    const LogOut = () => {
        window.localStorage.removeItem("token");
        navigate('/', {replace: true});
    }

    return (
        <>
        {!window.localStorage.getItem("token") ? <></> :
            <div className='nav'>
                <div className="container">
                    <div className='option'>
                        <img className="logo" src="/Spotify_Logo.png" alt="spotify logo" />
                    </div>
                    <div className='option'>
                        <Link to='/homepage'>
                            Home
                        </Link>
                    </div>
                    <div className='option'>
                        <Link to='/customize'>
                            Customize
                        </Link>
                    </div>
                    <div className='option'>
                        <Link to='/result'>
                            Result
                        </Link>
                    </div>
                    <div className='option'>
                        <Link to='/team'> 
                            Meet the team &#10084;
                        </Link>
                    </div>
                    <div className='option'>
                        <Link onClick={LogOut} to='/'>
                        Log Out
                        </Link>
                    </div>
                </div>
            </div>
        }
        </>
    );

}

export default NavBar;