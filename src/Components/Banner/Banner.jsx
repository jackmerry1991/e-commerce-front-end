import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, useHistory } from 'react-router-dom'
import './Banner.css'
import '../../App.css'
import menuIcon from '../../Images/menu-icon.svg'
import closeIcon from '../../Images/close-menu.svg'
import searchIconImage from '../../Images/search_black_24dp.svg';

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [dropDownMenuClass, setDropDownMenuClass] = useState('mobile-drop-down-closed');
    const [overlayClass, setOverlayClass] = useState('menu-overlay');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userId'));
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    
    const history = useHistory();

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const searchParam = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
        console.log(`search param ${searchParam}`);
        // const searchResults = await searchByProduct(searchParam);
        history.push({
            pathname: '/products-search',
            search: `?query=${searchParam}`,
            state: { searchTerm: searchParam }
          })
    }

    const toggleSearchModal = () => {
        setSearchModalOpen(!searchModalOpen);
    }
    
    const toggleDropDown = async () => {
        await setDropDownIsOpen(!dropDownIsOpen);
        console.log(!dropDownIsOpen)
        if(!dropDownIsOpen){
            console.log('opening menu');
            setDropDownMenuClass('mobile-drop-down-open')
            setOverlayClass('menu-overlay-active');
        }else{
            console.log('closing menu');
            setDropDownMenuClass('mobile-drop-down-closed');
            setOverlayClass('menu-overlay');
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('userId');
        if(user){
            setIsLoggedIn(user);
        }
        console.log(isLoggedIn)
    }, [dropDownIsOpen]);

    return (
        <div className="banner">
            <div className={overlayClass} role="presentation" onClick={toggleDropDown}/>
            <div className="banner-left">
                <a href="/Home" className="banner-logo-link">
                <div className="banner-logo-outer">
                    <h1 className="banner-logo" >e-Store</h1>
                </div>
                </a>
            </div>
            <li className="banner-links">
                <ul>Home</ul>
                <ul>Categories</ul>
                <ul>Contact Us</ul>
            </li>
            <div className="banner-rightSide">
                <div className="banner-searchBar">
                    <input
                        type="text"
                        placeholder="search"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button className="banner-searchBar-button" type="submit" onClick={handleSubmit}>
                        Search
                    </button>

                    <img className="search-icon" role="presentation" onClick={toggleSearchModal} src={searchIconImage} alt="search"/>

                </div>
                <ul>
                    {isLoggedIn ? <li>My Account</li> : <li>Sign in</li>}
                    <li>Cart</li>
                </ul>
                <div className="menu-container">{
                    dropDownIsOpen ? <img className="mobile-burger-menu" role="presentation"src={closeIcon} onClick={toggleDropDown} alt="menu"/> : 
                    <img className="mobile-burger-menu" role="presentation"src={menuIcon} onClick={toggleDropDown} alt="menu"/>
                }
                    <div className={dropDownMenuClass} id="menu-open">
                    <div className="mobile-drop-down-top">
                       <img className="mobile-burger-menu" role="presentation"src={closeIcon} onClick={toggleDropDown} alt="menu"/>
                    </div>
                    <div className="mobile-drop-down-top-lower">
                            <BrowserRouter>
                              <Link to={`/Search?/${searchTerm}`} className="mobile-drop-down-search">
                                <img className="search-icon" src={searchIconImage}
                                alt="search"
                                />
                              </Link>
                            </BrowserRouter>
                    </div>
                        <ul className="mobile-drop-down-list">
                            <a href="/Home">Home</a>
                            <a href="/ContactUs">Contact Us</a>
                            <a href="/Cart">Cart</a>
                            {isLoggedIn ? <a href="/my-account">My Account</a>:<a href="/Login">Sign In</a>}
                            {isLoggedIn && <a href="/my-orders">My Orders</a>}
                        </ul>
                    </div>
                </div>
            </div>
            {searchModalOpen && (
                <div className="search-modal">
                    <div className="search-modal__bar">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Search' onChange={handleChange}/>
                        </form>
                        <img className="drop-down-close-button" role="presentation"src={closeIcon} onClick={toggleSearchModal} alt="close"/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Banner
