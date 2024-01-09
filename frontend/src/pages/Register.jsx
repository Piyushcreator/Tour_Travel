import React,{useState,useContext} from 'react'
import '../styles/register.css'
import {Container, Row,Col,Form,FormGroup, Button} from 'reactstrap';
import {Link,useNavigate} from 'react-router-dom'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import {AuthContext} from '../context/AuthContext.js'
import { BASE_URL } from '../utils/config';

const Register = () => {


const navigate = useNavigate();
const {dispatch} = useContext(AuthContext);


const[credentials,setcredentials] = useState({
  username: undefined,
  email: undefined,
  password: undefined,
});

const handleClick = async (e) =>{
  try {
    const data=  JSON.stringify(credentials);
    e.preventDefault();
  const res=await fetch(`${BASE_URL}/auth/register`,{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(credentials)
  })

  const result =await res.json();
  if(!res.ok) alert(result.message);
  else{
  dispatch({type:'REGISTER_SUCCESS'})
  navigate('/login');}
    
  } catch (err) {
    alert(err.message)
  }
  
}

const handleChange =(e)=>{
  setcredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  //alert(e.target.value )
};
  return (
   <section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerImg} alt=""/> 
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt=""/>
              </div>
              <h2>Register</h2>
               
              <Form onSubmit={handleClick}>
              <FormGroup>
                  <input type="text" placeholder='Username' required id='username' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="text" placeholder='Email' required id='email' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handleChange}/>
                </FormGroup>  
                <Button className='btn auth__btn' type='submit' onClick={handleClick}>Create Account</Button>
              </Form>
              <p>Already have an account. <Link to="/login">Login</Link></p>
            </div>
            </div>
        </Col>
      </Row>
    </Container>
   </section>
  )
}

export default Register