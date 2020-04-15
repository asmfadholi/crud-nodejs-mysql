var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

const query = util.promisify(con.query).bind(con);

module.exports = query;