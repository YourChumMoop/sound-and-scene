import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='login-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1 className='text-center mb-4'>Login</h1>
        
        {/* Username input field */}
        <div className="form-group mb-3">
          <label className="form-label">Username</label>
          <input 
            className="form-input w-100"
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
            placeholder='Enter your username'
            required
          />
        </div>

        {/* Password input field */}
        <div className="form-group mb-4">
          <label className="form-label">Password</label>
          <input 
            className="form-input w-100"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
            placeholder='Enter your password'
            required
          />
        </div>

        {/* Submit button for the login form */}
        <div className="form-group text-center">
          <button className="btn btn-primary btn-block" type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;