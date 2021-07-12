const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');


const { User } = require('../models');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
        const encryptEmail = cryptoJS.AES.encrypt(req.body.email, 'RANDOM_SECRET').toString();
        User.create({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: encryptEmail,
            password: hash,
            role: 'user'
        })
        .then(() => {
            res.status(200).json({ message: 'ça maaaarche !' });
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error: error }));
};

exports.login = (req, res, next) => {
    User.findAll()     //on va chercher tous les utilisateurs
    .then(users => {   
        for (let i in users) {      //pour chaque utilisateur, on décrypte l'email afin de le comparer à l'email saisi
            const bytes = cryptoJS.AES.decrypt(users[i].email, 'RANDOM_SECRET');
            const originalEmail = bytes.toString(cryptoJS.enc.Utf8);
            //si l'email saisie est dans la BDD, on retourne l'email crypté de l'user trouvé
            if (originalEmail == req.body.email) {
                return users[i].email;
            }
        }
        throw 'utilisateur inconnu !';
    })
    .then(cryptedUser => {      //on va chercher l'utilisateur qui essaie de se connecter
        User.findOne({ where: { email: cryptedUser } })
        .then( user => {
            if (!user) {
                return res.status(401).json({ error: 'utilisateur inconnu !' });
            } else {
                //on vérifie le mot de passe renseigné
                bcrypt.compare(req.body.password, user.password)
                    .then( valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'mot de passe incorrect !' });
                        } else {    //renvoie l'identifiant userID depuis la BDD et un jeton Web JSON signé contenant userID
                            res.status(200).json({
                                userId: user.userId,
                                token: jwt.sign(
                                    { userId: user.userId },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};