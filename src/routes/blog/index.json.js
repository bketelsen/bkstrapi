import publication from '../../../content/publications/brian.dev/brian.dev.json';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});


	publication.articles.sort((a, b) => {
		const bdate = new Date(b.published_at);
		const adate = new Date(a.published_at);
		return bdate - adate
	});
	res.end(JSON.stringify(publication.articles));
}