import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StudentList from '../components/StudentList';
import { FaUsers, FaUniversity, FaUserGraduate, FaCodeBranch, FaJs, FaPython, FaJava, FaRust, FaCode } from 'react-icons/fa';
import { SiCplusplus } from "react-icons/si";
import './TalentPage.css';

// ===================================================================
// SECTION 1: STATIC DATA FOR THE PAGE
// ===================================================================
const universityLogos = [
  { name: 'University of Moratuwa', logoUrl: '/images/uom.jpg' },
  { name: 'University of Colombo', logoUrl: '/images/uoc.jpg' },
  { name: 'University of Peradeniya', logoUrl: '/images/uop.jpg' },
  { name: 'SLIIT', logoUrl: '/images/sliit.jpg' },
  { name: 'NSBM Green University', logoUrl: '/images/nsbm.png' },
  { name: 'IIT', logoUrl: '/images/iit.png' },
];

const passoutStats = [
  { icon: <FaUserGraduate />, number: '5,000+', label: 'Annual Graduates in IT & Engineering' },
  { icon: <FaCodeBranch />, number: 'Top 5%', label: 'Ranked in Global Competitive Programming' },
  { icon: <FaUsers />, number: '10,000+', label: 'Active Members in Tech Communities' },
  { icon: <FaUniversity />, number: '20+', label: 'Universities with STEM Programs' },
];

const programmingLanguages = [
    { icon: <FaJs />, name: 'JavaScript', description: 'The language of the web. Essential for front-end and full-stack development with frameworks like React and Node.js.', useCase: 'Web Development, Mobile Apps' },
    { icon: <FaPython />, name: 'Python', description: 'Known for its simplicity and readability. Dominates in AI, machine learning, data science, and web back-ends.', useCase: 'AI/ML, Data Science, Automation' },
    { icon: <FaJava />, name: 'Java', description: 'A versatile, object-oriented language used for large-scale enterprise applications, Android development, and more.', useCase: 'Enterprise Apps, Android Dev' },
    { icon: <SiCplusplus />, name: 'C++', description: 'A powerful language known for high performance. The top choice for game development, system software, and embedded systems.', useCase: 'Game Dev, High-Performance Systems' },
    { icon: <FaRust />, name: 'Rust', description: 'Focused on safety, speed, and concurrency. Loved by developers for building reliable and efficient software.', useCase: 'Systems Programming, WebAssembly' },
    { icon: <FaCode />, name: 'More Languages', description: 'The world of programming is vast. Explore languages like Go, Swift, C#, and SQL to broaden your skill set.', useCase: 'Cloud, iOS, Game Dev, Databases' },
];

// ===================================================================
// SECTION 2: REUSABLE SUB-COMPONENTS
// ===================================================================

function StatCard({ icon, number, label }) {
    return (
        <div className="stat-card">
            <div className="stat-card-icon">{icon}</div>
            <div className="stat-card-number">{number}</div>
            <div className="stat-card-label">{label}</div>
        </div>
    );
}
StatCard.propTypes = { icon: PropTypes.element.isRequired, number: PropTypes.string.isRequired, label: PropTypes.string.isRequired };

function UniversityLogo({ name, logoUrl }) {
    return (
        <div className="university-logo">
            <img src={logoUrl} alt={`${name} logo`} />
        </div>
    );
}
UniversityLogo.propTypes = { name: PropTypes.string.isRequired, logoUrl: PropTypes.string.isRequired };

function LanguageCard({ icon, name, description, useCase }) {
    return (
        <div className="language-card">
            <div className="language-card-icon">{icon}</div>
            <h3 className="language-card-name">{name}</h3>
            <p className="language-card-description">{description}</p>
            <div className="language-card-usecase">{useCase}</div>
        </div>
    );
}
LanguageCard.propTypes = { icon: PropTypes.element.isRequired, name: PropTypes.string.isRequired, description: PropTypes.string.isRequired, useCase: PropTypes.string.isRequired };

// ===================================================================
// SECTION 3: MAIN TALENT PAGE COMPONENT
// ===================================================================
const TalentPage = () => {
    return (
        <div className="talent-page-wrapper">
            {/* --- Hero Section --- */}
            <section className="talent-hero-section">
                <div className="hero-content">
                    <h1>The Future of Tech, Sourced Here.</h1>
                    <p>Tap into Sri Lanka's brightest minds in software engineering, data science, and cybersecurity from leading universities.</p>
                    <Link to="/add" className="hero-cta-button">Post a Job & Find Your Match</Link>
                </div>
            </section>

            {/* --- Annual Passouts Stats Section --- */}
            <section className="stats-section">
                <div className="section-container">
                    <div className="stats-grid">
                        {passoutStats.map(stat => ( <StatCard key={stat.label} {...stat} /> ))}
                    </div>
                </div>
            </section>
            
            {/* --- Programming Languages Section --- */}
            <section className="languages-section">
                <div className="section-container">
                    <h2 className="section-heading">Skills You Can Expect</h2>
                    <p className="section-subheading">Our candidates are proficient in the foundational languages that power modern software, from web applications to complex AI systems.</p>
                    <div className="languages-grid">
                        {programmingLanguages.map((lang, index) => ( <LanguageCard key={index} {...lang} /> ))}
                    </div>
                </div>
            </section>

            {/* --- University Showcase Section --- */}
            <section className="university-showcase-section">
                <div className="section-container">
                    <h2 className="section-heading">Partnering with Leading Universities</h2>
                    <div className="university-logos-container">
                        <div className="uni-logos-slide">
                            {universityLogos.map(uni => <UniversityLogo key={uni.name} {...uni} />)}
                            {universityLogos.map(uni => <UniversityLogo key={`${uni.name}-clone`} {...uni} />)}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* --- Embedded StudentList Component --- */}
            <section className="student-list-embed-section">
                <StudentList />
            </section>
        </div>
    );
};

export default TalentPage;