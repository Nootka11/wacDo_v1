const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    // Récupérer le token pour vérifier la connexion, envoyé dans l'en-tête Authorization
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Vous n`etez pas connecté' });

    // Ici, on récupère le payload, qui est l'ID de l'utilisateur
    try {
        const decodedToken = jwt.verify(token.split(' ')[1], 'RANDOM_TOKEN_SECRET');
        req.user = decodedToken;

        const utilisateur = await User.findOne({ _id: decodedToken.userId })

        if (!utilisateur) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        req.role = utilisateur.role;

        next();

    } catch (error) {
        res.status(401).json({ message: error });

    }

}
