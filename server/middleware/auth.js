const jwt = require('jsonwebtoken');
const  dotenv = require('dotenv');
dotenv.config()

const  auth = (req, res, next) => {
	//this will check if a token is existing in the Authorization Header
	const  token = req.header("Authorization")

	if (!token) {
		return  res.status(403).json({ err:  'Invalid token' })
	}
	
	try {
        jwt.verify(token.slice(7), process.env.jwtSecret, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user

         next()

	})

	} catch (error) {
		res.status(401).json({ error:  err.message });
	}
}
module.exports =  auth