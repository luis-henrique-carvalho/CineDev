import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import axios from 'axios'

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Search = () => {

  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch();
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    getSearchMovies(searchWithQueryURL);
  }, [query]);


  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>....CARREGANDO</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
