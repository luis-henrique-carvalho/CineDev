import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";
import PagesButton from "../components/PagesButton";

const Search = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loadgin, setLoadin] = useState(false);
  const query = searchParams.get("q");

  console.log(page);

  const getSearchMovies = async (url) => {
    setLoadin(true);
    await axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results);
        console.log(res.data);
        setTotalPages(res.data.total_pages)
      })
      .catch();
    setLoadin(false);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-br&page=${page}`;

    getSearchMovies(searchWithQueryURL);
  }, [query, page]);

  return (
    <div className="container">
      <h2 className="title" id="incio">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-btn"></div>
      <div className="movies-container">
        {movies.length === 0 && loadgin && <p>....CARREGANDO</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <PagesButton page={page} setPage={setPage} totalPages={totalPages}/>
    </div>
  );
};

export default Search;
