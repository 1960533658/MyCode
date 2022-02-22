# MySQL显示可视化操作软件操作MySQL数据库
SHOW DATABASES;

# 创建数据库
CREATE DATABASE spring_long CHARSET=utf8

# 进入数据库
use spring_long;
# 创建表
CREATE TABLE userinfo (
  uid INT, # int：整数
  uname VARCHAR(20), -- 用户姓名（昵称）
  age INT,   -- 用户年龄
  birthday DATETIME, -- 用户生日
  gender CHAR -- 用户性别
);

# 查看表结构
DESC userinfo;
# 查看表(所有)数据
select * from userinfo;

# 表中插入数据
insert into spring_long.user
values
(1,'zhangsan',12,'2000-01-01','男');

insert into spring_long.user
values
(2,'zhangsan',12,'2000-01-01','男'); 

insert into spring_long.user
(uid,uname,birthday, sex)
values
(3,'李四','2000-01-01','男'); 
# 修改表名
alter table spring_long.userinfomation rename spring_long.user;

# 修改列名
alter table spring_long.`user` change column gender sex char;
select * from spring_long.`user`;
desc `user`;
# 修改列的类型和约束
alter table spring_long.`user` modify column uname varchar(10);

# 删除表
create database userinfo;
show tables;
create table userinfo (id int);
drop table spring_long.userinfo;

# select 子句
## 查询常量
select 1000;

## 查询表达式
select 100%3;

## 查询字段
select uname from spring_long.`user`;

## 查询函数
select version(); # 查询版本号
select user(); # 查询当前用户
## 给字段起别名
select version() as `版本号`; 
select `uname` as `名字`, `age` as `年龄` from spring_long.`user`;

## （输出结果）拼接字符串 '名字姓名岁' 非表格形式 CONCAT(字段, 字段...)函数 用于字段的连接
select CONCAT( `uname`,`age`)  as `字符串拼接结果`,`birthday` from spring_long.`user`;

## ifnull
### 语法：ifnull(字段, 输出结果替换值)
select CONCAT( `uname`,IFNULL(`age`,'无年龄'))  as `字符串拼接结果`,`birthday` from spring_long.`user`;

## 去除重复数据
select DISTINCT`uname` from spring_long.`user`;