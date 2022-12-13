---
title: "SQL语法"
order: 3
category:
  - 数据库
---

# SQL语法

### DDL

#### 数据库、数据表、数据的关系

![](http://images.hellocode.top/%E6%95%B0%E6%8D%AE%E5%BA%93%E3%80%81%E8%A1%A8%E3%80%81%E6%95%B0%E6%8D%AE%E7%9A%84%E5%85%B3%E7%B3%BB.png)

- MySQL服务器中可以创建多个数据库
- 每个数据库可以包含多张数据表
- 每个数据表中可以存储多条数据记录
- 客户端通过数据库管理系统来操作MySQL数据库

#### SQL的介绍

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

#### 查询和创建数据库

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

#### 修改、删除、使用数据库

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

#### 查询数据表

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

#### 创建数据表

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

#### 数据表的修改

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

#### 数据表的删除

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

### DML

#### 新增表数据

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

#### 修改和删除表数据

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

### DQL

#### 查询语法

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

#### 查询全部

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

#### 条件查询

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

#### 聚合函数查询

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

#### 排序查询

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

#### 分组查询

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

#### 分页查询

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

### 约束

- 什么是约束
  对表中的数据进行限定，保证数据的正确性、有效性、完整性

- 约束的分类

  | 约束                          | 作用         |
  | ----------------------------- | ------------ |
  | PRIMARY KEY                   | 主键约束     |
  | PRIMARY KEY AUTO_INCREMENT    | 主键自增     |
  | UNIQUE                        | 唯一约束     |
  | NOT NULL                      | 非空约束     |
  | FOREIGN KEY                   | 外键约束     |
  | FOREIGN KEY ON UPDATE CASCADE | 外键级联更新 |
  | FOREIGN KEY ON DELETE CASCADE | 外键级联删除 |

#### 主键约束

- 特点
  主键约束默认包含非空和唯一两个功能
  一张表只能有一个主键
  主键一般用于表中数据的唯一标识

- 建表时添加主键约束

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型 PRIMARY KEY,
      ...
      列名 数据类型 约束
  );
  ```

- 删除主键约束
  `ALTER TABLE 表名 DROP PRIMARY KEY;`

- 建表以后单独添加主键
  `ALTER TABLE 表名 MODIFY 列名 数据类型 PRIMARY KEY;`

```sql
-- 创建学生表(编号、姓名、年龄) 编号为主键
CREATE TABLE students(
	id INT PRIMARY KEY,
	NAME VARCHAR(20),
	age INT
);

-- 查询学生表的详细信息
DESC students;

-- 添加数据
INSERT INTO students VALUES(NULL, '张三', 23);		-- 添加失败，主键不能为空
INSERT INTO students VALUES(1, '张三', 23);
INSERT INTO students VALUES(1, '李四', 24);		-- 添加失败，主键唯一
INSERT INTO students VALUES(2, '李四', 24);

-- 删除主键
ALTER TABLE students DROP PRIMARY KEY;

-- 建表后单独添加主键约束
ALTER TABLE students MODIFY id INT PRIMARY KEY;
```

#### 主键自增约束

- 建表时添加主键自增约束

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型 PRIMARY KEY AUTO_INCREMENT,
      ...
      列名 数据类型 约束
  );
  ```

  > 添加自增约束之后，主键内容就可以写null，会自动进行加一操作

- 删除主键自增约束
  `ALTER TABLE 表名 MODIFY 列名 数据类型;`
- 建表后单独添加主键自增约束
  `ALTER TABLE 表名 MODIFY 列名 数据类型 AUTO_INCREMENT;`

==MySQL中的自增约束，必须配合主键的约束一起来使用！==

```sql
-- 创建学生表(编号、姓名、年龄) 编号设为主键自增
CREATE TABLE students(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	age INT
);

-- 查询学生表的详细信息
DESC students;

-- 添加数据
INSERT INTO students VALUES(NULL, '张三',23);
INSERT INTO students VALUES(NULL, '李四',24);

-- 删除自增约束
ALTER TABLE students MODIFY id INT;		-- 只删除自增约束，不会删除主键约束

-- 建表后单独添加自增约束
ALTER TABLE students MODIFY id INT AUTO_INCREMENT;
```

#### 唯一约束

- 建表时添加唯一约束

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型 UNIQUE,
      ...
      列名 数据类型 约束
  );
  ```

- 删除唯一约束
  `ALTER TABLE 表名 DROP INDEX 列名;`

- 建表后单独添加唯一约束
  `ALTER TABLE 表名 MODIFY 列名 数据类型 UNIQUE;`

```sql
-- 创建学生表（编号、姓名、年龄）  编号设为主键自增，年龄设为唯一
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	age INT UNIQUE
);
-- 查询学生表的详细信息
DESC student;

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23);
INSERT INTO student VALUES (NULL, '李四', 23);

-- 删除唯一约束
ALTER TABLE student DROP INDEX age;

-- 建表后单独添加唯一约束
ALTER TABLE student MODIFY age INT UNIQUE;
```

#### 非空约束

- 建表时添加非空约束

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型 NOT NULL,
      ...
      列名 数据类型 约束
  );
  ```

- 删除非空约束
  `ALTER TABLE 表名 MODIFY 列名 数据类型;`
- 建表后单独添加非空约束
  `ALTER TABLE 表名 MODIFY 列名 数据类型 NOT NULL;`

```sql
-- 创建学生表（编号、姓名、年龄）  编号设为主键自增，姓名设为非空，年龄设为唯一
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20) NOT NULL,
	age INT UNIQUE
);

-- 查询学生表的详细信息
DESC student;

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23);

-- 删除非空约束
ALTER TABLE student MODIFY NAME VARCHAR(20);

-- 添加非空约束
ALTER TABLE student MODIFY NAME VARCHAR(20) NOT NULL;
```

