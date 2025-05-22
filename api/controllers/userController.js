const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');

// Création des nouveaux utilisateurs
exports.signup = async (req, res, next) => {
    try {
        // encrypter le mot de pass
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });
        await user.save()
        res.status(201).json({ message: 'Utilisateur créé!' })
    } catch (error) {
        res.status(500).json({ error })

    }
};

// Connexion
exports.login = async (req, res, next) => {
    try {
        //Cherche l'utilisateur dans base de données
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).json({
                //Normalement ne doit pas avoir cette info : L'utilisateur n'existe pas,
                message: 'Paire identifiant/mot de passe incorrect'
            });
        }
        // Comparaison des mot de passe encryptées, true ou false
        const mdpValid = await bcrypt.compare(req.body.password, user.password)
        if (!mdpValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' })
        }

        //Si tout va bien, l'utilisateur existe et le mdp est valide
        const expiresInSeconds = 24 * 60 * 60; // 24 heures
        const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: expiresInSeconds }
        );

        res.status(200).json({
            userId: user._id,
            role: user.role,
            userName: user.username,
            token,
            expiresIn: expiresInSeconds
        });

    } catch (error) {
        res.status(500).json({  
            error: error.message,
            stack: error.stack   
            })
        }

    // jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
    //     if (err) {
    //         if (err.name === 'TokenExpiredError') {
    //             return res.status(401).json({ error: 'Token expirado' });
    //             //console.log('token expiree')
    //         }
    //         return res.status(401).json({ error: 'Token inválido' });
    //         //console.log('token invalide')
    //     }
    //     req.user = decoded;
    //     next();
    // });
}

// Déconnexion de l'utilisateur
// exports.logout = async (req, res) => {
//     try {
//         // Le token doit être supprimé côté client (localStorage / cookies)
//         // Ici, on envoie juste un message de confirmation
//         res.status(200).json({ message: 'Déconnexion réussie. Veuillez supprimer le token côté client.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la déconnexion', error: error.message });
//     }
// };