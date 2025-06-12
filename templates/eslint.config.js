import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  prettierConfig, // Prettier와 충돌하는 ESLint 규칙 비활성화
  {
    ignores: ["dist"],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks, // react-hooks 플러그인 추가
      "@typescript-eslint": tsPlugin
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": ["warn"], // 경고로 설정
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "warn", // 경고로 설정
      "react-hooks/exhaustive-deps": "off" // 비활성화
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
