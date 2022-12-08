import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

// https://api.themoviedb.org/3/movie/
// api_key=690df2b308643dd89fa1dfa90004c12a

import "./MovieGrid.css";
import PagesButton from "../components/PagesButton";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getTopRatedMovies = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data.page);
        setTopMovies(res.data.results);
      })
      .catch();
  };

  // console.log(topMovies);

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-br-US&page=${page}`;

    getTopRatedMovies(topRatedUrl);
  }, [page]);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>....CARREGANDO</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <PagesButton page={page} setPage={setPage} />
    </div>
  );
};

export default Home;
