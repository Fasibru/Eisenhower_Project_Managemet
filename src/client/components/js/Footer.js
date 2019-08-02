import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../scss/Footer.scss';

const mapStateToProps = state => ({
  firstName: state.user.firstName,
});

const Footer = ({ firstName }) => (
  <footer className="footer">
    <a
      href="https://github.com/Fasibru/JATLA_Project_Management"
      className="footer__link-github"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" />
      <span>Show me the GitHub repository</span>
    </a>
    <span>Hello {firstName}</span>
    <a
      href="/home"
      className="footer__link-home"
    >
      Bring me back to the overview
    </a>
  </footer>
);

Footer.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Footer);
