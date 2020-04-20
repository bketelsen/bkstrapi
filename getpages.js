require('dotenv/config');
const yaml = require('js-yaml');
const axios = require('axios');
const urlSlug = require('url-slug');
const { writeFileSync } = require('fs');

const PRES_URL = 'https://content.brian.dev/pages?_sort=id:DESC';
console.log(PRES_URL);
const SEPARATOR = '---';
axios
	.get(PRES_URL, {
		headers: {
			Accept: 'application/json',
		},
	})
	.then(({ data }) =>
		data.forEach(function (page) {
			var slug = urlSlug(page.slug);
			console.log(slug);
			let frontmatter = {
				title: page.title,
				slug: slug,
				image: {
					url: page.featured_image.url,
					credit: page.photo_credit,
					credit_url: page.photo_credit_url
				}
			};

			let yamlStr = yaml.safeDump(frontmatter);
			writeFileSync(
				__dirname + '/content/pages/' + slug.toLowerCase() + '.md',
				SEPARATOR + '\n' + yamlStr + '\n' + SEPARATOR + '\n\n' + page.content + '\n'
			)
		}

		)
	);
