---
title: "SQL语法"
order: 3
category:
  - 数据库
---

# SQL语法

## DDL

### 数据库、数据表、数据的关系

![](http://images.hellocode.top/%E6%95%B0%E6%8D%AE%E5%BA%93%E3%80%81%E8%A1%A8%E3%80%81%E6%95%B0%E6%8D%AE%E7%9A%84%E5%85%B3%E7%B3%BB.png)

- MySQL服务器中可以创建多个数据库
- 每个数据库可以包含多张数据表
- 每个数据表中可以存储多条数据记录
- 客户端通过数据库管理系统来操作MySQL数据库

### SQL的介绍

- SQL(Structured Query Language)：结构化查询语言。其实就是定义了操作所有关系型数据库的一种规则
- 通用语法规则
  SQL语句可以单行或者多行书写，以分号结尾
  可使用空格和缩进来增强语句的可读性
  MySQL 数据库的 SQL 语句不区分大小写，关键字建议使用大写
  单行注释：`--注释内容`  `#注释内容`(MySQL特有)
  多行注释：`/*注释内容*/`
- SQL分类
  DDL(Data Definition Language)：数据定义语言。用来操作数据库、表、列等
  DML(Data Manipulation Language)：数据操作语言。用来对数据库中表的数据进行增删改
  DQL(Data Query Language)：数据查询语言。用来查询数据库中表的记录（数据）
  DCL(Data Control Language)：数据控制语言。用来定义数据库的访问权限和安全级别，以及创建用户

### 查询和创建数据库

- 查询所有数据库
  `SHOW DATABASES;`
- 查询数据库的创建语句
  `SHOW CREATE DATABASE 数据库名称;`
- 创建数据库
  `CREATE DATABASE 数据库名称;`
- 创建数据库（判断，如果不存在则创建）
  `CREATE DATABASE IF NOT EXISTS 数据库名称;`
- 创建数据库（指定字符集）
  `CREATE DATABASE 数据库名称 CHARACTER SET 字符集名称;`

```sql
-- 查询所有数据库
SHOW DATABASES;

-- 查询数据库的创建语句
SHOW CREATE DATABASE mysql;

-- 创建数据库
CREATE DATABASE db1;

-- 创建数据库并判断，如果不存在则创建
CREATE DATABASE IF NOT EXISTS db2;

-- 创建数据库并指定字符集
CREATE DATABASE db3 CHARACTER SET utf8;

-- 查看数据库的字符集
SHOW CREATE DATABASE db3;


-- 练习：创建db4数据库、如果不存在则创建，并指定字符集为gbk
CREATE DATABASE IF NOT EXISTS db4 CHARACTER SET gbk;
-- 查看编码验证
SHOW CREATE DATABASE db4;
```

### 修改、删除、使用数据库

- 修改数据库（修改字符集）
  `ALTER DATABASE 数据库名称 CHARACTER SET 字符集名称;`
- 删除数据库
  `DROP DATABASE 数据库名称;`
- 删除数据库（判断，如果存在则删除）
  `DROP DATABASE IF EXISTS 数据库名称;`
- 使用数据库
  `USE 数据库名称;`
- 查看当前使用的数据库
  `SELECT DATABASE();`

```sql
-- 修改数据库（字符集）
ALTER DATABASE db4 CHARACTER SET utf8;
-- 查看db4字符集
SHOW CREATE DATABASE db4;

-- 删除数据库
DROP DATABASE db1;

-- 删除数据库（判断，存在则删除）
DROP DATABASE IF EXISTS db2;

-- 使用数据库
USE db3;

-- 查看当前使用的数据库
SELECT DATABASE();
```

### 查询数据表

- 查询所有的数据表
  `SHOW TABLES;`
- 查询表结构
  `DESC 表名;`
- 查询表字符集
  `SHOW TABLE STATUS FROM 库名 LIKE '表名';`

```sql
-- 使用mysql数据库
USE mysql;

-- 查询所有数据表
SHOW TABLES;

-- 查询表结构
DESC USER;

-- 查询表字符集
SHOW TABLE STATUS FROM mysql LIKE 'user';
```

### 创建数据表

- 创建数据表

  ```sql
  CREATE TABLE 表名(
  	列名(字段) 数据类型 约束,
      列名(字段) 数据类型 约束,
      ......
      列名(字段) 数据类型 约束
  );
  ```

- 数据类型
  ==int==：整数类型
  ==double==：小数类型
  ==date==：日期类型。包含年月日，格式：yyyy-MM-dd

  ==datetime==：日期类型。包含年月日时分秒，格式：yyyy-MM-dd HH:mm:ss
  ==timestamp==：时间戳类型。包含年月日时分秒，格式yyyy-MM-dd HH:mm:ss
  如果不给该字段赋值、或赋值为null，则默认使用当前系统时间自动赋值
  ==varchar(长度)==：字符串类型
  .........

```sql
-- 创建数据表
-- 创建一个product 商品类（商品编号、商品名称、商品价格、商品库存、上架时间）
CREATE TABLE product (
	id INT,
	NAME VARCHAR(20),
	price DOUBLE,
	stock INT,
	insert_time DATE
);
-- 查看product 表详细结构
DESC product;
```

### 数据表的修改

- 修改表名
  `ALTER TABLE 表名 RENAME TO 新表名;`
- 修改表的字符集
  `ALTER TABLE 表名 CHARACTER SET 字符集名称;`
- 单独添加一列
  `ALTER TABLE 表名 ADD 列名 数据类型;`
- 修改某列的数据类型
  `ALTER TABLE 表名 MODIFY 列名 新数据类型;`
- 修改列名和数据类型
  `ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;`
- 删除某一列
  `ALTER TABLE 表名 DROP 列名`

```sql
-- 修改表名
ALTER TABLE product RENAME TO product2;

-- 查看原字符集
SHOW TABLE STATUS FROM db3 LIKE 'product2';
-- 修改表的字符集
ALTER TABLE product2 CHARACTER SET gbk;

-- 给product2添加一列color
ALTER TABLE product2 ADD color VARCHAR(10);

-- 将color数据类型修改为int
ALTER TABLE product2 MODIFY color INT;
-- 查看表的详细结构
DESC product2;

-- 将color修改为address
ALTER TABLE product2 CHANGE color address VARCHAR(200);

-- 删除address列
ALTER TABLE product2 DROP address;
```

### 数据表的删除

- 删除数据表
  `DROP TABLE 表名;`
- 删除数据表（判断，如果存在则删除）
  `DROP TABLE IF EXISTS 表名;`

```sql
-- 删除product2表
DROP TABLE product2;

-- 删除表并判断
DROP TABLE IF EXISTS product2; 
```

## DML

### 新增表数据

- 给指定列添加数据
  `INSERT INTO 表名(列名1,列名2,...)VALUES(值1,值2,...);`
- 给全部列添加数据
  `INSERT INTO 表名 VALUES(值1,值2,...);`
- 批量添加数据
  `INSERT INTO 表名(列名1,列名2,...)VALUES(值1,值2,...),(值1,值2,...),...;`
  `INSERT INTO 表名 VALUES(值1,值2,...),(值1,值2,...),...;`

==列名和值的数量以及数据类型要对应，除了数字类型，其他数据类型的数据都需要加引号（单引双引都行，推荐单引）。==

```sql
-- 向product表添加一条数据（给全部列添加数据）
INSERT INTO product (id, NAME, price, stock, insert_time) VALUES (1, '手机', 2999, 20, '2022-02-26');
INSERT INTO product VALUES (2, '电脑', 3999, 36, '2022-02-27');

-- 向product表中添加指定数据
INSERT INTO product (id, NAME, price) VALUES (3, '电视', 1999.99);

-- 批量添加数据
INSERT INTO product VALUES (4, '冰箱', 999.99, 42, '2022-02-26'), (5, '空调', 1999, 23, '2030-01-01');
```

### 修改和删除表数据

- 修改表中的数据
  `UPDATE 表名 SET 列名1=值1,列名2=值2,...[WHERE条件];`
  ==修改语句中必须加条件，如果不加条件，则会将所有数据都修改==
- 删除表中的数据
  `DELETE FROM 表名 [WHERE 条件];`
  ==删除语句中必须加条件，如果不加条件，则会将所有数据都删除==

```sql
-- 修改手机价格为3500
UPDATE product SET price=3500 WHERE NAME='手机';

-- 修改电脑的价格为4800、库存为46
UPDATE product SET price=4800, stock=46 WHERE NAME='电脑';

-- 删除product 表中的空调信息
DELETE FROM product WHERE NAME='空调';
-- 删除product 表中库存为10的商品信息
DELETE FROM product WHERE stock=10;
```

## DQL

### 查询语法

```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段
HAVING
	分组后的过滤条件
ORDER BY
	排序
LIMIT
	分页
```

==这些语句不一定全部出现，但要按照上面的顺序==

### 查询全部

- 查询全部的表数据
  `SELECT * FROM 表名;`

- 查询指定字段的表数据
  `SELECT 列名1,列名2,... FROM 表名;`

- 去除重复查询
  `SELECT DISTINCT 列名1,列名2,... FROM 表名;`

- 计算列的值（四则运算）
  `SELECT 列名1 运算符(+ - * /) 列名2 FROM 表名;`

  > ==如果某一列为null，可以进行替换==：`IFNULL (表达式1,表达式2)`
  > 表达式1：想替换的列
  > 表达式2：想替换的值

- 起别名查询
  `SELECT 列名 AS 别名 FROM 表名;`

```sql
-- 准备数据（创建数据库以及表）
CREATE DATABASE db1;
USE db1;
CREATE TABLE product(
	id INT,			-- 商品编号
	NAME VARCHAR(20),	-- 商品名称
	price DOUBLE,		-- 商品价格
	brand VARCHAR(10),	-- 商品品牌
	stock INT,		-- 商品库存
	insert_time DATE 	-- 添加时间
);

-- 添加测试数据
INSERT INTO product VALUES
(1, '华为手机', 5999, '华为', 23, '2018-03-10'),
(2, '小米手机', 1999, '小米', 30, '2019-02-10'),
(3, '苹果手机', 3999, '苹果', 19, '2018-07-23'),
(4, '华为电脑', 4999, '华为', 14, '2020-10-27'),
(5, '小米电脑', 5996, '小米', 26, '2021-03-29'),
(6, '苹果电脑', 10000, '苹果', 15, '2022-02-26'),
(7, '联想电脑', 6999, '联想', NULL, '2023-03-14');


-- 查询全部的表数据
SELECT * FROM product;

-- 查询指定字段的表数据（name、price、brand）
SELECT NAME, price, brand FROM product;

-- 查询品牌
SELECT brand FROM product;
-- 查询品牌，去除重复
SELECT	DISTINCT brand FROM product;

-- 查询商品名称和库存，库存数量在原有的基础上加10
SELECT NAME,stock+10 FROM product;
-- 查询商品名称和库存，库存数量在原有的基础上加10，进行null值判断
SELECT NAME,IFNULL(stock,0)+10 FROM product;
-- 查询商品名称和库存，库存数量在原有的基础上加10，进行null值判断，起别名为getSum
SELECT NAME,IFNULL(stock,0)+10 AS getSum FROM product;
SELECT NAME,IFNULL(stock,0)+10 getSum FROM product;		-- 起别名时AS可以省略（空格隔开）
```

### 条件查询

- 查询条件分类

| 符号             | 功能                                             |
| ---------------- | ------------------------------------------------ |
| >                | 大于                                             |
| <                | 小于                                             |
| >=               | 大于等于                                         |
| <=               | 小于等于                                         |
| =                | 等于                                             |
| \<\> 或 !=       | 不等于                                           |
| BETWEEN...AND... | 在某个范围之内（都包含）                         |
| IN(...)          | 多选...                                          |
| LIKE 占位符      | 模糊查询；占位符`_`表示单个任意字符，`%`表示多个 |
| IS NULL          | 是NULL                                           |
| IS NOT NULL      | 不是 NULL                                        |
| AND 或 &&        | 并且                                             |
| OR 或 \|\|       | 或者                                             |
| NOT 或 !         | 非，不是                                         |

- 条件查询语法
  `SELECT 列名列表 FROM 表名 WHERE 条件;`

```sql
-- 查询库存大于20的商品信息
SELECT * FROM product WHERE stock > 20;

-- 查询品牌为华为的商品信息
SELECT * FROM product WHERE brand = '华为';

-- 查询金额在4000-6000之间的商品信息
SELECT * FROM product WHERE price > 4000 AND price < 6000;
SELECT * FROM product WHERE price BETWEEN 4000 AND 6000;

-- 查询库存为14、30、23的商品信息
SELECT * FROM product WHERE stock = 14 OR stock = 30 OR stock = 23;
SELECT * FROM product WHERE stock IN (14, 30, 23);

-- 查询库存为null的商品信息
SELECT * FROM product WHERE stock IS NULL;

-- 查询库存不为null的商品信息
SELECT * FROM product WHERE stock IS NOT NULL;

-- 查询名称以小米为开头的商品信息
SELECT * FROM product WHERE NAME LIKE '小米%';

-- 查询名称第二个字是为的商品信息
SELECT * FROM product WHERE NAME LIKE '_为%';

-- 查询名称为四个字符的商品信息
SELECT * FROM product WHERE NAME LIKE '____';

-- 查询名称中包含电脑的商品信息
SELECT * FROM product WHERE NAME LIKE '%电脑%';
```

### 聚合函数查询

- 聚合函数的介绍
  将一列数据作为一个整体，进行纵向的计算

- 聚合函数分类

  | 函数名      | 功能                             |
  | ----------- | -------------------------------- |
  | COUNT(列名) | 统计数量（一般选用不为null的列） |
  | MAX(列名)   | 最大值                           |
  | MIN(列名)   | 最小值                           |
  | SUM(列名)   | 求和                             |
  | AVG(列名)   | 平均值                           |

- 聚合函数查询语法
  `SELECT 函数名(列名) FROM 表名 [WHERE 条件];`

```sql
-- 计算product表中总记录条数
SELECT COUNT(*) FROM product;

-- 获取最高价格
SELECT MAX(price) FROM product;

-- 获取最低库存
SELECT MIN(stock) FROM product;

-- 获取总库存数量
SELECT SUM(stock) FROM product;

-- 获取品牌为苹果的总库存数量
SELECT SUM(stock) FROM product WHERE brand = '苹果';

-- 获取品牌为小米的平均商品价格
SELECT AVG(price) FROM product WHERE brand = '小米';
```

### 排序查询

- 排序查询语法
  `SELECT 列名列表 FROM 表名 [WHERE 条件] ORDER BY 列名 排序方式, 列名 排序方式, ...; `
- 排序方式
  ==ASC==升序【默认】
  ==DESC==降序
  如果有多个排序条件，只有当前面的条件值一样时，才会判断第二条件

```sql
-- 按照库存升序排序
SELECT * FROM product ORDER BY stock ASC;

-- 查询名称中包含手机的商品信息，按照金额降序排序
SELECT * FROM product WHERE NAME LIKE '%手机%' ORDER BY price DESC;

-- 按照金额升序排序，如果金额相同，按照库存降序排列
SELECT * FROM product ORDER BY price ASC, stock DESC;
```

### 分组查询

- 分组查询语法

  ```sql
  SELECT 列名列表 FROM 表名 [WHERE 条件] GROUP BY 分组列名
  [HAVING 分组后的条件过滤]
  [ORDER BY 排序列名 排序方式]
  ```

```sql
-- 按照品牌分组，获取每组商品的总金额
SELECT brand, SUM(price) FROM product GROUP BY brand;

-- 对金额大于4000元的商品，按照品牌分组，获取每组商品的总金额
SELECT brand,SUM(price) FROM product WHERE price > 4000 GROUP BY brand;

-- 对金额大于4000元的商品，按照品牌分组，获取每组商品的总金额，只显示总金额大于7000元的
SELECT brand,SUM(price) AS getsum FROM product WHERE price > 4000 GROUP BY brand HAVING getsum > 7000;

-- 对金额大于4000元的商品，按照品牌分组，获取每组商品的总金额，只显示总金额大于7000元的，并按照总金额的降序进行排序
SELECT brand,SUM(price) AS getsum FROM product 
WHERE price > 4000 
GROUP BY brand 
HAVING getsum > 7000 
ORDER BY getsum DESC;
```

### 分页查询

- 分页查询语法

  ```sql
  SELECT 列名列表 FROM 表名
  [WHERE 条件]
  [GROUP BY 分组列名]
  [HAVING 分组后的条件过滤]
  [ORDER BY 排序列名 排序方式]
  LIMIT 当前页数,每页显示的条数;
  ```

  > 当前页数 = (当前页数 - 1) * 每页显示的条数

```sql
# 每页显示3条数据

-- 第一页 当前页数 = (1 - 1) * 3
SELECT * FROM product LIMIT 0, 3;

-- 第二页 当前页数 = (2 - 1) * 3
SELECT * FROM product LIMIT 3, 3;

-- 第三页 当前页数 = (3 - 1) * 3
SELECT * FROM product LIMIT 6, 3;
```

> LIMIT后的两个参数可以理解为：从几号索引开始，一页显示几个
> 故第一页：从0索引开始，显示3个（0，1，2）
> 第二页：从3索引开始，显示3个（3，4，5）
> 第三页：从6索引开始，显示3个（6，7，8）
> ...........

## DCL

`DCL`英文全称是`Data Control Language`(数据控制语言)，用来管理数据库用户、控制数据库的访问权限

> 这类`SQL`开发人员操作的比较少，主要是`DBA`（ `Database Administrator` 数据库管理员）使用

### 管理用户

**查询用户**

```sql
USE mysql;
SELECT * FROM user;
```

**创建用户**

```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

**修改用户密码**

```sql
ALERT USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
```

**删除用户**

```sql
DROP USER '用户名'@'主机名';
```

**注意**

- 主机名可以使用`%`通配

### 权限控制

MySQL中定义了很多种权限，但是常用的就以下几种：

| 权限                | 说明               |
| ------------------- | ------------------ |
| all, all privileges | 所有权限           |
| select              | 查询数据           |
| insert              | 插入数据           |
| update              | 修改数据           |
| delete              | 删除数据           |
| alter               | 修改表             |
| drop                | 删除数据库/表/视图 |
| create              | 创建数据库/表      |

上述只是简单罗列了常见的几种权限描述，其他权限描述及含义，可以直接参考官方文档

**查询权限**

```sql
SHOW GRANTS FOR '用户名'@'主机名';
```

**授予权限**

```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```

**撤销权限**

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

**注意**

- 多个权限之间，使用逗号分隔
- 授权时，数据库名和表名可以使用`*`进行通配，代表所有

