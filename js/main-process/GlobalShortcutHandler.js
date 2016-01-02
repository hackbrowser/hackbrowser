const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;

var GlobalShortcutHandler = {};

GlobalShortcutHandler.registerAll = function() {
	var ret = globalShortcut.register("ctrl+x", function() {
		console.log("ctrl+x is pressed");
	});
};

module.exports = GlobalShortcutHandler;