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
	var numOpenTabs;
	var tabWidth;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		browserTabsWrapperEl = document.getElementById("navtabs");
		addTabBtnEl = document.getElementById("add-tab");
		numOpenTabs = 0;

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

	/**
	 * adjust each tab's width based on number of tabs and window size
	 */
	var adjustWidth = function() {
		tabWidth = Math.floor((browserTabsWrapperEl.clientWidth - addTabBtnEl.offsetWidth) / numOpenTabs);
		tabWidth = (tabWidth > 200) ? 200 : tabWidth;

		var allTabsEl = browserTabsWrapperEl.querySelectorAll(".tab");

		// adjust tab add button's position first since this will kick off animation
		addTabBtnEl.style.left = (tabWidth * allTabsEl.length) + "px";

		for (var i = 0; i < allTabsEl.length; i++) {
			allTabsEl[i].style.left = (tabWidth * i) + "px";
			allTabsEl[i].style.width = tabWidth + "px";
		}
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

		// increase open tabs count
		numOpenTabs++;

		browserTabsWrapperEl.insertBefore(newTabEl, addTabBtnEl);

		// adjust css accordingly (each tab's width)
		adjustWidth();

		return newTab;
	};

	_this.removeTab = function(tabViewId) {
		var tabEl = browserTabsWrapperEl.querySelector("[data-webview-id='" + tabViewId + "']");
		var tabIndex = Array.prototype.indexOf.call(browserTabsWrapperEl.querySelectorAll(".tab"), tabEl);

		hackBrowserWindow.handleTabCloseById(tabViewId);

		browserTabsWrapperEl.removeChild(tabEl);
		numOpenTabs--;

		adjustWidth();

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
