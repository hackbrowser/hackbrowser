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
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		addressBarEl.addEventListener("click", handleAddressBarClick);
		addressBarEl.addEventListener("keypress", handleAddressBarKeyPress);
	};

	/**
	 * handle address bar click event
	 *
	 * @param e
	 */
	var handleAddressBarClick = function(e) {
		// select text in input box
		// TODO: only select if the input is not currently active
		this.select();

		e.preventDefault();
	};

	/**
	 * handle address bar keypress event
	 *
	 * @param e
	 */
	var handleAddressBarKeyPress = function(e) {
		// Enter key
		if (e.charCode === 13) {
			e.preventDefault();

			// update url value
			var urlValue = addressBarEl.value;

			if (urlValue.trim() === "") {
				// do nothing
				return;
			}

			// focus out of current input element
			document.activeElement.blur();

			hackBrowserWindow.navigateTo(urlValue);
		}
	};


	/* ====================================
	 public methods
	 ====================================== */
	/**
	 * focus on address bar
	 */
	_this.focusOnAddressBar = function() {
		addressBarEl.focus();
	};

	// TODO: need to find a way to check how address bar input is focused at a given moment
	/**
	 * check whether address bar input element has focus
	 *
	 * @returns {boolean} whether address bar is currently focused
	 */
	_this.isAddressBarFocused = function() {
		return (addressBarEl === document.activeElement);
	};

	/**
	 * updates URl string in address bar input element
	 *
	 * @param url {string} new url
	 */
	_this.updateURL = function(url) {

		if (url && url.startsWith("file://")) {
			url = "";
		}

		addressBarEl.value = url;
	};

	init();
}