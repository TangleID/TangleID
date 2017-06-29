# Opinionated
Opinionated React boilerplate with Next.js and styled-components.

Handle all these buzzwords without you making a decision:
- Server-side rendering
- Routing library
- Styling library
- Code bundling and transpiling
- Hot reloading
- Code splitting
- ES6(+), ES2015(+) support

So you can focus on writting app.

## What's inside
- [**Next.js**](https://github.com/zeit/next.js) v2.4
- [**React**](https://facebook.github.io/react/) v15.6
- [**Styled-components**](https://www.styled-components.com/) v2.1
- [**Babel**](https://babeljs.io/) stage-2 preset

## Why
#### Next.js
  - Configuration abstraction.
  - Server-side rendering, code splitting, bundling assets.
#### Styled-components
  - Clean, matured and most popular styling library for React components.
  - Support server-side rendering.
#### Babel stage-2
  - Safe enough and cover all widely-used ES6+ features.

## How to use

In your command line tool

1. Clone this repo:
```
git clone https://github.com/khanglu/opinionated.js
```
2. Install and run
```
npm install
npm run dev
```
A dev server will be served at `http://localhost:3000`

## How to structure project
- Put pages/routes components in `pages` folder.
- Put react components in `components` folder.
- Put static assets in `static` folder.

## Suggestion
- Add [prettier](https://github.com/prettier/prettier) plugin to your editor, turn on code formatting on save and forget about eslint.
- Use [Jest](https://github.com/facebook/jest) and [Enzyme](https://github.com/airbnb/enzyme) for unit testing.
- If you use Redux, put a store in each page/route using a higher-order component.