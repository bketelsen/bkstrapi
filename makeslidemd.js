var fs = require('fs');
const { writeFileSync } = require('fs');

var obj;
fs.readFile('./static/presentations.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
	console.log(obj);

	obj.forEach(function (pres) {
		var slug = pres.slug;
		console.log(slug);
		writeFileSync(
			__dirname + '/static/slides/' + slug + '.md',
			pres.slide_content
		)
		writeFileSync(
			__dirname + '/static/slides/' + slug + '.html',
			`
<html>
	<head>
		<link rel="stylesheet" href="/reveal.js/css/reveal.css">
		<link rel="stylesheet" href="/reveal.js/css/theme/solarized.css">
	</head>
	<body>
		<div class="reveal">
			<div class="slides">
                <section data-markdown="/slides/` + slug + '.md' + `"
                data-separator-notes="^Note:"
                data-charset="iso-8859-15">
                </section>
			</div>
		</div>
        <script src="/reveal.js/js/reveal.js"></script>
		<script src="/reveal.js/plugin/markdown/marked.js"></script>
		<script src="/reveal.js/plugin/markdown/markdown.js"></script>
		<script>
			Reveal.initialize();
		</script>
	</body>
</html>`
		)
	});
});
