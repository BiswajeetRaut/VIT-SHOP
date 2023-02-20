import React from 'react'
import { useStateValue } from '../StateProvider';
import './CheckoutProduct.css'
const CheckoutProduct = ({id,title,image,price,rating}) => {
    const [{basket},dispatch]= useStateValue();
    var arr=[];
    for(let i=0;i<rating;i++)
    {
        arr[i]=i; 
    }
    console.log(title,image,price,rating);
    const removeFromBasket =()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            item:{id:id},
        })
    }
  return (
    <div className='checkoutProduct'>
      <img src={image} alt="" className='checkoutProduct__image' />
        <div className="checkoutProduct__info">
            <p className='checkoutProduct__title'>{title}</p>
             <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{price}</strong>
             </p>
             <div className="checkoutProduct__rating">
                {
                    arr.map(()=>{
                        return <p>⭐</p>
                    })
                }
             </div>
             <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct
