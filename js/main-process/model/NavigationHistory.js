'use strict';

const Datastore = require('nedb');
const db = new Datastore({ filename: global.__app.dataPath + '/navigation-history.db', autoload: true });

var NavigationHistory = {};

NavigationHistory.addNavigationHistory = function(navigationInfo, callback) {
	// add navigation history timestamp
	navigationInfo.date = new Date();

	db.insert(navigationInfo, function(err, newDoc) {
		if (err) {
			callback(err);
		} else {
			callback();
		}
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

NavigationHistory.getAutoCompleteList = function(searchTerm, callback) {
	var searchRegEx = new RegExp(searchTerm);

	db.find({
		url: searchRegEx
	})
		.limit(10)
		.exec(function(err, autoCompleteEntries) {
			callback(autoCompleteEntries);
		});
};

module.exports = NavigationHistory;