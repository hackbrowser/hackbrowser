'use strict'; 

/*
	EventEmitter is used here for publish-subscribe pattern 
	between browser window components

	as an example, to open a new browser tab, 
	"new-tab" event will be emitted. 

	BrowserTabs will add a new tab upon receiving the event
*/
const EventEmitter = require("events").EventEmitter; 

function HackBrowserWindow() {
	this.browserEventEmitter = new EventEmitter();

	this.init(); 
}

HackBrowserWindow.prototype.init = function() {
	this.menuBar = new MenuBar(this.browserEventEmitter, document.getElementById("menubar"));
	this.browserTabs = new BrowserTabs(this.browserEventEmitter, document.getElementById("navtabs"));
}; 

HackBrowserWindow.prototype.attachEventHandlers = function() {
	
};

HackBrowserWindow.prototype.onWindowClose = function() {
	
}; 