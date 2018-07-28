'use strict'

/**
 * Context menu and related controls
 *
 * @param hackBrowserWindow
 * @constructor
 */
function ContextMenuHandler(hackBrowserWindow) {
	const remote = require("electron").remote
	const clipboard = require("electron").clipboard
	const Menu = remote.Menu

	let _this = this

	/* ====================================
	 private member variables
	 ====================================== */
	let webViewWrapperEl


	/* ====================================
	 private methods
	 ====================================== */
	let init = function() {
		webViewWrapperEl = document.getElementById("webview-wrapper")
	}

	/**
	 * open general context menu in <webview>
	 * this is in case the user clicks on a general area of <webview> tag
	 * (excluding links and images)
	 */
	let openWebViewDocumentContextMenu = function() {
		console.log("openWebViewDocumentContextMenu()")

		let template = [
			{
				label: "Back",
				accelerator: "Alt+Left",
				enabled: hackBrowserWindow.getActiveTabView().getWebViewEl().canGoBack(),
				click: function(item, focusedWindow) {
					hackBrowserWindow.goBack()
				}
			},
			{
				label: "Forward",
				accelerator: "Alt+Right",
				enabled: hackBrowserWindow.getActiveTabView().getWebViewEl().canGoForward(),
				click: function(item, focusedWindow) {
					hackBrowserWindow.goForward()
				}
			},
			{
				label: "Reload",
				accelerator: "CmdOrCtrl+R",
				click: function(item, focusedWindow) {
					hackBrowserWindow.reload()
				}
			},
			{
				type: "separator"
			},
			{
				label: "Print",
				accelerator: "CmdOrCtrl+P",
				click: function(item, focusedWindow) {
					console.log("clicked print")
					hackBrowserWindow.getActiveTabView().getWebViewEl().print()
				}
			}
		]

		let contextMenu = Menu.buildFromTemplate(template)

		contextMenu.popup(remote.getCurrentWindow())
	}

	/**
	 * Open context menu for <a> type element (or its children)
	 *
	 * @param link {string} url for the link
	 */
	let openWebViewLinkContextMenu = function(link) {
		let template = [
			{
				label: "Open link in new tab",
				click: function(item, focusedWindow) {
					hackBrowserWindow.addNewTab(link, false)
				}
			},
			{
				label: "Open link in new window",
				click: function(item, focusedWindow) {
					hackBrowserWindow.getIPCHandler().requestNewWindowOpen(link)
				}
			},
			{
				label: "Copy link address",
				click: function(item, focusedWindow) {
					clipboard.writeText(link)
				}
			}
		]

		let contextMenu = Menu.buildFromTemplate(template)

		contextMenu.popup(remote.getCurrentWindow())
	}


	/* ====================================
	 public methods
	 ====================================== */

	/**
	 * dispatch an action based on the passed object containing right click event information
	 *
	 * @param msgObject {object} details of context menu object
	 */
	_this.handleWebViewContextMenu = function(msgObject) {
		console.log("handleWebViewContextMenu()")
		console.log(msgObject)

		if (msgObject.type === "document") {
			console.log("documnet")
			openWebViewDocumentContextMenu()
		}

		else if (msgObject.type === "link") {
			openWebViewLinkContextMenu(msgObject.href)
		}

		else if (msgObject.type === "image") {

		}
	}

	init()
}
