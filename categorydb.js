const { DataTypes, Sequelize } = require('sequelize')

const sequelizer = new Sequelize('marketplaes', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

const Category = sequelizer.define("Category", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

sequelizer.authenticate()
// sequelizer.sync()

module.exports = Category