var fs = require("fs");
var descriptionDir = "./description";

fs.readdir(descriptionDir, function (err, fileList) {
  console.log(fileList);
});
