const DataStore = require('nedb')
const db = new DataStore({
	filename: global.__app.dataPath + '/user-settings.db',
	autoload: true
})

let UserSetting = {}

/**
 * reset user settings
 */
UserSetting.reset = function() {

}

/**
 * set a specific setting for a user
 *
 * @param settingKey
 * @param settingValue
 * @param callback
 */
UserSetting.set = function(settingKey, settingValue, callback) {
	db.update({
		settingKey: settingValue
	},
	{
		upsert: true
	},
	function() {
		console.log('setting complete')
	})
}

module.exports = UserSetting