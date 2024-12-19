import { UserLogin } from '../interfaces/UserLogin';  // Import the UserLogin interface for typing loginData
const createNewLogin = async (loginData: UserLogin) => {

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    const data = await response.json();
      // Log the data to the console
    return data;
  } catch (err) {
    console.error('Failed to create login:', err);
  }
}

export { createNewLogin };  // Export the createNewLogin function to be used elsewhere in the application