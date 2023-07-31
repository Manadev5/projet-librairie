const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
     .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
         .then(() => res.status(200).json({message :'utilisateur créé'}))
         .catch(error => res.status(400).json({error}))
     } 
        )
     .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {

  User.findOne({email : req.body.email})
    .then( User =>{
             if(!User){
                return res.status(404).json({message :'mot de passe où email incorrect'})
             }
             bcrypt.compare(req.body.password, User.password)
             .then( valid => {
                if(!valid){
                    return res.status(404).json({message :'mot de passe où email incorrect'})
                }
                res.status(200).json({
                    userId : User._id,
                    token : jwt.sign(
                        {userId: User._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                })
             })
             .catch(error => res.status(500).json({ error }));
    }

    )
    .catch(error => res.status(500).json({ error }));
}