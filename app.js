const express = require('express')
const connectDB = require('./config/db');
const router = require('./route/route');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // Update with your Swagger JSON file path
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next)=>{
console.log(error)
res.json({
    msg: error
})
})

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Example app listening at http://localhost:${port}`);
    })
}).catch((error)=>{
 console.log(error)
})
