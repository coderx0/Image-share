import {compare,hash} from "bcryptjs"

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword({password, hashedPassword}:{
  password: string,
  hashedPassword: string | null
}) {
  if(hashedPassword){
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }
  return false
}