#### 外键约束

- 为什么要有外键约束？
  当表与表之间的数据有相关联性的时候，如果没有相关的数据约束，则无法保证数据的准确性！
  比如用户和订单，表与表之间也有关联
- 外键约束的作用
  让表与表之间产生关联关系，从而保证数据的准确性！

- 建表时添加外键约束

  ```sql
  CREATE TABLE 表名{
  	列名 数据类型 约束,
  	...
  	CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主表主键列名)
  };
  ```

- 删除外键约束
  `ALTER TABLE 表名 DROP FOREIGN KEY 外键名;`

- 建表后单独添加外键约束

  ```sql
  ALTER TABLE 表名 ADD
  CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名);
  ```

  > 外键名一般取两个表的首字母_fk编号
  > 例如：ou_fk1

```sql
-- 建表时添加外键约束
-- 创建user表
CREATE TABLE USER(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- id
	NAME VARCHAR(20) NOT NULL 		-- 姓名
);
-- 添加用户数据
INSERT INTO USER VALUES (NULL,'张三'),(NULL, '李四');

-- 创建orderlist订单表
CREATE TABLE orderlist(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- id
	number VARCHAR(20) NOT NULL,		-- 订单编号
	uid INT, 				-- 外键列
	CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id)
);

-- 添加订单数据
INSERT INTO orderlist VALUES (NULL, '001', 1),(NULL, '002', 1),
(NULL, '003', 2),(NULL, '004', 2);

-- 添加一个订单，但是没有真实用户,添加失败
INSERT INTO orderlist VALUES (NULL, '005', 3);

-- 删除李四用户，删除失败
DELETE FROM USER WHERE NAME='李四';

-- 删除外键约束
ALTER TABLE orderlist DROP FOREIGN KEY ou_fk1; 

-- 添加外键约束
ALTER TABLE orderlist ADD CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id);
```

#### 外键级联操作(了解)

- 什么是级联更新
  当对主表中的数据进行修改时，从表中有关联的数据也会随之修改
- 什么是级联删除
  当主表中的数据删除时，从表中的数据也会随之删除

> 级联操作在真实开发中很少使用，因为它耦合性太强，牵一发动全身

- 添加级联更新

  ```sql
  ALTER TABLE 表名 ADD
  CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名)
  ON UPDATE CASCADE;
  ```

- 添加级联删除

  ```sql
  ALTER TABLE 表名 ADD
  CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名)
  ON DELETE CASCADE;
  ```

- 同时添加级联更新和级联删除

  ```sql
  ALTER TABLE 表名 ADD
  CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名)
  ON UPDATE CASCADE ON DELETE CASCADE;
  ```

```sql
-- 添加外键约束，同时添加级联更新和级联删除
ALTER TABLE orderlist ADD
CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id)
ON UPDATE CASCADE ON DELETE CASCADE;

-- 将李四这个用户id修改为3,订单表中的uid也自动修改
UPDATE USER SET id=3 WHERE NAME='李四';

-- 将李四这个用户删除，订单表中的该用户所属的订单也自动修改
DELETE FROM USER WHERE id=3;
```

### 多表操作

- 多表概念
  通俗的讲就是多张数据表，而表与表之间是可以有一定的关联关系，这种关联关系通过外键约束实现。
- 多表的分类
  一对一
  一对多
  多对多

#### 一对一

- 适用场景
  例如人和身份证。一个人只有一个身份证，一个身份证只能对应一个人
- 建表原则
  在任意一个表建立外键，去关联另外一个表的主键

```sql
-- 创建db5数据库
CREATE DATABASE db5;

-- 使用db5数据库
USE db5;

-- 创建person表
CREATE TABLE person(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	NAME VARCHAR(20)			-- 姓名
);

-- 添加数据
INSERT INTO person VALUES (NULL, '张三'), (NULL, '李四');

-- 创建card表
CREATE TABLE card(
	id INT PRIMARY KEY AUTO_INCREMENT,		-- 主键id
	number VARCHAR(20) UNIQUE NOT NULL,		-- 身份证号
	pid INT UNIQUE,					-- 外键列
	CONSTRAINT cp_fk1 FOREIGN KEY (pid) REFERENCES person(id) 
);

-- 添加数据
INSERT INTO card VALUES (NULL, '12345', 1), (NULL, '56789', 2);
```

#### 一对多

- 适用场景
  用户和订单。一个用户可以有多个订单
  商品分类和商品。一个分类下可以有多个商品
- 建表原则
  在多的一方，建立外键约束，来关联一的一方主键

```sql
-- 创建user表
CREATE TABLE USER(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	NAME VARCHAR(20)			-- 姓名
);

-- 添加数据
INSERT INTO USER VALUES (NULL, '张三'), (NULL, '李四');

-- 创建orderlist表
CREATE TABLE orderlist(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	number VARCHAR(20),			-- 订单编号
	uid INT,				-- 外键链
	CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id)
);

-- 添加数据
INSERT INTO orderlist VALUES (NULL, '001', 1), (NULL, '002', 1), (NULL, '003', 2), (NULL, '004', 2);
```

#### 多对多

- 适用场景
  学生和课程。一个学生可以选择多个课程，一个课程也可以被多个学生选择
- 建表原则
  需要借助第三张中间表，中间表至少包含两个列。这两个列作为中间表的外键，分别关联两张表的主键

