import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Banner from './Components/Banner/Banner'
import PasswordReset from './Components/PasswordReset/PasswordReset'
import OrdersList from './Components/Orders/OrdersList'
import './App.css'
import ProductList from './Components/ProductList/ProductList'
import UserAccount from './Components/UserAccount/UserAccount'
import IndividualProduct from './Components/IndividualProduct/IndividualProduct'
import Cart from './Components/Cart/Cart'


function App() {
    return (
        <div className="main-page-container">
            <Router>
                <Banner />
                <Switch>
                <Redirect exact from="/" to="/home" />
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
                    <Route path="/products-search">
                        <ProductList />
                    </Route>
                    <Route path="/products/:searchTerm" component={ProductList} />
                     
                    <Route path="/my-account">
                        <UserAccount />
                    </Route>
                    <Route path="/category-search/:category">
                        <ProductList />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/product/:id" component={IndividualProduct} />
                    <Route path="/my-orders">
                        <OrdersList />
                    </Route>                
                    </Switch>
            </Router>
        </div>
    )
}

export default App
