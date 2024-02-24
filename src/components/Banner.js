import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClick, setIsClick] = useState(false);
  console.log(movie);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get(requests.TopRank);
    // console.log(response);
    const movieID =
      response.data.results[Math.floor(Math.random() * response.data.results.length)].id;

    // axios.get('https://api.themoviedb.org/3?api_key=af1996153175c55eb6891a9e0ef499f3');
    const { data: movieDetail } = await axios.get(`movie/${movieID}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };

  const strcutting = (str, n) => {
    return str?.length > n ? str.substr(0, n) + '...' : str;
  };

  if (isClick) {
    return (
      <div>
        <Container>
          <HomeContainer>
            <Iframe
              src={`http://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0].key}`}
              width="800"
              height="600"
              frameborder="0"
              allow="autoplay: fullscreen"
            />
          </HomeContainer>
        </Container>
      </div>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner_content">
          <h1 className="banner_title">{movie.title || movie.name || movie.origianl_title}</h1>
          <div className="banner_buttons">
            {movie?.videos?.results[0]?.key && (
              <button className="banner_button" onClick={() => setIsClick(true)}>
                PLAY
              </button>
            )}
          </div>
          <p className="banner_overview">{strcutting(movie.overview, 90)}</p>
        </div>
        <div className="banner_fadebtn"></div>
      </header>
    );
  }
}

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
