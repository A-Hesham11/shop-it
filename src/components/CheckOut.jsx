import React, { useState } from 'react';
import { Container, Form, FormSelect } from 'react-bootstrap';
import OrederSummary from './OrederSummary';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCheckout } from '../rtk/reducers/checkoutReducer';

const CheckOut = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [information, setInformation] = useState('');
    const [region, setRegion] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reset = () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setInformation('');
        setRegion('');
    };

    const handlePostCheckoutData = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            information: information,
            region: region,
            id: phoneNumber,
            date: new Date().toLocaleDateString("en-US", 
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
        }
        dispatch(addToCheckout(data));
        reset(e);
        navigate('/checkpayment');
    };

    return (
        <div className='checkout' style={{backgroundColor:'#F5F5F5', minHeight:'100vh'}}>
            <Container>
                <div className='row checkout-container'>
                    <div className='col-md-8 col-12 pt-md-5 pt-3'>
                        <p className='fw-semibold text-black-50'>CHECKOUT</p>
                        <div>
                            <div className='bg-primary mb-3'>
                                <div className='d-flex align-items-center gap-4 border-bottom py-2 px-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill='#E2E2E2'>
                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                    </svg>
                                    <p className='fw-semibold m-0'>1. ADDRESS DETAILS</p>
                                </div>
                                <Form className='p-4' onSubmit={(e) => handlePostCheckoutData(e)}>
                                    <div className='checkout-name mb-1 d-md-flex d-sm-block align-items-center justify-content-between'>
                                        <div className='' style={{width:'42%'}}>
                                            <p className='text-black-50 fw-semibold mb-2' style={{fontSize:'12px'}}>First Name *</p>
                                            <input type='text' 
                                                placeholder='First Name' 
                                                className='form-control rounded-0 mb-3 border' 
                                                required
                                                value={firstName} 
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className='' style={{width:'42%'}}>
                                            <p className='text-black-50 fw-semibold mb-2' style={{fontSize:'12px'}}>Last Name *</p>
                                            <input type='text' 
                                                placeholder='Last Name' 
                                                required
                                                className='form-control rounded-0 mb-3 border' 
                                                value={lastName} 
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-1'>
                                        <p className='text-black-50 fw-semibold mb-2' style={{fontSize:'12px'}}>Mobile phone number *</p>
                                        <div className='d-flex align-items-center justify-content-between gap-1'>
                                            <p className='border p-1' style={{height:'37.6px', width:'37.6px'}}>+2</p>
                                            <input type='text' 
                                                placeholder='Mobile phone number' 
                                                className='form-control mb-3 rounded-0 border' 
                                                required
                                                value={phoneNumber} 
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-2'>
                                        <p className='text-black-50 fw-semibold mb-2' style={{fontSize:'12px'}}>St.name/Building number/Apartment number *</p>
                                        <textarea placeholder='streat name / Building / Apartment No. / Floor' className='form-control rounded-0 mb-3 border' value={information} onChange={(e) => setInformation(e.target.value)}/>
                                    </div>
                                    <div className='mb-1'>
                                        <p className='text-black-50 fw-semibold mb-2' style={{fontSize:'12px'}}>State/Region *</p>
                                        <FormSelect aria-label="Default select example " 
                                            className='select-category border rounded-0 mb-4' 
                                            value={region} 
                                            required
                                            onChange={(e) => setRegion(e.target.value)}
                                        >
                                            <option className='d-none'>Please Select .....</option>
                                            <option value="El Beheira">El Beheira</option>
                                            <option value="El Daqahliya">El Daqahliya</option>
                                            <option value="Alexandria">Alexandria</option>
                                            <option value="Al Fayoum">Al Fayoum</option>
                                            <option value="El Gharbia">El Gharbia</option>
                                            <option value="Al Menyia">Al Menyia</option>
                                            <option value="Al Monufiya">Al Monufiya</option>
                                            <option value="Al Sharkiya">Al Sharkiya</option>
                                            <option value="Aswan">Aswan</option>
                                            <option value="Asyut">Asyut</option>
                                            <option value="Banu Swouaf">Banu Swouaf</option>
                                            <option value="Banu Swouaif">Banu Swouaif</option>
                                            <option value="Cario">Cario</option>
                                            <option value="Damyietta">Damyietta</option>
                                            <option value="Giza">Giza</option>
                                            <option value="Loxur">Loxur</option>
                                            <option value="Ismailia">Ismailia</option>
                                            <option value="Kafr El-Shiekh">Kafr El-Shiekh</option>
                                            <option value="Port Said">Port Said</option>
                                            <option value="Qalyabia">Qalyabia</option>
                                            <option value="Qena">Qena</option>
                                            <option value="Red Sea">Red Sea</option>
                                            <option value="Sohag">Sohag</option>
                                            <option value="Suez">Suez</option>
                                        </FormSelect>
                                    </div>
                                    <div>
                                        <p className='text-black-50 fw-semibold' style={{fontSize:'12px'}}>*Required</p>
                                        <button type='submit' className='p-2 w-100 text-white fw-semibold' style={{backgroundColor:'#3bb295'}}>SAVE AND CONTINUE</button>
                                    </div>
                                </Form>
                            </div>
                            <div className='bg-primary d-flex align-items-center gap-4 mb-3 px-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill='#E2E2E2'>
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                </svg>
                                <p className='m-0 fw-semibold'>2. DELIVERY METHOD</p>
                            </div>
                            <div className='bg-primary d-flex align-items-center gap-4 mb-3 px-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill='#E2E2E2'>
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                </svg>
                                <p className='m-0 fw-semibold'>3. PAYMENT METHOD</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-12 pt-5'>
                        <OrederSummary/>
                    </div>
                </div>
            </Container>
        </div>
    );
};
export default CheckOut;
