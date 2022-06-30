import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import CartIcon from '../images/cart.svg'
import SearchIcon from '../images/search.svg';
import UserIcon from '../images/user.svg'
import store from '../state/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.div`
    display: flex;
    padding: 15px 10px;
    justify-content:space-between ;
    border-bottom: 4px solid #cdd22c;
`
const Option = styled.div`
    display:flex ;
    justify-content:space-around;
    flex:0.3;
`
const Center = styled.div`
    flex:0.4;
    text-align:center ;
    font-size: 30px;
    font-weight: 500;
`
const Search = styled.div`
    display: flex;
    flex : 0.3;
    justify-content: right;
`
const StyledLink = styled(Link)` 
text-decoration: none;
color: black;
`
const Navbar = () => {
    const user = useSelector(state => state.user);
    const [inputText,setInputText] = useState('');
    const navigate = useNavigate();
    const handleInputText = (e) => {
        setInputText(e.target.value);
    }
    const HandleSignOut = async(e) => {
        fetch('http://localhost:5000/api/auth/logout',{
            method : 'GET',
            credentials : 'include'
        })
        .then(res=>store.dispatch({type:'unset',payload:null}));
    }   
    const handleTitleQuery = async(e) => {
        e.preventDefault();
        navigate(`/search?title=${inputText}`);
    }
  return (
    <Wrapper>
        <form onSubmit={handleTitleQuery}>
        <Search>
            <input type="text" style={{width : "80%",fontSize : "20px"}} value = {inputText} onChange={handleInputText}/>
            <div style={{width:"30px",marginLeft:"10px"}}><img src={SearchIcon} alt="" /></div>
            <button type='submit' style={{"display":"none"}}></button>
        </Search>
        </form>
        <Center><StyledLink to = "/" style={{"fontStyle":"italic"}}>SHOPPERS STOP</StyledLink></Center>
        
        <Option>
            {(user===null)? <div style={{paddingTop:"6px"}}><StyledLink to='/login'>SIGN IN</StyledLink></div> : <div style={{width:"30px"}}><StyledLink to = '/profile'><img src={UserIcon} alt="" /></StyledLink></div>}

        
            {(user===null)? <div style={{paddingTop:"6px"}}><StyledLink to='/register'>REGISTER</StyledLink></div> : <div onClick={HandleSignOut} style={{paddingTop:"6px"}}>SIGNOUT</div>}
            
            
            <div style={{width:"30px"}}><StyledLink to = '/cart'><img src={CartIcon} alt="" /></StyledLink></div>
        </Option>  
    </Wrapper>
  )
}

export default Navbar