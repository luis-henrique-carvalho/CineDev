import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

  const getTopRatedMovies = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setTopMovies(res.data.results);
      })
      .catch();
  };

  console.log(topMovies);

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>....CARREGANDO</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
