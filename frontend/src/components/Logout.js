import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navigateWithTimeout } from "../utils/navigateWithTimeout";
import { handleAxiosError } from "../utils/handleAxiosError";
import Message from "./smallReusables/Message";
import { useAuth } from "../utils/authContext";

export default function Logout() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

    useEffect(() => {
        async function logout() {
            try {
                const response = await axios.post(process.env.REACT_APP_LOGOUT_URI, {}, {
                    withCredentials: true
                });
                setMessage(response.data.message);
                console.log("logout message " + message)
                sessionStorage.removeItem('isAuthenticated');
                setIsAuthenticated(null);
                navigateWithTimeout(navigate);
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                navigate('*', { state: { message: errorMessage } });
            }
        }
        logout();
    })

    return (
        <div>
            {message && <Message message={message} />}
        </div>
    );
}