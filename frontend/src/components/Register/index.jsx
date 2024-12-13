import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const criteria = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordCriteria(criteria);
    return Object.values(criteria).every(Boolean);
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must meet all criteria below.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { email, password }
      );
      alert(response.data.message);
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data.message || "Error registering");
    }
  };

  return (
    <div>
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login__form">
                <h3>Register</h3>
                <form onSubmit={handleRegister}>
                  <div className="input__item">
                    <input
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </div>
                  <div className="input__item">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                    />
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
                    <div className="password-requirements">
                      <p
                        className={
                          passwordCriteria.minLength ? "valid" : "invalid"
                        }
                      >
                        {passwordCriteria.minLength ? "✔" : "✘"} At least 8
                        characters
                      </p>
                      <p
                        className={
                          passwordCriteria.uppercase ? "valid" : "invalid"
                        }
                      >
                        {passwordCriteria.uppercase ? "✔" : "✘"} At least one
                        uppercase letter
                      </p>
                      <p
                        className={
                          passwordCriteria.lowercase ? "valid" : "invalid"
                        }
                      >
                        {passwordCriteria.lowercase ? "✔" : "✘"} At least one
                        lowercase letter
                      </p>
                      <p
                        className={
                          passwordCriteria.number ? "valid" : "invalid"
                        }
                      >
                        {passwordCriteria.number ? "✔" : "✘"} At least one
                        number
                      </p>
                      <p
                        className={
                          passwordCriteria.specialChar ? "valid" : "invalid"
                        }
                      >
                        {passwordCriteria.specialChar ? "✔" : "✘"} At least one
                        special character (!@#$%^&*)
                      </p>
                    </div>
                  </div>
                  <button type="submit" className="site-btn">
                    Register Now
                  </button>
                  <a
                    className="ml-2 site-btn text-white"
                    href="/signin"
                    type="submit"
                  >
                    Already user? Log In
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
