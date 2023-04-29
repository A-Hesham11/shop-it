import React from 'react';

const Footer = () => {
    return (
        <div className="footer pt-5 text-center text-md-start" style={{backgroundColor:'#f0f3f5'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12 mb-5">
                        <img className="img-fluid" src="/image/logo-notbg.png" alt="" style={{marginTop:'-13px'}}/>
                        <p className="text-black-50 my-4 fs-6">Shopit is a fictional ECommerce powered by HTML, CSS and JavaScript</p>
                        <img className="img-fluid" src="/image/payment.png" alt=""/>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-4">
                        <h5 className="mb-4">Featured</h5>
                        <ul className="list-unstyled text-black-50 fs-6">
                            <li>MEN</li>
                            <li>WOMEN</li>
                            <li>NEW ARRIVALS</li>
                            <li>SHOES</li>
                            <li>CLOTHES</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-4">
                        <h5 className="mb-4">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                ADDRESS
                                <p className="text-black-50 fs-6 mb-2">123 Street Name, City, US</p>
                            </li>
                            <li>
                                PHONE
                                <p className="text-black-50 fs-6 mb-2">010-6960-2992</p>
                            </li>
                            <li>
                                EMAIL
                                <p className="text-black-50 fs-6 mb-2">A.Hesham@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <h5 className="mb-4">Instagram</h5>
                        <div className="row g-0 m-3">
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/1.jpg" alt=""/>
                            </div>
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/2.jpg" alt=""/>
                            </div>
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/3.jpg" alt=""/>
                            </div>
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/4.jpg" alt=""/>
                            </div>
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/5.jpg" alt=""/>
                            </div>
                            <div className="col-lg-4 col-4 p-1">
                                <img className="img-fluid w-100" src="/image//insta/6.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
