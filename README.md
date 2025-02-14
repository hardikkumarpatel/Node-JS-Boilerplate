# Node Boilerplate Engine

Here are the setup instructions for node boilerplate project.

# 🏁 Installation

### 💻 Running locally

- Install [NodeJs](https://www.nodejs.org/).
- Clone the project repository.
- Navigate to the project directory.
- Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
- Install the packages:
- **NOTE:** Recommended to use `yarn` insted of `npm`
- [Yarn](https://yarnpkg.com/)
- Install yarn globally

```bash
npm install --global yarn
```

```bash
yarn install
```

- **OR**

```bash
npm install
```

- If you get an error while installing dependency with npm, run the following command to install dependency. (ignore all peerDependencies when installing)

```bash
npm install --legacy-peer-deps
```

- Run the project in local:

```bash
npm run start
```

- You're all set. Enjoy Happy coding! ☠️

### 🐳 Using Docker (recommended)

- Install the [Docker](https://www.docker.com/products/docker-desktop/) Desktop app.
- Clone the project repository.
- Navigate to the project directory.
- Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
- **NOTE:** If any changes are needed, you can update the steps accordingly in `Dockerfile`.
- **NOTE:** You can choose any name when building the image. I used `node-app` for this example.
- Build the docker image.

```bash
docker build -t node-app .
```

- Run the build image as docker container.

```bash
 docker run -p 3001:3001 node-app
```

- Verify the Application.
- All set! enjoy. ✌🏻

## 🎯 The boilerplate includes the following Core Backend Features and Development Utilities and Tools setup.

## 𝌘 Core Backend Features 𝌘

- **Database:** MongoDB, SQL(Sequelize)
- **Middleware & Security:** CORS, JWT, Roles & Permissions, Cookies
- **Error Handling:** Signal & Uncaught Error Exception, NodeJS Error Exception, Global Error
- **APIs & Communication:** REST APIs, Socket, Swagger Docs
- **Deployment & Infrastructure:** Docker

## 𝌘 Development Utilities & Tools 𝌘

- **Development Utilities:** Nodemon, Babel, Husky
- **Code Quality Tools:** ESLint, Prettier
- **Security Tools:** Helmet, Rate Limiter, Express Basic Auth
- **Logging and Monitoring Tools:** Morgan, Winston

## 🎯 Here are descriptions of popular libraries used in the project

## 🧹 Formatting

- [Prettier](https://prettier.io/)
- Prettier is a tool that automatically formats your code to ensure a consistent style across your project.
- To check style issues via Prettier, use the following command.

```bash
  npm run format:check
```

- Run the following command to fix style issues.

```bash
  npm run format:write
```

## 🔧 Linting

- [ESLint](https://eslint.org/)
- ESLint is a tool for identifying and fixing problems in JavaScript code. It helps maintain code quality by enforcing coding standards and detecting errors.
- Use the following command to identify all problems in files and print them in the terminal.

```bash
  npm run lint
```

## 🛠️ Husky

- [Husky](https://typicode.github.io/husky/)
- Husky is a tool that enables Git hooks, allowing you to run scripts at various points in your Git workflow. It is commonly used to automate tasks such as running linters, formatters, and tests before commits or pushes, ensuring code quality and consistency across a team.
- **NOTE**: Before committing, automatically format files using Prettier and check for warnings and errors using ESLint. If both Prettier and ESLint pass without issues, allow the commit to proceed. Otherwise, reject the commit request. This ensures consistent formatting and maintains code quality standards before changes are finalized in the repository.
- Currently, we use the two husky hooks shown below.
- `pre-commit` and `commit-msg`

## 🌈 Winston

- [Winston](https://github.com/winstonjs/winston)
- Winston is a flexible logging library for Node.js. It supports multiple logging levels, various output destinations, and custom formatting.

## 📜 Swagger

- Swagger docs available at the following URL.
- [Swagger](http://localhost:3010/docs/)
- **Here, How to use Swagger docs as Postman APIs**
  - Also we have the option to serve generated documentation content from Swagger for use in Postman APIs.
  - [Swagger Docs](http://localhost:3010/docs.json/)
  - Use the provided URL to get the Swagger JSON content and copy it.
  - Open the Postman app.
  - Click the import button, paste the copied content, and click import.
  - Now will see a collection with all APIs and their sample examples (**NOTE:** it will automatically set the environment variables for all APIs).
  - You're all set. Enjoy!

## 😈 Authors

- **Fullstack Team** ⚔️
