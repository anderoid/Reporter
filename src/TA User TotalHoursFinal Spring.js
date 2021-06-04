let xlsx = require("xlsx")
const path = require('path')
const fs = require('fs')

let data = require('../utils/excel_util_import.js')()
let term_info = require('./term_info.js')()
const sortCode = require('./sortCode')
const excel_outputWriter = require('../utils/excel_util_output_writer.js')

let term = 'summer'.toLowerCase()
let start_month, end_month

term_info.forEach(termer => {
    if (termer.term === term) {
        start_month = termer.start_month
        end_month = termer.end_month
    }
})

let new_data = data.filter(record=>{
    let month_of_time_log = record["Date"].getMonth()
    if (month_of_time_log >= start_month && month_of_time_log <= end_month) {
        // console.log(record)
        return record
    }
})

new_data = new_data.map((record, index) => {
    let month_of_time_log = record["Date"].getMonth()

        let sum = 0;
        let last_name = ""
        let first_name = record["Name"].split(" ")[0]

        for (let i = 1; i < record["Name"].split(" ").length; i++)
            last_name += record["Name"].split(" ")[i]

        for (let i = 0; i < new_data.length; i++) {
            let recorder = new_data[i]
            if (record["Name"] === recorder["Name"]) {
                sum = sum + recorder["Total Course Hours"]
            }
        }
        record["First Name"] = first_name
        record["Last Name "] = last_name
        record["Total  Hours"] = sum.toFixed(2)
        return record;
})
new_data = sortCode(new_data, "First Name")



let uniqueChars = [];
new_data.forEach((c) => {
    if (c !== undefined) {
        let count = 0
        if (!uniqueChars.includes(c['Name'].split(" ")[0])) {
            for (let i = 0; i < uniqueChars.length; i++) {
                if (uniqueChars[i]["First Name"] === c['Name'].split(" ")[0]) {
                    count++;
                }
            }
            if (count === 0) {
                uniqueChars.push(
                    {
                        'First Name': c['First Name'],
                        "Last Name ": c["Last Name "],
                        "Total  Hours": Number(c["Total  Hours"])
                    }
                );
            }
        }
    }
});

excel_outputWriter(uniqueChars, `TA User TotalHoursFinal ${term}.xlsx`)
