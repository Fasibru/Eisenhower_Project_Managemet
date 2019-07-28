import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const onSubmit = (event) => {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const emailAddress = document.getElementById('emailAddress').value;
  const password = document.getElementById('password').value;
  axios.post('/account/register', {
    firstName,
    lastName,
    emailAddress,
    password,
  })
    .then(() => {
      history.pushState(null, null, '/app');
      history.go();
    })
    .catch(err => console.log(err));
};

const Register = () => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="firstName" name="firstName" id="firstName" placeholder="First Name" required />
      <input type="lastName" name="lastName" id="lastName" placeholder="Last Name" required />
      <input type="email" name="emailAddress" id="emailAddress" placeholder="email" required />
      <input type="password" name="password" id="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <Link to="/login">Login</Link>
  </div>
);

export default Register;
