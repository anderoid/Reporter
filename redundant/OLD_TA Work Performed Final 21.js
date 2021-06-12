const Ta_work_performedFinal = (term, year) => {
    const sortCode = require('../utils/sortCode')
    const excel_outputWriter = require('../utils/excel_util_output_writer.js')

    let new_data = require('../utils/term_data_returner')(term, year)

    new_data = new_data.map(record => {
        let sum = 0;

        new_data.forEach((recorder) => {
            if (record["Work Performed"] === recorder["Work Performed"])
                sum = sum + recorder["Total Course Hours"]
        })

        record["Work Performed"] = record["Work Performed"]
        record["Hours"] = sum
        return record;
    })

    new_data = sortCode(new_data, "Work Performed")

    let uniqueChars = [];
    new_data.forEach((c) => {
        let count = 0
        if (!uniqueChars.includes(c['Work Performed'])) {

            uniqueChars.forEach((unique_record) => {
                if (unique_record["Work Performed"] === c['Work Performed'])
                    count += 1
            })
            if (count === 0) {
                uniqueChars.push(
                    {
                        'Work Performed': c['Work Performed'],
                        'Hours': Number(c['Hours'])
                    }
                );
            }
        }
    });

    excel_outputWriter(uniqueChars, `TA Work Performed Final 21.xlsx`, term)
}
module.exports = Ta_work_performedFinal
