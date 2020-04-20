require('dotenv/config');
const yaml = require('js-yaml');
const axios = require('axios');
const urlSlug = require('url-slug');
const { writeFileSync, mkdirSync } = require('fs');

const PRES_URL = 'https://content.brian.dev/publications?_sort=id:ASC';
console.log(PRES_URL);
const SEPARATOR = '---';
axios
	.get(PRES_URL, {
		headers: {
			Accept: 'application/json',
		},
	})
	.then(({ data }) =>
		data.forEach(function (pub) {
			const pubDir = __dirname + '/content/publications/' + pub.name.toLowerCase() + '/articles';
			mkdirSync(
				__dirname + '/content/publications/' + pub.name.toLowerCase() + '/articles',
				{
					recursive: true,
					mode: 0o777
				}
			);

			mkdirSync(
				__dirname + '/content/publications/' + pub.name.toLowerCase() + '/pages',
				{
					recursive: true,
					mode: 0o777
				}
			);
			writeFileSync(
				__dirname + '/content/publications/' + pub.name.toLowerCase() + '/' + pub.name.toLowerCase() + '.json',
				JSON.stringify(pub)
			);

			pub.articles.forEach(function (post) {
				var slug = urlSlug(post.slug);
				console.log(slug);
				let frontmatter = {
					title: post.title,
					date: post.published_at,
					draft: !post.live,
					excerpt: post.excerpt,
					slug: slug,
					image: {
						url: post.image.url,
						credit: post.title,
						credit_url: "#"
					},
					publication: post.publication
				};

				let yamlStr = yaml.safeDump(frontmatter);
				writeFileSync(
					__dirname + '/content/publications/' + pub.name.toLowerCase() + '/articles/' + slug + '.md',
					SEPARATOR + '\n' + yamlStr + '\n' + SEPARATOR + '\n\n' + post.content + '\n',
					{
						encoding: 'utf8'
					}
				)
			});
			pub.pages.forEach(function (page) {
				var slug = urlSlug(page.slug);
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
					__dirname + '/content/publications/' + pub.name.toLowerCase() + '/pages/' + slug + '.md',
					SEPARATOR + '\n' + yamlStr + '\n' + SEPARATOR + '\n\n' + page.content + '\n'
				)
			})
		}

		)
	);
