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
let term = 'Spring'.toLowerCase()


app.post('/my-file-catcher', (req, res) => {
    console.log("Received inside posts")
    if (req.files) {
        console.log(req.files)


        const makeRequest = () => {
            return new Promise((resolve, reject) => {
                console.log("Trying to move the file to the desired location")
                const file = req.files.file;
                const filename = file.name;
                resolve(file.mv(`../mainFile/${filename}`))
            })
        }

        async function bro() {
            await makeRequest()

            console.log("Response recieved ")

            const file = req.files.file;
            const filename = file.name;
            console.log(`filename = ${filename}`)


            console.log("Moved the file data to folder at ", new Date())

            const course_hours_course_cordinator = require('./Spring 2021 Course Hours with Coures Cordinator Final')(term)
            const final_course_hours = require('./Spring 2021 Final Course Hours')(term)
            const ta_user_total_hoursFinal = require('./TA User TotalHoursFinal Spring')(term)
            const ta_work_performed_final = require('./TA Work Performed Final 21')(term)


        }

        bro()
        res.send("ok")
    }
})

let last_date = new Date();

console.log(last_date - first_date)


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
 *            description: The file to upload.
 *            required: true
 *            schema:
 *              type: string
 *              format: file
 *      responses:
 *          '200':
 *              description: 'File Uploaded Succesfully'
 *              schema:
 *                      type: string
 *                      format: binary
 *
 *
 *      requestBody:
 *          content:
 *              application/octet-stream:
 *                  schema:
 *                      type: string
 *                      format: binary
 *      x-swagger-router-controller: "Default"
 *
 *
 *
 */
