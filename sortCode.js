
const sorter_code = (new_data, compare_text)=>{

    new_data = new_data.sort((a, b) => {
        // a should come before b in the sorted order
        if (a[compare_text] < b[compare_text]) {
            return -1;
            // a should come after b in the sorted order
        } else if (a[compare_text] > b[compare_text]) {
            return 1;
            // and and b are the same
        } else {
            return 0;
        }
    })


    return new_data
}

module.exports =  sorter_code ;

