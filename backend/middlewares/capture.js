module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    res.status(201).json({ message: 'tout est en ordre' });
}