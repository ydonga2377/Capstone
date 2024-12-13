import React from 'react';
import heroImage1 from '../../assets/img/hero/hero-1.jpg'; // You can use a different image if preferred

const Wishlist = () => {
  return (
    <div style={{ color: '#fff' }}>
      <section className="hero">
        <div className="container">
          
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <h2>Your Wishlist</h2>
                    <p>Keep track of your favorite items here!</p>
                  </div>
                </div>
              </div>
            </div>
         
      </section>

      {/* Wishlist Content */}
      <section className="wishlist spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wishlist__items">
                <h4>Your Wishlist is Empty</h4>
                <p>Add items to your wishlist to keep track of your favorites!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
