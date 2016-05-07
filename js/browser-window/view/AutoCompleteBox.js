'use strict';

/**
 * Adress bar and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function AutoCompleteBox(hackBrowserWindow) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var autoCompleteBoxEl;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		autoCompleteBoxEl = document.getElementById("auto-complete-box");

		attachEventHandlers();
	};

	/**
	 * attach event handlers for auto complete box
	 */
	var attachEventHandlers = function() {
	};


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
	};

	var attachEventListenerToItem = function(itemEl) {
		itemEl.addEventListener("click", function(e) {
			e.preventDefault();

			_this.hide();

			hackBrowserWindow.navigateTo(itemEl.dataset.url);
		});
	};

	var updateList = function(autoCompleteList) {
		autoCompleteBoxEl.innerHTML = "";

		for (var i = 0, len = autoCompleteList.length; i < len; i++) {
			addItem(autoCompleteList[i].url, autoCompleteList[i].title);
		}

		_this.show();
	};


	/* ====================================
	 public methods
	 ====================================== */
	_this.show = function() {
		autoCompleteBoxEl.style.display = "block";
	};

	_this.hide = function() {
		autoCompleteBoxEl.style.display = "none";
	};

	_this.update = function(searchTerm) {
		hackBrowserWindow.getIPCHandler().requestAutoCompleteEntries(searchTerm, function(autoCompleteEntries) {
			updateList(autoCompleteEntries);
		});
	};

	init();


	updateList([
		{
			url: "http://www.facebook.com",
			title: "Facebook - connect the world"
		},
		{
			url: "http://www.theverge.com",
			title: "Verge"
		},
		{
			url: "http://www.hackbrowser.com",
			title: "A hackable browser written in Javascript for the masses"
		}
	]);
}