function errorHandler(res, err, type) {
  const emailAlreadyExist = 11000
  if (err.code == emailAlreadyExist)
    return res.send(`${type} ja existe`)
  else {
    console.log(err)
    return res.status(400).send(`mensagem: ${err.errors}`)
  }
}

export default errorHandler