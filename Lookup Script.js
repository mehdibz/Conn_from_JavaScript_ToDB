const pg = require("pg");
const settings = require("./settings"); // settings.json
var input = process.argv[2];

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
  client.query('SELECT * from famous_people WHERE first_name = $1 OR last_name = $1 LIMIT 1', query_arguments, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows); //output: 1
    // client.end((err) => { console.log("all gone");});
    client.end();
  });
});
