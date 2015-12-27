'use strict'; 

function BrowserTabs(hackBrowserWindow, eventEmitter, tabsWrapperEl) {
	// set window context and wrapper
	this.browserEventEmitter = eventEmitter;
	this.wrapperEl = tabsWrapperEl;

	this.init(); 
}

BrowserTabs.prototype.init = function() {
	this.tabInnerTemplate = '<span class="title">{{title}}</span><div class="close"><i class="icon ion-close"></i></div>';

	this.addTabBtnEl = this.wrapperEl.querySelector("#add-tab");

	this.attachEventHandlers();
};

BrowserTabs.prototype.attachEventHandlers = function() {
	this.addTabBtnEl.addEventListener("click", this.onAddTabBtnClick.bind(this)); 

	this.browserEventEmitter.on("add-tab", this.onAddTab.bind(this));
}; 

BrowserTabs.prototype.onAddTabBtnClick = function(e) {
	this.browserEventEmitter.emit("add-tab", {
		"url": "http://www.github.com"
	});

	e.preventDefault(); 
};

BrowserTabs.prototype.onAddTab = function(data) {
	console.log("onAddTab"); 
	console.log(data); 

	this.addNewTab(data.url); 
}; 

BrowserTabs.prototype.addNewTab = function(url) {
	var tabViewId = null; 

	// create a container for new tab
	var newTabEl = document.createElement("div");

	// create a new TabView object associated with the tab
	// a TabView object is a wrapper for <webview>

	newTabEl.classList.add("tab"); 

	// replace title with url (until title is set)
	newTabEl.innerHTML = this.tabInnerTemplate.replace("{{title}}", url); 

	this.wrapperEl.appendChild(newTabEl); 

	return tabViewId; 
}; 