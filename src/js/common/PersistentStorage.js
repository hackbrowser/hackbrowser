const fs = require('fs')
const dataPath = global.__app.dataPath

class PersistentStorage {
	static getItem(key, callback) {
		// TODO: add check for valid file name form
		// TODO: Use path.join for joining paths
		let fileToRead = dataPath + key + ".json"

		// check if JSON file exists
		fs.exists(fileToRead, function (exists) {
			// if file with given key name exists, read file
			if (exists === true) {
				fs.readFile(dataPath + key + ".json", function (err, data) {
					if (err) callback(err, null)

					try {
						// parse string to JSON object
						data = JSON.parse(data)

						callback(null, data)
					} catch (e) {
						callback({"message": "Invalid data format"}, null)
					}
				})
			} else {
				callback({"message": "File doesn't exist"}, null)
			}
		})
	}

	static setItem(key, value) {
		// TODO: add check for valid file name format
		// TODO: use path.join to join paths
		let _this = this
		let fileToWrite = global.__app.dataPath + key + ".json"

		if (typeof value === "object" && !Array.isArray(value)) {
			if (_this.isCyclic(value)) {
				throw "Object to store cannot be cyclic"
			}

			// if safe to stringify, go ahead and stringify data
			value = JSON.stringify(value)

			// Save to file
			fs.writeFile(fileToWrite, value, function (err) {
			})
		} else {
			throw "Value must be of an object type"
		}
	}

	// check whether the object is cyclic
	// if object is cyclic, TypeError will be thrown while
	// stringify-ing the object we're trying to save into JSON

	// References
	// http://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
	// http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
	static isCyclic(obj) {
		let seenObjects = []

		function detect(obj) {
			if (obj && typeof obj === 'object') {
				if (seenObjects.indexOf(obj) !== -1) {
					return true
				}
				seenObjects.push(obj)
				for (let key in obj) {
					if (obj.hasOwnProperty(key) && detect(obj[key])) {
						console.log(obj, 'cycle at ' + key)
						return true
					}
				}
			}
			return false
		}

		return detect(obj)
	}
}

module.exports = PersistentStorage