'use strict';

const Datastore = require('nedb');
const db = new Datastore({ filename: GLOBAL.__app.dataPath + '/navigation-history.db', autoload: true });

var NavigationHistory = {};

NavigationHistory.addNavigationHistory = function(navigationInfo, callback) {
	db.insert(navigationInfo, function(err, newDoc) {
		if (err) {
			callback(err);
		} else {
			callback();
		}

		console.log(newDoc);
	});
};

/**
 * Clears history
 *
 * @param callback function to be called when all documents are removed (function(err, numRemoved))
 */
NavigationHistory.clearNavigationHistory = function(callback) {
	db.remove({}, callback);
};

NavigationHistory.getAutoCompleteList = function(searchTerm) {

};

module.exports = NavigationHistory;