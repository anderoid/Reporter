const sortCode = require('./sortCode')

let xlsx = require("xlsx")
let wb = xlsx.readFile("./mainFile/TA Time Log Spring2021.xlsx", {cellDates: true})

let ws = wb.Sheets["Sheet1"]

let data = xlsx.utils.sheet_to_json(ws)

let new_data = data.map(record => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        let recorder = data[i]
        if (record["Work Performed"] === recorder["Work Performed"]) {
            sum = sum + recorder["Total Course Hours"]
        }
    }

    record["Work Performed"] = record["Work Performed"]
    record["Hours"] = sum.toFixed(2)


    return record;

})

new_data = sortCode(new_data, "Work Performed")

let uniqueChars = [];
new_data.forEach((c) => {

    let count = 0
    if (!uniqueChars.includes(c['Work Performed'])) {
        for (let i = 0; i < uniqueChars.length; i++) {
            if (uniqueChars[i]["Work Performed"] === c['Work Performed']) {
                count++;
            }
        }
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
let newWb = xlsx.utils.book_new();

let newWS = xlsx.utils.json_to_sheet(uniqueChars)
xlsx.utils.book_append_sheet(newWb, newWS, "New Data");

xlsx.writeFile(newWb, "./outputFiles/TA Work Performed Final 2.xlsx");
