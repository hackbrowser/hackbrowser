const DataStore = require('nedb')
const db = new DataStore({ filename: global.__app.dataPath + '/user-data.db', autoload: true })

let UserData = {}

module.exports = UserData