function isSameDay(d1: Date, d2: Date) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d1.getDate()
    )
}

function getYesterDay() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}


export function GetDateAndTime(data: any) {

    const today = new Date();
    const yesterday = getYesterDay();
    const ActualDate = new Date(data);

    const timeOptions: any = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }

    const dateOptions: any = {
        year: "numeric",
        month: "short",
        day: "2-digit",
    };

    if (isSameDay(ActualDate, today)) {
        return new Intl.DateTimeFormat("en-us", timeOptions).format(ActualDate);
    }
    else if (isSameDay(ActualDate, yesterday)) {
        return "yesterday"
    }
    else {
        return new Intl.DateTimeFormat("en-us", dateOptions).format(ActualDate);
    }

}