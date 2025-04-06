import { Env } from "@/constant";

class Config {
  constructor() {
    this.config = new Map();
    this.load();
  }

  load() {
    Object.keys(process.env).forEach((key) => this.config.set(key, process.env[key]));
  }

  getEnv(key) {
    return this.config.get(key);
  }

  isProduction() {
    return this.getEnv(Env.NODE_ENV) === "production";
  }

  isStaging() {
    return this.getEnv(Env.NODE_ENV) === "staging";
  }

  isDev() {
    return !this.isProduction() && !this.isStaging();
  }
}
export default new Config();
