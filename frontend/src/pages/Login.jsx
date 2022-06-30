import React,{useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import store from '../state/store';
import { useSelector } from 'react-redux';
const Container = styled.div`
    height : 100vh;
   overflow: hidden;
   background-image: url('https://img.freepik.com/free-photo/girl-holds-fashion-shopping-bag-beauty_1150-13673.jpg?w=2000');
   background-size: cover;
`
const Wrapper = styled.div`
    margin : auto;
    margin-top: 10%;
    height: 400px;
    width: 400px;
    border-radius: 1rem;
    padding: 30px;
    display:grid ;
    align-items: center;
    background-color: white;
    opacity: 0.9;
`
const Form = styled.form` 
    display: flex;
    flex-direction:column ;
    justify-content:space-between ;
    height : 80%;
`
const Label = styled.div` 
    width : 120px;
    font-size: 20px;
    font-weight: 500;
    padding-top : 5px;
`
const Input = styled.input` 
    flex : 0.8;
    padding: 6px;
    font-size: 15px;
`
const Field = styled.div`
    display: flex;
`
const Button = styled.button` 
    height: 50px;
    width: 100px;
    background: #B8F1B0;
    border: none;
    margin-left: auto;
    margin-right: auto;
`
const Login = () => {
    const [InputData,setInputData] = useState({
        mobile : '',
        password : ''
    })
    const user = useSelector(state => state.user);
    const navigate = useNavigate();//to redirect in react-router
    const InputChangeHandler = (e) => {
        if(e.target.name === 'mobile'){
            InputData.mobile = e.target.value;
        }else{
            InputData.password = e.target.value;
        }
        setInputData({
            ...InputData
        })
    }
    const HandleSubmission = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login',InputData,{withCredentials : true})
        .then(res => {
            store.dispatch({type:'set',payload:res.data.user});
            navigate('/');
        })
        .catch(err => console.log(err));
    }
  return (
      <Container>
    <Wrapper>
         <Form onSubmit={HandleSubmission}>
            <Field>
                <Label>MOBILE</Label>
                <Input type="text" name = "mobile" value = {InputData.mobile} onChange = {InputChangeHandler}/>
            </Field>
            <Field>
                <Label>PASSWORD</Label>
                <Input type="password" name = "password" value = {InputData.Password} onChange = {InputChangeHandler}/>
            </Field>
            <Field>
            <Button type="submit">LOG IN</Button>
            </Field> 
        </Form>
    </Wrapper>
    </Container>
  )
}

export default Login