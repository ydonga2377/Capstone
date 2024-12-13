import React, { useState, useEffect } from 'react';
import reviewImage from '../../assets/img/anime/review-1.jpg';


import trendingImage1 from '../../assets/img/trending/trend-1.jpg';
import trendingImage2 from '../../assets/img/trending/trend-2.jpg';
import trendingImage3 from '../../assets/img/trending/trend-3.jpg';
import trendingImage4 from '../../assets/img/trending/trend-4.jpg';
import trendingImage5 from '../../assets/img/trending/trend-5.jpg';
import trendingImage6 from '../../assets/img/trending/trend-6.jpg';
import banner1 from '../../assets/img/banner/hero-1.jpg';
import banner2 from '../../assets/img/banner/action.jpg';
import banner3 from '../../assets/img/banner/action2.jpg';
import banner4 from '../../assets/img/banner/horror.jpg';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../Home/style.css'

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const bannerImages = [
    { image: banner1,label: "Epic Quest", 
      heading: "Elder Chronicles: Rise of the Guardians", 
      description: "Embark on a mythical journey to reclaim the lost kingdom from ancient evils."
    },
    { image: banner2, label: "Space Odyssey", 
      heading: "Galactic Wars: Beyond the Stars", 
      description: "A thrilling space opera where the fate of the galaxy hangs in the balance."
    }, 
    {
      image: banner3, 
      label: "Competitive Spirit", 
      heading: "Striker League: World Champions", 
      description: "Experience the rush of the ultimate showdown in this global tournament."
    },
    {
      image: banner4, 
      label: "Nightmare Realm", 
      heading: "Shadows of Dread: The Haunted Manor", 
      description: "Survive a chilling journey through a cursed mansion filled with unspeakable horrors."
    }
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const trendingData = [
    { id: 1, title: 'The Seven Deadly Sins: Wrath of the Gods', image: trendingImage1, price: 59.99, genre: 'Adventure', releaseDate: '2022-11-15', rating: 4.5 },
    { id: 2, title: 'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien', image: trendingImage2, price: 39.99, genre: 'Action', releaseDate: '2023-01-20', rating: 4.2 },
    { id: 3, title: 'Shingeki no Kyojin Season 3 Part 2', image: trendingImage3, price: 49.99, genre: 'RPG', releaseDate: '2021-07-11', rating: 4.8 },
    { id: 4, title: 'Fullmetal Alchemist: Brotherhood', image: trendingImage4, price: 44.99, genre: 'Fantasy', releaseDate: '2019-05-01', rating: 4.7 },
    { id: 5, title: 'Shiratorizawa Gakuen Koukou', image: trendingImage5, price: 34.99, genre: 'Sports', releaseDate: '2020-09-23', rating: 4.4 },
    { id: 6, title: 'Code Geass: Hangyaku no Lelouch R2', image: trendingImage6, price: 54.99, genre: 'Sci-Fi', releaseDate: '2018-12-07', rating: 4.9 }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter and sort trending data based on search and sort options
  const filteredTrendingData = [...trendingData]
    .filter((item) => item.title.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      switch (sortOption) {
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'priceHighToLow':
          return b.price - a.price;
        case 'releaseDate':
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        case 'rating':
          return b.rating - a.rating;
        case 'genre':
          return a.genre.localeCompare(b.genre);
        default:
          return 0;
      }
    });

  return (
    <div style={{ color: '#fff' }}>
      <section className="hero">
        <div className="container">
        <Slider {...sliderSettings}>
  {bannerImages.map((slide, index) => (
    
    <div key={index} className="hero__items set-bg" style={{ 
      backgroundImage: "url({slide.image}) !important", 
      height: '400px !important', 
      backgroundSize: 'cover !important', 
      backgroundPosition: 'center !important' 
    }}>
      
      <div className="banner-img">
      </div>
      <img className="banner-img-img" src={slide.image}/>
      <div className="hero__text">
            <div className="label">{slide.label}</div>
            
            <h2>{slide.heading}</h2>
            <p>{slide.description}</p>
            <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
          </div>
      <div className="row">
        <div className="col-lg-6">
          
        </div>
      </div>
    </div>
  ))}
</Slider>

        </div>
      </section>

      {/* Search and Sort Options */}
      <section className="search-bar">
        <div className="container d-flex justify-content-between">
          <input
            type="text"
            placeholder="Search trending..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control w-50 transparent-input"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="form-select w-25 ms-3 transparent-select"
          >
            <option value="">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="genre">Genre</option>
            <option value="releaseDate">Release Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </section>

      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="trending__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Trending Now</h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {filteredTrendingData.map((item) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={item.id}>
                      <div className="product__item">
                        <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${item.image})` }}>
                          <div className="ep">18 / 18</div>
                          <div className="comment"><i className="fa fa-comments"></i> 11</div>
                          <div className="view"><i className="fa fa-eye"></i> 9141</div>
                        </div>
                        <div className="product__item__text">
                          <ul className="list-inline mb-1">
                            <li className="list-inline-item badge bg-primary text-light">Active</li>
                            <li className="list-inline-item badge bg-success text-light">{item.genre}</li>
                          </ul>
                          <h5 className="card-title mt-2">
                            <a href="#" className="text-light text-decoration-none">
                              {item.title}
                            </a>
                          </h5>
                          <p>Price: ${item.price.toFixed(2)}</p>
                          <p>Rating: {item.rating} / 5</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
