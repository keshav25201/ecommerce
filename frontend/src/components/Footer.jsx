import React from 'react'
import styled from 'styled-components';
const Container = styled.div` 
  height : 50px;
  background-color: green;
  width: 100%;
  color: #cdd22c;
  bottom: 0;
  position:fixed ;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Footer = () => {
  return (
    <Container>
      <p>connect with us</p>
      <p>twitter</p>
      <p>instagram</p>
      <p>facebook</p>
    </Container>
  )
}

export default Footer