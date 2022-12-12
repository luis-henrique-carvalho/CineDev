import React from "react";
import "./PagesButton.css";

const PagesButton = ({ page = null, setPage = null, totalPages = null }) => {
  const handleButton = (action) => {
    console.log(action);
    if (action === "next") {
      setPage(page + 1);
    } else if (action === "prev") {
      setPage(page - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="movies-btn">
      {page && page > 1 ? (
        <div className="pages_btn">
          <button className="btn" onClick={() => handleButton("prev")}>
            Pagina Anterior
          </button>
          <h2>{page} de {totalPages}</h2>
          <button className="btn" onClick={() => handleButton("next")}>
            Proxima Página
          </button>
        </div>
      ) : (
        <div className="pages_btn">
          <button className="btn" onClick={() => handleButton("next")}>
            Proxima Página
          </button>
        </div>
      )}
    </div>
  );
};

export default PagesButton;
