'use strict';

/**
 * TabView consists of a browser tab and it's associated webview
 *
 * @param {HackBrowserWindow} hackBrowserWindow - the browser window
 * @param {string} url - initial url
 *
 * @constructor
 */
function TabView(hackBrowserWindow, browserTabBar, url) {
	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var webViewEl;
	var webViewTitle;
	var webViewURL;
	var webViewWrapperEl;
	var tabViewId;
	var browserTab;
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
		webViewWrapperEl = document.getElementById("webview-wrapper");
		isDOMReady = false;
		tabViewId = "wv-" + hackBrowserWindow.getCreatedTabViewCount();

		// increase created tab view count
		hackBrowserWindow.increaseCreatedTabViewCount();

		webViewEl.setAttribute("id", tabViewId);
		webViewEl.setAttribute("plugins", "");
		webViewEl.setAttribute("disablewebsecurity", "");

		if (url === null) {
			_this.navigateTo("./new-tab.html");
		} else {
			_this.navigateTo(url);
		}

		// append the webview element to screen (#webview-wrapper)
		webViewWrapperEl.appendChild(webViewEl);

		browserTab = browserTabBar.createTab(tabViewId);
		attachEventHandlers();
	};

	var attachEventHandlers = function() {
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

			// TODO:
		});

		webViewEl.addEventListener("did-frame-finish-load", function(e) {
			webViewURL = webViewEl.getURL();
		});

		webViewEl.addEventListener("did-start-loading", function() {
			console.log("[" + tabViewId + "] did-start-loading");

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.getMenuBar().showLoadStopBtn();
			}
		});

		webViewEl.addEventListener("did-stop-loading", function() {
			console.log("[" + tabViewId + "] did-stop-loading");

			if (hackBrowserWindow.getActiveTabView() === _this) {
				hackBrowserWindow.getMenuBar().showReloadBtn();
			}
		});

		webViewEl.addEventListener("did-get-response-details", function(e) {
			console.log("[" + tabViewId + "] did-get-response-details");
		});

		webViewEl.addEventListener("did-get-redirect-request", function(e) {
			console.log("[" + tabViewId + "] did-get-redirect-request");
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

			// the last element in favicons array is used
			_this.updateTabFavicon(e.favicons[e.favicons.length - 1]);
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
		browserTab.activate();
	};

	/**
	 * activate TabView (user clicks on another browser tab)
	 */
	_this.deactivate = function() {
		webViewEl.style.visibility = "hidden";
		browserTab.deactivate();
	};

	/**
	 * check whether navigation actions (back, forward, reload, etc) can be performed on <webview>
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
		// remove webview element
		webViewWrapperEl.removeChild(webViewEl);

		// remove browser tab
		browserTab.close();
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

	_this.updateTabFavicon = function(imageURL) {
		browserTab.updateTabFavicon(imageURL);
	};

	_this.updateTabTitle = function(title) {
		browserTab.updateTitle(title);
	};

	init(url);
}