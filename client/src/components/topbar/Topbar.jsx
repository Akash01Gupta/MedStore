import './topbar.css';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios';
import DrawerContext from '../../context/DrawerContext';

export default function Topbar() {
    const { authenticated, user, dispatch } = useContext(AppContext);
    const { setOpen } = useContext(DrawerContext);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    };

    const getLoggedIn = async () => {
        try {
            const res = await axios.get("/api/private/getuser", config);
            if (res) {
                dispatch({ type: "FETCH_SUCCESS", payload: res.data });
            } else {
                dispatch({ type: "EMPTY_STATE" });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: "EMPTY_STATE" });
        }
    };

    useEffect(() => {
        getLoggedIn();
    }, );

    const handleDrawer = () => {
        setOpen();
    };

    const history = useHistory();

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <NavLink exact className="nav-link" to="/"><span className="homeLogo1">MedStore</span></NavLink>
                <span className="homeLogo" onClick={handleDrawer}>MedStore</span>

                <ul className="topbarList">
                    {!authenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/signin">Login</NavLink>
                            </li>
                            <div className="dropdown-menu">
                                <div className="dropdown-flex">
                                    <li className="menu-btn">More <i className="fas fa-caret-down"></i></li>
                                    <div className="menu-content">
                                        <NavLink exact className="links-hidden" to='/signup'>Signup</NavLink>
                                        <NavLink exact className="links-hidden" to='/storesignin'>Sell on Medstore</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </ul>
                {authenticated && user && (
                    <div className="topbarProfile">
                        <div className="dropdown-menu">
                            <div className="dropdown-flex">
                                <img className="topbarProfImg" src={user.profileImg} alt="User profile" />
                                <li className="menu-btn1">{user.email} </li>
                                <div className="menu-content1">
                                    <NavLink exact className="links-hidden" to='/userdashboard/profile'>DashBoard</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="cartDiv" onClick={() => history.push('/userdashboard/addtocart')}>
                            <span className="cartNumber">{user.cartItem.length}</span>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
