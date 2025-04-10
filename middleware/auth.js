
const jwt = require('jsonwebtoken')
module.exports =  (req,res,next) => {
    //recuperer le token , para verifiquer la connetion, se mete en e header autorizacion
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message:'Vous n`etez pas connecté'});
    
    // aqui recuperamos elpayload, que es el id del user
    try{
       const user = jwt.verify(token.split(' ')[1], 'RANDOM_TOKEN_SECRET');
       req.user = user;
       next();

    } catch(error){
        res.status(401).json({message:error});

    }
    
}

//Authorization : Bearer la id del user