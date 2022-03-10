import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './home.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import image1 from '../../Images/techPics.png'
import image2 from '../../Images/laptopsFront.png'
import image3 from '../../Images/headphones.jpg'
import { fetchData } from '../../UtilityFunctions/api';

const responsive = {
     desktop: {
       breakpoint: { max: 3000, min: 1024 },
       items: 1,
     },
     tablet: {
       breakpoint: { max: 1024, min: 464 },
       items: 1,
     },
     mobile: {
       breakpoint: { max: 464, min: 0 },
       items: 1,
     }
   };



const Home = () => {

const homePageImages = [
     {image: image1, heading: 'Welcome to e-Store'},
     {image: image2, heading: 'Great prices on Laptops'},
     {image: image3, heading: 'Great deals on headphones and speakers'}
]
const[categories, setCategories] = useState([]);
const[isLoading, setIsLoading] = useState(true);

const history = useHistory();

useEffect(() => {
     fetchData('products/categories').then((data) => {
          console.log(data.data.result)
          setCategories(data.data.result);
          setIsLoading(false);
     }).catch((err) => {
          console.log(err);
     });
}, []);

return(
     <div className="home-container">
          <div className="home-container__top">
               <Carousel 
                      responsive={responsive}
                      showDots
                      autoPlay
                      autoPlaySpeed={6000}
                      shouldResetAutoplay
                      infinite
                      ssr
                      removeArrowOnDeviceType='mobile'
               >
                    {console.log(homePageImages)}
                    {homePageImages.map((imageItem) => 
                    // console.log(imageItem)
                         <div className="home-image-container" style={{ background: `url(${imageItem.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                              {console.log(imageItem.heading)}
                              {console.log(imageItem.image)}
                              <h1>{imageItem.heading}</h1>
                              <button type="button" onClick={()=>history.push('/search-products')}>Browse All</button>
                         </div>
                         )
                    }
               </Carousel>
          </div>
          <div>
               <h2>Shop By Category</h2>
               {!isLoading && (
                    <ul>
                    {categories.map((category) => 
                         <li><Link to={{pathname: `/category-search/${category.category}`, state:{category: category.category}}}>{category.category}</Link></li>
                   )}
                   </ul>
               )}
          </div>
     </div>
     )
}
export default Home
