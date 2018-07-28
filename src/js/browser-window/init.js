// exposed controller for communication
let hackBrowserWindow

(function() {
	// bootstrap
	let init = function() {
		hackBrowserWindow = new HackBrowserWindow()

		attachEventListeners() 
	}

	let attachEventListeners = function() {
		document.addEventListener('mousewheel', handleMouseWheel, false)
	}

	let handleMouseWheel = function(e) {
		// If ctrl key is pressed, zoom in/out
		if (e.ctrlKey) {
			// If mousewheel downwards, zoom out
			if (e.deltaY > 0) {
				// Zoom out
				hackBrowserWindow.getActiveTabView().zoomOut() 
			}

			// If mousewheel upwards, zoom in
			else if (e.deltaY < 0) {
				// Zoom in
				hackBrowserWindow.getActiveTabView().zoomIn() 
			}

			else {
				// Do nothing if no change
			}
		}
	} 

	if (document.readyState === 'complete' || document.readyState === 'loaded') {
		init()
	} else {
		document.addEventListener('DOMContentLoaded', function() {
			init()
		})
		 
	}
})()