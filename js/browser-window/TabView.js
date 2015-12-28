'use strict';

/**
 * TabView consists of a browser tab and it's associated webview
 *
 * @param {HackBrowserWindow} hackBrowserWindow - the browser window
 * @param {string} url - initial url
 * @param {boolean} activate - whether to activate the tab right away or not
 *
 * @constructor
 */
function TabView(hackBrowserWindow, url) {
	var _this = this;

	/* ====================================
		private member variables
	 ====================================== */
	var webViewEl;
	var webViewTitle;
	var tabViewId;
	var browserTabsWrapperEl;
	var addNewTabBtnEl;
	var webViewWrapperEl;
	var tabEl;

	var tabInnerTemplate;


	/* ====================================
		private methods
	 ====================================== */
	var init = function(url) {
		webViewEl = document.createElement("webview");
		webViewTitle = "New Tab";
		tabViewId = "wv-" + hackBrowserWindow.getCreatedTabViewCount();
		browserTabsWrapperEl = document.getElementById("navtabs");
		addNewTabBtnEl = document.getElementById("add-tab");
		webViewWrapperEl = document.getElementById("webview-wrapper");

		tabInnerTemplate = '<span class="title">{{title}}</span><div class="close"><i class="icon ion-close"></i></div>';

		// increase created tab view count
		hackBrowserWindow.increaseCreatedTabViewCount();

		webViewEl.setAttribute("id", tabViewId);
		webViewEl.setAttribute("plugins", "");
		webViewEl.setAttribute("disablewebsecurity", "");

		// if url is set, navigate to url
		// TODO: load "blank" page in case url isn't set
		if (!url) {

		}
		_this.navigateTo(url);

		// append the webview element to screen (#webview-wrapper)
		webViewWrapperEl.appendChild(webViewEl);

		createTab();
		attachEventHandlers();
	};

	var createTab = function() {
		// create a container for new tab
		tabEl = document.createElement("div");

		tabEl.setAttribute("data-webview-id", tabViewId);
		tabEl.classList.add("tab");

		// replace title with url (until title is set)
		tabEl.innerHTML = tabInnerTemplate.replace("{{title}}", url);

		// attach event handlers for new tab
		attachTabEventHandlers(tabEl);

		browserTabsWrapperEl.insertBefore(tabEl, addNewTabBtnEl);
	};

	var attachEventHandlers = function() {
		webViewEl.addEventListener("page-title-updated", function(data) {
			webViewTitle = data.title;

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.updateWindowTitle(webViewTitle);
			}
		});
	};

	var attachTabEventHandlers = function(tabEl) {
		tabEl.addEventListener("click", function(e) {
			hackBrowserWindow.activateTabById(tabViewId);
		});
	};


	/* ====================================
		public methods
	 ====================================== */
	_this.navigateTo = function(url) {
		webViewEl.setAttribute("src", url);
	};

	_this.activate = function() {
		webViewEl.style.visibility = "visible";
		tabEl.classList.add("active");
	};

	_this.deactivate = function() {
		webViewEl.style.visibility = "hidden";
		tabEl.classList.remove("active");
	};

	_this.getId = function() {
		return tabViewId;
	};

	_this.getWebViewEl = function() {
		return webViewEl;
	};

	_this.getWebViewTitle = function() {
		return webViewTitle;
	};

	_this.getURL = function() {
		return webViewEl.getURL();
	};

	_this.updateTabTitle = function() {

	};

	init(url);
}