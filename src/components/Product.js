import React from 'react'
import { useStateValue } from '../StateProvider';
import './Product.css'
const Product = ({id,title,image,price,rating}) => {
    const [{basket},dispatch] = useStateValue();
  var rat= rating;
  var arr=[];
  for(var i=0; i<rat; i++)
            {
                arr[i]=i;
            }
  const addToBasket=()=>{
    //dispatch add to basket action
    dispatch({type:'ADD_TO_BASKET',
    item : {
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,

    }})
  }
  return (
    <div className='product'>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price"><small>$</small><strong>{price}</strong></p>
        <div className="product__rating">
        {
            arr.map(()=>{
                return <p>⭐</p>
            })
        }
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
