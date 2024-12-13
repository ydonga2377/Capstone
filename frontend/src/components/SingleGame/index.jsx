import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleGamePage = () => {
  const { title } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ content: '', rating: 1 });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${title}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const gameResponse = await axios.get(`http://localhost:5000/api/games/${title}`);
        const response = await axios.get(`http://localhost:5000/api/reviews/${gameResponse.data._id}`);
        setReviews(response.data);
        console.log('response.data', response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchGame();
    fetchReviews();
  }, [title]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const response = await axios.post('http://localhost:5000/api/reviews', {
        userId,
        gameId: game._id,
        ...newReview,
      });
      
      setReviews([...reviews, response.data]);
      setNewReview({ content: '', rating: 1 });
      setAlertMessage('Review submitted successfully!');

      window.location.reload();
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="/"><i className="fa fa-home"></i> Home</a>
                <span>{game.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic"
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}${game.imagePath})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                  }}
                >
                  <div className="comment"><i className="fa fa-comments"></i> 11</div>
                  <div className="view"><i className="fa fa-eye"></i> {game.views || 0}</div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{game.title}</h3>
                    <span>{game.developer}</span>
                  </div>
                  <div className="anime__details__rating">
                    <div className="rating">
                      {[...Array(Math.round(game.rating))].map((_, i) => (
                        <i key={i} className="fa fa-star"></i>
                      ))}
                    </div>
                    <span>{game.rating} / 10</span>
                  </div>
                  <p>{game.description}</p>
                  <div className="anime__details__widget">
                    <ul>
                      <li><span>Genre:</span> {game.genre}</li>
                      <li><span>Release Date:</span> {game.releaseDate}</li>
                      <li><span>Price:</span> ${game.price}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {alertMessage && (
            <div className="alert-popup">
              {alertMessage}
            </div>
          )}

          <div className="review-section">
            <h2 className='text-white mb-4 text-bold'>Reviews</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review._id} className="review-item">
                  <div className="review-content">
                    <p>{review.content}</p>
                    <p>Rating: {review.rating} / 5</p>
                    <p>By: {review.userId.email}</p>
                    <p className="review-timestamp">{formatDate(review.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="add-review-section">
            <h4>Leave a Review</h4>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <textarea
                className="review-textarea"
                placeholder="Write your review here"
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
              />
              <div className="review-rating">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  required
                  className="rating-select"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleGamePage;
