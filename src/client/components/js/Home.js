import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// BETTER USE REDUX WITH APPROPRIATE ACTIONS AND USERLOGGEDIN STATE etc.
// ACTIONS should have 3 stages
// Problem: Component probably does not rerender on browser refresh or navigation via react-router-dom
function Home() {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    axios.get('/account/login')
      .then((res) => {
        setUserId(res.data);
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
