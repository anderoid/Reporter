let data = require('./excel_util_import.js')()
let term_info = require('../src/term_info.js')()

let start_month, end_month

const term_data_returner = (term) => {

    term_info.forEach(termer => {
        if (termer.term === term) {
            start_month = termer.start_month
            end_month = termer.end_month
        }
    })

    return data.filter(record => {
        let month_of_time_log = record["Date"].getMonth()
        if (month_of_time_log >= start_month && month_of_time_log <= end_month) {
            return record
        }
    })
}

module.exports = term_data_returner
