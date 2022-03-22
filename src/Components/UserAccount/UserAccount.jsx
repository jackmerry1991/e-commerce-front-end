import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { fetchUserData, updateUserData } from "../../UtilityFunctions/api";
import './userAccount.css'

const UserAccount = () => {
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log('use effect started')
        fetchUserData().then((data) => {
            console.log('use effect');

            setUserData(data[0]);
            
            console.log(userData)
            console.log('user data set')
        });
    }, [])

    useEffect(() => {
        
        if(!userData) return;
        console.log('user data set after then')
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setCity(userData.city);
        setStreet(userData.street);
        setEmail(userData.email);
        setPostcode(userData.post_code);
    }, [userData])

    const handleChange = (event) => {
        const eventTarget = event.target.id;
    
        switch(eventTarget){
            case 'email':
                setEmail(event.target.value);
                break;
            case 'first-name':
                setFirstName(event.target.value);
                break;
            case 'last-name':
                setLastName(event.target.value);
                break;
            case 'city':
                setCity(event.target.value);
                break;
            case 'street':
                setStreet(event.target.value);
                break;
            case 'post-code':
                setPostcode(event.target.value);
                break;
            default:
                console.log('error, no matching target found.');
        }
    }

    const handleSubmit = async () => {
        const data = {
            email,
            firstName,
            lastName,
            street,
            city,
            postcode,
        }

        const updated = await updateUserData(data);
        if(updated){
            setSubmitted(true);
        }
    }

    return(
        <div>
            {userData && (
                <div className="user-account-container">
            <div className="page-heading">
                {userData ? <h1>{` Hello ${userData.first_name} ${userData.last_name}`}</h1> : <h1>No data</h1>}
            </div>
            <div className="details-container">
                <h2>My Details</h2>
                    <label htmlFor="first-name">First Name: <input placeholder={userData.first_name} id="first-name" onChange={handleChange}/></label>
                    <label htmlFor="last-name">Last Name: <input placeholder={userData.last_name} id="last-name" onChange={handleChange}/></label>
                <div className="details-container">
                    <h2>Address</h2>
                    <label htmlFor="street">Street: <input placeholder={userData.street} id="street" onChange={handleChange}/></label>
                    <label htmlFor="city">City: <input placeholder={userData.city} id="city" onChange={handleChange}/></label>
                    <label htmlFor="post-code">Post Code: <input placeholder={userData.post_code} id="post-code" onChange={handleChange}/></label>
                </div>
                <div className="details-container">
                    <h2>Login Details</h2>
                    <label htmlFor="email">Email: <input  type="email" placeholder={userData.email} id="email" onChange={handleChange}/></label>
                    <label htmlFor="email-confirm">Confirm New Email: <input  type="email" placeholder='confirm new email' id="email-confirm" onChange={handleChange}/></label>
                </div>
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
                <Link to="password-reset" className="link">Reset Password</Link>
                {submitted && (
                    <div>
                        <h2>Your Details Have Been Updated</h2>
                        <button type="button">Confirm</button>
                    </div>
                )}
            </div>
            </div>
            )}
        </div>
    )
}

export default UserAccount