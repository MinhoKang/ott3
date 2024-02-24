import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import './Row.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper/modules';
import styled from 'styled-components';
import MovieModal from './MovieModal';

function Row({ title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [openModal, SetOpenModal] = useState(false);
  const [select, SetSelect] = useState({});

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    console.log(response);

    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const click = (movie) => {
    SetOpenModal(true);
    SetSelect(movie);
    console.log(select);
  };

  return (
    <div>
      <h2>{title}</h2>
      {/* <div className="slider">
        <div className="slider_arrow-left">
          <span
            className="arrow arrow-left"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {'<'}
          </span>
        </div> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          {/* <Wrap> */}
          <div className="row_posters" id={id}>
            {movies.map((movie) => (
              <img
                key={movie.id}
                className="rowposter"
                alt="movieImg"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                onClick={() => click(movie)}
              />
            ))}
          </div>
          {/* </Wrap> */}
        </SwiperSlide>
      </Swiper>

      {openModal && <MovieModal {...select} setModal={SetOpenModal}></MovieModal>}

      {/* <div className="slider_arrow-right">
          <span
            className="arrow arrow-right"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80; //?
            }}
          >
            {'>'}
          </span>
        </div>
      </div> */}
    </div>
  );
}

const Wrap = styled.div`
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
            rgb(0 0 0 /73%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
border: 3px solid rgba(249, 249, 249, 0.1);
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;


  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 0;
  }


  &:hover {
    box-shadow: rgb(0 0 0 /80%) 0px 40px 58px -16px;
              rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform : scale(1.05);
    border-color : rgb(249,249,249,0.8);
    video {
      opacity : 1;
    }

  }
 `;

export default Row;
