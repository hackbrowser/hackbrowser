'use strict'; 

function MenuBar(eventEmitter, wrapperEl) {
	// set window context and wrapper
	this.browserEventEmitter = eventEmitter;
	this.wrapperEl = wrapperEl || document; 

	this.init(); 
}

MenuBar.prototype.init = function(wrapperEl) {
	console.log(this.wrapperEl); 

	this.backBtnEl = document.getElementById("button-back"); 
	this.forwardBtnEl = document.getElementById("button-forward"); 
	this.refreshBtnEl = document.getElementById("button-refresh"); 
	this.addressBarEl = document.getElementById("address-bar"); 
	this.menuBtnEl = document.getElementById("button-menu"); 

	this.attachEventHandlers(); 
	this.adjustAddressBarWidth(); 
}; 

MenuBar.prototype.attachEventHandlers = function() {
	this.backBtnEl.addEventListener("click", this.onBackBtnClick); 			// "Back" button
	this.forwardBtnEl.addEventListener("click", this.onForwardBtnClick); 	// "Forward" button
	this.refreshBtnEl.addEventListener("click", this.onRefreshBtnClick); 	// "Refresh" button
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

	e.preventDefault(); 
}; 

MenuBar.prototype.onForwardBtnClick = function(e) {
	console.log("Clicked forward"); 

	e.preventDefault(); 
}; 

MenuBar.prototype.onRefreshBtnClick = function(e) {
	console.log("Clicked refresh"); 

	e.preventDefault(); 
}; 

MenuBar.prototype.onMenuBtnClick = function(e) {
	console.log("Clicked menu button"); 

	e.preventDefault(); 
};