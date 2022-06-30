import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div` 
    height: 400px;
    width : 300px;
    background-color: #f7fcfc;
    padding: 5px;
    display: flex;
    flex-direction: column;
`
const ImageWrapper = styled.div` 
        width: 100%;
        height : 60%;
        display: flex;
        justify-content: center;
        overflow: hidden;
`
const DetailsWrapper = styled.div` 
    display:flex ;
    flex: 1;
    flex-direction: column;
    text-align: center;
    justify-content: flex-end;
`
const Img = styled.img` 
    object-fit: contain;
    width: 80%;
`

const Product = (product) => {
    product = product.product;
  return (
    <Wrapper>
        <ImageWrapper>
        <Img src = {product.image}></Img>
        </ImageWrapper>
        <DetailsWrapper>
        <p style={{paddingBottom : "10px"}}>{product.title}</p>
        <p>₹{product.price}</p>
        </DetailsWrapper>
     
    </Wrapper>
  )
}

export default Product