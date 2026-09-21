import { useState } from "react";

export default function VideoElement({ src ,removeAttachment , ind}) {
    const [pause, setPause] = useState(true)

    function handleVideo(e, flag) {
        const vdo = e.currentTarget.parentElement.children[2]
        if (flag) {
            vdo.play();
            setPause(false);
        }
        else {
            vdo.pause();
            setPause(true);
        }
    }


    return (
        <div className="oneMedia isFlex">
            <svg onClick={() => removeAttachment("video", ind)} className="cuty clk isFlex" viewBox="0 0 24 24" fill="none">
                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#fbfbfb"></path>
            </svg>
            {
                pause ?
                    <svg onClick={(e) => handleVideo(e, true)} className="playPause clk" viewBox="0 0 24 24" fill="none">
                        <path d="M10.715 6.36694L16.4 10.6639C16.7719 10.9289 16.9927 11.3573 16.9927 11.8139C16.9927 12.2706 16.7719 12.699 16.4 12.9639L10.71 17.6639C10.2297 18.0453 9.5794 18.1339 9.01458 17.8948C8.44975 17.6558 8.06062 17.1273 8.00003 16.5169V7.51694C8.05845 6.90422 8.44802 6.37281 9.01478 6.13275C9.58154 5.89269 10.2343 5.9826 10.715 6.36694Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    :
                    <svg onClick={(e) => handleVideo(e, false)} className="playPause clk" viewBox="0 0 24 24" fill="none">
                        <path d="M7.00002 9.125V14.875C6.99816 15.1715 7.11417 15.4566 7.32252 15.6676C7.53087 15.8786 7.81451 15.9981 8.11102 16H9.22202C9.51854 15.9981 9.80217 15.8786 10.0105 15.6676C10.2189 15.4566 10.3349 15.1715 10.333 14.875V9.125C10.3349 8.82849 10.2189 8.54338 10.0105 8.3324C9.80217 8.12142 9.51854 8.00185 9.22202 8H8.11102C7.81451 8.00185 7.53087 8.12142 7.32252 8.3324C7.11417 8.54338 6.99816 8.82849 7.00002 9.125Z" stroke="#faf8f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13.667 9.125V14.875C13.6652 15.1715 13.7812 15.4566 13.9895 15.6676C14.1979 15.8786 14.4815 15.9981 14.778 16H15.889C16.1855 15.9981 16.4692 15.8786 16.6775 15.6676C16.8859 15.4566 17.0019 15.1715 17 14.875V9.125C17.0019 8.82849 16.8859 8.54338 16.6775 8.3324C16.4692 8.12142 16.1855 8.00185 15.889 8H14.778C14.4815 8.00185 14.1979 8.12142 13.9895 8.3324C13.7812 8.54338 13.6652 8.82849 13.667 9.125V9.125Z" stroke="#f7f3f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
            }
            <video onEnded={() => setPause(true)} width="500">
                <source
                    src={src}
                    type="video/mp4" />
            </video>
        </div>
    )
}