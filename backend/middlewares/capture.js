module.exports = (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(201).json({ message: 'tout est en ordre' });
}