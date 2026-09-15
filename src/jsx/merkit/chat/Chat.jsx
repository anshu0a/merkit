
import '../../../css/merkit/chat-css/chat.css';

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../help/api";
import { getRemainingTime } from "../../../help/time";

import His from './His';
import My from './My';
import Message from './Message';
import MsgLoading from './MsgLoading';
import Loading from '../../../help/chat/loading';
import ChatTop from './ChatTop';
import ChatTemplet from './ChatTemplet';

export default function Chat() {

    const { chatid } = useParams();


    const [resChat, setResChat] = useState({
        chatId: "",
        chatName: "",
        created_at: "",
        messages: [],
        saved: false,
        updated_at: "",
        user: {}
    });

    const [extra, setExtra] = useState({
        chatLoading: false,
        timeLeft: "48 hours",
        showScroll: false
    });

    const [req, setReq] = useState({
        lang: localStorage.getItem("lang") || "en-IN",
        msg: "",
        stoprec: false,
        loading: false
    });

    const [resMsg, setResMsg] = useState({
        question: "",
        answer: "",
        created_at: ""
    });

    const chatRef = useRef(null);
    const messageRef = useRef(null);

    const loadingOldRef = useRef(false);
    const firstLoadRef = useRef(true);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        if (chatid !== "new") {
            loadChat();
        }
    }, [chatid]);

    async function loadChat() {
        try {
            setExtra((pre) => ({
                ...pre,
                chatLoading: true
            }));

            const res = await api.get(`/aichat/${chatid}`);
            const result = res.data;

            setResChat(result);

            document.title = "Bot - " + result.chatName;

            setExtra((pre) => ({
                ...pre,
                timeLeft: getRemainingTime(
                    result.updated_at || result.created_at,
                    48
                )
            }));

        } catch (e) {
            console.log("Chat loading error:", e);

        } finally {
            setExtra((pre) => ({
                ...pre,
                chatLoading: false
            }));
        }
    }

    function scrollBottom() {
        if (!chatRef.current) return;

        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth"
        });
    }

    function handleScroll() {
        const element = chatRef.current;

        if (!element) return;

        const isBottom =
            element.scrollHeight - element.scrollTop <=
            element.clientHeight + 50;

        setExtra((pre) => ({
            ...pre,
            showScroll: !isBottom
        }));

        const scrollingUp =
            element.scrollTop < lastScrollTop.current;

        lastScrollTop.current = element.scrollTop;

        if (firstLoadRef.current) return;

        if (
            scrollingUp &&
            element.scrollTop <= 50 &&
            !loadingOldRef.current
        ) {
            loadingOldRef.current = true;

            const oldHeight = element.scrollHeight;

            loadMessages(nextPage).finally(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {

                        if (!chatRef.current) {
                            loadingOldRef.current = false;
                            return;
                        }

                        const newHeight =
                            chatRef.current.scrollHeight;

                        chatRef.current.scrollTop =
                            newHeight - oldHeight;

                        loadingOldRef.current = false;
                    });
                });
            });
        }
    }

    useEffect(() => {
        if (resChat.messages.length === 0) return;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                scrollBottom();

                setTimeout(() => {
                    firstLoadRef.current = false;
                }, 300);
            });
        });

    }, [resChat.messages]);

    useEffect(() => {
        if (!req.loading) return;

        requestAnimationFrame(() => {
            scrollBottom();
        });

    }, [req.loading]);

    return (
        <div
            style={
                chatid !== "new"
                    ? { justifyContent: "flex-start" }
                    : {}
            }
            className="chat isFlex"
        >

            <ChatTop
                setLang={setReq}
                currentLang={req.lang}
                isSave={resChat.saved}
                setResChat={setResChat}
            />

            {chatid === "new" ? (

                <ChatTemplet />

            ) : (

                <div ref={chatRef} onScroll={handleScroll} className="chatbox isFlex"    >

                    {resChat.messages.map((msg) => (
                        <div
                            className="join isFlex"
                            key={msg.id}
                        >
                            <My
                                time={msg.created_at}
                                msg={msg.question}
                            />

                            <His
                                canType={false}
                                chatRef={chatRef}
                                msg={msg.answer}
                            />
                        </div>
                    ))}

                    <div className="join isFlex">

                        {resMsg.question !== "" && (
                            <My
                                time={resMsg.created_at}
                                msg={resMsg.question}
                            />
                        )}

                        {resMsg.answer !== "" && (
                            <His
                                canType={true}
                                chatRef={chatRef}
                                msg={resMsg.answer}
                            />
                        )}

                    </div>

                    {req.loading && (
                        <MsgLoading
                            ref={chatRef}
                            msg="Thinking"
                        />
                    )}

                    {extra.showScroll && (
                        <div className="downBtn isFlex bi bi-arrow-down" onClick={scrollBottom}   >
                            <svg viewBox="0 0 24 24" fill="white"    >
                                <path d="M6.4569 9.73276C6.17123 10.0327 6.18281 10.5074 6.48276 10.7931C6.78271 11.0788 7.25744 11.0672 7.5431 10.7672L6.4569 9.73276ZM12.5431 5.51724C12.8288 5.21729 12.8172 4.74256 12.5172 4.4569C12.2173 4.17123 11.7426 4.18281 11.4569 4.48276L12.5431 5.51724ZM12.5431 4.48276C12.2574 4.18281 11.7827 4.17123 11.4828 4.4569C11.1828 4.74256 11.1712 5.21729 11.4569 5.51724L12.5431 4.48276ZM16.4569 10.7672C16.7426 11.0672 17.2173 11.0788 17.5172 10.7931C17.8172 10.5074 17.8288 10.0327 17.5431 9.73276L16.4569 10.7672ZM12.75 5C12.75 4.58579 12.4142 4.25 12 4.25C11.5858 4.25 11.25 4.58579 11.25 5H12.75ZM11.25 19C11.25 19.4142 11.5858 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19H11.25ZM7.5431 10.7672L12.5431 5.51724L11.4569 4.48276L6.4569 9.73276L7.5431 10.7672ZM11.4569 5.51724L16.4569 10.7672L17.5431 9.73276L12.5431 4.48276L11.4569 5.51724ZM11.25 5V19H12.75V5H11.25Z" />
                            </svg>
                        </div>
                    )}

                </div>
            )}

            {
                resChat.messages.length < 20 ?
                    <Message
                        messageRef={messageRef}
                        chatid={chatid}
                        req={req}
                        setReq={setReq}
                        resMsg={resMsg}
                        setResMsg={setResMsg}
                        setResChat={setResChat}
                    />
                    :
                    <div className="limitChat limitChatExtra">You’ve reached the limit for this chat. <span onClick={() => { window.location.href = "/merkit/bot/new" }} className="clk">Start a New Chat</span></div>

            }
            {!resChat.saved ? (
                <div className="sort flow">
                    This chat disappears in{" "}
                    <span>{extra.timeLeft}</span>{" "}
                    unless you save it.
                </div>
            ) : (
                <div className="sort flow">
                    This chat is{" "}
                    <span>saved</span>{" "}
                    and will stay here permanently.
                </div>
            )}

            {extra.chatLoading && (
                <Loading msg="Fetching chat from server . . ." />
            )}

        </div>
    );
}

