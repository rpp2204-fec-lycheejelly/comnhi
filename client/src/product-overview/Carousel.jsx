import React from 'react';
import carouselQueue from './lib/carouselQueue.js';
import upArrow from '../assets/arrow-up.png';
import downArrow from '../assets/arrow-down.png';

let Carousel = ({photos, changeImage, index}) => {
  let carousel = carouselQueue(photos);

  return <div className='style-carousel'>
           <img src={upArrow} alt="up-arrow" className="up-arrow"></img>
            {carousel.map((photo, i) => {
              return <img className={index === i ? "carousel-selected" : ""}
                          onClick={() => {changeImage(i)}}
                          src={photo.thumbnail_url}
                          alt="style-photo"
                          key={i}></img>
            })}
           <img src={downArrow} alt="down-arrow" className="down-arrow"></img>
         </div>
}

export default Carousel;