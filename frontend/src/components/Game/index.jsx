import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const GamePage = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedGames = games.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

  return (
    <div>
      <section className="product-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product__page__content">
                <div className="product__page__title">
                  <h4>Games</h4>
                </div>

                <div className="row">
                  {paginatedGames.map((game) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={game._id}>
                      <div className="product__item">
                        <div
                          className="product__item__pic"
                          style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}${game.imagePath})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "300px",
                          }}
                        >
                          <div className="ep">{game.rating}</div>
                          <div className="view">
                            <i className="fa fa-eye"></i> {game.views || 0}
                          </div>
                        </div>
                        <div className="product__item__text">
                          <ul>
                            <li>{game.genre}</li>
                            <li>{game.developer}</li>
                          </ul>
                          <h5>
                            <Link to={`/games/${game.title}`}>{game.title}</Link>
                          </h5>
                          <p className="text-white mt-2">{game.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={index + 1 === currentPage ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>    
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamePage;
