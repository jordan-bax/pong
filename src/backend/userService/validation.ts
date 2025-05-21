import bcrypt from 'bcryptjs'

export async function verifyPassword(password1: string, password2: string): Promise<boolean> {
   return await bcrypt.compare(password1, password2)
}