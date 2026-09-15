import { useState, useEffect, useRef } from "react";
import axios from "axios";
const server = import.meta.env.VITE_BACKEND_SERVER;

import LoadingBtn from "../../../help/register/LoadingBtn";

import "../../../css/register/mainForm.css";
import Btn from "../../../help/register/Btn";


export default function OtpPrt({ setPage, create }) {
    const [timer, setTimer] = useState(-1);
    const [err, setError] = useState({ msg: "", next: false, errBox: 0, typ: 1 });
    const [otp, setOtp] = useState("");
    const otpRequested = useRef(false);
    const sendingOtp = useRef(false);
    const [loadx, setLoadx] = useState(false)

    useEffect(() => {
        if (otpRequested.current) return;
        otpRequested.current = true;
        askOtp();
    }, []);

    useEffect(() => {

        if (timer <= 0) return;

        const watch = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(watch);
    }, [timer]);


    async function askOtp() {


        if (sendingOtp.current) return;
        if (timer > 0) return;
        if (!create.email) {
            setError({ msg: "Email is required", next: false, errBox: 1, typ: -1 });
            return;
        }

        sendingOtp.current = true;
        setError({ msg: "We are sending OTP on your email...", next: false, errBox: 0, typ: 0 });

        try {
            setLoadx(true)
            const response = await axios.post(`${server}/otp/email/${create.email}`);
            const result = response.data;
            if (result) {
                setTimer(60);
                setError({ msg: "OTP sent, Check your email", next: false, errBox: 0, typ: 1 });
            } else {

                setTimer(0);
                setError({ msg: "OTP not sent", next: false, errBox: 0, typ: -1 });
            }

        } catch (error) {

            console.log("Send OTP failed:", error.response?.data || error.message);

            setTimer(0);
            setError({ msg: error.response?.data?.message || "Unable to send OTP", next: false, errBox: 0, typ: -1 });
        } finally {
            sendingOtp.current = false;
            setLoadx(false)
        }
    }


    function handleOtp(e) {

        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;
        if (value.length > 5) return;


        setOtp(value);
        setError((pre) => ({ ...pre, msg: "", errBox: 0 }));
    }

    async function verifyOtp() {

        if (otp.length !== 5) {
            setError({ msg: "Please enter a 5 digit OTP", next: false, errBox: 1, typ: -1 });
            return;
        }
        setError({ msg: "Verifying OTP...", next: false, errBox: 0, typ: 0 });

        try {
            setLoadx(true)
            const response = await axios.post(`${server}/otp/email/${create.email}/${otp}`);
            const result = response.data;

            if (result?.sent === true) {

                setError({ msg: "OTP verified successfully", next: true, errBox: 0, typ: 1 });
                setPage((pre) => ({ ...pre, no: 3 }));

            } else setError({ msg: result?.message || "Invalid or expired OTP", next: false, errBox: 1, typ: -1 });


        } catch (error) {
            console.log("OTP verification failed:", error.response?.data || error.message);
            setError({ msg: error.response?.data?.message || "Invalid or expired OTP", next: false, errBox: 1, typ: -1 });
        } finally {
            setLoadx(false);
        }
    }



    function changeEmail() {
        setOtp("");
        setTimer(-1);
        setError({ msg: "", next: false, errBox: 0, typ: 1 });
        setPage((pre) => ({ ...pre, no: 1 }));
    }


    return (
        <div className="otpPrt prt isFlex wd">

            <p style={{ overflowWrap: "break-word" }} className="flow wd"  >
                We have sent you a 5 digit OTP on your
                <br />
                Email -&nbsp;
                <b>{create.email}</b>
            </p>


            <div onClick={changeEmail} className="bbtn clk" >  Change Email </div>


            <div className="inpdiv input-group flex-nowrap">

                <span className="label input-group-text">
                    <svg className="svgg" viewBox="0 -0.5 25 25" fill="none" >
                        <path d="M19.5 12.6H15.838L14.007 9L10.8 15L9.429 12.6H5.5" stroke="#f8f8f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </span>

                <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={handleOtp}
                    className={`form-control inpp clk ${err.errBox === 1 ? "redInp" : ""}`}
                    placeholder="Enter OTP . . ."
                    maxLength={5}
                    spellCheck="off"
                    autoComplete="one-time-code"
                />

            </div>


            <div className="textArea wd isFlex">

                {err.msg !== "" && (
                    <p className={`${err.typ === 0 ? "warnMsg" : err.typ === 1 ? "successMsg" : "errMsg"} flow wd`} >  {err.msg} </p>
                )}
                {timer === -1 ? (<></>
                ) : timer === 0 ? (
                    !loadx && <u onClick={askOtp} className="resend flow wd clk"  > Resend OTP </u>
                ) : (
                    <p className="timer resend flow wd">  Resend in {timer} Sec </p>
                )}

            </div>
            <br />
            <div className="btndiv wd isFlex">
                <Btn msg="Go Back" typ="2" fn={changeEmail} />
                {
                    !loadx ? 
                    <Btn msg="Next Step" typ="3" fn={verifyOtp} />
                    :
                    <LoadingBtn typ="3" />
                }
            </div>

        </div>
    );
}