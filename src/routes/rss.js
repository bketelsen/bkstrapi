import { getPosts } from './_posts.js';
import { siteUrl } from '../stores/_config.js';
import urlSlug from 'url-slug';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
	<title><![CDATA[Brian Ketelsen]]></title>
	<link>${siteUrl}</link>
  <description><![CDATA[A developer's blog. Might be useful. Maybe.]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
	<image>
		<url>${siteUrl}/me.jpg</url>
		<title><![CDATA[Brian Ketelsen]]></title>
		<link>${siteUrl}</link>
	</image>
	${posts.map(post => `
		<item>
			<title>${post.title}</title>
      <link>${siteUrl}/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/${post.slug}</guid>
			<description><![CDATA[${post.description}]]></description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>
	`).join('\n')}
</channel>
</rss>`;

export function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const posts = getPosts().then(p => {
      return p.map(post => {
          return {
              title: post.title,
              date: post.published_at,
              description: post.excerpt,
              slug: "blog/" + urlSlug(post.slug)
          }
      })
    });
  posts.then(pp => {
      const feed = renderXmlRssFeed(pp);
      res.end(feed);
  })

}