const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
	const token = req.header("token")
	if(!token){
		return res.status(400).json({
			message: "Token missing!"
		})
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch(e){
		return res.status(403).json({
			message: "invalid token!"
		})
	}
}