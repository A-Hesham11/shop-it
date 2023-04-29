import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemOrder } from '../rtk/reducers/orderReducer';
import formatCurrency from './CurrencyFormat';

const Orders = ({showOrder}) => {
    const orders = useSelector(state => state.orders.orderItems);
    const size = useSelector(state => state.cart.size);
    const dispatch = useDispatch();

    const removeItemFromOrder = (id) => {
        dispatch(removeItemOrder(id));
    };
    
    return (
        <div className={`stores mt-2 ${showOrder}`}>
            {orders.length === 0 
                ? (
                    <div className='text-center position-relative' style={{left:'50%', transform:"translate(-50%, 30%)"}}>
                        <img src='/image/emptyCart.svg' width={300} />
                        <p className='mt-4 text-center text-black-50 fw-semibold ls-2'>Your order is empty!</p>
                    </div>
                    ) 
                : (
                    <div className='stores-product pb-0 mt-2'>
                        {orders.length > 0 && (
                            <Fragment>
                                {orders.map((item, index) => (
                                    <div key={index} className='rounded-4 px-3 pt-3 pb-1 m-2 position-relative bg-primary' style={{ marginBottom:'11px'}}>
                                        <button className='btn-delete position-absolute' onClick={() => removeItemFromOrder(item.id) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={12} fill='#00000080'>
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                        <div className='mb-3'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <img src={item.shareImage} style={{width:'50px'}}/>
                                                <div className='w-50'>
                                                    <p className='text-black-50 mb-0' style={{fontSize:'13px', height:'24px'}}>{item.description}</p>
                                                    <p className='fe-semibold mb-0'>{formatCurrency(item.price)}</p>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='mb-0 fw-semibold text-muted' style={{fontSize:'13px'}}>Qty: {item.quantity}</p>
                                                        <p className='mb-0 fw-semibold text-muted' style={{fontSize:'13px'}}>Size: {size[item.id]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </div>
                )
            }
        </div>
    );
};
export default Orders;
