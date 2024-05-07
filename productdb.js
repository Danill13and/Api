const { DataTypes, Sequelize } = require('sequelize')
const USer = require("./Userdb")
const Category = require("./categorydb")

const sequelizer = new Sequelize('marketplaes', 'postgres', 'postgres', {
    host: 'localhost',
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