import React, { useState } from 'react'
import './Banner.css'
import logo from '../../Images/e-commerce-logo.png'
import searchByProduct from '../../UtilityFunctions/api'

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = () => {
        searchByProduct(searchTerm)
    }
    return (
        <div className="banner">
            <div className="banner-left">
                <img className="banner-logo" src={logo} alt="site-logo" />
            </div>
            <button className="hamburger-menu-button" type="button">
                ::
            </button>
            <li className="banner-links">
                <ul>Home</ul>
                <ul>Categories</ul>
            </li>
            <div className="banner-rightSide">
                <div className="banner-searchBar">
                    <input
                        type="text"
                        placeholder="search"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        Search
                    </button>
                </div>
                <ul>
                    <li>Sign in</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

export default Banner
