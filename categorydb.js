const { DataTypes, Sequelize } = require('sequelize')

const sequelizer = new Sequelize('marketplaes', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
// const sequelizer = new Sequelize('postgres://danill13and:WFbWTM5oQXT53pELtWkxqMeZKwnZlzWT@dpg-cot6hamv3ddc73fafh8g-a/marketplace_hr6r', {
//     dialect: 'postgres'
// });

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