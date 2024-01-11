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
global.clg = console.log

app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router)

app.use((error, req, res, next)=>{
    return res.json({
        msg: error.errors
    })
})

connectDB().then(()=>{
    app.listen(process.env.PRODUCTION,()=>{
        console.log(`Example app listening at http://localhost:${process.env.PRODUCTION}`);
    })
}).catch((error)=>{
 console.log(error)
})
