export function isYesterday(date: Date): boolean {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    // Check for leap year and adjust for February 29th
    if (yesterday.getMonth() === 1 && yesterday.getDate() === 29) {
        if (!isLeapYear(yesterday.getFullYear())) {
            yesterday.setDate(28);
        }
    }
  
    return (
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate()
    );
}

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isToday(date: Date): boolean {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
}

export default function formatDate(date: Date): string {
    let time = date.toLocaleTimeString();
    time = time.slice(0, time.length-6) + ' ' + time.slice(time.length-2,) ;
    /*
    if (isToday(date)) {
      return `Today at ${time}`;
    }
    if (isYesterday(date)) {
        return `Yesterday at ${time}`;
    }
    */
    const day = date.toLocaleDateString();
    return day + ' ' + time;
}