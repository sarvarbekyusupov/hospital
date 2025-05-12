import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreateAttr {
  name: string;
  email: string;
  hashed_password: string;
  role?: string;
}

@Table({ tableName: "Admin" })
export class Admin extends Model<Admin, IAdminCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "admin",
  })
  declare role: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;
}
