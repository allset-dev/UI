/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({ path: '~/.bash_profile' });
dotenv.config({ path: './config/.env' });

const NodeEnvs = {
  DEVELOPMENT: 'development',
};

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || NodeEnvs.DEVELOPMENT;
const API_PROXY = process.env.API_PROXY;
const IS_DEV = NODE_ENV === NodeEnvs.DEVELOPMENT;

module.exports = { NodeEnvs, PORT, NODE_ENV, API_PROXY, IS_DEV };
