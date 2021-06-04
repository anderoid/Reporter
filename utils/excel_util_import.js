const path = require('path')
const fs = require('fs')
let xlsx = require("xlsx")

const excel_utils = ()=> {
    let main_directory_file_xcel_path = path.join(__dirname, '..', 'mainFile')

    console.log(main_directory_file_xcel_path)

    const files = fs.readdirSync(main_directory_file_xcel_path)

    for (const file of files) {
        if (path.extname(file) === '.xlsx')
            main_directory_file_xcel_path = path.join(main_directory_file_xcel_path, file)
    }

    console.log(main_directory_file_xcel_path)

    let wb = xlsx.readFile(main_directory_file_xcel_path, {cellDates: true})
    let ws = wb.Sheets["Sheet1"]
    let data = xlsx.utils.sheet_to_json(ws)

    return data
}
module.exports = excel_utils
