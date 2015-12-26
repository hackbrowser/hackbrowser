'use strict'; 

const fs = require("fs"); 

/*
	A very thin wrapper around file IO to store/retrieve JSON for persistence
*/
function PersistentStorage() {
	this.dataPath = __app.basePath + "/.data/"; 
}; 

PersistentStorage.getItem = function(key, callback) {

}; 

PersistentStorage.getItemSync = function(key) {

}; 

PersistentStorage.setItem = function(key, value, callback) {
	if (typeof value === "object" && !Array.isArray(value)) {
		if (this.isCyclic(value)) {
			throw "Object to store cannot be cyclic"; 
		}

		// if safe to stringify, go ahead and stringify data
		value = JSON.stringify(value); 

		// Save to file
		fs.writeFile(this.dataPath + key + ".json", value, callback); 
	} else {
		throw "Value must be of an object type"; 
	}
}; 

PersistentStorage.setItemSync = function(key, value) {

}; 

// check whether the object is cyclic
// if object is cyclic, TypeError will be thrown while 
// stringify-ing the object we're trying to save into JSON

// References
// http://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
// http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
PersistentStorage.isCyclic = function(obj) {
	var seenObjects = [];

	function detect (obj) {
		if (obj && typeof obj === 'object') {
			if (seenObjects.indexOf(obj) !== -1) {
				return true;
			}
			seenObjects.push(obj);
			for (var key in obj) {
				if (obj.hasOwnProperty(key) && detect(obj[key])) {
					console.log(obj, 'cycle at ' + key);
					return true;
				}
			}
		}
		return false;
	}

	return detect(obj);
}; 

module.exports = PersistentStorage; 