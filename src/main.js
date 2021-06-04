
let first_date = new Date() ;
let term = 'Spring'.toLowerCase()

const course_hours_course_cordinator = require('./Spring 2021 Course Hours with Coures Cordinator Final')(term)
const final_course_hours = require('./Spring 2021 Final Course Hours')(term)
const ta_user_total_hoursFinal = require('./TA User TotalHoursFinal Spring')(term)
const ta_work_performed_final = require('./TA Work Performed Final 21')(term)


let last_date = new Date() ;

console.log(last_date - first_date)
