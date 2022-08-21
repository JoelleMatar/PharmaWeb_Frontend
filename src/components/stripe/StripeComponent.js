// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { payOnlineProducts } from '../../api';
// import Stripe from './Stripe';
// import StripeCheckout from 'react-stripe-checkout'
// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51LYvvbHSfpRXz0HozfDd6b00Fww5vLrczomlxHhkuTcJ9hGnS36UUnsc0jmUVrHv2hDqAxDeR7xzuC6eMbqCuWHv00Xgr3D9Xp');

// const StripeComponent = ({ amount }) => {
//   console.log("amount", amount)
//   const loggedUser = JSON.parse(localStorage.getItem("profile"));

//   const values = {
//     email: loggedUser.email,
//     phoneNumber: loggedUser.phoneNumber,
//     firstName: loggedUser.firstName,
//     lastName: loggedUser.lastName,
//     amount: amount
//   }

//   const [client_secret, setClientSecret] = useState('')
//   async function paymentStripe() {
//     const payment = await axios.post('http://localhost:5000/carts/stripe/pay', values).then(response => {
//       console.log("response", response)
//       return setClientSecret(response.data.client_secret)
//     })
//   }

//   paymentStripe()
//   console.log("client_secret", client_secret)

//   // async function handleToken(token, addresses) {
//   //   const response = await axios.post(
//   //     "http://localhost:5000/carts/stripe/pay",
//   //     values 
//   //   );
//   //   const { status } = response.data;
//   //   console.log("Response:", response.data);
//   //   if (status === "success") {
//   //     alert("Success! Check email for details", { type: "success" });
//   //   } else {
//   //     alert("Something went wrong", { type: "error" });
//   //   }
//   // }

//   return (
//     <div>

//         <Elements stripe={stripePromise} options={client_secret}>
//           <Stripe clientSecret={client_secret} />
//         </Elements>
//     </div>
//   );
// };
// export default StripeComponent;




// // import {Elements} from '@stripe/react-stripe-js';
// // import {loadStripe} from '@stripe/stripe-js';

// // // Make sure to call `loadStripe` outside of a component’s render to avoid
// // // recreating the `Stripe` object on every render.
// // const stripePromise = loadStripe('pk_test_51LYvvbHSfpRXz0HozfDd6b00Fww5vLrczomlxHhkuTcJ9hGnS36UUnsc0jmUVrHv2hDqAxDeR7xzuC6eMbqCuWHv00Xgr3D9Xp');

// // function App() {
// //   const options = {
// //     // passing the client secret obtained from the server
// //     clientSecret: '{{CLIENT_SECRET}}',
// //   };

// //   return (
// //     <Elements stripe={stripePromise} options={options}>
// //       <CheckoutForm />
// //     </Elements>
// //   );
// // };




import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount) => token =>
  axios.post('http://localhost:5000/carts/stripe/pay',
    {
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment);

const StripeComponent = ({ name, amount }) =>
  <StripeCheckout
     name={name}
     amount={amount}
     token={onToken(amount)}
     currency={CURRENCY}
     stripeKey={'pk_test_51LYvvbHSfpRXz0HozfDd6b00Fww5vLrczomlxHhkuTcJ9hGnS36UUnsc0jmUVrHv2hDqAxDeR7xzuC6eMbqCuWHv00Xgr3D9Xp'}
  />

export default StripeComponent;