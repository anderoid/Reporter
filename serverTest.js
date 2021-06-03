const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
let router = express.Router();
const fs = require('fs')
const app = express()


const port = process.env.PORT || 5000;

const swaggerOptions = {

    swaggerDefinition: {

        info: {
            title: 'TA Auto Generation Tool',
            description: 'Tool to generate TA Reports',
            contact: {
                name: `Surya Kurella`
            },
            servers: [`http://localhost:5000/customers`]
        }
    },
    apis: ["serverTest.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Routes
/**
 * @swagger
 * /api-docs:
 *  consumes:
 *      - multipart/form-data
 *  post:
 *              summary: Uploads a file.
 *              consumes:
 *                  - multipart/form-data
 *              parameters:
 *                  - in: formData
 *                    name: upfile
 *                    type: file
 *                    description: The file to upload.
 *              requestBody:
 *                  content:
 *                      application/json:
 *
 *              responses:
 *                  '200':
 *                      description:"File Uploaded Succesfullylly"
 *                  '500':
 *                      description:"Frigging Failed"
 *              x-swagger-router-controller: "Default"
 *
 *
 */
app.post('/api-docs', (req, res) => {

    console.log(req)

    const file = req.body
    console.log(file)


console.log("Hey I m here bro ")

    res.status(201).send()

})

app.listen(port, () => {

    console.log(`Server is listening on port ${port}`)
})


// *  get:
// *    description: Use to request all customers
// *    responses:
// *      '200':
// *          description: A success
