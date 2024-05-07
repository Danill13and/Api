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
const bot = new Telegraf("7095240988:AAHyddb5dKkVoAw26I6LO6qkVjHfkgUA63I")

router.post('/createUser', async (req, res) => {
    const apiKey = uuidv4();
    data = await User.create({name: `${req.body.name}`, password: `${req.body.password}`, email: `${req.body.email}`, phone: `${req.body.phone}`, api_key: apiKey})
    data.save()
    res.send(data)
})

router.get('/allUser', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
}) 

router.post('/login', async (req, res) => {
    if (req.body.name === undefined){
        res.send('name is required')
    }
    if (req.body.password === undefined){
        res.send('password is required')
    }else{
    const user = await User.findOne({ where:{name: req.body.name, password: req.body.password}}) 
    res.send(user)
    }
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
    const category = await Category.findOne({where:{name: req.body.category_main_id}})
    console.log(category.id)
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

router.post('/getProduct', async (req, res) =>{
    const user = await User.findOne({ where:{id: req.body.id}}) 
    res.send(user)
})

router.post('/order', async (req, res) =>{
    bot.telegram.sendMessage(1252114085, `Нове замовленя на адрес: ${req.body.adress}`)
    res.send("Good")
})

router.listen(8000)