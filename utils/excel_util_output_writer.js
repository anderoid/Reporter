let xlsx = require("xlsx")
const fs = require('fs')
const path = require('path');
const excel_output_writer = (uniqueChars, {course_name, term, year}, merge_array = []) => {

    console.log(`file-name = ${course_name}`)


    let newWb = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(uniqueChars)
    xlsx.utils.book_append_sheet(newWb, newWS, "Sheet1");

    if (merge_array.length !== 0) {

        newWS["!merges"] = merge_array;
    }

    // const folderName = `../outputFiles/${term}/${term}-${year}`

    const folderName = path.join('../outputFiles', term, term + "-" + year);

    const makeRequest = () => {
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName, {
                    recursive: true
                })

            }
        } catch (err) {
            console.error(err)
        }
    }


    makeRequest()

    xlsx.writeFile(newWb, `${folderName}\\${course_name}.xlsx`);

    console.log('-------------------------')
    console.log(`Generated ${course_name}`);
}

module.exports = excel_output_writer
