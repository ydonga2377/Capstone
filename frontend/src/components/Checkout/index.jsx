import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    nameOnCard: "",
    paymentType: "creditCard",
  });
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        calculateTotal(itemsWithImages);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items. Please try again.");
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.gameId.price, 0);
    setTotalAmount(total.toFixed(2));
  };

  const validateFields = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const postalCodeRegex = /^[a-zA-Z0-9]{3}\s[a-zA-Z0-9]{3}$/;
    const currentDate = new Date();
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

    if (!nameRegex.test(paymentInfo.nameOnCard)) {
      newErrors.nameOnCard = "Name on card should only contain alphabets.";
    }

    if (!cardNumberRegex.test(paymentInfo.cardNumber)) {
      newErrors.cardNumber = "Card number must be a 16-digit number.";
    }

    if (!cvvRegex.test(paymentInfo.cvv)) {
      newErrors.cvv = "CVV must be a 3-digit number.";
    }

    if (!expirationDateRegex.test(paymentInfo.expirationDate)) {
      newErrors.expirationDate = "Enter a valid expiration date (MM/YY).";
    } else {
      const [month, year] = paymentInfo.expirationDate.split("/").map(Number);
      const expiryDate = new Date(2000 + year, month - 1); // Convert YY to YYYY
      if (expiryDate <= currentDate) {
        newErrors.expirationDate = "Expiration date cannot be in the past.";
      }
    }

    if (!nameRegex.test(address.fullName)) {
      newErrors.fullName = "Full name should only contain alphabets.";
    }

    if (!emailRegex.test(address.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phoneRegex.test(address.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!address.addressLine1) {
      newErrors.addressLine1 = "Address Line 1 is required.";
    }

    if (!nameRegex.test(address.city)) {
      newErrors.city = "City should only contain alphabets.";
    }

    if (!nameRegex.test(address.state)) {
      newErrors.state = "State should only contain alphabets.";
    }

    if (!postalCodeRegex.test(address.postalCode)) {
      newErrors.postalCode = "Postal code must follow the format XXX XXX.";
    }

    if (!nameRegex.test(address.country)) {
      newErrors.country = "Country should only contain alphabets.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!validateFields()) {
        setLoading(false);
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const transaction = {
            amount: totalAmount,
            paymentMethod: paymentInfo.paymentType,
            transactionDate: new Date(),
            status: "pending",
        };

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/checkout`,
            {
                items: cartItems.map((item) => ({
                    productId: item.gameId._id,
                    title: item.gameId.title,
                    image: item.img,
                    price: item.gameId.price,
                })),
                transaction,
                address,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        // Display the success popup
        alert(`Checkout successful! Your Order ID is: ${response.data.orderId}`);
        
        // Reset the cart and total amount
        setCartItems([]);
        setTotalAmount(0);
    } catch (err) {
        console.error("Checkout error:", err);
        setError("Checkout failed. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <p className="error">{error}</p>}

      <div className="cart-items">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.gameId._id} className="cart-item">
              <img
                src={item.img || "/default-image.jpg"}
                alt={item.gameId.title}
                width="80"
              />
              <h4>{item.gameId.title}</h4>
              <p>Price: ${item.gameId.price.toFixed(2)}</p>
            </div>
          ))
        )}
        <h4>Total Amount: ${totalAmount}</h4>
      </div>

      <form onSubmit={handleCheckout} className="payment-form">
        <h3>Payment Information</h3>

        <div>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="creditCard"
              checked={paymentInfo.paymentType === "creditCard"}
              onChange={handlePaymentChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="debitCard"
              checked={paymentInfo.paymentType === "debitCard"}
              onChange={handlePaymentChange}
            />
            Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="amex"
              checked={paymentInfo.paymentType === "amex"}
              onChange={handlePaymentChange}
            />
            American Express
          </label>
        </div>

        <div>
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={paymentInfo.nameOnCard}
            onChange={handlePaymentChange}
            
          />
          {errors.nameOnCard && <label className="error-label">{errors.nameOnCard}</label>}
        </div>
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
           
          />
          {errors.cardNumber && <label className="error-label">{errors.cardNumber}</label>}
        </div>
        <div>
          <input
            type="text"
            name="expirationDate"
            placeholder="MM/YY"
            value={paymentInfo.expirationDate}
            onChange={handlePaymentChange}
            
          />
          {errors.expirationDate && <label className="error-label">{errors.expirationDate}</label>}
        </div>
        <div>
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            
          />
          {errors.cvv && <label className="error-label">{errors.cvv}</label>}
        </div>

        <h3>Shipping Address</h3>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleAddressChange}
            
          />
          {errors.fullName && <label className="error-label">{errors.fullName}</label>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={address.email}
            onChange={handleAddressChange}
           
          />
          {errors.email && <label className="error-label">{errors.email}</label>}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={address.phone}
            onChange={handleAddressChange}
            
          />
          {errors.phone && <label className="error-label">{errors.phone}</label>}
        </div>
        <div>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={address.addressLine1}
            onChange={handleAddressChange}
            
          />
          {errors.addressLine1 && <label className="error-label">{errors.addressLine1}</label>}
        </div>
        <div>
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={address.addressLine2}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            
          />
          {errors.city && <label className="error-label">{errors.city}</label>}
        </div>
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
           
          />
          {errors.state && <label className="error-label">{errors.state}</label>}
        </div>
        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleAddressChange}
            
          />
          {errors.postalCode && <label className="error-label">{errors.postalCode}</label>}
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddressChange}
            
          />
          {errors.country && <label className="error-label">{errors.country}</label>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
