const pg = require("pg");
const settings = require("./settings"); // settings.json
var input = process.argv[2];

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  }
});

var first_name = process.argv[2];
var last_name = process.argv[3];
var dob = process.argv[4];

knex('famous_people')
  .select('*')
  .insert([{first_name: first_name, last_name: last_name, birthdate: dob}])
  .returning('*')
  .asCallback(function (err, result){
    console.log(result);
  })