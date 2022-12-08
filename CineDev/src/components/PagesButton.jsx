import React from "react";

const PagesButton = ({ page = null, setPage = null }) => {
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
        <>
          <button className="btn" onClick={() => handleButton("prev")}>
            Pagina Anterior
          </button>
          <button className="btn" onClick={() => handleButton("next")}>
            Proxima Página
          </button>
        </>
      ) : (
        <>
          <button className="btn" onClick={() => handleButton("next")}>
            Proxima Página
          </button>
        </>
      )}
    </div>
  );
};

export default PagesButton;
