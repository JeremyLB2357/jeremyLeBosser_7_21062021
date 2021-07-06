module.exports = (req, res, next) => {
    console.log(req.body);
    console.log('voici le titre :' + req.body.title);
    res.status(201).json({ message: 'tout est en ordre' });
}