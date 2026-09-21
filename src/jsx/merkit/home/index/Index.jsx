import "../../../../css/merkit/home/index-css/tab.css"
import { useNavigate } from "react-router-dom";
import OneTab from "./OneTab";


export default function Index({ fun }) {
    const navigate = useNavigate();

    return (
        <div className="indexx isFlex">
            <OneTab name="Home" fn1={fun} fn2={() => navigate("/merkit/home")} />
            <OneTab name="Explore" fn1={fun} fn2={() => navigate("/merkit/explore")} />
            <OneTab name="Create" fn1={fun} fn2={() => navigate("/merkit/create")} />
            <OneTab name="Bot" fn1={fun} fn2={() => navigate("/merkit/bot/new")} />
            <OneTab name="Notifications" fn1={fun} fn2={() => navigate("/merkit/notification")} />
            <OneTab name="Works" fn1={fun} fn2={() => navigate("/merkit/works")} />
            <OneTab name="More" fn1={fun} fn2={() => { }} />
        </div>
    );
}