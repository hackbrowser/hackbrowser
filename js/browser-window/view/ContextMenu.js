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
		webViewWrapperEl.addEventListener("contextmenu", function(e) {
			e.preventDefault();

			_this.popup();
		});
	};


	/* ====================================
	 public methods
	 ====================================== */

	_this.popup = function() {
		var browserContextMenu = Menu.buildFromTemplate(windowContextMenuTemplate);

		browserContextMenu.popup(remote.getCurrentWindow());
	};

	init();
}