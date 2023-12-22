const { resolve } = require("node:path");
const { off } = require("node:process");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "unicorn/filename-case": "off",
    "no-console": "off",
    "import/no-named-as-default-member" : "off",
    "eslint-comments/require-description": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unsafe-member-access" : "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/require-await": "off",
    "prettier/prettier":[
      "error",
      {
         "printWidth": 80,
         "tabWidth": 2,
         "singleQuote": false,
         "trailingComma": "all",
         "arrowParens": "always",
         "semi": true
      }
    ]
  }
};