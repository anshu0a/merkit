
import '../../../css/merkit/chat-css/msg.css';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../help/api";

const lang = localStorage.getItem("lang") || "en-IN";
const activeRequests = new Set();

export default function Message({ req, setReq, ref, resMsg, setResMsg, setResChat }) {

    const { chatid } = useParams();
    const [voice, setVoice] = useState(false);
    const inp = useRef(null);
    const recognitionRef = useRef(null);

    function autoResize() {
        const el = inp.current;
        if (!el) return;

        requestAnimationFrame(() => {
            el.style.height = "auto";
            const maxHeight = 90;
            const newHeight = Math.min(el.scrollHeight, maxHeight);
            el.style.height = newHeight + "px";
            el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
        });
    }

    useEffect(() => {
        autoResize();
    }, [req.msg]);

    function handleMice(sts) {
        if (sts) startListening();
        else stopListening();

    }

    useEffect(() => {
        return () => { stopListening(); };
    }, []);

    useEffect(() => {
        if (req.dostop) stopListening();

    }, [req.dostop]);

    function startListening() {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log("Speech recognition is not supported");
            return;
        }

        stopListening();

        const recognition = new SpeechRecognition();

        recognition.lang = req.lang || lang;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            setReq((pre) => ({ ...pre, msg: transcript }));
        };

        recognition.onerror = () => { setVoice(false); };
        recognition.onend = () => { setVoice(false); };
        recognition.start();
        recognitionRef.current = recognition;
        setVoice(true);
    }

    function stopListening() {
        if (recognitionRef.current) {
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }

        setVoice(false);
    }

    async function askOldAI() {
        const question = req.msg?.trim();
        if (chatid === "new" || !question || activeRequests.has(chatid)) return;


        activeRequests.add(chatid);
        try {

            setReq((pre) => ({ ...pre, loading: true, msg: "" }));
            if (resMsg?.answer) {
                const message = { ...resMsg, created_at: new Date() };
                setResChat((pre) => ({ ...pre, messages: [...pre.messages, message] }));
            }
            setResMsg({ question, answer: "", created_at: "" });

            const res = await api.post(`/aichat/${chatid}`, { prompt: question });
            setResMsg(res.data);

        } catch (err) {
            console.log("AI request error:", err);
            setResMsg({ question, answer: "Something went wrong. Please try again.", created_at: new Date() });

        } finally {
            activeRequests.delete(chatid);
            setReq((pre) => ({ ...pre, loading: false }));
        }
    }

    async function askNewAI() {
        const question = req.msg?.trim();
        if (!question || activeRequests.has(chatid)) return;


        activeRequests.add(chatid);
        try {

            setReq((pre) => ({ ...pre, loading: true, msg: "" }));

            const res = await api.post(`/aichat`, { prompt: question });
            window.location.href = `/merkit/bot/${res.data.chatId}`

        } catch (err) {
            console.log("AI request error:", err);
        } finally {
            activeRequests.delete(chatid);
            setReq((pre) => ({ ...pre, loading: false }));
        }
    }

    function handleKeyDown(e) {

        if (e.key !== "Enter") return;
        if (e.shiftKey) return;

        e.preventDefault();
        e.stopPropagation();

        if (chatid === "new") askNewAI();
        else askOldAI();
    }

    function handleSendClick(e) {

        e.preventDefault();
        e.stopPropagation();

        if (chatid === "new") askNewAI();
        else askOldAI();
    }

    return (
        <>
            <div ref={ref} className="msg limitChat glass isFlex">

                <textarea id="he"
                    onKeyDown={handleKeyDown}
                    readOnly={voice}
                    value={req.msg}
                    ref={inp}
                    onChange={(e) => {
                        const value = e.target.value;
                        setReq((pre) => {
                            if (pre.msg === value) return pre;
                            return { ...pre, msg: value };
                        });
                    }}
                    rows="1"
                    placeholder="Ask your problem . . ."
                />
                <div className="outBox">
                    <div className="inBox isFlex">
                        <div onClick={() => { if (voice) { handleMice(false); } else { handleMice(true); } }} className={`mice clk isFlex ${voice ? "miceon" : ""}`}>
                            {voice
                                ?
                                <svg title="Stop Recording" viewBox="0 0 24 24" fill="none">
                                    <title>Stop Record</title>
                                    <path d="M7.00002 9.125V14.875C6.99816 15.1715 7.11417 15.4566 7.32252 15.6676C7.53087 15.8786 7.81451 15.9981 8.11102 16H9.22202C9.51854 15.9981 9.80217 15.8786 10.0105 15.6676C10.2189 15.8786 10.3349 15.1715 10.333 14.875V9.125C10.3349 8.82849 10.2189 8.54338 10.0105 8.3324C9.80217 8.12142 9.51854 8.00185 9.22202 8H8.11102C7.81451 8.00185 7.53087 8.12142 7.32252 8.3324C7.11417 8.54338 6.99816 8.82849 7.00002 9.125Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.667 9.125V14.875C13.6652 15.1715 13.7812 15.4566 13.9895 15.6676C14.1979 15.8786 14.4815 15.9981 14.778 16H15.889C16.1855 15.9981 16.4692 15.8786 16.6775 15.6676C16.8859 15.4566 17.0019 15.1715 17 14.875V9.125C17.0019 8.82849 16.8859 8.54338 16.8859 8.54338C16.6775 8.3324 16.4692 8.12142 16.1855 8.00185 15.889 8H14.778C14.4815 8.00185 14.1979 8.12142 13.9895 8.3324C13.7812 8.54338 13.6652 8.82849 13.667 9.125V9.125Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                :
                                <svg title="Start Recording" viewBox="0 0 24 24" fill="none">
                                    <title>Start Record</title>
                                    <path d="M14.75 7.33303V11.222C14.7728 12.4877 13.7657 13.5325 12.5 13.556C11.2343 13.5325 10.2277 12.4877 10.25 11.222V7.33303C10.2277 6.06772 11.2347 5.02357 12.5 5.00003C13.7653 5.02357 14.7723 6.06772 14.75 7.33303Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.46233 13.8534C8.13618 13.5981 7.66478 13.6555 7.40945 13.9817C7.15411 14.3078 7.21152 14.7792 7.53767 15.0346L8.46233 13.8534ZM17.4623 15.0346C17.7885 14.7792 17.8459 14.3078 17.5906 13.9817C17.3352 13.6555 16.8638 13.5981 16.5377 13.8534L17.4623 15.0346ZM13.25 16C13.25 15.5858 12.9142 15.25 12.5 15.25C12.0858 15.25 11.75 15.5858 11.75 16H13.25ZM11.75 19C11.75 19.4142 12.0858 19.75 12.5 19.75C12.9142 19.75 13.25 19.4142 13.25 19H11.75ZM7.53767 15.0346C10.4524 17.3164 14.5476 17.3164 17.4623 15.0346L16.5377 13.8534C14.1661 15.7101 10.8339 15.7101 8.46233 13.8534L7.53767 15.0346ZM11.75 16V19H13.25V16H11.75Z" fill="black" />
                                </svg>
                            }

                        </div>

                        {
                            !voice &&
                            req.msg?.trim() !== "" &&
                            !req.loading &&
                            <svg onClick={handleSendClick} className="msgclk" viewBox="-2 -1.2 25 25" fill="none">
                                <title>Send Message</title>
                                <path d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91711 11.8809 7.85786 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.58 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }

                    </div>

                </div>

            </div>
        </>
    );
}
