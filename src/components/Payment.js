import React from 'react'
import { useStateValue } from '../StateProvider'
import './Payment.css';
import Header from './Header';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import GooglePayButton from "@google-pay/button-react";
import PayUUPI from './PayUUPI';
const Payment = () => {
    const[{basket,user},dispatch]=useStateValue(); 
    
  return (
    <>
    <Header></Header>
    <div className='payment'>
    <div className="payment__container">
        <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
        <div className="payment__section">
            <div className="payment__title">
                <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
                <p>{user=="user" ? alert('Please Signin'):user.userinfo.email}</p>
                <p>MEN'S HOSTEL</p>
                <p>VIT VELLORE, Tamil Nadu</p>
            </div>
        </div>
        <div className="payment__section">
            <div className="payemnt__title">
                <h3>Review Items and Delivery</h3>
            </div>
            <div className="payment__items">
            {
                basket.map((item)=>{
                    return (<CheckoutProduct id={item.id} title={item.title} rating={item.rating} price={item.price} image={item.image} ></CheckoutProduct>)
                })
            }
            </div>
        </div>
        <div className="payment__section">
            <div className="payment__title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
            <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '0.1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
        className='button__payment'
      />
            </div>
        </div>
    </div>
      {/* <PayUUPI></PayUUPI> */}
    </div>
    </>

  )
}

export default Payment
