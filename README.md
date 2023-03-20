# DemoBay

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit and integration tests

Run `npm test` to execute the test written for jest and cypress component testing.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests that are created with cypress.

## Coverage

Run `npm run coverage` for available coverag reports

## Analyze bundle

Run `npm run analyze` for bundle analyzer

## Watching tests

Run `npm start` and `npm run cy:open` to select cypress flow tests or cypress component testing.  
Watching tests gives wider understanding of test scopes and it's much easier to develop with

## Decisions

- Didn't build a signle page application. It's better to show structural decisions on an application with smaller modules.  
  It's also better to see a user flow including multiple routes
- Reactive forms: Default HTML tags gives pretty good built-in validation. If I owned the project, I'd try to use default browser validations. But I went to reactive forms as almost in all projects, the requirements get complicated easily. It's more important to be able handle requirements easily in future.
- Cypress component testing: It just works. I can talk about this for hours.
- Coverage: Only added jest code coverage report. But most of the tests are cypress tests. I didn't have enough time to add cypress coverage.
