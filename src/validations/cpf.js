const CPF = require('cpf');
const cpfFormat = require("../utils/cpf");

module.exports = (value, helper) => {
	if (!CPF.isValid(value)) {
		return helper.error("CPF inválido");
	}
	return cpfFormat(value); //já retorna no formato correto
};