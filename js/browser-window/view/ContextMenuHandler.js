'use strict';

/**
 * Context menu and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function ContextMenuHandler(hackBrowserWindow) {
	const remote = require("electron").remote;
	const clipboard = require("electron").clipboard;
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

	/**
	 * open general context menu in <webview>
	 * this is in case the user clicks on a general area of <webview> tag
	 * (excluding links and images)
	 */
	var openWebViewDocumentContextMenu = function() {
		console.log("openWebViewDocumentContextMenu()");

		var template = [
			{
				label: "Back",
				accelerator: "Alt+Left",
				enabled: hackBrowserWindow.getActiveTabView().getWebViewEl().canGoBack(),
				click: function(item, focusedWindow) {
					hackBrowserWindow.goBack();
				}
			},
			{
				label: "Forward",
				accelerator: "Alt+Right",
				enabled: hackBrowserWindow.getActiveTabView().getWebViewEl().canGoForward(),
				click: function(item, focusedWindow) {
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

		var contextMenu = Menu.buildFromTemplate(template);

		contextMenu.popup(remote.getCurrentWindow());
	};

	var openWebViewLinkContextMenu = function(link) {
		console.log("openWebViewLinkContextMenu()");

		var template = [
			{
				label: "Open link in new tab",
				click: function(item, focusedWindow) {
					hackBrowserWindow.addNewTab(link);
				}
			},
			{
				label: "Open link in new window",
				click: function(item, focusedWindow) {
					hackBrowserWindow.addNewTab(link);
				}
			},
			{
				label: "Copy link address",
				click: function(item, focusedWindow) {
					clipboard.writeText(link);
				}
			}
		];

		var contextMenu = Menu.buildFromTemplate(template);

		contextMenu.popup(remote.getCurrentWindow());
	};


	/* ====================================
	 public methods
	 ====================================== */

	_this.handleWebViewContextMenu = function(msgObject) {
		console.log("handleWebViewContextMenu()");
		console.log(msgObject);

		if (msgObject.type === "document") {
			console.log("documnet");
			openWebViewDocumentContextMenu();
		}

		else if (msgObject.type === "link") {
			openWebViewLinkContextMenu(msgObject.href);
		}

		else if (msgObject.type === "image") {

		}
	};

	init();
}