'use strict';

/**
 * handles all IPC communication with the renderer processes (browser windows)
 *
 * @param mainProcessController
 * @constructor
 */
function IPCMainProcessHandler(mainProcessController) {
	const ipcMain = require("electron").ipcMain;

	var _this = this;

	var mainProcessEventEmitter;

	/* ====================================
	 private methods
	 ===================================== */
	var init = function() {
		// mainProcessEventEmitter = mainProcessController.getMainProcessEventEmitter();

		attachEventHandlers();
	};

	var attachEventHandlers = function() {
		ipcMain.on("newWindowOpenRequest", handleNewWindowOpenRequest);
	};

	var handleNewWindowOpenRequest = function(event, url) {
		// TODO: open new window with passed url

		event.sender.send("newWindowOpenResponse", true);
	};

	init();
}

module.exports = IPCMainProcessHandler;