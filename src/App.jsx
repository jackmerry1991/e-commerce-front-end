import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Banner from './Components/Banner/Banner'
import PasswordReset from './Components/PasswordReset/PasswordReset'
import './App.css'

function App() {
    return (
        <div>
            <Banner />
            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password-reset">
                        <PasswordReset />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
