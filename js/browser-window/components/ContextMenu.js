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
			click: function(item, focusedWindow) {
				console.log("clicked back");
				console.log(item);
				console.log(focusedWindow);

				// hackBrowserWindow.goBack();
			}
		}
	];

	/* ====================================
	 private methods
	 ====================================== */
	var init = function() {
		var browserContextMenu = Menu.buildFromTemplate(windowContextMenuTemplate);

		window.addEventListener("contextmenu", function(e) {
			e.preventDefault();
			browserContextMenu.popup(remote.getCurrentWindow());
		});
	};

	/* ====================================
	 public methods
	 ====================================== */

	/**
	 * attach event handlers for menu bar buttons
	 */
	var attachEventHandlers = function() {
	};

	init();
}