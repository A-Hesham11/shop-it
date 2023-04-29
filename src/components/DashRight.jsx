import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DashRight = () => {

    const data = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      };

    return (
        <div className='col-lg-4 col-md-5 col-12 mt-lg-0 mt-5'>
            <h2 className='mb-4'>Update</h2>
            <div className='update-box bg-primary rounded-3 px-3 py-2'>
                <div className='mt-2'>
                    <div className='d-flex alig-items-center mb-3'>
                        <img src='/image/profile-2.jpg' className='rounded-circle' style={{width:'50px', height:'50px'}}/>
                        <div className='ps-2'>
                            <p className='text-black-50 mb-0 fw-semibold' style={{fontSize:'13px'}}><span className='fw-bold text-black'>Name</span> received his order of night lion tech GPS drone</p>
                            <span className='text-black-50 fw-semibold' style={{fontSize:'13px'}}>1 Minutes Age</span>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='d-flex alig-items-center mb-3'>
                        <img src='/image/profile-3.jpg' className='rounded-circle' style={{width:'50px', height:'50px'}}/>
                        <div className='ps-2'>
                            <p className='text-black-50 mb-0 fw-semibold' style={{fontSize:'13px'}}><span className='fw-bold text-black'>Name</span> received his order of night lion tech GPS drone</p>
                            <span className='text-black-50 fw-semibold' style={{fontSize:'13px'}}>2 Minutes Age</span>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='d-flex alig-items-center'>
                        <img src='/image/profile-4.jpg' className='rounded-circle' style={{width:'50px', height:'50px'}}/>
                        <div className='ps-2'>
                            <p className='text-black-50 mb-0 fw-semibold' style={{fontSize:'13px'}}><span className='fw-bold text-black'>Name</span> received his order of night lion tech GPS drone</p>
                            <span className='text-black-50 fw-semibold' style={{fontSize:'13px'}}>3 Minutes Age</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='mb-4'>Customer Review</h2>
                <div>
                    <ReactApexChart options={data.options} series={data.series} height={270} type="area" width='100%' />
                </div>
            </div>
        </div>
    );
};
export default DashRight;


      

