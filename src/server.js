"use strict";
const Hapi = require("@hapi/hapi");
const compraRoutes = require("./routes/compra/index");
const revendedorRoutes = require("./routes/revendedor/index");
const usuarioRoutes = require("./routes/usuario/index");

const routes = []
  .concat(compraRoutes)
  .concat(revendedorRoutes)
  .concat(usuarioRoutes);

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  routes.forEach((route) => server.route(route));

  await server.start();
  await server.register({ plugin: require("hapijs-status-monitor") });
  //await server.register({ plugin: require("hapi-pino") });

  console.log("Server running on %s", server.info.uri);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
