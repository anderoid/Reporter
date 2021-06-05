

/**
 * @swagger
 * /api-docs:
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
 *            name: upfile
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

// app.get('/', (req, res)=>{
//     console.log("Hola")
// })
app.post('/api-docs', (req, res) => {

    if(req.files){
        console.log("Hola Bro")
    }
})

app.listen(port, () => {

    console.log(`Server is listening on port ${port}`)
})
