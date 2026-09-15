import "../../../css/register/bar.css"
import OneBar from "./OneBar"
export default function Bar({no}) {
    return (
        <div className="bar wd isFlex">
            <OneBar  img="username" on={no == 1} />
            <span  className="lines"></span>
            <OneBar img="verification" on={no == 2} />
            <span className="lines"></span>
            <OneBar img="overview" on={no == 3} />
        </div>
    )
}