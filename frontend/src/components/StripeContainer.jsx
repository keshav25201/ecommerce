import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import PaymentForm from './PaymentForm';
const Container = styled.div` 
    display:flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    position:fixed ;
    overflow:scroll;
    background: rgba(0,0,0,0.8);
`
const PUBLIC_KEY = 'pk_test_51L7XKnSJ6igNhOfNSikoAOilnZtgKnfA5m54bkTS69Sc2gA018h8azhYsT1r52nEYD2GvvvlTnwRnJNJP34D6tBX008RYF7UBI';
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = ({showPayment,setShowPayment,amount}) => {
    const closeModal = (e) => {
        setShowPayment(false);
    }
  return (
    <Container onClick={closeModal}>
    <Elements stripe={stripeTestPromise}>
        <PaymentForm showPayment={showPayment} setShowPayment={setShowPayment} amount={amount}/>
    </Elements>
    </Container>
  )
}

export default StripeContainer