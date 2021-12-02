import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { LoginLogout } from '../LoginLogout/LoginLogout.jsx';
import M from 'materialize-css';
import './NavBar.scss';
import logoImg from '../../img/logo-esencial.png';


export const NavBar = () => {
    // const history = useHistory();
    // const [ lastPage, setLastPage ] = useState('');
    const user = useSelector(state => state.user)

    useEffect(() => {
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }, []);

    // useEffect(() => {
    //     history.listen((location) => {
    //         setLastPage((location.state?location.state.from:''));
    //         window.scrollTo(0, 0);
    //     });
    // }, [history, setLastPage]);

    return (
        <div>
            <div className="navbar-fixed">
                <nav className="blue darken-2" style={{ marginBottom: '20px' }}>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo hide-on-med-and-down" style={{ paddingLeft: '0.8em' }}>
                        <img src={logoImg} alt="Logo" className="logo-img" />
                    </Link>
                    <div data-target="mobile-demo" className="sidenav-trigger hide-on-large-only noselect" style={{ cursor: 'pointer' }}><i className="material-icons noselect">menu</i></div>
                    {/* {(lastPage) &&
                        <div onClick={history.goBack} className="brand-logo noselect" style={{cursor: 'pointer', fontSize: '25px', paddingLeft: '10px', display: 'flex', flexWrap: 'nowrap'}}>
                            <i className="material-icons">chevron_left</i>
                            {lastPage}
                        </div>
                    } */}
                    <ul className="right hide-on-med-and-down pages-ul">
                        <li><Link to="/" >Cuentas</Link></li>
                        <li><Link to="/operations" >Operaciones</Link></li>
                        <li><Link to="/products/Ropa" >Productos</Link></li>
                        {user.name?(
                            <li className="profile">
                                <div style={{display: 'flex',flexDirection: 'column'}}>
                                    <span className="white-text name" style={{lineHeight: 'normal',marginTop: '2px', fontSize:'23px'}} >{user.name}</span>
                                    <LoginLogout logout={true} />
                                </div>
                                <img className="circle" src={user.imageUrl} alt="profile" onError={(e)=>{e.target.onerror=null;e.target.src='https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png';}} />
                            </li>
                            ):(
                            <li className="sessionLi" > 
                                <LoginLogout user={user} />
                            </li>
                            )
                        }
                    </ul>
                </div>
                </nav>
            </div>


            <ul className="sidenav sidenav-close" id="mobile-demo">
                <li>
                {(user.name) ? (
                    <div className="user-view profile-side">
                        <div className="background">
                            <img alt="background"src="https://images.freecreatives.com/wp-content/uploads/2016/02/Abstract-Bright-Blue-Geometric-Background.jpg" />
                        </div>
                        <img className="circle" src={user.imageUrl} key={user.imageUrl} alt="profile" onError={(e)=>{e.target.onerror=null;e.target.src='https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png';}} />
                        <span className="white-text name">{user.name}</span>
                        <LoginLogout logout={true} className="logout" />
                    </div>
                ) : (
                    <div className="user-view">
                        <div className="background">
                            <img alt="background"src="https://images.freecreatives.com/wp-content/uploads/2016/02/Abstract-Bright-Blue-Geometric-Background.jpg" />
                        </div>
                        <img className="circle" src="https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png" alt="profile" />
                        <LoginLogout user={user} />
                    </div>
                )
                }
                </li>
                <li><i><Link to="/" className="subheader" style={{ paddingLeft: '20px' }}>Esencial</Link></i></li>
                <li><Link to="/" >Cuentas</Link></li>
                <li><Link to="/operations" >Operaciones</Link></li>
                <li><Link to="/products/Ropa" >Productos</Link></li>
            </ul>
        </div>
    );
}
