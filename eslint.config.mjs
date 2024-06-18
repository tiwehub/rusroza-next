import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginImport from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import eslintPluginCheckFile from "eslint-plugin-check-file";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

import templateStringQuotesRule from "./eslint-custom-rules/template-string-quotes.js";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        browser: true,
        node: true,
        es2021: true
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      import: eslintPluginImport,
      prettier: prettierPlugin,
      "jsx-a11y": eslintPluginJsxA11y,
      tailwindcss: tailwindcssPlugin,
      "check-file": eslintPluginCheckFile,
      promise: eslintPluginPromise,
      sonarjs: eslintPluginSonarjs,
      unicorn: eslintPluginUnicorn,
      "simple-import-sort": simpleImportSort,
      "react-refresh": eslintPluginReactRefresh,
      "custom-rules": {
        rules: {
          "template-string-quotes": templateStringQuotesRule
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": ["off"],
      "@typescript-eslint/no-empty-function": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "prettier/prettier": ["error", { singleQuote: true, quoteProps: "as-needed", parser: "typescript" }],
      "custom-rules/template-string-quotes": "error",
      "import/no-cycle": "error",
      "linebreak-style": ["error", "unix"],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object"
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "promise/always-return": "error",
      "promise/catch-or-return": "error",
      "promise/no-return-wrap": "error",
      "sonarjs/cognitive-complexity": ["error", 15],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase"
        }
      ]
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: {}
      }
    },
    ignores: ["node_modules/*", "public/*", "dist/*"]
  }
];
