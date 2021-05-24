DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  id varchar(128) NOT NULL DEFAULT '' COMMENT '主键id',
  authorId varchar(128) NOT NULL DEFAULT '' COMMENT '用户id',
  authorName varchar(128) NOT NULL DEFAULT '' COMMENT '用户名称',
  content text NOT NULL COMMENT '文章内容',
  title VARCHAR(128) NOT NULL DEFAULT '' COMMENT '文章标题',
  status INT(11) NOT NULL DEFAULT 1 COMMENT '状态',
  is_delete tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
