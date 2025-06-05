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

### GAD Business requirements

`https://jaktestowac.pl/lesson/pw2sb01l02/`

## Uruchamianie testów z tagiem w Playwright
([Oficjalna dokumentacja – Tag Tests](https://playwright.dev/docs/test-annotations#tag-tests))

Aby uruchomić tylko testy oznaczone danym tagiem (np. @smoke), użyj polecenia:

```
npx playwright test --grep "@GAD-R01-01|@GAD-R01-02"
npx playwright test --grep "@GAD-R01-01"  - uruchomi 1 test
npx playwright test --grep "@GAD-R01"  - uruchomi wszystkie testy zawierające @GAD-R01
npx playwright test --grep-invert "@GAD-R01"  - uruchomi wszystkie testy NIE zawierające @GAD-R01

```

Możesz też użyć skryptu z package.json:

```
npm run test:with-tag
```

Aby oznaczyć test tagiem, dodaj komentarz nad testem, np.:

Więcej informacji znajdziesz w dokumentacji Playwright: https://playwright.dev/docs/test-annotations#tagging-tests
