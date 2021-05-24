import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Role } from "./Role";

@Entity("menu", { schema: "stock_demo" })
export class Menu {
  @Column("varchar", { primary: true, name: "id", length: 128 })
  id: string;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @Column("varchar", { name: "description", length: 128 })
  description: string;

  @Column("varchar", { name: "menuCode", length: 128 })
  menuCode: string;

  @Column("varchar", { name: "icon", length: 128 })
  icon: string;

  @Column("varchar", { name: "parentId", nullable: true, length: 128 })
  parentId: string | null;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updatedAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @Column("varchar", { name: "mpath", nullable: true, length: 255 })
  mpath: string | null;

  @Column("varchar", { name: "url", length: 128 })
  url: string;

  @ManyToOne(() => Menu, (menu) => menu.menus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  menus: Menu[];

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
