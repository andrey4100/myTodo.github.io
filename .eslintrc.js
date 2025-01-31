module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
     "plugin:@typescript-eslint/recommended",
     "airbnb-base",
     "plugin:react/recommended",
     "plugin:react-hooks/recommended",
     "plugin:jsx-a11y/recommended",
      "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
       jsx: true,
     },
    ecmaVersion: "latest",
     sourceType: "module",
    },
  plugins: ["@typescript-eslint", "react", "jsx-a11y"],
  settings: {
    react: {
        version: "detect",
     },
    },
   rules: {
      "react/prop-types": "off",
   },
};
