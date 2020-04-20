import path from "path";
import fs from "fs";
import grayMatter from "gray-matter";
import marked from "marked";
import hljs from "highlight.js";

import go from "highlight.js/lib/languages/go";

const getPost = fileName =>
  fs.readFileSync(path.resolve("content/posts/", `${fileName}.md`), "utf-8");

export function get(req, res, next) {
  const { slug } = req.params;

  // get the markdown text
  const post = getPost(slug);

  // function that expose helpful callbacks
  // to manipulate the data before convert it into html
  const renderer = new marked.Renderer();
  hljs.registerLanguage('go', go);
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });


  // parse the md to get front matter
  // and the content without escaping characters
  const { data, content } = grayMatter(post);

  const html = marked(content, { renderer });

  if (html) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ html, ...data }));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    );
  }
}
