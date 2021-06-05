const fileUpload = require('express-fileupload')
const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(fileUpload())
const port = process.env.PORT || 5000;


const path = '../mainFile'

fs.readdir(path, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        try {
            fs.unlinkSync(path + `/${file}`)
        } catch (err) {
            console.error(err)
        }
    });
});


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TA Auto Generation Tool',
            description: 'Tool to generate TA Reports',
            contact: {
                name: `Surya Kurella`
            },
            servers: [`http://localhost:5000/my-file-catcher`]
        }
    },
    apis: ["main.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))


let first_date = new Date();


app.post('/my-file-catcher', (req, res) => {


    // console.log(req)


    if (req.files) {
        const term = req.query.term.toLowerCase()
        const year = req.query.year

        console.log(`term : ${term} , year : ${year}`)


        const makeRequest = () => {
            return new Promise((resolve, reject) => {
                const file = req.files.file;
                const filename = file.name;
                resolve(file.mv(`../mainFile/${filename}`))
            })
        }

        async function code_runner() {
            await makeRequest()
            try {
                const course_hours_course_cordinator = require('./Spring 2021 Course Hours with Coures Cordinator Final')(term)
                const final_course_hours = require('./Spring 2021 Final Course Hours')(term)
                const ta_user_total_hoursFinal = require('./TA User TotalHoursFinal Spring')(term)
                const ta_work_performed_final = require('./TA Work Performed Final 21')(term)
            } catch (e) {
                console.log("Incorrect File Sent here ")
            }
        }

        code_runner()
        res.send("ok")
    }
})

let last_date = new Date();

console.log(`files generated in ${last_date - first_date} ms`)


app.listen(port, () => {

    console.log(`Server is listening on port ${port}`)
})


/**
 * @swagger
 * /my-file-catcher:
 *  consumes:
 *      - multipart/form-data
 *      - binary
 *  post:
 *      summary: Uploads a file.
 *      consumes:
 *               - multipart/form-data
 *               - binary
 *      produces: application/octet-stream
 *      parameters:
 *          - in: formData
 *            name: file
 *            type: file
 *            description: Upload the TA file here.
 *            required: true
 *            schema:
 *              type: string
 *              format: file
 *          - name: term
 *            in: "query"
 *            description: Term
 *            required: true
 *            explode: true
 *            enum: ["Summer", "Spring", "Fall"]
 *            default: Spring
 *            schema:
 *              type: string
 *          - name: year
 *            in: "query"
 *            description: Year
 *            required: true
 *            explode: true
 *            default: 2021
 *            schema:
 *              type: string
 *              format: int64
 *
 *
 *      responses:
 *          '200':
 *              description: 'File Uploaded Successfully'
 *              schema:
 *                      type: string
 *                      format: binary
 *      requestBody:
 *          content:
 *              application/octet-stream:
 *                  schema:
 *                      type: string
 *                      format: binary
 *              application/json:
 *                  schema:
 *                      type: string
 *
 *
 *
 *      x-swagger-router-controller: "Default"
 *
 *
 *
 */
