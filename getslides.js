require('dotenv/config');
const axios = require('axios');
const { writeFileSync } = require('fs');

const PRES_URL = 'https://content.brian.dev/presentations?_sort=id:DESC';
console.log(PRES_URL);
axios
	.get(PRES_URL, {
		headers: {
			Accept: 'application/json',
		},
	})
	.then(({ data }) =>
		writeFileSync(
			__dirname + '/static/presentations.json',
			JSON.stringify(
				data
			)
		)
	);
