export const TimeFormatter = (data: Date) => {
    const date = new Date(data);
    return new Intl.DateTimeFormat("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).format(date);
}


function isSameDay(d1: Date, d2: Date) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

function getYesterDay() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}


export const DateFormatter = (data: Date) => {
    const date = new Date(data);
    const today = new Date();
    const yesterday = getYesterDay();

    if (isSameDay(date, today)) {
        return "today"
    }
    else if (isSameDay(date, yesterday)) {
        return "yesterday"
    }
    else {
        return new Intl.DateTimeFormat("en-us", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(date);
    }
}