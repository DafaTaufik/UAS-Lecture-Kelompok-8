import React from 'react';
import { getMovieList, searchMovie } from "../api";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularRate from './CircularRate';

const Search = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = (movie, videoLink) => {
    navigate(`/detail?poster=${encodeURIComponent(movie.poster_path)}&title=${encodeURIComponent(movie.title)}&video=${encodeURIComponent(videoLink)}&rating=${encodeURIComponent(movie.vote_average)}&overview=${encodeURIComponent(movie.overview)}&date=${encodeURIComponent(movie.release_date)}&background=${encodeURIComponent(movie.backdrop_path)}&id=${encodeURIComponent(movie.id)}`);
  };

  const handleTrailerClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovie = () => {
    const [videoLinks, setVideoLinks] = useState([]);

    useEffect(() => {
      const fetchVideoLinks = async () => {
        const links = await Promise.all(
          popularMovies.map((movie) => {
            return axios
              .get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=dfee1d9ab72772275abe61c9686cb7dc`)
              .then((response) => response.data.results[0]?.key || null)
              .catch((error) => {
                console.log(error);
                return null;
              });
          })
        );
        setVideoLinks(links);
      };

      fetchVideoLinks();
    }, []);

    return popularMovies.map((movie, i) => {
      const link = videoLinks[i];

      return (
        <div className="font-poppins shadow-lg rounded-lg overflow-hidden" key={i} onClick={() => handleSearchClick(movie, link)}>
          <div className="mt-5 ml-2 relative group">
            <img className="max-w-full max-h-full rounded-xl" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
            <div className="absolute -bottom-3 left-3/4">
            <CircularRate value={movie.vote_average} />
          </div>
            <div className="top-2/4 flex flex-col absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-80 flex items-center justify-center">
              <div className="mt-2">
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" role="button" onClick={() => window.open(`https://youtube.com/watch?v=${link}`, "_blank")}>
                  Go to Youtube
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
          </div>
        </div>
      );
      
         
    });
  };

  const search = async (q) => {
    if (q.length >= 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    } else if (q.length === 0) {
      setPopularMovies([]);
      getMovieList().then((result) => {
        setPopularMovies(result);
      });
    }
  };

  return (
    <div className="mt-4 pt-2 pl-2 flex flex-col items-center justify-center min-h-screen">
      <header className="text-center">
        <h1 className="text-3xl font-poppins text-white mb-6">SEARCH MOVIE</h1>
        <div className="flex flex-row relative items-center justify-center">
          <input
            type="text"
            placeholder="Search for movies..."
            className="z-1 bg-blue-950 text-white font-poppins w-2/6 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:bg-blue-800"
            onChange={({ target }) => search(target.value)}
            
          />
           <span className="absolute z-2 right-1/3 mr-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
         
        </div>
        <div className="grid grid-cols-5 gap-0  overflow-y-auto">
          <PopularMovie />
        </div>
      </header>
    </div>
  );
};

export default Search;
