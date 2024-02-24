import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  console.log(movieId);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      console.log(response);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) {
    return null;
  }

  return (
    <section>
      <img
        className="modal_posterimg"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="image"
      />
    </section>
  );
};

export default DetailPage;