export const ROLES = Object.freeze([
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

export const Permissions = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  READ: "read",
  DELETE: "delete"
});
