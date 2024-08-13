import React, { useState, useEffect } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5555/auth/is-verify/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      // ERRO 
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(typeof setAuth);
    isAuth();
  }, []);


  return (
    <div className="container">
      <ToastContainer />
      <Link to={"/login"}>
        <button type="button" className="btn btn-primary me-1">
          Login
        </button>
      </Link>
      <Link to={"/register"}>
        <button type="button" className="btn btn-primary me-1">
          Register
        </button>
      </Link>
      <Link to={"/dashboard"}>
        <button type="button" className="btn btn-primary me-1">
          Dashboard
        </button>
      </Link>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/Login" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Login setAuth={setAuth} />} />
        <Route path="/Register" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Register setAuth={setAuth} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Login setAuth={setAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
