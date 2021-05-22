const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports= (req, res, next) => {
  const token = req.headers.xauthtoken;
  console.log(token)
  // Check for token
  if (!token)
    return res.status(201).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    // Add user from payload
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (e) {
    console.log(e)
    res.status(201).json({ msg: e });
  }
};