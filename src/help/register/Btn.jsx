import "../../css/help/btn.css"

export default function({msg, fn, typ}){
    return (
        <div onClick={fn} className={`btn clk typ${typ}`}>
           {msg}
        </div>
    )
}