```sql
-- 创建student表
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	NAME VARCHAR(20)			-- 姓名
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三'), (NULL, '李四');

-- 创建course表
CREATE TABLE course(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	NAME VARCHAR(10)			-- 课程名称
);

-- 添加数据
INSERT INTO course VALUES (NULL, '高数'), (NULL, '线代');

-- 创建中间表
CREATE TABLE stu_course(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 主键id
	sid INT,	-- 用于和student表中的id进行外键关联
	cid INT,	-- 用于和course表中的id进行外键关联
	CONSTRAINT sc_fk1 FOREIGN KEY (sid) REFERENCES student(id),	-- 添加外键约束
	CONSTRAINT sc_fk2 FOREIGN KEY (cid) REFERENCES course(id)	-- 添加外键约束
);

-- 添加数据
INSERT INTO stu_course VALUES (NULL, 1, 1), (NULL, 1, 2), (NULL, 2, 1), (NULL, 2, 2);
```

#### 多表查询

**多表查询分类**

- 内连接查询

- 外连接查询
- 子查询
- 自关联查询

**数据准备**

```sql
-- 创建db4数据库
CREATE DATABASE db4;

-- 使用db4数据库
USE db4;

-- 创建user表
CREATE TABLE USER(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 用户id
	NAME VARCHAR(20),			-- 用户姓名
	age INT					-- 用户年龄
);

-- 添加数据
INSERT INTO USER VALUES (1, '张三', 23), (2, '李四', 24), (3, '王五', 25), (4, '赵六', 26);

-- 订单表
CREATE TABLE orderlist(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 订单id
	number VARCHAR(30),			-- 订单编号
	uid INT,				-- 外键字段
	CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id) 
);

-- 添加数据
INSERT INTO orderlist VALUES (1, '001', 1);
INSERT INTO orderlist VALUES (2, '002', 1);
INSERT INTO orderlist VALUES (3, '003', 2);
INSERT INTO orderlist VALUES (4, '004', 2);
INSERT INTO orderlist VALUES (5, '005', 3);
INSERT INTO orderlist VALUES (6, '006', 3);
INSERT INTO orderlist VALUES (7, '007', NULL);

-- 商品分类表
CREATE TABLE category(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 商品分类id
	NAME VARCHAR(10)			-- 商品分类名称
);
-- 添加数据
INSERT INTO category VALUES (1, '手机数码'), (2, '电脑办公'), (3, '烟酒茶糖'), (4, '鞋靴箱包');

-- 商品表
CREATE TABLE product(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 商品id
	NAME VARCHAR(30),			-- 商品名称
	cid INT,				-- 外键字段
	CONSTRAINT cp_fk1 FOREIGN KEY (cid) REFERENCES category(id)
);

-- 添加数据
INSERT INTO product VALUES 
(1, '华为手机', 1), (2, '小米手机', 1), (3, '联想电脑', 2), 
(4, '苹果电脑', 2), (5, '中华香烟', 3), (6, '玉溪香烟', 3), (7, '计生用品', NULL);

-- 中间表
CREATE TABLE us_pro(
	upid INT PRIMARY KEY AUTO_INCREMENT,	-- 中间表id
	uid INT,				-- 外键字段，需要和用户表的主键产生关联
	pid INT,				-- 外键字段，需要和商品表的主键产生关联
	CONSTRAINT up_fk1 FOREIGN KEY (uid) REFERENCES USER(id),
	CONSTRAINT up_fk2 FOREIGN KEY (pid) REFERENCES product(id)
);

-- 添加数据
INSERT INTO us_pro VALUES
(NULL, 1, 1), (NULL, 1, 2), (NULL, 1, 3), (NULL, 1, 4),
(NULL, 1, 5), (NULL, 1, 6), (NULL, 1, 7), (NULL, 2, 1),
(NULL, 2, 2), (NULL, 2, 3), (NULL, 2, 4), (NULL, 2, 5),
(NULL, 2, 6), (NULL, 2, 7), (NULL, 3, 1), (NULL, 3, 2),
(NULL, 3, 3), (NULL, 3, 4), (NULL, 3, 5), (NULL, 3, 6),
(NULL, 3, 7), (NULL, 4, 1), (NULL, 4, 2), (NULL, 4, 3),
(NULL, 4, 4), (NULL, 4, 5), (NULL, 4, 6), (NULL, 4, 7);
```

**内连接查询**

- 查询原理
  内连接查询的是两张表有交集的部分数据（有主外键关联的数据）
- 查询语法
  显示内连接：`SELECT 列名 FROM 表名1 [INNER] JOIN 表名2 ON 条件;`
  隐式内连接：`SELECT 列名 FROM 表名1,表名2 WHERE 条件;`

```sql
/*
	显示内连接
*/

-- 查询用户信息和他对应的订单信息
SELECT * FROM USER INNER JOIN orderlist ON orderlist.uid = user.id;

-- 查询用户信息和对应的订单信息，起别名
SELECT * FROM USER u INNER JOIN orderlist o ON o.uid = u.id;

-- 查询用户姓名、年龄和订单号
SELECT
	u.name,		-- 用户姓名
	u.age,		-- 用户年龄
	o.number	-- 订单编号
FROM
	USER u 		-- 用户表
INNER JOIN
	orderlist o 	-- 订单表
ON
	o.uid = u.id;
	
/*
	隐式内连接
*/

-- 查询用户姓名，年龄，订单编号
SELECT
	u.name,		-- 用户姓名
	u.age,		-- 用户年龄
	o.number	-- 订单编号
FROM
	USER u,
	orderlist o
WHERE
	o.uid=u.id;
```

**外连接查询**

- 左外连接

  - 查询原理
    查询左表的全部数据，和左右两张表有交集部分的数据
  - 查询语法
    `SELECT 列名 FROM 表名1 LEFT [OUTER] JOIN 表名2 ON 条件;`

