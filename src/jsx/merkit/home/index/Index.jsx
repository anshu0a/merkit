import "../../../../css/merkit/home/index-css/tab.css"
import { useNavigate } from "react-router-dom";
import OneTab from "./OneTab";


export default function Index({ fun }) {
    const navigate = useNavigate();

    return (
        <div className="indexx isFlex">
            <OneTab name="Home" fn={() => { fun(true); navigate("/merkit/home"); }} />
            <OneTab name="Explore" fn={() => { fun(true); navigate("/merkit/explore"); }} />
            <OneTab name="Create" fn={() => { fun(true); navigate("/merkit/create"); }} />
            <OneTab name="Bot" fn={() => { fun(true); navigate("/merkit/bot/new"); }} />
            <OneTab name="Notifications" fn={() => { fun(true); navigate("/merkit/notification"); }} />
            <OneTab name="More" fn={() => { }} />
        </div>
    );
}