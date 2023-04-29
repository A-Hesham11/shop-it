import React from 'react';
import formatCurrency from './CurrencyFormat';
import { useSelector } from 'react-redux';

const OrederSummary = () => {
    const cart = useSelector(state => state.cart.cartItems);
    const size = useSelector(state => state.cart.size);
    const subTotal = useSelector(state => state.cart.subTotal);

    return (
        <div className='order mb-4'>
            <p className='fw-semibold text-black-50'>ORDER SUMMARY</p>
            <div className='bg-primary'>
                <p className='fw-semibold m-0 border-bottom py-2 px-3'>1. ORDER DETAILS</p>
                <div > 
                    <div className='order-box order-content'>
                        {cart.map((product) => (
                            <div key={product.id} className='border-bottom p-3 d-flex align-items-center gap-3'>
                                <img src={product.shareImage} width={60}/>
                                <div className='w-100'>
                                    <p className='mb-2 fw-semibold text-muted' style={{fontSize:'13px'}}>{product.description}</p>
                                    <p className='mb-1 fw-semibold text-main' style={{fontSize:'14px'}}>{formatCurrency(product.price)}</p>
                                    <div className='d-flex align-items-center justify-content-between'>
                                    <p className='mb-0 fw-semibold text-muted' style={{fontSize:'13px'}}>Size: {size[product.id]}</p>
                                        <p className='mb-0 fw-semibold text-muted' style={{fontSize:'13px'}}>Qty: {product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='p-3 d-flex align-items-center justify-content-between'>
                        <p className='mb-0 fw-semibold' style={{fontSize:'14px'}}>SUB TOTAL</p>
                        <span className='fw-semibold' style={{fontSize:'14px'}}>{formatCurrency(subTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrederSummary;


