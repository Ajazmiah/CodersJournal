import jwt from "jsonwebtoken";

export const verifytoken = (req) => {
  const token = req.cookies.jwt;
  return jwt.verify(token, process.env.JWT_SECRET);
};
