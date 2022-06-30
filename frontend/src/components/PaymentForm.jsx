import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import closeIcon from '../images/close.svg';
import store from '../state/store';
import { CardElement,useElements,useStripe} from '@stripe/react-stripe-js'
import styled from 'styled-components';

const Container = styled.div` 
    width : 400px;
    height: 500px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color:whitesmoke ;
    display:block;
    z-index:10;
`
const FormRow = styled.div` 
    padding: 15px 5px;
    display:flex ;
    justify-content: space-between;
    font-size: 1.2rem;
`
const Form = styled.form` 
    padding : 20px;
`
const Input = styled.input` 
    border: none;
    border-bottom: 1px solid black;
    flex : 0.7;
    background-color: whitesmoke;
`
const Label = styled.label` 
    flex : 0.3;
`
const PaymentForm = ({showPayment,setShowPayment,amount}) => {
    const [formData,setFormData] = useState({
        name : '',email:'',address:'',city:'',state:'',zip:''
    })
    const navigate = useNavigate();
    const cart = store.getState().cart;
    const productDataForForm = cart.map((product,index)=>{
        return {productId:product._id,quantity:product.quantity}
    })
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async(e) => {
        e.preventDefault();
        stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })
        .then(({paymentMethod}) => {
            const {id} = paymentMethod;
            const data = {
                amount,
                id,
                ...formData,
                items : productDataForForm
            }
            return fetch('http://localhost:5000/api/payment',{
                method : 'POST',
                credentials:'include',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify(data)
            })
        })
        .then(res => {
            console.log(res.status);
            if(res.status!==200){
                throw Error("not authorised");
            }
            return res.text();
        })
        .then(res => {
            console.log(res);
            navigate('/successful');
        })
        .catch(err => {
            navigate('/login');
            console.log(err);
        })
    }
    const closeModal = (e) => {
        setShowPayment(false);
    }
    const handleInputChange = (e) =>{
        const newState = formData;
        newState[e.target.id] = e.target.value;
        setFormData({...newState});
    }
  return (
      <Container onClick={(e) => e.stopPropagation()}>
          <div style={{height:"20px","display":"flex","justifyContent":"flex-end","paddingTop":"10px",paddingRight:"10px"}}>
              <img style={{"height":"100%"}} src={closeIcon} alt="" onClick={closeModal} />
          </div>
    <Form onSubmit={handleSubmit}>
            <FormRow>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="email">Email</Label>
                <Input id = "email" value={formData.email} onChange={handleInputChange}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="address">Address</Label>
                <Input id = "address" value={formData.address} onChange={handleInputChange}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="city">City</Label>
                <Input id = "city" value={formData.city} onChange={handleInputChange}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="state">State</Label>
                <Input id = "state" value={formData.state} onChange={handleInputChange}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="zip">Zip</Label>
                <Input id = "zip" value={formData.zip} onChange={handleInputChange}/>
            </FormRow>
            <div style={{"margin":"20px 0px","padding":"10px 5px","borderBottom":"0.8px solid grey"}}>
                <CardElement/>
            </div>
            <div style={{display:"Flex",justifyContent:"center"}}>
            <button type = "submit" style={{padding : "10px 20px",fontSize:"1.5rem",flex:"1","background":"#00308F",color:"white",borderRadius:"8px","border":"none"}}>Pay ₹ {amount}</button>
            </div>
    </Form>
    </Container>
  )
}

export default PaymentForm