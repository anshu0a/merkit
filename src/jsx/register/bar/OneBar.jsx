import "../../../css/register/bar.css"

export default function OneBar({img,on}) {
    return (
        <div className="sec isFlex">
            <img src={`/svg/${img}.svg`} className={on ? "glow insec1":"insec1"} />
            <div style={on? {color:"rgb(200, 255, 180)"}:{}} className="insec2">{img}</div>
        </div>

    )
}