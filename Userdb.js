const { DataTypes, Sequelize } = require('sequelize')

const sequelizer = new Sequelize('postgres://danill13and:WFbWTM5oQXT53pELtWkxqMeZKwnZlzWT@dpg-cot6hamv3ddc73fafh8g-a.frankfurt-postgres.render.com/marketplace_hr6r', {
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
