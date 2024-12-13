import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword });
      setMessage(response.data.message);
      navigate('/signin');
    } catch (error) {
      setMessage(error.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div>
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Reset Password</h3>
                <form onSubmit={handleResetPassword}>
                  <div className="input__item">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="site-btn">Reset Password</button>
                </form>
                <p>{message}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__register">
                <h3>Remembered Your Password?</h3>
                <a href="/signin" className="primary-btn">Login Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
