import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderAPI } from '../rtk/reducers/index';
import formatCurrency from './CurrencyFormat';
import DashLeft from './DashLeft';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DashOrders = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [show, setShow] = useState(false);
    const [productDetails, setProductDetails] = useState();
    const [sizeOption, setSizeOption] = useState();
    const boxRef = useRef(null);

    const userOrders = useSelector(state => state.userOrders.userOrderItems);
    const loading = useSelector(state => state.userOrders.loading);
    const dispatch = useDispatch();

    const handleDetailsBtn = (orderId) => {
        setShowPopup(true);
        userOrders.map((orders) => {
            if (orderId === orders.id) {
                setSizeOption(orders.sizeOption);
                return (
                    setProductDetails(orders.productDetails)
                )
            };
        });
    };

    function handleClickOutside (event) {
        if (showPopup && boxRef.current && !boxRef.current.contains(event.target)) {
            document.addEventListener("click", setShowPopup(false));
            setShow(!show);
        }
    };

    const handleRemoveProduct = async id => {
        try {
            await deleteDoc(doc(db, 'orders', id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getUserOrderAPI());
    }, []);

    return (
        <div className="products-dashboard dashboard row w-100 p-3 m-0 position-relative" style={{minHeight:"100vh"}}>
            <DashLeft/>
            <div className='dash-products col-lg-10 col-12 p-0 p-md-2'>
                <div className='products-crud'>
                    <h5 className='dash-title'>Order Management System</h5>
                </div>
                {userOrders.length === 0 
                    ? (<div className='d-flex justify-content-center'>
                            <div className=''>
                                <img src='/image/orders.png' style={{maxWidth:'100%'}}/>
                                <p className='text-center text-black-50 fw-semibold font-monospace'>There are no requests yet!</p>    
                            </div>
                        </div>
                    ) 
                    : (<Fragment>
                            {loading &&
                                <div className='loader d-flex justify-content-center py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#00A099' width='50'>
                                        <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/>
                                    </svg>
                                </div>
                            }
                            {userOrders.length > 0 && (
                                <div className='table-container rounded-3 mt-4'>
                                    <Table className='mb-0 border table-products bg-primary'>
                                        <thead className='text-center border p-5'>
                                            <tr className='p-5'>
                                                <th scope="col">ID</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Total Price</th>
                                                <th scope="col">Order Details</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        {userOrders.map((orders, index) => (
                                            <tbody key={orders.id} className='text-center'>
                                                <tr  style={{verticalAlign: "text-top"}}>
                                                    <td scope="row">{index + 1}</td>
                                                    <td scope="row">{orders.userInfo.firstName} {orders.userInfo.lastName}</td>
                                                    <td scope="row">{orders.userInfo.information}/{orders.userInfo.region}</td>
                                                    <td scope="row">{orders.userInfo.date}</td>
                                                    <td scope="row">{formatCurrency(orders.subTotal)}</td>
                                                    <td scope="row" onClick={() => handleDetailsBtn(orders.id)} className='text-danger' style={{cursor:'pointer'}}>Details...</td>
                                                    <td scope="row">
                                                        <button className='bg-transparent' onClick={() => handleRemoveProduct(orders.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} fill='#DC3545'>
                                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                            </svg>                                                     
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>

                                    <div onClick={handleClickOutside} className={`popup-details w-100 h-100 position-absolute top-0 start-0 ${showPopup ? "d-flex" : "d-none"}`}>
                                            <div ref={boxRef} 
                                                className={`popup-box w-50 position-absolute top-50 start-50 px-3 pt-3 pb-2 rounded-3`} 
                                                style={{transform:"translate(-50%, -50%)", backgroundColor:'#e7e7e7'}}
                                            >
                                            {productDetails && productDetails.map((product) => (
                                            <div key={product.id} className={`d-flex align-items-center gap-3 bg-primary rounded-3 py-2 px-3 mb-2`}>
                                                <img src={product.shareImage} style={{width:'50px'}}/>
                                                <div className='w-50'>
                                                    <p className='text-black-50 fw-semibold'>{product.description}</p>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='fw-semibold text-muted' style={{fontSize:'13px'}}>Size: {sizeOption[product.id]}</p>
                                                        <p className='fw-semibold text-muted' style={{fontSize:'13px'}}>Qty: {product.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
};
export default DashOrders;