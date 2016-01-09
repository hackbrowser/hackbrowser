'use strict';

/**
 * Context menu and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function ContextMenu(hackBrowserWindow) {
	const remote = require('electron').remote;
	const Menu = remote.Menu;

	var _this = this;

	/* ====================================
	 private member variables
	 ====================================== */
	var webViewWrapperEl;


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		webViewWrapperEl = document.getElementById("webview-wrapper")

		// TODO: retrieve event from injected Javascript to check if right-click was performed on an image
		// attachEventHandlers();
	};

	/**
	 * attach event handlers
	 */
	var attachEventHandlers = function() {
	};


	/* ====================================
	 public methods
	 ====================================== */

	_this.openGeneralContextMenu = function() {
		var windowContextMenuTemplate = [
			{
				label: 'Back',
				accelerator: 'Alt+Left',
				enabled: hackBrowserWindow.getActiveTabView().canGoBack(),
				click: function(item, focusedWindow) {
					console.log("clicked back");
					hackBrowserWindow.goBack();
				}
			},
			{
				label: "Forward",
				accelerator: "Alt+Right",
				enabled: hackBrowserWindow.getActiveTabView().canGoForward(),
				click: function(item, focusedWindow) {
					console.log("clicked forward");
					hackBrowserWindow.goForward();
				}
			},
			{
				label: "Reload",
				accelerator: "CmdOrCtrl+R",
				click: function(item, focusedWindow) {
					hackBrowserWindow.reload();
				}
			},
			{
				type: "separator"
			},
			{
				label: "Print",
				accelerator: "CmdOrCtrl+P",
				click: function(item, focusedWindow) {
					console.log("clicked print");
					hackBrowserWindow.getActiveTabView().getWebViewEl().print();
				}
			}
		];

		var browserContextMenu = Menu.buildFromTemplate(windowContextMenuTemplate);

		browserContextMenu.openGeneralContextMenu(remote.getCurrentWindow());
	};

	init();
}