import React from 'react';
import Modal from 'react-modal';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import propTypes from 'prop-types';
import './stripe.css';
import { postData } from '../../UtilityFunctions/api';

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

//   Modal.setAppElement('#App');

const Stripe = (props) => {

    const [cardHolderName, setCardHolderName] = React.useState('');
    const [paymentError, setPaymentError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const {setModalClosed, setPaymentComplete} = props;
    const stripe = useStripe();
    const elements = useElements();
    // function openModal() {
    //     setIsOpen(true);
    //   }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setModalClosed(false);
      }

    const handleOnChange = (event) => {
        setCardHolderName(event.target.value);
    }

    // const confirmPayment = () => {
    //     console.log('payment confirmed')

    //     // setPaymentComplete(true);
    // }

    const handleSubmit = async (event) => {
        console.log('handle submit');
        event.preventDefault();
        setIsLoading(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if(error){
            console.log(error);
            setIsLoading(false);
            setPaymentError(error.message);
        }else{
            const data = {
                cardHolderName,
                paymentMethod
            }
            console.log("Stripe 23 | token generated!", paymentMethod);
            const submitOrder = await postData('/carts/checkout', data);
            console.log(submitOrder)

            if(submitOrder.error){
                console.log(submitOrder.error);
                setPaymentError(submitOrder.error.message);
                setIsLoading(false);
            }else{
                setIsLoading(false);
                setModalClosed(true);
                setPaymentComplete(true);
            }
        }
    }


    const {modalIsOpen} = props;
    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => afterOpenModal}
        onRequestClose={() => closeModal}
        style={customStyles}
        contentLabel="Payment Modal"
        >
        <div className='payment-form-container'>
            <h1>Complete Payment</h1>
            <input type='text' placeholder="Name on Card" id="cardholder-name" required onChange={handleOnChange}/>
            <CardElement />
            <button type="submit" onClick={handleSubmit}>{isLoading ? 'Loading...' : 'Pay'}</button>
        {paymentError && (
            <span>{paymentError}</span>
        )} 
        <button type="button" onClick={()=>setModalClosed(true)}>Cancel</button>
        </div>
        </Modal>
    )
}

Stripe.propTypes = {
    modalIsOpen: Boolean.isRequired,
    setModalClosed: propTypes.func.isRequired,
    setPaymentComplete: propTypes.func.isRequired
}


export default Stripe