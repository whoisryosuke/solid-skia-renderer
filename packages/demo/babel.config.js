module.exports = {
  presets: [
    "@babel/preset-typescript",
    "solid",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ]
}
