# Home Library Service

## Downloading

```
git clone https://github.com/kolyagae/nodejs2022Q4-service.git
```

## Switch to development branch

```
git checkout home-library-service-part-2
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Running application

```
npm run start
```

## Running application in docker

```
npm run docker:start
```

## Running vulnerabilities scanning

```
npm run docker:scan
```

After running the application on port (default 4000) you can open
in your browser's OpenAPI documentation by typing https://editor.swagger.io/ then add the contents of the doc/api.yaml file to the editor window.
For more information about OpenAPI/Swagger visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
