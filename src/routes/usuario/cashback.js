const fetch = require("node-fetch");

module.exports = {
  method: "get",
  path: "/usuario/cashback",
  handler: async (req, h) => {
    const res = await fetch(
      "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: "ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm",
        },
      }
    );
    const data = await res.json();
    return data;
  },
};
