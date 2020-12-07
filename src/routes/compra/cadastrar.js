const Joi = require("joi");
const { getDb } = require("../../database");
const cpfValidate = require("../../validations/cpf");

const collectionName = "compras";

function criarRegistro({ codigo, cpf, data, valor }) {
  let status = "Em validação";

  if (cpf === "15350946056") {
    status = "Aprovado";
  }

  return {
    codigo,
    cpf,
    data,
    valor,
    status
  }
}

async function salvar(registro){
  const db = getDb().collection(collectionName);
  const codigoJaExiste = await db
    .count({ codigo: registro.codigo }, { limit: 1 }) > 0;

  if (codigoJaExiste) throw Error("Código já cadastrado");

  await db.insertOne(registro);
}

module.exports = {
  method: "post",
  path: "/compra/cadastrar",
  handler: async (req, h) => {
    const registro = criarRegistro(req.payload);
    
    try{
      await salvar(registro);
    }
    catch(ex){
      console.log(ex);
      return h.response(ex.message).code(400);
    }
    return registro;
  },
  options: {
    validate: {
      payload: Joi.object({
        codigo: Joi.string().length(36), //guid
        cpf: Joi.string().required().min(11).max(14).custom(cpfValidate),
        data: Joi.date().required(),
        valor: Joi.number().required(),
      })
    }
  }
};