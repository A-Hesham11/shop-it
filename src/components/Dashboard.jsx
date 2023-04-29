import React from 'react';
import DashContent from './DashContent';
import DashLeft from './DashLeft';
import DashRight from './DashRight';

const Dashboard = () => {
    return (
        <div className='dashboard p-4' style={{minHeight:"100vh"}}>
            <div className='row'>
                <DashLeft/>
                <DashContent/>
                <DashRight/>
            </div>
        </div>
    );
};
export default Dashboard;

