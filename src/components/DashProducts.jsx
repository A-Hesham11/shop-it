import { Timestamp } from 'firebase/firestore';
import React, { Fragment, useEffect, useState } from 'react';
import { Form, FormSelect, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  postProductsAPI, getProductsAPI } from '../rtk/reducers/index';
import formatCurrency from './CurrencyFormat';
import DashLeft from './DashLeft';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DashProducts = () => {
    const [shareImage, setShareImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [count, setCount] = useState('');
    const [category, setCategory] = useState('');
    const total = (price - discount);
    const [disabled, setDisabled] = useState(true)

    const products = useSelector(state => state.products.productItems);
    const loading = useSelector(state => state.products.loading);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert(`Not an image , the file is a ${typeof image}`);
            return;
        } else {
            setShareImage(image);
        }
    };

    const reset = () => {
        setShareImage("");
        setDescription('');
        setPrice('');
        setDiscount('');
        setCount('');
        setCategory('');
    };

    const handlePostProducts = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        };
        const payload = {
            image: shareImage,
            description: description,
            price: price,
            discount: discount,
            total: total,
            count: count,
            category: category,
            color:false,
            timestamp: Timestamp.now(),
        };
        dispatch(postProductsAPI(payload));
        reset(e);
    };

    useEffect(() => {
        dispatch(getProductsAPI());
    }, []);

    const handleRemoveProduct = async id => {
        try {
            await deleteDoc(doc(db, 'products', id))
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeData = (e) => {
        setDisabled(e.empty);
    };

    return (
        <div className="products-dashboard dashboard row w-100 p-3 m-0" style={{minHeight:'100vh'}}>
            <DashLeft/>
            <div className='dash-products col-lg-10 col-12 p-0 p-md-2'>
                <div className='products-crud'>
                        <h6 className='dash-title fw-bold'>Product Management System</h6>
                        <Form onChange={handleChangeData}>
                            <div>
                                <input type='file'
                                        className='rounded-3 form-control mb-3'
                                        onChange={handleChange}
                                />
                                {shareImage && (<img src={URL.createObjectURL(shareImage)} alt='img' style={{width:"20%", marginBottom:'15px'}} />)}
                            </div>
                            <input type='text'
                                placeholder='description'
                                className='rounded-3 form-control mb-3'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}    
                            />
                            <div className='products-price d-flex -align-items-center gap-2'>
                                <input type='number' 
                                    placeholder='price' 
                                    className='rounded-3 form-control'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}  
                                />
                                <input type='number' 
                                    placeholder='discount' 
                                    className='rounded-3 form-control'
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)} 
                                />
                                <p className='p-2 rounded-3 text-white fw-semibold w-100 bg-main'>Total: <span>{total}</span></p>
                            </div>
                            <input type='number' 
                                placeholder='count' 
                                className='rounded-3 form-control mb-3'
                                value={count}
                                onChange={(e) => setCount(e.target.value)} 
                            />
                            <FormSelect aria-label="Default select example " 
                                className='select-category border border-2 rounded-3 mb-4' 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option className='d-none'>category</option>
                                <option value="men">men</option>
                                <option value="woman">woman</option>
                            </FormSelect>
                            <button disabled={disabled} className='w-100 rounded-3 text-white mb-3 fw-semibold bg-main' style={{height:'41px', cursor: disabled ? "not-allowed" : "pointer"}} onClick={(e) => handlePostProducts(e)}>Create</button>
                        </Form>
                        {products.length === 0 
                            ? (<p className='mt-5 text-center text-black-50 fw-semibold'>There are no Products!</p>) 
                            : (
                                <Fragment>
                                    {loading &&
                                        <div className='loader d-flex justify-content-center py-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#39C7A5' width='50'>
                                                <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/>
                                            </svg>
                                        </div>
                                    }
                                    {products.length > 0 && (
                                        <div className='table-container rounded-3 mt-4'>
                                            <Table className='mb-0 border table-products bg-primary'>
                                                <thead className='text-center border p-5'>
                                                    <tr className='p-5'>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Count</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                {products.map((product, index) => (
                                                    <tbody key={product.id} className='text-center'>
                                                        <tr style={{verticalAlign: "text-top"}}>
                                                            <th scope="row">{index + 1}</th>
                                                            <th><img src={product.shareImage} width={50}/></th>
                                                            <td>{product.description}</td>
                                                            <td>{formatCurrency(product.price)}</td>
                                                            <td>{formatCurrency(product.discount)}</td>
                                                            <td>{formatCurrency(product.total)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{product.category}</td>
                                                            <td>
                                                                <button className='bg-transparent' onClick={() => handleRemoveProduct(product.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} fill='#DC3545'>
                                                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                                </svg>                                                     
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </Table>
                                        </div>
                                    )}
                                </Fragment>
                            )
                        }
                </div>
            </div>
        </div>
    );
};
export default DashProducts;