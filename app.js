const express = require('express')
const connectDB = require('./config/db');
const router = require('./route/route');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
require('./services/passport');
const auth = require('./route/auth');
const swaggerDocument = require('./docs/swagger.json');
const user = require('./route/user');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router)

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
