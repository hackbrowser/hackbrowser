'use strict';

/**
 * since there can only be one main process at any point,
 * all methods must be static
 */
class IPCMainProcessHandler {
	static registerIPCListeners() {
		console.log("Hello");
	}
}

module.exports = IPCMainProcessHandler;