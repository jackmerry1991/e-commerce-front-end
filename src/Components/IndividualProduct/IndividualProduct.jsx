import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import CartConfirmation from '../ItemAddedConfirmation/CartConfirmation';
import 'react-multi-carousel/lib/styles.css';
import { fetchProductData, getUser, postData } from '../../UtilityFunctions/api';
import './individualProduct.css';
import cartIcon from '../../Images/cart-icon.png';


const IndividualProduct = (props) => {
    const {match} = props;
    const imagePath= `http://127.0.0.1:8000/`;
    const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    const {id} = match.params;
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [itemConfirmedModalOpen, setItemConfirmedModalOpen] = useState(false);
    // const [id, setId] = useState();
    // const {match} = props;
    // useEffect(()=> {
    //     setId(match.params.id);
    // }, [match.params.id])
    // console.log(id);
    // const [product, setProduct] = useState({});
    // TODO RENDER DATA AND THEN FIX API LIST TO USE 3 SEPERATE FUNCTIONS GET AND POST RESTRICTED AND GET UNRESTRICTED.
    useEffect(() => {
        setIsLoading(true);
        console.log(id);
        fetchProductData(`products/id-search/${props.match.params.id}`).then((data)=>{
            console.log(data);
            if(!data) return;
            if(!Array.isArray(data.data)) return;
            setProduct(data.data[0]);
            setIsLoading(false);
        });
    }, [id]);

    const addToCart = async () => {
        console.log('add to cart clicked');
        if(!getUser()){
            console.log('user not logged in');
            const cartProduct = {id: product.id, name: product.name, quantity: 1};
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
            productId: product.id,
            quantity: 1
        };
        await postData('/carts/add-item', data)
       
        setItemConfirmedModalOpen(true);

    }

    console.log('product')
    console.log(product);
    return(
        <div>
            {isLoading ? (
                <p>Loading</p>
            ) :
            <div className="individual-product-container">
                <h1>{product.name}</h1>
                <div className="carousel-container">
                <Carousel responsive={responsive}
                          containerClass="carousel-inner"
                          swipeable={false}
                          >
                        {product.productImage.map((image) =>                        
                                <div className="carousel-image-container" key={image.id}>
                                    <img src={`${imagePath}${image.image_name}`} alt={product.name} className="individual-product-carousel-image"/>
                                </div>
                        )}
                </Carousel>
                </div>
                <div className="individual-product-container-bottom">
                    <h2>{`£${product.price}`}</h2>
                    <h3>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</h3>
                    <p>{product.description}</p>
                </div>
                <button onClick={addToCart} type="button" className="cart-button">Add to Cart <img className="button-image" src={cartIcon} alt="cart" /></button>
             {itemConfirmedModalOpen && (
                 <CartConfirmation itemConfirmedModalOpen={itemConfirmedModalOpen} setItemConfirmedModalOpen={setItemConfirmedModalOpen}/>
             )}
            </div>
        }
        </div>
    )
    
}

IndividualProduct.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

// IndividualProduct.defaultProps = {
//     images: '',
// }

export default IndividualProduct;