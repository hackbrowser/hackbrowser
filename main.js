'use strict';

const electron = require('electron');
const winston = require('winston');
const path = require('path');

// shared globally
global.__app = {
	basePath: __dirname,
	dataPath: path.join(electron.app.getPath('userData')),
	logPath: path.join(electron.app.getPath('userData'), 'logs'),
	logger: null
};

const MainProcessController = require(global.__app.basePath + "/js/main-process/MainProcessController.js");

let mainController = new MainProcessController();
mainController.checkAppDirectories();
mainController.startLogger();
mainController.start();