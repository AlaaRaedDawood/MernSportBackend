function verifyToken(req, res, next) {
	const bearerToken = req.header('user')
	if (typeof bearerToken !== 'undefined') {
		req.token = bearerToken
		// console.log(bearerToken + " done"); 
		next()
	} else {
		res.sendStatus(401)
	}
}

module.exports = verifyToken ; 