import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page-wrapper">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below or use the contact details provided.</p>
      </div>
      <div className="contact-body">
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        <div className="contact-info-container">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> 123 Business Avenue, Suite 456, Metropolis, USA</p>
          <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          <p><strong>Email:</strong> <a href="mailto:contact@yourbusiness.com">contact@yourbusiness.com</a></p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.220197472337!2d-73.9856644845941!3d40.7484409793284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620202020202"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;