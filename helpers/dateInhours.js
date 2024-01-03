const DateHourss = (date) => {
    let dateTime = new Date()
    console.log('DDD', dateTime)
    let dateInhours = dateTime.getMinutes()
    return dateInhours
}

const InitialHour = (date) => {
    let dateTime = new Date(date) 
    let initialHour = dateTime.getMinutes()
    return initialHour
}
module.exports = {DateHourss, InitialHour}