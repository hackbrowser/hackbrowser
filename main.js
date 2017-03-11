'use strict';

const electron = require('electron');
const winston = require('winston');

// shared globally
global.__app = {
	basePath: __dirname,
	dataPath: (electron.app || electron.remote.app).getPath('userData'),
	winston: winston
};

const MainProcessController = require(global.__app.basePath + "/js/main-process/MainProcessController.js");

var mainController = new MainProcessController();

mainController.start();

winston.info('User\'s dataPath set at ' + global.__app.dataPath);