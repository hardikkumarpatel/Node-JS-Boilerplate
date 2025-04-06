const Messages = {
  GENERAL: Object.freeze({
    CODE: "Code"
  })
};

const Env = Object.freeze({
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  DB_HOST: "DB_HOST",
  DB_USER: "DB_USER",
  DB_PASS: "DB_PASS",
  DB_NAME: "DB_NAME",
  DB_DIALECT: "DB_DIALECT",
  DB_PORT: "DB_PORT",
  ACCESS_TOKEN_SECRET: "ACCESS_TOKEN_SECRET",
  ACCESS_TOKEN_EXPIRY: "ACCESS_TOKEN_EXPIRY",
  REFRESH_TOKEN_SECRET: "REFRESH_TOKEN_SECRET",
  REFRESH_TOKEN_EXPIRY: "REFRESH_TOKEN_EXPIRY",
  RESET_PASSWORD_TOKEN_SECRET: "RESET_PASSWORD_TOKEN_SECRET",
  RESET_PASSWORD_TOKEN_EXPIRY: "RESET_PASSWORD_TOKEN_EXPIRY",
  LOG_LEVEL: "LOG_LEVEL",
  AUTH_PASSWORD: "AUTH_PASSWORD"
});

const ROLES = Object.freeze([
  {
    name: "SUPER_ADMIN",
    permissions: ["create", "read", "update", "delete"]
  },
  {
    name: "ADMIN",
    permissions: ["create", "read", "update"]
  },
  {
    name: "EMPLOYEE",
    permissions: ["read"]
  },
  {
    name: "ANONYMOUES",
    permissions: ["read"]
  }
]);

const Permissions = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  READ: "read",
  DELETE: "delete"
});

export { Messages, Env, ROLES, Permissions };
