const sortCode = require('./sortCode')

let xlsx = require("xlsx")
let wb = xlsx.readFile("TA Time Log Spring2021.xlsx", {cellDates: true})

let ws = wb.Sheets["Sheet1"]

let data = xlsx.utils.sheet_to_json(ws)


// let term_details = [
//     {
//         term_name: 'Summer',
//         term_start_date: new Date('01/01/2021'),
//         term_end_month: new Date('')
//     }
// ]

let new_data = data.map((record, index) => {

    // console.log(record["Date"])
    let month_of_time_log = record["Date"].getMonth()

    if (month_of_time_log >= 0 && month_of_time_log <= 4) {
        let sum = 0;
        let first_name, last_name = ""

        first_name = record["Name"].split(" ")[0]

        for (let i = 1; i < record["Name"].split(" ").length; i++) {
            last_name += record["Name"].split(" ")[i]
        }

        for (let i = 0; i < data.length; i++) {
            let recorder = data[i]
            if (record["Name"] === recorder["Name"]) {
                sum = sum + recorder["Total Course Hours"]
            }
        }

        record["First Name"] = first_name
        record["Last Name "] = last_name
        record["Total  Hours"] = sum.toFixed(2)


        return record;
    }

    console.log("Hey i am here ")

    data.splice(index, 1);

})
new_data = sortCode(new_data, "First Name")


let uniqueChars = [];
new_data.forEach((c) => {

    if (c !== undefined) {
        let count = 0
        if (!uniqueChars.includes(c['Name'].split(" ")[0])) {
            for (let i = 0; i < uniqueChars.length; i++) {
                if (uniqueChars[i]["First Name"] === c['Name'].split(" ")[0]) {
                    count++;
                }
            }
            if (count === 0) {
                uniqueChars.push(
                    {
                        'First Name': c['First Name'],
                        "Last Name ": c["Last Name "],
                        "Total  Hours": Number(c["Total  Hours"])
                    }
                );
            }
        }
    }
});
let newWb = xlsx.utils.book_new();

let newWS = xlsx.utils.json_to_sheet(uniqueChars)
xlsx.utils.book_append_sheet(newWb, newWS, "New Data");

xlsx.writeFile(newWb, "./outputFiles/TA User TotalHoursFinal Spring.xlsx");
console.log("Generated TA User TotalHoursFinal Spring.xlsx");
