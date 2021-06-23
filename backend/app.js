const express = require('express');


const app = express();

const userRoutes = require('./routes/users');
const feedRoutes = require('./routes/feed');
const profileRoutes = require('./routes/profile');

/*
async function connectBDD() {
    try {
        await sequelize.authenticate();
        console.log('connection is great');
    } catch (error) {
        console.error('unable to connect to the database', error);
    }
};

connectBDD();
*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/auth', userRoutes);
app.use('/feed', feedRoutes);
app.use('/profile', profileRoutes);

/*app.use((req, res) => {
    res.json({ message: 'votre requête a bien été reçue !' });
});*/

module.exports = app;