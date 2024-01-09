import React from 'react'
import './footer.css'
import { Container, Row, Col,ListGroup,ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const quicklinks=[
  {
    path:'/home',
    display: 'Home'
  },
  {
    path:'/tours',
    display: 'Tours'
  },
  {
    path:'/about',
    display: 'About'
  }

]

const quicklinks2=[
  {
    path:'/gallery',
    display: 'Gallery'
  },
  {
    path:'/login',
    display: 'Login'
  },
  {
    path:'/register',
    display: 'Register'
  }

]

const Footer = () => {
  const year= new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} alt=""/>
              <p>lorem ipsum sit amet consectetur adipiscing elit. commodi, enim.</p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'><i class="ri-youtube-fill"></i>
                   </Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-github-fill"></i>
                   </Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-facebook-line"></i>
                   </Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-instagram-line"></i>
                   </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg='3'>
              <h5 className="footer__link-title">Discovers</h5>
              <ListGroup className='footer__quick-links'>
                {
                  quicklinks.map((item,index)=>(
                    <ListGroupItem key= {index}><Link to={item.path}>{item.display}</Link></ListGroupItem>
                    
                  ))
                }

              </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup className='footer__quick-links'>
                {
                  quicklinks2.map((item,index)=>(
                    <ListGroupItem key= {index}><Link to={item.path}>{item.display}</Link></ListGroupItem>
                    
                  ))
                }

              </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Contact</h5>
              <ListGroup className='footer__quick-links' >
                
                 
                    <ListGroupItem className='d-flex align-items-center gap-3'>

                      <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span>
                        <i class="ri-map-pin-line"></i>
                        </span>
                        Address:
                      </h6>
                      <p className="mb-0">Badarpur New Delhi</p>
                    </ListGroupItem>
                    <ListGroupItem className='d-flex align-items-center gap-3'>

<h6 className='mb-0 d-flex align-items-center gap-2'>
  <span>
  <i class="ri-mail-line"></i>
  </span>
  Email:
</h6>
<p className="mb-0">piyushshrm68@gmail.com</p>
</ListGroupItem>
<ListGroupItem className='d-flex align-items-center gap-3'>

<h6 className='mb-0 d-flex align-items-center gap-2'>
  <span>
  <i class="ri-phone-line"></i>
  </span>
  Phone:
</h6>
<p className="mb-0">9910691379</p>
</ListGroupItem>
                    
                    
                  
                

              </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5'>
            <p className='copyright '>Copyright {year}, design and develop by Piyush Sharma. All Right Reserved</p> 
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer