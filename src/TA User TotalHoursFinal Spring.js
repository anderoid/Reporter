const TA_user_total_hours_final = (term, year) => {

    const sortCode = require('../utils/sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')
    let new_data = require('../utils/term_data_returner')(term, year)

    new_data = new_data.map(record => {
        let sum = 0;
        let last_name = ""
        let first_name = record["Name"].split(" ")[0]

        for (let i = 1; i < record["Name"].split(" ").length; i++)
            last_name += record["Name"].split(" ")[i]

        new_data.forEach((recorder) => {
            if (record.Name === recorder.Name)
                sum = sum + recorder["Total Course Hours"]
        })
        record["First Name"] = first_name
        record["Last Name "] = last_name
        record["Total  Hours"] = sum
        return record;
    })
    new_data = sortCode(new_data, "First Name")

    let uniqueChars = [];
    new_data.forEach((c) => {
        let count = 0
        if (!uniqueChars.includes(c['Name'].split(" ")[0])) {

            uniqueChars.forEach((unique_record) => {
                if (unique_record["First Name"] === c['Name'].split(" ")[0])
                    count += 1
            })
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
    });
    excel_outputWriter(uniqueChars, `TA User TotalHoursFinal ${term}.xlsx`, term)
}

module.exports = TA_user_total_hours_final
