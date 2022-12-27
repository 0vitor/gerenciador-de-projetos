import bcrypt from "bcrypt"

export default function encrypt(passowrd, saltRound) {
  return bcrypt.hashSync(passowrd, saltRound)
}