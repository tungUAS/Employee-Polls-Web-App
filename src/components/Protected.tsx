import React from "react";
import { useNavigate } from "react-router-dom";


export const Protected = () => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate("/");
    };
    return (
        <div>
            <p>Go To Login Page To View This Page</p>
            <button onClick={goToLoginPage}>Login Page</button>
        </div>
    );
};