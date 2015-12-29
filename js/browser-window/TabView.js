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
	var webViewURL;
	var webViewWrapperEl;
	var tabViewId;
	var browserTabsWrapperEl;
	var addNewTabBtnEl;
	var tabEl;
	var tabCloseBtnEl;
	var tabInnerTemplate;
	var isDOMReady;
	var isBlankPage;


	/* ====================================
	 private methods
	 ====================================== */
	/**
	 * create a new <webview> element and linked browser tab
	 *
	 * @param url
	 */
	var init = function(url) {
		webViewEl = document.createElement("webview");
		webViewTitle = "New Tab";
		webViewURL = url;
		isDOMReady = false;
		isBlankPage = false;
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

		if (url === null) {
			enterBlankPageMode();
		} else {
			_this.navigateTo(url);
		}

		// append the webview element to screen (#webview-wrapper)
		webViewWrapperEl.appendChild(webViewEl);

		createTab();
		attachEventHandlers();
	};

	/**
	 * Create and add a new tab to browser window's tabs
	 */
	var createTab = function() {
		// create a container for new tab
		tabEl = document.createElement("div");

		tabEl.setAttribute("data-webview-id", tabViewId);
		tabEl.classList.add("tab");

		// replace title with url (until title is set)
		tabEl.innerHTML = tabInnerTemplate.replace("{{title}}", url);

		// save reference to close button
		tabCloseBtnEl = tabEl.querySelector(".close");

		browserTabsWrapperEl.insertBefore(tabEl, addNewTabBtnEl);
	};

	var enterBlankPageMode = function() {
		isBlankPage = true;
		_this.navigateTo("./blank-page.html");
	};

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

		webViewEl.addEventListener("dom-ready", function() {
			isDOMReady = true;
		});

		webViewEl.addEventListener("page-title-updated", function(data) {
			webViewTitle = data.title;

			// update tab title
			_this.updateTabTitle(webViewTitle);

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.updateWindowTitle(webViewTitle);
			}
		});

		webViewEl.addEventListener("load-commit", function(e) {
			if (hackBrowserWindow.getActiveTabView() === _this) {
				if (e.isMainFrame === true) {
					hackBrowserWindow.updateWindowTitle(webViewURL);


					if (isBlankPage === true) {
					} else {
						hackBrowserWindow.getMenuBar().updateUrl(webViewURL);
					}

				};
			}
		});

		webViewEl.addEventListener("did-frame-finish-load", function(e) {
			webViewURL = webViewEl.getURL();

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.updateWindowControls();
			}
		});
	}


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

	_this.isDOMReady = function() {
		return isDOMReady;
	};

	_this.close = function() {
		// find the index of tab being closed
		var tabIndex = Array.prototype.indexOf.call(browserTabsWrapperEl.querySelectorAll(".tab"), tabEl);

		hackBrowserWindow.closeTabViewById(tabViewId, tabIndex);

		browserTabsWrapperEl.removeChild(tabEl);
		webViewWrapperEl.removeChild(webViewEl);

		var tabIdToActivate;

		var openTabsElArr = browserTabsWrapperEl.querySelectorAll(".tab");

		if (tabIndex >= openTabsElArr.length) {
			tabIdToActivate = openTabsElArr[tabIndex - 1].dataset.webviewId;
		} else {
			tabIdToActivate = openTabsElArr[tabIndex].dataset.webviewId;
		}

		hackBrowserWindow.activateTabById(tabIdToActivate);
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
		return webViewURL;
	};

	_this.updateTabTitle = function(title) {
		tabEl.querySelector(".title").innerText = title;
	};

	init(url);
}