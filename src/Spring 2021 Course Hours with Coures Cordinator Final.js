const course_hours_course_cordinator = (term) => {
    const sortCode = require('./sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')
    let new_data = require('../utils/term_data_returner')(term)

    console.log(new_data)


    new_data = new_data.map(record => {
        let sum = 0;
        let recorder, course_name, coordinator_name

        for (let i = 0; i < new_data.length; i++) {
            sum = 0;
            recorder = new_data[i]
            course_name = recorder["Course Name"]
            coordinator_name = recorder["Coordinator Name"]

            for (let j = 0; j < new_data.length; j++) {
                let recorders = new_data[j]
                // if (recorders["Course Name"] === course_name && recorders["Coordinator Name"] === coordinator_name) {
                if (recorders["Course Name"] === record["Course Name"] && recorders["Coordinator Name"] === record["Coordinator Name"]) {
                    sum = sum + recorders["Total Course Hours"]
                }
            }
            record["CourseName"] = record["Course Name"]
            record["CourseCoordinatorName"] = record["Coordinator Name"]
            record["CourseHours"] = sum.toFixed(2)
        }
        return record;
    })
    new_data = sortCode(new_data, "CourseName")

    let uniqueChars = [];
    new_data.forEach((c) => {

        let count = 0
        if (!uniqueChars.includes(c['CourseCoordinatorName'])) {
            uniqueChars.forEach((unique_record) => {
                if (unique_record["CourseCoordinatorName"] === c["CourseCoordinatorName"] && unique_record["CourseName"] === c["CourseName"])
                    count += 1
            })


            if (count === 0) {
                uniqueChars.push(
                    {
                        'CourseName': c['CourseName'],
                        'CourseCoordinatorName': c['CourseCoordinatorName'],
                        'CourseHours': Number(c['CourseHours'])
                    }
                );
            }
        }
    });
    excel_outputWriter(uniqueChars, `${term} 2021 Course Hours with Coures Cordinator Final.xlsx`)

}
module.exports = course_hours_course_cordinator
