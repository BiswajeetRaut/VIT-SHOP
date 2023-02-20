// import { Link } from '@material-ui/core';
import React from 'react'
import { useParams,Link } from 'react-router-dom';
// import './VendorDashboardHome.css';
const VendorProduct = ({ids,image,name,price,stock}) => {
const {id}=useParams();
var to="/vendormodifyproduct/"+id+"/"+ids;
  return (
    <div className="products-row"> 
          <div className="product-cell image">
            <img src={image} alt="product"/>
            {/* <span>Ocean</span> */}
          </div>
        <div className="product-cell category">{name}</div>
        <div className="product-cell stock">{stock}</div>
        <div className="product-cell price">Rs.{price}</div>
        <div className="product-cell status-cell">
          <Link to={to}>
          <button className="status active">Modify</button>
          </Link>
        </div>
      </div> 
  )
}

export default VendorProduct