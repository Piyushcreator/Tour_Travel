import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import experienceImg from '../assets/images/experience.png'
import worldImg from '../assets/images/world.png'
import Subtitle from '../shared/Subtitle'
import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedToursList from '../featuredtours/FeaturedToursList'
import MasonryImages from '../imagegallery/MasonryImages'
import Testimonial from '../Testimonials/Testimonial'
import Newsletter from '../shared/Newsletter'

const Home = () => {
  return (<>
    {/*Hero Content */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle subtitle={'Know Before You Go'} />
                <img src={worldImg} alt="" />
              </div>
              <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptatem in aliquid hic doloremque mollitia perspiciatis excepturi. Quas impedit nesciunt minima atque. Enim odit quod modi fugit perferendis at quae.</p>
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src={heroVideo} alt="" controls />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="" />
            </div>
          </Col>
          <SearchBar />
        </Row>
      </Container>
    </section>
    {/*Hero Content 1 end*/}
    {/*Hero Content 2 service list*/}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className="services__subtitle">What We Serve</h5>
            <h2 className="services__title">We Offer our best Services.</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>
    {/*Hero Content 2 service list end*/}
    {/*Featured Section*/}
    <section>
      <Container>
        <Row>
          <Col lg='12' className="mb-5">
            <Subtitle subtitle={'Explore'} />
            <h2 className="featured__tour-title">Our Featured tours</h2>

          </Col>
          <FeaturedToursList />
        </Row>
      </Container>
    </section>
    {/*Featured Section end*/}

    {/*Experience Section start*/}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
              <Subtitle subtitle='Experience' />
              <h2>With our all Experience <br /> We will serve you.</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quia totam blanditiis deleniti, eligendi placeat magnam, quaerat quos laudantium suscipit ratione, tenetur officiis. Doloribus ducimus voluptates deserunt eveniet officia aliquid.s</p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successfull Trip</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular clients</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Years of Experience</h6>
              </div>
            </div>
          </Col>
          <Col lg='6'>
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>

          </Col>
        </Row>
      </Container>
    </section>

    {/*Experience Section end*/}

    {/*gallery Section start*/}
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle subtitle='Gallery' />

            <h2 className="gallery__title">Visit our customer tour gallery</h2>

          </Col>
          <Col lg="12">
            <MasonryImages />
          </Col>
        </Row>
      </Container>
    </section>
    {/*gallery Section end*/}

    {/*Testimonial Section start*/}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle='Fans Love' />
            <h2 className="testimonial__title">What our Fans say about us.</h2>
          </Col>
          <Col lg='12'><Testimonial /></Col>
        </Row>
      </Container>
    </section>
    {/*Testimonial Section end*/}
    <Newsletter />
  </>
  )
}

export default Home