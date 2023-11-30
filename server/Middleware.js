import jwt  from "jsonwebtoken";

export const Middleware = (req, res, next) => {
const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}



