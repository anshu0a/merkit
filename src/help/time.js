
// ---- TIME REMAINING IN hOURS AND MINUTS -------------------

function getRemainingTime(date, hr) {
    const start = new Date(date).getTime();
    const remaining = (hr * 60 * 60 * 1000) - (Date.now() - start);

    if (remaining <= 0) {
        return "Expired";
    }

    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    return `${(hours + minutes / 60).toFixed(2)} hours`;
}

// ---- TIME IN FORMATE [ 12th JAN 2026 ] ----------------

const getDate = (date = new Date()) => {
    const day = date.getDate();
    const year = date.getFullYear();

    const suffix =
        day >= 11 && day <= 13 ? "th" :
            day % 10 === 1 ? "st" :
                day % 10 === 2 ? "nd" :
                    day % 10 === 3 ? "rd" :
                        "th";

    const month = date.toLocaleString("en-US", {
        month: "short"
    });

    return `${day}<sup>${suffix}</sup>&nbsp; ${month} ${year}`;
};


//--------------------- 2 days ago

function timeAgo(date) {
    const past = new Date(date);
    const now = new Date();

    if (isNaN(past.getTime())) return "Invalid date";

    const diff = now - past;

    if (diff < 0) return "Future";

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (days < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

    const months = Math.floor(days / 30);
    if (days < 365) return `${months} ${months === 1 ? "month" : "months"} ago`;

    const years = now.getFullYear() - past.getFullYear();

    return `${years} ${years === 1 ? "year" : "years"} ago`;
}
//--------------------- WITHIN 24hr, 12hr  OR NOT 

function checkTime(date) {
    const givenDate = new Date(date);
    const now = new Date();

    const diff = now - givenDate;

    const twelveHours = 12 * 60 * 60 * 1000;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (diff >= 0 && diff <= twelveHours) {
        return -1;
    }

    if (diff > twelveHours && diff <= twentyFourHours) {
        return 1;
    }

    return 0;
}


export { getRemainingTime, getDate,timeAgo, checkTime  };

// TIME REMAINING IN hOURS AND MINUTS
// TIME IN FORMATE [ 12th JAN 2026 ] 
// 2 days ago
// WITHIN 24hr, 12hr  OR NOT 