const express = require('express');
const path =  require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/client');
const orderRoutes = require("./routes/order");
const karigarRoutes = require('./routes/karigar');
const categoryRoutes= require("./routes/category");

const app = express();

dotenv.config();




const port = process.env.PORT || 5000 ;
const MONGO_DB_USER= process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_DB = process.env.MONGO_DB_DB;

mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.ylfqs.mongodb.net/${MONGO_DB_DB}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Database Connection successfull');
}).catch((err)=>{
    console.log('Databse not Connected');
    console.log(err);  
});
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Server is running boom guys!!'); 
})
app.use('/user',userRoutes);
app.use('/client',clientRoutes);
app.use('/karigar',karigarRoutes);
app.use('/category',categoryRoutes);
app.use('/order', orderRoutes);


app.listen(port,()=>{
   console.log('Server is running on port: ', +port);
})

