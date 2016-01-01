'use strict';

/**
 * Browser tabs and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function BrowserTabBar(hackBrowserWindow) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var browserTabsWrapperEl;
	var addTabBtnEl;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		browserTabsWrapperEl = document.getElementById("navtabs");
		addTabBtnEl = document.getElementById("add-tab");

		attachEventHandlers();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		addTabBtnEl.addEventListener("click", function(e) {
			hackBrowserWindow.addNewTab(null, true);

			e.preventDefault();
		});
	};


	/* ====================================
	 public methods
	 ====================================== */
	/**
	 * Create and add a new tab
	 */
	_this.createTab = function(tabViewId, title) {
		var newTab = new BrowserTab(hackBrowserWindow, tabViewId, title);
		var newTabEl = newTab.getTabEl();

		browserTabsWrapperEl.insertBefore(newTabEl, addTabBtnEl);

		return newTab;
	};

	_this.removeTab = function(tabViewId) {
		var tabEl = browserTabsWrapperEl.querySelector("[data-webview-id='" + tabViewId + "']");
		console.log("removeTab()");
		console.log(tabEl);

		// find the index of tab being closed
		var tabIndex = Array.prototype.indexOf.call(browserTabsWrapperEl.querySelectorAll(".tab"), tabEl);

		hackBrowserWindow.handleTabCloseById(tabViewId, tabIndex);

		browserTabsWrapperEl.removeChild(tabEl);

		var tabIdToActivate;

		var openTabsElArr = browserTabsWrapperEl.querySelectorAll(".tab");

		if (tabIndex >= openTabsElArr.length) {
			tabIdToActivate = openTabsElArr[tabIndex - 1].dataset.webviewId;
		} else {
			tabIdToActivate = openTabsElArr[tabIndex].dataset.webviewId;
		}

		hackBrowserWindow.activateTabById(tabIdToActivate);
	};

	init();
}