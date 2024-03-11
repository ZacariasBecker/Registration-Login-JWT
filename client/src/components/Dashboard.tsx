import React, { useState, useEffect } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ setAuth }: { setAuth: Function; }) => {

    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setName(parseRes.user_name);

        } catch (err) {
            console.error(err);
        }
    };

    const logout = async (e: React.FormEvent) => {
        await e.preventDefault();
        localStorage.removeItem("token");
        await setAuth(false);
        toast.success("Logged out successfully!");
    };

    useEffect(() => {
        getName();
    }, []);

    return (
        <>
            <h1>Dashboard {name}</h1>
            <button type="button" className="btn btn-danger me-1" onClick={e => logout(e)}>
                Logout
            </button>
        </>
    );
};

export default Dashboard;