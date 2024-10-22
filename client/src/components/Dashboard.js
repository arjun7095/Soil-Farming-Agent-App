import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // We'll add styles here

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <div className="overlay">
                <h1 className="dashboard-quote">
                    "The farmer has to be an optimist or he wouldn’t still be a farmer."
                </h1>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Dashboard;
