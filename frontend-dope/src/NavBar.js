import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {

    const navigate = useNavigate();

    const LogOut = () => {
        window.localStorage.removeItem("token");
        navigate('/', { replace: true });
    }

    return (
        <div className='nav'>
<<<<<<<<< Temporary merge branch 1
            <div className='container'>
                <div className="option"><img src="/Spotify_Logo.png" alt="spotify logo" /></div>
                <button className="option" onClick={() => console.log("home")}>Home</button>
                <button className="option" onClick={() => console.log("customize")} >Customize</button>
                <button className="option" onClick={() => console.log("meet the team")}>Meet the Team</button>
                <button className="option" onClick={LogOut}>Sign Out</button>
=========
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
                    <Link to='/team'> 
                        Meet the team &#10084;
                    </Link>
                </div>
                <div className='option'>
                    <Link onClick={LogOut} to='/'>
                    Log Out
                    </Link>
                </div>
>>>>>>>>> Temporary merge branch 2
            </div>
        }
        </>
    );

}

export default NavBar;