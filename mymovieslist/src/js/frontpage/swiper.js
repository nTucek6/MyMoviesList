// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function SwiperMovies({ RecentMovies }) {
  const imageStyle =
  {
    width: '200px',
    height: '300px'
  };

  const navigate = useNavigate();

  if (RecentMovies == null) {
    return null;
  }

  const toMovieInfo = (link, data) => {
    sessionStorage.setItem("movieName", data.movieName);
    navigate(link);
  }

  return (
    <div className='swiper-container'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='myswiper'
      >
        {(RecentMovies.length > 0 ?
          RecentMovies.map((movie) => {
            return (
              <SwiperSlide key={movie.id} className='mb-5 movie-card' style={{ cursor: "pointer" }} onClick={() => toMovieInfo('/movie/' + movie.id + '/' + movie.movieName, movie)}>
                <img style={imageStyle} src={"data:image/png;base64," + movie.movieImageData} />
                {/*
                  <div className='movie-name'>
                    {movie.movieName}
                  </div>
                  */
                }
              </SwiperSlide>)
          }
          ) : null
        )}


      </Swiper>
    </div>
  );
};
