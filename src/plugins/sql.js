"use strict";

const postgres = require( "postgres" );

module.exports = {
	name: "sql",
	version: "1.0.0",
	register: async server => {
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
		// create the sql client
		const sql = postgres(options);

		// add to the request toolkit e.g. h.sql
		server.decorate( "toolkit", "sql", sql );
	}
};
