import React,{useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
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
const Signup = () => {
    const [InputData,setInputData] = useState({
        mobile : '',
        password : '',
        email : '',
        name : ''
    })
    const InputChangeHandler = (e) => {
        InputData[e.target.name] = e.target.value;
        setInputData({
            ...InputData
        })
    }
    const HandleSubmission = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/register',InputData)
        .then(res => console.log(res)) 
        .catch(err => console.log(err));
    }
  return (
      <Container>
    <Wrapper>
         <Form onSubmit={HandleSubmission}>
            <Field>
                <Label>NAME</Label>
                <Input type="text" name = "name" value={InputData.name} onChange={InputChangeHandler}/>
            </Field>
            <Field>
                <Label>MOBILE</Label>
                <Input type="text" name = "mobile" value={InputData.mobile} onChange={InputChangeHandler}/>
            </Field>
            <Field>
                <Label>EMAIL</Label>
                <Input type="text" name = "email" value={InputData.email} onChange={InputChangeHandler}/>
            </Field>
            <Field>
                <Label>PASSWORD</Label>
                <Input type="password" name = "password" value={InputData.password} onChange={InputChangeHandler}/>
            </Field>
            <Field>
            <Button type="submit">SIGN UP</Button>
            </Field>
           
        </Form>
    </Wrapper>
    </Container>
  )
}

export default Signup