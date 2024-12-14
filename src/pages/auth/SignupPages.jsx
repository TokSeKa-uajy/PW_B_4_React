import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../../api/apiAuth';
import InputFloatingForm from '../../components/auth/inputField';
import { toast } from 'react-toastify';
import './authStyle.css';
import authVideo from '../../assets/backgroundVideo/authVideo.mp4';  // Ensure the path matches where the video is stored

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    password: "",
    password_confirmation: "",
    nomor_telepon: "",
    jenis_kelamin: "",
    role: "user",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value.trim() };
    setData(newData);
    setIsDisabled(
      !(newData.nama_depan && newData.nama_belakang && newData.email && newData.password && newData.password_confirmation && newData.nomor_telepon && newData.jenis_kelamin)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await Register(data);
      toast.success("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error(error);
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
              name="nama_depan"
              type="text"
              onChange={handleChange}
            />
            <InputFloatingForm
              label="Nama Belakang"
              placeholder="Masukkan Nama Belakang"
              name="nama_belakang"
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
              label="Konfirmasi Password"
              placeholder="Konfirmasi Password"
              name="password_confirmation"
              id="password_confirmation"
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
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center">
                <div className="me-3">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="pria"
                    id="pria"
                    onChange={handleChange}
                  />
                  <label htmlFor="pria" className="ms-2">
                    Pria
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="perempuan"
                    id="perempuan"
                    onChange={handleChange}
                  />
                  <label htmlFor="perempuan" className="ms-2">
                    Perempuan
                  </label>
                </div>
              </div>
            </div>
            <div className='d-grid mt-4'>
              <button className='btn btn-primary' disabled={isDisabled || loading}>
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </div>
            <p className='text-end mt-2 text-center'>
              Already Registered? <Link to='/' className='ms-2'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
