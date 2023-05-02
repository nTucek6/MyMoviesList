// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function swiper({ RecentMovies }) {
  const imageStyle = 
  { 
    width: '200px',
    height:'300px' 
     };

  if (RecentMovies == null) {
    return null;
  }

  return (
    <div className='swiper-container'>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className='myswiper'
    //onSlideChange={() => console.log('slide change')}
    //onSwiper={(swiper) => console.log(swiper)} 
    >
      {(RecentMovies.length > 0 ?
        RecentMovies.map((movie) => {
          return (<SwiperSlide key={movie.id}>
            <div style={{cursor:"pointer"}} onClick={() => {}}>
            <img className='swiperslide' style={imageStyle} src={"data:image/png;base64," + movie.movieImageData} />
            </div>
          

          </SwiperSlide>)
        }
        ) : null
      )}


    </Swiper>
    </div>
  );
};
