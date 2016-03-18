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
	var windowManager;

	/* ====================================
	 private methods
	 ===================================== */
	var init = function() {
		// mainProcessEventEmitter = mainProcessController.getMainProcessEventEmitter();
		windowManager = mainProcessController.getWindowManager();

		attachEventHandlers();
	};

	var attachEventHandlers = function() {
		ipcMain.on("newWindowOpenRequest", handleNewWindowOpenRequest);
	};

	var handleNewWindowOpenRequest = function(event, url) {
		windowManager.openNewWindow(url);

		event.sender.send("newWindowOpenResponse", true);
	};

	init();
}

module.exports = IPCMainProcessHandler;