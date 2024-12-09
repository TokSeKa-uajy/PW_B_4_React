import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputFloatingForm from '../../components/auth/inputField';
import { toast } from 'react-toastify';
import './authStyle.css';
import authVideo from '../../assets/backgroundVideo/authVideo.mp4';  // Ensure the path matches where the video is stored

// TODO
// 1. Aku butuh API khusus untuk Register
// 2. Aku butuh API khusus untuk Login
// 3. Aku butuh API khusus untuk Logout

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value.trim() };  // Trimming values for consistent data handling
    setData(newData);
    setIsDisabled(!(newData.firstName && newData.lastName && newData.email && newData.password));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // const res = await Register(data); // Assume Register is a function you've defined to handle sign-up
      // sessionStorage.setItem("token", res.access_token);  // Adjust based on your actual API
      // sessionStorage.setItem("user", JSON.stringify(res.user));  // Adjust based on your actual API
      toast.success('Registered successfully');
      navigate("/user");  // Adjust redirect as necessary
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred during registration");
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
        <div className='form_container p-5 rounded bg-white shadow text-dark bg-opacity-50'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-center fw-bold'>Atma Gym</h1>
            <p className='text-center fw-bold'>Every Muscle Matter</p>
            <h3 className='text-center mb-3 fw-bold'>Sign Up</h3>
            <InputFloatingForm
              label="Nama Depan"
              placeholder="Masukkan Nama Depan"
              name="namaDepan"
              type="text"
              onChange={handleChange}
            />
            <InputFloatingForm
              label="Nama Belakang"
              placeholder="Masukkan Nama Belakang"
              name="namaBelakang"
              type="text"
              onChange={handleChange}
            />
            <InputFloatingForm
              label="Email"
              placeholder="Masukkan email"
              name="email"
              type="email"
              onChange={handleChange}
            />
            <InputFloatingForm
              label="Password"
              placeholder="Masukkan password"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <InputFloatingForm
              label="Telepon"
              placeholder="Masukkan Nomor Telepon"
              name="nomor_telepon"
              type="text"
              onChange={handleChange}
            />
            <div className='d-grid mt-4'>
              <button className='btn btn-primary' disabled={isDisabled || loading}>
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </div>
            <p className='text-end mt-2'>
              Already Registered? <Link to='/' className='ms-2'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
