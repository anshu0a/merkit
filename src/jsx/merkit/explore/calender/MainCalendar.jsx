import { useState } from "react";
import "../../../../css/merkit/explore-css/mainCalendar.css";

export default function MainCalendar() {

    const [date, setDate] = useState(new Date());

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthName = date.toLocaleString("default", {
        month: "long"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    function previousMonth() {
        setDate(new Date(year, month - 1, 1));
    }

    function nextMonth() {
        setDate(new Date(year, month + 1, 1));
    }

    function isToday(day) {
        const today = new Date();

        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    }

    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(
            <div className="calendarDay empty" key={`empty-${i}`} />
        );
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <div
                className={`calendarDay isFlex ${isToday(day) ? "today" : ""}`}
                key={day}
            >
                <span>{day}</span>
            </div>
        );
    }

    return (
        <>
            <p className="def">
                Revisit your memories, discover your<br />  capsules, and relive the days that madethem special.
            </p>
            <div className="mainCalendar isFlex wd">

                <div className="calendarHeader">

                    <button className="isFlex" onClick={previousMonth}>
                        ‹
                    </button>

                    <div className="month">
                        <h2>{monthName}</h2>
                        <span>{year}</span>
                    </div>

                    <button className="isFlex" onClick={nextMonth}>
                        ›
                    </button>

                </div>

                <div className="weekHeader">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>

                <div className="calendarGrid">
                    {days}
                </div>

            </div>
        </>
    );
}