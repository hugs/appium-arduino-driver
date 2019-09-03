import { BaseDriver } from 'appium-base-driver';
import { W3C_ELEMENT_KEY } from 'appium-base-driver/build/lib/protocol/protocol';
import _ from 'lodash';
import B from 'bluebird';
import five from 'johnny-five';
import log from './logger';
import uuid from 'uuid/v4';

let board;

export default class ArduinoDriver extends BaseDriver {
  constructor (opts = {}) {
    super(opts, false);
    this.els = {};
    this.pinIdMap = {};
  }

  proxyActive () {
    return false;
  }

  getProxyAvoidList () {
    return [];
  }

  canProxy () {
    return false;
  }

  validateLocatorStrategy (strategy) {
    if (strategy !== 'id') {
      throw new Error(`Only the 'id' locator strategy is supported.`);
    }
  }

  validateDesiredCaps (caps) {
    if (!caps.app) {
      throw new Error(`'app' capability must exist`);
    }
  }

  async createSession (...args) {
    let [sessionId, caps] = await super.createSession(...args);
    if (!board) {
      board = this.board = new five.Board({});
      log.info('Waiting for board to be ready');
      await B.promisify(board.on, {context: board})('ready');
    }

    this.led = new five.Led(13);
    this.led.on();
    board.io.i2cConfig();

    return [sessionId, caps];
  }

  async performTouch (actions, sessionId) {
    log.info("performTouch...")

    for (var i = 0; i < actions.length; i++) {
      let action = actions[i]
      log.info('Action: ' + action.action)

      if (action.action == 'moveTo') {
        let x = action.options.x
        let y = action.options.y
        log.info('x: ' + x)
        log.info('y: ' + y)
        await this.board.io.i2cWrite(8, [1, x, y])

      } else if (action.action == 'press') {
        await this.board.io.i2cWrite(8, [2])

      } else if (action.action == 'release') {
        await this.board.io.i2cWrite(8, [3])

      } else if (action.action == 'wait') {
        let ms = action.options.ms
        await this.board.io.i2cWrite(8, [4, ms])
      }
    }
  }

  async deleteSession () {
    log.info('Ending Arduino session');
    this.led.off();
    await super.deleteSession();
  }
}
