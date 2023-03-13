# Create Vite

This project was bootstrapped with [create vite](https://vitejs.dev/guide/), using typescript.

## Scripts

### `yarn dev`

Runs the app in the development mode.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches test runner in the interactive watch mode.
See the section about [Vitest configuration](https://vitest.dev/config/) for more information.

### `yarn build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

Produces an application bundle that is suitable to be served over a static hosting service

### `yarn preview`

After running `yarn build` the `vite preview` command will boot up a local static web server that serves the files from `dist` folder

## Assumptions

- There can be multiple games being played at the same time.
- Summary only shows finished games.
- _Start Game_ timestamp will be used for sorting games in the games summary section (not the _finish game_ timestamp).
- `UIGuide` in assets is a reference of inputs and fields, will not be used for styling
- _Playing_ and _Results_ from the `UIGuide` will only be shown if there is data related to the specific section
