import React, { Component } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
export default class Banner extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Image
              src="https://cdn.technadu.com/wp-content/uploads/2018/07/Amazon-Prime-Day-2018-Featured-Banner.jpg"
              alt="First slide"
              className="slick-image"
            />
          </div>
          <div>
            <Image
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Pantry/MARCH_2020/SVD_Teaser/Desktop_Teaser_Header.jpg"
              alt="Third slide"
              className="slick-image"
            />
          </div>
          <div>
            <Image
              src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonSmallBusinessDay/Jupiter21/Spotlight/eng_pc11.jpg"
              alt="Second slide"
              className="slick-image"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
