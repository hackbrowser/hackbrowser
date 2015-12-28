'use strict';

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

	var attachEventHandlers = function() {
		backBtnEl.addEventListener("click", onBackBtnClick); 			// "Back" button
		forwardBtnEl.addEventListener("click", onForwardBtnClick); 	// "Forward" button
		reloadBtnEl.addEventListener("click", onReloadBtnClick); 	// "Refresh" button
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

	var adjustAddressBarWidth = function() {
		// Calculate left and right controls' widths
		var leftMenuEl = document.getElementById("menu-left");
		var rightMenuEl = document.getElementById("menu-right");
		var addressBarWrapperEl = document.getElementById("address-bar-wrapper");

		addressBarWrapperEl.style.paddingLeft = leftMenuEl.offsetWidth + "px";
		addressBarWrapperEl.style.paddingRight = rightMenuEl.offsetWidth + "px";
	};

	// Event handlers
	var onBackBtnClick = function(e) {
		console.log("Clicked back");

		hackBrowserWindow.goBack();

		e.preventDefault();
	};

	var onForwardBtnClick = function(e) {
		console.log("Clicked forward");

		hackBrowserWindow.goForward();

		e.preventDefault();
	};

	var onReloadBtnClick = function(e) {
		console.log("Clicked reload");

		hackBrowserWindow.reload();

		e.preventDefault();
	};

	var onMenuBtnClick = function(e) {
		console.log("Clicked menu button");

		e.preventDefault();
	};

	var enableBackBtn = function() {
		backBtnEl.classList.remove(disabledClass);
	};

	var disableBackBtn = function() {
		backBtnEl.classList.add(disabledClass);
	};

	var enableForwardBtn = function() {
		forwardBtnEl.classList.remove(disabledClass);
	};

	var disableForwardBtn = function() {
		forwardBtnEl.classList.add(disabledClass);
	};

	var enableReloadBtn = function() {
		reloadBtnEl.classList.remove(disabledClass);
	};

	var disableReloadBtn = function() {
		reloadBtnEl.classList.add(disabledClass);
	};


	/* ====================================
	 public methods
	 ====================================== */
	_this.updateBtnStatus = function(webViewEl) {
		if (webViewEl.canGoBack() === true) {
			enableBackBtn();
		} else {
			disableBackBtn();
		}

		if (webViewEl.canGoForward() === true) {
			enableForwardBtn();
		} else {
			disableForwardBtn();
		}
	};

	_this.updateUrl = function(url) {
		addressBarEl.value = url;
	};

	init();
}