// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './searchPage.css';

// const SearchPage = () => {
//   const [searchResult, setSearchResult] = useState([]);
//   const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
//   };
//   const navigate = useNavigate();

//   let query = useQuery();
//   const searchTerm = query.get('q');

//   useEffect(() => {
//     if (searchTerm) {
//       fetchSearchMovie(searchTerm);
//     }
//   }, []);

//   const fetchSearchMovie = async (searchTerm) => {
//     try {
//       const response = await axios.get(`/search/movie?query=movie.id&include_adult=false&query=${searchTerm}`);
//       setSearchResult(response.data.results);
//       console.log('response', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log(searchResult);
//   if (searchResult.length > 0) {
//     return (
//       <section className="search-container">
//         {searchResult.map((movie) => {
//           if (movie.backdrop_path !== null && movie.media_type !== 'person') {
//             const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
//             return (
//               <div className="seach-container" key={movie.id}>
//                 <div
//                   className="movie_poster_column"
//                   onClick={() => {
//                     navigate(`/${movie.id}`);
//                   }}
//                 >
//                   <img src={movieImageUrl} alt="movie" className="movieposeter" />
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </section>
//     );
//   } else {
//     return (
//       <section className="resultNo">
//         <div className="resultNoText">
//           <p>해당 검색어에 일치하는 "{searchTerm}"은(는) 영화는 없습니다.</p>
//         </div>
//       </section>
//     );
//   }
// };

// export default SearchPage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './searchPage.css';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get('q');

  useEffect(() => {
    if (searchTerm) {
      fetchSearchmovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchmovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResult(response.data.results);
      console.log('response', response);
      console.log('searchResult', searchResult);
    } catch (error) {}
  };

  if (searchResult.length > 0) {
    return (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className="search-container" key={movie.id}>
                <div className="movie_poster_column" onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt="movie" className="movieposter" />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="resultno">
        <div className="resultnotext">
          <p>해당 검색어에 일치하는 "{searchTerm}"은(는) 영화 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
