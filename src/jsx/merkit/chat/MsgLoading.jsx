import '../../../css/merkit/chat-css/msg.css'

export default function MessageLoading({ msg }) {
    return (
        <div className="msgloading">
            {msg}&nbsp;
            <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
        </div>
    );
}