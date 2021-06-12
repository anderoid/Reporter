let xlsx = require("xlsx")
const fs = require('fs')
const path = require('path');

// const excel_output_writer = (uniqueChars, file_name, term, merge_array = []) => {
const excel_output_writer = (uniqueChars, {course_name, term, year}, merge_array = []) => {

    console.log(`file-name = ${course_name}`)


    let newWb = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(uniqueChars)
    xlsx.utils.book_append_sheet(newWb, newWS, "Sheet1");

    if (merge_array.length !== 0) {

        newWS["!merges"] = merge_array;
    }

    const folderName = `../outputFiles/${term}/${term}-${year}`

    const makeRequest = () => {
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName, {
                    recursive : true
                })

            }
        } catch (err) {
            console.error(err)
        }
    }


    makeRequest()


    // console.log(`The directory name = ${path.dirname('/outputFiles')}`)
    // const folderName = `..outputFiles/${term}/${term}-${year}`
    // const folderName = `..outputFiles`

    // console.log(`The folder name = ${folderName}`)


    // xlsx.writeFile(newWb, `../outputFiles/${term}${year}-${file_name}/${term}/${file_name}`);
    // xlsx.writeFile(newWb, `../outputFiles/${term}/${term}-${year}/${file_name}.xlsx`);
    // xlsx.writeFile(newWb, `D:\\Surya\\Software LEarning\\yover\\outputFiles\\${course_name}.xlsx`);
    xlsx.writeFile(newWb, `${folderName}\\${course_name}.xlsx`);

    console.log('-------------------------')
    console.log(`Generated ${course_name}`);
}

module.exports = excel_output_writer
