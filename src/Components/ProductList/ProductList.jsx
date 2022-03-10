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
    const[categorySearch, setCategorySearch] = React.useState();

    React.useEffect(() => {
        console.log('location state useeffect running');
        console.log('location.state');
        console.log(location);
        console.log('state' in location);
        
        if(!location.state){
            setSearchTerm('');
            return;
        }

        if(!('searchTerm' in location.state)){
            if(!('category' in location.state)){
                setSearchTerm('');
            }else{
                setCategorySearch(location.state.category);
            }
        }else{
            setSearchTerm(location.state.searchTerm);
        }
    }, [location.state])


    React.useEffect(() => {
        console.log('searchterm')
        console.log(searchTerm);
        console.log('category search');
        console.log(categorySearch);

        if(!location.state){
            fetchData('products/').then(data =>
                setProducts(data.data)
            ); 
        }

        if(categorySearch){
            console.log('category search term given');
            searchByProduct('category-search', categorySearch).then(data =>
                setProducts(data.data)
            ); 
        }
        
        if(searchTerm){
            console.log('search term given');
            searchByProduct('search', searchTerm).then(data =>
                setProducts(data.data)
            ); 
        }
        
    }, [searchTerm, categorySearch]);

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