import log from './logger';
import { server as baseServer, routeConfiguringFunction } from 'appium-base-driver';
import ArduinoDriver from './driver';

async function startServer (port, address) {
  let d = new ArduinoDriver({port, address});
  let router = routeConfiguringFunction(d);
  let server = await baseServer(router, port, address);
  log.info(`ArduinoDriver server listening on http://${address}:${port}`);
  return server;
}

export { startServer };
