import publication from '../../content/publications/brian.dev/brian.dev.json';
import urlSlug from 'url-slug';


const lookup = new Map();
publication.pages.forEach(page => {
	lookup.set(urlSlug(page.slug), JSON.stringify(page));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
  const { slug } = req.params;
	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
