let xlsx = require("xlsx")

const excel_output_writer = (uniqueChars, file_name) => {
    let newWb = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(uniqueChars)
    xlsx.utils.book_append_sheet(newWb, newWS, "Sheet1");

    // const merge = [
    //     { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
    // ];
    // newWS["!merges"] = merge;



    // xlsx.writeFile(newWb, `../outputFiles/${file_name}`);
    xlsx.writeFile(newWb, `D:\\Surya\\Software LEarning\\yover\\outputFiles\\${file_name}`);

    console.log('-------------------------')
    console.log(`Generated ${file_name}`);
}

module.exports = excel_output_writer
