import { useState } from "react"
import axios from "axios"
import "../../css/login/login.css"
import Icon from "./Icon"
import Google from "./Google"
import { useNavigate } from "react-router-dom"
import LoadingBtn from "../../help/register/LoadingBtn"
import Alert from "../../help/Alert"
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function Login() {
    const navigate = useNavigate();
    const [feature, setFeature] = useState({ loginUser: true })
    const [login, setLogin] = useState({ email: "", username: "", password: "" })
    const [error, setError] = useState({ msg: "", loading: false })

    function loginHandle(e) {
        const { name, value } = e.target;

        if (name === "username") {
            if (!/^[a-zA-Z0-9._]*$/.test(value)) {
                return;
            }
        }
        if (name === "email") {
            if (!/^[a-zA-Z0-9.@]*$/.test(value)) {
                return;
            }
        }
        setLogin((pre) => ({
            ...pre,
            [name]: value.toLowerCase()
        }));
    }

    const switchLogin = function () {
        setLogin((pre) => ({ ...pre, username: "", email: "" }));
        setFeature((pre) => ({ ...pre, loginUser: !pre.loginUser }));
    }

    function validate() {
        if (login.username == "") {
            //email valid
            if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(login.email)) {
                setError((pre) => ({ ...pre, msg: "Enter valid email." }));
                return false;
            }
        } else {
            if (login.username.length < 5) {
                setError((pre) => ({ ...pre, msg: "Username must be greater then 4 character." }));
                return false;
            }
        }
        if (login.password.length < 4) {
            setError((pre) => ({ ...pre, msg: "Password must be greater then 3 character." }));
            return false;
        }
        return true;
    }

    async function loginRequest() {
        setError((pre) => ({ ...pre, msg: "", loading: false }));

        if (!validate()) return;

        try {
            const response = await axios.post(
                `${server}/auth/login`,
                { username: login.username === "" ? login.email : login.username, password: login.password }
            );

            const result = response.data;

            if (result.success) {
                localStorage.setItem("accessToken", result.token.accessToken);
                localStorage.setItem("refreshToken", result.token.refreshToken);
                localStorage.setItem("tokenType", result.token.tokenType);
                localStorage.setItem("expiresIn", result.token.expiresIn);
                localStorage.setItem("user", JSON.stringify(result.user));

                setLogin({ email: "", username: "", password: "" });

                window.location.replace("/merkit/home");
            }
            else setError((pre) => ({ ...pre, msg: result.message || "Login failed" }));


        } catch (error) {
            const result = error.response?.data;
            console.log("Login failed:", result);
            setError((pre) => ({ ...pre, msg: result?.message || `Invalid ${login.username === "" ? "email" : "username"} or password` }));
        } finally {
            setError((pre) => ({ ...pre, loading: false }));
        }
    }

    return (
        <>
            <div className="login wd isFlex">
                <p className="error">&nbsp;{error.msg}&nbsp;</p>
                <div className="prt1 wd isFlex">
                    {feature.loginUser ?
                        <div className="inpdiv wd input-group">
                            <Icon typ={1} />
                            <input
                                spellCheck="off"
                                autoComplete="off"
                                id="username"
                                name="username"
                                value={login.username}
                                onChange={(e) => loginHandle(e)}
                                type="text"
                                className="form-control clk inp"
                                placeholder="Your Username . . ." />
                        </div>
                        :
                        <div className="inpdiv wd input-group ">
                            <Icon typ={2} />
                            <input
                                autoComplete="off"
                                spellCheck="off"
                                id="email"
                                name="email"
                                value={login.email}
                                onChange={(e) => loginHandle(e)}
                                type="text"
                                className="form-control clk inp"
                                placeholder="Your Email address . . ." />
                        </div>}
                    <div className="inpdiv wd input-group">
                        <Icon typ={3} />
                        <input
                            spellCheck="off"
                            id="password"
                            name="password"
                            value={login.password}
                            onChange={(e) => loginHandle(e)}
                            type="text"
                            className="form-control clk inp"
                            placeholder="Your Password . . ." />
                    </div>
                    <div className="extra wd isFlex">
                        <span
                            onClick={() => navigate("/forgot")}
                            className="opt opt1 clk">
                            Forgot Password?
                        </span>
                        <span
                            onClick={switchLogin}
                            className="opt clk">
                            Login with {feature.loginUser ? "Email address" : "Username"}
                        </span>
                    </div>

                    <div style={(login.email == "" && login.username == "") || login.password == "" ? { scale: "0" } : {}}
                        className="inpdiv wd clk bbtn isFlex" onClick={!error.loading ? loginRequest : undefined} >
                        {
                            error.loading ?
                                <LoadingBtn loadTyp="1" />
                                :
                                "Login"
                        }
                    </div>


                </div>
                <Google />
                <Alert msg={error.msg} typ="er" setMsg={setError} />
            </div>
        </>
    )
}



