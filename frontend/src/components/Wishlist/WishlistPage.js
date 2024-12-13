import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wishlist.css";
import itemImg1 from "../../assets/img/blog/blog-1.jpg";
import itemImg2 from "../../assets/img/blog/blog-2.jpg";
import itemImg3 from "../../assets/img/blog/blog-3.jpg";
import itemImg4 from "../../assets/img/blog/blog-4.jpg";
import itemImg5 from "../../assets/img/blog/blog-5.jpg";
import itemImg6 from "../../assets/img/blog/blog-6.jpg";
import itemImg7 from "../../assets/img/blog/blog-7.jpg";
import itemImg8 from "../../assets/img/blog/blog-8.jpg";

const getImageByKey = (key) => {
  const images = {
    EpicSword: itemImg1,
    LegendaryArmor: itemImg2,
    MysticPotion: itemImg3,
    HealingElixir: itemImg4,
    DragonShield: itemImg5,
    MagicWand: itemImg6,
    AncientScroll: itemImg7,
    PhantomCloak: itemImg8,
  };
  return images[key] || "https://via.placeholder.com/150"; // Fallback image
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to view your wishlist.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const itemsWithImages = response.data.games.map((item, index) => ({
          ...item,
          img: getImageByKey(item.gameId.imageKey),
        }));
        setWishlist(itemsWithImages || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        alert("Failed to fetch wishlist.");
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (gameId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to remove items from your wishlist.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/wishlist/${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(wishlist.filter((game) => game.gameId._id !== gameId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove game from wishlist.");
    }
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((game) => (
            <div key={game.gameId._id} className="wishlist-item">
              <img
                src={game.img || "/default-image.jpg"}
                alt={game.gameId.title}
              />
              <div>
                <h3>{game.gameId.title}</h3>
                <p>{game.gameId.description}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(game.gameId._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
