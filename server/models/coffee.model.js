const Sequelize = require('sequelize')
const db = require('./database')
const { Op } = require('sequelize')

const Coffee = db.define('coffee', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

Coffee.prototype.getIngredients = function() {
  return this.ingredients.join(", ")
}

Coffee.findByIngredient = function(str) {
  return Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [str]
      }
    }
  })
}

Coffee.afterCreate((coffee) => {
  if (coffee.ingredients === null) {
    coffee.ingredients = ['love']
  } else if (!coffee.ingredients.includes("love")) {
    coffee.ingredients.push(`love`)
  }
})

Coffee.afterUpdate((coffee) => {
  if (coffee.ingredients === null) {
    coffee.ingredients = ['love']
  } else if (!coffee.ingredients.includes("love")) {
    coffee.ingredients.push(`love`)
  }
})

module.exports = Coffee
