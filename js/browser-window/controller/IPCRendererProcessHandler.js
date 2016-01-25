'use strict';

/**
 * handles all IPC communication with the main process
 *
 * @param hackBrowserWindow controller
 * @constructor
 */
function IPCRendererProcessHandler(hackBrowserWindow) {
	const ipcRenderer = require("electron").ipcRenderer;

	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		attachEventHandlers();
	};

	/**
	 * attach event handlers for messages from main process IPC
	 */
	var attachEventHandlers = function() {
	};


	/* ====================================
	 public methods
	 ====================================== */

	/**
	 * send a request to open a new HackBrowser window
	 *
	 * @param url {string} url to open with new window
	 * @param callback {function} callback with success/fail result
	 */
	_this.requestNewWindowOpen = function(url, callback) {
		console.log("IPCRendererProcessHandler.requestNewWindowOpen()");

		ipcRenderer.send("newWindowOpenRequest", url);
		ipcRenderer.once("newWindowOpenResponse", function(e, result) {
			callback(result);
		});
	};

	init();
}