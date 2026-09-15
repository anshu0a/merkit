import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    Prism as SyntaxHighlighter
} from "react-syntax-highlighter";

import {  oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "../../../css/merkit/chat-css/his_my.css";

function His({ msg = "", chatRef, canType }) {

    const [text, setText] = useState("");
    const intervalRef = useRef(null);

    useEffect(() => {

        if (!canType) {

            setText(msg);
            return;
        }

        // render full code instantly
        if (msg.includes("```")) {

            setText(msg);

            requestAnimationFrame(() => {

                if (chatRef?.current) {

                    chatRef.current.scrollTo({
                        top: chatRef.current.scrollHeight,
                        behavior: "smooth"
                    });
                }
            });

            return;
        }

        let i = 0;

        setText("");

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {

            i += 1;

            setText(msg.slice(0, i));

            // smooth auto scroll
            if (i % 5 === 0) {

                requestAnimationFrame(() => {

                    if (chatRef?.current) {

                        chatRef.current.scrollTo({
                            top: chatRef.current.scrollHeight
                        });
                    }
                });
            }

            if (i >= msg.length) {

                clearInterval(intervalRef.current);
            }

        }, 15);

        return () => {

            clearInterval(intervalRef.current);
        };

    }, [msg, canType, chatRef]);

    return (

        <div className="mainHis isFlex">

            <div className="his">

                <ReactMarkdown
                    components={{

                        code({
                            inline,
                            className,
                            children
                        }) {

                            const match =
                                /language-(\w+)/.exec(className || "");

                            const code =
                                String(children).replace(/\n$/, "");

                            if (!inline && match) {

                                return (

                                    <div className="codeBox isFlex">

                                        <div className="codeTop isFlex">

                                            <span>
                                                {match[1]}
                                            </span>

                                            <svg
                                                onClick={() =>
                                                    navigator.clipboard.writeText(code)
                                                }
                                                className="cpy"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >

                                                <rect
                                                    x="9"
                                                    y="9"
                                                    width="11"
                                                    height="11"
                                                    rx="2"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                />

                                                <rect
                                                    x="4"
                                                    y="4"
                                                    width="11"
                                                    height="11"
                                                    rx="2"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                />

                                            </svg>

                                        </div>

                                        <SyntaxHighlighter
                                            language={match[1]}
                                            style={oneDark}
                                            PreTag="div"
                                            wrapLongLines={true}
                                        >
                                            {code}
                                        </SyntaxHighlighter>

                                    </div>
                                );
                            }

                            return (
                                <code className={className}>
                                    {children}
                                </code>
                            );
                        }

                    }}
                >
                    {text}
                </ReactMarkdown>

            </div>

        </div>
    );
}

export default memo(His);