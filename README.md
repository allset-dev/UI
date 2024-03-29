# AllSet INC

## Developer setup

- clone repo
- Install [Node JS using NVM](https://github.com/nvm-sh/nvm)
- Run `npm install`
- Plugins are automatically installed on VS Code via [extensions.json](.vscode/extensions.json)

## Setup android/ios app

- Install xcode and android studio
- Connect to virtual or actual android and ios devices through android studio and xcode
- Run `npm run setup`

## Start web app locally

- Run `npm start`
- App will automatically open in default browser

## Start electron app locally

- Run `npm start:app`

## Start android app locally

- Run `npm start:a`

## Start ios app locally

- Run `npm start:ios`

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
