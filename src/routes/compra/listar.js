const { getDb } = require("../../database");
const cashbackRule = require("../../rules/cashback");

const collectionName = "compras";

function getRangeMes() {
  var data = new Date();
  var inicio = new Date(data.getFullYear(), data.getMonth(), 1);
  var fim = new Date(data.getFullYear(), data.getMonth() + 1, 0);
  return { inicio, fim };
}

async function getValorPorCpfNoMes(db, data, matchRule) {
  const valores = await db.aggregate([
    {
      $match: { "data": { $gte: data.inicio, $lt: data.fim } }
    },
    {
      $group: {
        _id: { cpf: "$cpf" },
        total: { $sum: "$valor" }
      }
    },
    {
      $match: matchRule
    }
  ])
    .toArray();

  return valores;
}

function adicionarCashback(registros, clientesComCashback, percentual) {
  registros.forEach(registro => {
    clientesComCashback.forEach(cliente => {
      if (registro.cpf === cliente._id.cpf) {
        registro.percentualCashback = percentual;
        registro.valorCashback = Math.round(((percentual / 100) * registro.valor)* 100) / 100;
      }
    });
  });
}

module.exports = {
  method: "get",
  path: "/compra/listar",
  handler: async (req, h) => {
    const db = getDb().collection(collectionName);
    const data = getRangeMes();
    const campoTotal = "total";
    const clientesComCashback10 = await getValorPorCpfNoMes(db, data, cashbackRule.dez(campoTotal));
    const clientesComCashback15 = await getValorPorCpfNoMes(db, data, cashbackRule.quinze(campoTotal));
    const clientesComCashback20 = await getValorPorCpfNoMes(db, data, cashbackRule.vinte(campoTotal));

    const registros = await db
      .find()
      .toArray();

    adicionarCashback(registros, clientesComCashback10, 10);
    adicionarCashback(registros, clientesComCashback15, 15);
    adicionarCashback(registros, clientesComCashback20, 20);

    return registros;
  },
};