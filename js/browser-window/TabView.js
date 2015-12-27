'use strict'; 

function TabView(hackBrowserWindow) {
	this.hackBrowserWindow = hackBrowserWindow;

	this.webViewTitle = "New Tab";
	this.webViewId = "wv-" + this.hackBrowserWindow.getCreatedTabViewCount();
}

TabView.prototype.init = function() {
	this.webViewEl = document.createElement("webview");

	this.webViewEl.setAttribute("id", this.webViewId);
};

TabView.prototype.attachEventHandlers = function() {

};

TabView.prototype.navigateTo = function(url) {
	this.webViewEl.setAttribute("src", url);
};

TabView.prototype.show = function() {
	this.webViewEl.style.visibility = "visible";
};

TabView.prototype.hide = function() {
	this.webViewEl.style.visibility = "hidden";
};

TabView.prototype.destroy = function() {

};

TabView.prototype.getId = function() {
	return this.webViewId;
};

TabView.prototype.getWebViewEl = function() {

};

TabView.prototype.getWebViewTitle = function() {
	return this.webViewTitle;
};

TabView.prototype.getUrl = function() {
	return this.webViewEl.getUrl();
};

