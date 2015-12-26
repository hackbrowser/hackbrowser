'use strict'; 

const electron = require("electron"); 
const BrowserWindow = electron.BrowserWindow; 
const JSONPersistentStorage = require(__app.basepath + "/js/common/JSONPersistentStorage"); 

function HackBrowserWindowManager() {
	this.windowList = []; 
	this.createdWindowCount = 0; 
}

HackBrowserWindowManager.prototype.init = function() {

}; 

HackBrowserWindowManager.prototype.openNewWindow = function(width, height, url) {
	// create the browser window
	var newWindow = new BrowserWindow({ width: 800, height: 600 }); 

	// and load the index.html of the app
	newWindow.loadUrl('file://' + __app.basepath + '/browser-window.html'); 

	// Open the DevTools
	newWindow.webContents.openDevTools(); 

	this.windowList.push(newWindow); 

	// increase window count
	this.createdWindowCount++; 
};

HackBrowserWindowManager.prototype.attachEventHandlers = function(browserWindow) {
	browserWindow.on('close', function() {
		var size = browserWindow.getSize(); 

		

		// TODO: Remove this test code
		try {
			JSONPersistentStorage.setItem("browserSize", newWindow.getSize()); 
		} catch (ex) {

		}
	}); 

	browserWindow.on('closed', function() {
		browserWindow = null; 
	}); 
}; 

HackBrowserWindowManager.prototype.onWindowClose = function() {

}; 

module.exports = HackBrowserWindowManager; 