import './Layout.css';
import NavBar from './NavBar';

function Layout(props) {
    return (
        <div>
            {props.children}
            <NavBar />
        </div>
    );
}

export default Layout;