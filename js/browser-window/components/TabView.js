'use strict';

/**
 * TabView consists of a browser tab and it's associated webview
 *
 * @param {HackBrowserWindow} hackBrowserWindow - the browser window
 * @param {string} url - initial url
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
	var tabFaviconEl;
	var tabCloseBtnEl;
	var tabInnerTemplate;
	var isDOMReady;


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
		tabViewId = "wv-" + hackBrowserWindow.getCreatedTabViewCount();
		browserTabsWrapperEl = document.getElementById("navtabs");
		addNewTabBtnEl = document.getElementById("add-tab");
		webViewWrapperEl = document.getElementById("webview-wrapper");

		tabInnerTemplate = '<div class="favicon-wrapper"><img src="http://www.hackbrowser.com/images/logo-hackbrowser.png" class="favicon"></div><span class="title">{{title}}</span><div class="close"><i class="icon ion-close"></i></div>';

		// increase created tab view count
		hackBrowserWindow.increaseCreatedTabViewCount();

		webViewEl.setAttribute("id", tabViewId);
		webViewEl.setAttribute("plugins", "");
		webViewEl.setAttribute("disablewebsecurity", "");

		if (url === null) {
			_this.navigateTo("./blank-page.html");
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
		var tabTitle = (url === null) ? "New Tab" : url;

		tabEl.innerHTML = tabInnerTemplate.replace("{{title}}", tabTitle);

		// save reference to close button
		tabCloseBtnEl = tabEl.querySelector(".close");
		tabFaviconEl = tabEl.querySelector("img.favicon");

		browserTabsWrapperEl.insertBefore(tabEl, addNewTabBtnEl);
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


		/*

		 WebView event listeners

		 */
		webViewEl.addEventListener("load-commit", function(e) {
			console.log("[" + tabViewId + "] load-commit");
			console.log(e);

			if (e.isMainFrame === true) {
				webViewURL = e.url;

				if (hackBrowserWindow.getActiveTabView() === _this) {
					hackBrowserWindow.updateWindowTitle(webViewURL);
				}

				if (hackBrowserWindow.getActiveTabView() === _this) {
					hackBrowserWindow.updateWindowControls();
				}
			}
		});

		webViewEl.addEventListener("did-finish-load", function() {
			console.log("[" + tabViewId + "] did-finish-load");
		});

		webViewEl.addEventListener("did-fail-load", function(e) {
			console.log("[" + tabViewId + "] did-fail-load");
			console.log(e);
		});

		webViewEl.addEventListener("did-frame-finish-load", function(e) {
			webViewURL = webViewEl.getURL();
		});

		webViewEl.addEventListener("did-start-loading", function() {
			console.log("[" + tabViewId + "] did-start-loading");
		});

		webViewEl.addEventListener("did-stop-loading", function() {
			console.log("[" + tabViewId + "] did-stop-loading");
		});

		webViewEl.addEventListener("did-get-response-details", function(e) {
			console.log("[" + tabViewId + "] did-get-response-details");
		});

		webViewEl.addEventListener("did-get-redirect-request", function(e) {
			console.log("[" + tabViewId + "] did-get-redirect-request");
			console.log(e);
		});

		webViewEl.addEventListener("dom-ready", function() {
			console.log("[" + tabViewId + "] dom-ready");
			isDOMReady = true;
		});

		webViewEl.addEventListener("page-title-updated", function(e) {
			console.log("[" + tabViewId + "] page-title-updated");
			console.log(e);

			webViewTitle = e.title;

			// update tab title
			_this.updateTabTitle(webViewTitle);

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.updateWindowTitle(webViewTitle);
			}
		});

		webViewEl.addEventListener("page-favicon-updated", function(e) {
			console.log("[" + tabViewId + "] page-favicon-updated");
			console.log(e);

			_this.updateFavicon(e.favicons[0]);
		});

		webViewEl.addEventListener("new-window", function(e) {
			console.log("[" + tabViewId + "] new-window");
			console.log(e);
		});
	};


	/* ====================================
	 public methods
	 ====================================== */
	_this.navigateTo = function(url) {
		var URLInfo = URIParser.parse(url);

		console.log(URLInfo);

		// if an invalid URl is passed
		if (URLInfo.isValid !== true) {
			// do nothing
			return;
		}

		if (URLInfo.type === "http") {
			webViewEl.setAttribute("src", URLInfo.formattedURI);
		}

		else if (URLInfo.type === "file") {
			console.log("User has entered a file URL into the addressbar: " + url);
			webViewEl.setAttribute("src", URLInfo.formattedURI);
		}

		else if (URLInfo.type === "page") {
			console.log("Opening HTML template file " + url);
			webViewEl.setAttribute("src", URLInfo.formattedURI);
		}

		else if (URLInfo.type === "internal") {
			console.log("User has navigated to an internal link: " + url);
		}

		else if (URLInfo.type === "search") {
			console.log("User has searched " + url);
			webViewEl.setAttribute("src", URLInfo.formattedURI);
		}
	};

	/**
	 * activate TabView (user clicks on browser tab)
	 */
	_this.activate = function() {
		webViewEl.style.visibility = "visible";
		tabEl.classList.add("active");
	};

	/**
	 * activate TabView (user clicks on another browser tab)
	 */
	_this.deactivate = function() {
		webViewEl.style.visibility = "hidden";
		tabEl.classList.remove("active");
	};

	/**
	 * returns whether "dom-ready" was fired at least once in the <webview> object
	 *
	 * @returns {boolean} whether dom-ready was fired at least once in the <webview> object
	 */
	_this.isDOMReady = function() {
		return isDOMReady;
	};

	/**
	 * close current TabView
	 */
	_this.close = function() {
		// find the index of tab being closed
		var tabIndex = Array.prototype.indexOf.call(browserTabsWrapperEl.querySelectorAll(".tab"), tabEl);

		hackBrowserWindow.closeTabById(tabViewId, tabIndex);

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

	_this.updateFavicon = function(imageURL) {
		tabFaviconEl.setAttribute("src", imageURL);
	};

	_this.updateTabTitle = function(title) {
		tabEl.querySelector(".title").innerText = title;
	};

	init(url);
}