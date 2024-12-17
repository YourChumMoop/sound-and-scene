import { Request, Response } from 'express';
import { User } from '../models/user';

// GET /users - Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password from response
    });
    res.json(users);
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: (error as Error).message });
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
    res.status(500).json({ message: (error as Error).message });
  }
};

// POST /users - Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: (error as Error).message });
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
      user.password = password || user.password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: unknown) {
    console.error(`Error updating user with ID ${id}:`, error);
    res.status(400).json({ message: (error as Error).message });
  }
};

// DELETE /users/:id - Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: unknown) {
    console.error(`Error deleting user with ID ${id}:`, error);
    res.status(500).json({ message: (error as Error).message });
  }
};