import { ROLES } from "@/constant";

class RoleHelper {
  constructor() {
    this.roles = ROLES;
  }

  async getRoleByName(name) {
    return this.roles.find((role) => role.name === name);
  }

  async getRoles() {
    return this.roles;
  }
}

export default RoleHelper;
