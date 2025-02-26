"use strict";

const dotenv = require( "dotenv" );
const postgres = require( "postgres" );

const init = async () => {
	// read environment variables
	dotenv.config();

	const options = {
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		database: process.env.PGDATABASE,
		username:process.env.PGUSERNAME,
		password:process.env.PGPASSWORD,
		ssl: {
			rejectUnauthorized: false 
		},
	};
  
	try {
		// connect to the local database server
		const sql = postgres(options);

		console.log( "dropping table, if exists..." );
		await sql`DROP TABLE IF EXISTS measurements`;

		console.log( "creating table..." );
		await sql`CREATE TABLE IF NOT EXISTS measurements (
			id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
			, user_id varchar(50) NOT NULL
			, measure_date date NOT NULL
			, weight numeric(5,1) NOT NULL
		)`;

		await sql.end();
	} catch ( err ) {
		console.log( err );
		throw err;
	}
};

init().then( () => {
	console.log( "finished" );
} ).catch( () => {
	console.log( "finished with errors" );
} );
