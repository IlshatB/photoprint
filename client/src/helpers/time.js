export const timingToProperCase = (d, n) => {
    if (d === 'm') {
        return n === 1 ? 'минуту' : n > 1 && n < 5 ? 'минуты' : 'минут'
    } else if (d === 'h') {
        return n=== 1 ? 'час' : n> 1 && n< 5 ? 'часа' : 'часов'
    } else if (d === 'd') {
        return n === 1 ? 'день' : n > 1 && n < 5 ? 'дня' : 'дней'
    }
}

export const getTimeByString = timing => {
    const d = timing.charAt(timing.length - 1)
    const n = parseInt(timing.substring(0, timing.length - 1))

    return `${n} ${timingToProperCase(d, n)}`
}