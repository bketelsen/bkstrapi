import publication from '../../../content/publications/brian.dev/brian.dev.json';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});


	res.end(JSON.stringify(publication.projects));
}