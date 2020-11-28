module.exports = {
  method: "post",
  path: "/revendedor/cadastrar",
  handler: (req, h) => {
    console.log(req.payload);
    return "cadastrar";
  },
};
