'use strict';

/**
 * HackBrowserWindow controls all
 *
 * @constructor
 */
function HackBrowserWindow() {
	var _this = this;

	/* ====================================
		private member variables
	 ====================================== */
	var activeTabView;
	var createdTabViewCount;
	var tabList;

	var menuBar;
	var addTabBtnEl;


	/* ====================================
		private methods
	 ====================================== */
	var init = function() {
		// create a new MenuBar object associated with current browser window
		menuBar = new MenuBar(_this);
		createdTabViewCount = 0;
		tabList = {};
		addTabBtnEl = document.getElementById("add-tab");

		_this.addNewTab("http://www.hackbrowser.com", true);

		attachEventHandlers();
	};

	var attachEventHandlers = function() {
		addTabBtnEl.addEventListener("click", function(e) {
			_this.addNewTab("http://www.github.com", true);

			e.preventDefault();
		});
	};

	/* ====================================
		public methods
	 ====================================== */
	_this.navigateTo = function(url) {
		activeTabView.navigateTo(url);
	};

	_this.updateWindowTitle = function(title) {
		document.title = title;
	};

	_this.addNewTab = function(url, activate) {
		var newTabView = new TabView(_this, url);
		var newTabViewId = newTabView.getId();

		tabList[newTabViewId] = newTabView;

		if (activate === true) {
			_this.activateTabById(newTabViewId);
		}
	};

	_this.activateTabById = function(tabViewId) {
		if (activeTabView && (activeTabView.getId() === tabViewId)) {
			console.log("already active tab");
			return;
		}

		if(tabList.hasOwnProperty(tabViewId) === true) {
			if (activeTabView) {
				activeTabView.deactivate();
			}

			activeTabView = tabList[tabViewId];

			var activatedWebViewEl = activeTabView.getWebViewEl();

			// activate new tab view
			activeTabView.activate();

			// update back/forward button status
			menuBar.updateBtnStatus(activatedWebViewEl);

			// update page url
			menuBar.updateUrl(activatedWebViewEl.getURL());

			// update page title
			_this.updateWindowTitle(activatedWebViewEl.getTitle());
		}
	};

	_this.getActiveTabView = function() {
		return activeTabView;
	};

	_this.increaseCreatedTabViewCount = function() {
		createdTabViewCount++;
	};

	_this.getCreatedTabViewCount = function() {
		return createdTabViewCount;
	};

	_this.goBack = function() {
		if (activeTabView.getWebViewEl().canGoBack() === true) {
			activeTabView.getWebViewEl().goBack();
		}
	};

	_this.reload = function() {
		activeTabView.getWebViewEl().reload();
	};

	_this.goForward = function() {
		if (activeTabView.getWebViewEl().canGoForward() === true) {
			activeTabView.getWebViewEl().goForward();
		}
	};

	init();
}
