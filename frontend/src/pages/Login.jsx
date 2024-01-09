import React,{useState,useContext} from 'react'
import '../styles/login.css'
import {Container, Row,Col,Form,FormGroup, Button} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom'

import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import {AuthContext} from '../context/AuthContext.js'
import { BASE_URL } from '../utils/config';

const Login = () => {

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  const[credentials,setcredentials] = useState({
    email:undefined,
    password: undefined
});
const handleChange =(e)=>{
    setcredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    //alert(e.target.value )
};

const handleClick = async (e) =>{
  try {
    const data=  JSON.stringify(credentials);
    e.preventDefault();
  const res=await fetch(`${BASE_URL}/auth/login`,{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(credentials)
  })

  const result =await res.json();
  if(!res.ok) {alert(result.message);
    dispatch({type:'LOGIN_FAILURE',payload:result.message})}
  else{
 //   console.log(result)
  dispatch({type:'LOGIN_SUCCESS',payload:result.data})
  navigate('/');}
    
  } catch (err) {
    dispatch({type:'LOGIN_FAILURE',payload:err.message})
  }
  
}
  return (
   <section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt=""/> 
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt=""/>
              </div>
              <h2>Login</h2>
              
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="text" placeholder='Email' required id='email' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handleChange}/>
                </FormGroup>  
                <Button className='btn auth__btn' type='submit' onClick={handleClick}>Login</Button>
              </Form>
              <p>Dont't have an account? <Link to="/register">Create</Link></p>
            </div>
            </div>
        </Col>
      </Row>
    </Container>
   </section>
  )
}

export default Login