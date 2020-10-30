export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}
export const getField = (err) => {
  let field = err.message.split('index: ')[1]
  field = field.split(' dup key')[0]
  field = field.substring(0, field.indexOf('_'));
  return field;
}
export default {}
