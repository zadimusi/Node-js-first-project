// swagger.js

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Your API Documentation',
    description: 'Description of your API.',
  },
  host: 'localhost:3000', // Change this to your server host
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Sample',
      description: 'Sample API operations',
    },
  ],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js']; // Update with your main application file

swaggerAutogen(outputFile, endpointsFiles, doc);
