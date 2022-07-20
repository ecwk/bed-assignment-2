const { networkInterfaces } = require('os');
const chalk = require('chalk');

const { env } = require('../../config');

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
      `${env.NODE_ENV.replace(
        env.NODE_ENV[0],
        env.NODE_ENV[0].toUpperCase()
      )} server running at:`
    )
  );
  IPS.forEach((IP) =>
    console.log(`> Network: ${chalk.cyan(`http://${IP}:${env.PORT}/`)}`)
  );
  console.log(`> Local: ${chalk.cyan(`http://localhost:${env.PORT}/`)}`);
};
