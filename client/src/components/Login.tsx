import React, { useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setAuth }: { setAuth: Function; }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const body = { email, password };

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
                ,
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Logged in successfully!");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1 className="text-center my-5">Login</h1>

            <form onSubmit={onSubmitForm}>
                <input className="form-control my-3" type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                <input className="form-control my-3" type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>

        </>
    );
};

export default Login;