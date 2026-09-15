import { useState } from "react"
import "../../../css/register/mainForm.css"
import NamePrt from "./NamePrt"
import OtpPrt from "./OtpPrt"
import OverviewPrt from "./OverviewPrt"

export default function MainForm({ setPage, page }) {
    const [create, setCreate] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" })
    return (
        <div className="mainForm isFlex wd">
            {
                page == 1 ?
                    <NamePrt create={create} setCreate={setCreate} setPage={setPage} />
                    : page == 2 ?
                        <OtpPrt create={create} setCreate={setCreate} setPage={setPage} />
                        : page == 3 ?
                            <OverviewPrt create={create} setCreate={setCreate} setPage={setPage} />
                            :
                            <></>
            }



        </div>
    )
}