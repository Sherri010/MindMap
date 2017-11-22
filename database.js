const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mindmap';

const client = new pg.Client(connectionString);
client.connect();

// const query = client.query(
// 	'INSERT INTO tags(id, name) VALUES($1, $2)', ['1', 'test']
// );

module.exports = client;
