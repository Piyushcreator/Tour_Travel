import React,{useEffect, useRef,useState,useContext} from 'react'
import '../styles/tourdetails.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'

const TourDetails = () => {
  const { id } = useParams()
  const reviewMsgRef = useRef('');
  const [tourRating, settourRating] = useState(null);
  const {user} = useContext(AuthContext);


  const {data : tour,loading,error} = useFetch(`${BASE_URL}/tour/${id}`);
 // const tour = tourData.find(tour => tour.id === id)
 //console.log(tour);
  //for date format
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const { photo, title, desc, price, reviews, city, distance, address, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //submit request to server
  const submitHandler= async(e)=>{
    e.preventDefault();
    const reviewText= reviewMsgRef.current.value;
   // alert(`${reviewText},${tourRating}`)

   try {
    if(!user || user===undefined || user===null){
      alert('Please Sign In');
      return;
   }
   const reviewObj = {
    username:user.username,
    reviewText,
    rating:tourRating
   }
      const res = await fetch(`${BASE_URL}/review/${id}`,{
        method:'post',
        headers:{
          'content-type':'application/json',
          'Authorization': `Bearer ${user.token}`
        },
       //credentials: 'include',//for cookies
        body:JSON.stringify(reviewObj)
      }) 
      const result= await res.json();
      if(!res.ok){
        return alert(result.message);
      }
      alert(result.message);
   } catch (err) {
     alert(err.message);
   }
  }

  useEffect(()=>{

    window.scrollTo(0,0);
  },[]);

  
  return (
    <>
      <section>
        <Container>
        {loading && <h4 className='text-center pt-5'>Lodaing....</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
       {!loading && !error &&    <Row>
            <Col lg='8'>
              <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                  <h2>
                    {title}
                  </h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>{avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ("Not rated") : (<span>
                        ({reviews?.length})
                      </span>)}


                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i>{address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-fill"></i>{city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-fill"></i>{price}/per person
                    </span>
                    <span>  
                    <i class="ri-map-pin-2-line"></i>{distance} K/m
                    </span>
                    <span>
                      <i className="ri-group-fill"></i>{maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                {/*Tour Reviews Section start*/}
                <div className="tour__reviews mt-4">

                  <h4>Reviews ({reviews?.length}) reviews</h4>
                  <Form onSubmit={submitHandler}>
                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                      <span onClick={()=>settourRating(1)}>1 <i className="ri-star-fill"></i></span>
                      <span onClick={()=>settourRating(2)}>2 <i className="ri-star-fill"></i></span>
                      <span onClick={()=>settourRating(3)}>3 <i className="ri-star-fill"></i></span>
                      <span onClick={()=>settourRating(4)}>4 <i className="ri-star-fill"></i></span>
                      <span onClick={()=>settourRating(5)}>5 <i className="ri-star-fill"></i></span>

                    </div>
                    <div className="review__input">
                      <input type='text' ref={reviewMsgRef} placeholder='share your thoughts' required />
                      <button
                        className='btn primary__btn text-white' type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className='user__reviews'>
                    {
                      reviews?.map(review => (
                        <div className='review__item' key={review.name}>
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                              <h5>{review.username}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}
                              </p></div>
                              <span className='d-flex align-items-center'>
                              {review.rating} <i className="ri-star-fill"></i>
                            </span>
                            </div>
                           <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))
                    }
                  </ListGroup>
                </div>
                {/*Tour Reviews Section end*/}
              </div>
            </Col>
            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating}/>
            </Col>
          </Row>}
        </Container>
      </section>
    </>
  )
}

export default TourDetails