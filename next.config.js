import { fileURLToPath } from "node:url";
import createJiti from "jiti";
import { withPlausibleProxy } from "next-plausible";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy({
  scriptName: "plsbl",
})({
  /** ... */
});
export default nextConfig;
