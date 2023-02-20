import './App.css';
import firebase from 'firebase';
import Header from './components/Header';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Checkout from './components/Checkout';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import Login from './components/Login';
import db from "./firebase";
import VendorLogin from './components/VendorLogin';
import Payment from './components/Payment';
import VendorDashboardHome from './components/VendorDashboardHome';
import VendorAddProduct from './components/VendorAddProduct';
import VendorModifyProduct from './components/VendorModifyProduct';
function App() {
  const [{basket,user},dispatch]=useStateValue();
  useEffect(() => {
  console.log(user);
  console.log(basket[0]);
  // window.localStorage.setItem('count',JSON.stringify(""));
}, [user]);
  return (
    // <div className="App">
    <BrowserRouter>
    {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/vendorlogin" element={<VendorLogin/>} />
        <Route path="/vendordashboard/:id" element={<VendorDashboardHome/>} />
        <Route path="/vendoraddproduct/:id" element={<VendorAddProduct/>} />
        <Route path="/vendormodifyproduct/:id/:productid" element={<VendorModifyProduct/>} />
      </Routes>
    </BrowserRouter>
    // {/* </div> */}
  );
}

export default App;
 