import { Column, Entity, Index } from "typeorm";

@Index("url", ["url"], { unique: true })
@Entity("resource", { schema: "stock_demo" })
export class Resource {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "url", nullable: true, unique: true, length: 255 })
  url: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("int", { name: "expire", nullable: true })
  expire: number | null;

  @Column("varchar", { name: "expire_cst", nullable: true, length: 255 })
  expireCst: string | null;

  @Column("longtext", { name: "data", nullable: true })
  data: string | null;
}
