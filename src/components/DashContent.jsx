import React from 'react';
import { Table } from 'react-bootstrap';

const DashContent = () => {
    return (
        <div className='dash-content col-lg-6 col-md-7 col-12 mt-lg-0 mt-5'>
            <h2 className='mb-4'>Dashboard</h2>
            <div className='dash-box d-flex align-items-center gap-3'>
                <div className='box bg-primary rounded-3 p-3 w-100'>
                    <div className='d-flex justify-content-end'>
                        <div className='dash-icon rounded-circle'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill='#fff'>
                                <path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/>
                            </svg>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-2'>
                        <div className='skill'>
                            <div className='inner'>
                                <div className='number'>
                                    70%
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110px" height="110px">
                                    <defs>
                                        <linearGradient id="GradientColor">
                                        <stop offset="0%" stopColor="#e91e63" />
                                        <stop offset="100%" stopColor="#673ab7" />
                                        </linearGradient>
                                    </defs>
                                    <circle className='sales' cx="55" cy="55" r="40" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <h5 className='fw-bold'>$25,970</h5>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='fw-semibold mb-0 ms-3'>Sales</p>
                        <span className='text-black-50' style={{fontSize:'14px'}}>Last 24 hours</span>
                    </div>
                </div>
                <div className='box bg-primary rounded-3 p-3 w-100'>
                    <div className='d-flex justify-content-end'>
                        <div className='dash-icon rounded-circle'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill='#fff'>
                                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                            </svg>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-2'>
                        <div className='skill'>
                            <div className='inner'>
                                <div className='number'>
                                    80%
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110px" height="110px">
                                    <defs>
                                        <linearGradient id="GradientColor">
                                        <stop offset="0%" stopColor="#e91e63" />
                                        <stop offset="100%" stopColor="#673ab7" />
                                        </linearGradient>
                                    </defs>
                                    <circle className='revenue' cx="55" cy="55" r="40" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <h5 className='fw-bold'>$14,270</h5>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='fw-semibold mb-0 ms-3'>Revenue</p>
                        <span className='text-black-50' style={{fontSize:'14px'}}>Last 24 hours</span>
                    </div>
                </div>
                <div className='box bg-primary rounded-3 p-3 w-100'>
                    <div className='d-flex justify-content-end'>
                        <div className='dash-icon rounded-circle'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={17} fill='#fff'>
                                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"/>
                            </svg>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-2'>
                        <div className='skill'>
                            <div className='inner'>
                                <div className='number'>
                                    60%
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110px" height="110px">
                                    <defs>
                                        <linearGradient id="GradientColor">
                                        <stop offset="0%" stopColor="#e91e63" />
                                        <stop offset="100%" stopColor="#673ab7" />
                                        </linearGradient>
                                    </defs>
                                    <circle className='expenses' cx="55" cy="55" r="40" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <h5 className='fw-bold'>$4,280</h5>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='fw-semibold mb-0 ms-3'>Expenses</p>
                        <span className='text-black-50' style={{fontSize:'14px'}}>Last 24 hours</span>
                    </div>
                </div>
            </div>
            <div className='table-box dash-table'>
                <h2 className='mt-5 mb-3'>Recent Orders</h2>
                <div className='dashTable-container rounded-3 bg-primary py-1 px-2'>
                    <Table className="rounded-3">
                        <thead className='text-center'>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Product</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr>
                                <th scope="row">1</th>
                                <td>Watch watch t-shirt</td>
                                <td>2 March 2023</td>
                                <td><span className='rounded-3 py-1 px-2 fw-semibold' style={{backgroundColor:'#9bf3ad', color:'#5D9165', width:'90px'}}>Approved</span></td>
                                <td>Details</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>T-shirt</td>
                                <td>3 March 2023</td>
                                <td><span className='rounded-3 py-1 px-2 fw-semibold' style={{backgroundColor:'#f9c8c7f2', color:'#C6726B', width:"90px"}}>Pending</span></td>
                                <td>Details</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Shoes</td>
                            <td>4 March 2023</td>
                            <td><span className='rounded-3 py-1 px-2 text-white fw-semibold' style={{backgroundColor:'#5ca2d0', width:"90px"}}>Delivered</span></td>
                            <td>Details</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default DashContent;
