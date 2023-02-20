import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from '../StateProvider'
import { getBAsketTotal } from '../reducer'
import { useNavigate } from 'react-router-dom'
const Subtotal = () => {
  const [{basket},dispatch]=useStateValue();
  var amt=0;
  const history= useNavigate();
  return (
    <div className='subtotal'>
       <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBAsketTotal(basket) } 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button 
      onClick={e => history('/payment')}
      >Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
