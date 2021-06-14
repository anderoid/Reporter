const Ta_work_performedFinal = (new_data, term, year) => {
    const sortCode = require('../utils/sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')
    let regex_number_space_remover_new = /(,\s+)?\d+\)(\s+)?/g;

    const bummer = []
    const randomer = []

    new_data = sortCode(new_data, "CourseName")

    new_data = new_data.map(record => {
        if (record["Hours of Work"] !== undefined) {
            let hours_of_work_splitter = record['Hours of Work'].split(",").map(item => {
                return Number(item.replace(regex_number_space_remover_new, ''))
            })
            record = record['Work Performed'].split(regex_number_space_remover_new).filter(item => {
                return item !== ", " && item !== " " && item !== "" && item !== undefined;
            }).map((item, index) => {
                let boomer = item.replace(regex_number_space_remover_new, '')
                if (isNaN(new_data[boomer])) {
                    new_data[boomer] = 0
                    new_data[boomer] += hours_of_work_splitter[index]
                } else {
                    new_data[boomer] += hours_of_work_splitter[index]
                }
                record[boomer] = new_data[boomer]
                bummer[boomer] = new_data[boomer]
                return record
            })
            return record;
        }
    })
    for (const [key, value] of Object.entries(bummer)) {
        randomer.push(
            {
                WorkPerformed: key,
                Hours: value
            }
        )
    }
    excel_outputWriter(randomer, {
        course_name: `TA Work Performed Final 21`,
        term: term,
        year: year
    });
}
module.exports = Ta_work_performedFinal
