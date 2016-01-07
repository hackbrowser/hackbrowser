'use strict';

/**
 * Browser tab and related control
 *
 * @param hackBrowserWindow
 * @param tabViewId
 * @param title
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
	var tabLoadingSpinnerEl;
	var tabCloseBtnEl;
	var tabInnerTemplate;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		tabInnerTemplate = '<div class="favicon-wrapper"><img class="favicon"><div class="loader"></div></div><span class="title">{{title}}</span><div class="close"><i class="icon ion-close"></i></div>';

		// create a container for new tab
		tabEl = document.createElement("div");

		// save <webview> tag's id value to data-webview-id attribute
		tabEl.setAttribute("data-webview-id", tabViewId);

		//
		tabEl.setAttribute("draggable", true);

		tabEl.classList.add("tab");

		// replace title with url (until title is set)
		var tabTitle = title ? title : "New Tab";

		tabEl.innerHTML = tabInnerTemplate.replace("{{title}}", tabTitle);

		// save references to favicon-related elements and close button
		tabFaviconWrapperEl = tabEl.querySelector("favicon-wrapper");
		tabFaviconEl = tabEl.querySelector("img.favicon");
		tabLoadingSpinnerEl = tabEl.querySelector(".loader");
		tabCloseBtnEl = tabEl.querySelector(".close");

		attachEventHandlers();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		// activate tab by clicking on it
		tabEl.addEventListener("click", function(e) {
			hackBrowserWindow.activateTabById(tabViewId);
		});

		// "close tab" button
		tabCloseBtnEl.addEventListener("click", function(e) {
			_this.close();

			// stop propagation to prevent activate() being called after tabview being closed
			e.stopPropagation();
			e.preventDefault();
		}, false);

		// in case favicon src was invalid, display blank image
		// TODO: adjust position to reduce left padding?
		tabFaviconEl.addEventListener("error", function(e) {
			tabFaviconEl.src = "";
		});

		// drag tab to change position
		tabEl.addEventListener("dragstart", onDragStart, false);
		tabEl.addEventListener("dragenter", onDragEnter, false);
		tabEl.addEventListener("dragover", onDragOver, false);
		tabEl.addEventListener("dragleave", onDragLeave, false);
		tabEl.addEventListener("drop", onDrop, false);
		tabEl.addEventListener("dragend", onDragEnd, false);
	};

	var onDragStart = function(e) {
		console.log("onDragStart");

		activateSelf();

		console.log(e);
	};

	var onDragEnter = function(e) {
		console.log("onDragEnter");
		console.log(e);
	};

	var onDragOver = function(e) {
		console.log("onDragOver");
		console.log(e);
	};

	var onDragLeave = function(e) {
		console.log("onDragLeave");
		console.log(e);
	};

	var onDrop = function(e) {
		console.log("onDrop");
		console.log(e);
	};

	var onDragEnd = function(e) {
		console.log("onDragEnd");
		console.log(e);
	};

	var activateSelf = function() {
		hackBrowserWindow.activateTabById(tabViewId);
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
		tabFaviconEl.setAttribute("src", imageURL);
		tabLoadingSpinnerEl.style.display = "none";
		tabFaviconEl.style.display = "block";
	};

	_this.startLoading = function() {
		tabFaviconEl.style.display = "none";
		tabLoadingSpinnerEl.style.display = "block";
	};

	_this.startLoadCommit = function() {
		// TODO: possibly change spinner direction & color when load-commit begins
	};

	_this.stopLoading = function() {
		tabLoadingSpinnerEl.style.display = "none";
		tabFaviconEl.style.display = "block";
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