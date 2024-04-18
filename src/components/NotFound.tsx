import React from "react";
import { useNavigate } from "react-router-dom";


export const NotFound = () => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate("/");
    };
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>Go To Login Page To View This Page</p>
            <button onClick={goToLoginPage}>Login Page</button>
        </div>
    );
};