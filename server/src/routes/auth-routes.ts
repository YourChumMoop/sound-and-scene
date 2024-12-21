import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import the JSON Web Token library
import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body; // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    console.error(`Login failed: User with username "${username}" not found.`);
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    console.error(`Login failed: Invalid password for user "${username}".`);
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    console.error('JWT_SECRET_KEY is not set in the environment variables.');
    return res
      .status(500)
      .json({ message: 'Server configuration error: JWT secret key not set' });
  }

  try {
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token }); // Send the token as a JSON response
  } catch (err) {
    console.error('Error generating JWT:', err);
    return res.status(500).json({ message: 'Failed to generate token' });
  }
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login); // Define the login route

export default router; // Export the router instance