import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom"; // Import the Link component from React Router
import Auth from "../utils/auth"; // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI"; // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin"; // Import the interface for UserLogin

const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  // Handle changes in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      localStorage.setItem('username',loginData.username as string);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      alert("Wrong username or password"); // Log any errors that occur during login
    }
  };


  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 rounded-3"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body p-4">
          <h1 className="text-center mb-4 fw-bold">Login</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Username input field */}
            <div className="form-group mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={loginData.username || ""}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password input field */}
            <div className="form-group mb-4">
              <label className="form-label fw-bold">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={loginData.password || ""}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Submit button for the login form */}
            <div className="form-group text-center">
              <button
                className="btn btn-primary w-100 rounded-pill fw-bold"
                type="submit"
              >
                Login
              </button>
              <Link to="/new-login">
                <button
                  className="btn btn-secondary w-100 rounded-pill fw-bold"
                  type="button"
                >
                  Create New Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
