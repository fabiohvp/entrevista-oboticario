module.exports = (cpf) => {
	return cpf.replace(/[.-]/g, '');
};