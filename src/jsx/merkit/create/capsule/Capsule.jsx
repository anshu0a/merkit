import { useEffect, useState } from "react";
import "../../../../css/merkit/create-css/capsule.css"
import MainInput from "./MainInput";

import AttachmentInputs from "./AttachmentInput";



export default function Capsule() {
    const [mainDtl, setMainDtl] = useState({ title: "", desc: "", img: "", longi: 0, lati: 0, openDate: "" })
    const [attach, setattach] = useState({ img: [], video: [], pdf: [], file: [] });

    useEffect(() => {
        document.title = "Plant Capsule";
    }, []);



    return (
        <>
            <p className="def">Plant a moment, share your emotions, and create a capsule<br /> that will hold your story.
            </p>
            <div className="capsule wd isFlex">
                <MainInput mainDtl={mainDtl} setMainDtl={setMainDtl} />
                <p className="info wd">Attachments&nbsp; ( optional )</p>
                <AttachmentInputs attach={attach} setattach={setattach} />
                <div className="dv3 isFlex wd">
                    <div className="btnokok isFlex clk ">Plant Capsule</div>
                </div>
            </div>
        </>
    )
}