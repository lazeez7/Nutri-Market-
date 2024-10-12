import { React, useEffect } from "react";
import "./banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Photo from './oson.jpg'
import Photo_2 from './osondokon.jpg'
import  Photo_3 from './osonpng.png'
const Banner = () => {
  return (
    <div className="banner">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        loop= 'true'
        
        style={{ zIndex: 0 }}
      >
        <SwiperSlide>
          <img
            src={Photo}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Photo_2}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Photo_3}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
