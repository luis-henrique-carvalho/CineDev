import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFileEarmarkTextFill,
  BsWallet,
  BsFilm,
  BsFillTrophyFill,
} from "react-icons/bs";

import {
  FaRocket
} from "react-icons/fa";

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
    const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-br`;
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
          <div className="movie-card-div">
            <MovieCard movie={movie} showLink={false} clas={"movie2"} />
          </div>
          <p className="tagline">{movie.tagline}</p>
          <div className="details">
            <div>
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
            </div>
            <div>
              <div className="info">
                <h3>
                  <BsFillTrophyFill /> Popularidade:
                </h3>
                <p>N: {movie.popularity}</p>
              </div>
              <div className="info">
                <h3>
                  <FaRocket /> Lançamento:
                </h3>
                <p> {movie.release_date}</p>
              </div>
              <div className="info">
                <h3>
                  <BsFilm /> Genero:
                </h3>
                <div className="genres">
                  {movie.genres.map((gen) => (
                    <p key={gen.id}>{gen.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="info description">
            <h3>
              <BsFileEarmarkTextFill /> Descrição
            </h3>
            <p>{movie.overview}</p>
          </div>

          <Link to={"/"} className="btn">
            Voltar
          </Link>
        </>
      )}
    </div>
  );
};

export default Movie;
