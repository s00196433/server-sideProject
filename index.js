
const Joi = require('joi')
mongoose = require('mongoose');
express = require('express'); 
const app = express()
const movies = require('./routes/movies');

const users = require('./routes/users');
const auth = require('./routes/auth');

const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: false}));




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



