import React from 'react'
import sliderImg1 from '../../assets/41nN4nvKaAL._AC_SY200_.jpg'
import sliderImg2 from '../../assets/61cSNgtEISL._AC_SY200_.jpg'
import sliderImg3 from '../../assets/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import sliderImg4 from '../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import sliderImg5 from '../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Slider from 'react-slick/lib/slider'


export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false
  };

  return (
    <>
<div className='flex justify-center my-6 '>
<div className='row w-1/2'>
        <div className='w-1/2'>
          <Slider {...settings} className='my-4'>
            <img src={sliderImg1} alt="" className='w-full h-[400px] object-contain' />
            <img src={sliderImg2} alt="" className='w-full h-[400px] object-contain' />
            <img src={sliderImg3} alt="" className='w-full h-[400px] object-contain' />
          </Slider>
        </div>
        <div className='w-1/2'>
          <img src={sliderImg4} alt="" className='w-full h-[200px] object-cover' />
          <img src={sliderImg5} alt="" className='w-full h-[200px] object-cover' />
        </div>
      </div>
</div>
    </>
  )
}
