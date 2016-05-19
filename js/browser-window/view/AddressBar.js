'use strict';

/**
 * Address bar and related controls
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
	var hasFocus;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function () {
		addressBarEl = document.getElementById("address-bar");
		hasFocus = false;

		attachEventHandlers();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function () {
		addressBarEl.addEventListener("click", handleAddressBarClick);
		addressBarEl.addEventListener("keyup", handleAddressBarKeyUp);
		addressBarEl.addEventListener("focus", handleAddressBarFocus);
		addressBarEl.addEventListener("focusout", handleAddressBarFocusOut);
	};

	/**
	 * handle address bar click event
	 *
	 * @param e
	 */
	var handleAddressBarClick = function (e) {
		e.preventDefault();
	};

	/**
	 * handle address bar keypress event
	 *
	 * @param e
	 */
	var handleAddressBarKeyUp = function (e) {
		// update url value
		var urlValue = addressBarEl.value;

		console.log("addressBarKeyUp, charCode: " + e.charCode + ", keyCode: " + e.keyCode);
		console.log(e);

		// "enter" key
		if (e.keyCode === KeyCode.ENTER) {
			e.preventDefault();

			if (urlValue.trim() === "") {
				// do nothing
				return;
			}

			// focus out of current input element
			document.activeElement.blur();

			hackBrowserWindow.navigateTo(urlValue);
		}

		// "up" key
		else if (e.keyCode === KeyCode.UP) {
			console.log("UP arrow key pressed");

			hackBrowserWindow.getAutoCompleteBox().navigateUp();
		}

		// "down" key
		else if (e.keyCode === KeyCode.DOWN) {
			console.log("DOWN arrow key pressed");

			hackBrowserWindow.getAutoCompleteBox().navigateDown();
		}

		// "esc" key
		else if (e.keyCode === KeyCode.ESC) {
			console.log("ESC key pressed");

			hackBrowserWindow.getAutoCompleteBox().close();
		}

		else {
			if (urlValue.trim() !== "") {
				hackBrowserWindow.getAutoCompleteBox().update(urlValue);
			}
		}
	};

	/**
	 * handler to execute when address bar obtains focus
	 */
	var handleAddressBarFocus = function () {
		// select text in input box
		if (hasFocus === false) {
			this.select();
		}

		hasFocus = true;
	};

	/**
	 * handler to execute when address bar input loses focus
	 */
	var handleAddressBarFocusOut = function () {
		hasFocus = false;

		setTimeout(function() {
			hackBrowserWindow.getAutoCompleteBox().close();
		}, 100);
	};


	/* ====================================
	 public methods
	 ====================================== */
	/**
	 * focus on address bar
	 */
	_this.focusOnAddressBar = function () {
		addressBarEl.focus();
	};

	// TODO: need to find a way to check how address bar input is focused at a given moment
	/**
	 * check whether address bar input element has focus
	 *
	 * @returns {boolean} whether address bar is currently focused
	 */
	_this.isAddressBarFocused = function () {
		return (addressBarEl === document.activeElement);
	};

	/**
	 * updates URl string in address bar input element
	 *
	 * @param url {string} new url
	 */
	_this.updateURL = function (url) {
		console.log("AddressBar.updateURL(" + url + ")");

		if (url && url.startsWith("file://")) {
			url = "";
		}

		if (hasFocus === false) {
			addressBarEl.value = url;
		}
	};

	init();
}