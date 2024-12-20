import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import auth from '../utils/auth';
import Helmet from 'react-helmet';

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
                    <div className='login-notice welcome'>
                        <Helmet>
                            <body className="no-scroll" />
                        </Helmet>
                        <div className="home-splash">
                            <img src="/pexels-wendywei-1540406.jpg" />

                            <h1 style={{marginLeft: '-50px'}}>
                                PLAN YOUR <br />CONCERT <br />NIGHT <br />RIGHT!
                            </h1>
                            <div className="side-text">
                                <p>
                                    It's 2am after a concert, do you have your late night munchies planned?<br />
                                    Sound and Scene is determined to take your music venue outing and turn
                                    it into a full-course experience! <br />From point A to B, from the opener to
                                    closing time.
                                </p>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to="/login">
                                        <button
                                            className="btn btn-primary bg-warning w-50 rounded-pill text-dark fw-bold"
                                            type="button"
                                        >
                                            Log In or Sign Up
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="home-splash">
                        <Helmet>
                            <body className="no-scroll" />
                        </Helmet>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#050505c9' }}>
                            <h1>Welcome back,<br /> {localStorage.getItem('username')}!</h1>
                            <div style={{ textAlign: 'center' }}>
                                <Link to="/events">
                                    <button
                                        className="btn btn-primary bg-warning w-50 rounded-pill text-dark fw-bold"
                                        style={{ margin: '20px' }}
                                        type="button"
                                    >
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <img className="logged-in-img" src="pexels-yaroslav-shuraev-7646192.jpg" />
                    </div>
                )}
        </>
    );
};

export default Home;