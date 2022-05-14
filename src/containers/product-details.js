import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/product-action';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {

    const product = useSelector(state => state.product);
    const {image, title, price, category, description} = product;

    const { productId } = useParams();
    const dispatch = useDispatch();
    console.log(product);

    

    const fetchProductsDetails = async() => {

        const url = `https://fakestoreapi.com/products/${productId}`;
        const resp = await axios
        .get(url)
        .catch((err) => {
            console.log('err',err)
        })

        dispatch(selectedProduct(resp.data));
    } 


    useEffect(() => {
            if (productId && productId !== "") fetchProductsDetails();
            return () => {
                dispatch(removeSelectedProduct())
            }
            
    },[productId])


    return (
    <div className='ui grid container'>

        {Object.keys(product).length === 0 ? (
            <div>Product Loading...</div>
        ) : (
            <div className='ui placeholder segment'>
                <div className='ui two column stackable center aligned grid'>
                    <div className='ui vertical divider'>AND</div>
                    <div className='middle aligned row'>
                        <div className='column 1p'>
                            <img className='ui fluid image' src={image} />  
                        </div>
                        <div className='column rp'>
                            <h1>{title}</h1> 
                            <h2>
                                <a className='ui teal tag label'>${price}</a>
                            </h2> 
                            <h2 className='ui brown block header'>{category}</h2> 
                            <p>{description}</p>
                            <div className='ui vertical animated button' tabIndex="0">
                                <div className='hidden content'>
                                    <i className='shop icon'></i>
                                </div>  
                                <div className='visible content'>Add to cart</div>  
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    </div>

    );
}

export default ProductDetails;