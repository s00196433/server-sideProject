/*const express = require('express')*/
const Joi = require('joi')
mongoose = require('mongoose');
express = require('express'); 
const cors = require('cors');
const app = express()
const movies = require('./routes/movies');

const users = require('./routes/users');
const auth = require('./routes/auth');


const https = require('https')
const fs = require('fs');


//const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: false}));




const corsOptions = {
  origin: 'https://localhost:4200',
  credentials: true // for cookies
}


app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/`Movies`', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch (error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});

app.use('/movies', movies); 
app.use('/users', users);

app.use('/auth', auth);





const serverOptions = {
  key: fs.readFileSync("ssl/submission3.key"),
  cert: fs.readFileSync("ssl/submission3.cert")
};


https.createServer(serverOptions,app).listen(8080,() =>
  console.log(`listening on 8080, don't forget the https`));

/*const Joi = require('joi')
mongoose = require('mongoose');
express = require('express'); 
const app = express()
const movies = require('./routes/movies');
const cors = require('cors');

const users = require('./routes/users');
const auth = require('./routes/auth');

const https = require('https')
const fs = require('fs');


//const port = 3000

const corsOptions = {
  origin: 'https://localhost:4200',
  credentials: true // for cookies
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//app.use(cors());
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/`Movies`', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch (error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});



app.use('/movies', movies); 
app.use('/users', users);

app.use('/auth', auth);


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 

const serverOptions = {
  key: fs.readFileSync("ssl/submission3.key"),
  cert: fs.readFileSync("ssl/submission3.cert")
};


https.createServer(serverOptions,app).listen(8080,() =>
  console.log(`listening on 8080, don't forget the https`)); */




