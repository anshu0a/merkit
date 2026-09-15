import "../../../css/merkit/chat-css/pop.css"
import {lang} from '../../../help/chat/array'

export default function Pop({ currentLang , setPop, fn  }) {

    function close() {
        setPop((pre) => ({ ...pre, langPop: false }));
    }


    return (
        <div onClick={close} className="pop isFlex glass">
            <div onClick={(e) => e.stopPropagation()} className="box">
                <h4>Language <span> {currentLang} </span></h4>
                <div className="data isFlex">
                    {lang.map((one) => (
                        <p
                            key={one[0]}
                            onClick={() => fn(one[1])}
                            className={`pp ${currentLang == one[1] && "curr"}`}
                        >{one[0]} &nbsp; <span>[ {one[1]} ]</span></p>))
                    }
                </div>
            </div>
        </div>
    )
}