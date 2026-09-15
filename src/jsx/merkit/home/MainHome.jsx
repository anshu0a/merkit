import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "../../../css/merkit/home/mainHome.css"

export default function MainHome() {
    const navigate = useNavigate();
    const path = window.location.pathname.split("home");
    return (
        <>
            <div className="mainHome wd isFlex">
                <div className="navBlock isFlex wd">
                    <div onClick={() => navigate(`/merkit/home`)} className={`secx isFlex wd clk ${path[path.length - 1] == "" && "curx"}`}>Articles</div>
                    <div onClick={() => navigate(`/merkit/home/posts`)} className={`secx isFlex wd clk ${path[path.length - 1] == "/posts" && "curx"}`}>Posts</div>
                    <div onClick={() => navigate(`/merkit/home/capsules`)} className={`secx isFlex wd clk ${path[path.length - 1] == "/capsules" && "curx"}`}>Capsules</div>
                    <div onClick={() => navigate(`/merkit/home/tranding`)} className={`secx isFlex wd clk ${path[path.length - 1] == "/tranding" && "curx"}`}>Tranding</div>
                </div>
                <Outlet />
            </div>
        </>
    )
}