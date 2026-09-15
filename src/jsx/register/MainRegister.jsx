import "../../css/register/mainRegister.css"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { randomRegisterMsg } from "../../help/login";
import { useState } from "react";

import Bar from "./bar/MainBar"
import MainForm from "./form/MainForm"



export default function MainRegister() {
    const [page, setPage] = useState({ no: 1 })
    return (
        <>
            <div
                style={{ backgroundImage: "url(https://res.cloudinary.com/denrzaquu/image/upload/v1786642208/wallpaperflare.com_wallpaper_awm7mp.jpg)" }}
                className="mainRegister isFlex">
                <div className="prt prt1 isFlex">
                    <img src="/svg/logo.svg" className="logo" />
                    <Bar  no={page.no} />
                    <MainForm  setPage={setPage} page={page.no} />
                    <p onClick={()=> window.location.href = "/login"} className="allready clk">Allready have account <u>Login</u></p>
                </div>
                <div className="prt prt2 isFlex">
                    <DotLottieReact
                        src="https://lottie.host/48cd2461-a198-4c95-94b6-c169b6ce2ebd/APbJNBR8bj.lottie"
                        loop
                        autoplay
                        className="anmi"
                    />
                    <h2>{randomRegisterMsg.title}</h2>
                    <p>{randomRegisterMsg.subtitle}</p>
                </div>
            </div>
        </>
    )
}