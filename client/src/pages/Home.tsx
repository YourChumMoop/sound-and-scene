import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve users:', err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="container mt-5">
      {!loginCheck ? (
        <div className="login-notice text-center p-5 bg-light rounded shadow">
          <h1 className="text-primary mb-4">Login to View All Your Friends!</h1>
          <p className="text-muted">Please log in to access the user list.</p>
        </div>
      ) : (
        <div className="user-list-container">
          <h2 className="text-center mb-4">Your Friends</h2>
          <UserList users={users} />
        </div>
      )}
    </div>
  );
};

export default Home;