'use strict';

/**
 * Browser tab and related control
 *
 * @param hackBrowserWindow
 * @constructor
 */
function BrowserTab(hackBrowserWindow, tabViewId, title) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var tabEl;
	var tabFaviconWrapperEl;
	var tabFaviconEl;
	var tabCloseBtnEl;
	var tabInnerTemplate;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		tabInnerTemplate = '<div class="favicon-wrapper"><img src="http://www.hackbrowser.com/images/logo-hackbrowser.png" class="favicon"><div class="loader"></div></div><span class="title">{{title}}</span><div class="close"><i class="icon ion-close"></i></div>';

		// create a container for new tab
		tabEl = document.createElement("div");

		tabEl.setAttribute("data-webview-id", tabViewId);
		tabEl.classList.add("tab");

		// replace title with url (until title is set)
		var tabTitle = title ? title : "New Tab";

		tabEl.innerHTML = tabInnerTemplate.replace("{{title}}", tabTitle);

		// save references to favicon-related elements and close button
		tabFaviconWrapperEl = tabEl.querySelector("favicon-wrapper");
		tabFaviconEl = tabEl.querySelector("img.favicon");
		tabCloseBtnEl = tabEl.querySelector(".close");

		attachEventHandlers();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		tabEl.addEventListener("click", function(e) {
			hackBrowserWindow.activateTabById(tabViewId);
		});

		tabCloseBtnEl.addEventListener("click", function(e) {
			_this.close();

			// stop propagation to prevent activate() being called after tabview being closed
			e.stopPropagation();
			e.preventDefault();
		}, false);
	};


	/* ====================================
	 public methods
	 ====================================== */

	_this.activate = function() {
		tabEl.classList.add("active");
	};

	_this.deactivate = function() {
		tabEl.classList.remove("active");
	};

	_this.updateTabFavicon = function(imageURL) {
		tabFaviconEl.style.display = "block";
		tabFaviconEl.setAttribute("src", imageURL);
	};

	_this.setFaviconToLoading = function() {
		tabFaviconEl.style.display = "none";
		tabFaviconWrapperEl.innerHTML = "";
	};

	_this.updateTitle = function(title) {
		tabEl.querySelector(".title").innerText = title;
	};

	_this.close = function() {
		hackBrowserWindow.getBrowserTabBar().removeTab(tabViewId);
	};

	/**
	 * Create and add a new tab to browser window's tabs
	 */
	_this.getTabEl = function() {
		return tabEl;
	};

	init();


}