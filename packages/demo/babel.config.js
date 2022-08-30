module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["solid", { generate: "ssr", hydratable: false }],
    // "solid",
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
