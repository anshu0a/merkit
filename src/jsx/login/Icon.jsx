
export default function Icon({ typ }) {
    if (typ === 1)
        return (<span className="input-group-text" id="basic-addon1">
            <svg width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="#fdfdfd" strokeLinecap="round" />
                <circle cx="12" cy="8" r="4" stroke="#f9f9f9" strokeLinecap="round" />
            </svg>
        </span>)
    else if (typ === 2)
        return (<span className="input-group-text" id="basic-addon1">
            <svg width="25px" viewBox="0 0 24 24" fill="none" >
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5737 7L12 13L3.42635 7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>)
    else if (typ === 3)
        return (<span className="input-group-text" id="basic-addon2">
            <svg className="svgg" fill="#ffffff" width="25" viewBox="0 0 24 24">
                <path d="M21,11V10a1,1,0,0,0-2,0v1H17V10a1,1,0,0,0-2,0v1H9.86a4,4,0,1,0,0,2H21a1,1,0,0,0,0-2ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Z" >
                </path>
            </svg>
        </span>)

}