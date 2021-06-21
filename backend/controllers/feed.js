

exports.showAll = (req, res, next) => {
    console.log('voici le mur de posts');
    res.status(200).json({ message: 'bonne lecture'});
};

exports.publish = (req, res, next) => {
    console.log('je publie');
    res.status(200).json({ message: 'publication faite'});
};

exports.delete = (req, res, next) => {
    console.log('je supprime mon post');
    res.status(200).json({ message: 'suppression faite'});
};

exports.addComment = (req, res, next) => {
    console.log('je commente un post');
    res.status(200).json({ message: 'commentaire ajouté'});
};

exports.showComments = (req, res, next) => {
    console.log('voilà tout les commentaires');
    res.status(200).json({ message: 'regarde les commentaires'});
};