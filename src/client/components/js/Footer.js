import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../scss/Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <a href="https://github.com/Fasibru/JATLA_Project_Management" className="footer__link-github">
        <FontAwesomeIcon icon={faGithub} size="2x" />
        <p>Show me the GitHub repository</p>
      </a>
      <a href="/home" className="footer__link-home">Bring me back to the overview</a>
    </footer>
  );
}

export default Footer;
