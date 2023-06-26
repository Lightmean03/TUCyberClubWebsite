import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'


export const Footer = () => {
  return (
    <footer className="shadow">
      <Container className="py-5">
        <Row>
          <Col xs={12} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <a href="/" className="d-flex align-items-center text-dark">
              <img alt="logo" src="logo" width="30px" />
              <span className="ms-3 h5 font-weight-bold">Devwares</span>
            </a>
            <div className="mt-5 d-flex">
              <a href="/" className="text-dark me-3">
                <FaFacebookF />
              </a>
              <a href="/" className="text-dark me-3">
                <FaTwitter />
              </a>
              <a href="/" className="text-dark">
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col xs={6} md={2} className="text-center">
            <h5 className="mb-4 font-weight-bold">Devwares</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Resources</a>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="text-center">
            <h5 className="mb-4 font-weight-bold">Products</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Windframe</a>
              </li>
              <li>
                <a href="/">Loop</a>
              </li>
              <li>
                <a href="/">Contrast</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="text-center">
            <h5 className="mb-4 font-weight-bold">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Support</a>
              </li>
              <li>
                <a href="/">Sign Up</a>
              </li>
              <li>
                <a href="/">Sign In</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <small className="text-center mt-5">&copy; Towson CyberSecurity Club, 2023. All rights reserved.</small>
    </footer>
  );
};
