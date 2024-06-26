export function minutesToHumanReadable(minutes: number): string {
    let hours = Math.floor(minutes / 60)
    let leftovers = Math.floor(minutes - (hours * 60))

    if (hours && leftovers > 0) {
        return `${hours} hours, ${leftovers} minutes`
    }

    if (hours && leftovers === 0) {
        return `${hours} hours`
    }

    if (hours === 0 && leftovers !== 0) {
        return `${leftovers} minutes`
    }
}

export function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color.toUpperCase();
}