- 右外连接

  - 查询原理
    查询右表的全部数据，和左右两张表有交集部分的数据
  - 查询语法
    `SELECT 列名 FROM 表名1 RIGHT [OUTER] JOIN 表名2 ON 条件;`

  ```sql
  -- 查询所有用户信息，以及用户对应的订单信息
  SELECT
  	u.*,
  	o.number
  FROM
  	USER u
  LEFT OUTER JOIN
  	orderlist o
  ON
  	u.id=o.uid;
  	
  -- 所有订单信息，以及订单所属的用户信息
  SELECT
  	o.*,
  	u.name
  FROM
  	USER u
  RIGHT OUTER JOIN
  	orderlist o
  ON
  	u.id=o.uid;
  ```

**子查询**

- 概念
  查询语句中嵌套了查询语句，我们就将嵌套的查询称为子查询
- 结果是单行单列的
  - 查询作用
    可以将查询的结果作为另一条语句的查询条件，使用运算符判断（=、>、>=、<、<=de等）
  - 查询语法
    `SELECT 列名 FROM 表名 WHERE 列名=(SELECT 列名 FROM 表名 [WHERE 条件]);`
- 结果是多行单列的
  - 查询作用
    可以作为条件，使用运算符 IN 或 NOT IN 进行判断
  - 查询语法
    `SELECT 列名 FROM 表名 WHERE 列名 [NOT] IN (SELECT 列名 FROM 表名 [WHERE 条件]);`
- 结果是多行多列的
  - 查询作用
    查询的结果可以作为一张虚拟表参与查询
  - 查询语法
    `SELECT 列名 FROM 表名 [别名], (SELECT 列名 FROM 表名 [WHERE 条件] [别名] [WHERE 条件]);`

```sql
-- 查询年龄最高的用户姓名
SELECT NAME,age FROM USER WHERE age=(SELECT MAX(age) FROM USER);

-- 查询张三和李四的订单信息
SELECT * FROM orderlist WHERE uid IN (SELECT id FROM USER WHERE NAME IN ('张三', '李四'));

-- 查询订单表中id大于4的订单信息和所属用户信息
SELECT
	o.number,
	u.name
FROM
	USER u
INNER JOIN
	(SELECT * FROM orderlist WHERE id > 4) o
ON
	u.id=o.uid;
```

**自关联查询**

- 概念
  在同一张表中数据有关联性，我们可以把这张表当成多个表来查询

```sql
-- 创建员工表
CREATE TABLE employee(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 员工编号
	NAME VARCHAR(20),			-- 员工姓名
	mgr INT,				-- 上级编号
	salary DOUBLE				-- 员工工资
);

-- 添加数据
INSERT INTO employee VALUES (1001, '孙悟空', 1005, 9000.00),
(1002, '猪八戒', 1005, 8000.00),
(1003, '沙和尚', 1005, 8500.00),
(1004, '小白龙', 1005, 7900.00),
(1005, '唐僧', NULL, 15000.00),
(1006, '武松', 1009, 7600.00),
(1007, '李逵', 1009, 7400.00),
(1008, '林冲', 1009, 8100.00),
(1009, '宋江', NULL, 16000.00);

-- 查询所有员工的姓名及其直接上级的姓名，没有上级的员工也需要查询
SELECT
	e1.id,
	e1.name,
	e1.mgr,
	e2.id,
	e2.name
FROM
	employee e1
LEFT OUTER JOIN
	employee e2
ON
	e1.mgr=e2.id;
```

#### 练习

1. 查询用户的编号、姓名、年龄、订单编号
2. 查询所有的用户。用户的编号、姓名、年龄、订单编号
3. 查询所有的订单。用户的编号、姓名、年龄、订单编号
4. 查询用户年龄大于23岁的信息。显示用户的编号、姓名、年龄、订单编号
5. 查询张三和李四用户的信息。显示用户的编号、姓名、年龄、订单编号
6. 查询商品分类的编号、分类名称、分类下的商品名称
7. 查询所有的商品分类。商品分类的编号、分类名称、分类下的商品名称
8. 查询所有的商品信息。商品分类的编号、分类名称、分类下的商品名称
9. 查询所有的用户和所有的商品。显示用户的编号、姓名、年龄、商品名称
10. 查询张三和李四这两个用户可以看到的商品。显示用户的编号、姓名、年龄、商品名称

```sql
-- 1.查询用户的编号、姓名、年龄、订单编号
SELECT 
	u.*,
	o.number 
FROM 
	USER AS u 
INNER JOIN 
	orderlist AS o 
ON 
	u.id=o.uid;

-- 2.查询所有的用户。用户的编号、姓名、年龄、订单编号
SELECT
	u.*,
	o.number
FROM
	USER u
LEFT OUTER JOIN
	orderlist o
ON
	u.id=o.uid;

-- 3.查询所有的订单。用户的编号、姓名、年龄、订单编号
SELECT
	u.*,
	o.number
FROM
	USER u
RIGHT OUTER JOIN
	orderlist o
ON
	u.id=o.uid;

-- 4.查询用户年龄大于23岁的信息。显示用户的编号、姓名、年龄、订单编号
# 方式1
SELECT
	u.*,
	o.number
FROM
	(SELECT * FROM USER WHERE age>23) u,
	orderlist o
WHERE
	u.id=o.uid;
# 方式2
SELECT
	u.*,
	o.number
FROM
	USER u,
	orderlist o
WHERE
	u.id=o.uid
	AND
	u.age > 23;


-- 5.查询张三和李四用户的信息。显示用户的编号、姓名、年龄、订单编号
# 方式1
SELECT
	u.*,
	o.number
FROM
	(SELECT * FROM USER WHERE NAME IN ('张三', '李四')) u,
	orderlist o
WHERE
	u.id=o.uid;
# 方式2
SELECT
	u.*,
	o.number
FROM
	USER u,
	orderlist o
WHERE
	u.id=o.uid
	AND
	u.name IN ('张三', '李四');
	
-- 6.查询商品分类的编号、分类名称、分类下的商品名称
# 方式1
SELECT
	c.id,
	c.name,
	p.name
FROM
	category c
INNER JOIN
	product p
ON
	c.id=p.cid;
# 方式2
SELECT
	c.*,
	p.name
FROM
	category c,
	product p
WHERE
	c.id=p.cid;

-- 7.查询所有的商品分类。商品分类的编号、分类名称、分类下的商品名称
SELECT
	c.*,
	p.name
FROM
	category c
LEFT OUTER JOIN
	product p
ON
	c.id=p.cid;

-- 8.查询所有的商品信息。商品分类的编号、分类名称、分类下的商品名称
SELECT
	c.*,
	p.name
FROM
	category c
RIGHT OUTER JOIN
	product p
ON
	c.id=p.cid;

-- 9.查询所有的用户和所有的商品。显示用户的编号、姓名、年龄、商品名称
SELECT
	u.*,
	p.name
FROM
	USER u,
	product p,
	us_pro up
WHERE
	up.uid=u.id
	AND
	up.pid=p.id;

-- 10.查询张三和李四这两个用户可以看到的商品。显示用户的编号、姓名、年龄、商品名称
SELECT
	u.id,
	u.name,
	u.age,
	p.name
FROM
	(SELECT * FROM USER WHERE NAME IN ('张三', '李四')) u,
	product p,
	us_pro up
WHERE
	up.uid=u.id
	AND
	up.pid=p.id;
```

