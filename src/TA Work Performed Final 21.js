const Ta_work_performedFinal = (term, year) => {

    console.log(`term = : ${term}, year = ${year}`)

    const sortCode = require('../utils/sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')

    // const term = 'fall', year = 2020

    let new_data = require('../utils/term_data_returner')(term, year)
    // console.log(`new_data.length = ${new_data.length}`)
    let regex_number_space_remover_new = /(,\s+)?\d+\)(\s+)?/g;

    const bummer = []
    const randomer = []

    new_data = new_data.map((record, index) => {
        if (record["Hours of Work"] !== undefined) {
            let hours_of_work_splitter = record['Hours of Work'].split(",").map(item => {
                // console.log(record['Hours of Work'], Number(item.replace(regex_number_space_remover_new, '')))
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
        // console.log(`${key}: ${value}`);
        randomer.push(
            {
                WorkPerformed: key,
                Hours: value
            }
        )
    }
    console.log(randomer)
    excel_outputWriter(randomer, `TA Work Performed Final 21.xlsx`, term)

}

module.exports = Ta_work_performedFinal
