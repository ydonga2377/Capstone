import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User is not logged in.");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const itemsWithImages = response.data.items.map((item) => ({
          ...item,
          img: getImageByKey(item.gameId.imageKey),
        }));
        setCartItems(itemsWithImages || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setErrorMessage("Failed to load cart items. Please try again.");
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in.");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/cart/${gameId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartItems(cartItems.filter((item) => item.gameId._id !== gameId));
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage("Failed to delete item. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.gameId.price, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {cartItems?.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.gameId._id} className="cart-item">
                <img
                  src={item.img || "/default-image.jpg"}
                  alt={item.gameId.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.gameId.title}</h3>
                  <p>{item.gameId.description}</p>
                  <p>Price: ${item.gameId.price.toFixed(2)}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.gameId._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ${calculateTotal()}</h2>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
