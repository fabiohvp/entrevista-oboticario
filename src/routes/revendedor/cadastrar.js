const Joi = require("joi");
const { getDb } = require("../../database");
const cpfValidate = require("../../validations/cpf");

const collectionName = "revendedor";

async function salvar(registro){
  const db = getDb().collection(collectionName);
  const codigoJaExiste = await db
    .count({ $or: [ { cpf: registro.cpf }, { email: registro.email } ] }, { limit: 1 }) > 0;

  if (codigoJaExiste) throw Error("CPF ou e-mail já cadastrado");

  await db.insertOne(registro);
}

module.exports = {
  method: "post",
  path: "/revendedor/cadastrar",
  handler: async (req, h) => {
    const registro = { nome, cpf, email, senha } = req.payload;

    try{
      await salvar(registro);
    }
    catch(ex){
      console.log(ex)
      return h.response(ex.message).code(400);
    }
    return registro;
  },
  options: {
    validate: {
      payload: Joi.object({
          nome: Joi.string().min(2).max(80),
          cpf: Joi.string().required().min(11).max(14).custom(cpfValidate),
          email: Joi.string().email().required(),
          senha: Joi.string().required().min(6).max(20)
      })
    }
  }
};
