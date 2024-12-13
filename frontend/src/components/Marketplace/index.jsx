import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Marketplace.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

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

const Marketplace = () => {
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const userToken = localStorage.getItem("token");
  const baseURL = window.location.origin;

  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/marketplace`
        );
        const itemsWithImages = response.data.map((item, index) => ({
          ...item,
          img: getImageByKey(item.imageKey),
        }));
        setMarketplaceItems(itemsWithImages);
      } catch (error) {
        console.error("Error fetching marketplace items:", error);
      }
    };

    fetchMarketplaceItems();
  }, []);

  const handleAddToCart = async (gameId) => {
    try {
      if (!userToken) {
        throw new Error("User is not logged in.");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart`,
        { gameId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again."
      );
    }
  };

  const handleAddToWishlist = async (gameId) => {
    if (!userToken) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wishlist`,
        { gameId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again."
      );
    }
  };

  return (
    <div className="marketplace-container">
      <h1 className="text-center text-light mb-4">Marketplace</h1>
      <div className="row">
        {marketplaceItems.map((item) => (
          <div className="col-md-3 mb-4" key={item._id}>
            <div className="card marketplace-card">
              <img src={item.img} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h5 className="card-text">{item.description}</h5>
                <p className="card-text">Price: ${item.price}</p>
                {userToken && (
                  <>
                    <button
                      className="btn btn-add-to-cart"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => handleAddToWishlist(item._id)}
                    >
                      Add to Wishlist
                    </button>
                  </>
                )}
                <a href={`/games/${item._id}`} className="btn btn-warning">
                  Buy Now
                </a>
                <div className="share-buttons mt-3">
                  <FacebookShareButton
                    windowWidth={1000}
                    windowHeight={1000}
                    url={`${baseURL}/games/${item._id}`}
                    quote={`Check out this amazing item: ${item.title}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    windowWidth={1000}
                    windowHeight={1000}
                    url={`${baseURL}/games/${item._id}`}
                    title={`Check out this amazing item: ${item.title}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    windowWidth={1000}
                    windowHeight={1000}
                    url={`${baseURL}/games/${item._id}`}
                    title={`Check out this amazing item: ${item.title}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
