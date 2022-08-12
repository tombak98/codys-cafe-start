const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: {
    type: Sequelize.TEXT
  }
})

Pug.prototype.isPuppy = function() {
  if (this.age >= 1) {
    return false
  } else {
    return true
  }
}

Pug.prototype.shortBio = function() {
  let punct = ".?!"
  for (let i = 0; i < this.biography.length; i++) {
    if (punct.includes(this.biography[i])) {
      return this.biography.slice(0,i)
    }
  }
}

Pug.findByCoffee = async function(str) {
  let favCoffee = await Coffee.findOne({
    where: {
      name: str
    }
  })
  let pugs = Pug.findAll({
    where: {
      favoriteCoffeeId: favCoffee.id
    },
    include: {
      model: Coffee,
      as: 'favoriteCoffee'
    }
  })
  return pugs
}

Pug.beforeCreate((pug) => {
  pug.name = pug.name.charAt(0).toUpperCase() + pug.name.slice(1)
})

Pug.beforeUpdate((pug) => {
  pug.name = pug.name.charAt(0).toUpperCase() + pug.name.slice(1)
})

module.exports = Pug
