import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // useEffect hook to run checkLogin() on component mount
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg mint-green py-3 px-4">
      <div className="container-fluid">
        <h1 className="navbar-brand text-dark mb-0">Authentication Review</h1>
        
        <div>
          {!loginCheck ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                auth.logout();
                setLoginCheck(false); // Reset login state after logout
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;