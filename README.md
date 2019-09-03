# Appium Arduino Driver

This is an [Appium](https://github.com/appium/appium) driver for the Arduino Micro. It is currently not integrated as a first-party driver in the Appium server, but it can be run in standalone mode. It relies on [Johnny Five](http://johnny-five.io/).

It was designed as a proof-of-concept to show controlling an iPhone running iOS 13 with an Arduino Micro acting as a USB Mouse. (USB Mouse support is new in iOS 13.)

## Installation

We assume you have an Arduino Micro with StandardFirmata installed on it. On a computer, ensure Node.js and NPM are installed, then clone this repo somewhere. Inside the repo, run:

```
npm install
```

## Running the server

```
node .
```

## Desired capabilities

The `app` capability should be a JSON string. Here's an example desired capability JSON object:

```js
  {
    "automationName": "arduino'",
    "app": "Angry Birds",
    "newCommandTimeout": 3600
  }
```


## Supported Appium/Webdriver protocol commands

Only 6 commands in the extensive Webdriver spec are available in this driver:

* New Session (simply pass in the desired capability with a value as described above). This will set up access to the board and initial states.
* Quit Session. This will reset pins to their initial state.
* Move To. This is a touch action and expects two parameters, one named "x" and one named "y" corresponding to the relative coordinate you want to move the mouse to.
* Touch press: This is a touch action that simulates a left button mouse down movement.
* Touch release: This is a touch action that simulates a left button mouse up movement.
* Wait: This is command run locally on the Arduino. It expects one integer parameter named "ms", representing the number of milliseconds to wait.

## Sample projects

[@hugs] AppiumConf 2019 demo

This project is a fork of [@jlipps](https://github.com/jlipps)'s [AppiumConf 2019 demo](https://github.com/jlipps/appiumconf2019), which uses a Raspberry Pi to automate a homebrew drum machine built with a Circuit Playground.

