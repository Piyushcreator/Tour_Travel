
import React from 'react'
import Tourcard from '../shared/Tourcard'
import tourData from '../assets/data/tours' 
import {Col} from 'reactstrap'
import useFetch from '../hooks/useFetch.js'
import { BASE_URL } from '../utils/config'
 
const FeaturedToursList = () => {

  const {data: featuredTours,loading,error} = useFetch(`${BASE_URL}/tour/search/getFeaturedTours`)
  return (
   <>
   {
    loading && <h4>Loading....</h4>
   }
      {
    error && <h4>{error}</h4>
   }
   {
    !loading && !error && featuredTours.map((tour)=>(
            <Col lg='3' md='6' sm='6' className="mb-4" key={tour.id}>
                <Tourcard tour={tour}/>
            </Col>
    ))
   }
   </>
  )
}

export default FeaturedToursList