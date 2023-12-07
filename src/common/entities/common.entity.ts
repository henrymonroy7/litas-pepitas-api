import { Column } from "typeorm";

export class Common {
  @Column({
    type: "date",
    nullable: false,
    default: () => "CURRENT_DATE",
    name: "creation_date",
  })
  creationDate?: Date;

  @Column({
    type: "boolean",
    nullable: false,
    name: "valid",
    default: true,
  })
  valid?: boolean;
}
