const final_course_hours = (term) => {
    const sortCode = require('./sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')
    let new_data = require('../utils/term_data_returner')(term)

    new_data = new_data.map(record => {
        let sum = 0;
        new_data.forEach((recorder) => {
            if (record["Course Name"] === recorder["Course Name"])
                sum = sum + recorder["Total Course Hours"]
        })
        record["Course Hours"] = sum.toFixed(2)
        return record;
    })
    new_data = sortCode(new_data, "Course Name")

    let uniqueChars = [];
    new_data.forEach((c) => {
        let count = 0
        if (!uniqueChars.includes(c['Course Name'])) {
            uniqueChars.forEach((unique_record) => {
                if (unique_record["Course Name"] === c["Course Name"])
                    count += 1
            })
            if (count === 0) {
                uniqueChars.push(
                    {
                        'Course Name': c['Course Name'],
                        'Course Hours': Number(c['Course Hours'])
                    }
                );
            }
        }
    });
    excel_outputWriter(uniqueChars, `${term} 2021 Final Course Hours .xlsx`)
}

module.exports = final_course_hours
