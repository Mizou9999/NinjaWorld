<h1 align="center"> Online Ninja World Game </h1>

> an online game written JavaScript in which 2 players play each turn to compete.
> On the map, a limited number of weapons (up to 4) will be placed randomly and can be collected by players who pass through.

## User Stories

- [x] As a user I can see a randomly generated password on page load
- [ ] As a user I can change the length of the generated password
- [x] As a user I can include/exclude uppercase letters, lowercase letters, numbers, and symbols
- [x] As a user I can see a new password whenever I make a change in my settings
- [x] As a user I can click on a button to copy the password to clipboard without selecting it first

## Challenges

- [ ] As a user I can come back to the page at any time and generate new passwords with my previously used settings
- [ ] As a user I can see the strength of the generated password on a strength meter

## Tools Used

- [React.js](https://reactjs.org/) library
- [Cypress](https://www.cypress.io/) end to end testing framework
- [Jest](https://jestjs.io/) testing framework
- [Enzyme](https://airbnb.io/enzyme/) JavaScript testing utility
- [ESLint](http://eslint.org/) linter

The project uses [CircleCI](https://circleci.com) to run the e2e and unit tests every time a new commit is pushed to GitHub. CircleCI also builds the app and deploys it to [Netlify](https://netlify.com) after successful tests, so the latest updates are always available [here][preview].

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install and Build

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run lint`

Launches the test runner in the interactive watch mode.

### `npm run test:unit`

Launches the test runner in the interactive watch mode.

### `npm run test:e2e`

Starts a development server and runs Cypress tests.

### `npm test`

Runs unit tests, starts a development server, and runs e2e tests.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Contributors

- [Zsolt Meszaros](https://github.com/zsoltime)
