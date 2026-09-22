import "../../../../css/merkit/create-css/capsule.css";
import { useEffect, useState } from "react";
import VideoElement from "./VideoElement";

export default function AttachmentInputs({ attach, setattach }) {
    const [imgPreview, setImgPreview] = useState([]);
    const [videoPreview, setVideoPreview] = useState([]);

    const total =
        attach.img.length +
        attach.video.length +
        attach.pdf.length +
        attach.file.length;

    useEffect(() => {
        const urls = attach.img.map((file) => URL.createObjectURL(file));

        setImgPreview(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [attach.img]);

    useEffect(() => {
        const urls = attach.video.map((file) => URL.createObjectURL(file));

        setVideoPreview(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [attach.video]);

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) {
            return;
        }

        const available = attach.ttl - total;

        if (available <= 0) {
            e.target.value = "";
            return;
        }

        const selectedFiles = files.slice(0, available);

        setattach((pre) => {
            const next = {
                img: [...pre.img],
                video: [...pre.video],
                pdf: [...pre.pdf],
                file: [...pre.file],
                ttl: pre.ttl
            };

            selectedFiles.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    next.img.push(file);
                } else if (file.type.startsWith("video/")) {
                    next.video.push(file);
                } else if (file.type === "application/pdf") {
                    next.pdf.push(file);
                } else {
                    next.file.push(file);
                }
            });

            return next;
        });

        e.target.value = "";
    };

    const removeAttachment = (type, index) => {
        setattach((pre) => ({
            ...pre,
            [type]: pre[type].filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="dv2 isFlex wd">

            <div className="sectionx isFlex">

                {imgPreview.map((src, index) => (
                    <div className="oneMedia isFlex" key={index}>
                        <svg onClick={() => removeAttachment("img", index)} className="cuty clk isFlex"  viewBox="0 0 24 24"   fill="none"  >
                            <path  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"  fill="#fbfbfb" />
                        </svg>

                        <img src={src} alt={attach.img[index]?.name || "Attachment"} className="inFile"   />
                    </div>
                ))}

                {videoPreview.map((src, index) => (<VideoElement ind={index} removeAttachment={removeAttachment} key={index} src={src} />  ))}

            </div>

            <div className="sectionx wd isFlex">

                {attach.pdf.map((file, index) => (
                    <div className="oneFilex wd isFlex" key={index}>

                        <svg onClick={() => removeAttachment("pdf", index)}  className="cuty clk isFlex"  viewBox="0 0 24 24"  fill="none"  >
                            <path   d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"  fill="#fbfbfb"  />
                        </svg>

                        <svg  style={{ transform: "rotateY(150deg)" }}  viewBox="0 0 24 24"  fill="none"  >
                            <path
                                d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 4.34315 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9574C22 12.0344 22 12.6901 22 13.5629V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
                                fill="#696969"
                            />
                            <path
                                stroke="white"
                                strokeWidth={0.5}
                                d="M11.5092 2.2601L11.5 5.0945C11.4999 6.1916 11.4998 7.16117 11.6049 7.94269C11.7188 8.78981 11.9803 9.6368 12.6716 10.3281C13.3629 11.0193 14.2098 11.2808 15.057 11.3947C15.8385 11.4998 16.808 11.4997 17.9051 11.4996L21.9574 11.4996C21.9698 11.6552 21.9786 11.821 21.9848 11.9995H22C22 11.732 22 11.5983 21.9901 11.4408C21.9335 10.5463 21.5617 9.52125 21.0315 8.79853C20.9382 8.6713 20.8743 8.59493 20.7467 8.44218C19.9542 7.49359 18.911 6.31193 18 5.49953C17.1892 4.77645 16.0787 3.98536 15.1101 3.3385C14.2781 2.78275 13.862 2.50487 13.2915 2.29834C13.1403 2.24359 12.9408 2.18311 12.7846 2.14466C12.4006 2.05013 12.0268 2.01725 11.5 2.00586L11.5092 2.2601Z"
                                fill="#25262a"
                            />
                        </svg>

                        <p className="wd flow">
                            {file.name}
                        </p>
                    </div>
                ))}

                {attach.file.map((file, index) => (
                    <div className="oneFilex wd isFlex" key={index}>

                        <svg
                            onClick={() => removeAttachment("file", index)}
                            className="cuty clk isFlex"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                fill="#fbfbfb"
                            />
                        </svg>

                        <svg
                            style={{ transform: "rotateY(150deg)" }}
                            viewBox="0 0 512 512"
                            fill="#000000"
                        >
                            <path d="M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z" />
                            <path d="M171.947,252.785h-28.529c-5.432,0-8.686,3.533-8.686,8.825v73.754c0,6.388,4.204,10.599,10.041,10.599c5.711,0,9.914-4.21,9.914-10.599v-22.406c0-0.545,0.279-0.817,0.824-0.817h16.436c20.095,0,32.188-12.226,32.188-29.612C204.136,264.871,192.182,252.785,171.947,252.785z M170.719,294.888h-15.208c-0.545,0-0.824-0.272-0.824-0.81v-23.23c0-0.545,0.279-0.816,0.824-0.816h15.208c8.42,0,13.447,5.027,13.447,12.498C184.167,290,179.139,294.888,170.719,294.888z" />
                            <path d="M250.191,252.785h-21.868c-5.432,0-8.686,3.533-8.686,8.825v74.843c0,5.3,3.253,8.693,8.686,8.693h21.868c19.69,0,31.923-6.249,36.81-21.324c1.76-5.3,2.723-11.681,2.723-24.857c0-13.175-0.964-19.557-2.723-24.856C282.113,259.034,269.881,252.785,250.191,252.785z M267.856,316.896c-2.318,7.331-8.965,10.459-18.21,10.459h-9.23c-0.545,0-0.824-0.272-0.824-0.816v-55.146c0-0.545,0.279-0.817,0.824-0.817h9.23c9.245,0,15.892,3.128,18.21,10.46c0.95,3.128,1.62,8.56,1.62,17.93C269.476,308.336,268.805,313.768,267.856,316.896z" />
                            <path d="M361.167,252.785h-44.812c-5.432,0-8.7,3.533-8.7,8.825v73.754c0,6.388,4.218,10.599,10.055,10.599c5.697,0,9.914-4.21,9.914-10.599v-26.351c0-0.538,0.265-0.81,0.81-0.81h26.086c5.837,0,9.23-3.532,9.23-8.56c0-5.028-3.393-8.553-9.23-8.553h-26.086c-0.545,0-0.81-0.272-0.81-0.817v-19.425c0-0.545,0.265-0.816,0.81-0.816h32.733c5.572,0,9.245-3.666,9.245-8.553C370.411,256.45,366.738,252.785,361.167,252.785z" />
                        </svg>

                        <p className="wd flow">
                            {file.name}
                        </p>
                    </div>
                ))}

            </div>

            <div className="attachBox isFlex wd">

                <input
                    id="attachmentInput"
                    type="file"
                    multiple
                    hidden
                    accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar,.xls,.xlsx,.ppt,.pptx" 
                    // ,video/*
                    onChange={handleFiles}
                />

                <label
                    htmlFor="attachmentInput"
                    className="attachDiv clk isFlex"
                >
                    <svg
                        viewBox="0 -0.5 25 25"
                        fill="none"
                    >
                        <path
                            d="M15.17 11.053L11.18 15.315C10.8416 15.6932 10.3599 15.9119 9.85236 15.9178C9.34487 15.9237 8.85821 15.7162 8.51104 15.346C7.74412 14.5454 7.757 13.2788 8.54004 12.494L13.899 6.763C14.4902 6.10491 15.3315 5.72677 16.2161 5.72163C17.1006 5.71649 17.9463 6.08482 18.545 6.736C19.8222 8.14736 19.8131 10.2995 18.524 11.7L12.842 17.771C12.0334 18.5827 10.9265 19.0261 9.78113 18.9971C8.63575 18.9682 7.55268 18.4695 6.78604 17.618C5.0337 15.6414 5.07705 12.6549 6.88604 10.73L12.253 5"
                            stroke="#f8f8f8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p className="flow wd">
                        Add Attachments
                    </p>
                </label>

            </div>

            <p className="note">
                <b>Note - </b>
                You can attach PDF, GIF, File and Images. Maximum {attach.ttl} attachments.
                {total > 0 && ` ${total}/${attach.ttl} selected.`}
            </p>

        </div>
    );
}
