'use strict';

// import {IPCMainProcessHandler} from "./js/main-process/IPCMainProcessHandler";
const electron = require("electron");
const app = electron.app;
const fs = require("fs");
const path = require("path");
const dialog = require("dialog");
const EventEmitter = require("events").EventEmitter;
const session = require("electron").session;
const HackBrowserWindowManager = require(GLOBAL.__app.basePath + "/js/main-process/HackBrowserWindowManager");
const GlobalShortcutHandler = require(GLOBAL.__app.basePath + "/js/main-process/GlobalShortcutHandler");
const IPCMainProcessHandler = require(GLOBAL.__app.basePath + "/js/main-process/IPCMainProcessHandler");

function MainProcessController() {
	var _this = this;

	var hackBrowserWindowManager;
	var ipcHandler;
	var mainProcessEventEmitter;

	var init = function() {
		// attempt to enable Pepper Flash Player plugin
		// binary for pepper flash file is saved in {app-directory}/binaries/
		enablePepperFlashPlayer();

		attachEventHandlers();
	};

	var attachEventHandlers = function() {
		app.on("window-all-closed", function() {
			console.log("window-all-closed, quitting");

			if (process.platform != "darwin") {
				console.log("quitting app");

				app.quit();
			}
		});

		app.on("ready", function() {
			session.defaultSession.on("will-download", handleWillDownload);

			// check if .data directory exists
			fs.exists(GLOBAL.__app.dataPath, function(exists) {
				if (exists === false) {
					// create directory if .data directory doesn't exist
					// TODO: check directory create permissions on Linux
					fs.mkdir(GLOBAL.__app.dataPath, function(err) {
						if (err) {
							// TODO: show error messagebox and quit app
							dialog.showMessageBox({
								type: "info",
								buttons: ["ok"],
								title: GLOBAL.__app.dataPath,
								message: JSON.stringify(err),
								detail: JSON.stringify(err)
							});
						} else {
							startBrowser();
						}
					});
				} else {
					startBrowser();
				}
			});
		});
	};

	/**
	 * attempt to enable flash with Pepper Flash player
	 *
	 * supported OS versions
	 * Windows 7 64-bit, Mac OS 64-bit
	 */
	var enablePepperFlashPlayer = function() {
		var ppapi_flash_path = null;

		// specify flash path based on OS
		if(process.platform  == 'win32'){
			// Windows 7
			ppapi_flash_path = path.join(GLOBAL.__app.basePath, "/binaries/pepflashplayer32_20_0_0_306.dll");
		} else if (process.platform == 'darwin') {
			// Mac OS
			ppapi_flash_path = path.join(GLOBAL.__app.basePath, "/binaries/PepperFlashPlayer.plugin");
		}

		// in case ppapi_flash_path is set
		if (ppapi_flash_path) {
			app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
			app.commandLine.appendSwitch('ppapi-flash-version', '20.0.0.306');
		}
	};

	var startBrowser = function() {
		// create a shared EventEmitter for windowManager to communicate with ipcHandler
		mainProcessEventEmitter = new EventEmitter();

		hackBrowserWindowManager = new HackBrowserWindowManager(_this);
		ipcHandler = new IPCMainProcessHandler(_this);

		var shortcutHandler = new GlobalShortcutHandler(hackBrowserWindowManager);

		// register all global shortcuts
		shortcutHandler.registerAll();

		hackBrowserWindowManager.openNewWindow();
	};

	var handleWillDownload = function(event, item, webContents) {
		item.on("done", function(e, state) {
			if (state === "completed") {
				var itemInfoObj = {
					type: "file-download",
					fileSize: item.getTotalBytes(),
					fileURL: item.getURL(),
					fileName: item.getFilename(),
					fileMimeType: item.getMimeType()
				};
			}
		});
	};

	_this.start = function() {
		init();
	};

	_this.getMainProcessEventEmitter = function() {
		return mainProcessEventEmitter;
	};

	_this.getWindowManager = function() {
		return hackBrowserWindowManager;
	};
}

module.exports = MainProcessController;