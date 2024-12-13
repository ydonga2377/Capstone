import React from 'react';

const Index = () => {
  return (
    <div>
      <div className="breadcrumb-option" style={{ color: '#ffffff' }}> {/* White text */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="./index.html" style={{ color: '#ffffff' }}><i className="fa fa-home"></i> Home</a>
                <span style={{ color: '#ffffff' }}>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="profile-details spad" style={{ color: '#f0f0f0' }}> {/* Light gray text */}
        <div className="container">
          <div className="profile__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div className="profile__details__pic">
                  <img src="img/profile/profile-pic.jpg" alt="Profile Picture" />
                </div>
              </div>
              <div className="col-lg-9">
                <div className="profile__details__text">
                  <div className="profile__details__title">
                    <h3 style={{ color: '#ffffff' }}>John Doe</h3> {/* White text */}
                    <span style={{ color: '#d3d3d3' }}>Level 45 | Veteran Gamer</span> {/* Light gray text */}
                  </div>
                  <p>A passionate gamer with over 500+ games completed. Always up for a challenge and love to discuss strategies and achievements with fellow gamers.</p>
                  <div className="profile__details__stats">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <ul>
                          <li><span style={{ color: '#ffffff' }}>Games Owned:</span> 150</li>
                          <li><span style={{ color: '#ffffff' }}>Hours Played:</span> 1200 hrs</li>
                          <li><span style={{ color: '#ffffff' }}>Achievements Unlocked:</span> 320</li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <ul>
                          <li><span style={{ color: '#ffffff' }}>Badges:</span> 25</li>
                          <li><span style={{ color: '#ffffff' }}>Friends:</span> 89</li>
                          <li><span style={{ color: '#ffffff' }}>Game Reviews:</span> 35</li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <ul>
                          <li><span style={{ color: '#ffffff' }}>Favorite Game:</span> The Witcher 3</li>
                          <li><span style={{ color: '#ffffff' }}>Join Date:</span> March 2015</li>
                          <li><span style={{ color: '#ffffff' }}>Country:</span> USA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile__details__actions">
                    <a href="#" className="site-btn follow-btn"><i className="fa fa-user-plus"></i> Follow</a>
                    <a href="#" className="site-btn chat-btn"><i className="fa fa-comments"></i> Message</a>
                    <a href="#" className="site-btn game-btn"><i className="fa fa-gamepad"></i> View Games</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-lg-12">
                <div className="section-title">
                  <h5 style={{ color: '#ffffff' }}>Achievements</h5> {/* White text */}
                </div>
                <div className="achievements__list">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <div className="achievement__item">
                        <img src="img/achievements/achievement-1.png" alt="" />
                        <h6 style={{ color: '#ffffff' }}>100% Completion</h6> {/* White text */}
                        <p style={{ color: '#d3d3d3' }}>Complete 100 games</p> {/* Light gray text */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <div className="achievement__item">
                        <img src="img/achievements/achievement-2.png" alt="" />
                        <h6 style={{ color: '#ffffff' }}>Pro Player</h6> {/* White text */}
                        <p style={{ color: '#d3d3d3' }}>Win 50 ranked matches</p> {/* Light gray text */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <div className="achievement__item">
                        <img src="img/achievements/achievement-3.png" alt="" />
                        <h6 style={{ color: '#ffffff' }}>Strategist</h6> {/* White text */}
                        <p style={{ color: '#d3d3d3' }}>Complete 50 strategy games</p> {/* Light gray text */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <div className="achievement__item">
                        <img src="img/achievements/achievement-4.png" alt="" />
                        <h6 style={{ color: '#ffffff' }}>Master Explorer</h6> {/* White text */}
                        <p style={{ color: '#d3d3d3' }}>Explore 100 open-world games</p> {/* Light gray text */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
