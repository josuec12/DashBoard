import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './StylesV.css';


const CarruselV = () => {
  return (
    <>
    <Swiper
        direction={'vertical'}
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
 <SwiperSlide><img alt='' src="https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg"/></SwiperSlide>
        <SwiperSlide><img alt='' src="https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg"/></SwiperSlide>
        <SwiperSlide><img alt='' src="https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg"/></SwiperSlide>
        <SwiperSlide><img alt='' src="https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg"/></SwiperSlide>
        <SwiperSlide><img alt='' src="https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg"/></SwiperSlide>
      </Swiper>
  </>
  )
}

export default CarruselV
