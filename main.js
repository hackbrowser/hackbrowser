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

app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});

var startBrowser = function() {
	var manager = new HackBrowserWindowManager();

	manager.openNewWindow();
};

app.on("ready", function() {
	// check if .data directory exists
	fs.exists(GLOBAL.__app.dataPath, function(exists) {
		if (exists === false) {
			// create directory if .data directory doesn't exist
			fs.mkdir(GLOBAL.__app.dataPath, function(err) {
				if (err) {
					// TODO: show error messagebox and quit app
					dialog.showMessageBox({
						type: "info",
						buttons: ["ok"],
						title: dataPath,
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