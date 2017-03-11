'use strict';

const electron = require('electron');
const app = electron.app;
const {dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const session = require('electron').session;
const winston = require('winston');

const hackBrowserWindowManager = require(global.__app.basePath + "/js/main-process/HackBrowserWindowManager");
const GlobalShortcutHandler = require(global.__app.basePath + "/js/main-process/GlobalShortcutHandler");
const IPCMainProcessHandler = require(global.__app.basePath + "/js/main-process/IPCMainProcessHandler");

var logger;

function MainProcessController() {
	var _this = this;

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
			fs.exists(global.__app.dataPath, function(exists) {
				if (exists === false) {
					// create directory if .data directory doesn't exist
					// TODO: check directory create permissions on Linux
					fs.mkdir(global.__app.dataPath, function(err) {
						if (err) {
							// TODO: show error messagebox and quit app
							dialog.showMessageBox({
								type: "info",
								buttons: ["ok"],
								title: global.__app.dataPath,
								message: JSON.stringify(err),
								detail: JSON.stringify(err)
							});

							app.quit(); 
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
			ppapi_flash_path = path.join(global.__app.basePath, "/binaries/pepflashplayer32_20_0_0_306.dll");
		} else if (process.platform == 'darwin') {
			// Mac OS
			ppapi_flash_path = path.join(global.__app.basePath, "/binaries/PepperFlashPlayer.plugin");
		}

		// in case ppapi_flash_path is set
		if (ppapi_flash_path) {
			app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
			app.commandLine.appendSwitch('ppapi-flash-version', '20.0.0.306');
		}
	};

	/**
	 * Start the browser and open a new window
	 */
	var startBrowser = function() {
		// create a shared EventEmitter for windowManager to communicate with ipcHandler
		mainProcessEventEmitter = new EventEmitter();
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

	_this.checkAppDirectories = function() {
		if (!fs.existsSync(global.__app.dataPath)) {
			fs.mkdirSync(global.__app.dataPath);
		}

		if (!fs.existsSync(global.__app.logPath)) {
			fs.mkdirSync(global.__app.logPath);
		}
	};

	_this.startLogger = function() {
		global.__app.logger = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({ level: 'silly' }),
				new (winston.transports.File)({
					filename: path.join(global.__app.logPath, 'app.log'),
					level: 'info'
				})
			]
		});

		logger = global.__app.logger;
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
