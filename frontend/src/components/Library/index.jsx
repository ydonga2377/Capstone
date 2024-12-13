import React from 'react';
import Image1 from '../../assets/img/popular/popular-1.jpg';
import Image2 from '../../assets/img/popular/popular-2.jpg';
import Image3 from '../../assets/img/popular/popular-3.jpg';
import Image4 from '../../assets/img/popular/popular-4.jpg';

const LibraryPage = () => {
  const games = [
    {
      title: 'Game Title 1',
      image: Image1,
      purchaseDate: '2024-01-15',
      downloadStatus: 'Available',
    },
    {
      title: 'Game Title 2',
      image: Image2,
      purchaseDate: '2024-02-20',
      downloadStatus: 'Downloaded',
    },
    {
      title: 'Game Title 3',
      image: Image3,
      purchaseDate: '2024-03-25',
      downloadStatus: 'Needs Update',
    },
    {
      title: 'Game Title 4',
      image: Image4,
      purchaseDate: '2024-04-30',
      downloadStatus: 'Available',
    },
  ];

  return (
    <div className="library-container container">
      <div className="library-header text-center mb-4">
        <h1>My Game Library</h1>
        <div className="search-bar mb-3">
          <input type="text" className="form-control" placeholder="Search games..." />
        </div>
      </div>
      <div className="filter-options mb-3">
        <select className="form-control">
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="date">Purchase Date</option>
          <option value="status">Download Status</option>
        </select>
      </div>
      <div className="row">
        {games.map((game, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="game-item card">
              <img src={game.image} alt={game.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">Purchased on: {game.purchaseDate}</p>
                <div className="game-status">{game.downloadStatus}</div>
                <div className="game-actions">
                  {game.downloadStatus === 'Available' && (
                    <button className="btn btn-primary">Download</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination text-center mt-4">
        <button className="btn btn-secondary me-2">Previous</button>
        <button className="btn btn-secondary">Next</button>
      </div>
    </div>
  );
};

export default LibraryPage;
