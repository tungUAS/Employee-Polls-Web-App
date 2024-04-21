import React from "react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        localStorage.removeItem("redirect");
        navigate("/");
    };
    return (
        <div>
            <p>404 Not Found</p>
            <button onClick={goToLoginPage}>Go To Home Page</button>
        </div>
    );
};

export default NotFound;