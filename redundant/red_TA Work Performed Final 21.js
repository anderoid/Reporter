const sortCode = require('../utils/sortCode')
const excel_outputWriter = require('../utils/excel_util_output_writer.js')

const term = 'spring', year = 2021
let new_data = require('../utils/term_data_returner')(term, year)


console.log(`new_data.length = ${new_data.length}`)
let regex_number_space_remover = /\d\)(\s+)?/g;
let regex_number_space_remover_new = /(,\s+)?\d+\)(\s+)?/g;
// let regex_number_space_remover = /.*\)(\s+)?|^[\s]+/g;

// console.log(new_data)
const bummer = []
const randomer = []

new_data = new_data.map((record, index) => {


    if (record["Hours of Work"] !== undefined) {
        let hours_of_work_splitter = record['Hours of Work'].split(",").map(item => {

            return Number(item.replace(regex_number_space_remover, ''))


        })

        // record = record['Work Performed'].split(",").map((item, index) => {
        record = record['Work Performed'].split(regex_number_space_remover_new).filter(item => {
            return item !== ", " && item !== " " && item !== "" && item !== undefined;
        }).map((item, index) => {


            console.log(`item = ${item} , index : ${index}`)

            let boomer = item.replace(regex_number_space_remover, '')
            // console.log(`Howdy - ${boomer}`)

            if (isNaN(new_data[boomer])) {
                // console.log("Entered here for ", item)
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
    console.log(`${key}: ${value}`);

    randomer.push(
        {
            WorkPerformed: key,
            Hours: value
        }
    )
}

console.log(randomer)

// new_data = new_data.map(record => {
//     let sum = 0;
//
//     new_data.forEach((recorder) => {
//         if (record["Work Performed"] === recorder["Work Performed"])
//             sum = sum + recorder["Total Course Hours"]
//     })
//
//     record["Work Performed"] = record["Work Performed"]
//     record["Hours"] = sum
//     return record;
// })
//
// new_data = sortCode(new_data, "Work Performed")
//
// let uniqueChars = [];
// new_data.forEach((c) => {
//     let count = 0
//     if (!uniqueChars.includes(c['Work Performed'])) {
//
//         uniqueChars.forEach((unique_record) => {
//             if (unique_record["Work Performed"] === c['Work Performed'])
//                 count += 1
//         })
//         if (count === 0) {
//             uniqueChars.push(
//                 {
//                     'Work Performed': c['Work Performed'],
//                     'Hours': Number(c['Hours'])
//                 }
//             );
//         }
//     }
// });

excel_outputWriter(randomer, `workers_perf.xlsx`, term)
