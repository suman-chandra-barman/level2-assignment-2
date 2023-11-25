# Mongoose Express CRUD Mastery
## project scripts
start: "node ./dist/server.js", <br>
start:dev: "ts-node-dev --respawn --transpile-only ./src/server.ts", <br>
lint: "eslint src --ignore-path .eslintignore --ext .ts",<br>
lint:fix: "npx eslint src --fix",<br>
prettier: "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",<br>
prettier:fix: "npx prettier --write src",<br>
