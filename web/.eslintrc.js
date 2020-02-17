module.exports = {
  extends: [`react-app`, "eslint:recommended"],
  plugins: [`graphql`],
  rules: {
    "import/no-webpack-loader-syntax": [0],
    "strict": "off",
    "no-unused-vars": [1],
    "no-case-declarations": [1],
    "react-hooks/exhaustive-deps": [0]
  },
}