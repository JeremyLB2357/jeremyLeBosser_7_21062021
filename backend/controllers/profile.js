

exports.show = (req, res, next) => {
    console.log('voici mon profile');
    res.status(200).json({ message: 'voilà tes infos' });
};

exports.delete = (req, res, next) => {
    console.log('je quitte le forum');
    res.status(200).json({ message: 'suppression faite' });
};

exports.modify = (req, res, next) => {
    console.log('je modifie mon profile');
    res.status(200).json({ message: 'modification faite' });
};

exports.showMyPosts = (req, res, next) => {
    console.log('voici mes posts');
    res.status(200).json({ message: 'voilà ce que tu as déjà posté' });
};