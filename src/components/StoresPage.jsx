import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from './CurrencyFormat';
import { addToCart } from '../rtk/reducers/cartReducer';
import { removeItem } from '../rtk/reducers/storesReducer';

const StoresPage = ({showWatch}) => {
    const stores = useSelector(state => state.stores.storesItems);
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeItem(item.id));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    return (
        <div className={`stores mt-2 ${showWatch}`}>
            {stores.length === 0 
                ? ( <div className='text-center position-relative' style={{left:'50%', transform:"translate(-50%, 30%)"}}>
                        <img src='/image/emptyCart.svg' width={300} />
                        <p className='mt-4 text-center text-black-50 fw-semibold ls-2'>Your Stores is empty!</p>
                    </div>
                ) 
                : ( <div className='stores-product pb-0 mt-2'>
                        {stores.length > 0 && (
                            <Fragment>
                                {stores.map((item, index) => (
                                    <div key={index} className='rounded-4 p-3 m-2 position-relative bg-primary' style={{ marginBottom:'11px'}}>
                                        <button className='btn-delete position-absolute' onClick={() => handleRemove(item.id) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={12} fill='#00000080'>
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                        <div className='mb-3'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <img src={item.shareImage} style={{width:'50px'}}/>
                                                <div>
                                                    <p className='text-black-50 mb-0' style={{fontSize:'13px', height:'24px'}}>{item.description}</p>
                                                    <p className='fe-semibold mb-0'>{formatCurrency(item.total)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='bg-main text-white rounded-pill w-100 py-2 fw-semibold' onClick={() => handleAddToCart(item)}>Add To Cart</button>
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
export default StoresPage;






