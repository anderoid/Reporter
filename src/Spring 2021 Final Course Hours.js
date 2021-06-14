const final_course_hours = (new_data, term, year) => {
    const sortCode = require('../utils/sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')

    new_data = new_data.map(record => {
        let sum = 0;
        new_data.forEach((recorder) => {
            if (record["Course Name"] === recorder["Course Name"])
                sum = sum + recorder["Total Course Hours"]
        })
        record["Course Hours"] = sum
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

    excel_outputWriter(uniqueChars, {
        course_name: `Final Course Hours`,
        term: term,
        year: year
    }, []);
}

module.exports = final_course_hours
