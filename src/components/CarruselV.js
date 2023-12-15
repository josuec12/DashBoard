import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

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
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img alt='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbymRKEBZv98Wmq0hSPiCDHncWseCzsG0aCHU4Enk&s"/></SwiperSlide>
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
