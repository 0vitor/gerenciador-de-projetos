import bcrypt from "bcrypt"

export default function encrypt(passowrd, saltRound) {
  try {
    return bcrypt.hashSync(passowrd, saltRound)
  } catch {
    return
  }
}