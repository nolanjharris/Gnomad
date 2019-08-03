const checkForUser = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).json("Please login first.")
    }
    next();
}

module.exports = {
    checkForUser
}
