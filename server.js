// path module dependency
const path = require('path');
// express.js dependency
const express = require('express');
// express session middleware to handle session cookies
const session = require('express-session');
// handlebars view engine for express
const exphbs = require('express-handlebars');
// makes use of routes stored in the controllers folder
const routes = require('./controllers');
// makes use of helpers in utils folder
const helpers = require('./utils/helpers');
// connects sequelize to database using connection.js in config folder
const sequelize = require('./config/connection');
// sequelize store stores the session to save user's login data
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// initializes the server and defines its port
const app = express();
const PORT = process.env.PORT || 3001;

// initializes handlebars helpers
const hbs = exphbs.create({ helpers });

// initializes session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // session expires after user is inactive for five minutes
    expires: 300000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// makes use of express session to handle the session
app.use(session(sess));

// establishes handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// makes use of express to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// establishes path to public section for CSS and JavaScript
app.use(express.static(path.join(__dirname, 'public')));

// establishes path to routes
app.use(routes);

// establishes connection with databases and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001'));
});