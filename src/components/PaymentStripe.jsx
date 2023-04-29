import {  CardElement } from '@stripe/react-stripe-js';
import  { React, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemsCart } from '../rtk/reducers/cartReducer';
import formatCurrency from './CurrencyFormat';
import { addToOrder } from '../rtk/reducers/orderReducer';
import { deleteItemsCheck } from '../rtk/reducers/checkoutReducer';
import { getUserOrderAPI, postUserOrderAPI } from '../rtk/reducers/index';
import { Timestamp } from 'firebase/firestore';
import { setLoading } from '../rtk/reducers/userOrderReducer';

const PaymentStripe = () => {

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const subTotal = useSelector(state => state.cart.subTotal);
    const size = useSelector(state => state.cart.size);
    const checkOut = useSelector(state => state.checkout.checkoutItems);
    const cart = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        checkOut.map((user) => (
            setUserInfo({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                information: user.information,
                region: user.region,
                date: user.date,
            })
        ))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        await cart.map((item) => {
            dispatch(addToOrder(item));
        })
        setError(null);
        dispatch(setLoading(true))
        const payload = {
            subTotal: subTotal,
            size: size,
            userInfo: userInfo,
            cart: cart,
            timestamp: Timestamp.now(),
        }
        dispatch(postUserOrderAPI(payload));
        setTimeout(() => {
            setProcessing(false);
            dispatch(deleteItemsCart());
            dispatch(deleteItemsCheck());
            navigate("/", {replace: true});
            dispatch(setLoading(false));
        }, 3000);
    };

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(error ? error.message : "");
    };

    useEffect(() => {
        dispatch(getUserOrderAPI());
    }, []);

    return (
        <div className='bg-primary mb-3 rounded-3' style={{boxShadow: "0 2px 5px 0 rgba(0,0,0,.05)"}}>
            <div className='d-flex align-items-center gap-4 border-bottom py-2 px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={22} fill='#E2E2E2'>
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                </svg>
                <p className='fw-semibold m-0'>2. PAYMENT METHOD </p>
            </div>
            <div className='px-5 py-4'>
                <Form onSubmit={handleSubmit}>
                    <div className='py-4 '>
                        <CardElement onChange={handleChange}/>
                    </div>
                    <p className='fw-semibold'>Order Total : <span>{formatCurrency(subTotal)}</span></p>
                    <button type='submit'  disabled={processing || disabled} 
                        className='w-100 p-2 mt-3 text-white fw-semibold'
                        style={{backgroundColor: processing ? "#39c7a5e0" : '#39C7A5'}}
                    >
                        {processing 
                            ? <div className='payment-processing d-flex align-items-center justify-content-center gap-2 fw-bold'>
                                <span>Processing</span>
                                <div className='payment-loading d-flex align-items-center gap-2'>
                                    <div className='one'></div>
                                    <div className='two'></div>
                                    <div className='three'></div>
                                </div>
                            </div> 
                            : <span style={{fontSize:'18px'}}>Buy Now</span> 
                        }
                    </button>
                    {error && <div>{error}</div>}
                </Form>
            </div>
        </div>
    );
};
export default PaymentStripe;

 