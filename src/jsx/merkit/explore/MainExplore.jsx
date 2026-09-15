import { Outlet, useNavigate } from "react-router-dom";

import "../../../css/merkit/explore-css/mainExplore.css";
import NavDiv from "./NavDiv";

export default function MainExplore() {

    const navigate = useNavigate();

    return (
        <div className="mainExplore isFlex wd">
            <div className="navDiv isFlex wd">
                <NavDiv name="Finder" />
                <NavDiv name="Map" />
                <NavDiv name="Timeline" />
            </div>
            <Outlet />

        </div>
    );
}