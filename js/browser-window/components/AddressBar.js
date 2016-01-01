'use strict';

/**
 * Adress bar and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function AddressBar(hackBrowserWindow) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var addressBarEl;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		addressBarEl = document.getElementById("address-bar");
		attachEventHandlers();
		adjustAddressBarWidth();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		addressBarEl.addEventListener("click", function(e) {
			// select text in input box
			// TODO: only select if the input is not currently active
			this.select();

			e.preventDefault();
		});

		addressBarEl.addEventListener("keypress", function(e) {
			// Enter key
			if (e.charCode === 13) {
				e.preventDefault();

				var urlValue = addressBarEl.value;

				if (urlValue.trim() === "") {
					// do nothing
					return;
				}

				hackBrowserWindow.navigateTo(urlValue);
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
	 * focus on address bar
	 */
	_this.focusOnAddressBar = function() {
		addressBarEl.focus();
	};

	// TODO: need to find a way to check how address bar input is focused at a given moment
	_this.isAddressBarFocused = function() {
		console.log("isAddressBarFocused(), document.activeElement == " + document.activeElement);

		return (addressBarEl === document.activeElement);
	};

	_this.updateURL = function(url) {

		if (url && url.startsWith("file://")) {
			url = "";
		}

		addressBarEl.value = url;
	};

	init();
}