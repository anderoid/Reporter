let data = require('./excel_util_import.js')()
let term_info = require('./term_info.js')()

let start_month, end_month

const term_data_returner = (term, year) => {

    term_info.forEach(termer => {
        if (termer.term === term) {
            start_month = termer.start_month
            end_month = termer.end_month

        }
    })

    return data.filter(record => {
        let month_of_time_log = record["Date"].getMonth()
        let year_of_time_log = record["Date"].getFullYear()

        // console.log(`type of year_of_time_log = ${typeof year_of_time_log}`)
        // console.log(`type of year = ${typeof year}`)
        //
        // console.log(`year_of_time_log = ${year_of_time_log}`)
        // console.log(`year = ${year}`)

        if (month_of_time_log >= start_month && month_of_time_log <= end_month && year_of_time_log === year) {
            return record
        }
    })
}

module.exports = term_data_returner
