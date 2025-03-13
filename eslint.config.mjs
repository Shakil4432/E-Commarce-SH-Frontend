import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Turn off unused variable warnings
      "react-hooks/exhaustive-deps": "warn", // Change useEffect warnings to warnings
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off", // Disable empty object type error
    },
  },
];

export default eslintConfig;
