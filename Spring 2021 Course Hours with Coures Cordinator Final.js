
const sortCode = require('./sortCode')

let xlsx = require("xlsx")
let wb = xlsx.readFile("TA Time Log Spring2021.xlsx", {cellDates: true})

let ws = wb.Sheets["Sheet1"]

let data = xlsx.utils.sheet_to_json(ws)

let new_data = data.map(record => {
    let sum = 0;
    let recorder, course_name, coordinator_name

    for (let i = 0; i < data.length; i++) {
        sum = 0;
        recorder = data[i]
        course_name = recorder["Course Name"]
        coordinator_name = recorder["Coordinator Name"]

        for (let j = 0; j < data.length; j++) {
            let recorders = data[j]
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

function compare_item(a, b) {
    // a should come before b in the sorted order
    if (a["CourseName"] < b["CourseName"]) {
        return -1;
        // a should come after b in the sorted order
    } else if (a["CourseName"] > b["CourseName"]) {
        return 1;
        // and and b are the same
    } else {
        return 0;
    }
}

// new_data = new_data.sort(compare_item)
new_data = sortCode(new_data, "CourseName")

let uniqueChars = [];
new_data.forEach((c) => {

    let count = 0
    if (!uniqueChars.includes(c['Work Performed'])) {
        for (let i = 0; i < uniqueChars.length; i++) {
            if (uniqueChars[i]["CourseCoordinatorName"] === c['CourseCoordinatorName'] && uniqueChars[i]["CourseName"] === c["CourseName"]) {
                count++;
            }
        }
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
let newWb = xlsx.utils.book_new();

let newWS = xlsx.utils.json_to_sheet(uniqueChars)
xlsx.utils.book_append_sheet(newWb, newWS, "New Data");

xlsx.writeFile(newWb, "Spring 2021 Course Hours with Coures Cordinator Final.xlsx");
