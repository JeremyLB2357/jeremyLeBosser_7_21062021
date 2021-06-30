const express = require('express');
const bodyParser = require('body-parser');



const app = express();


//importation des routes
const userRoutes = require('./routes/users');
const feedRoutes = require('./routes/feed');
const profileRoutes = require('./routes/profile');
const testRoutes = require('./routes/test');


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/auth', userRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/profile', profileRoutes);


module.exports = app;