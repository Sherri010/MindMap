const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5678/mindmap';

const client = new pq.Client(connectionString);
client.connect();

const query = client.query(
	'CREATE TABLE tags(id SERIAL PRIMARY KEY, name VARCHAR(40) not null'
);

query.on('end', () => { client.end(); })