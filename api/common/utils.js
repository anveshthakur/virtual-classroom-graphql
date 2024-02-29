export const isFutureDate = (epochString) => {
    const dateFromEpochString = new Date(Number(epochString))
    const curr_date = new Date()
    console.log('file: utils.js:5 ~ isFutureDate ~ curr_date::', curr_date)
    return dateFromEpochString > curr_date
}

export const convertToSqlDate = (epochString) => {
    const sqlDate = new Date(Number(epochString))
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    return sqlDate
}
