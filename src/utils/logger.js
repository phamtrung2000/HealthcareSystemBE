const chalk = require("chalk");
const log = console.log;
function error(message) {
  log(`
    ${chalk.blue.bgRed("--------------------------------")}
    ${chalk.red.bold("Error: ")} ${message} 
    `);
  console.log(message);
}

module.exports = {
  error,
};