### 视图

- 视图：是一种虚拟存在的数据表，这个数据表并不在数据库中实际存在
- 作用：将一些较为复杂的查询语句的结果，封装到一个虚拟表中，后期再有相同需求时，直接查询该虚拟表即可

#### 数据准备

```sql
-- 创建db5数据库
CREATE DATABASE db5;

-- 使用db5数据库
USE db5;

-- 创建country表
CREATE TABLE country(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 国家id
	NAME VARCHAR(30)			-- 国家名称
);

-- 添加数据
INSERT INTO country VALUES (NULL, '中国'), (NULL, '美国'), (NULL, '俄罗斯');

-- 创建city表
CREATE TABLE city(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 城市id
	NAME VARCHAR(30),			-- 城市名称
	cid INT,				-- 外键列
	CONSTRAINT cc_fk1 FOREIGN KEY (cid) REFERENCES country(id)	-- 添加外键约束
);

-- 添加数据
INSERT INTO city VALUES (NULL, '北京', 1), (NULL, '上海', 1), (NULL, '纽约', 2), (NULL, '莫斯科', 3);
```

#### 创建和查询

- 创建视图语法
  `CREATE VIEW 视图名称 [(列表列名)] AS 查询语句;`
- 查询视图语法
  `SELECT * FROM 视图名称; `

```sql
-- 创建city_country视图，保存城市和国家的信息（使用指定列名）
CREATE VIEW city_country (city_id, city_name, country_name) AS
SELECT
	c1.id,
	c1.name,
	c2.name
FROM
	city c1,
	country c2
WHERE
	c1.cid=c2.id;

-- 查询视图
SELECT * FROM city_country;
```

#### 修改和删除

- 修改视图数据语法
  `UPDATE 视图名称 SET 列名=值 WHERE 条件;`

- 修改视图结构语法
  `ALTER VIEW 视图名称 (列名列表) AS 查询语句;`
- 删除视图语法
  `DROP VIEW [IF EXISTS] 视图名称;`

> 注意：修改视图数据后，原表数据也会随之修改

```sql
SELECT * FROM city_country;
-- 修改视图数据，将北京修改为深圳
UPDATE city_country SET city_name='深圳' WHERE city_name='北京';

-- 将视图中的country_name修改为name
ALTER VIEW city_country (city_id, city_name, NAME) AS
SELECT
	c1.id,
	c1.name,
	c2.name
FROM
	city c1,
	country c2
WHERE
	c1.cid=c2.id;
	
-- 删除视图
DROP VIEW IF EXISTS city_country;
```

### 数据库备份和恢复

**命令行方式**

- 备份
  登录到MySQL服务器，输入：`mysqldump -u root -p 数据库名称 > 文件保存路径`

  ```shell
  mysqldump -u root -p db5 > /root/db5.sql
  ```

- 恢复
  1. 登录MySQL数据库：`mysql -u root -p`
  2. 删除已备份的数据库：`DROP DATABASE db5;`
  3. 重新创建名称相同的数据库：`CREATE DATABASE db5;`
  4. 使用该数据库：`USE db5;`
  5. 导入文件执行：`source 备份文件全路径;`

> 所谓的备份，就是将一些sql语句存储起来，恢复就是执行这些sql语句，重新创建数据库中的内容



**图形化界面方式**

> 这个方法比较简单，选中需要操作的数据库右键选择备份即可
> 恢复的时候删除原数据库再重新创建，然后选中新建的这个数据库，右键导入即可

### 存储过程和函数

- 存储过程和函数是事先经过编译并存储在数据库中的一段SQL语句的集合
- 存储过程和函数的好处
  - 提高代码的复用性
  - 减少数据在数据库和应用服务器之间的传输，提高效率
  - 减少代码层面的业务处理
- 存储过程和函数的区别
  - 存储函数必须有返回值
  - 存储过程可以没有返回值

#### 创建和调用

- 创建存储过程

  ```sql
  -- 修改结束分隔符
  DELIMITER $
  
  -- 创建存储过程
  CREATE PROCEDURE 存储过程名称(参数列表)
  BEGIN
  	SQL 语句列表;
  END$
  
  -- 修改结束分隔符
  DELIMITER;
  ```

