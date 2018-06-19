const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
const cors=require('cors');
const mongoose=require('mongoose');
const errorHandler=require('errorhandler');
const app=express()

mongoose.promise=global.Promise;
const port=process.env.port || 3000;
const isProduct=process.env.NODE_ENV === 'production';

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({
    extended:false,
    limit:'200kb'
}));
// return middleware that only parses "Json"
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'freecodecamp',
    resave:false,
    cookie: {
        maxAge:60000
    },
    saveUninitialized:false
}));
app.set('trust proxy',1);
if(!isProduct){
    app.use(errorHandler());
}
mongoose.connect('mongodb://localhost:27017/test');
mongoose.set('debug',true);
app.use((req,res,err)=>{
    if(err){
        res.json({
            Error:{
                status:err.status,
                mess:err.message
            }
        });
    }
});
app.listen(3000,()=>{
    console.log('listen port '+port);
});