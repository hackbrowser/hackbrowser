'use strict'

/**
 * User menu and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function UserMenu(hackBrowserWindow) {
	const electron = require('electron') 
	const remote = electron.remote 
	const Menu = remote.Menu
	const logger = remote.getGlobal('__app').logger 

	let menuTemplate 

	// An estimate of the user menu's width
	// Since there is no way to programmatically get the width 
	// of user menu, the fixed value here is used to open the logger
	const menuWidth = 221

	let _this = this

	/* ====================================
	 private member variables
	 ====================================== */
	let userMenuBtnEl

	/* ====================================
	 private methods
	 ====================================== */
	let init = function() {
		userMenuBtnEl = document.getElementById('button-menu') 

		menuTemplate = [
			{
				label: "New tab",
				accelerator: "Ctrl+T",
				enabled: true, 
				click: function(item, focusedWindow) {
					logger.debug('New Tab') 
				}
			},
			{
				label: "New window",
				accelerator: "Ctrl+N",
				enabled: true,
				click: function(item, focusedWindow) {
					logger.debug('New window') 
					// hackBrowserWindow.goForward()
				}
			},
			{
				type: "separator"
			},
			{
				label: "Print",
				accelerator: "CmdOrCtrl+P",
				click: function(item, focusedWindow) {
					hackBrowserWindow.getActiveTabView().getWebViewEl().print()
				}
			}
		] 

		attachEventListeners() 
	}

	let attachEventListeners = function() {
		userMenuBtnEl.addEventListener('click', handleMenuBtnClick, false) 
	}

	let handleMenuBtnClick = function(e) {
		e.preventDefault() 

		showUserMenu() 
	}

	let calculateOpenPosition = function() {
		// Calculate open position
		let browserWindowContentBounds = electron.remote.getCurrentWindow().getContentBounds()
		let windowXPos = browserWindowContentBounds.x
		let windowWidth = browserWindowContentBounds.width

		return {
			x: windowWidth - menuWidth, 
			y: 60
		}
	} 

	/**
	 * Build and show user menu
	 */
	let buildUserMenu = function() {
		var userMenu = Menu.buildFromTemplate(menuTemplate) 

		return userMenu 
	}

	let showUserMenu = function() {
		let userMenu = buildUserMenu() 
		let openPosition = calculateOpenPosition() 

		userMenu.popup(remote.getCurrentWindow(), { 
			x: openPosition.x, 
			y: openPosition.y, 
			async: true 
		})
	}


	/* ====================================
	 public methods
	 ====================================== */

	/**
	 * Open user menu
	 */
	_this.open = function() {
		showUserMenu() 
	}

	init()
}