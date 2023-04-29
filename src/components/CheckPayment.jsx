import  { React } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PaymentStripe from './PaymentStripe';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { removeItemCheck } from '../rtk/reducers/checkoutReducer';

const CheckPayment = () => {
    const checkOut = useSelector(state => state.checkout.checkoutItems);
    const dispatch = useDispatch();

    const stripePromise = loadStripe('pk_test_51MdhZEEEQUh9H8brB04jALlvs3RtxyhZa66kbwQdMcJSoCjYQAXIDibcxxMdZt3vZwAcTw9jukiR35QsILViRJdB00T4paVGbZ');

    const handleRemoveOrder = (id) => {
        dispatch(removeItemCheck(id))
    };

    return (
        <div className='checkout-payment' style={{backgroundColor:'#F5F5F5', height:'100vh'}}>
            <Container>
                <div className='pt-5'>
                    <p className='fw-semibold text-black-50'>CHECKOUT</p>
                    <div className='bg-primary mb-3 rounded-3' style={{boxShadow: "0 2px 5px 0 rgba(0,0,0,.05)"}}>
                        {checkOut.map((item ) => (
                            <div key={item.id} className=''>
                                <div className='d-flex align-items-center justify-content-between border-bottom py-2 px-4'>
                                    <div className='d-flex align-items-center gap-4 '>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={22} fill='#39C7A5'>
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                        </svg>
                                        <p className='fw-semibold m-0'>1. ADDRESS DETAILS</p>
                                    </div>
                                    <button onClick={() => handleRemoveOrder(item.id)} className='mb-0 text-danger bg-transparent fw-semibold'>Cancel</button>
                                </div>
                                <div className='px-5 py-3'>
                                    <div>
                                        <span className='fw-semibold'>{item.firstName} </span>
                                        <span className='fw-semibold'>{item.lastName}</span>
                                    </div>
                                    <div className='text-black-50' style={{fontWeight:'14px'}}>
                                        <span >{item.information}, </span>
                                        <span >{item.region}</span>
                                    </div>
                                    <p className='text-black-50 mb-3'>{item.phoneNumber}</p>
                                    <div className='d-flex gap-2' style={{fontWeight:'14px'}}>
                                        <p className='fw-semibold'>Time Order : </p>
                                        <p className='text-black-50'>{item.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Elements stripe={stripePromise}>
                    <PaymentStripe />
                </Elements>
            </Container>
        </div>
    );
};
export default CheckPayment;
