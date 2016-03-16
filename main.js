'use strict';

// shared globally
GLOBAL.__app = {
	basePath: __dirname,
	dataPath: __dirname + "/.data/"
};

const MainProcessController = require(GLOBAL.__app.basePath + "/js/main-process/MainProcessController.js");

var mainController = new MainProcessController();

mainController.start();
