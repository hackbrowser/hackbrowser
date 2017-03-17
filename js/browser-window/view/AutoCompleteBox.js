'use strict';

/**
 * Address bar and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function AutoCompleteBox(hackBrowserWindow) {
	var _this = this;

	const logger = require('electron').remote.getGlobal('__app').logger; 

	/* ====================================
	 private member variables
	 ====================================== */
	var autoCompleteBoxEl;
	var autoCompleteEntries;
	var currentIndex;			// index used for autocomplete entries
	var isVisible; 				// State of the auto complete box's visibility


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		autoCompleteBoxEl = document.getElementById("auto-complete-box");
		currentIndex = -1;
		isVisible = false; 

		attachEventHandlers();
	};

	/**
	 * attach event handlers for auto complete box
	 */
	var attachEventHandlers = function() {
	};

	/**
	 * add an autocomplete item to autocomplete DOM element
	 *
	 * @param url
	 * @param title
	 * @returns {DOMElement} DOM node of appended item
	 */
	var addItem = function(url, title) {
		var autoCompleteItemInnerHTML = '<span class="url">{{url}}</span> - <span class="title">{{title}}</span>';
		var itemEl;

		autoCompleteItemInnerHTML = autoCompleteItemInnerHTML.replace("{{url}}", url);
		autoCompleteItemInnerHTML = autoCompleteItemInnerHTML.replace("{{title}}", title);

		itemEl = document.createElement("div");
		itemEl.classList.add("item");
		itemEl.innerHTML = autoCompleteItemInnerHTML;
		itemEl.dataset.url = url;
		
		attachEventListenerToItem(itemEl);

		autoCompleteBoxEl.appendChild(itemEl);

		return itemEl;
	};

	var attachEventListenerToItem = function(itemEl) {
		itemEl.addEventListener('mousedown', function(e) {
			// console.log('item Clicked, url = ' + itemEl.dataset.url);
			logger.debug('Item clicked'); 

			e.preventDefault();

			_this.close();

			hackBrowserWindow.getAddressBar().updateURL(itemEl.dataset.url);
			hackBrowserWindow.navigateTo(itemEl.dataset.url);

		});
	};

	var render = function() {
		autoCompleteBoxEl.innerHTML = "";

		// if no autocomplete entry exist, close autocomplete box
		if (autoCompleteEntries.length === 0) {
			_this.close();

			return;
		}

		for (var i = 0, len = autoCompleteEntries.length; i < len; i++) {
			var appendedEl = addItem(autoCompleteEntries[i].url, autoCompleteEntries[i].title);
			console.log(appendedEl);

			autoCompleteEntries[i].el = appendedEl;
		}

		currentIndex = 0;
		autoCompleteEntries[currentIndex].el.classList.add("selected");

		_this.open();
	};

	var focusByIndex = function(newIndex) {
		autoCompleteEntries[currentIndex].el.classList.remove("selected");
		autoCompleteEntries[newIndex].el.classList.add("selected");

		hackBrowserWindow.getAddressBar().updateURL(autoCompleteEntries[newIndex].url);

		currentIndex = newIndex;
	};



	/* ====================================
	 public methods
	 ====================================== */
	_this.open = function() {
		autoCompleteBoxEl.style.display = "block";
		isVisible = true; 
	};

	_this.close = function() {
		autoCompleteBoxEl.style.display = "none";
		isVisible = false; 
	};


	_this.navigateDown = function() {
		console.log("navigateDown()");

		// if index points to last element in autocomplete entries,
		// do nothing
		if (currentIndex === autoCompleteEntries.length - 1) {
			// do nothing
			return;
		}

		focusByIndex(currentIndex + 1);
	};

	_this.navigateUp = function() {
		console.log("navigateUp()");

		// if index points to the first element in autocomplete entries,
		// do nothing
		if (currentIndex === 0) {
			// do nothing
			return;
		}

		focusByIndex(currentIndex - 1);
	};

	_this.update = function(searchTerm) {
		hackBrowserWindow.getIPCHandler().requestAutoCompleteEntries(searchTerm, function(newAutoCompleteEntries) {
			autoCompleteEntries = newAutoCompleteEntries;
			render();
		});
	};

	init();
}