//Written  by Lijo John Daniel

const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connection.on('open', () => {
  console.log('Connected to database')
})

const productSchema = mongoose.Schema({
  'product_name': {type: String, required: true},
  'price': {type: Number, required: true},
  'quantity': {type: Number, required: true}
})

const productModel = mongoose.model('product', productSchema)

app.get('/products', async(req, res) => {
  let products = await productModel.find().exec()
  res.json(products)
})

app.post('/addProduct', async(req, res) => {
  let product = new productModel(req.body)
  await product.save((err, result) => {
    if(err) {
      throw err
    } else {
      res.json(result)
    }
  })
})

app.put('/editProduct', async(req, res) => {
  let product = await productModel.findById(req.body._id).exec()
  product.set(req.body)
  await product.save((err, result) => {
    if(err) {
      throw err
    } else {
      res.json(result)
    }
  })
})

const userSchema = mongoose.Schema({
  'firstName': {type: String, required:true },
  'lastName': {type: String, required:true },
  'mobile': {type: String, required:true },
  'email': {type: String, required:true },
  'referralID': {type: String, required: true}
})

const userModel = mongoose.model('users', userSchema)

app.post('/getUser', async(req, res) => {
  userModel.find({email: req.body.email}, async(err, result) => {
    if(result.length) {
      res.json(result)
    } else {
      res.send(null)
    }
  })
})

app.post('/getUserFromReferral', async(req, res) => {
  userModel.find({referralID: req.body.referralID}, async(err, result) => {
    if(result.length) {
      res.json(result)
    } else {
      res.send(null)
    }
  })
})

app.post('/addUser', async(req, res) => {
  let user = new userModel(req.body)
  await user.save((err, result) => {
    if(err) {
      throw err
    } else {
      res.json(result)
    }
  })
})

const purchaseSchema = mongoose.Schema({
  'product_name': {type: String, required:true },
  'price': {type: Number, required:true },
  'quantity': {type: Number, required:true },
  'referralID': {type: String, required: true},
  'userID': {type: String, required: true}
})

const purchaseModel = mongoose.model('purchase', purchaseSchema)

app.post('/purchase', async(req, res) => {
  let user = new purchaseModel(req.body)
  await user.save((err, result) => {
    if(err) {
      throw err
    } else {
      res.json(result)
    }
  })
})

app.listen(3000, ()=> {
  console.log("Server listening on port 3000")
})
