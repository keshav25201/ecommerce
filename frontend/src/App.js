import React,{useEffect,useState} from 'react'
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ProductView from './pages/ProductView';
import OrderSuccessful from './pages/OrderSuccessful';
import SearchView from './pages/SearchView';
import Footer from './components/Footer';
import {Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from './state/store';
import './App.css'
const App = () => {
  const user = useSelector(state => state.user);
  useEffect(() => {;
    fetch('http://localhost:5000/api/auth/verifyToken',{
      method : 'GET',
      credentials : 'include'
    })
    .then(res => res.json())
    .then(data =>{
      store.dispatch({type:'set',payload:data.user
  })
})
    .catch(err => console.log(err));
  },[])
  return (
    <div className='App'>
      <Navbar user={user}></Navbar>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/login' element={<Login/>} />
        <Route path = '/register' element={<Signup/>} />
        <Route path = '/cart' element={<Cart/>} />
        <Route path = '/profile' element={<Profile/>} />
        <Route path = '/:productId' element={<ProductView />} />
        <Route path = '/successful' element={<OrderSuccessful/>}/>
        <Route path = '/search' element={<SearchView/>}/>
      </Routes>
      <div style={{"height":"200px"}}></div>
      <Footer/>
    </div>
  )
}

export default App