import React from 'react'
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const VendorPayment = ({ids,data}) => {
    // console.log(data.Date.toDate());
    const {id}= useParams();
    // console.log(id);
    var date=data.Date.toDate();
    // console.log(date.toString().split(' ').splice(0,5).toString());
  return (
    <div className="products-row"> 
        <div className="product-cell stock">{ids.slice(0,6)}...</div>
        <div className="product-cell category">{data.email.slice(0,10)}...</div>
        <div className="product-cell stock">{date.toString().split(' ').splice(0,5).toString()}</div>
        <div className="product-cell price">Rs.{data.amount}</div>
        <div className="product-cell status-cell">
          {/* <button className="status active" onClick={()=>{
            console.log("Mera bhi pet hai me manatabkwjefvkjlsdcvljkq fgliqwgj f[89");
          }}>Details</button> */}
          <Popup trigger={<button className='status active'>Get Details</button>} position="left center">
    <div className='popup-details'>
          <div>User Mail: {data.email}</div>
          <div>Payment Date and Time: {date.toString().split(' ').splice(0,5).toString()}</div>
          <div className='details'>
            <h4 style={{marginTop:8}}>Details</h4>
            <div style={{marginTop:5}}>
                {
                    data.productinfo.map((product,index)=>{
                        return(
                            <div>
                                <h3>Product {index+1}</h3>
                                <div>Product Name: {product.name}</div>
                                <div>Product Price: {product.price}</div>
                                <div>Quanity: {product.quantity}</div>
                            </div>
                        )
                    })
                }
            </div>
          </div>
          <div>
            Total Price: Rs.{data.amount}
          </div>
    </div>
  </Popup>
        </div>
      </div> 
  )
}

export default VendorPayment