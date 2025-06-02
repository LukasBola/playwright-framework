# Tests for GAD application

## Prepare

### Local recommended tools:

- VSC
- Git
- Node >16

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky`

### Husky

NOTE: Important to remember:

When setting up Husky in a project, use the command:
`npx husky init`
When someone clones our repository and wants to activate Husky, they should run the command:
`npx husky`
