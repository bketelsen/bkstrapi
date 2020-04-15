dev: youtube
	yarn dev

export: youtube 
	yarn export

youtube:
	yarn youtube

publish: export
	wrangler publish

production: export
	wrangler publish -e production

slide:
	pandoc -t revealjs -s -o output.html input.md -V revealjs-url=/reveal.js -V showNotes=false

# run yarn getslides first, then yarn makeslides, then this
slides:
	yarn slides
	yarn makeslides
	for name in tempslides/*.md; \
	do \
		mkdir -p static/slides/`basename -s .md $${name}`; \
		pandoc -t revealjs -s -o static/slides/`basename -s .md $${name}`/index.html $${name} -V revealjs-url=/reveal.js -V showNotes=false; \
	done