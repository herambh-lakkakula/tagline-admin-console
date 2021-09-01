module.exports = {
  parser: "babel-eslint",
  // rules: {
  //   "prettier/prettier": [
  //     "error",
  //     { endOfLine: "auto" },
  //     { usePrettierrc: true },
  //   ], // Use our .prettierrc file as source
  //   "react/react-in-jsx-scope": "off",
  //   "react/prop-types": "off",
  //   "simple-import-sort/imports": "error",
  //   "simple-import-sort/exports": "error",
  // },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  extends: [
    "prettier",
  ],
};
