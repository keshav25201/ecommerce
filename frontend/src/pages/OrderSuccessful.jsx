import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Button = styled.button` 
    font-size: 2rem;
    padding: 5px;
    border : none;
`
const H1 = styled.h1` 
    color : #414122;
    margin: auto;

`
const OrderSuccessful = () => {
  return (
    <div style={{"padding" : "20px"}}>
        <Button><Link to='/' style = {{"all":"inherit"}}>Continue shopping 🛍</Link></Button>
        <div style={{"textAlign":"center"}}>
        <H1>Order Placed Successfuly !!!</H1>
        </div>
    </div>
  )
}

export default OrderSuccessful