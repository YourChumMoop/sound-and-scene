import { Request, Response } from 'express';
import { User } from '../models/index.js';

// GET /users - Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password from response
    });
    res.json(users);
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

// GET /users/:id - Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: unknown) {
    console.error(`Error fetching user with ID ${id}:`, error);
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
};

// POST /users - Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const newUser = await User.create({ username, password });
    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res.status(201).json(userWithoutPassword);
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return res.status(400).json({ message: 'Failed to create user.' });
  }
};

// PUT /users/:id - Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username || user.username;
      if (password) {
        await user.setPassword(password); // Hash the new password if provided
      }
      await user.save();
      // Exclude password from response
      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: unknown) {
    console.error(`Error updating user with ID ${id}:`, error);
    res.status(400).json({ message: 'Failed to update user.' });
  }
};

// DELETE /users/:id - Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: unknown) {
    console.error(`Error deleting user with ID ${id}:`, error);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};