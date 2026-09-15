import '../../../css/merkit/chat-css/his_my.css'
import ReactMarkdown from "react-markdown";

export default function My({ msg, time }) {
    return (
        <div className="mainMy isFlex">
            <div className="my glass">
                <pre style={{fontFamily:"inherit"}}>
                    {msg}
                </pre>
            </div>
            <p className="time m-0">
                {time != null &&
                    new Date(time).toLocaleTimeString(
                        "en-US",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        }
                    )
                }
            </p>
        </div>
    )
}