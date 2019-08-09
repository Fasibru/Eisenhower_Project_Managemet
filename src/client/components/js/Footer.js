import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../scss/Footer.scss';


const Footer = () => (
  <footer className="footer">
    <a
      href="https://github.com/Fasibru/JATLA_Project_Management"
      className="footer__link-github"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" />
      <span className="footer__link-github-text">Show me the GitHub repository</span>
    </a>
    <a
      href="/home"
      className="footer__link-home"
    >
      Bring me back to the overview
    </a>
  </footer>
);

export default Footer;
