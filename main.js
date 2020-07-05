let http = require("http");
let fs = require("fs");
let url = require("url");
function getList(fileList) {
  let list = `<ul>`;
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i] === "Welcome") break;
    list += `<li> <a href ="/?id=${fileList[i]}"> ${fileList[i]} </a></li>`;
  }
  list += `</ul>`;
  return list;
}
function templateHTML(title, list, description) {
  return `
    <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>
             ${description}
           </p>
        </body>
        </html>`;
}
let app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;
  let title = queryData.id;
  let category;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      title = "Welcome";
    }

    fs.readdir("./description", function (err, fileList) {
      category = getList(fileList);
    });

    fs.readFile(`description/${title}`, "utf-8", (err, description) => {
      response.writeHead(200);
      response.end(templateHTML(title, category, description));
    });
  } else {
    response.writeHead(404);
    response.end(`<h1>Not Found</h1>`);
  }

  //response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
