import { Outlet, } from "react-router-dom";

import "../../../css/merkit/explore-css/mainExplore.css";
import NavDiv from "../../merkit/explore/NavDiv";

export default function NavCreate() {


    return (
        <div className="mainExplore isFlex wd">
            <div className="navDiv isFlex wd">
                <NavDiv name="Article" />
                <NavDiv name="Capsule" />
                <NavDiv name="Prediction" />
            </div>
            <Outlet />

        </div>
    );
}