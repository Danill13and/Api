const express = require('express')
const User = require("./Userdb")
const Product = require("./productdb")
const Category = require("./categorydb")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { Telegraf } = require("telegraf")

const router = express()
router.use(express.json());
router.use(express.urlencoded({ extended: true })); 
router.use(cors())
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
const bot = new Telegraf("7095240988:AAHyddb5dKkVoAw26I6LO6qkVjHfkgUA63I")

router.post('/createUser', async (req, res) => {
    const apiKey = uuidv4();
    if (req.body.name === undefined){
        return res.json({error: "name is required"})
    }
    if (req.body.email === undefined){
        return res.json({error: "email is required"})
    }
    if (req.body.password === undefined){
        return res.json({error: "password is required"})
    }
    if (req.body.reapit_password === undefined){
        return res.json({error: "reapit password is required"})
    }
    if (req.body.phone === undefined){
        return res.json({error: "phone is required"})
    }
    if (length(req.body.phone) < 10){
        return res.json({error: "phone is not valid"})
    }
    if (req.body.password!== req.body.reapit_password){
        return res.json({error: "password and reapit password is not same"})
    }
    data = await User.create({name: `${req.body.name}`, password: `${req.body.password}`, email: `${req.body.email}`, phone: `${req.body.phone}`, api_key: apiKey})
    data.save()
    res.send(data)
})

router.get('/allUser', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
}) 

router.post('/login', async (req, res) => {
    if (req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "name is required"})
    }
    if (req.body.password === undefined || req.body.password === " " || req.body.password === ""){
        return res.json({error: "password is required"})
    }
    const user = await User.findOne({ where:{name: req.body.name, password: req.body.password}}) 
    res.send(user)
})

router.get('/getUserByApiKey', async (req, res) => {
    const user = await User.findOne({ where:{api_key: req.headers['api-key']}})
    res.send(user)
})

router.post('/createCategory', async (req, res) =>{
    if (req.headers['api-key'] === '851ca1f9-d7cf-483a-a573-c2dda069a5a4'){
        const data = await Category.build({name: `${req.body.name}`})
        await data.save()
        res.send(data)
    }else{
        res.send('you are not admin')
    }
})

router.get('/allCategory', async (req, res) => {
    const categories = await Category.findAll()
    res.send(categories)
})

router.post('/getCategory', async (req, res) => {
    const category = await Category.findOne({ where:{name: req.body.name}}) 
    res.send(category)
})

router.post('/createProduct', async (req, res) =>{
    const user = await User.findOne({ where:{api_key: req.headers['api-key']}})
    if (req.body.category_main_id === undefined){
        return res.json({error: "name of category is required"})
    }
    const category = await Category.findOne({where:{name: req.body.category_main_id}})
    console.log(category.id)
    if(req.body.name === undefined){
        return res.json({error: "name of product is required"})
    }
    if(req.body.price === undefined){
        return res.json({error: "price of product is required"})
    }
    if(req.body.description === undefined){
        return res.json({error: "description of product is required"})
    }
    const data = await Product.build({name: `${req.body.name}`, price: req.body.price, description: `${req.body.description}`, category_id: category.id, user_id: user.id, image: `${req.body.image}`})
    await data.save()
    res.send(data)
})

router.get('/allProduct', async (req, res)=>{
    const products = await Product.findAll()
    res.send(products)
})

router.post('/deleteProduct', async (req, res) =>{
    const data = await Product.destroy({where: {id: req.body.id}})
    res.send(data)
})

router.get('/getProduct', async (req, res) =>{
    const prod = await Product.findOne({ where:{user_id: req.headers['user']}}) 
    res.send(prod)
})

router.post('/order', async (req, res) =>{
    bot.telegram.sendMessage(1252114085, `Нове замовленя на адрес: ${req.body.adress}`)
    res.send("Good")
})

router.listen()
