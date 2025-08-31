import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';
import './HomePage.css';

// Import only the necessary icons
import { FaUserGraduate, FaBuilding, FaRocket } from 'react-icons/fa6';

// Import Typed.js for the animation
import Typed from 'typed.js';

// Helper component for the animated number
const CountUpNumber = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const increment = end / totalFrames;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return <div className="stat-number">{count.toLocaleString()}{suffix}</div>;
};

// static data
const backgroundImages = [ '/images/hero1.jpg', '/images/hero2.jpg', '/images/hero3.jpg' ];

const testimonialsData = [
  { id: 't1', image: '/images/testimonial1.jpeg', name: 'Priya Sharma', job: 'Software Engineer', opinion: 'This platform was a game-changer. I found an internship that matched my exact skill set and it turned into a full-time job offer.' },
  { id: 't2', image: '/images/testimonial2.jpeg', name: 'Michael Chen', job: 'Founder of Innovate Inc.', opinion: 'As a startup founder, posting my idea here brought me not just visibility, but also a co-founder with the technical skills I was missing.' },
  { id: 't3', image: '/images/testimonial3.jpeg', name: 'Sofia Rossi', job: 'UI/UX Designer', opinion: 'The quality of job advertisements is top-notch. I found a role at a design-focused company that truly values creativity.' },
];

// the main component
const HomePage = () => {
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const aboutSectionRef = useRef(null);
  const typedEl = useRef(null);
  const typedInstanceRef = useRef(null);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Effect for background image slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  // Effect for the "human writing" typing animation
  useEffect(() => {
    const stringsToType = [
      "NexusLink is more than just a platform; it's an ecosystem. Our core mission is to empower the next generation by creating direct pathways to the most exciting opportunities in the tech industry. We provide a hub where students can showcase skills, startups can share their vision, and companies can discover the talent that will shape their future."
    ];

    const options = {
      strings: stringsToType,
      typeSpeed: 25,
      loop: false,
      showCursor: true,
      cursorChar: "|",
      onComplete: (self) => {
        self.cursor.style.display = 'none';
      },
    };

    if (typedEl.current) {
        typedInstanceRef.current = new Typed(typedEl.current, options);
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, []);

  // Effect for observing when the stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    const currentRef = aboutSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Effect to scroll to footer if URL hash is present
  useEffect(() => {
    if (location.hash === '#footer-contact') {
      const footer = document.getElementById('footer-contact');
      if (footer) {
        setTimeout(() => footer.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <div 
      className={`home-page-wrapper ${isDarkMode ? 'dark-mode' : ''}`} 
      onClick={toggleDarkMode}
    >

      {/* --- HERO SECTION --- */}
      <section className="home-section hero-section">
        <div className="hero-background">
          {backgroundImages.map((image, index) => (
            <img key={index} src={image} alt="Platform background" className={index === currentImageIndex ? 'active' : ''} />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="home-content-container">
          <div className="hero-content">
            <h1>Connecting <span className="highlight-text">Ambition</span> with <span className="highlight-text">Opportunity</span></h1>
            <p>Welcome to NexusLink, the premier ecosystem designed to bridge the gap between emerging talent and innovative companies.</p>
          </div>
        </div>
      </section>
      <section className="home-section persona-section">
        <div className="home-content-container">
          <div className="section-header">
            <h2>Are You ?...</h2>
          </div>
          <div className="persona-cards-grid">
            
            {/*student card */}
            <Link to="/talentD" className="persona-card student-card">
              <div className="persona-card-content">
                <h3>Student or Intern</h3>
                <div className="persona-card-icon"><FaUserGraduate /></div>
                <p>Showcase your skills, discover internships, and connect with companies that match your ambition.</p>
              </div>
              <div className="persona-card-cta">Explore Talent Profiles <span>&rarr;</span></div>
            </Link>

            {/* company card*/}
            <Link to="/company" className="persona-card company-card">
              <div className="persona-card-content">
                <h3>Company</h3>
                <div className="persona-card-icon"><FaBuilding /></div>
                <p>Access a curated pool of top-tier talent, post job openings, and build your dream team effortlessly.</p>
              </div>
              <div className="persona-card-cta">Discover Top Talent <span>&rarr;</span></div>
            </Link>

            {/* startup card */}
            <Link to="/startup" className="persona-card startup-card">
              <div className="persona-card-content">
                <h3>Startup or Innovator</h3>
                <div className="persona-card-icon"><FaRocket /></div>
                <p>Share your groundbreaking vision, find co-founders, and connect with a vibrant community of builders.</p>
              </div>
              <div className="persona-card-cta">Showcase Your Vision <span>&rarr;</span></div>
            </Link>

          </div>
        </div>
      </section>

      {/* about us */}
      <section ref={aboutSectionRef} className="home-section about-section">
        <div className="home-content-container">
          <div className="about-split-layout">
            <div className="about-section-left">
              <h2 className="about-section-title">About Us</h2>
              <div className="about-section-text">
                <span ref={typedEl}></span>
              </div>
            </div>
            <div className={`large-stats-grid ${isStatsVisible ? 'stats-visible' : ''}`}>
              <div className="stat-item">
                <CountUpNumber target={8000} suffix="+" isVisible={isStatsVisible} />
                <div className="stat-title">Matches Made</div>
              </div>
              <div className="stat-item">
                <CountUpNumber target={150} suffix="K+" isVisible={isStatsVisible} />
                <div className="stat-title">Tech Jobs</div>
              </div>
              <div className="stat-item">
                <CountUpNumber target={1000} suffix="+" isVisible={isStatsVisible} />
                <div className="stat-title">Candidates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonial section */}
      <section className="home-section testimonials-section">
        <div className="home-content-container">
          <h2>Voices of Our Community</h2>
          <div className="testimonials-grid">
            {testimonialsData.map(testimonial => (<TestimonialCard key={testimonial.id} {...testimonial} />))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;