import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    axios.get('/account/login')
      .then((res) => {
        setUserId(res.data);
        console.log(res);
      })
      .catch(err => console.log(err));
  });

  const logout = () => {
    axios.post('/account/logout')
      .then(() => {
        setUserId(undefined);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <p>{userId}</p>
      {!userId
        && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )
      }
      {userId
        && (
          <div>
            <Link to="/app">App</Link>
            <button type="button" onClick={logout}>Logout</button>
          </div>
        )
      }
    </div>
  );
}

export default Home;
