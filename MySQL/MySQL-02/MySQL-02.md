# MySQL-02

## MySQL语言规则与规范
- 在MySQL中关键字是全大写的 只有自己定义的内容才是小写
- MySQL中的语句必须使用`;`结尾

## MySQL中的表操作

### 创建表
```mysql
create table 表名 (
  字段名 字段类型 [约束],
  字段名 字段类型 [约束],
  ...
  字段名 字段类型 [约束]
)
```

```mysql
CREATE TABLE userinfo (
  uid INT, # int：整数
  uname VARCHAR(20), -- 用户姓名（昵称）
  age INT,   -- 用户年龄
  birthday DATETIME, -- 用户生日
  gender CHAR -- 用户性别
);
```
### 查看表(查看表结构、表数据)
```mysql
# 查看表结构
desc [表名]
desc userinfo

# 查看表数据表数据
select * from [表名]
select * from userinfo

```
### 修改表

#### 修改表名
```mysql
# 语法
alter table [表名] rename [新表名]

# 实例
alter table spring_long.userinfo rename spring_long.userinfomation;
```

#### 修改列名
```mysql
# 语法
alter table [表名] change column [旧列名] [新列名] [类型]

# 实例
alter table spring_long.`user` change column gender sex char;
```

#### 修改列（字段）的类型和约束
```mysql
# 语法
alter table 表名 modify column 列名 新类型 [新约束]
# 实例
alter table spring_long.`user` modify column uname varchar(10);
```

#### 删除表
```mysql
# 语法
drop table [表名]
# 实例
drop table spring_long.userinfo;
```
#### 插入数据
```mysql
# 插入数据
inset into [数据库名].[表名]
(字段名,字段名...字段名)
values (值,值...值)

insert into spring_long.userinfo 
(uid,uname,age,birthday, gender)
values
(1,'zhangsan',12,'2000-01-01','男');

# # 简化写法（所有字段全部添加）
insert into spring_long.userinfo 
values
(2,'zhangsan',12,'2000-01-01','男');
```
### 删除表
```mysqll
drop table [数据表]
```
## MySQL中的数据查询语言（DQL）

1. 查询语句的查询结果是一个虚拟表，所谓的虚拟表就是没有在硬盘中存储 在硬盘中存储下来的叫实表
2. select语句是一个子句可以单独执行 可以是字段 变量 函数，多个查询列表选项使用逗号隔开
### 基本查询
```mysql
# 语法
select [查询列表(字段)] from [表名];
```
select 相当于js中的console.log()
```mysql
# 查询常量
select 1000;

## 查询表达式
select 100%3;

## 查询字段
select uname from spring_long.`user`;

## 查询多个字段
select `uname`,`age` from spring_long.`user`;

## 查询函数
select version(); # 查询版本号
select user(); # 查询当前用户w

## 给字段起别名
### 语法：字段 as 别名 或者 字段 别名
select version() `版本号`;
select `uname` as `名字`, `age` as `年龄` from spring_long.`user`;


## （输出结果）拼接字符串 '名字姓名岁' 非表格形式 CONCAT(字段, 字段...)函数 用于字段的连接
select CONCAT( `uname`,`birthday`,`age`) as `字符串拼接结果` from spring_long.`user`;

## ifnull
### 语法：ifnull(字段, 输出结果替换值)
select CONCAT( `uname`,IFNULL(`age`,'无年龄'))  as `字符串拼接结果`,`birthday` from spring_long.`user`; 

## 去除重复数据
select DISTINCT`uname` from spring_long.`user`;
```



