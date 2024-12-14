import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputFloatingForm from '../../components/auth/inputField';
import { Login } from "../../api/apiAuth";
import { toast } from 'react-toastify';
import './authStyle.css';
import authVideo from '../../assets/backgroundVideo/authVideo.mp4';

const LoginPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newData = { ...data, [name]: value.trim() };
        setData(newData);
        setIsDisabled(!(newData.email && newData.password));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await Login(data);

            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("user", JSON.stringify(response.user));

            if (response.user.role === "admin") {
                navigate("/admin/dashboard"); 
            } else {
                navigate("/user"); 
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
            toast.error(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                        <p className='text-center mt-2'>
                            Don't have an account? <Link to='/signup' className='ms-1'>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
