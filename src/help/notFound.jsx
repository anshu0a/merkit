import '../css/help/notFound.css'

export default function NotFound() {
    return (
        <div className="notfound wd isFlex">
            <h2>Page Not Found</h2>
            <p>The page you are looking for might have been removed, renamed,<br /> or is temporarily unavailable.</p>
            <img src="/notfound.svg" />
            <div className="isFlex btn-div">
                <div onClick={()=>{window.location.href = "/merkit/home"}} className="btn-home clk">Home</div>
                <div onClick={()=>{window.history.back()}} className="btn-home clk">Back</div>
            </div>
        </div>
    )
}