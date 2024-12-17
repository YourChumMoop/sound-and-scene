import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    setLoginCheck(!!auth.loggedIn());
  };

  // useEffect hook to run checkLogin() on component mount
  useEffect(() => {
    checkLogin();
  }, []);

  // Handle logout and navigate to the home page
  const handleLogout = () => {
    auth.logout();
    setLoginCheck(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg mint-green py-3 px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-dark mb-0">
          Sound and Scene
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/event-details" className="nav-link">
                Event Details
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {!loginCheck ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            <button className="btn btn-danger" type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;