import { useState, useEffect } from "react"
import "../../../css/merkit/create-css/article.css"
import Alert from "../../../help/Alert"
import api from "../../../help/api"

export default function Article() {
    const getCurrentDateTime = () => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    const [article, setArticle] = useState({
        title: "",
        text: "",
        tag: "merkit",
        showimg: [],
        dateTime: getCurrentDateTime()
    });

    const [err, setErr] = useState({ msg: "", typ: "" });
    const [publish, setPublish] = useState(true);
    const [minDateTime, setMinDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        document.title = "Create Article";
        const updateMinDateTime = () => { setMinDateTime(getCurrentDateTime()); };
        updateMinDateTime();
    }, []);

    function handleText(e) {
        let { name, value } = e.target;

        if (name === "tag") {
            if (!/^[a-zA-Z]*$/.test(value)) return;
            value = value.toLowerCase();
        }

        setArticle(pre => ({ ...pre, [name]: value }));
    }

    function imageLoad(e) {
        const files = Array.from(e.target.files);
        const remaining = 3 - article.showimg.length;

        if (remaining <= 0) {
            setErr({ msg: "Only 3 images are allowed.", typ: "wr" });
            e.target.value = "";
            return;
        }

        if (files.length > remaining) setErr({ msg: "Only 3 images are allowed.", typ: "wr" });

        setArticle(pre => ({ ...pre, showimg: [...pre.showimg, ...files.slice(0, remaining)] }));
        e.target.value = "";
    }

    function cutImg(index) {
        setArticle(pre => ({ ...pre, showimg: pre.showimg.filter((_, i) => i !== index) }));
    }

    function togglePublish() {
        setPublish(pre => {
            const next = !pre;

            if (!next) setArticle(articlePre => ({ ...articlePre, dateTime: getCurrentDateTime() }));
            return next;
        });
    }

    const sharePost = async () => {
        setErr({ msg: "", typ: "" });

        if (!article.title.trim()) {
            setErr({ msg: "Title is required.", typ: "wr" });
            return;
        }
        if (!article.text.trim()) {
            setErr({ msg: "Article is required.", typ: "wr" });
            return;
        }
        if (!article.tag.trim()) {
            setErr({ msg: "Tag is required.", typ: "wr" });
            return;
        }
        if (!publish && !article.dateTime) {
            setErr({ msg: "Please select a date and time for your article.", typ: "wr" });
            return;
        }
        if (!publish && new Date(article.dateTime) < new Date()) {
            setErr({ msg: "Please select a future date and time.", typ: "wr" });
            return;
        }

        const formData = new FormData();
        formData.append("title", article.title);
        formData.append("article", article.text);
        formData.append("tag", article.tag);
        formData.append("publish", publish);

        if (!publish) {
            formData.append("publishTime", article.dateTime);
        }

        article.showimg.forEach(img => {
            formData.append("images", img);
        });

        try {
            const result = await api.post("/article", formData);

            console.log(result.data);
            setErr({ msg: publish ? "Article published successfully." : "Article scheduled successfully.", typ: "sc" });
            setArticle({ title: "", text: "", tag: "merkit", showimg: [], dateTime: getCurrentDateTime() });
            setPublish(true);

        } catch (error) {
            console.error(error);
            setErr({ msg: error.response?.data?.message || "Failed to share article.", typ: "wr" });
        }
    };

    return (
        <>
            <p className="def">Turn your thoughts into meaningful words, share your ideas with the world, and create an article that inspires, informs, and connects.</p>

            <div className="article wd isFlex">
                <h2 className="wd articlePrompt">What’s on your mind ?</h2>

                <div className="displayBox isFlex wd">
                    {article.showimg.map((img, index) => (
                        <div key={index} className="displayIng">
                            <img className="imgxx" src={URL.createObjectURL(img)} alt={`preview-${index}`} />

                            <svg onClick={() => cutImg(index)} className="svgxx clk" viewBox="0 -0.5 25 25">
                                <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 6.46967L16.9697 6.46967ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303Z"></path>
                            </svg>
                        </div>
                    ))}
                </div>

                <input
                    onChange={handleText}
                    maxLength={50}
                    className="wd txt ttl"
                    name="title"
                    placeholder="Title . . ."
                    value={article.title}
                />

                <textarea
                    onChange={handleText}
                    rows={5}
                    maxLength={500}
                    className="wd txt sub"
                    name="text"
                    placeholder="Start Writing from here . . ."
                    value={article.text}
                />

                <div className="tag wd isFlex">
                    <label htmlFor="tag" className="sign">#</label>

                    <input
                        onChange={handleText}
                        maxLength={20}
                        value={article.tag}
                        placeholder="set hashtag . . ."
                        type="text"
                        name="tag"
                        id="tag"
                        className="hash"
                    />
                </div>

                <p className="publishTym wd">
                    <span className="publishLabel">
                        {publish
                            ? "Your article will be published now."
                            : "Your article will be scheduled for later."}
                    </span>

                    <span className="clk clkx" onClick={togglePublish}>
                        {publish ? "Schedule" : "Publish now"}
                    </span>
                </p>

                {!publish && (
                    <div className="pubInpDiv wd">
                        <span>Publish on</span>

                        <input
                            onChange={handleText}
                            type="datetime-local"
                            name="dateTime"
                            id="publishInp"
                            className="publishInp"
                            value={article.dateTime}
                            min={minDateTime}
                        />
                    </div>
                )}

                <div className="prtx isFlex wd">
                    <div className="insec isFlex">
                        <input
                            multiple
                            onChange={imageLoad}
                            accept="image/*"
                            type="file"
                            id="iinng"
                            hidden
                        />

                        {article.showimg.length <= 2 && (
                            <label htmlFor="iinng" className="sec clk isFlex">
                                <svg className="svgxx" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="#1C274C"></path>
                                    <path d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V12.0309C22.75 13.9397 22.75 15.5023 22.6463 16.7745C22.5422 18.0531 22.3287 19.1214 21.8509 20.0087C21.6401 20.4001 21.3812 20.7506 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 2.03933 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25Z" fill="#1C274C"></path>
                                </svg>
                                <p>Add Image</p>
                            </label>
                        )}
                    </div>

                    <div onClick={sharePost} className="btnx clk dis">
                        Share Post
                    </div>
                </div>
            </div>

            <Alert msg={err.msg} typ={err.typ} setMsg={setErr} />
        </>
    );
}