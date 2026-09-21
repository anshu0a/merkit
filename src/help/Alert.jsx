import { useEffect, useState } from "react";
import "../css/help-css/alert.css";
//                               su - er - wr
export default function Alert({ msg, typ, setMsg }) {

    useEffect(() => {

        const timer = setTimeout(() => {
            setMsg((pre) => ({ ...pre, msg: "" }))
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg]);

    return (
        <>
            {msg != "" && <div className={`alertu ${typ}x`}>  {msg} </div>}
        </>
    );
}