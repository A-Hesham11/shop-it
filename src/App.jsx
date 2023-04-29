import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import { auth } from "./firebase";
import { setUser } from "./rtk/reducers/userReducer";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DashProducts from './components/DashProducts';
import Woman from './components/Woman';
import Men from './components/Men';
import ContactUs from './components/ContactUs';
import CheckOut from './components/CheckOut';
import CheckPayment from './components/CheckPayment';
import DashOrders from './components/DashOrders';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <div className='app'>
      <Routes>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/products' element={<DashProducts/>}/>
        <Route path='/dashboard/orders' element={<DashOrders/>}/>
        <Route path='/' element={
            <Fragment>
              <Header/>
                <Home/>
              <Footer/>
            </Fragment>
          } 
        />
        <Route path='/men' element={
          <Fragment>
            <Header/>
            <Men/>
            <Footer/>
          </Fragment>
          }
        />
        <Route path='/woman' element={
            <Fragment>
              <Header/>
              <Woman/>
              <Footer/>
            </Fragment>
          }
        />
        <Route path='/contact' element={
            <Fragment>
              <Header/>
              <ContactUs/>
              <Footer/>
            </Fragment>
          }
        />
        <Route path='/checkout' element={
            <Fragment>
              <Header/>
              <CheckOut/>
            </Fragment>
          }
        />
          <Route path='/checkpayment' element={
            <Fragment>
              <Header/>
              <CheckPayment/>
            </Fragment>
          }
        />
      </Routes>
    </div>
  )
}

export default App
