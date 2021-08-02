const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');


const app = express();


//importation des routes
const userRoutes = require('./routes/users');
const feedRoutes = require('./routes/feed');
const profileRoutes = require('./routes/profile');

//connection à la BDD
const connectBDD = require('./src/database/connection');

async function checkConnectionBDD() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('unable to connect to the database', error);
    }
};
checkConnectionBDD();

//middleware permettant de prévenir les attaques XSS
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware qui permet d'accéder à notre API peut importe l'origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

async function majDB() {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
}

//majDB();


app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/auth', userRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/profile', profileRoutes);


module.exports = app;