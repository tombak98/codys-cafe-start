const db = require('./database')
const Pug = require('./pug.model')
const Coffee = require('./coffee.model')

// VVV assign relations below VVV //
Pug.belongsTo(Coffee, {as: 'favoriteCoffee'})
Coffee.hasMany(Pug, {foreignKey: 'favoriteCoffeeId'})

Pug.hasMany(Pug, {as: 'friends'})

// ^^^ assign relations above ^^^ //

module.exports = {
  db,
  Pug,
  Coffee
}
