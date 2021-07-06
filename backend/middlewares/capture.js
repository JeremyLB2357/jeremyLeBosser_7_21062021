module.exports = (req, res, next) => {
    console.log(req.file.filename);
    console.log('voici le titre :' + req.body.title);
    res.status(201).json({ message: 'tout est en ordre' });
}