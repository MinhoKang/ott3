import React, { useRef } from 'react';
import './MovieModal.css';
import useOnClickOutside from '../Hooks/useOnClickOutside';

const MovieModal = ({
  backdrop_path,
  title,
  name,
  vote_average,
  overview,
  first_air_date,
  release_date,
  original_title,
  setModal,
}) => {
  const myref = useRef();
  useOnClickOutside(myref, () => {
    setModal(false);
  });
  console.log(myref.current);
  return (
    <div className="container" role="presentation">
      <div className="wrap-modal">
        <div className="modal" ref={myref}>
          <span onClick={() => setModal(false)} className="close">
            X
          </span>
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt=""
            className="modal_img"
          />
          <div className="modalContent">
            <p className="modalDetail">{release_date ? release_date : first_air_date}</p>
            <h2 className="modalTitle">{title ? title : name}</h2>
            <p className="modaloverview">평점: {vote_average}</p>
            <p className="modaloverview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
