import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import closeIcon from '../../Images/close-menu.svg';

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


const CartConfirmation = (props) => {
    const {itemConfirmedModalOpen, setItemConfirmedModalOpen} = props;

    useEffect(() => {
        const timer = setTimeout(() => setItemConfirmedModalOpen(false), 5000);

        return() => clearTimeout(timer);
    });

    function afterOpenModal() {

    }

    function closeModal() {
        console.log('closeModal clicked')
        setItemConfirmedModalOpen(false);
      }

    return(
        <Modal
        isOpen={itemConfirmedModalOpen}
        onAfterOpen={() => afterOpenModal}
        onRequestClose={() => closeModal}
        style={customStyles}
        >
            <div>
                <img role="presentation" src={closeIcon} onClick={closeModal} alt="menu" />
            </div>
            <h2>Item Added to Cart</h2>
        </Modal>
    )
} 

CartConfirmation.propTypes = {
    itemConfirmedModalOpen: Boolean.isRequired,
    setItemConfirmedModalOpen: propTypes.func.isRequired,
}

export default CartConfirmation;