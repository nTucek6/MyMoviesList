// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Image from './yor.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function swiper({RecentMovies}) {
    const imageStyle = { width: '200px', height: '300px' };
    //console.log(RecentMovies);

    if(RecentMovies == null)
    {
      return  <p>Empty slider!</p>
    }
   
    const Movies =({movies}) => 
        {
          if(movies.length > 0)
          {
            const list = movies.map((movie) => (
              <SwiperSlide><img style={imageStyle} src={movie.MovieImage} /></SwiperSlide>
              ));
              return list;
          }
          else
          {
            return  <p>Empty slider!</p>

          }

        
        } 

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      //onSlideChange={() => console.log('slide change')}
      //onSwiper={(swiper) => console.log(swiper)} 
    >
<Movies movies={RecentMovies} />
   

      {/*
      
      <SwiperSlide><img style={imageStyle} src={Image} /></SwiperSlide>
      <SwiperSlide><img style={imageStyle} src={Image} /></SwiperSlide>
      <SwiperSlide><img style={imageStyle} src={Image} /></SwiperSlide>
      <SwiperSlide><img style={imageStyle} src={Image} /></SwiperSlide>
      */}
    
    </Swiper>
  );
};
