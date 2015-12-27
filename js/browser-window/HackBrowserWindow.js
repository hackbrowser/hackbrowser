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
	this.currentTabView = null;
	this.createdTabViewCount = 0;

	this.init(); 
}

HackBrowserWindow.prototype.init = function() {
	var _this = this;

	this.menuBar = new MenuBar(_this, this.browserEventEmitter, document.getElementById("menubar"));
	this.browserTabs = new BrowserTabs(_this, this.browserEventEmitter, document.getElementById("navtabs"));
};

HackBrowserWindow.prototype.navigateTo = function(url) {
	this.currentTabView.navigateTo(url);
};

HackBrowserWindow.prototype.updateWindowTitle = function(title) {
	document.title = title;
};

HackBrowserWindow.prototype.getCurrentTabView = function() {
	return this.currentTabView;
};

HackBrowserWindow.prototype.getCreatedTabViewCount = function() {
	return this.createdTabViewCount;
};

HackBrowserWindow.prototype.goBack = function() {
	if (this.currentTabView.getWebViewEl().canGoBack() === true) {
		this.currentTabView.getWebViewEl().goBack();
	}
};

HackBrowserWindow.prototype.reload = function() {
	this.currentTabView.getWebViewEl().reload();
};

HackBrowserWindow.prototype.goForward = function() {
	if (this.currentTabView.getWebViewEl().canGoForward() === true) {
		this.currentTabView.getWebViewEl().goForward();
	}
};