import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../scss/Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <a href="https://github.com/Fasibru">
        <FontAwesomeIcon icon={faGithub} size="2x" /> Get the repository.
      </a>
    </footer>
  );
}

export default Footer;
