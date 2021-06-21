

exports.signup = (req, res, next) => {
    console.log('je m\'inscris !');
    res.status(200).json({ message: 'inscription ok'});
};

exports.login = (req, res, next) => {
    console.log('je me connecte !');
    res.status(200).json({ message: 'connexion ok'});
};