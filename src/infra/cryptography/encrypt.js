import bcrypt from "bcrypt"

export default function encrypt(passowrd) {
  try {
    const saltRound = 10
    return bcrypt.hashSync(passowrd, saltRound)
  } catch (err) {
    console.log(err)
  }
}