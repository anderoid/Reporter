const sro = "1) reach out to students who used wrong forms or got incorrect score, 2) seating chart for APPE5, 3) Aseptic Technique (Learning Modules) check off, 4) Biography check off, 5) Journal Club check off and input scores for each student, 6) Presentation check off and input scores for each student, 7) Written Assignment check off and input scores for each student, 8) Case Logs check off and input scores for each student, 9) Intern Self evaluations check off, 10) accepting the grade of aseptic technique, 11) update the all the check off for APPE5 again" ;
const srot = "1) Proctoring" ;

const regger = /(,\s+)?\d+\)(\s+)?/g ;

console.log(sro.split(regger).filter(item=>{
    return item!==", " && item!==" " && item!=="" && item!==undefined ;
}))
// console.log(srot.split("(,\\s+)?\\d\\)(\\s+)?"))
console.log(srot.split(regger))
