import { ROLES } from "@/config/role/Roles.config";

class PermissionsHelper {
  constructor() {
    this.roles = ROLES;
  }

  async getPermissionsByRoleName(name) {
    const role = this.roles.find((role) => role.name === name);
    return role ? role.permissions : [];
  }
}

export default PermissionsHelper;
