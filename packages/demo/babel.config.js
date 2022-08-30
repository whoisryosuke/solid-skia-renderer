module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "solid",
      {
        generate: "universal",

        renderers: [
          {
            name: "universal",
            moduleName: "solid-skia-renderer",
            elements: []
          }
        ]
      }
    ],
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
