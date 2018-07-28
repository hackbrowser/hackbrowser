const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const PersistentStorage = require(path.join(__app.srcPath, 'js', 'common', 'PersistentStorage'))
const logger = global.__app.logger

/**
 * HackBrowserWindowManager handles opening and closing of browser windows
 *
 * @constructor
 */
const HackBrowserWindowManager = {}
const windowList = {}
let createdWindowCount = 0


// TODO: navigate to specified url
HackBrowserWindowManager.openNewWindow = function(url) {
	let _this = this

	// get last browser size
	PersistentStorage.getItem('browserWindowSize', function(err, browserSize) {
		if (err) {
			browserSize = {
				width: 1000,
				height: 800
			}

			logger.debug('Could not get browserWindowSize from PersistentStorage')
			logger.debug(browserSize)
		} else {
			logger.debug('Got browserWindowSize from PersistentStorage')
			logger.debug(browserSize)
		}

		// create the browser window
		let newWindow = new BrowserWindow({
			width: browserSize.width,
			height: browserSize.height,
			frame: false
		})

		newWindow.initialURL = url

		// TODO: Use path.join or some other URL concat method
		// load the HTML file for browser window
		newWindow.loadURL("file://" + __app.srcPath + "/html-pages/browser-window.html")

		// Open the DevTools (debugging)
		newWindow.webContents.openDevTools()
		windowList[newWindow.id] = newWindow

		_this.attachEventHandlers(newWindow)

		// increase window count
		createdWindowCount++
	})
}

HackBrowserWindowManager.attachEventHandlers = function(browserWindow) {
	let _this = this

	let windowId = browserWindow.id

	// save browser window's width/height when user closes it
	browserWindow.on('close', function() {
		let size = browserWindow.getSize()

		let sizeObject = {
			'width': size[0],
			'height': size[1]
		}

		// save to persistent storage
		PersistentStorage.setItem('browserWindowSize', sizeObject)
	})

	// remove the window from windowList and remove reference so that GC can clear it from memory
	browserWindow.on('closed', function() {
		if (windowList.hasOwnProperty(windowId)) {
			console.log('deleting window ' + windowId)

			delete windowList[windowId]
			browserWindow = null
		}
	})
}

module.exports = HackBrowserWindowManager