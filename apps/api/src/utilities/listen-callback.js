const { networkInterfaces } = require('os');
const chalk = require('chalk');

const constants = require('../constants');

const IPS = [];
let interfaces = networkInterfaces();
for (const interface_ of Object.keys(interfaces)) {
  for (const network of interfaces[interface_]) {
    if (network.family === 'IPv4' && network.internal === false) {
      IPS.push(network.address);
    }
  }
}

module.exports = () => {
  console.clear();
  console.log(
    chalk.cyan(
      `${constants.NODE_ENV.replace(
        constants.NODE_ENV[0],
        constants.NODE_ENV[0].toUpperCase()
      )} server running at:`
    )
  );
  IPS.forEach((IP) =>
    console.log(`> Network: ${chalk.cyan(`http://${IP}:${constants.PORT}/`)}`)
  );
  console.log(`> Local: ${chalk.cyan(`http://localhost:${constants.PORT}/`)}`);
};
