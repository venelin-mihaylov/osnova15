import jwt from 'jsonwebtoken'
export function configureGenerateToken({secret, ...config}) {
  return function generateToken(req, res, next) {
    req.token = jwt.sign({ // eslint-disable-line no-param-reassign
      user: req.user,
    }, secret, config)
    next()
  }
}
