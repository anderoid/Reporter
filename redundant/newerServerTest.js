const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()

const swaggerOptions = {
    swaggerDefinition: {

        info: {
            title: 'Library Api',
            version: '1.0.2'
        }
    },
    apis: ['newerServerTest.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * /books:
 *  get:
 *      description : get all books
 *      responses:
 *          200:
 *              description: Success Bro
 */


app.get('/books', (req, res) => {
    res.send(
        [
            {
                id: 1,
                title: "Harry Potter "
            }
        ]
    )

})

/**
 * @swagger
 * /books:
 *  post:
 *      description : create a new book
 *      parameters:
 *          - name : title
 *            description: title of the book
 *            in : formData
 *            required: true
 *            type: string
 *      responses:
 *          201:
 *              description: Created Bro
 */


app.post('/books', (req, res) => {

    const file = req.body
    console.log(file)

    res.status(201).send()

})


app.listen(5000, () => {
    console.log("Listening on 5000 port bro")
})
