import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFileEarmarkTextFill,
  BsWallet,
} from "react-icons/bs";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import MovieCard from "../components/MovieCard";

import "./Movie.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setMovie(res.data);
      })
      .catch();
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  console.log(movie);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} Minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFileEarmarkTextFill /> Descrição
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
