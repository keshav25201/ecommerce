import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import store from '../state/store';
const Wrapper = styled.div` 
    padding : 30px;
    display: flex;
    width: 1000px;
`
const ImageWrapper = styled.div` 
    height: 600px;
    width: 600px;
`
const DetailsWrapper = styled.div` 
    display: flex;
    flex-direction: column;
    width: 400px;
    padding-left: 5rem;
`
const Button = styled.button` 
    width : 40%;
    align-self: center;
    padding : 5px;
    margin-top : 10px;
`
const ProductView = () => {
    const params = useParams();
    const productId = params.productId;
    const [product,setProduct] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/api/product/find/${productId}`)
        .then(res => res.json())
        .then(data => setProduct({...data}))
        .catch(err => console.log(err));
    },[productId])

    const addToCart = (e) => {
        store.dispatch({type : 'add',payload : product})
    }
    if(!product)return (
        <Wrapper><h1>Product not Found</h1></Wrapper>
    )
  return (
    <Wrapper>
        <ImageWrapper><img style={{height:"100%"}} src={product.image} alt="" /></ImageWrapper>
        <DetailsWrapper>
            <p style={{fontSize:"40px",fontWeight:"500",paddingBottom:"15px"}}>{product.title}</p>
            <p style={{paddingBottom:"15px"}}>{product.description}</p>
            <p style={{fontSize:"40px",paddingBottom:"15px"}}>₹ {product.price}</p>
            <div style={{display:"flex",justifyContent:"space-between"}}> 
                <p><span>Color </span><span>{product.color}</span></p>
                <p><span>Size </span><span>{product.size}</span></p>
            </div>
            <Button onClick={addToCart}>Add Cart</Button>
        </DetailsWrapper>
    </Wrapper>
  )
}

export default ProductView