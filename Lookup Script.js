const pg = require("pg");
const settings = require("./settings"); // settings.json
var input = process.argv[2];
var moment = require('moment');
moment().format();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  var query_arguments = [input];
  client.query('SELECT * from famous_people WHERE first_name = $1 OR last_name = $1 ', query_arguments, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

 	result.rows.forEach(function (obj, index) {
      console.log(`- ${obj.first_name} ${obj.last_name}, born '${moment(obj.birthdate).format("Y-MM-DD")}'`);

  	});

    client.end();
  });
});

