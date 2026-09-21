import "../../css/help-css/location.css";

import axios from "axios";
import Alert from "../Alert";
import { useEffect, useState } from "react";

export default function Location({ setLoc, loc }) {

    const [alert, setAlert] = useState({ msg: "", typ: "", locationName: "" });

    useEffect(() => {
        getLocation();
    }, []);

    async function getLocationName(latitude, longitude) {
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            // console.log(res.data.address)
            const locx = res.data.address.county + ", " + res.data.address.city + ", " + res.data.address.country
            setAlert((pre) => ({ ...pre, locationName: locx || "Location not found" }));

        } catch (error) {
            console.log(error);
            setAlert((pre) => ({ ...pre, typ: "wr", msg: "Unable to get location name." }));
        }
    }

    const getLocation = () => {

        if (!navigator.geolocation) {
            setAlert((pre) => ({ ...pre, typ: "wr", msg: "Geolocation is not supported by your browser" }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                setLoc((pre) => ({ ...pre, lati: latitude, longi: longitude }));

                getLocationName(latitude, longitude);
            },

            (error) => {
                console.log(error.message);
                setAlert((pre) => ({ ...pre, typ: "wr", msg: error.message || "Something went wrong while fetching location." }));
            }
        );
    };

    return (
        <>
            <div onClick={getLocation} className="getcurrLocation isFlex clk"  >
                📍&nbsp;<p>  {alert.locationName} </p>&nbsp;<i> (click to get current Location) </i>
            </div>
            <Alert msg={alert.msg} typ={alert.typ} setMsg={setAlert} />
        </>
    );
}