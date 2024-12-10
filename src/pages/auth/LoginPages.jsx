import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputFloatingForm from '../../components/auth/inputField';
import { toast } from 'react-toastify';
import './authStyle.css';
import authVideo from '../../assets/backgroundVideo/authVideo.mp4';

// TODO
// 1. Aku butuh API khusus untuk Register
// 2. Aku butuh API khusus untuk Login
// 3. Aku butuh API khusus untuk Logout

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newData = { ...data, [name]: value.trim() };
        setData(newData);
        setIsDisabled(!(newData.email && newData.password));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // const res = await SignIn(data);  // Replace SignIn with your actual login function
            // sessionStorage.setItem("token", res.access_token);
            // sessionStorage.setItem("user", JSON.stringify(res.user));
            // toast.success('Logged in successfully!');
            navigate("/user");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    // const Login = (event) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     SignIn(data)
    //         .then((res) => {
    //             navigate("/user");
    //             sessionStorage.setItem("token", res.access_token);
    //             sessionStorage.setItem("user", JSON.stringify(res.user));
    //             toast.success(res.message);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             toast.dark(err.message);
    //             setLoading(false);
    //         });
    // };

    return (
        <div className='video-background'>
            <video autoPlay="autoplay" loop="loop" muted playsInline className="video">
                <source src={authVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-75'>
                <div className='form_container p-5 rounded bg-light shadow text-dark bg-opacity-50'>
                    <form onSubmit={handleLogin}>
                        <h1 className='text-center fw-bold'>Atma Gym</h1>
                        <p className='text-center fw-bold'>Every Muscle Matter</p>
                        <h3 className='text-center mb-3 fw-bold'>Sign In</h3>
                        <InputFloatingForm
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <InputFloatingForm
                            label="Password"
                            placeholder="Enter Password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <div className='d-grid mt-4'>
                            <button type="submit" className='btn btn-primary' disabled={isDisabled || loading}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                        <p className='text-end mt-2'>
                            Don't have an account? <Link to='/signup' className='ms-1'>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;
