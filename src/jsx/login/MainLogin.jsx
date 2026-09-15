import "../../css/login/mainLogin.css"

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { randomLoginMsg } from "../../help/login";
import Login from "./Login";


export default function MainLogin() {
    return (
        <>
            <div
                 style={{ backgroundImage: "url(https://res.cloudinary.com/denrzaquu/image/upload/v1786613628/wallpaperflare.com_wallpaper_z9jpqj.jpg)" }}
                className="mainLogin isFlex wd">

                <div className="sec1 isFlex">
                    <br/>
                    <img className="logo" src="svg/logo.svg"></img>
                  <Login />
                </div>
                <div className="sec2 isFlex">
                   
                    
                    <h2>{randomLoginMsg.title}</h2>
                    <p>{randomLoginMsg.subtitle}</p>
                    <DotLottieReact
                        src="https://lottie.host/a27dd3b3-c7dc-4891-8ff2-98497b794f3b/I8wOns2h65.lottie"
                        loop
                        autoplay
                        className="anmi"
                    />
                    
                </div>

            </div>
        </>
    )
}
