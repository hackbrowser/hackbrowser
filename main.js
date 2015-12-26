'use strict'; 

// global object
// be cautious with adding values here
GLOBAL.__app = {
	basepath: __dirname
}; 

const electron = require('electron'); 
const app = electron.app; 
const BrowserWindow = electron.BrowserWindow; 
const HackBrowserWindowManager = require('./js/main-process/HackBrowserWindowManager'); 

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit(); 
	}
});

app.on('ready', function() {
	var manager = new HackBrowserWindowManager(); 

	manager.openNewWindow(); 
}); 