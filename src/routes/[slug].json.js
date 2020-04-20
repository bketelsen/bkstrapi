import path from "path";
  import fs from "fs";
  import grayMatter from "gray-matter";
  import marked from "marked";

  const getPage = fileName =>
    fs.readFileSync(path.resolve("content/pages/", `${fileName}.md`), "utf-8");

  export function get(req, res, next) {
    const { slug } = req.params;

    // get the markdown text
    const page = getPage(slug);



    // parse the md to get front matter
    // and the content without escaping characters
    const { data, content } = grayMatter(page);

    const html = marked(content);

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
