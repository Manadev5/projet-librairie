const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    //Récuperation du token enregistré dans le headers
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    // pour passer au controlleur ou au multer
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};