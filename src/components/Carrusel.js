import React from 'react';
import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Carrusel = () => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="cardn">
          <Link className="aa" target='blank' to="https://www.portafolio.co/negocios/empresas/grupo-sura-no-hubo-fraude-contable-en-acuerdos-con-coinversionistas-concluye-investigacion-578640">       
          <img alt="" src="https://www.portafolio.co/files/listing_secondary/uploads/2021/11/26/61a133d7e7419.jpeg"/>
          <p className="desc">Grupo Sura: 'No hubo fraude contable en acuerdos con coinversionistas'</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cardn">
          <Link className="aa" target='blank' to="https://www.larepublica.co/especiales/facturacion-electronica-marzo-2019/apoyo-de-la-oferta-academica-para-capacitarse-en-sistemas-contables-2842288">
          <img alt="" src="https://img.lalr.co/cms/2019/03/20180634/educaci%C3%B3n.jpg?size=sm" />
          <p className="desc">Apoyo de la oferta académica para capacitarse en sistemas contables</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cardn">
          <Link className="aa" target='blank' to="https://www.larepublica.co/finanzas-personales/cuanto-cuesta-una-asesoria-contable-en-colombia-2752473">
          <img alt="" src="https://img.lalr.co/cms/2017/11/03193244/FinanzasPersonales.jpg?size=sm" />
          <p className="desc">La asesoría o valoración contable en una empresa cuesta cerca de $39 millones</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cardn"> 
          <Link className="aa" target='blank' to="https://www.larepublica.co/especiales/facturacion-electronica-marzo-2019/la-importancia-de-saber-con-quien-contrata-la-tecnologia-para-facturar-electronicamente-2842323">
          <img alt="" src="https://img.lalr.co/cms/2019/03/20181512/Facturacion.jpg?size=sm" />
          <p className="desc">La importancia de saber con quién contrata la tecnología para facturar electrónicamente</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cardn">
          <Link className="aa" target='blank' to="https://www.larepublica.co/especiales/factura-electronica-2021/planes-del-mercado-para-el-servicio-de-facturacion-electronica-arrancan-en-70-000-3131744">
          <img alt="" src="https://img.lalr.co/cms/2021/02/25174735/espfacturacionE_anderson_p4_900.jpg?size=sm" />
          <p className="desc">Planes del mercado para el servicio de facturación electrónica arrancan en $70.000</p>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Carrusel
