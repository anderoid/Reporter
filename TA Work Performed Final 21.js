let xlsx = require("xlsx")
let wb = xlsx.readFile("TA Time Log Spring2021.xlsx", {cellDates: true})

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


function compare_item(a, b){
    // a should come before b in the sorted order
    if(a["Work Performed"] < b["Work Performed"]){
        return -1;
        // a should come after b in the sorted order
    }else if(a["Work Performed"] > b["Work Performed"]){
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

xlsx.writeFile(newWb, "TA Work Performed Final 21.xlsx");
