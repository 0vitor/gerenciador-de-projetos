import bcrypt from "bcrypt"

const verifyPassowrd = async (passowrd, collaboradotorPassowrd) => {
  const response = await bcrypt.compare(passowrd, collaboradotorPassowrd)
  return response
}

export default verifyPassowrd