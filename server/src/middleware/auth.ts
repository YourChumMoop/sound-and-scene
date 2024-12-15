// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

// // Extend the Request type to include the user property
// interface CustomRequest extends Request {
//   user?: JwtPayload;
// }

// // Define the interface for the JWT payload
// interface JwtPayload extends DefaultJwtPayload {
//   username: string;
// }

// // Middleware function to authenticate JWT token
// export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
//   // Get the authorization header from the request
//   const authHeader = req.headers.authorization;

//   // Check if the authorization header is present
//   if (!authHeader) {
//     res.status(401).json({ message: 'No authorization header provided' });
//     return;
//   }

//   // Extract the token from the authorization header (expecting format: "Bearer <token>")
//   const token = authHeader.split(' ')[1];

//   // Get the secret key from the environment variables
//   const secretKey = process.env.JWT_SECRET_KEY;

//   if (!secretKey) {
//     res.status(500).json({ message: 'JWT secret key is not set in the environment variables' });
//     return;
//   }

//   // Verify the JWT token
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       res.status(403).json({ message: 'Invalid or expired token' });
//       return;
//     }

//     // Attach the user information to the request object
//     req.user = decoded as JwtPayload;
//     next(); // Call the next middleware function
//   });
// };