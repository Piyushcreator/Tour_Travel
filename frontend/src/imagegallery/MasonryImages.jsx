import React from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import galleryImages from './galleryimages'

const MasonryImages = () => {
  return (
   <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
    <Masonry gutter='1rem'>
        {
            galleryImages.map((item,index)=>(
                <img className="masonry__img" src={item} key={index} alt=""/>
            ))
        }

    </Masonry>

   </ResponsiveMasonry>
  )
}

export default MasonryImages