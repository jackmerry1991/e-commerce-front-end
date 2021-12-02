import React, { useEffect, useState } from 'react'
import './Banner.css'
import menuIcon from '../../Images/menu-icon.svg'
import closeIcon from '../../Images/close-menu.svg'
import {searchByProduct, userLoggedIn} from '../../UtilityFunctions/api'


const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [dropDownMenuClass, setDropDownMenuClass] = useState('mobile-drop-down-closed');
    const [overlayClass, setOverlayClass] = useState('menu-overlay');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = () => {
        searchByProduct(searchTerm)
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
        userLoggedIn().then((result)=> {
            console.log(result);
            setIsLoggedIn(result);
        })
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
                        <ul>
                            <a href="/Home">Home</a>
                            <a href="/ContactUs">Contact Us</a>
                            <a href="/Cart">Cart</a>
                            {isLoggedIn ? <a href="/my-account">My Account</a>:<a href="/Login">Sign In</a>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
