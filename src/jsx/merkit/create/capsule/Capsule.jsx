import { useEffect } from "react";
import "../../../../css/merkit/create-css/capsule.css"



export default function Capsule() {
    useEffect(() => {
        document.title = "Plant Capsule";
    }, []);

    return (
        <>
            <p className="def">Plant a moment, share your emotions, and create a capsule<br /> that will hold your story.
            </p>
            <div className="capsule wd isFlex">
                capsule
            </div>
        </>
    )
}