'use strict';

const electron = require('electron');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

// shared globally
global.__app = {
	srcPath: path.join(__dirname, 'src'),
	dataPath: path.join(electron.app.getPath('userData')),
	logPath: path.join(electron.app.getPath('userData'), 'logs'),
	logger: null
};

// Check and create log path
if (!fs.existsSync(global.__app.logPath)) {
	fs.mkdirSync(global.__app.logPath);
}

// Create logger
global.__app.logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({ level: 'silly' }),
		new (winston.transports.File)({
			filename: path.join(global.__app.logPath, 'app.log'),
			level: 'info'
		})
	]
});

const MainProcessController = require(path.join(global.__app.srcPath, 'js', 'main-process', 'MainProcessController'));

let mainController = new MainProcessController();
mainController.start();