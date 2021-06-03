let xlsx = require("xlsx")
let wb = xlsx.readFile("TA Time Log Spring2021.xlsx", {cellDates: true})

let ws = wb.Sheets["Sheet1"]

let data = xlsx.utils.sheet_to_json(ws)

let new_data = data.map(record => {
    let sum = 0;

    let course_name = ""


    for (let i = 0; i < data.length; i++) {
        let recorder = data[i]
        if (record["Course Name"] === recorder["Course Name"]) {
            sum = sum + recorder["Total Course Hours"]
        }
    }


    record["Course Hours"] = sum.toFixed(2)


    return record;

})

function compare_item(a, b){
    // a should come before b in the sorted order
    if(a["Course Name"] < b["Course Name"]){
        return -1;
        // a should come after b in the sorted order
    }else if(a["Course Name"] > b["Course Name"]){
        return 1;
        // and and b are the same
    }else{
        return 0;
    }
}

new_data = new_data.sort(compare_item)

let uniqueChars = [];
new_data.forEach((c) => {

    let count = 0
    if (!uniqueChars.includes(c['Course Name'])) {
        for (let i = 0; i < uniqueChars.length; i++) {
            if (uniqueChars[i]["Course Name"] === c['Course Name']) {
                count++;
            }
        }
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
let newWb = xlsx.utils.book_new();

let newWS = xlsx.utils.json_to_sheet(uniqueChars)
xlsx.utils.book_append_sheet(newWb, newWS, "New Data");

xlsx.writeFile(newWb, "Spring 2021 Final Course Hours.xlsx");
