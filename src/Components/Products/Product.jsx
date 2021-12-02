import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Product = (props) => {
    const {name, description, price, quantity} = props;

    return(
        <div className="product-container">
            {console.log(props)}
            <img src="test" alt={name} />
            <Link to="/product"><h1>{name}</h1></Link>
            <div className="product-details">
                <h2>£{price}</h2>
                <p>{description}</p>
                {quantity ? <h5>{quantity} Remaining</h5> : <h5>Out of Stock</h5>}
            </div>
        </div>
    )
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
}

export default Product;