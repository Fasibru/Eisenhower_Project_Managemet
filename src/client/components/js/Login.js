import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const onSubmit = (event) => {
  event.preventDefault();
  const emailAddress = document.getElementById('emailAddress').value;
  const password = document.getElementById('password').value;
  axios.post('/account/login', { emailAddress, password }, { withCredentials: true })
    .then(() => {
      window.location = ('/');
    })
    .catch(err => console.log(err));
};

const Login = () => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="email" name="emailAddress" id="emailAddress" placeholder="email" required />
      <input type="password" name="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <Link to="/register">Register</Link>
  </div>
);

export default Login;
