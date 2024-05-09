const { DataTypes, Sequelize } = require('sequelize')
const USer = require("./Userdb")
const Category = require("./categorydb")

const sequelizer = new Sequelize('postgres://danill13and:WFbWTM5oQXT53pELtWkxqMeZKwnZlzWT@dpg-cot6hamv3ddc73fafh8g-a/marketplace_hr6r', {
    dialect: 'postgres'
});

const Product = sequelizer.define("Product", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


USer.hasMany(Product,{
    foreignKey: 'user_id'
})

Product.belongsTo(USer);

Category.hasMany(Product,{
    foreignKey: 'category_id'
})

Product.belongsTo(Category)


sequelizer.authenticate()
// sequelizer.sync()

module.exports = Product
