const express = require('express')
const { default: mongoose } = require('mongoose')
mongoDb = require('./database/db');
const app = express();
bodyParser = require('body-parser')
path = require('path')
cors = require('cors')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected succefully !!")
}, errors => {
    console.log("Data base Error:" + errors)
})

const bookRoute = require('./node-backend/routes/book.routes');


app.use(express.static(path.join(__dirname,'dist/Bookstore')));

app.use('/api',bookRoute);

const port = process.env.port || 8000;

app.listen(port,()=>{
    console.log('Listening Port on:' + port);
});

app.use((req,res,next)=>{
  next(createError
    (404));
});

app.get('/',(req,res)=>{
    res.send('invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});

app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode=500;
    res.status(err.statusCode).send(err.message)

});