- 调用存储过程
  `CALL 存储过程名称(实际参数);`

```sql
-- 数据准备

-- 创建db6数据库
CREATE DATABASE db6;

-- 使用db6数据库
USE db6;

-- 创建学生表
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 学生id
	NAME VARCHAR(20),			-- 学生姓名
	age INT,				-- 学生年龄
	gender VARCHAR(5),			-- 学生性别
	score INT 				-- 学生成绩
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23, '男', 95), (NULL, '李四', 24, '男', 98), 
(NULL, '王五', 25, '女', 100), (NULL, '赵六', 26, '女', 90);


-- 按照性别进行分组，查询每组学生的总成绩。按照总成绩的升序排序
SELECT gender,SUM(score) getsum FROM student GROUP BY gender ORDER BY getsum ASC;
```

```sql
-- 创建stu_group() 存储过程，封装 分组查询总成绩，并按照总成绩升序排序的功能
DELIMITER $

CREATE PROCEDURE stu_group()
BEGIN
	SELECT gender,SUM(score) getsum FROM student GROUP BY gender ORDER BY getsum ASC;
END$

DELIMITER ;

-- 调用存储过程
CALL stu_group;
```

#### 查看和删除

- 查看数据库中所有的存储过程
  `SELECT * FROM mysql.proc WHERE db='数据库名称';`
- 删除存储过程
  `DROP PROCEDURE [IF EXISTS] 存储过程名称;`

```sql
-- 查看db6数据库中所有的存储过程
SELECT * FROM mysql.proc WHERE db='db6';

-- 删除存储过程
DROP PROCEDURE IF EXISTS stu_group;
```

#### 变量

- 定义变量
  `DECLARE 变量名 数据类型 [DEFAULT 默认值];`
- 变量赋值方式一
  `SET 变量名=变量值;`
- 变量赋值方式二
  `SELECT 列名 INTO 变量名 FROM 表名 [WHERE 条件];`

```sql
-- 定义一个int类型变量，并赋默认值为10
DELIMITER $

CREATE PROCEDURE pro_test1()
BEGIN
	-- 定义变量
	DECLARE num INT DEFAULT 10;
	-- 使用变量
	SELECT num;
END$

DELIMITER ;

-- 调用pro_test1存储过程
CALL pro_test1();


/*
	变量赋值
*/

-- 定义一个varchar类型变量并赋值
DELIMITER $

CREATE PROCEDURE pro_test2()
BEGIN
	-- 定义变量
	DECLARE NAME VARCHAR(10);
	-- 为变量赋值
	SET NAME = '存储过程';
	-- 使用变量
	SELECT NAME;
END$

DELIMITER ;

-- 调用pro_test2存储过程
CALL pro_test2();


-- 定义两个int类型的变量，用于存储男女同学的总分数
DELIMITER $

CREATE PROCEDURE pro_test3()
BEGIN
	-- 定义两个变量
	DECLARE men,women INT;
	-- 为变量赋值
	SELECT SUM(score) INTO men FROM student WHERE gender = '男';
	SELECT SUM(score) INTO women FROM student WHERE gender = '女';
	-- 使用变量
	SELECT men,women;
END$

DELIMITER ;

-- 调用pro_test3
CALL pro_test3();
```

#### if语句

- if语句标准语法

  ```sql
  IF 判断条件1 THEN 执行的sql语句1;
  [ELSEIF 判断条件2 THEN 执行的sql语句2;]
  ...
  [ELSE 执行的sql语句n;]
  END IF;
  ```

```sql
/*
	定义一个int类型的变量，用于存储班级总成绩
	定义一个varchar变量，用于存储分数描述
	根据总成绩判断：
		380分以上	学习优秀
		320~380		学习不错
		320以下		学习一般
*/

DELIMITER $

CREATE PROCEDURE pro_test4()
BEGIN
	-- 定义变量
	DECLARE total INT;
	DECLARE info VARCHAR(10);
	-- 查询班级总成绩为total赋值
	SELECT SUM(score) INTO total FROM student;
	-- 判断
	IF total >= 380 THEN
		SET info = '学习优秀';
	ELSEIF total BETWEEN 320 AND 380 THEN 
		SET info = '学习不错';
	ELSE
		SET info = '学习一般';
	END IF;
	-- 使用变量
	SELECT total,info;
END$

DELIMITER ;

-- 调用pro_test4
CALL pro_test4();
```

#### 参数传递

- 存储过程的参数和返回值

  ```sql
  CREATE PROCEDURE 存储过程名称([IN][OUT][INOUT] 参数名 数据类型)
  BEGIN
  	SQL语句列表;
  END$
  ```

  > IN：代表输入参数，需要由调用者传递实际数据（默认）
  > OUT：代表输出参数，该参数可以作为返回值
  > INOUT：代表既可以作为输入参数，也可以作为输出参数

```sql
/*
	输入总成绩变量，代表学生总成绩
	输出分数描述变量，代表学生总成绩的描述信息
	根据总成绩判断
		380分及以上	学习优秀
		320~380		学习不错
		320分及以下	学习一般
*/

DELIMITER $

CREATE PROCEDURE pro_test5(IN total INT,OUT info VARCHAR(10))
BEGIN
	-- 对总成绩判断
	IF total >= 380 THEN
		SET info = '学习优秀';
	ELSEIF total BETWEEN 320 AND 380 THEN
		SET info = '学习不错';
	ELSE
		SET INFO = '学习一般';
	END IF;
END$

DELIMITER ;

-- 调用存储过程
CALL pro_test5(383, @info);

CALL pro_test5((SELECT SUM(score) FROM student), @info);

SELECT @info;
```

#### while循环

- while 循环语法

  ```sql
  初始化语句;
  WHILE 条件判断语句 DO
  	循环体语句;
  	条件控制语句;
  END WHILE;
  ```

