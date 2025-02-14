import { Model } from "sequelize";
import SequelizeDBConnection from "@/database/sql/connections/Sequelize.connection";

class User extends Model {}
User.init(
  {},
  {
    sequelize: SequelizeDBConnection.connection,
    modelName: "user",
    freezeTableName: true
  }
);

export default User;
