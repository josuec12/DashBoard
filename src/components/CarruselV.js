import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';


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
