import "../../../css/register/mainForm.css"

import axios from "axios";
const server = import.meta.env.VITE_BACKEND_SERVER;
import { useState } from "react";

import Btn from "../../../help/register/Btn"
import LoadingBtn from "../../../help/register/LoadingBtn";


export default function OverviewPrt({ setPage, create, setCreate }) {
    const [err, setError] = useState({ msg: "", errBox: 0 })
    const [loadx, setLoadx] = useState(false)

    function handlePassword(e) {
        const { name, value } = e.target;
        setCreate((pre) => ({ ...pre, [name]: value }));
    }

    async function submitForm() {
        setError((pre) => ({ msg: "", errBox: 0 }))
        setLoadx(true)

        if (create.password == "") setError((pre) => ({ msg: "Create your password first", errBox: 1 }))
        else if (create.password.length <= 3) setError((pre) => ({ msg: "Password must be greater then 3 character", errBox: 1 }))
        else if (create.confirmPassword === "") setError((pre) => ({ msg: "Again enter same password", errBox: 2 }))
        else if (create.password != create.confirmPassword) {
            setError((pre) => ({ msg: "Both password are not matched", errBox: 2 }))
            setCreate((pre) => ({ ...pre, confirmPassword: "" }));
        }
        else {
            setError((pre) => ({ msg: "", errBox: 0 }))
            try {
                const response = await axios.post(`${server}/auth/register`, create);

                const result = response.data;
                console.log(result);
                if (result.success) {
                    localStorage.setItem("accessToken", result.token.accessToken);
                    localStorage.setItem("refreshToken", result.token.refreshToken);
                    localStorage.setItem("tokenType", result.token.tokenType);
                    localStorage.setItem("expiresIn", result.token.expiresIn);

                    localStorage.setItem("user", JSON.stringify(result.user));
                    setCreate({ name: "", username: "", email: "", password: "", confirmPassword: "" });
                    setPage((pre) => ({ ...pre, no: 1 }))
                    window.location.replace("/merkit/home")
                }else{
                    setError({ msg: result.message || "Somthing went wrong", errBox: 0 });
                }

            } catch (error) {
                console.log("Send register failed:", error.response?.data || error.message);
                setError({ msg: error.response?.data?.message || "Unable to send OTP", errBox: 0 });
            } finally {
                setLoadx(false)
            }

        }
    }

    return (
        <form className="overviewPrt isFlex prt wd">
            <h4 className="wd">Profile's Overview</h4>
            <div className="sec wd">
                <p><b>First Name: </b>  <i>{create.name}</i></p>
                <p><b>Username: </b><i>{create.username}</i></p>
                <p><b>Email: </b><i>{create.email}</i></p>
            </div>

            <p className="wd titl">Set Strong password that must be greater then 4 character</p>
            <div className="inpdiv input-group flex-nowrap">
                <span className="label input-group-text">
                    <svg className="svgg" viewBox="0 0 24 24" fill="none" >
                        <path d="M10.463 15.5C10.463 15.9142 10.7988 16.25 11.213 16.25C11.6272 16.25 11.963 15.9142 11.963 15.5H10.463ZM11.963 13.75C11.963 13.3358 11.6272 13 11.213 13C10.7988 13 10.463 13.3358 10.463 13.75H11.963ZM7.57502 8.61C7.57502 9.02421 7.9108 9.36 8.32502 9.36C8.73923 9.36 9.07502 9.02421 9.07502 8.61H7.57502ZM8.32502 8.15H9.07502C9.07502 8.14271 9.07491 8.13542 9.0747 8.12813L8.32502 8.15ZM11.213 5L11.2218 4.25005C11.2108 4.24992 11.1997 4.25004 11.1887 4.25039L11.213 5ZM13.0252 6.87897C13.2196 7.24474 13.6737 7.38367 14.0395 7.18928C14.4053 6.9949 14.5442 6.5408 14.3498 6.17503L13.0252 6.87897ZM8.32502 8.61L8.12794 7.88627L8.11692 7.88945L8.32502 8.61ZM9.14987 8.5L9.14916 9.25H9.14987V8.5ZM13.2751 8.5L13.2751 9.25L13.2758 9.25L13.2751 8.5ZM14.0999 8.61L14.3078 7.8893L14.297 7.88635L14.0999 8.61ZM16.5755 12L15.8255 11.992V12H16.5755ZM16.5755 15.5H15.8254L15.8256 15.512L16.5755 15.5ZM13.2751 19L13.2751 19.7501L13.2882 19.7499L13.2751 19ZM9.15084 19L9.13777 19.75H9.15084V19ZM5.85047 15.5L6.60047 15.512V15.5H5.85047ZM5.85047 12H6.60051L6.60042 11.9919L5.85047 12ZM11.963 15.5V13.75H10.463V15.5H11.963ZM9.07502 8.61V8.15H7.57502V8.61H9.07502ZM9.0747 8.12813C9.037 6.83609 10.023 5.78895 11.2373 5.74961L11.1887 4.25039C9.11299 4.31766 7.51458 6.08942 7.57534 8.17187L9.0747 8.12813ZM11.2041 5.74995C11.9567 5.75885 12.6561 6.18432 13.0252 6.87897L14.3498 6.17503C13.7297 5.00813 12.5362 4.26559 11.2218 4.25005L11.2041 5.74995ZM8.52208 9.33365C8.72685 9.27789 8.93763 9.2498 9.14916 9.25L9.15058 7.75C8.80522 7.74967 8.46142 7.79555 8.12796 7.88635L8.52208 9.33365ZM9.14987 9.25H13.2751V7.75H9.14987V9.25ZM13.2758 9.25C13.4873 9.2498 13.6981 9.27789 13.9029 9.33365L14.297 7.88635C13.9635 7.79555 13.6197 7.74967 13.2744 7.75L13.2758 9.25ZM13.8921 9.33061C15.0349 9.66029 15.8388 10.7438 15.8255 11.992L17.3254 12.008C17.3457 10.1082 16.1198 8.41211 14.3078 7.88939L13.8921 9.33061ZM15.8255 12V15.5H17.3255V12H15.8255ZM15.8256 15.512C15.8496 17.0172 14.684 18.2253 13.262 18.2501L13.2882 19.7499C15.5731 19.71 17.3621 17.7848 17.3254 15.488L15.8256 15.512ZM13.2751 18.25H9.15084V19.75H13.2751V18.25ZM9.16392 18.2501C7.74191 18.2253 6.57629 17.0172 6.60037 15.512L5.10056 15.488C5.06382 17.7848 6.85283 19.71 9.13777 19.7499L9.16392 18.2501ZM6.60047 15.5V12H5.10047V15.5H6.60047ZM6.60042 11.9919C6.58702 10.744 7.39059 9.66052 8.53312 9.33055L8.11692 7.88945C6.30539 8.41263 5.08011 10.1086 5.10051 12.0081L6.60042 11.9919Z" fill="#fdfcfc"></path>
                    </svg>
                </span>
                <input
                    value={create.password}
                    name="password"
                    onChange={(e) => handlePassword(e)}
                    type="password"
                    className={`form-control inpp clk ${err.errBox == 1 && "redInp"}`}
                    placeholder="Enter Password . . ."
                    spellCheck="off"
                    autoComplete="off" />
            </div>
            <div className="inpdiv input-group flex-nowrap">
                <span className="label input-group-text">
                    <svg className="svgg" viewBox="0 -0.5 25 25" fill="none" >
                        <path d="M19.5 12.6H15.838L14.007 9L10.8 15L9.429 12.6H5.5" stroke="#f8f8f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input
                    value={create.confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => handlePassword(e)}
                    type="text"
                    className={`form-control inpp clk ${err.errBox == 2 && "redInp"}`}
                    placeholder="Re-Enter Password . . ."
                    spellCheck="off"
                    autoComplete="off" />
            </div>
            {err.msg != "" && <p className="errMsg wd">{err.msg}</p>}
            <div className="btndiv wd isFlex">
                <Btn msg="Go Back" typ="2" fn={() => setPage((pre) => ({ ...pre, no: 1 }))} />

                {
                    !loadx ?
                        <Btn msg="Create Account" fn={submitForm} typ="3" />
                        :
                        <LoadingBtn typ="3" />
                }
            </div>
        </form>
    )
}