import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import CartItem from '../components/CartItem';
import StripeContainer from '../components/StripeContainer';
import store from '../state/store';
import { useSelector } from 'react-redux';
const Wrapper = styled.div` 
    flex : 0.7;
`
const Container = styled.div` 
    padding: 50px;
    display: flex;
`
const Button = styled.button` 
    padding: 5px;
    font-size: 2rem;
`
const Cart = () => {
    const [showPayment,setShowPayment] = useState(false);
    const cartItems = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const fetchProduct = async(productId,quantity) => {
        const res = await fetch(`http://localhost:5000/api/product/find/${productId}`,{
            method : 'GET',
            credentials : 'include'
        })
        var data = await res.json();
        data.quantity = quantity 
        return data
    }
    const fetchProducts = async(products) => {
        return Promise.all(products.map((product) => fetchProduct(product.productId,product.quantity)))
    }
    // useEffect(() => {
    //     console.log(user);
    //     // if(user){
    //     //    fetch('http://localhost:5000/api/cart',{
    //     //        method : 'GET',
    //     //        credentials : 'include'
    //     //    })
    //     //    .then(res => res.json())
    //     //    .then(data => {
    //     //     //    console.log(data.products);
    //     //        return data.products;
    //     //    })
    //     //    .then(products => fetchProducts(products))
    //     //    .then(fetchedProducts => {
    //     //     //    console.log(fetchedProducts);
    //     //        store.dispatch({type : 'initialiseCart',payload : fetchedProducts})})
    //     //    .catch(err => console.log(err));
    //     // }
    //     return () => {
    //         console.log("component is unmounting");
    //     }
    // },[]);
    const cartTotal = () => {
        var sum = 0;
        cartItems.forEach(item => sum+=item.price*item.quantity)
        return sum;
    }
    const cartSize = () => {
        var sum = 0;
        cartItems.forEach(item => sum+=item.quantity)
        return sum;
    }
    const handleCheckout = (e) => {
        setShowPayment(true);
    }   
  return (
      <>
        {showPayment?<StripeContainer showPayment={showPayment} setShowPayment={setShowPayment} amount={cartTotal()}/> : null}   
      <Container>
    <Wrapper>
        <p style={{fontSize:"30px",marginBottom:"20px"}}>MY CART</p>
        {cartItems.map((item) => {
            return <CartItem key = {item._id} item={item}/>
        })}
    </Wrapper>
    <div style={{display:"flex",flexDirection:"column",paddingLeft:"2rem"}}>
        <p style={{fontSize:"30px",marginBottom:"20px"}}>Subtotal ({cartSize()} items): ₹ {cartTotal()}</p>
        <Button onClick={handleCheckout}>Checkout➡</Button>
    </div>
    </Container>
    </>
  )
}

export default Cart