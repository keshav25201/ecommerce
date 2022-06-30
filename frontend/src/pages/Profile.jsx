import React,{useEffect, useState} from 'react'
import PlaceHolder from '../images/avatar.png';
import store from '../state/store';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
//since router unmounts components useEffect will run everytime
const Container = styled.div` 
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const ImageContainer = styled.div` 
  width : 300px;
  align-self: center;
`
const OrderContainer = styled.div` 
  display: grid;
  grid-template-columns: 250px 250px 250px 250px 250px;
  place-content: space-evenly;
  padding: 10px;
  font-size: 1.2rem;
`
const Profile = () => {
  const user = useSelector(state => state.user);
  const [userOrders,setUserOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/order/find',{
      method : 'GET',
      credentials : 'include'
    })
    .then(res => res.json())
    .then(res => setUserOrders([...res]))
    .catch(err => console.log(err));
  })
  return (
    <Container>
      <ImageContainer>
      <img src = {PlaceHolder} alt="" style={{"width":"100%"}}></img>
      </ImageContainer>
      <OrderContainer>
      <h1>Orders</h1>
      </OrderContainer>
   
      <OrderContainer style={{"textDecoration":"underline"}}>
        <p>Order Id</p>
        <p>Purchase Date</p>
        <p>Amount</p>
        <p>Status</p>
        <p>Address</p>
      </OrderContainer>
      {userOrders.map((order,index) => {
        return (<OrderContainer key={index}>
          <p>{order._id}</p>
          <p>{order.createdAt.substr(0,10)}</p>
          <p>₹ {order.amount}</p>
          <p>{order.status}</p>
          <p>{order.address}</p>
        </OrderContainer>)
      })}
    </Container>
  )
}

export default Profile