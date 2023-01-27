const isAdmin = true;

const verifyRole = (req, res, next) => {
  if(!isAdmin) res.send({error: "El usuario no es administrador"});
  next();
}

export { verifyRole };