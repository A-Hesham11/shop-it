import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import HomeProduct from './HomeProduct';

const Home = () => {
    return (
        <Fragment>
            <div className='home'>
                <Container>
                    <div className='home-box d-flex align-items-center justify-content-between'>
                        <div>
                            <p className='text-muted fw-semibold'>NEW ARRAIVALS</p>
                            <h1 className='fw-bold'><span className='text-main'>Best Price</span> This Year</h1>
                            <p className='text-muted fw-semibold'>Shopmatic offers your very comfortable<br/>time on walking and exercises.</p>
                            <button className='bg-main text-white fw-semibold px-3 py-2 rounded-3 ms-2'>Shop Now</button>
                        </div>
                        <img src='/image/landing-page.svg' alt='Landing-Page'/>
                    </div>
                </Container>
            </div> 
            <div className='brand py-4'>
                <Container>
                    <div className='row'>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/1.png' className='img-fluid'/>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/2.png' className='img-fluid'/>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/3.png' className='img-fluid'/>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/4.png' className='img-fluid'/>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/5.png' className='img-fluid'/>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6'>
                            <img src='/image/brand/6.png' className='img-fluid'/>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="new pn-5">
                <div className="row g-0">
                    <div className="new-box col-lg-4 col-md-4 col-12">
                            <img src="/image/new/1.jpg" className="img-fluid"/>
                        <div className="new-text ps-3">
                            <h3>Extreme Rare Sneakers</h3>
                            <a className="btn mt-2 rounded-0 mt-5 p-0 text-start" href="#">SHOP NOW</a>
                        </div>
                    </div>
                    <div className="new-box col-lg-4 col-md-4 col-12">
                        <img src="/image/new/5.jpg"  className="img-fluid"/>
                        <div className="new-text text-center">
                            <h3 className="ps-3">Awesome Blank outfit</h3>
                            <a className="btn mt-2 rounded-0 mt-5 p-0" href="#">SHOP NOW</a>
                        </div>
                    </div>
                    <div className="new-box col-lg-4 col-md-4 col-12">
                        <img src="/image/new/3.jpg"  className="img-fluid"/>
                        <div className="new-text text-end pe-3">
                            <h3 className="ps-3">Sportwear Up To 50% Off</h3>
                            <a className="btn mt-2 rounded-0 mt-5 text-end p-0" href="#">SHOP NOW</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-5'>
                <Container>
                    <div className='product-text text-center'>
                        <h2 className='fw-bold position-relative mt-4 mb-4'>Our Featured</h2>
                        <p className='text-black-50'>Here you can check out our new products with fair price on rymo</p>
                    </div>
                    <HomeProduct/>
                </Container>
            </div>
        </Fragment>
    );
};
export default Home;
