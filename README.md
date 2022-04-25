# AllSet INC

## Developer setup

- clone repo
- Install [Node JS](https://nodejs.org/en/download/)
- Run `npm install`
- Plugins are automatically installed on VS Code via [extensions.json](.vscode/extensions.json)

## Setup android/ios app

- Install xcode and android studio
- Connect to virtual or actual android and ios devices through android studio and xcode
- Run `npm run setup`

## Start web app locally

- Run `npm run dev`
- Go to `https://localhost:3001`

## Start electron app locally

- Run `npm run dev:app`

## Start android app locally

- Run `npm run dev:android`

## Start ios app locally

- Run `npm run dev:ios`

## Testing

Tools:
[Jest](https://facebook.github.io/jest/docs/en/expect.html)
[Cypress](https://docs.cypress.io/guides/overview/why-cypress)

Commands:

```
npm run test:unit
npm run test:unit:watch
npm run test:cypress
```

## Changelogs

[Changelogs](config/docs/chagelogs.md)

### Website URL

https://allset-inc.netlify.app/
