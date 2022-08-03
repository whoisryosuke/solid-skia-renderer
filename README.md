# Solid Universal Renderer Template

Custom renderer for SolidJS using [your API here!]. Write JSX, render directly to [whatever you want!], no DOM required (unless you want!).

This is setup with a Semantic Release workflow based off Conventional Commits. And it's automatically released to Github and NPM using Github Actions.

## How to use

1. Follow the instructions below to get the dev server up.
1. Check out the renderer inside `packages/solid-canvaskit-renderer`. This where the action happens like creating new elements, setting props, etc. I setup `console.log` in a few places to give you an idea of what you get to work with.
1. Your goal should be to take "elements" (usually strings from element tags e.g. `<yourElement>`) and render those somehow (ThreeJS, CanvasKit, or even custom DOM).

### Tips

- You don't need to implement all the renderer methods! Most are kinda optional, especially if you don't have things like parent/child relationships between components.
- Similarly, you don't necessarily need a (virtual or not) DOM/node tree. If your graphics API is a flat scene graph, you don't need to worry about all the "parent"/"child" methods. If you do need a virtual DOM, I have a `VNode` class that has most methods you'll need.
- SolidJS goes through the component tree as a giant call stack of functions, first starting with `createElement`, then `insertBefore`, etc.

## Development

There's a Vite website under `packages/demo` to be a playground to develop and test the library.

1. Fork/clone this repo: `https://github.com/whoisryosuke/solid-canvaskit-renderer.git`
1. Install dependencies: `yarn`
1. Start the Vite playground: `yarn dev`

## Building package

1. `yarn build`

This runs the `tsup` process for one package/module. Check the `package.json` and `packages/input-manager/package.json` for more info.

## Release to Github/NPM

This repo should automatically release to Github and tag the release when you commit to `main`, `alpha`, or `beta` branches (change these in `package.json`).

You can learn more about the CI/CD workflow in the Github Actions folder.

### Setting up NPM

To setup NPM releases, you need to add your token to Github as an ENV var.

1. Make sure you've created a new repo for your package (not a fork).
1. Go to your repo settings.
1. Go to Environments
1. Create a new one called `production`
1. Add a `NPM_TOKEN` ENV with your token from NPM.

### Lint and Code Formatting

If you use VSCode, Prettier should run each time you save a compatible file.

> If you don't like this, go to `.vscode\settings.json` and disable there (or you can do it via your own VSCode settings).

`yarn lint` runs ESLint and Prettier, automatically formats files and rewrites them. Make sure to stage your code before running just in case.

## References

- [solid-three](https://github.com/nksaraf/solid-three/)
- [solid-canvaskit-renderer](https://github.com/whoisryosuke/solid-canvaskit-renderer)
