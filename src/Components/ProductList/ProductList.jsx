import React from "react"
import {useLocation} from 'react-router-dom'
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { fetchData, searchByProduct } from "../../UtilityFunctions/api";
import Product from "../Products/Product"
import './productList.css';

const productList = () => {
    const[products, setProducts] = React.useState([]);
    console.log('location state');
    const location = useLocation(); 
    const[searchTerm, setSearchTerm] = React.useState();
  
    React.useEffect(() => {
        console.log('location state useeffect running');
        console.log('location.state');
        console.log(location.state);
        if(!location.state.searchTerm){
            setSearchTerm('');
        }else{
            setSearchTerm(location.state.searchTerm);
        }
    }, [location.state.searchTerm])


    React.useEffect(() => {
        console.log('searchterm')
        console.log(searchTerm);
        if(!searchTerm){
            console.log('no search term provided')
            fetchData('products/').then(data =>
                setProducts(data.data)
            ); 
        }else{
            console.log('search term given');
            searchByProduct(searchTerm).then(data =>
                setProducts(data.data)
            ); 
        }
    }, [searchTerm]);

    return(
        <div>
            <h1>Search Products</h1>
        <div className="product-list-container">
            {products.map((product) => 
               <Product key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} quantity={product.quantity} images={product.productImage}/>
            )}
        </div>
        </div>

    )
}

export default withRouter(productList);