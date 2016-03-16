// exposed controller for communication
var hackBrowserWindow;

(function() {
	'use strict';

	// bootstrap
	var init = function() {
		hackBrowserWindow = new HackBrowserWindowController();
	};

	if (document.readyState === "complete" || document.readyState === "loaded") {
		init();
	} else {
		document.addEventListener("DOMContentLoaded", function() {
			init();
		});
	}
})(); 