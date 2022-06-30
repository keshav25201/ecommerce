import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
    display : flex;
    height: 150px;
    border : 0.5px solid grey;
    padding: 20px;
    margin-bottom: 20px;
`
const TextItemsWrapper = styled.div` 
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const CartItem = (props) => {
    const item = props.item;
  return (
    <Wrapper>
        <div><img src={item.image}alt="" style={{maxHeight : "100%"}}/></div>
        <TextItemsWrapper>
            <p><span style={{fontWeight:"800"}}>TITLE: </span>{item.title}</p>
            <p><span style={{fontWeight:"800"}}>ID: </span>{item._id}</p>
            <p><span style={{fontWeight:"800"}}>SIZE: </span>{item.size}</p>
            <p><span style={{fontWeight:"800"}}>PRICE: </span>{item.price}</p>
            <p><span style={{fontWeight:"800"}}>QUANTITY: </span>{item.quantity}</p>
        </TextItemsWrapper>
    </Wrapper>
  )
}

export default CartItem