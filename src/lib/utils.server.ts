"use server";

export async function hashString(input: string) {
  const inputUtf8 = new TextEncoder().encode(input);

  const inputHashBuffer = await crypto.subtle.digest("SHA-256", inputUtf8);

  const inputHashHexString = Array.from(new Uint8Array(inputHashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return inputHashHexString;
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
) {
  const hashedPlainPassword = await hashString(plainPassword);

  return hashedPlainPassword === hashedPassword;
}

export async function createTempPassword() {
  return Math.random().toString(36).slice(-8);
}

export async function generateRandomString(length: number) {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  return Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
}
