export const IConfig = Object.freeze({
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

class Config {
  config = new Map();
  constructor() {
    this.load();
  }

  load() {
    Object.keys(process.env).forEach((key) => this.config.set(key, process.env[key]));
  }

  get(key) {
    return this.config.get(key);
  }

  isProduction() {
    return this.get(IConfig.NODE_ENV) === "production";
  }

  isStaging() {
    return this.get(IConfig.NODE_ENV) === "staging";
  }

  isDev() {
    return !this.isProduction() && !this.isStaging();
  }
}
export default new Config();
