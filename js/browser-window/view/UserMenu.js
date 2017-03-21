'use strict';

/**
 * User menu and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function UserMenu(hackBrowserWindow) {
	const electron = require('electron'); 
	const remote = electron.remote; 
	const Menu = remote.Menu;
	const logger = remote.getGlobal('__app').logger; 

	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var userMenuBtnEl;

	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		userMenuBtnEl = document.getElementById('button-menu'); 

		attachEventListeners(); 
	};

	var attachEventListeners = function() {
		userMenuBtnEl.addEventListener('click', buildUserMenu, false); 
	};

	/**
	 * open general context menu in <webview>
	 * this is in case the user clicks on a general area of <webview> tag
	 * (excluding links and images)
	 */
	var buildUserMenu = function() {
		console.log("openWebViewDocumentContextMenu()");

		var template = [
			{
				label: "New tab",
				accelerator: "Alt+Left",
				enabled: true, 
				click: function(item, focusedWindow) {
					logger.debug('New Tab'); 
				}
			},
			{
				label: "New window",
				accelerator: "Alt+Right",
				enabled: true,
				click: function(item, focusedWindow) {
					logger.debug('New window'); 
					// hackBrowserWindow.goForward();
				}
			},
			{
				type: "separator"
			},
			{
				label: "Print",
				accelerator: "CmdOrCtrl+P",
				click: function(item, focusedWindow) {
					// hackBrowserWindow.getActiveTabView().getWebViewEl().print();
					logger.debug('Print'); 
				}
			}
		];

		var userMenu = Menu.buildFromTemplate(template);

		userMenu.popup(remote.getCurrentWindow());
	};


	/* ====================================
	 public methods
	 ====================================== */

	/**
	 * Open user menu
	 */
	_this.openUserMenu = function() {
		buildUserMenu(); 
	};

	init();
}
