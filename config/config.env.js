const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to get the configuration based on the environment
module.exports = function getConfig() {
  switch (process.env.NODE_ENV) {
    case 'staging':
        require('dotenv').config({ path: '.env.staging' })
        break;
    case 'production':
        require('dotenv').config({ path: '.env.prod' })
        break;
    default:
        case 'local':
        require('dotenv').config({ path: '.env.local' })
  }
}
