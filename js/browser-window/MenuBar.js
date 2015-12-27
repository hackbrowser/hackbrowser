'use strict'; 

function MenuBar(hackBrowserWindow, eventEmitter, wrapperEl) {
	// set window context and wrapper
	this.hackBrowserWindow = hackBrowserWindow;
	this.browserEventEmitter = eventEmitter;
	this.wrapperEl = wrapperEl || document; 

	this.init(); 
}

MenuBar.prototype.init = function(hackBrowserWindow, wrapperEl) {
	console.log(this.wrapperEl); 

	this.backBtnEl = document.getElementById("button-back"); 
	this.forwardBtnEl = document.getElementById("button-forward"); 
	this.reloadBtnEl = document.getElementById("button-reload");
	this.addressBarEl = document.getElementById("address-bar"); 
	this.menuBtnEl = document.getElementById("button-menu"); 

	this.attachEventHandlers(); 
	this.adjustAddressBarWidth(); 
}; 

MenuBar.prototype.attachEventHandlers = function() {
	this.backBtnEl.addEventListener("click", this.onBackBtnClick); 			// "Back" button
	this.forwardBtnEl.addEventListener("click", this.onForwardBtnClick); 	// "Forward" button
	this.reloadBtnEl.addEventListener("click", this.onReloadBtnClick); 	// "Refresh" button
	this.menuBtnEl.addEventListener("click", this.onMenuBtnClick);			// "Menu" button

	this.addressBarEl.addEventListener("click", function(e) {
		// select text in input box
		// TODO: only select if the input is not currently active
		this.select(); 

		e.preventDefault(); 
	}); 
}; 

MenuBar.prototype.adjustAddressBarWidth = function() {
	// Calculate left and right controls' widths
	var elLeftMenu = document.getElementById("menu-left"); 
	var elRightMenu = document.getElementById("menu-right"); 
	var elAddressBarWrapper = document.getElementById("address-bar-wrapper"); 

	elAddressBarWrapper.style.paddingLeft = elLeftMenu.offsetWidth + "px"; 
	elAddressBarWrapper.style.paddingRight = elRightMenu.offsetWidth + "px"; 
}; 

// Event handlers
MenuBar.prototype.onBackBtnClick = function(e) {
	console.log("Clicked back");

	this.hackBrowserWindow.goBack();

	e.preventDefault();
}; 

MenuBar.prototype.onForwardBtnClick = function(e) {
	console.log("Clicked forward");

	this.hackBrowserWindow.goForward();

	e.preventDefault(); 
}; 

MenuBar.prototype.onReloadBtnClick = function(e) {
	console.log("Clicked reload");

	this.hackBrowserWindow.reload();

	e.preventDefault(); 
}; 

MenuBar.prototype.onMenuBtnClick = function(e) {
	console.log("Clicked menu button"); 

	e.preventDefault(); 
};