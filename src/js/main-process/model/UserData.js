const DataStore = require('nedb')
const db = new DataStore({ filename: global.__app.dataPath + '/user-data.db', autoload: true })

var UserData = {}

module.exports = UserData