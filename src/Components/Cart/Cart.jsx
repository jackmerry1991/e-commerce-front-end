import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { deleteData, fetchDataProtected } from "../../UtilityFunctions/api";
import Stripe from "../Stripe/Stripe";
import deleteIcon from "../../Images/delete-icon.svg";
import './cart.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
    
  };



const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const shippingCost = 2.99;
    const [totalShippingCost, setTotalShippingCost] = useState(0);
    const [cartCost, setCartCost] = useState(0);
    const [paymentComplete, setPaymentComplete] = useState(false);
    // const [openConfirmModal, setOpenConfirmModal] = useState(false);
    // const [shouldRedirect, setShouldRedirect] = useState(false);

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    console.log(process.env.REACT_APP_STRIPE_KEY);
    
    const cartTotal = (cart) => {
        console.log('cartTotal callled');
        let total = 0;
        cart.forEach((item) => {
            console.log(item.price);
            total += (item.price * item.quantity_ordered) ;
        });
        setCartCost(total.toFixed(2));
    }

    const calcTotalShippingCost = (cart) => {
        const cost = shippingCost * cart.length;
        setTotalShippingCost(cost.toFixed(2));
    }

    const orderTotal = () => {
       const result = Number(totalShippingCost) + Number(cartCost);
       return result.toFixed(2);
    }

    useEffect(()=> {
        console.log('cart use effect running')           
        fetchDataProtected('carts/active-cart').then((response)=>{
            if(response){
                console.log(response.data)
                setCartItems(response.data);
                setIsLoading(false);
                cartTotal(response.data);
                calcTotalShippingCost(response.data);
            }
        }).catch((error)=> {
            console.log(error);
        })
    }, []);

    // useEffect(() => {
    //     setOpenConfirmModal(true)
    // }, [paymentComplete]);


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setPaymentComplete(false);
      }
    
    const deleteCartItem = async (itemId) => {
        console.log('delete cart item');
        console.log(itemId);
        const data = {productId: itemId}
        deleteData('/carts/remove-item', data).then((response) => {
            console.log(response);
            if(response){
                setCartItems(response.data);
                setIsLoading(false);
                cartTotal(response.data);
                calcTotalShippingCost(response.data);
            }
        });   
    }

    const openCheckoutModal = () => {
        setCheckoutModalOpen(true);
    }

    const closeCheckoutModal = () => {
        setCheckoutModalOpen(false);
    }

    const closePaymentModal = async () => {
        fetchDataProtected('carts/active-cart').then((response)=>{
            if(response){
                console.log(response.data)
                setCartItems(response.data);
                setIsLoading(false);
                cartTotal(response.data);
                calcTotalShippingCost(response.data);
                window.location.href = '/home';
            }
        }).catch((error)=> {
            console.log(error);
        });
    }

    return(
        <div className="cart-container">
            {!isLoading && (
                <div>
                    <h1>cart</h1>
                    <table className="cart-list">
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                {cartItems.map((item) => {
                    console.log(item.name);
                    return(
                    <tr key={item.product_id} className="cart-item-container">
                        <td>{item.name}</td>
                        <td>{item.quantity_ordered}</td>
                        {/* {item.images && item.images.length > 0 && (<img src={`${image}${item.images[0].image_name}`} alt={item.name} />)} */}
                        <td>£{item.price}</td>
                        <td><img src={deleteIcon} onClick={()=> deleteCartItem(item.product_id)} role="presentation" id={item.product_id} alt="delete"/></td>
                    </tr>
                    )
                })}
                </table>
                <div className="order-summary">
                    <h4>Cart Total: £{cartCost}</h4>
                    <h4>Shipping Total: £{totalShippingCost}</h4>
                    <h4>Order Total: £{orderTotal()}</h4>
                </div>
                <button onClick={() => openCheckoutModal()} type="button" className="cart-button">Checkout</button>
            </div>
            
            )}
           {checkoutModalOpen && (
               <Elements stripe={stripePromise}>
                <Stripe modalIsOpen={checkoutModalOpen} setModalClosed={closeCheckoutModal} setPaymentComplete={setPaymentComplete}/>
               </Elements>
           )}
           {paymentComplete && (
            <Modal
                modalIsOpen={paymentComplete}
                isOpen={paymentComplete}
                onRequestClose={() => closeModal}
                onAfterOpen={() => afterOpenModal}
                style={customStyles}
                contentLabel="Payment Modal"
                >
                <h2>Payment Complete</h2>
                    <button onClick={closePaymentModal} type="button" className="modal-button">Okay</button>
             </Modal>
           )}
     
        {/* {shouldRedirect && (
            <Redirect to="/my-orders" />
        )} */}
        </div>
    )
}

export default Cart;
