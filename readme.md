1. Initialize the project:

npm init

2. Install Typescript:

yarn add -D typescript
npm install typescript --save-dev

3. Install Express, Mongoose, and Cors:

yarn add express mongoose cors
npm install express mongoose cors

4. Install TypeScript type definitions for Express:

yarn add -D @types/express
npm install @types/express --save-dev

5. Install TypeScript type definitions for Cors:

yarn add -D @types/cors
npm install @types/cors --save-dev

6. Install TypeScript ESLint parser:

yarn add -D @typescript-eslint/parser
npm install @typescript-eslint/parser --save-dev

7. Configure TypeScript:

Run tsc --init
Update tsconfig.json:
"rootDir": "./src",
"outDir": "./dist",

8. Install dotenv:

yarn add dotenv
npm install dotenv

9. Create a .env file at the root of your project directory to set your environment variables. Inside the .env file, add the necessary secrets and configurations. For example:

NODE_ENV=development
PORT=5000
DATABASE_URL=your-database-url //Replace your-database-url with the actual URL for your database.

10. Create a .gitignore file at the root of your project directory to ignore unnecessary files when pushing to GitHub. Add the following content to the .gitignore file:

dist
node_modules
.env

11. Create a config folder and an index.ts file inside it.

Import necessary modules:
import dotenv from "dotenv";
import path from "path";
Load environment variables:
dotenv.config({
path: path.join(process.cwd(), ".env"),
});
Export configuration:
export default {
port: process.env.PORT,
database_url: process.env.DATABASE_URL,
};

12. Create two files inside the src folder:

app.ts (Express application setup)
//app.ts
import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
res.send("Hello World!");
});

export default app;

server.ts (Database connection setup)
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
await mongoose.connect(config.database_url as string);
console.log("Connected to MongoDB");
app.listen(config.port, () => {
console.log(`Server running at port ${config.port}`);
});
}

main();

13. Install ts-node-dev:

yarn add -D ts-node-dev
npm install ts-node-dev --save-dev

14. Update the package.json scripts:

"start": "ts-node-dev --respawn --transpile-only src/server.ts", 15. Start the server:

yarn start
npm start
Setup ESLint, Prettier, Husky, and lint-staged

1. Install the ESLint and Prettier extensions in your code editor.

2. Update tsconfig.json:

"include": ["src"],
"exclude": ["node_modules"]

3. Install ESLint and TypeScript ESLint plugin:

yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

4. Create .eslintrc file with the following content:

{
"parser": "@typescript-eslint/parser",
"parserOptions": {
"ecmaVersion": "latest",
"sourceType": "module"
},
"plugins": ["@typescript-eslint"],
"extends": [
"eslint:recommended",
"plugin:@typescript-eslint/recommended",
"prettier"
],
"rules": {
"no-unused-vars": "error",
"no-console": "warn",
"no-undef": "error",
"no-unused-expressions": "error",
"no-unreachable": "error",
"@typescript-eslint/consistent-type-definitions": ["error", "type"]
},
"env": {
"browser": true,
"node": true,
"es2021": true
}
}

5. Add the following in package.json scripts:

"lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
"lint:fix": "eslint . --fix"

6. Create .eslintignore file with the following content:

dist
node_modules
.env

7. Install Prettier:

yarn add -D prettier
npm install prettier --save-dev

8. Create .prettierrc file with the following content:

{
"semi": true,
"singleQuote": true,
"arrowParens": "avoid"
}

9. Add the following in package.json scripts:

"prettier:check": "prettier --ignore-path .gitignore --write \"\*_/_.+(js|ts|json)\"",
"prettier:fix": "prettier --write .",

10. Update settings.json in VS Code:

"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true

11. Install eslint-config-prettier:

yarn add -D eslint-config-prettier
npm install eslint-config-prettier --save-dev

12. Install Husky:
    yarn add husky --dev
    yarn husky install

13. Install lint-staged:

yarn add -D lint-staged
npm install lint-staged --save-dev

14. create pre-commit hook on husky

yarn husky add .husky/pre-commit "yarn lint-staged"

15. Update package.json scripts:
    "scripts": {
    //....other scripts
    "lint-prettier": "yarn lint:check && yarn prettier:check"
    },
    "lint-staged": {
    "src/\*_/_.ts": "yarn lint-prettier"
    }
