# mysql-03

## 条件查询

### 用处
1. 一般用在搜索

2. 选择一类数据

### 语法
```mysql
select 查询列表 from 表名 where 筛选条件
```

### 分类

1. 按条件表达式查询(条件运算符： `>` `<` `>=` `<=` `!=`/`<>`【不等于】 `=`     安全等于：`<=>`)
2. 按逻辑表达式查询(逻辑查询 `not`/`!` `and`/`&&` `or`/`||` )
3. 模糊查询(like between and in is null)

## 排序查询
> 输出的数据按照价格、销量、时间排序

### 语法
```mysql
# asc：升序（从小到大） desc：降序（从大到小）
select 查询列表（字段） from 表 [where 筛选条件 order by 排序列表（字段） [asc || desc]]
```