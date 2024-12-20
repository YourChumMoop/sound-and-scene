
import { useState, FormEvent, ChangeEvent } from 'react';
import { createNewLogin } from '../api/newLogin';



const NewLogin = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (loginData.password.length >= 8) {
            await createNewLogin(loginData);
            alert('Login created successfully');
            setLoginData({
                username: '',
                password: ''
            });
            } else {
                alert('Password must be at least 8 characters long');
            }
        } catch (err) {
            alert('Failed to create login');
            console.error('Failed to create login', err);

            }
        };


    return (
        <div className='login-container'>
            <form className='form login-form' onSubmit={handleSubmit}>
                <h1 className='text-center mb-4'>Create Login</h1>

                <div className="form-group mb-3">
                    <label className="form-label">Username</label>
                    <input
                        className="form-input w-100"
                        type='text'
                        name='username'
                        value={loginData.username || ''}
                        onChange={handleChange}
                        placeholder='Enter the username'
                        required
                    />
                </div>

                <div className="form-group mb-4">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input w-100"
                        type='password'
                        name='password'
                        value={loginData.password || ''}
                        onChange={handleChange}
                        placeholder='Enter the password'
                        required
                    />
                </div>

                <button type='submit' className='btn btn-primary w-100'>Create Login</button>
            </form>
        </div>
    );
};
export default NewLogin;

