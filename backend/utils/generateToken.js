import jwt from "jsonwebtoken";
/*
  When httpOnly is set to true, it means that the cookie is only accessible on the server side 
  and cannot be accessed via JavaScript running in the browser. 
  This is a security feature aimed at mitigating the risk of cross-site scripting (XSS) attacks

  -XSS attacks occur when an attacker injects malicious scripts into a web page, 
  and these scripts can potentially access and steal sensitive information, such as cookies.
*/

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export default generateToken;
