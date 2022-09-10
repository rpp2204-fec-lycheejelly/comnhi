import React from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelect from './StyleSelect.jsx';
import AddCart from './AddCart.jsx';
import ProductDesc from './ProductDesc.jsx';


class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      styles: [],
      currentStyle: {},
      sku: null,
      frontIdx: 0,
      backIdx: 7,
      mainIdx: 0,
      matcher: 0,
      carousel: [],
      testState: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(this.props.productData) !== JSON.stringify(prevProps.productData)) {
      this.setState({
        product: this.props.productData,
        styles: this.props.productData.styles,
        currentStyle: this.props.productData.styles[0]
      })
    }

    if(this.state.mainIdx < 0) {
        console.log('scroll down');
        let newCarousel = [...this.state.carousel];
        newCarousel.pop();
        newCarousel.unshift(this.state.currentStyle.photos[this.state.frontIdx - 1]);

        this.setState({
          carousel: newCarousel,
          frontIdx: this.state.frontIdx - 1,
          backIdx: this.state.backIdx - 1,
          matcher: this.state.matcher - 1,
          mainIdx: 0
        })

    } else if (this.state.mainIdx > 6) {
        console.log('scroll up');
        let newCarousel = [...this.state.carousel];
        newCarousel.shift();
        newCarousel.push(this.state.currentStyle.photos[this.state.backIdx]);

        this.setState({
          carousel: newCarousel,
          frontIdx: this.state.frontIdx + 1,
          backIdx: this.state.backIdx + 1,
          matcher: this.state.matcher + 1,
          mainIdx: 6
        })
    }
  }

  changeStyle(style) {
    this.setState({
      currentStyle: style,
      sku: null,
    })
  }

  updateSku(sku) {
    this.setState({
      sku
    })
  }

  addToBag(count) {
    axios.post('/cart', {
      sku_id: this.state.sku,
      count
    })
    .then(result => {
      console.log('Successful POST to /cart')
    })
    .catch(error => {
      console.log('Error POST to /cart', error)
    })
  }

  changeImage(index) {
      this.setState({
        mainIdx: index,
      })
  }

  scrollRight() {
    this.setState({
      mainIdx: this.state.mainIdx + 1,
    })
  }

  scrollLeft() {
    this.setState({
      mainIdx: this.state.mainIdx - 1,
    })
  }

  scrollUp(newCarousel) {
    this.setState({
      carousel: newCarousel,
      frontIdx: this.state.frontIdx + 1,
      backIdx: this.state.backIdx + 1,
      matcher: this.state.matcher + 1
    })
  }

  scrollDown(newCarousel) {
    this.setState({
      carousel: newCarousel,
      frontIdx: this.state.frontIdx - 1,
      backIdx: this.state.backIdx - 1,
      matcher: this.state.matcher -1,
    })
  }

  spliceCarousel(carousel) {
    this.setState({
      carousel: carousel.splice(this.state.frontIdx, 7)
    })
  }

  render() {
    return <>
           <div className='product-overview'>
            {console.log('main', this.state.mainIdx, 'front', this.state.frontIdx, 'back', this.state.backIdx, 'mirror', this.state.mirror, 'match', this.state.matcher)}
             <ImageGallery photos={this.state.currentStyle.photos || []}
                           frontIdx={this.state.frontIdx}
                           backIdx={this.state.backIdx}
                           mainIdx={this.state.mainIdx}
                           matcher={this.state.matcher}
                           carousel={this.state.carousel}
                           changeImage={this.changeImage.bind(this)}
                           scrollDown={this.scrollDown.bind(this)}
                           scrollUp={this.scrollUp.bind(this)}
                           scrollLeft={this.scrollLeft.bind(this)}
                           scrollRight={this.scrollRight.bind(this)}
                           spliceCarousel={this.spliceCarousel.bind(this)}
                           />
             <div className='product-information'>
                 <ProductInfo product={this.state.product}
                              reviews={this.state.product.ratings}
                              style={this.state.currentStyle}/>
                 <StyleSelect styles={this.state.styles}
                              currentStyle={this.state.currentStyle}
                              changeStyle={this.changeStyle.bind(this)}/>
                 <AddCart className='add-cart' skus={this.state.currentStyle.skus || {}}
                                               sku={this.state.sku}
                                               updateSku={this.updateSku.bind(this)}
                                               add={this.addToBag.bind(this)}/>
            </div>
          </div>
          <ProductDesc slogan={this.state.product.slogan}
                       description={this.state.product.description}
                       features={this.state.product.features}/>
          </>
  }
}

export default Product