```sql
-- 计算1~100之间的偶数和

DELIMITER $

CREATE PROCEDURE pro_test6()
BEGIN
	-- 定义求和变量
	DECLARE result INT DEFAULT 0;
	-- 定义初始化变量
	DECLARE num INT DEFAULT 1;
	-- while 循环
	WHILE num <= 100 DO
		IF num % 2 = 0 THEN
			SET result = result + num;
		END IF;
		
		SET num = num + 1;
	END WHILE;
	-- 查询求和结果
	SELECT result;
END$

DELIMITER ;

-- 调用存储过程
CALL pro_test6();
```

#### 存储函数

- 存储函数和存储过程是非常相似的，区别在于存储函数必须有返回值

- 创建存储函数

  ```sql
  CREATE FUNCTION 函数名称(参数列表)
  RETURNS 返回值类型
  BEGIN
  		SQL语句列表;
  		RETURN 结果;
  END$
  ```

- 调用存储函数
  `SELECT 函数名称(实际参数);`

- 删除函数
  `DROP FUNCTION 函数名称;`

```sql
-- 定义存储函数，获取学生表中成绩大于95分的学生数量
DELIMITER $

CREATE FUNCTION fun_test()
RETURNS INT
BEGIN
	-- 定义变量
	DECLARE s_count INT;
	-- 查询数量并赋值
	SELECT COUNT(*) INTO s_count FROM student WHERE score > 95;
	-- 返回
	RETURN s_count;
END$

DELIMITER ;

-- 调用函数
SELECT fun_test();

-- 删除函数
DROP FUNCTION fun_test;
```

### 触发器

- 触发器是与表有关的数据库对象，可以在insert、update、delete 之前或之后触发并执行触发器中定义的SQL语句
- 这种特性可以协助应用系统在数据库端确保数据的完整性、日志记录、数据校验等操作
- 可以使用别名 `NEW` 或者 `OLD`来引用触发器中发生变化的内容记录

- 触发器分类

| 触发器类型      | OLD                           | NEW                           |
| --------------- | ----------------------------- | ----------------------------- |
| INSERT 型触发器 | 无（因为插入前无数据）        | NEW表示将要或者已经新增的数据 |
| UPDATE 型触发器 | OLD表示修改之前的数据         | NEW表示将要或已经修改后的数据 |
| DELETE 型触发器 | OLD表示将要或者已经删除的数据 | 无（因为删除后状态无数据）    |

#### 触发器的操作

- 创建触发器

  ```sql
  DELIMITER $
  
  CREATE TRIGGER 触发器名称
  BEFORE|AFTER INSERT|UPDATE|DELETE
  ON 表名
  FOR EACH ROW
  BEGIN
  	触发器要执行的功能
  END$
  
  DELIMITER ;
  ```

- 数据准备

  ```sql
  -- 创建db7数据库
  CREATE DATABASE db7;
  
  -- 使用db7数据库
  USE db7;
  
  -- 创建账户表account
  CREATE TABLE account(
  	id INT PRIMARY KEY AUTO_INCREMENT,	-- 账户id
  	NAME VARCHAR(20),			-- 姓名
  	money DOUBLE				-- 余额
  );
  
  -- 添加数据
  INSERT INTO account VALUES (NULL, '张三', 1000), (NULL, '李四', 1000);
  
  -- 创建日志表account_log
  CREATE TABLE account_log(
  	id INT PRIMARY KEY AUTO_INCREMENT,	-- 日志id
  	operation VARCHAR(20),			-- 操作类型 (insert update delete)
  	operation_time DATETIME,		-- 操作时间
  	operation_id INT,			-- 操作表的id
  	operation_param VARCHAR(200)		-- 操作参数
  );
  ```

- INSERT 型触发器

  ```sql
  -- 创建insert型触发器，用于对account表新增数据进行日志的记录
  DELIMITER $
  
  CREATE TRIGGER account_insert
  AFTER INSERT
  ON account
  FOR EACH ROW
  BEGIN
  	INSERT INTO account_log VALUES (NULL, 'INSERT', NOW(), new.id, CONCAT('插入后{id=',new.id,',name=',new.name,',money=',new.money,'}'));
  END$
  
  DELIMITER ;
  
  -- 向account表添加一条数据
  INSERT INTO account VALUES (NULL, '王五', 2000);
  
  -- 查询account表
  SELECT * FROM account;
  
  -- 查询account_log表
  SELECT * FROM account_log;
  ```

- UPDATE 型触发器

  ```sql
  -- 创建update型触发器，用于对account表修改数据进行日志记录
  DELIMITER $
  
  CREATE TRIGGER account_update
  AFTER UPDATE
  ON account
  FOR EACH ROW
  BEGIN
  	INSERT INTO account_log VALUES (NULL, 'UPDATE', NOW(), new.id, CONCAT('更新前{id=',old.id,',name=',old.name,',money=',old.money,'}','更新后{id=',new.id,',name=',new.name,',money=',new.money,'}'));
  END$
  
  DELIMITER ;
  
  -- 修改account表中李四的金额为2000
  UPDATE account SET money = 2000 WHERE NAME = '李四';
  
  -- 查询account表
  SELECT * FROM account;
  
  -- 查询account_log表
  SELECT * FROM account_log;
  ```

- DELETE 型触发器

  ```sql
  -- 创建delete型触发器，用于对account表删除的数据进行日志的记录
  DELIMITER $
  
  CREATE TRIGGER account_delete
  AFTER DELETE
  ON account
  FOR EACH ROW
  BEGIN
  	INSERT INTO account_log VALUES (NULL, 'DELETE', NOW(), old.id, CONCAT('删除前{id=',old.id,',name=',old.name,',money=',old.money,'}'));
  END$
  
  DELIMITER ;
  
  -- 删除account表中王五
  DELETE FROM account WHERE NAME = '王五';
  
  -- 查询account表
  SELECT * FROM account;
  
  -- 查询account_log表
  SELECT * FROM account_log;
  ```

