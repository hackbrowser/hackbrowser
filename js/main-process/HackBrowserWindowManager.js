'use strict';

const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const PersistentStorage = require(__app.basePath + "/js/common/PersistentStorage");

/**
 * HackBrowserWindowManager handles opening and closing of browser windows
 *
 * @constructor
 */
function HackBrowserWindowManager() {
	this.windowList = {};
	this.createdWindowCount = 0;
}

HackBrowserWindowManager.prototype.openNewWindow = function(width, height, url) {
	var _this = this;

	// get last browser size
	PersistentStorage.getItem("browserWindowSize", function(err, browserSize) {
		if (err) {
			browserSize = {
				width: 1000,
				height: 800
			};
		}

		// create the browser window
		var newWindow = new BrowserWindow(browserSize);

		// load the HTML file for browser window
		newWindow.loadUrl("file://" + __app.basePath + "/html-pages/browser-window.html");

		// Open the DevTools (debugging)
		newWindow.webContents.openDevTools();

		_this.windowList[newWindow.id] = newWindow;
		_this.attachEventHandlers(newWindow);

		// increase window count
		_this.createdWindowCount++;
	});
};

HackBrowserWindowManager.prototype.attachEventHandlers = function(browserWindow) {
	var windowId = browserWindow.id;

	// save browser window's width/height when user closes it
	browserWindow.on('close', function() {
		var size = browserWindow.getSize();

		var sizeObject = {
			"width": size[0],
			"height": size[1]
		};

		// save to persistent storage
		PersistentStorage.setItem("browserWindowSize", sizeObject);
	});

	// remove the window from windowList and remove reference so that GC clear is from memory
	browserWindow.on('closed', function() {
		delete windowList[windowId];
		browserWindow = null;
	});
};

module.exports = HackBrowserWindowManager;