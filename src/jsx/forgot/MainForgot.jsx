import "../../css/forgot/mainForgot.css"
import Btn from "../../help/register/Btn";
import LoadingBtn from "../../help/register/LoadingBtn";
import axios from "axios";
const server = import.meta.env.VITE_BACKEND_SERVER;

import { randomForgotMsg } from "../../help/login";
import { useState } from "react";

export default function MainForgot() {

    const [page, setPage] = useState({no:1,res:""});
    const [data, setData] = useState({ text: "", error: "", typ: 1, loading: false });
    


    function loginHandle(e) {
        const { value, name } = e.target;
        setData((pre) => ({ ...pre, [name]: value.toLowerCase() }));
    }

    async function sendRequest() {
        const value = data.text.trim();

        if (data.typ == 1) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                setData((pre) => ({ ...pre, error: "Please enter a valid email address" }));
                return;
            }
        }
        else {
            if (value.length <= 4) {
                setData((pre) => ({ ...pre, error: "Username must be more than 4 characters" }));
                return;
            }
            const usernameRegex = /^[a-zA-Z0-9._]+$/;

            if (!usernameRegex.test(value)) {
                setData((pre) => ({ ...pre, error: "Username can contain only letters, numbers, dot and underscore" }));
                return;
            }
        }
        setData((pre) => ({ ...pre, loading: true, error: "" }));
        try {
            const response = await axios.post(`${server}/auth/forgot`, { text: data.text });
            const result = response.data;
            if(result.success){
                setPage((pre)=>({...pre,no:2,res:result.message}))
                setData((pre)=>({...pre,error:"", text:""}))
            }
        } catch (er) {
            const result = er.response?.data;

            setData((pre) => ({ ...pre, error: result.message || "Server side error" }));
        } finally {
            setData((pre) => ({ ...pre, loading: false }));
        }

    }

    return (
        <div style={{ backgroundImage: "url(https://res.cloudinary.com/denrzaquu/image/upload/v1787849534/wallpaperflare.com_wallpaper_1_wdqedn.jpg)" }}
            className="isFlex wd mainForgot">
            <div className="sec1 isFlex">
                <img className="logo" src="svg/logo.svg"></img>
                <br />
                {
                    page.no == 1 ?
                        <>
                            <h4 className="title wd">Forgot by using {data.typ == 1 ? "Email" : "Username"}</h4>
                            <input
                                spellCheck="off"
                                autoComplete="off"
                                id="text"
                                name="text"
                                value={data.text}
                                onChange={(e) => loginHandle(e)}
                                type="text"
                                className="form-control clk inp"
                                placeholder={`Your ${data.typ == 1 ? "Email" : "Username"} . . .`} />
                            <u onClick={() => setData((pre) => ({ ...pre, typ: !pre.typ, text: "" }))} className="clk wd change">Forgot using {data.typ != 1 ? "email" : "username"}</u>

                            {data.error != "" &&
                                <p className="errMsg flow wd">
                                    {data.error}
                                </p>
                            }
                            <div className="btndiv wd isFlex">
                                <Btn msg="Go Back" fn={() => window.history.back()} typ="1" />
                                {
                                    !data.loading ? data.text != "" ?
                                        <Btn msg="Forgot Password" typ="3" fn={() => sendRequest()} /> :
                                        <></>
                                        :
                                        <LoadingBtn typ="3" />
                                }
                            </div>
                        </> :
                        <div className="nextPage isFlex">
                            <div className="icon">✓</div>
                            <h4>Reset Link Sent</h4>
                            <div className="prt isFlex">
                                <p className="res">{page.res}</p><br />
                                <a href="/login" className=" login-button clk"> Login</a>
                                <p className="backfoot">Entered the wrong {data.typ == 1 ? "email" : "username"}? <u className="clk not" onClick={()=>setPage({no:1, res:""})}>Change {data.typ == 1 ? "email" : "username"}</u></p>
                            </div>
                            <p className="warn">Please check your Inbox for the reset email. If you don't see it, please check your Spam, Promotions, or other folders.</p>
                            <p className="more">For your security, the password reset link is valid for a limited time. If you did not request a password reset, you can safely ignore this email.</p>
                        </div>
                }

            </div>
            <div className="sec2 isFlex">
                <iframe src="https://lottie.host/embed/c9912cec-01f0-4775-9b63-0286af0d1a8c/tyZfWIs9AC.lottie"></iframe>
                <h2>{randomForgotMsg.title}</h2>
                <p>{randomForgotMsg.subtitle}</p>
            </div>
        </div>
    )
}