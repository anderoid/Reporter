const sortCode = require('./utils/sortCode')
const excel_outputWriter = require('./redundant/output_excel_writer_red.js')


let term = 'spring'
let year = 2021

let new_data = require('./utils/term_data_returner')(term, year)
new_data = sortCode(new_data, "Name")


// new_data.map((record, index)=>{
//
//     console.log(record["Name"], `index : ${index+1}`)
//
// })


const object_holder = []
//
// const merge = [
//     {s: {r: 1, c: 0}, e: {r: 2, c: 0}}, {s: {r: 3, c: 0}, e: {r: 4, c: 0}},
// ];
// newWS["!merges"] = merge;


let record;
let next_record;
let end, start
for (let i = 0; i < new_data.length; i++) {

    let j = i + 1

    record = new_data[i]
    next_record = new_data[j]

    console.log(record["Name"])

    while (j < new_data.length && record["Name"] === new_data[j]["Name"]) {

        j++;

    }
    start = i;
    end = j;

    object_holder.push({

        s: {
            r: start+1, c: 0
        },
        e: {
            r: end, c: 0
        }
    })

    // console.log(object_holder)


}


excel_outputWriter(new_data, `mergers.xlsx`, term, object_holder)

// console.log(new_data)
