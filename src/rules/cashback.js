module.exports = {
    dez: (campo) => ({ [campo]: { $lt: 1000 } }),
    quinze: (campo) => ({ [campo]: { $gte: 1000, $lt: 1500 } }),
    vinte: (campo) => ({ [campo]: { $gte: 1500 } })
};