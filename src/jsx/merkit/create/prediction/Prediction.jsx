import "../../../../css/merkit/create-css/prediction.css"
import { useEffect, useState } from "react";
export default function Prediction() {
    const [data, setData] = useState({ pdf: [], img: [] })
    useEffect(() => {
        document.title = "Predict Somthing";
    }, []);
    return (
        <>
            <p className="def">Write your prediction, lock it in time, and meet the future when the moment arrives.</p>
            <div className="prediction wd isFlex">
                <div className="inpBoxx wd isFlex">
                    <label htmlFor="predict">What do you predict ? <sup>*</sup></label>
                    <input className="inpText" type="text" id="predict" placeholder="Type Your Answer . . ." />
                </div>
                <div className="inpBoxx wd isFlex">
                    <label htmlFor="predictionType">Prediction Type</label>
                    <select className="inpText" defaultValue="random" id="predictionType" name="predictionType"   >
                        <option value="career">💼 Career</option>
                        <option value="love">🤞 Fun</option>
                        <option value="love">❤️ Love</option>
                        <option value="money">💰 Money</option>
                        <option value="travel">✈️ Travel</option>
                        <option value="education">🎓 Education</option>
                        <option value="achievement">🏆 Achievement</option>
                        <option value="personal-growth">🌱 Personal Growth</option>
                        <option value="random">⚡ Something Random</option>
                    </select>
                </div>
                <div className="inpBoxx wd isFlex">
                    <label htmlFor="dt">When should we reveal it ?  <sup>*</sup></label>
                    <input className="inpText" type="date" id="dt" placeholder="Type Your Answer . . ." />
                    <div className="opts isFlex wd">
                        <div className="sec isFlex">
                            <label className="isFlex wd clk">
                                <input type="radio" name="timeline" value="1-week" />
                                <span className="wd flow">⚡ This Week</span>
                            </label>

                            <label className="isFlex wd clk">
                                <input type="radio" name="timeline" value="1-month" />
                                <span className="wd flow">🌙 This Month</span>
                            </label>
                        </div>

                        <div className="sec isFlex">
                            <label className="isFlex wd clk">
                                <input type="radio" name="timeline" value="6-months" />
                                <span className="wd flow">🌱 Next 6 Months</span>
                            </label>

                            <label className="isFlex wd clk">
                                <input type="radio" name="timeline" value="1-year" />
                                <span className="wd flow">🚀 Within a Year</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="inpBoxx wd isFlex">
                    <label htmlFor="why">Why do you believe this ?</label>
                    <input className="inpText" type="text" id="why" placeholder="Type Your Answer . . ." />
                </div>
                <div className="inpBoxx wd isFlex">
                    <label>Add Supporting Files</label>
                    <div className="disBox wd isFlex">

                    </div>
                    {
                        (data.img.length + data.pdf.length) <= 5 &&
                        <div className="inpDivu isFlex wd">
                            <input onChange={(e) => imageLoad(e)} accept="image/*" type="file" id="iinng" hidden multiple />
                            <label htmlFor="iinng" className="sec clk isFlex" >
                                <svg className="svgxx" viewBox="0 0 24 24">
                                    <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" ></path>
                                    <path d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V12.0309C22.75 13.9397 22.75 15.5023 22.6463 16.7745C22.5422 18.0531 22.3287 19.1214 21.8509 20.0087C21.6401 20.4001 21.3812 20.7506 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.14086 20.2726 1.7312 19.2852 1.51335 18.0604C1.29935 16.8573 1.2602 15.3603 1.25207 13.5015C1.25 13.0287 1.25 12.5286 1.25 12.001L1.25 11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62178 2.75 12C2.75 12.5287 2.75 13.0257 2.75205 13.4949C2.76025 15.369 2.80214 16.7406 2.99017 17.7978C3.17436 18.8333 3.48774 19.4981 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62178 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.2151 19.7953 20.3872 19.5631 20.5302 19.2976C20.8619 18.6816 21.0531 17.8578 21.1513 16.6527C21.2494 15.4482 21.25 13.9459 21.25 12C21.25 9.62178 21.2484 7.91356 21.0736 6.61358C20.9018 5.33517 20.5749 4.56445 20.0052 3.9948C19.4355 3.42514 18.6648 3.09825 17.3864 2.92637C16.0864 2.75159 14.3782 2.75 12 2.75C9.62178 2.75 7.91356 2.75159 6.61358 2.92637Z" ></path> <path opacity="0.4" d="M20.6069 19.1463L17.7765 16.599C16.737 15.6634 15.1889 15.5702 14.0446 16.3744L13.7464 16.5839C12.9513 17.1428 11.8695 17.0491 11.1822 16.3618L6.89252 12.0721C6.03631 11.2159 4.66289 11.1702 3.75162 11.9675L2.75049 12.8435C2.75077 13.0665 2.75128 13.2835 2.7522 13.4949C2.7604 15.369 2.80229 16.7406 2.99032 17.7978C3.17451 18.8333 3.48788 19.4981 3.99494 20.0052C4.5646 20.5749 5.33532 20.9018 6.61372 21.0736C7.9137 21.2484 9.62192 21.25 12.0001 21.25C14.3784 21.25 16.0866 21.2484 17.3866 21.0736C18.665 20.9018 19.4357 20.5749 20.0054 20.0052C20.2153 19.7953 20.3873 19.5631 20.5303 19.2976C20.5568 19.2485 20.5823 19.1981 20.6069 19.1463Z" ></path>
                                </svg>
                                <p>Add Image</p>
                            </label>
                            <input onChange={(e) => pdfLoad(e)} accept="application/pdf" type="file" id="ipdf" multiple hidden />
                            <label htmlFor="ipdf" className="sec clk isFlex" >
                                <svg className="svgxx" viewBox="0 0 24 24" >
                                    <path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" />
                                    <path opacity="0.5" d="M16.4149 17.9745C16.2064 18.6128 15.8398 19.1903 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1496 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7152C2.15033 12.4601 1.84821 11.3325 2.07573 10.3568C2.25537 9.5863 2.65945 8.88641 3.23687 8.3456C3.96815 7.66068 5.09569 7.35856 7.35077 6.75431C7.7774 6.64 8.16369 6.53649 8.51621 6.44534C8.51618 6.44545 8.51624 6.44524 8.51621 6.44534C8.43979 6.72513 8.3591 7.02657 8.27222 7.35081L7.75458 9.28266C7.15033 11.5377 6.84821 12.6653 7.07573 13.6411C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6393 12.3508 17.2435C14.3833 17.7881 15.4999 18.0873 16.4149 17.9745Z" />
                                </svg>
                                <p>Attach PDF</p>
                            </label>
                        </div>
                    }
                </div>
                <div className="inpBoxx wd isFlex">
                    <label>How confident are you about this prediction?</label>
                    <div className="opts isFlex wd">
                        <div className="sec isFlex">
                            <label className="isFlex wd clk">
                                <input id="e1" type="radio" name="confidence" value="guess" />
                                <span className="wd flow">😅 Guess</span>
                            </label>

                            <label className="isFlex wd clk">
                                <input id="e2" type="radio" name="confidence" value="maybe" />
                                <span className="wd flow">🤞 Maybe</span>
                            </label>
                        </div>
                        <div className="sec isFlex">
                            <label className="isFlex wd clk">
                                <input id="e3" type="radio" name="confidence" value="pretty-sure" />
                                <span className="wd flow">😏 Sure</span>
                            </label>

                            <label className="isFlex wd clk">
                                <input id="e4" type="radio" name="confidence" value="certain" />
                                <span className="wd flow">🎯 Certain</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="btnx clk">Publish Prediction</div>
            </div>
        </>
    )
}