'use strict';

const navigationHistoryHandler = require(GLOBAL.__app.basePath + "/js/main-process/NavigationHistory");

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
		ipcMain.on("addNavigationHistoryRequest", handleAddNavigationHistoryRequest);
	};

	var handleNewWindowOpenRequest = function(event, url) {
		windowManager.openNewWindow(url);

		event.sender.send("newWindowOpenResponse", true);
	};
	
	var handleAddNavigationHistoryRequest = function(event, navigationInfo) {
		navigationHistoryHandler.addNavigationHistory(navigationInfo, function(err) {
			if (err) {
				event.sender.send("newNavigationHistoryResponse", false);
			} else {
				event.sender.send("newNavigationHistoryResponse", true);
			}
		});
	};

	init();
}

module.exports = IPCMainProcessHandler;