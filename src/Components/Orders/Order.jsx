import React from 'react';
import PropTypes from 'prop-types';


const Order = (props) => {
    const {orderCode, orderDate, totalCost} = props;
    return (
        <div>
            <h4>{orderCode}</h4>
            <h5>{orderDate}</h5>
            <h5>£{totalCost}</h5>
        </div>
    )
}

Order.propTypes = {
    orderCode: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    totalCost: PropTypes.string.isRequired
}

export default Order;