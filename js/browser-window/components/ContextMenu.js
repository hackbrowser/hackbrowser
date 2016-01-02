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
	var windowContextMenuTemplate = [
		{
			label: 'Back',
			accelerator: 'Alt+Left',
			enabled: false,
			click: function(item, focusedWindow) {
				console.log("clicked back");
				hackBrowserWindow.goBack();
			}
		},
		{
			label: "Forward",
			accelerator: "Alt+Right",
			enabled: false,
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


	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		attachEventHandlers();
	};

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
		window.addEventListener("contextmenu", function(e) {
			e.preventDefault();
			browserContextMenu.popup(remote.getCurrentWindow());
		});
	};


	/* ====================================
	 public methods
	 ====================================== */

	_this.popup = function() {
		var browserContextMenu = Menu.buildFromTemplate(windowContextMenuTemplate);

		browserContextMenu.popup();
	};

	init();
}