import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authCookieName = process.env.AUTH_COOKIE_NAME;

  const jwtToken = req.cookies[authCookieName];

  if (!jwtToken) {
    res.status(403).json({ message: 'No JWT provided.' });
  } else if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, { algorithms: 'HS256' }, (err) => {
      if (err) {
        res.status(403).json({ message: err });
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

export default verifyJWT;
