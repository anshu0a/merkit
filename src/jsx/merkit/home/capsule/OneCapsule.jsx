import "../../../../css/merkit/home/capsule-css/mainCapsule.css"
import axios from "axios";
import { useState, useEffect } from "react";

export default function OneCapsule({ data }) {
    const [locationName, setLocationName] = useState("");
    console.log(data)

    useEffect(() => {
        getLocationName();
    }, [])

    async function getLocationName() {
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, { params: { lat: data.latitude, lon: data.longitude, format: "json" }, headers: { "Accept-Language": "en" } });

            const address = res.data.address;

            const city = address.city || address.town || address.village || address.municipality || "";
            const district = address.county || address.state_district || "";
            const country = address.country || "";

            const locx = [district, city, country].filter(Boolean).join(", ");

            setLocationName(locx || "Location unavailable");

        } catch (error) {
            console.log(error);
            setLocationName("Location unavailable");
        }
    }


    return (
        <div className="oneCapsule isFlex wd">
            <div className="sect wd isFlex">
                <div className="picu">
                    <img className="img" src={data.thumbnail.url} />
                    <p className="ttl glass flow">{data.title}</p>
                    <div className="usext isFlex glass">
                        <img className="img" src={data.profilepic} alt={data.username} />
                        <div className="nming isFlex">
                            <p className="useu flow">{data.username}</p>
                            <p className="locu flow">{locationName}</p>
                        </div>
                    </div>
                </div>
                <div className="infou">
                    <p className="ttlu">{data.title}</p>
                    <p className="decx">{data.description} &nbsp; <i>~{data.name}</i></p>
                    
                </div>
            </div>
            <div className="sect2 wd isFlex">
                <div className="prtx">L</div>
                <div className="prtx">V</div>
            </div>
        </div>
    )
}