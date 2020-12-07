//só um teste, não está sendo utilizado
const { readdirSync, statSync } = require("fs");
const { join } = require("path");

function walkDir(dir, callback) {
  readdirSync(dir).forEach((f) => {
    let dirPath = join(dir, f);
    let isDirectory = statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(join(dir, f));
  });
}

function createRoutes(root) {
  const rootDir = join(process.cwd(), root);
  const routes = [];

  walkDir(rootDir, function (filePath) {
    const handler = require(filePath);
    const path = filePath
      .replace(rootDir, "")
      .replace(".js", "")
      .replace(/\\/g, "/");

    for (let method in handler) {
      if (path.endsWith("/index")) {
        routes.push({
          method,
          path: path.substring(0, path.length - "/index".length),
          handler: handler[method],
        });
      }
      routes.push({
        method,
        path,
        handler: handler[method],
      });
    }
  });
  console.log(routes);
  return routes;
}

module.exports = { createRoutes };
