import { useEffect, useState } from "react";
import "../../../../css/merkit/create-css/capsule.css"
import MainInput from "./MainInput";

import api from "../../../../help/api"
const server = import.meta.env.VITE_BACKEND_SERVER;

import AttachmentInputs from "./AttachmentInput";
import Loading from '../../../../help/chat/loading'
import Alert from "../../../../help/Alert"



export default function Capsule() {
    const [mainDtl, setMainDtl] = useState({ title: "", desc: "", img: "", longi: 0, lati: 0, openDate: "" })
    const [attach, setattach] = useState({ img: [], video: [], pdf: [], file: [], ttl: 30 });
    const [extra, setExtra] = useState({ loading: false, msg: "", typ: "er" });

    useEffect(() => {
        document.title = "Plant Capsule";
    }, []);

    async function formSubmit() {

        if (!mainDtl.title.trim()) { setExtra((pre) => ({ ...pre, msg: "Please enter capsule title" })); return; }
        if (!mainDtl.desc.trim()) { setExtra((pre) => ({ ...pre, msg: "Please enter capsule description" })); return; }
        if (!mainDtl.openDate) { setExtra((pre) => ({ ...pre, msg: "Please select capsule's opening date" })); return; }
        if (new Date(mainDtl.openDate) <= new Date()) {setMainDtl((pre)=>({...pre, openDate:""}));  setExtra((pre) => ({ ...pre, msg: "Capsule's Opening date must be in the future" })); return;}
        try {
            if (extra.loading) return
            setExtra((pre) => ({ ...pre, loading: true, msg: "" }));

            const formData = new FormData();

            const capsule = {
                title: mainDtl.title.trim(),
                description: mainDtl.desc.trim(),
                latitude: mainDtl.lati || null,
                longitude: mainDtl.longi || null,
                openDate: mainDtl.openDate
            };

            formData.append("capsule", new Blob([JSON.stringify(capsule)], { type: "application/json" }));

            if (mainDtl.img) formData.append("thumbnail", mainDtl.img);

            attach.img.forEach((file) => { formData.append("images", file); });
            attach.video.forEach((file) => { formData.append("videos", file); });
            attach.pdf.forEach((file) => { formData.append("pdfs", file); });
            attach.file.forEach((file) => { formData.append("files", file); });

            const result = await api.post(`${server}/capsule`, formData);

            console.log(result.data);
            if (result.data.success) {
                setExtra((pre) => ({ ...pre, loading: false, typ: "su", msg: result.data.message || "Capsule Planted." }));
                setMainDtl((pre) => ({ ...pre, title: "", desc: "", img: "", longi: 0, lati: 0, openDate: "" }))
                setattach((pre) => ({ ...pre, img: [], video: [], pdf: [], file: [], ttl: 30 }))
                window.location.href = "/merkit/home/capsules"
            }

        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
            setExtra((pre) => ({ ...pre, loading: true, msg: error.response?.data }));
        } finally {
            setExtra((pre) => ({ ...pre, loading: false }))
        }
    }

    return (
        <>
            <p className="def">Plant a moment, share your emotions, and create a capsule<br /> that will hold your story.
            </p>
            <div className="capsule wd isFlex">
                <MainInput mainDtl={mainDtl} setMainDtl={setMainDtl} />
                <p className="info wd">Attachments&nbsp; ( optional )</p>
                <AttachmentInputs attach={attach} setattach={setattach} />
                <div onClick={() => formSubmit()} className="dv3 isFlex wd">
                    <div className="btnokok isFlex clk ">Plant Capsule</div>
                </div>
            </div>
            {extra.loading && <Loading msg="Planting Capsule in Progress . . ." />}
            <Alert msg={extra.msg} typ={extra.typ} setMsg={setExtra} />
        </>
    )
}