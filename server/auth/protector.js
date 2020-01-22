const protector = {}
const newError = new Error('Must log in to perform this action!')
const forbiddenError = new Error('Forbidden from performing this action!')
newError.status = 401
forbiddenError.status = 403

protector.isAdmin = (req, res, next) => {
  if (!req.user) {
    next(newError)
  } else if (req.user.isAdmin) {
    next()
  } else {
    next(forbiddenError)
  }
}

protector.isUser = (req, res, next) => {
  if (!req.user) {
    next(newError)
  } else if (
    Number(req.body.data.userId) !== Number(req.params.userId) &&
    !req.user.isAdmin
  ) {
    next(forbiddenError)
  } else {
    next()
  }
}

module.exports = protector
