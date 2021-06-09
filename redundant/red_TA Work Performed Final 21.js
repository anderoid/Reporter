const sortCode = require('../utils/sortCode')
const excel_outputWriter = require('../utils/excel_util_output_writer.js')

const term = 'spring', year = 2021
let new_data = require('../utils/term_data_returner')(term, year)

let regex_number_space_remover = /.*\)(\s+)?/g;


// for (let i = 0; i < new_data.length; i++) {
//
//     let hours_of_work_splitter = new_data[i]['Hours of Work'].split(",").map(item => {
//         return Number(item.replace(regex_number_space_remover, ''))
//     })
//
//     // console.log(hours_of_work_splitter)
//
//     let work_performed_split = new_data[i]['Work Performed'].split(",").map((item, index) => {
//
//         // console.log(`item = ${item}`)
//
//         let boomer = item.replace(regex_number_space_remover, '')
//         // console.log(`Howdy - ${boomer}`)
//
//         if (isNaN(new_data[boomer])) {
//             // console.log("Entered here for ", item)
//             new_data[boomer] = 0
//             new_data[boomer] += hours_of_work_splitter[index]
//         } else {
//             new_data[boomer] += hours_of_work_splitter[index]
//         }
//         return item.replace(regex_number_space_remover, '')
//     })
//     // let hours_of_work_split = new_data[i]['Hours of Work']
//
//     // console.log(work_performed_split)
//     // console.log(hours_of_work_split)
//
//
// }

new_data = new_data.map(record => {
    let hours_of_work_splitter = record['Hours of Work'].split(",").map(item => {
        return Number(item.replace(regex_number_space_remover, ''))
    })

    record = record['Work Performed'].split(",").map((item, index) => {

        // console.log(`item = ${item}`)

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
        return record
    })
    return record;
})


console.log(new_data)




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

// excel_outputWriter(new_data, `workers_perf.xlsx`, term)
