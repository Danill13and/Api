const { DataTypes, Sequelize } = require('sequelize')

const sequelizer = new Sequelize('marketplaes', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
const User = sequelizer.define("User", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    api_key:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
})

sequelizer.authenticate()
// sequelizer.sync()

module.exports = User