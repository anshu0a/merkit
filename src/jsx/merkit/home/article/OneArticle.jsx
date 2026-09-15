import { useState } from "react"
import "../../../../css/merkit/home/article-css/oneArticle.css"
import { getBorderColor } from "../../../../help/merkit/nav"
import { timeAgo, checkTime } from "../../../../help/time"

export default function OneArticle({ data }) {
    const [checkDate] = useState(checkTime(data.date));
    return (
        <div style={{ borderLeft: `2px dashed ${getBorderColor()}` }} className="oneArticle isFlex wd">
            <div className="flotBox isFlex clk2">
                <img src={data.userimg} alt={data.username} className="picMe" />
                <div className="usenm">{data.username}{checkDate != 0 && <span className={`${checkDate != 1 && "gunx"}`}></span>}</div>
            </div>
            <div className="prt1 isFlex">
                <div className="extra">{timeAgo(data.date)}</div>
                <p className="head wd">{data.title}</p>
                <p className="arcl wd">{data.article}</p>
                <i className="urnm clk">~&nbsp;{data.name}</i>
            </div>
            <div className="prt2 isFlex">
                {
                    data.imgs.map((srx, ind) => (
                        <div key={ind} className="cvr">
                            <img className="imgy" src={srx} />
                        </div>
                    ))
                }
            </div>
            <div className="btm wd isFlex">
                <p className="hash clk">{data.hashtag}</p>
                <div className="likes isFlex ">
                    {
                        data.emojie.map((one, ind) => (
                            <div key={ind} className="face">{one}</div>
                        ))
                    }
                </div>
            </div>
            <div className="command isFlex wd">
                <div className="opts">
                    <div className="cmti clk isFlex">
                        <svg viewBox="4.5 4.5 16 16">
                            <path d="M12.4997 18.9911L9.5767 15.9911L6.6767 12.9911C5.10777 11.3331 5.10777 8.73809 6.6767 7.08009C7.44494 6.34175 8.48548 5.95591 9.54937 6.01489C10.6133 6.07387 11.6048 6.57236 12.2867 7.39109L12.4997 7.60009L12.7107 7.38209C13.3926 6.56336 14.3841 6.06487 15.448 6.00589C16.5119 5.94691 17.5525 6.33275 18.3207 7.07109C19.8896 8.72909 19.8896 11.3241 18.3207 12.9821L15.4207 15.9821L12.4997 18.9911Z"></path>
                        </svg>
                        <p>{data.likes}</p>
                    </div>
                    <div className="emjy isFlex">
                        <p className="xx clk">❤️</p>
                        <p className="xx clk">✔️</p>
                        <p className="xx clk">❔</p>
                        <p className="xx clk">👎</p>
                        <p className="xx clk">💔</p>
                    </div>
                </div>
                <div className="cmti clk isFlex">
                    <svg viewBox="3.5 2.5 18 18">
                        <path d="M5.5 12.9543C5.51239 14.0398 5.95555 15.076 6.73197 15.8348C7.50838 16.5936 8.55445 17.0128 9.64 17.0003H11.646C12.1915 17.0007 12.7131 17.224 13.09 17.6183L14.159 18.7363C14.3281 18.9076 14.5588 19.004 14.7995 19.004C15.0402 19.004 15.2709 18.9076 15.44 18.7363L17.1 17.0003L17.645 16.3923C17.7454 16.2833 17.8548 16.1829 17.972 16.0923C18.9349 15.3354 19.4979 14.179 19.5 12.9543V8.04428C19.4731 5.7845 17.6198 3.97417 15.36 4.00028H9.64C7.38021 3.97417 5.5269 5.7845 5.5 8.04428V12.9543Z" ></path>
                    </svg>
                    <p>{data.comment}</p>
                </div>
            </div>
        </div>
    )
}