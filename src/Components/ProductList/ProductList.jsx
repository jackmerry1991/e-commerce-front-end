import React from "react"
import { getRequest } from "../../UtilityFunctions/api";
import Product from "../Products/Product"

const productList = () => {
    // const products = ['prod 1', 'prod 2', 'prod 3'];
    const[products, setProducts] = React.useState([]);

    React.useEffect(() => {
        getRequest('products/').then(data =>
            setProducts(data.data)
        );
    }, []);

    return(
        <div className="product-list-container">
            {products.map((product) => 
               <Product name={product.name} description={product.description} price={product.price} quantity={product.quantity}/>
            )}
        </div>
    )
}

export default productList;