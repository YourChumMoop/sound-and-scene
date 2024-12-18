/*import React from 'react';

import type { UserData } from "../interfaces/UserData";
import auth from '../utils/auth';

// Define the props for the component
interface UserListProps {
  users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {auth.loggedIn() ? (
        <>
          <h2 className="pb-5">Check out all your friends!</h2>
          {users && users.map((user) => (
            <div className="row align-center mb-5" key={user.id}>
              <div className="col-md-12">
                <h3>{user.id}. {user.username}</h3>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-danger">Please log in to see your friends.</p>
      )}
    </>
  );
};

export default UserList;*/
