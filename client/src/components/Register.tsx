import React, { useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setAuth }: { setAuth: Function; }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const body = { email, password, name };

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
                ,
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);

                toast.success("Registered successfully!");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err);
        }
    };

    const { email, password, name } = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <input type="text" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </>
    );
};

export default Register;