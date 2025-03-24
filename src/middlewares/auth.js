const adminAuth = (req, res, next) => {
    const token = "zyx"
    const isAdmin = "zyx" === token
  if (isAdmin) {
    next()
  } else {
    res.status(401).send('Unauthorized !')
  }
}

module.exports = {
    adminAuth
}