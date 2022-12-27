import bcrypt from "bcrypt"

const verifyPassowrd = async (passowrd, collaboradotorPassowrd) => {
  let response = null;
  response = await bcrypt.compare(passowrd, collaboradotorPassowrd)
  console.log(response)
  return response
}

export default verifyPassowrd