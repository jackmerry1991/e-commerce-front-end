import React, {useState}  from 'react';
import { Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './product.css';
import { getUser, postData } from '../../UtilityFunctions/api';
import CartConfirmation from '../ItemAddedConfirmation/CartConfirmation';
import cartImage from '../../Images/shopping-basket.png';

const Product = (props) => {
    const {id, name, price, quantity, images} = props;
    const [itemConfirmedModalOpen, setItemConfirmedModalOpen] = useState(false);
    const image= `http://127.0.0.1:8000/`;
    
    const addToCart = async () => {
        if(!getUser()){
            console.log('user not logged in');
            const cartProduct = {id, name, quantity: 1};
            let existingCart = JSON.parse(localStorage.getItem("cart"));
            // const newItem = JSON.stringify(cartProduct);
            if(!existingCart){ 
                existingCart = [];
            }
            existingCart.push(cartProduct);
            console.log('cartObj')
            console.log(cartProduct);
            localStorage.setItem("cart", JSON.stringify(existingCart));
            setItemConfirmedModalOpen(true);
            return;
        }
        const data = {
            productId: id,
            quantity: 1
        };

        await postData('/carts/add-item', data)
       
        setItemConfirmedModalOpen(true);
    }
    console.log(image);
    return(
        <div className="product-container">
            {console.log(props)}
            <div className="product-container__top">
            {images.length > 0 && (<img src={`${image}${images[0].image_name}`} alt={name} />)}
            <Switch>
            <Link to={{pathname:`/product/${id}`}}><h3>{name.length > 20 ? `${name.substring(0,17)}...` : name}</h3></Link>
            </Switch>
            </div>
            <div className="product-details">
                <p>£{price}</p>
                <img role="presentation" src={cartImage} onClick={addToCart} alt="add to cart"/>
                {quantity ? <h5>In Stock</h5> : <h5>Out of Stock</h5>}
            </div>
            {itemConfirmedModalOpen && (
                <CartConfirmation itemConfirmedModalOpen={itemConfirmedModalOpen} setItemConfirmedModalOpen={setItemConfirmedModalOpen}/>
            )}
        </div>
    )
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    images: PropTypes.string,
}

Product.defaultProps = {
    images: ''
}

export default Product;