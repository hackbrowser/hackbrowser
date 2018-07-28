'use strict'

/**
 * Browser tabs and related controls
 * BrowserTabBar contains one or more BrowserTab objects
 *
 * @param hackBrowserWindow
 * @constructor
 */
function BrowserTabBar(hackBrowserWindow) {
	let _this = this

	const navTabSelector = '.nav-tab' 

	/* ====================================
	 private member variables
	 ====================================== */
	let browserTabsWrapperEl
	let addTabBtnEl
	let numOpenTabs
	let tabWidth


	/* ====================================
	 private methods
	 ====================================== */
	let init = function() {
		browserTabsWrapperEl = document.getElementById("navtabs")
		addTabBtnEl = document.getElementById("add-tab")
		numOpenTabs = 0

		attachEventHandlers()
	}

	/**
	 * attach event handlers for menu bar buttons
	 */
	let attachEventHandlers = function() {
		addTabBtnEl.addEventListener("click", function(e) {
			hackBrowserWindow.addNewTab(null, true)

			e.preventDefault()
		})

		// browserTabsWrapperEl.addEventListener("drop", handleDrop, false)
	}

	let handleDrop = function(e) {
		console.log(e)

	}

	/**
	 * enable sliding/fade animation for browser tabs
	 */
	let enableAnimation = function() {
		browserTabsWrapperEl.classList.add("animate")
	}

	/**
	 * disable sliding/fade animation for browser tabs
	 */
	let disableAnimation = function() {
		browserTabsWrapperEl.classList.remove("animate")
	}

	/**
	 * adjust each tab's width based on number of tabs and window size
	 */
	let adjustWidth = function() {
		tabWidth = Math.floor((browserTabsWrapperEl.clientWidth - addTabBtnEl.offsetWidth) / numOpenTabs)
		tabWidth = (tabWidth > 200) ? 200 : tabWidth

		let allTabsEl = browserTabsWrapperEl.querySelectorAll(navTabSelector)

		// adjust tab add button's position first since this will kick off animation
		addTabBtnEl.style.left = (tabWidth * allTabsEl.length) + "px"

		for (let i = 0; i < allTabsEl.length; i++) {
			allTabsEl[i].style.left = (tabWidth * i) + "px"
			allTabsEl[i].style.width = tabWidth + "px"
		}
	}


	/* ====================================
	 public methods
	 ====================================== */
	/**
	 * create and add a new tab
	 */
	_this.createTab = function(tabViewId, title) {
		let newTab = new BrowserTab(hackBrowserWindow, tabViewId, title)
		let newTabEl = newTab.getTabEl()

		// increase open tabs count
		numOpenTabs++

		browserTabsWrapperEl.insertBefore(newTabEl, addTabBtnEl)

		// temporarily disable animation
		disableAnimation()

		// adjust css accordingly (each tab's width)
		// adjustWidth()

		// TODO: check if there is any way to avoid using setTimeout here
		setTimeout(enableAnimation, 10)
		// enable animation back on
		// enableAnimation()

		return newTab
	}

	/**
	 * remove a specific tab by tabViewId
	 *
	 * @param tabViewId {string} ID of TabView object to be removed from tabs
	 */
	_this.removeTab = function(tabViewId) {
		let tabEl = browserTabsWrapperEl.querySelector("[data-webview-id='" + tabViewId + "']")
		let tabIndex = Array.prototype.indexOf.call(browserTabsWrapperEl.querySelectorAll(navTabSelector), tabEl)

		hackBrowserWindow.handleTabCloseById(tabViewId)

		browserTabsWrapperEl.removeChild(tabEl)
		numOpenTabs--

		// adjustWidth()

		let tabIdToActivate

		let openTabsElArr = browserTabsWrapperEl.querySelectorAll(navTabSelector)

		if (tabIndex >= openTabsElArr.length) {
			tabIdToActivate = openTabsElArr[tabIndex - 1].dataset.webviewId
		} else {
			tabIdToActivate = openTabsElArr[tabIndex].dataset.webviewId
		}

		hackBrowserWindow.activateTabById(tabIdToActivate)
	}

	init()
}
