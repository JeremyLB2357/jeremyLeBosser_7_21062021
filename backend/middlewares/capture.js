module.exports = (req, res, next) => {
    console.log(req.body.email);
    res.status(201).json({ message: 'tout est en ordre' });
}