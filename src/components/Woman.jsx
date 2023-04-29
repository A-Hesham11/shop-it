import React, { Fragment, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAPI } from '../rtk/reducers/index';
import formatCurrency from './CurrencyFormat';
import { addToCart } from '../rtk/reducers/cartReducer';
import { loadClickedButtons, removeButtonClicked, setButtonClicked } from '../rtk/reducers/productReducer';
import { addToStores } from '../rtk/reducers/storesReducer';

const Woman = () => {
    const products = useSelector(state => state.products.productItems);
    const clickedButtons = useSelector(state => state.products.clickedButtons);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadClickedButtons());
    }, [dispatch]);
  
    const handleAddToStores = (product, productId) => {
        dispatch(addToStores(product));
        if(clickedButtons[productId]) {
            dispatch(removeButtonClicked(productId)); 
        } else {
            dispatch(setButtonClicked(productId)); 
        };
    };

    useEffect(() => {
        dispatch(getProductsAPI());
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className='woman'>
            <img src='/image/Woman/landing.jpg' className='landing-img w-100'/>
            <Container>
                <div className='product-text text-center py-4'>
                    <h2 className='fw-bold position-relative mt-4 mb-4'>Woman's Clothing</h2>
                    <p className='text-black-50'>Here you can check out our new products with fair price on shopit</p>
                </div>
                <div className='row'>
                {products.map((product) => (
                    <Fragment key={product.id}>
                        {product.category === "woman" && (
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                                <Card className='mx-2 mx-md-0 rounded-3 product-curd'>
                                    <div className='overflow-hidden position-relative'>
                                        <Card.Img variant="top" src={product.shareImage} className='img-fuild' style={{height:'360px'}}/>
                                        <div className='loved-btn bg-secondary'>
                                            <button className='bg-transparent' onClick={() => handleAddToStores(product, product.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={22} fill={`${clickedButtons[product.id] ? "red" : "white"}`}>
                                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='quick-view'>
                                            <button className='w-100 bg-transparent fw-semibold py-2' onClick={() => handleAddToCart(product)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={14} className="me-2 mb-1">
                                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                                </svg>
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                    <Card.Body className='text-start px-1 pt-2 pb-0'>
                                        <p className='text-black-50 mb-1' style={{fontSize:'13px'}}>
                                            <span>{product.description} </span>({product.category})
                                        </p>
                                        <div className="d-flex">
                                            {Array(5)
                                            .fill()
                                            .map((_, index) => (
                                                <p key={index} className='mb-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={18} fill='#FFA41C'>
                                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                                    </svg>
                                                </p>
                                            ))}
                                        </div>
                                        <p className='fw-semibold mb-2' style={{fontSize:'14px'}}>
                                            {formatCurrency(product.total)}/
                                            <span className='text-decoration-line-through text-black text-opacity-25'>
                                                {formatCurrency(product.price)}
                                            </span> 
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </Fragment>
                ))}
                </div>
            </Container>
        </div>
    );
};
export default Woman;