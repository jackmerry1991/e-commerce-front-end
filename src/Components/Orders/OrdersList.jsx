import React, { useEffect, useState } from 'react';
import { fetchDataProtected } from '../../UtilityFunctions/api';
import Order from './Order'

const OrdersList = () => {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataProtected('orders/all').then((response)=>{
            console.log(response);
            if(response){
                setOrderData(response.data);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return(
        <div className="orders-list-container">
        <h1>My Past Orders</h1>
            {!isLoading && (
                orderData.length > 0 ? (orderData.map((order) => 
                    <Order orderCode={order.stripe_confirmation} orderDate ={order.date_ordered} totalCost={order.total_cost}/>
                    )
                ) : <p>No order history</p>
            )     
        }
        </div>
    )
}

export default OrdersList;