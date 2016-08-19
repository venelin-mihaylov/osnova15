export default function authMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).send('please authenticate')
  } else {
    next()
  }
}
