# day-03 
# 条件查询
select * from spring_long.userinfomation;
## select 查询列表（字段） from 表名 where 筛选条件
# 分类
-- 1. 按条件表达式查询 !=等价于<>
select * from spring_long.userinfomation where uname != 'zhangsan';
select * from spring_long.userinfomation where uname <> 'zhangsan';
select * from spring_long.userinfomation where age > 0;
select * from spring_long.userinfomation where uname = '李四';
-- 2. 按逻辑表达式查询
select * from spring_long.userinfomation where age > 0 && age <=12;
select * from spring_long.userinfomation where age > 0 and age <=12;
select * from spring_long.userinfomation where age  between 0 and 12;
select * from spring_long.userinfomation where !(age > 0 and age <=12);
select * from spring_long.userinfomation where !(uname = 'zhangsan');
-- 3. 模糊查询
select * from spring_long.userinfomation where uname like '%zhang%';
-- 查询首字符为 z 其余字符中包含s的数据
select * from spring_long.userinfomation where uname like 'z_%s%';
-- 找到name是zhansan和李四的数据
select * from spring_long.userinfomation where uname in('zhangsan','李四');
-- 找出age（为）不为null的数据
select * from spring_long.userinfomation where age is null;
select * from spring_long.userinfomation where !(age is null);

# 排序查询
-- 找到所有名字叫zhansan的人并且按照id 升（降）序排列
select * 
from spring_long.userinfomation 
where uname = 'zhangsan'
order by uid asc;
-- 
select * 
from spring_long.userinfomation 
where uname = 'zhangsan'
order by uid desc;

-- 按照uname的长短进行排序
select *
from spring_long.userinfomation
order by
length(uname) desc;
-- 
select *
from spring_long.userinfomation
order by
length(uname) asc;

-- 按照uname的长度进行升序序 再根据uid继续进行升序排列
select *
from spring_long.userinfomation
order by
LENGTH(uname) asc,uid asc;