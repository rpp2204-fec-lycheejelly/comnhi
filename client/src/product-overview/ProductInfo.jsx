import React from 'react';
import Stars from './Stars.jsx';

let ProductInfo = ({product, reviews}) => {
  return <div>
    <h3>Product Information</h3>
    <Stars reviews={reviews}/>
    <p>Category: {product.category}</p>
    <h4>{product.name}</h4>
    <span>{product.default_price}</span>
    <p>{product.description}</p>
    <button>Add To Outfit</button>
  </div>
}

export default ProductInfo;