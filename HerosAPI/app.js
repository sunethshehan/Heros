let http = require('http');
let uppercase = require('upper-case')
let fileExtension = require('file-extension');
let mongoose = require('mongoose');

let cors = require("cors");

let express = require('express')
let app = express();

mongoose.connect('mongodb://localhost:27017/HeroDB', { useNewUrlParser: true });

let authenticator = require('./middleware/authenticator')
let sendemail = require('./middleware/emailsender')
let heroRoutes = require('./routes/heros')
let users = require('./routes/users')
let homeRoutes = require('./routes/home')
let auth = require('./routes/auth')

//Get the port which is setup by Heroku
const PORT = 3005;

app.use(cors());
app.use(express.json());

app.use(authenticator);
app.use(sendemail);

//Custom middleware

app.use('/', homeRoutes);
app.use('/api/heros/', heroRoutes);
app.use('/api/users/', users)
app.use('/api/auth/', auth)



//specify only admin routes
//app.use('/api/admin',customAdminRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
