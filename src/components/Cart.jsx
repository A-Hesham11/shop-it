import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from './CurrencyFormat';
import { addToCart, removeItem, deleteItem, getSize } from '../rtk/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

const Cart = ({closeCart}) => {
    const [size, setSize] = useState({});
    const cart = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const delivery = useSelector(state => state.cart.delivery);
    const subTotal = useSelector(state => state.cart.subTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increamentItem = (id, description, shareImage, price) => {
        dispatch(addToCart({
            id,
            description,
            shareImage,
            price,
        }))
    };

    const decreament = (id) => {
        dispatch(removeItem(id));
    };

    const handleRemove = (id) => {
        dispatch(deleteItem(id));
    };

    const handleCheckOut = () => {
        dispatch(getSize(size));
        closeCart();
        navigate('/checkout');
    };

    useEffect(() => {
        const selectSize = {};
        cart.forEach((item) => {
            selectSize[item.id] = ""; 
        });
        setSize(selectSize);
    }, []);

    return (
        <div className='cart mt-2'>
            {cart && cart.length === 0 
                ? ( <div className='text-center position-relative' style={{left:'50%', transform:"translate(-50%, 30%)"}}>
                        <img src='/image/emptyCart.svg' width={300} />
                        <p className='mt-4 text-center text-black-50 fw-semibold ls-2' style={{letterSpacing:'0.7px'}}>Add some items to your cart</p>
                    </div>
                ) 
                : ( <div className='cart-product p-0'>
                        {cart.length > 0 && (
                            <Fragment>
                                {cart.map((item) => (
                                    <div key={item.id} className=' rounded-4 p-3 m-2 position-relative bg-primary' style={{ marginBottom:'11px'}}>
                                        <button className='btn-delete position-absolute' onClick={() => handleRemove(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={12} fill='#00000080'>
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                        <div className='mb-3'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <img src={item.shareImage} style={{width:'50px'}}/>
                                                <div style={{width: '269px'}}>
                                                    <p className='text-black-50 mb-2' style={{fontSize:'13px'}}>{item.description}</p>
                                                    <p className='fe-semibold mb-0'>{formatCurrency(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <select id={item.id} 
                                                className="form-select shadow-none border border-2 border-secondary" 
                                                style={{width:'35%',cursor:'pointer'}}
                                                value={size[item.id]} 
                                                onChange={(e) => setSize({...size,[item.id]: e.target.value,})}
                                                aria-label="Default select example"
                                            >
                                                <option className='d-none'>Size</option>
                                                <option value="Small">Small</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Large">Large</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                            </select>
                                            <div >
                                                <button onClick={() => decreament(item.id)}  className='bg-transparent rounded-3 text-main border border-2 border-secondary' style={{width:'29px', height:'30px'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12} fill='#00a099'>
                                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                                    </svg>
                                                </button>
                                                <span className='py-2 px-3'>{item.quantity}</span>
                                                <button onClick={() => increamentItem(item.id, item.description, item.shareImage, formatCurrency(item.totalPrice))} label="Click me" className='bg-main rounded-3 text-white' style={{width:'29px', height:'30px'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='white' width={12} style={{marginBottom:'2px'}}>
                                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='cart-price rounded-5 px-4 py-3 bg-primary'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='fw-semibold'>Total</p>
                                        <p className='fw-semibold'>{formatCurrency(totalAmount)}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='fw-semibold'>Delivery</p>
                                        <p className='fw-semibold'>{formatCurrency(delivery)}</p>
                                    </div>
                                    <div className='cart-total d-flex align-items-center justify-content-between pt-3'>
                                        <p className='fw-semibold'>Sub Total</p>
                                        <p className='fw-semibold'>{formatCurrency(subTotal)}</p>
                                    </div>
                                    <button onClick={handleCheckOut} className='bg-main text-white rounded-pill w-100 py-2 fw-semibold'>Check Out</button>
                                </div>
                            </Fragment>
                        )}
                    </div>
                )
            }
        </div>
    )
};
export default Cart;