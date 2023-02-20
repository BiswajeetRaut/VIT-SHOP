// import React, { useState } from "react";

// const PayUUPI = () => {
//   const [paymentStatus, setPaymentStatus] = useState("");
  
//   const header = new Headers({ "Access-Control-Allow-Origin": "*" });
//   const initiatePayment = async () => {
//     try {
//       const paymentData = {
//         key: "LkUZB5Ag",
//         txnid: Date.now(),
//         amount: "10.00",
//         productinfo: "Sample Product",
//         firstname: "John",
//         email: "john@example.com",
//         phone: "9999999999",
//         surl: "http://localhost:3000/success",
//         furl: "http://localhost:3000/failure",
//         hash: "", // You will need to generate this on the server
//         service_provider: "payu_paisa",
//         udf1: "",
//         udf2: "",
//         udf3: "",
//         udf4: "",
//         udf5: ""
//       };

//       const response = await fetch("https://secure.payu.in/_payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams(paymentData),
//         mode:'no-cors',
//       });
//       const result = await response.json();

//       console.log(result);

//       // Store the transaction details in Firebase

//       setPaymentStatus("Success");
//     } catch (error) {
//       console.error(error);
//       setPaymentStatus("Failure");
//     }
//   };

//   return (
//     <div>
//       <button onClick={initiatePayment}>Initiate UPI Payment</button>
//       <p>Payment Status: {paymentStatus}</p>
//     </div>
//   );
// };

// export default PayUUPI;

import React, { useState } from 'react';

const PayUUPI = () => {
  const [paymentResponse, setPaymentResponse] = useState(null);

  const initiatePayment = async () => {
    try {
      const paymentData = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'UPI',
            parameters: {
              '@type': 'type.googleapis.com/google.actions.transactions.v3.TransactionRequirements',
              paymentMethodTokenizationParameters: {
                tokenizationType: 'PAYMENT_GATEWAY',
                parameters: {
                  'gateway': 'example',
                  'gatewayMerchantId': 'exampleGatewayMerchantId'
                }
              },
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                'gateway': 'example',
                'gatewayMerchantId': 'exampleGatewayMerchantId'
              }
            }
          }
        ],
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: '100.00',
          currencyCode: 'INR',
        },
        merchantInfo: {
          merchantName: 'Example Merchant',
        }
      };

      const response = await window.google.payments.api.paymentsClient.loadPaymentData(paymentData);
      setPaymentResponse(response);
      console.log('Payment Response: ', response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Initiate Payment</button>
      {paymentResponse && <div>Payment Response: {JSON.stringify(paymentResponse)}</div>}
    </div>
  );
};

export default PayUUPI;

