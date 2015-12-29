'use strict';

/**
 * MenuBar module includes handling for back button, forward button,
 * reload button, address bar, and menu button
 *
 * @param hackBrowserWindow
 * @constructor
 */
function MenuBar(hackBrowserWindow) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var backBtnEl;
	var forwardBtnEl;
	var reloadBtnEl;
	var addressBarEl;
	var menuBtnEl;

	var disabledClass = "disabled";


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		backBtnEl = document.getElementById("button-back");
		forwardBtnEl = document.getElementById("button-forward");
		reloadBtnEl = document.getElementById("button-reload");
		addressBarEl = document.getElementById("address-bar");
		menuBtnEl = document.getElementById("button-menu");

		attachEventHandlers();
		adjustAddressBarWidth();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		backBtnEl.addEventListener("click", onBackBtnClick); 			// "Back" button
		forwardBtnEl.addEventListener("click", onForwardBtnClick);	 	// "Forward" button
		reloadBtnEl.addEventListener("click", onReloadBtnClick); 		// "Refresh" button
		menuBtnEl.addEventListener("click", onMenuBtnClick);			// "Menu" button

		addressBarEl.addEventListener("click", function(e) {
			// select text in input box
			// TODO: only select if the input is not currently active
			this.select();

			e.preventDefault();
		});

		addressBarEl.addEventListener("keypress", function(e) {
			// Enter key
			if (e.charCode === 13) {
				console.log(e);

				var urlValue = addressBarEl.value;

				hackBrowserWindow.navigateTo()
			}
		});
	};

	/**
	 * sets address bar's left and right padding based on control buttons
	 * to ensure that the address bar is always at full width
	 */
	var adjustAddressBarWidth = function() {
		// Calculate left and right controls' widths
		var leftMenuEl = document.getElementById("menu-left");
		var rightMenuEl = document.getElementById("menu-right");
		var addressBarWrapperEl = document.getElementById("address-bar-wrapper");

		addressBarWrapperEl.style.paddingLeft = leftMenuEl.offsetWidth + "px";
		addressBarWrapperEl.style.paddingRight = rightMenuEl.offsetWidth + "px";
	};

	/**
	 * event handler for back button
	 *
	 * @param e
	 */
	var onBackBtnClick = function(e) {
		console.log("Clicked back");

		hackBrowserWindow.goBack();

		e.preventDefault();
	};

	/**
	 * event handler for forward button
	 *
	 * @param e
	 */
	var onForwardBtnClick = function(e) {
		console.log("Clicked forward");

		hackBrowserWindow.goForward();

		e.preventDefault();
	};

	/**
	 * event handler for reload button
	 *
	 * @param e
	 */
	var onReloadBtnClick = function(e) {
		console.log("Clicked reload");

		hackBrowserWindow.reload();

		e.preventDefault();
	};

	/**
	 * event handler for menu button
	 *
	 * @param e
	 */
	var onMenuBtnClick = function(e) {
		console.log("Clicked menu button");

		e.preventDefault();
	};


	/* ====================================
	 public methods
	 ====================================== */
	_this.enableBackBtn = function() {
		backBtnEl.classList.remove(disabledClass);
	};

	_this.disableBackBtn = function() {
		backBtnEl.classList.add(disabledClass);
	};

	_this.enableForwardBtn = function() {
		forwardBtnEl.classList.remove(disabledClass);
	};

	_this.disableForwardBtn = function() {
		forwardBtnEl.classList.add(disabledClass);
	};

	_this.updateBtnStatus = function(webViewEl) {
		if (webViewEl.canGoBack() === true) {
			_this.enableBackBtn();
		} else {
			_this.disableBackBtn();
		}

		if (webViewEl.canGoForward() === true) {
			_this.enableForwardBtn();
		} else {
			_this.disableForwardBtn();
		}
	};

	_this.updateUrl = function(url) {
		addressBarEl.value = url;
	};

	init();
}