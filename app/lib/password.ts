export async function hashPassword(password: string) {
  const pwUtf8 = new TextEncoder().encode(password);

  const pwHashBuffer = await crypto.subtle.digest("SHA-256", pwUtf8);

  const pwHashHexString = Array.from(new Uint8Array(pwHashBuffer))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");

  return pwHashHexString;
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  const hashedPlainPassword = await hashPassword(plainPassword);

  return hashedPlainPassword === hashedPassword;
}

export function createTempPassword() {
  return Math.random().toString(36).slice(-8);
}
