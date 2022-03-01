import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { postData, setUser, submitLogin } from '../../UtilityFunctions/api';
import './Login.css'

const Login = () => {
    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[failedLogin, setFailedLogin] = useState(0);
    const[errorMessage, setErrorMessage] = useState('');
    const[token, setToken] = useState('');

    const addQueuedItemsToCart = async () => {
        console.log('addqueuedtocart');
        const cart = JSON.parse(localStorage.getItem('cart'));
        
        console.log(cart);
        if(!cart) return;
        // const data = cart;
        console.log(cart);
        if(Array.isArray(cart)){
            cart.map( async (item) => {
                console.log('login postdata')
                await postData('/carts/add-item', item)
            })
        }else{
            console.log('login post data')
            await postData('/carts/add-item', cart)
        }
    }

    const handleSubmit= async (event) => {
        event.preventDefault();
        const successfulLogin = await submitLogin(userName.toLowerCase(), password);
        console.log(successfulLogin)
        if(successfulLogin === 401){
            const failedLoginAttempts = failedLogin + 1;
            setFailedLogin(failedLoginAttempts);
            return;
        }
        
        if(!successfulLogin){
            setErrorMessage('Something went wrong with our servers.');
            console.log(errorMessage);
            return;
        }

        if(successfulLogin){
            document.cookie = successfulLogin.data.token;
            await addQueuedItemsToCart();
            await setToken(successfulLogin.data);
            console.log(successfulLogin);
            await setUser(successfulLogin.data.user.id);
            console.log(successfulLogin.data.token);
            console.log(token);
            document.cookie = successfulLogin.data.token;
        }

    }

    const handleChange = (event) => {
        if(event.target.id === 'email'){
            setUserName(event.target.value);
        }else{
            setPassword(event.target.value);
        }
    }
    return(
        <div className="login-page">
            <div className="login-details-container">
              <h2>Sign in</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <input type='email' placeholder="Email" id="email" required onChange={handleChange}/>
                <input type='password' placeholder="Password" id="password" required onChange={handleChange}/>
                <input className="submit-button" type="submit"/>
              </form>
              <div className="password-reset-container">
              {failedLogin > 0 ? <p>Incorrect user details entered.</p> : <div />}
                  <Link to="/password-reset">Forgot Password</Link>
                  <Link to="/register">Register</Link>
              </div>
            </div>
            {token ? <Redirect to='/home'/> : <div />}
        </div>   
    )
}

export default Login
