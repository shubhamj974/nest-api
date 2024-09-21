import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Custumer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  cust_id: number;

  @Column({
    allowNull: false,
  })
  cust_name: string;

  @Unique
  @Column({
    allowNull: false,
  })
  cust_email: string;

  @Column({
    type: 'bigint',
    allowNull: false,
  })
  cust_mobile_no: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
