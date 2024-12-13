import React from 'react';


const AboutUsPage = () => {
  return (
    <div className="about-us">
      <section className="company-overview">
        <h1>About NvydBox</h1>
        <div className="intro">
          <h2>Introduction</h2>
          <p>
            NvydBox is dedicated to providing gamers with a seamless digital distribution experience. 
            Our mission is to offer a vast selection of games at competitive prices while ensuring a user-friendly interface and top-notch customer service.
          </p>
        </div>
        <div className="history">
          <h2>History</h2>
          <p>
            Founded in 2024, NvydBox was created by a passionate team of gamers. 
            Our journey began with a shared vision of improving the gaming experience through technology. 
            Over the past year, we've achieved significant milestones, including launching our platform and partnering with various game developers.
          </p>
        </div>
      </section>

      <section className="team-members">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Yutika Donga</h3>
            <p>Front-end Developer</p>
            <p>Yutika is passionate about creating user-friendly interfaces and enhancing the user experience.</p>
          </div>
          <div className="team-member">
            <h3>Vasu</h3>
            <p>Back-end Developer</p>
            <p>Vasu specializes in building robust server-side applications and managing databases.</p>
          </div>
          <div className="team-member">
            <h3>Dwij</h3>
            <p>UI/UX Designer</p>
            <p>Dwij focuses on designing intuitive interfaces and creating engaging user experiences.</p>
          </div>
          <div className="team-member">
            <h3>Bobby</h3>
            <p>Game Tester</p>
            <p>Bobby ensures our games are thoroughly tested for bugs and quality assurance.</p>
          </div>
          <div className="team-member">
            <h3>Nisarg</h3>
            <p>Marketing Specialist</p>
            <p>Nisarg is responsible for promoting our platform and connecting with the gaming community.</p>
          </div>
        </div>
      </section>

      <section className="company-culture">
        <h2>Company Culture</h2>
        <p>
          At NvydBox, we value innovation, teamwork, and dedication. 
          Our culture encourages collaboration and creativity, allowing us to continually improve our services and offerings.
        </p>
        <div className="employee-testimonials">
          <h3>Employee Testimonials</h3>
          <blockquote>
            <p>"Working at NvydBox has been a game-changer for me. The team is supportive, and we share a common goal to revolutionize gaming!" - Yutika</p>
          </blockquote>
        </div>
      </section>

      <section className="contact-information">
        <h2>Contact Us</h2>
        <p>
          For general inquiries, please reach out to us at: 
          <br />
          <a href="mailto:info@nvydbox.com">info@nvydbox.com</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
