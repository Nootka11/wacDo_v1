const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const User = require('../models/User');



// creation des nouveaux utilisateurs
exports.signup = async (req,res,next)=>{
    try{
        // encryopter le mot de pass
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        const user = new User({
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role
        });    
        await user.save()
        res.status(201).json({message:'utilisateur créé!'})
    } catch(error){
        res.status(500).json({error})

    }
};


// connexion
exports.login = async (req,res,next)=>{
    try{
        //chercher l user dans bd
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(401).json({
                //normalement ne doit ps ifor
                message: 'El user n existe pas, Paire identifiant/mot de passe incorrect'
            });
        }
        //comparation de mot de pass encryptées, devuelve true o false
        const mdpValid= await bcrypt.compare(req.body.password, user.password)
        if(!mdpValid){
            res.status(401).json({message:'Mot de passe incorrect'})
        }
        //Si tout va bien, le user existe et le mdp est valid
        res.status(200).json({
            userId:user._id,
            token:jwt.sign(
                { userId:user._id},
                //clé secrete pour le encodage : chaine longue et aleatoire
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '12h' }
            )
        });

    // end try{}
    } catch (error){
        res.status(500).json({error})
    }
}