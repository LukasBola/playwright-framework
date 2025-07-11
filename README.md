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
- prepare local evn file: `cp .env-template .env`

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

## Uruchamianie testów na różnych środowiskach

Projekt obsługuje trzy środowiska:

- lokalne (`local`): http://localhost:3000
- deweloperskie (`dev`): https://dev.example.com
- staging (`stage`): https://stage.example.com

Środowisko wybierasz przez zmienną środowiskową `TEST_ENV`:

```sh
# Domyślnie (local):
npx playwright test

# Środowisko deweloperskie:
TEST_ENV=dev npx playwright test

# Środowisko staging:
TEST_ENV=stage npx playwright test
```

Więcej informacji: [Playwright – testy na różnych środowiskach](https://playwright.info/playwright-testy-na-roznych-srodowiskach)

## Instalacja dotenv

Aby zainstalować dotenv do zarządzania zmiennymi środowiskowymi, użyj polecenia:

```
npm i -D dotenv
```
