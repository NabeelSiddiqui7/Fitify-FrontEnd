import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Login() {
    axios.defaults.withCredentials = true
    const [errorMessages, setErrorMessages]: any = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    // Generate JSX code for error message
    const renderErrorMessage = (name: string) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = async (event: any) => {
        // Prevent page reload
        event.preventDefault();
        var { uname, pass } = document.forms[0];
        const url = `${process.env.REACT_APP_API_BASE_URL}/login`;
        const res = await axios.post(url, null, {
            params:
            {
                email: uname.value.toString(),
                password: pass.value.toString()
            }
        });
        const data = res.data;
        if (data.accesstoken) {
            setUser({
                accesstoken: data.accesstoken,
                id: -1,
                email: data.email,
                username: user.username
            });
            navigate("/")
        }
        setShowError(res.data.error != null)
    };

    return (
        <div className="bg-slate-800 flex h-screen">
            <div className="bg-white lg:w-1/4 w-3/4 h-3/4 m-auto flex flex-col">
                <h1 className="mx-auto my-4 text-2xl font-bold">Login</h1>
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <div className="flex flex-col m-4 gap-2">
                        <label>Email </label>
                        <input className="border-solid border-2 border-green-500" type="text" name="uname" required />
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="flex flex-col m-4 gap-2">
                        <label>Password </label>
                        <input className="border-solid border-2 border-green-500" type="password" name="pass" required />
                        {renderErrorMessage("pass")}
                    </div>
                    <button className="flex flex-col items-center mx-auto my-8 w-3/4 bg-green-500 hover:bg-green-300 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded"
                        type="submit">
                        Submit
                    </button>
                    {
                        showError &&
                        <div className="flex flex-col items-center mx-auto text-red-500">
                            Incorrect Login
                        </div>
                    }
                    <div className="flex flex-col items-center mx-auto mt-auto mb-6 align-self-end">
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}