import ArduinoDriver from './lib/driver';
import { startServer } from './lib/server';
import yargs from 'yargs';
import { asyncify } from 'asyncbox';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 4847;

function main () {
  let port = yargs.argv.port || DEFAULT_PORT;
  let host = yargs.argv.host || DEFAULT_HOST;
  return startServer(port, host);
}

if (require.main === module) {
  asyncify(main);
}

export default ArduinoDriver;
export { startServer };