#### 查看和删除

- 查看触发器
  `SHOW TRIGGERS;`
- 删除触发器
  `DROP TRIGGER 触发器名称;`

```sql
-- 查看触发器
SHOW TRIGGERS;

-- 删除account_delete触发器
DROP TRIGGER account_delete;
```

### 事务

> 事务：一条或多条SQL语句组成一个执行单元，其特点是这个单元要么同时成功要么同时失败
> 单元中的每条SQL语句都相互依赖，形成一个整体
> 如果某条SQL语句失败或者出现错误，那么这个单元就会撤回到事务最初的状态
> 如果单元中所有的SQL语句都执行成功，则事务就顺利执行

#### 基本使用

- 开启事务
  `START TRANSACTION;`
- 回滚事务
  `ROLLBACK;`
- 提交事务
  `COMMIT;`

```sql
-- 创建db8数据库
CREATE DATABASE db8;

-- 使用db8数据库
USE db8;

-- 创建账户表
CREATE TABLE account(
	id INT PRIMARY KEY AUTO_INCREMENT,	-- 账户id
	NAME VARCHAR(20),			-- 账户名称
	money DOUBLE				-- 账户余额
);
-- 添加数据
INSERT INTO account VALUES (NULL, '张三', 1000), (NULL, '李四', 1000);
```

```sql
-- 张三给李四转账500元

-- 开启事务
START TRANSACTION;

-- 1. 张三账户-500
UPDATE account SET money = money - 500 WHERE NAME = '张三';

出错了...

-- 2.李四账户+500
UPDATE account SET money = money + 500 WHERE NAME = '李四';

-- 回滚事务
ROLLBACK;

-- 提交事务
COMMIT;
```

#### 提交方式

- 事务提交方式

  - 自动提交（MySQL默认）
  - 手动提交

- 查看事务提交方式
  `SELECT @@AUTOCOMMIT;`

  > 0代表手动提交
  > 1代表自动提交

- 修改事务提交方式
  `SET @@AUTOCOMMIT = 数字;`

```sql
-- 查询事务提交方式
SELECT @@autocommit;

-- 修改事务提交方式
SET @@autocommit = 0;

UPDATE account SET money = 2000 WHERE id = 1;  -- 临时修改，并未提交

COMMIT;
```

#### 四大特征(ACID)

- 原子性(Atomicty)
  原子性指事物包含的所有操作要么全部成功，要么全部失败回滚
  因此事务的操作如果成功就必须要完全应用到数据库，如果操作失败则不能对数据库有任何影响
- 一致性(Consistency)
  一致性是指事务必须使数据库从一个一致性状态变换到另一个一致性状态
  也就是说一个事务执行之前和执行之后都必须处于一致性状态
- 隔离性(Isolcation)
  隔离性是当多个用户并发访问数据库时，比如操作同一张表时，数据库为每一个用户开启的事务
  不能被其他事务的操作所干扰，多个并发事务之间要相互隔离
- 持久性(Durability)
  持久性是指一个事务一旦提交了，那么对数据库中的数据的改变就是永久性的
  即便是在数据库系统遇到故障的情况下也不会丢失提交事务的操作

#### 隔离级别

- 事务的隔离级别
  多个客户端操作时，各个客户端的事务之间应该是隔离的，相互独立的，不受影响的
  而如果多个事务操作同一批数据时，就会产生不同的问题，我们需要设置不同的隔离级别来解决这些问题

- 隔离级别分类

  | 隔离级别         | 名称     | 会引发的问题           |
  | ---------------- | -------- | ---------------------- |
  | read uncommitted | 读未提交 | 脏读、不可重复读、幻读 |
  | read committed   | 读已提交 | 不可重复读、幻读       |
  | repeatable read  | 可重复读 | 幻读                   |
  | serializable     | 串行化   | 无                     |

- 引发的问题

  | 问题       | 现象                                                         |
  | ---------- | ------------------------------------------------------------ |
  | 脏读       | 在一个事务处理过程中读取到了另一个未提交事务中的数据，导致两次查询结果不一致 |
  | 不可重复读 | 在一个事务处理过程中读取到了另一个事务中修改并已提交的数据，导致两次查询不一致 |
  | 幻读       | 查询某数据不存在，准备插入此纪录，但执行插入时发现此纪录已存在，无法插入。或者查询数据不存在执行删除操作，却发现删除成功 |

- 查询数据库隔离级别
  `SELECT @@TX_ISOLATION;`
- 修改数据库隔离级别
  `SET GLOBAL TRANSACTION ISOLATION LEVEL 级别字符串;`

```sql
-- 查询事务隔离级别
SELECT @@tx_isolation;

-- 修改事务隔离级别（修改后需要重新连接）
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

- 总结

  | 序号 | 隔离级别         | 名称     | 脏读 | 不可重复读 | 幻读 | 数据库默认隔离级别 |
  | ---- | ---------------- | -------- | ---- | ---------- | ---- | ------------------ |
  | 1    | read uncommitted | 读未提交 | 是   | 是         | 是   |                    |
  | 2    | read committed   | 读已提交 | 否   | 是         | 是   | Oracle             |
  | 3    | repeatable read  | 可重复读 | 否   | 否         | 是   | MySQL              |
  | 4    | serializable     | 串行化   | 否   | 否         | 否   |                    |

  **注意** ：隔离级别从小到大安全性越来越高，但是效率越来越低，所以不建议修改数据库默认的隔离级别
