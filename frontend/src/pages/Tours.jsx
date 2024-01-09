import React,{useState,useRef, useEffect} from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/tour.css'
import SearchBar from './../shared/SearchBar.jsx'
import Newsletter from  './../shared/Newsletter.jsx'
import TourCard from '../shared/Tourcard.jsx'
import tourData from '../assets/data/tours.js'
import { Col, Container,Row } from 'reactstrap'
import useFetch from '../hooks/useFetch.js'
import { BASE_URL } from '../utils/config.js'

const Tours = () => {

  const [pageCount, setpageCount] = useState(0);
  const [page, setPage]= useState(0);

  const {data : tours,loading,error} =useFetch(`${BASE_URL}/tour?page=${page}`)
  const {data : tourCount} = useFetch(`${BASE_URL}/tour/search/getTourCount`)

  useEffect(()=>{
    const pages= Math.ceil(tourCount/4)
    setpageCount(pages);
    window.scrollTo(0,0)
  },[page,tourCount,tours]);
  return (
    <div><CommonSection title={'All Tours'}/>
    <section>
       <Container>
        <Row>
          <SearchBar />
        </Row>
       </Container>
    </section>
    <section className='pt-0'>
      <Container>
        {loading && <h4 className='text-center pt-5'>Lodaing....</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
       {
        !loading && !error &&  <Row>
        {
          tours?.map(tour=><Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
            <TourCard tour={tour}/>
          </Col>)
        }
        <Col lg='12'>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {
              [...Array(pageCount).keys()].map(number=>(
                <span key={number} onClick={()=>setPage(number)}
                className={page===number?'active__page' : ""}>
                  {number +1}
                </span>
              ))
            }
          </div>
        </Col>

      </Row>
       }
      </Container>
    </section>
    <Newsletter />
    </div>
    
    
  )
}

export default Tours