const express = require('express')
require('./config/config.env')()
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
let port;
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router)

app.use((err, req, res, next) => {
  return res.json({message: err.message})
})

app.use((error, req, res, next)=>{
    return res.json({
        msg: error.errors
    })
})

switch (process.env.NODE_ENV) {
    case 'staging':
       port = process.env.STAGE
        break;
    case 'production':
        port = process.env.PROD
        break;
    default:
        case 'local':
        port = process.env.LOCAL
  }

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Example app listening at http://localhost:${port}`);
    })
}).catch((error)=>{
 console.log(error)
})
