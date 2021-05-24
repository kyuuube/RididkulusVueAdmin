import { Column, Entity } from "typeorm";

@Entity("article", { schema: "stock_demo" })
export class Article {
  @Column("varchar", {
    primary: true,
    name: "id",
    comment: "主键id",
    length: 128,
  })
  id: string;

  @Column("varchar", { name: "authorId", comment: "用户id", length: 128 })
  authorId: string;

  @Column("varchar", { name: "authorName", comment: "用户名称", length: 128 })
  authorName: string;

  @Column("text", { name: "content", comment: "文章内容" })
  content: string;

  @Column("varchar", { name: "title", comment: "文章标题", length: 128 })
  title: string;

  @Column("int", { name: "status", comment: "状态", default: () => "'1'" })
  status: number;

  @Column("tinyint", {
    name: "is_delete",
    comment: "是否删除",
    width: 1,
    default: () => "'0'",
  })
  isDelete: boolean;

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
}
