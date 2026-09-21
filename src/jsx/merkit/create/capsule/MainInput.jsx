import "../../../../css/merkit/create-css/capsule.css";
import { useEffect, useState } from "react";
import Locationx from "../../../../help/capsule/Location";

export default function MainInput({ mainDtl, setMainDtl }) {
    const [imgPreview, setImgPreview] = useState("");

    useEffect(() => {
        if (!mainDtl.img) {
            setImgPreview("");
            return;
        }

        if (typeof mainDtl.img === "string") {
            setImgPreview(mainDtl.img);
        } else {
            const url = URL.createObjectURL(mainDtl.img);
            setImgPreview(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [mainDtl.img]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMainDtl((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setMainDtl((pre) => ({
            ...pre,
            img: file
        }));
    };

    const removeImage = (e) => {
        e.stopPropagation();

        setMainDtl((pre) => ({
            ...pre,
            img: ""
        }));

        setImgPreview("");

        document.getElementById("thumb").value = "";
    };

    return (
        <div className="dv1 wd isFlex">
            <label htmlFor="ttl">Capsule Title <span>*</span></label>
            <input id="ttl" name="title" type="text" className="inpxx" placeholder="Give your capsule a name . . ." value={mainDtl.title} onChange={handleChange} maxLength={100} />

            <label htmlFor="desc">Description <span>*</span></label>
            <textarea id="desc" name="desc" className="inpxx" rows={4} maxLength={10000} placeholder="Write something your future self will love to read. Capture a moment, a dream, a promise, or a memory . . ." value={mainDtl.desc} onChange={handleChange}></textarea>

            <input name="img" id="thumb" type="file" accept="image/*" hidden onChange={handleImage} />

            <label htmlFor="thumb" className="addImg isFlex clk">
                {imgPreview ? (
                    <div className="iconxu isFlex wd">
                        <div onClick={removeImage} className="cutxx isFlex clk">X</div>
                        <img src={imgPreview} alt="Capsule thumbnail" />
                    </div>
                ) : (
                    <svg className="iconxu isFlex wd" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#1C274C"></path>
                        <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 12.75 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.75 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#1C274C"></path>
                    </svg>
                )}

                <p className="flow wd">{imgPreview ? "Change Capsule Thumbnail" : "Add Capsule Thumbnail"}</p>
            </label>

            <div className="pubInpDiv isFlex wd">
                <label htmlFor="publishInp">Your capsule opens on <span>*</span></label>
                <input type="datetime-local" name="openDate" id="publishInp" className="publishInp" value={mainDtl.openDate || ""} onChange={handleChange} />
            </div>

            <Locationx loc={mainDtl} setLoc={setMainDtl} />
        </div>
    );
}