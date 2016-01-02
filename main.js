'use strict';

// global object
// be cautious with adding values here
GLOBAL.__app = {
	basePath: __dirname,
	dataPath: __dirname + "/.data/"
};

const electron = require("electron");
const app = electron.app;
const fs = require("fs");
const dialog = require("dialog");
const HackBrowserWindowManager = require("./js/main-process/HackBrowserWindowManager");
const GlobalShortcutHandler = require("./js/main-process/GlobalShortcutHandler");

app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});

var startBrowser = function() {
	var manager = new HackBrowserWindowManager();
	GlobalShortcutHandler.registerAll();

	manager.openNewWindow();
};

app.on("ready", function() {

	console.log("ready");

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