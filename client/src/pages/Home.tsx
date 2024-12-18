import { useState, useLayoutEffect } from "react";

import auth from '../utils/auth';

const Home = () => {

  const [loginCheck, setLoginCheck] = useState(false);


   // const [error, setError] = useState(false);


    /*useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);*/

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    /*const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }*/

    /*if (error) {
        return <ErrorPage />;
    }*/

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <div className="home-splash">
                            <img src="\pexels-wendywei-1540406.jpg" className="left-splash"/>
                            <h1>
                                Plan your concert night right!
                            </h1>
                            <p>
                                It's 2am after a concert, do you have your late night munchies planned?<br/>
                                Sound and Scene is determined to take your music venue outing and turn
                                it into a full-course experience! <br/>From point A to B, from the opener to 
                                closing time.
                            </p>
                        </div>
                    </div>
                ) : (
                    <h1>Welcome back, {localStorage.getItem('username')}!</h1>
                )}
        </>
    );
  };

export default Home;