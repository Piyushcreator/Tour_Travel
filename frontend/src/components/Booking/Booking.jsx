import React, { useState, useRef, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
    const { price, reviews,title } = tour;
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const [booking, setbooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        fullName: '',
        tourName: title,
        guestSize: 1,
        phone: '',
        bookAt: ''
    });
    const handleChange = (e) => {
        setbooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
        //alert(e.target.value )
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize);

    //send data to the server

    const handleClick = async (e) => {

        console.log(booking);
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                alert('Please Sign In');
                return;
            }
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                //credentials: 'include',//for cookies
                body: JSON.stringify(booking)
            })
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            navigate("/thank-you");
        } catch (err) {
            alert(err.message);
        }


        //console.log(booking);
       
    }
    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price}<span> /per person</span></h3>
                <span className="tour__rating d-flex align-items-center gap-1">
                    <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>{avgRating === 0 ? null : avgRating}
                </span>
            </div>
            {/*Booking Form Start*/}
            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" id='bookAt' required onChange={handleChange} />
                        <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
                    </FormGroup>


                </Form>
            </div>
            {/*Booking Form end*/}

            {/*Booking bottom start*/}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>${price} <i class="ri-close-line"></i> {booking.guestSize === '' && 0} person</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 service'>
                        <h5>Service Charge </h5>
                        <span>${booking.guestSize === '' ? 0 : serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span> ${booking.guestSize === '' ? 0 : totalAmount + serviceFee}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
                    Book Now
                </Button>
            </div>
            {/*Booking bottom end*/}
        </div>
    )
}

export default Booking