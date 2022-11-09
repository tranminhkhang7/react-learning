import React, { useRef, useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import authService from '../services/auth.service'

import logo from '../assets/images/books-corner-high-resolution-logo-color-on-transparent-background.png'
import { set } from '../redux/product-modal/productModalSlice'

const mainNav = [
    {
        display: "Home",
        path: "/"
    },
    {
        display: "Books",
        path: "/catalog"
    }
]

const Header = () => {

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)

    const [searchText, setSearchText] = useState("");

    const history = useHistory();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await authService.logout().then(
                () => {
                    history.push('/login');
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        // try {
        //     await authService.logout().then(
        //         () => {
        history.push('/search?query=' + searchText);
        //             window.location.reload();
        //         },
        //         (error) => {
        //             console.log(error);
        //         }
        //     );
        // } catch (err) {
        //     console.log(err);
        // }
    };

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    //             headerRef.current.classList.add('shrink')
    //         } else {
    //             headerRef.current.classList.remove('shrink')
    //         }
    //     })
    //     return () => {
    //         window.removeEventListener("scroll", null)
    //     };
    // }, []);

    // const [loginStatus, setLoginStatus] = useState(authService.isLoggedIn());

    // useEffect(() => {
    //     setLoginStatus(authService.isLoggedIn());
    //     window.location.reload();
    // }, [loginStatus])

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            {/* <i className="bx bx-search"></i> */}
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    className="Auth-form-input-search"
                                    value={searchText}
                                    onChange={(e) => { setSearchText(e.target.value); console.log(searchText) }}
                                />
                                {/* <div> */}
                                <button type="submit" className='Auth-form-button-search'>
                                    <i className="bx bx-search"></i>
                                </button>
                                {/* </div> */}
                            </form>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>

                        {authService.isLoggedIn() ?

                            <div className="header__menu__item header__menu__right__item">
                                <Link to='' onClike={handleLogout}>
                                    <i className='bx bx-log-out' onClick={handleLogout}></i>
                                </Link>
                            </div>

                            :

                            <div className="header__menu__item header__menu__right__item">
                                <Link to='/login'>
                                    <i className='bx bx-log-in'></i>
                                </Link>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
