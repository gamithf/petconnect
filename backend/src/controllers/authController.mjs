import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyAuth = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: 'No authentication token found' 
      });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid or expired token' 
      });
    }

    res.status(200).json({
        msg: 'User is authenticated',
        status: 'success',
        data: null
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal server error during verification' 
    });
  }
};

export default {
  verifyAuth
};