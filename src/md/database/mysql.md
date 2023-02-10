---
title: "MySQL"
order: 4
category:
  - 数据库
---

# MySQL

## 一、函数

> 函数是指一段可以直接被另一端程序调用的程序或代码。聚合函数也是函数的一种

**调用方法**

```sql
SELECT 函数();
```

### 1、字符串函数

MySQL中内置了很多字符串函数，常用的几个如下：

![img](http://images.hellocode.top/20b85d21d32b4127a2af4d4dbb3e2ce2.png)

```sql
SELECT CONCAT('Hello ','MySQL');    -- Hello MySQL

SELECT LOWER('Hello');      -- hello
SELECT UPPER('Hello');      -- HELLO

SELECT LPAD('abc',5,'.');       -- ..abc
SELECT RPAD('abc',5,'.');       -- abc..

SELECT TRIM(' Hello Mysql ');       -- Hello Mysql

SELECT SUBSTRING('HelloCode',2,4);      -- ello

-- 由于业务需求的变更，企业员工的工号，统一为5位数，目前不足5位数的全部在前面补0
update emp set workno = lpad(workno, 5, '0');
```

**注意**

- `TRIM`函数只去除头部和尾部空格，字符串之间的空格不会去除
- `SUBSTRING`函数索引是从1开始的

### 2、数值函数

![img](http://images.hellocode.top/08cdada06eee4db487766a56a16bae95.png)

```sql
SELECT CEIL(1.1);       -- 2
SELECT FLOOR(1.9);      -- 1
SELECT MOD(6, 4);       -- 2
SELECT RAND();      -- 随机数（0~1）
SELECT ROUND(2.345, 2);     -- 2.35

-- 通过数据库的函数，生成一个六位数的随机验证码
SELECT LPAD(ROUND(RAND()*1000000, 0), 6, '0');
```

### 3、日期函数

![img](http://images.hellocode.top/e76dd623f2674db3b01c593dfe865790.png)

```sql
SELECT CURDATE();       -- 2023-01-15
SELECT CURTIME();       -- 21:47:16
SELECT NOW();       -- 2023-01-15 21:48:15

SELECT YEAR(NOW());     -- 2023
SELECT MONTH(NOW());        -- 1
SELECT DAY(NOW());      -- 15

SELECT DATE_ADD(NOW(), INTERVAL 70 DAY);        -- 2023-03-26 21:51:07
SELECT DATEDIFF('2023-1-15', '2022-10-30');     -- 77

-- 查询所有员工的入职天数，并根据入职天数倒序排序
select name, datediff(curdate(), entrydate) as 'entrydays' from emp order by entrydays desc;
```

### 4、流程函数

![img](http://images.hellocode.top/2618b1593f8f43f29b04704623bc20ae.png)

## 二、约束

- 什么是约束 对表中的数据进行限定，保证数据的正确性、有效性、完整性

- 约束的分类

  | 约束                          | 作用         |
  | :---------------------------- | :----------- |
  | PRIMARY KEY                   | 主键约束     |
  | PRIMARY KEY AUTO_INCREMENT    | 主键自增     |
  | UNIQUE                        | 唯一约束     |
  | NOT NULL                      | 非空约束     |
  | FOREIGN KEY                   | 外键约束     |
  | FOREIGN KEY ON UPDATE CASCADE | 外键级联更新 |
  | FOREIGN KEY ON DELETE CASCADE | 外键级联删除 |

### 1、主键约束

- 特点 主键约束默认包含非空和唯一两个功能 一张表只能有一个主键 主键一般用于表中数据的唯一标识

- 建表时添加主键约束

  ```sql
  CREATE TABLE 表名(
      列名 数据类型 PRIMARY KEY,
      ...
      列名 数据类型 约束
  );
  ```

- 删除主键约束 `ALTER TABLE 表名 DROP PRIMARY KEY;`

- 建表以后单独添加主键 `ALTER TABLE 表名 MODIFY 列名 数据类型 PRIMARY KEY;`

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
INSERT INTO students VALUES(NULL, '张三', 23);        -- 添加失败，主键不能为空
INSERT INTO students VALUES(1, '张三', 23);
INSERT INTO students VALUES(1, '李四', 24);       -- 添加失败，主键唯一
INSERT INTO students VALUES(2, '李四', 24);

-- 删除主键
ALTER TABLE students DROP PRIMARY KEY;

-- 建表后单独添加主键约束
ALTER TABLE students MODIFY id INT PRIMARY KEY;
```

### 2、主键自增约束

建表时添加主键自增约束

```sql
CREATE TABLE 表名(
    列名 数据类型 PRIMARY KEY AUTO_INCREMENT,
    ...
    列名 数据类型 约束
);
```

> 添加自增约束之后，主键内容就可以写null，会自动进行加一操作

- 删除主键自增约束 `ALTER TABLE 表名 MODIFY 列名 数据类型;`

- 建表后单独添加主键自增约束 `ALTER TABLE 表名 MODIFY 列名 数据类型 AUTO_INCREMENT;`

MySQL中的自增约束，必须配合主键的约束一起来使用！

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
ALTER TABLE students MODIFY id INT;     -- 只删除自增约束，不会删除主键约束

-- 建表后单独添加自增约束
ALTER TABLE students MODIFY id INT AUTO_INCREMENT;
```

### 3、唯一约束

建表时添加唯一约束

```sql
CREATE TABLE 表名(
    列名 数据类型 UNIQUE,
    ...
    列名 数据类型 约束
);
```

- 删除唯一约束 `ALTER TABLE 表名 DROP INDEX 列名;`

- 建表后单独添加唯一约束 `ALTER TABLE 表名 MODIFY 列名 数据类型 UNIQUE;`

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

### 4、非空约束

建表时添加非空约束

```sql
CREATE TABLE 表名(
    列名 数据类型 NOT NULL,
    ...
    列名 数据类型 约束
);
```

- 删除非空约束 `ALTER TABLE 表名 MODIFY 列名 数据类型;`

- 建表后单独添加非空约束 `ALTER TABLE 表名 MODIFY 列名 数据类型 NOT NULL;`

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

### 5、检查约束

检查约束使用 `CHECK` 关键字，具体的语法格式如下：

```sql
CHECK <表达式>
```

- 其中，“表达式”指的就是 SQL 表达式，用于指定需要检查的限定条件。
- 若将 CHECK 约束子句置于表中某个列的定义之后，则这种约束也称为基于列的 CHECK 约束。
- 在更新表数据的时候，系统会检查更新后的数据行是否满足 CHECK 约束中的限定条件。MySQL 可以使用简单的表达式来实现 CHECK 约束，也允许使用复杂的表达式作为限定条件，例如在限定条件中加入子查询。

**在修改表时添加检查约束**

如果一个表创建完成，可以通过修改表的方式为表添加检查约束。

修改表时设置检查约束的语法格式如下：

```sql
ALTER TABLE tb_emp7 ADD CONSTRAINT <检查约束名> CHECK(<检查约束>)
```

**删除检查约束**

修改表时删除检查约束的语法格式如下：

```sql
ALTER TABLE <数据表名> DROP CONSTRAINT <检查约束名>;
```

### 6、默认约束

默认值（Default）的完整称呼是默认值约束（Default Constraint）。 MySQL 默认值约束用来指定某列的默认值。

例如女性员工较多，性别就可以默认为“女”。如果插入一条新的记录时没有为这个字段赋值，那么系统会自动为这个字段赋值为“女”。

**在创建表时设置默认值约束**

创建表时可以使用 `DEFAULT` 关键字设置默认值约束，具体的语法规则如下：

```sql
<字段名> <数据类型> DEFAULT <默认值>;
```

**在修改表时添加默认值约束**

有两种语法，分别是CHANGE和MODIFY子句。

```sql
ALTER TABLE <数据表名>
MODIFY COLUMN <字段名> <数据类型> DEFAULT <默认值>;
ALTER TABLE <数据表名>
CHANGE COLUMN <原字段名> <新字段名> <数据类型> DEFAULT <默认值>;
```

**删除默认值约束**

修改表时删除默认值约束的语法规则如下：

```sql
ALTER TABLE <数据表名>
CHANGE COLUMN <字段名> <字段名> <数据类型> DEFAULT NULL;
```

### 7、外键约束

- 为什么要有外键约束？ 当表与表之间的数据有相关联性的时候，如果没有相关的数据约束，则无法保证数据的准确性！ 比如用户和订单，表与表之间也有关联

- 外键约束的作用 让表与表之间产生关联关系，从而保证数据的准确性！


建表时添加外键约束

```sql
CREATE TABLE 表名{
    列名 数据类型 约束,
    ...
    CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主表主键列名)
};
```

- 删除外键约束 `ALTER TABLE 表名 DROP FOREIGN KEY 外键名;`


建表后单独添加外键约束

```sql
ALTER TABLE 表名 ADD
CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名);
```

> 外键名一般取两个表的首字母_fk编号 例如：ou_fk1

```sql
-- 建表时添加外键约束
-- 创建user表
CREATE TABLE USER(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- id
    NAME VARCHAR(20) NOT NULL       -- 姓名
);
-- 添加用户数据
INSERT INTO USER VALUES (NULL,'张三'),(NULL, '李四');

-- 创建orderlist订单表
CREATE TABLE orderlist(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- id
    number VARCHAR(20) NOT NULL,        -- 订单编号
    uid INT,                -- 外键列
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

### 8、外键级联操作(了解)

- 什么是级联更新 当对主表中的数据进行修改时，从表中有关联的数据也会随之修改
- 什么是级联删除 当主表中的数据删除时，从表中的数据也会随之删除

> 级联操作在真实开发中很少使用，因为它耦合性太强，牵一发动全身

添加级联更新

```sql
ALTER TABLE 表名 ADD
CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名)
ON UPDATE CASCADE;
```

添加级联删除

```sql
ALTER TABLE 表名 ADD
CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名)
ON DELETE CASCADE;
```

同时添加级联更新和级联删除

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

## 三、多表操作

- 多表概念 通俗的讲就是多张数据表，而表与表之间是可以有一定的关联关系，这种关联关系通过外键约束实现。
- 多表的分类 一对一 一对多 多对多

### 1、一对一

- 适用场景 例如人和身份证。一个人只有一个身份证，一个身份证只能对应一个人
- 建表原则 在任意一个表建立外键，去关联另外一个表的主键

```sql
-- 创建db5数据库
CREATE DATABASE db5;

-- 使用db5数据库
USE db5;

-- 创建person表
CREATE TABLE person(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    NAME VARCHAR(20)            -- 姓名
);

-- 添加数据
INSERT INTO person VALUES (NULL, '张三'), (NULL, '李四');

-- 创建card表
CREATE TABLE card(
    id INT PRIMARY KEY AUTO_INCREMENT,      -- 主键id
    number VARCHAR(20) UNIQUE NOT NULL,     -- 身份证号
    pid INT UNIQUE,                 -- 外键列
    CONSTRAINT cp_fk1 FOREIGN KEY (pid) REFERENCES person(id) 
);

-- 添加数据
INSERT INTO card VALUES (NULL, '12345', 1), (NULL, '56789', 2);
```

### 2、一对多

- 适用场景 用户和订单。一个用户可以有多个订单 商品分类和商品。一个分类下可以有多个商品
- 建表原则 在多的一方，建立外键约束，来关联一的一方主键

```sql
-- 创建user表
CREATE TABLE USER(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    NAME VARCHAR(20)            -- 姓名
);

-- 添加数据
INSERT INTO USER VALUES (NULL, '张三'), (NULL, '李四');

-- 创建orderlist表
CREATE TABLE orderlist(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    number VARCHAR(20),         -- 订单编号
    uid INT,                -- 外键链
    CONSTRAINT ou_fk1 FOREIGN KEY (uid) REFERENCES USER(id)
);

-- 添加数据
INSERT INTO orderlist VALUES (NULL, '001', 1), (NULL, '002', 1), (NULL, '003', 2), (NULL, '004', 2);
```

### 3、多对多

- 适用场景 学生和课程。一个学生可以选择多个课程，一个课程也可以被多个学生选择
- 建表原则 需要借助第三张中间表，中间表至少包含两个列。这两个列作为中间表的外键，分别关联两张表的主键

```sql
-- 创建student表
CREATE TABLE student(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    NAME VARCHAR(20)            -- 姓名
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三'), (NULL, '李四');

-- 创建course表
CREATE TABLE course(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    NAME VARCHAR(10)            -- 课程名称
);

-- 添加数据
INSERT INTO course VALUES (NULL, '高数'), (NULL, '线代');

-- 创建中间表
CREATE TABLE stu_course(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键id
    sid INT,    -- 用于和student表中的id进行外键关联
    cid INT,    -- 用于和course表中的id进行外键关联
    CONSTRAINT sc_fk1 FOREIGN KEY (sid) REFERENCES student(id), -- 添加外键约束
    CONSTRAINT sc_fk2 FOREIGN KEY (cid) REFERENCES course(id)   -- 添加外键约束
);

-- 添加数据
INSERT INTO stu_course VALUES (NULL, 1, 1), (NULL, 1, 2), (NULL, 2, 1), (NULL, 2, 2);
```

### 4、多表查询

**多表查询分类**

- 内连接查询
- 外连接查询
- 联合查询
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
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 用户id
    NAME VARCHAR(20),           -- 用户姓名
    age INT                 -- 用户年龄
);

-- 添加数据
INSERT INTO USER VALUES (1, '张三', 23), (2, '李四', 24), (3, '王五', 25), (4, '赵六', 26);

-- 订单表
CREATE TABLE orderlist(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 订单id
    number VARCHAR(30),         -- 订单编号
    uid INT,                -- 外键字段
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
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 商品分类id
    NAME VARCHAR(10)            -- 商品分类名称
);
-- 添加数据
INSERT INTO category VALUES (1, '手机数码'), (2, '电脑办公'), (3, '烟酒茶糖'), (4, '鞋靴箱包');

-- 商品表
CREATE TABLE product(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 商品id
    NAME VARCHAR(30),           -- 商品名称
    cid INT,                -- 外键字段
    CONSTRAINT cp_fk1 FOREIGN KEY (cid) REFERENCES category(id)
);

-- 添加数据
INSERT INTO product VALUES 
(1, '华为手机', 1), (2, '小米手机', 1), (3, '联想电脑', 2), 
(4, '苹果电脑', 2), (5, '中华香烟', 3), (6, '玉溪香烟', 3), (7, '计生用品', NULL);

-- 中间表
CREATE TABLE us_pro(
    upid INT PRIMARY KEY AUTO_INCREMENT,    -- 中间表id
    uid INT,                -- 外键字段，需要和用户表的主键产生关联
    pid INT,                -- 外键字段，需要和商品表的主键产生关联
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

- 查询原理 内连接查询的是两张表有交集的部分数据（有主外键关联的数据）
- 查询语法 显示内连接：`SELECT 列名 FROM 表名1 [INNER] JOIN 表名2 ON 条件;` 隐式内连接：`SELECT 列名 FROM 表名1,表名2 WHERE 条件;`

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
    u.name,     -- 用户姓名
    u.age,      -- 用户年龄
    o.number    -- 订单编号
FROM
    USER u      -- 用户表
INNER JOIN
    orderlist o     -- 订单表
ON
    o.uid = u.id;
    
/*
    隐式内连接
*/

-- 查询用户姓名，年龄，订单编号
SELECT
    u.name,     -- 用户姓名
    u.age,      -- 用户年龄
    o.number    -- 订单编号
FROM
    USER u,
    orderlist o
WHERE
    o.uid=u.id;
```

**外连接查询**

左外连接

- 查询原理 查询左表的全部数据，和左右两张表有交集部分的数据
- 查询语法 `SELECT 列名 FROM 表名1 LEFT [OUTER] JOIN 表名2 ON 条件;`

右外连接

- 查询原理 查询右表的全部数据，和左右两张表有交集部分的数据
- 查询语法 `SELECT 列名 FROM 表名1 RIGHT [OUTER] JOIN 表名2 ON 条件;`

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

**联合查询**

对于union查询，就是把多次查询的结果合并起来，形成一个新的查询结果集

```sql
SELECT 字段列表 FROM 表A ...
UNION [ALL]
SELECT 字段列表 FROM 表B ...
```

- `UNION ALL`会直接将查询结果合并，不做处理

- `UNION`会将结果合并（去除重复结果）
- 对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致

**子查询**

查询语句中嵌套了查询语句，我们就将嵌套的查询称为子查询

*结果是单行单列的（标量子查询）*

- 查询作用

  可以将查询的结果作为另一条语句的查询条件，使用运算符判断（=、>、>=、<、<=de等）

- 查询语法

  `SELECT 列名 FROM 表名 WHERE 列名=(SELECT 列名 FROM 表名 [WHERE 条件]);`

*结果是多行单列的（列子查询）*

- 查询作用

  可以作为条件，使用运算符 IN 或 NOT IN 进行判断

- 查询语法

  `SELECT 列名 FROM 表名 WHERE 列名 [NOT] IN (SELECT 列名 FROM 表名 [WHERE 条件]);`

*结果是一行多列的（行子查询）*

- 查询作用

  可以作为条件，使用运算符 =、<>、 IN 或 NOT IN 进行判断

- 查询语法

  `SELECT 列名 FROM 表名 WHERE (列名,列名) = (SELECT 列名 FROM 表名 [WHERE 条件]);`

*结果是多行多列的（表子查询）*

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

在同一张表中数据有关联性，我们可以把这张表当成多个表来查询

```sql
-- 创建员工表
CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 员工编号
    NAME VARCHAR(20),           -- 员工姓名
    mgr INT,                -- 上级编号
    salary DOUBLE               -- 员工工资
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

### 5、练习

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

## 四、事务

事务：一条或多条SQL语句组成一个执行单元，其特点是这个单元要么同时成功要么同时失败

- 单元中的每条SQL语句都相互依赖，形成一个整体
- 如果某条SQL语句失败或者出现错误，那么这个单元就会撤回到事务最初的状态
- 如果单元中所有的SQL语句都执行成功，则事务就顺利执行

### 1、基本使用

- 开启事务

  `START TRANSACTION;`或者`BEGIN;`

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
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 账户id
    NAME VARCHAR(20),           -- 账户名称
    money DOUBLE                -- 账户余额
);
-- 添加数据
INSERT INTO account VALUES (NULL, '张三', 1000), (NULL, '李四', 1000);
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

### 2、提交方式

- 事务提交方式

  - 自动提交（MySQL默认）
  - 手动提交

- 查看事务提交方式

  `SELECT @@AUTOCOMMIT;`

  - 0代表手动提交

  - 1代表自动提交

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

> 即使开启了事务自动提交，也可以通过手动开启事务(`START TRANSACTION;`)进行控制（开启了事务就需要手动提交或者回滚）

### 3、四大特征(ACID)

- 原子性(Atomicty)

  事务是不可分隔的最小操作单元，原子性指事物包含的所有操作要么全部成功，要么全部失败回滚

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

### 4、隔离级别

事务的隔离级别

- 多个客户端操作时，各个客户端的事务之间应该是隔离的，相互独立的，不受影响的
- 而如果多个事务操作同一批数据时，就会产生不同的问题，我们需要设置不同的隔离级别来解决这些问题

隔离级别分类

| 隔离级别         | 名称     | 会引发的问题           |
| :--------------- | :------- | :--------------------- |
| read uncommitted | 读未提交 | 脏读、不可重复读、幻读 |
| read committed   | 读已提交 | 不可重复读、幻读       |
| repeatable read  | 可重复读 | 幻读                   |
| serializable     | 串行化   | 无                     |

并发事务引发的问题

| 问题       | 现象                                                         |
| :--------- | :----------------------------------------------------------- |
| 脏读       | 在一个事务处理过程中读取到了另一个未提交事务中的数据，导致两次查询结果不一致 |
| 不可重复读 | 一个事务先后读取同一条记录，读取到了另一个事务中修改并已提交的数据，导致两次查询不一致 |
| 幻读       | 查询某数据不存在，准备插入此纪录，但执行插入时发现此纪录已存在，无法插入。或者查询数据不存在执行删除操作，却发现删除成功，好像出现了“幻影” |

- 查询数据库隔离级别

  `SELECT @@TRANSACTION_ISOLATION;` 或者`SELECT @@TX_ISOLATION;`（低版本使用）

- 修改数据库隔离级别

  `SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL 级别字符串;`

  - SESSION：当前会话
  - GLOBAL：全局

```sql
-- 查询事务隔离级别
SELECT @@TRANSACTION_ISOLATION;

-- 修改事务隔离级别（修改后需要重新连接）
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

总结

| 序号 | 隔离级别         | 名称     | 脏读 | 不可重复读 | 幻读 | 数据库默认隔离级别 |
| :--- | :--------------- | :------- | :--- | :--------- | :--- | :----------------- |
| 1    | read uncommitted | 读未提交 | 是   | 是         | 是   |                    |
| 2    | read committed   | 读已提交 | 否   | 是         | 是   | Oracle             |
| 3    | repeatable read  | 可重复读 | 否   | 否         | 是   | MySQL              |
| 4    | serializable     | 串行化   | 否   | 否         | 否   |                    |

> 注意 ：隔离级别从小到大安全性越来越高，但是效率越来越低，所以不建议修改数据库默认的隔离级别

## 五、存储引擎

![](http://images.hellocode.top/mysql%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84.png)

### 1、体系结构

*客户端连接*

支持接口：支持的客户端连接，例如：C、Java、PHP等语言来连接MySQL数据库

*第一层：网络连接层*

- 最上层是一些客户端和链接服务，主要完成一些类似于连接处理、授权认证及相关的安全方案。服务器也会为安全接入的每个客户端验证它所具有的操作权限。

- 连接池：管理、缓冲用户的连接，线程处理等需要缓存的需求

*第二层：核心服务层*

- 管理服务和工具：系统的管理和控制工具，例如备份恢复、复制、集群等
- SQL接口：接受SQL命令，并且返回查询结果
- 查询解析器：验证和解析SQL命令，例如过滤条件、语法结构等
- 缓存：如果缓存当中有想查询的数据，则直接将缓存中的数据返回。没有的话重新查询

*第三层：存储引擎层*

- 存储引擎真正的负责了MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信。不同存储引擎具有不同的功能

- 插件式存储引擎：管理和操作数据的一种机制，包括（存储数据、如何更新、查询数据等）

*第四层：系统文件层（存储层）*

- 主要是将数据存储在文件系统之上，并完成与存储引擎的交互

- 文件系统：配置文件、数据文件、日志文件、错误文件、二进制文件等等的保存

### 2、存储引擎

- 在生活中，引擎就是整个机器运行的核心（发动机），不同的引擎具备不同的功能，应用于不同的场景之中
- MySQL数据库使用不同的机制存取表文件，包括存储方式、索引技巧、锁定水平等不同的功能。这些不同的技术以及配套的功能称为存储引擎
- Oracle、SQL server等数据库只有一种存储引擎。而MySQL针对不同的需求，配置不同的存储索引，就会让数据库采取不同处理数据的方式和扩展功能
- MySQL支持的存储引擎有很多，常用的有三种：InnoDB、MyISAM、MEMORY
- 存储引擎是基于表的，而不是基于库的，所以存储引擎也可称为表类型

**InnoDB**

- InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在MySQL 5.5之后，InnoDB是默认的MySQL存储引擎

特点

- DML操作遵循ACID模型，支持*事务*
- *行级锁*，提高并发访问性能
- *支持外键* FOREIGN KEY 约束，保证数据的完整性和正确性

文件

- `xxx.ibd`：xxx代表的是表名，innoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表结构（frm、sdi）、数据和索引
- 参数：innodb_file_per_table

逻辑存储结构

![在这里插入图片描述](http://images.hellocode.top/ee904c6679644c3c8a03bebba542f21b.png)

**MyISAM**

- MyISAM是MySQL早期的默认存储引擎
- 特点
  - 不支持事务，不支持外键
  - 支持表锁，不支持行锁
  - 访问速度快
- 文件
  - `xxx.sdi`：存储表结构信息
  - `xxx.MYD`：存储数据
  - `xxx.MYI`：存储索引

**Memory**

- Memory引擎的表数据是存储在内存中的，由于受到硬件问题或断电问题的影响，只能将这些表作为临时表或缓存使用
- 特点
  - 内存存储，访问速度快
  - hash索引（默认）
- 文件
  - `xxx.sdi`：存储表结构信息

**特性对比**

| 特点         | InnoDB              | MyISAM | Memory |
| ------------ | ------------------- | ------ | ------ |
| 存储限制     | 64TB                | 有     | 有     |
| 事务安全     | *支持*              | -      | -      |
| 锁机制       | *行锁*              | 表锁   | 表锁   |
| B+tree索引   | 支持                | 支持   | 支持   |
| Hash索引     | -                   | -      | 支持   |
| 全文索引     | 支持（5.6版本之后） | 支持   | -      |
| 空间使用     | 高                  | 低     | N/A    |
| 内存使用     | 高                  | 低     | 中等   |
| 批量插入速度 | 低                  | 高     | 高     |
| 支持外键     | *支持*              | -      | -      |

### 3、基本操作

- 查询数据库支持的存储引擎
  

`SHOW ENGINES;`

- 查询某个数据库中所有数据表的存储引擎
  

`SHOW TABLE STATUS FROM 数据库名称;`

- 查询某个数据库中某个数据表的存储索引
  

`SHOW TABLE STATUS FROM 数据库名称 WHERE NAME = '数据表名称';`

- 创建数据表，指定存储引擎

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型 [COMMENT 字段注释],
      ...
      列名 数据类型 [COMMENT 字段注释]
  )ENGINE = 引擎名称 [COMMENT 表注释];
  ```

- 修改数据表的存储引擎
  
  `ALTER TABLE 表名 ENGINE = 引擎名称;`

```sql
-- 查询数据库支持的存储引擎
SHOW ENGINES;

-- 查询db4数据库所有表的存储引擎
SHOW TABLE STATUS FROM db4;

-- 查看db4数据库中category表的存储引擎
SHOW TABLE STATUS FROM db4 WHERE NAME = 'category';

-- 创建数据表并指定存储引擎
CREATE TABLE engine_test(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(10)
)ENGINE = MYISAM;

SHOW TABLE STATUS FROM db4 WHERE NAME = 'engine_test';

-- 修改数据表的存储引擎
ALTER TABLE engine_test ENGINE = INNODB;
```

### 4、存储引擎的选择

在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据实际情况选择多种存储引擎进行组合

- MyISAM
  - 特点：不支持事务和外键操作。读取速度快，节约资源
  - 使用场景：以查询操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不是很高
- *InnoDB*
  - 特点：MySQL的默认存储引擎，支持事务和外键操作
  - 使用场景：对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，读写频繁的操作
- MEMORY
  - 特点：将所有数据保存在内存中，在需要快速定位记录和其他类似数据环境下，可以提供更快的访问
  - 使用场景：通常用于更新不太频繁的小表，用来快速得到访问的结果，用于临时表及缓存

**总结** ：针对不同的需求场景，来选择最适合的存储引擎即可。如果不确定，则使用默认的存储引擎



**扩展：一个SQL语句在MySQL中的整体流程**

用户使用mysql查询的一个整体流程如下：

![在这里插入图片描述](http://images.hellocode.top/20210126212911166.png)

简化版：

![在这里插入图片描述](http://images.hellocode.top/20210130005455679.png)

## 六、索引

- MySQL索引：是帮助MySQL高效获取数据的一种数据结构（有序）。所以，索引的本质就是数据结构
- 在表数据之外，数据系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式指向数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引

优势

- 提高数据检索的效率，降低数据库的IO成本
- 通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗

劣势

- 索引列也是要占用空间的
- 索引大大提高了查询效率，同时却也降低更新表的速度，如对表进行INSERT、UPDATE、DELETE时，效率更低

### 1、索引结构

MySQL的索引是在存储引擎层实现的，不同的存储引擎有不同的结构，主要包含以下几种：

| 索引结构             | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| *B+Tree索引*         | 最常见的索引类型，大部分引擎都支持B+树索引                   |
| Hash索引             | 底层数据结构是用哈希表实现的, 只有精确匹配索引列的查询才有效, 不支持范围查询 |
| R-tree(空间索引）    | 空间索引是MyISAM引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| Full-text(全文 索引) | 是一种通过建立倒排索引,快速匹配文档的方式。类似于 Lucene,Solr,ES |

上述是MySQL中所支持的所有的索引结构，接下来，我们再来看看不同的存储引擎对于索引结构的支持情况。

| 索引        | InnoDB          | MyISAM | Memory |
| ----------- | --------------- | ------ | ------ |
| B+tree索引  | 支持            | 支持   | 支持   |
| Hash 索引   | 不支持          | 不支持 | 支持   |
| R-tree 索引 | 不支持          | 支持   | 不支持 |
| Full-text   | 5.6版本之后支持 | 支持   | 不支持 |

> 注意： 我们平常所说的索引，如果没有特别指明，都是指B+树结构组织的索引
> 

**磁盘存储**

- 系统从磁盘读取数据到内存时是以磁盘块（block）为基本单位的
- 位于同一个磁盘块中的数据会被一次性读取出来，而不是需要什么取什么
- InnoDB 存储引擎中有页（page）的概念，页是其磁盘管理的最小单位。InnoDB存储引擎中默认每个页的大小为 16 KB
- InnoDB 引擎将若干个地址连接磁盘块，以此来达到页的大小 16 KB，在查询数据时如果一个页中的每条数据都能有助于定位数据记录的位置，这将会减少磁盘 I/O 次数，提高查询效率

**二叉树**

假如说MySQL的索引结构采用二叉树的数据结构，比较理想的结构如下：

![image](http://images.hellocode.top/3074738-20230117155736188-1164604305.png)

如果主键是顺序插入的，则会形成一个单向链表，结构如下：

![image](http://images.hellocode.top/3074738-20230117155817609-987529761.png)

所以，如果选择二叉树作为索引结构，会存在以下缺点：

- 顺序插入时，会形成一个链表，查询性能大大降低。
- 大数据量情况下，层级较深，检索速度慢。

此时大家可能会想到，我们可以选择红黑树，红黑树是一颗自平衡二叉树，那这样即使是顺序插入数据，最终形成的数据结构也是一颗平衡的二叉树,结构如下:

![image](http://images.hellocode.top/3074738-20230117155949172-1962601829.png)

但是，即使如此，由于红黑树也是一颗二叉树，所以也会存在一个缺点：

- 大数据量情况下，层级较深，检索速度慢。

所以，在MySQL的索引结构中，并没有选择二叉树或者红黑树，而选择的是B+Tree，那么什么是B+Tree呢？在详解B+Tree之前，先来介绍一个B-Tree

**B-Tree**

B-Tree，B树是一种*多路平衡查找树*，相对于二叉树，B树每个节点可以有多个分支，即多叉

以一颗最大度数（max-degree）为5(5阶)的b-tree为例，那这个B树每个节点最多存储4个key，5个指针：

![image](http://images.hellocode.top/3074738-20230117160227967-1363352775.png)

> 说明: 树的度数指的是一个节点的子节点个数

我们可以通过一个数据结构可视化的网站来简单演示一下。

[动画演示B-Tree](https://www.cs.usfca.edu/~galles/visualization/BTree.html)

![image](http://images.hellocode.top/3074738-20230117160449477-1845173373.png)

*特点：*

- 5阶的B树，每一个节点最多存储4个key，对应5个指针。
- 一旦节点存储的key数量到达5，就会裂变，中间元素向上分裂。
- 在B树中，非叶子节点和叶子节点都会存放数据

**B+Tree**

B+Tree是B-Tree的变种，我们以一颗最大度数（max-degree）为4（4阶）的b+tree为例，来看一下其结构示意图：

![image](http://images.hellocode.top/3074738-20230117160637859-759350956.png)
我们可以看到，两部分：

- 绿色框框起来的部分，是索引部分，仅仅起到索引数据的作用，不存储数据。
- 红色框框起来的部分，是数据存储部分，在其叶子节点中要存储具体的数据。

我们可以通过一个数据结构可视化的网站来简单演示一下。

[动画演示B+Tree](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)

![image](http://images.hellocode.top/3074738-20230117161057956-1764710826.png)

*最终我们看到，B+Tree 与 B-Tree相比，主要有以下三点区别：*

- 所有的数据都会出现在叶子节点
- 叶子节点形成一个单向链表。
- 非叶子节点仅仅起到索引数据作用，具体的数据都是在叶子节点存放的

上述我们所看到的结构是标准的B+Tree的数据结构，接下来，我们再来看看MySQL中优化之后的B+Tree

MySQL索引数据结构对经典的B+Tree进行了优化。在原B+Tree的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的B+Tree，提高区间访问的性能，利于排序

![image](http://images.hellocode.top/3074738-20230117161312134-813150726.png)

**Hash**

MySQL中除了支持B+Tree索引，还支持一种索引类型Hash索引

哈希索引就是采用一定的hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中

![image](http://images.hellocode.top/3074738-20230117161442722-1181075033.png)

如果两个(或多个)键值，映射到一个相同的槽位上，他们就产生了hash冲突（也称为hash碰撞），可以通过链表来解决

![image](http://images.hellocode.top/3074738-20230117161521042-1867114815.png)
*特点：*

- Hash索引只能用于对等比较(=，in)，不支持范围查询（between，>，< ，...）
- 无法利用索引完成排序操作
- 查询效率高，通常(不存在hash冲突的情况)只需要一次检索就可以了，效率通常要高于B+tree索引

> 在MySQL中，支持hash索引的是Memory存储引擎。 而InnoDB中具有自适应hash功能，hash索引是InnoDB存储引擎根据B+Tree索引在指定条件下自动构建的。

**为什么InnoDB存储引擎选择使用B+tree索引结构?**

- 相对于二叉树，层级更少，搜索效率高
- 对于B-tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低
- 相对Hash索引，B+tree支持范围匹配及排序操作

### 2、索引分类

在MySQL数据库，将索引的具体类型主要分为以下几类：主键索引、唯一索引、常规索引、全文索引。

| 分类     | 含义                                                 | 特点                     | 关键字   |
| -------- | ---------------------------------------------------- | ------------------------ | -------- |
| 主键索引 | 针对于表中主键创建的索引                             | 默认自动创建, 只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列中的值重复                     | 可以有多个               | UNIQUE   |
| 常规索引 | 快速定位特定数据                                     | 可以有多个               |          |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 | 可以有多个               | FULLTEXT |

而在在InnoDB存储引擎中，根据索引的存储形式，又可以分为以下两种：

| 分类                      | 含义                                                       | 特点                |
| ------------------------- | ---------------------------------------------------------- | ------------------- |
| 聚集索引(Clustered Index) | 将数据存储与索引放到了一块，索引结构的叶子节点保存了行数据 | 必须有,而且只有一个 |
| 二级索引(Secondary Index) | 将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以存在多个        |

聚集索引选取规则:

- 如果存在主键，主键索引就是聚集索引
- 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引，则InnoDB会自动生成一个rowid作为隐藏的聚集索引。

聚集索引和二级索引的具体结构如下：

![image](http://images.hellocode.top/3074738-20230117164616411-481043974.png)

- 聚集索引的叶子节点下挂的是这一行的数据 。
- 二级索引的叶子节点下挂的是该字段值对应的主键值。

接下来，我们来分析一下，当我们执行如下的SQL语句时，具体的查找过程是什么样子的。

![image](http://images.hellocode.top/3074738-20230117164801249-620310463.png)

具体过程如下:

1. 由于是根据name字段进行查询，所以先根据name='Arm'到name字段的二级索引中进行匹配查找。但是在二级索引中只能查找到 Arm对应的主键值10。
2. 由于查询返回的数据是*，所以此时，还需要根据主键值10，到聚集索引中查找10对应的记录，最终找到10对应的行row。
3. 最终拿到这一行的数据，直接返回即可。

*回表查询：* 这种先到二级索引中查找数据，找到主键值，然后再到聚集索引中根据主键值，获取数据的方式，就称之为回表查询

**思考题**

*题一：*
以下两条SQL语句，那个执行效率高? 为什么?

A. `select * from user where id = 10 ;`
B. `select * from user where name = 'Arm' ;`

> 备注: id为主键，name字段创建的有索引；

解答：

- A语句的执行性能要高于B语句。

- 因为A语句直接走聚集索引，直接返回数据。 而B语句需要先查询name字段的二级索引，然后再查询聚集索引，也就是需要进行回表查询

*题二：*

InnoDB主键索引的B+tree高度为多高呢?

![image](http://images.hellocode.top/3074738-20230117165126470-127538315.png)

解答：

假设:一行数据大小为1k，一页中可以存储16行这样的数据。InnoDB的指针占用6个字节的空间，主键即使为bigint，占用字节数为8

- 高度为2：

  `n * 8 + (n + 1) * 6 = 16*1024`,算出n约为 1170（n代表key的个数）

  `1171* 16 = 18736`,也就是说，如果树的高度为2，则可以存储 18000 多条记录

- 高度为3：

  `1171 * 1171 * 16 = 21939856` ,也就是说，如果树的高度为3，则可以存储 2200w 左右的记录

### 3、创建和查询

创建索引

```sql
CREATE [UNIQUE | FULLTEXT] INDEX 索引名称
[USING 索引类型] 	-- 默认是BTREE（实际就是B+Tree）
ON 表名(列名,列名...);
```

- UNIQUE 和 FULLTEXT 可选，如果不写的话就是常规索引
- 一个索引可以关联一个字段（单列索引），也可以关联多个字段（联合索引/组合索引）
- 索引名一般建议为：`idx_表名_字段名`

查看索引

- `SHOW INDEX FROM 表名;`

```sql
-- 创建db9数据库
CREATE DATABASE db9;

-- 使用db9数据库
USE db9;

-- 创建student表
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(10),
	age INT,
	score INT
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23, 98), (NULL, '李四',24, 95),
(NULL, '王五',25, 96), (NULL, '赵六',26, 94), (NULL, '周七',27, 99);
```

```sql
-- 为student表中的name列创建一个普通索引
CREATE INDEX idx_name ON student(NAME);

-- 为student表中的age列创建一个唯一索引
CREATE UNIQUE INDEX idx_age ON student(age);

-- 查询索引（主键列自带主键索引）
SHOW INDEX FROM student;

-- 查询db4中的product表(外键列自带外键索引)
SHOW INDEX FROM product;
```

### 4、添加和删除

**添加索引**

- 常规索引：`ALTER TABLE 表名 ADD INDEX 索引名称(列名);`

- 主键索引：`ALTER TABLE 表名 ADD PRIMARY KEY(主键列名);`
- 外键索引：`ALTER TABLE 表名 ADD CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名);`
- 唯一索引：`ALTER TABLE 表名 ADD UNIQUE 索引名称(列名);`
- 全文索引：`ALTER TABLE 表名 ADD FULLTEXT 索引名称(列名);`

**删除索引**

- `DROP INDEX 索引名称 ON 表名;`

```sql
-- 为student表中score列添加唯一索引
ALTER TABLE student ADD UNIQUE idx_score(score);

-- 查询student表的索引
SHOW INDEX FROM student;

-- 删除索引
DROP INDEX idx_score ON student;
```

### 5、SQL性能分析

**SQL执行频率**

MySQL客户端连接成功后，通过`show [session | global] status`命令可以提供服务器状态信息。通过以下指令，可以查看当前数据库的 INSERT、UPDATE、DELETE、SELECT的访问频次：

- `SHOW GLOBAL STATUS LIKE 'Com_______';`

- 模糊匹配，一个下划线代表一个字符(7个下划线查询结果如下)

![image-20230206152721108](http://images.hellocode.top/image-20230206152721108.png)

**慢查询日志**

- 慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志

- MySQL的慢查询日志默认没有开启，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：

  查询慢查询日志是否开启：`show variables like 'slow_query_log';`

  ```bash
  # 开启MySQL慢日志查询开关
  slow_query_log=1
  # 设置慢日志的时间为2s，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
  long_query_time=2
  ```

  配置完成之后，通过指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息`/var/lib/mysql/主机名-slow.log`

**profile详情**

- `show profiles` 能够在做SQL优化时帮助我们了解时间都耗费到哪里去了。

```sql
/*通过have_profiling参数，能够看到当前MySQL是否支持profile操作*/
select @@have_profiling;
/*通过profiling参数，能够看到当前MySQL是否开启操作*/
select @@profiling;
/*可以通过set语句在
session/global级别开启profiling：*/
set profiling = 1;
```

开关已经打开了，接下来，我们所执行的SQL语句，都会被MySQL记录，并记录执行时间消耗到哪儿去了。 我们直接执行如下的SQL语句：

```sql
select * from tb_user;
select * from tb_user where id = 1;
select * from tb_user where name = '白起';
```

执行一系列的业务SQL的操作，然后通过如下指令查看指令的执行耗时：

```sql
-- 查看每一条SQL的耗时基本情况
show profiles;
-- 查看指定query_id的SQL语句各个阶段的耗时情况
show profile for query query_id;
-- 查看指定query_id的SQL语句CPU的使用情况
show profile cpu for query query_id;
```

**explain**

explain或者desc命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。
语法:

```sql
-- 直接在select语句之前加上关键字 explain / desc
EXPLAIN SELECT 字段列表 FROM 表名 WHERE 条件 ;
```

Explain 执行计划中各个字段的含义:

| 字段         | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| id           | select查询的序列号，表示查询中执行select子句或者是操作表的顺序 (id相同，执行顺序从上到下；id不同，值越大，越先执行)。 |
| select_type  | 表示 SELECT 的类型，常见的取值有 SIMPLE（简单表，即不使用表连接 或者子查询）、PRIMARY（主查询，即外层的查询）、 UNION（UNION 中的第二个或者后面的查询语句）、 SUBQUERY（SELECT/WHERE之后包含了子查询）等 |
| type         | 表示连接类型，性能由好到差的连接类型为NULL、system、const、 eq_ref、ref、range、 index、all 。 |
| possible_key | 显示可能应用在这张表上的索引，一个或多个。                   |
| key          | 实际使用的索引，如果为NULL，则没有使用索引。                 |
| key_len      | 表示索引中使用的字节数， 该值为索引字段最大可能长度，并非实际使用长 度，在不损失精确性的前提下， 长度越短越好 。 |
| rows         | MySQL认为必须要执行查询的行数，在innodb引擎的表中，是一个估计值， 可能并不总是准确的。 |
| filtered     | 表示返回结果的行数占需读取行数的百分比， filtered 的值越大越好。 |

### 6、索引使用

#### 6.1. 验证索引效率

在讲解索引的使用原则之前，先通过一个简单的案例，来验证一下索引，看看是否能够通过索引来提升数据查询性能。在演示的时候，我们还是使用之前准备的一张表 tb_sku , 在这张表中准备了1000w的记录

![image](http://images.hellocode.top/3074738-20230130094124531-709584317.png)

这张表中id为主键，有主键索引，而其他字段是没有建立索引的。 我们先来查询其中的一条记录，看看里面的字段情况，执行如下SQL：`select * from tb_sku where id = 1\G;`

![image](http://images.hellocode.top/3074738-20230130094305046-76857382.png)

可以看到即使有1000w的数据,根据id进行数据查询,性能依然很快，因为主键id是有索引的。 那么接下来，我们再来根据 sn 字段进行查询，执行如下SQL：`SELECT * FROM tb_sku WHERE sn = '100000003145001';`

![image](http://images.hellocode.top/3074738-20230130094400840-1922128556.png)

我们可以看到根据sn字段进行查询，查询返回了一条数据，结果耗时 20.78sec，就是因为sn没有索引，而造成查询效率很低。
那么我们可以针对于sn字段，建立一个索引，建立了索引之后，我们再次根据sn进行查询，再来看一下查询耗时情况。创建索引：`create index idx_sku_sn on tb_sku(sn);`

![image](http://images.hellocode.top/3074738-20230130094504942-1703910414.png)

然后再次执行相同的SQL语句，再次查看SQL的耗时。`SELECT * FROM tb_sku WHERE sn = '100000003145001';`

![image](http://images.hellocode.top/3074738-20230130094548738-1941078169.png)

我们明显会看到，sn字段建立了索引之后，查询性能大大提升。建立索引前后，查询耗时都不是一个数量级的。

#### 6.2. 最左前缀法则

如果索引了多列（联合索引），要遵守最左前缀法则。最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。如果跳跃某一列，索引将会部分失效(后面的字段索引失效)。

以 tb_user 表为例，我们先来查看一下之前 tb_user 表所创建的索引。

![image](http://images.hellocode.top/3074738-20230130094702728-1038839387.png)

在 tb_user 表中，有一个联合索引，这个联合索引涉及到三个字段，顺序分别为：profession，age，status。
对于最左前缀法则指的是，查询时，最左变的列，也就是profession必须存在，否则索引全部失效。而且中间不能跳过某一列，否则该列后面的字段索引将失效。 接下来，我们来演示几组案例，看一下具体的执行计划：

```sql
explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';
```

![image](http://images.hellocode.top/3074738-20230130094902569-590866884.png)

```sql
explain select * from tb_user where profession = '软件工程' and age = 31;
```

![image](http://images.hellocode.top/3074738-20230130095007649-674600282.png)

```sql
explain select * from tb_user where profession = '软件工程';
```

![image](http://images.hellocode.top/3074738-20230130095047654-1698244112.png)

以上的这三组测试中，我们发现只要联合索引最左边的字段 profession存在，索引就会生效，只不过索引的长度不同。 而且由以上三组测试，我们也可以推测出profession字段索引长度为47、age字段索引长度为2、status字段索引长度为5。

```sql
explain select * from tb_user where age = 31 and status = '0';
```

![image](http://images.hellocode.top/3074738-20230130095224245-1714190879.png)

```sql
explain select * from tb_user where status = '0';
```

![image](http://images.hellocode.top/3074738-20230130095258419-416939138.png)

而通过上面的这两组测试，我们也可以看到索引并未生效，原因是因为不满足最左前缀法则，联合索引最左边的列profession不存在

```sql
explain select * from tb_user where profession = '软件工程' and status = '0';
```

![image-20230206170101577](http://images.hellocode.top/image-20230206170101577.png)

上述的SQL查询时，存在profession字段，最左边的列是存在的，索引满足最左前缀法则的基本条件。但是查询时，跳过了age这个列，所以后面的列索引是不会使用的，也就是索引部分生效，所以索引的长度就是47。

*思考题：*

当执行SQL语句: `explain select * from tb_user where age = 31 and status = '0' and profession = '软件工程'；`时，是否满足最左前缀法则，走不走上述的联合索引，索引长度？

![image](http://images.hellocode.top/3074738-20230130095548491-580900743.png)

可以看到，是完全满足最左前缀法则的，索引长度54，联合索引是生效的。

> 注意 ： 最左前缀法则中指的最左边的列，是指在查询时，联合索引的最左边的字段(即是第一个字段)必须存在，与我们编写SQL时，条件编写的先后顺序无关。

#### 6.3. 范围查询

联合索引中，出现范围查询(>,<)，范围查询右侧的列索引失效。

```sql
explain select * from tb_user where profession = '软件工程' and age > 30 and status = '0';
```

![image](http://images.hellocode.top/3074738-20230130095757863-1472854546.png)

当范围查询使用> 或 < 时，走联合索引了，但是索引的长度为49，就说明范围查询右边的status字段是没有走索引的。

```sql
explain select * from tb_user where profession = '软件工程' and age >= 30 and status = '0';
```

![image](http://images.hellocode.top/3074738-20230130095859859-1656148327.png)

当范围查询使用>= 或 <= 时，走联合索引了，但是索引的长度为54，就说明所有的字段都是走索引的。

所以，在业务允许的情况下，尽可能的使用类似于 >= 或 <= 这类的范围查询，而避免使用 > 或 < 。

#### 6.4. 索引失效情况

**索引列运算**

不要在索引列上进行运算操作， 索引将失效。

在tb_user表中，除了前面介绍的联合索引之外，还有一个索引，是phone字段的单列索引。

![image](http://images.hellocode.top/3074738-20230130100031580-823950412.png)

A. 当根据phone字段进行等值匹配查询时, 索引生效。

```sql
explain select * from tb_user where phone = '17799990015';
```

![image](http://images.hellocode.top/3074738-20230130100138172-227628425.png)

B. 当根据phone字段进行函数运算操作之后，索引失效。

```sql
explain select * from tb_user where substring(phone,10,2) = '15';
```

![image](http://images.hellocode.top/3074738-20230130100223455-130764810.png)

**字符串不加引号**

字符串类型字段使用时，不加引号，索引将失效。

接下来，我们通过两组示例，来看看对于字符串类型的字段，加单引号与不加单引号的区别：

```sql
explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';
explain select * from tb_user where profession = '软件工程' and age = 31 and status = 0;
```

![image](http://images.hellocode.top/3074738-20230130100343797-38364307.png)

```sql
explain select * from tb_user where phone = '17799990015';
explain select * from tb_user where phone = 17799990015;
```

![image](http://images.hellocode.top/3074738-20230130100425280-1369031728.png)

经过上面两组示例，我们会明显的发现，如果字符串不加单引号，对于查询结果，没什么影响，但是数据库存在隐式类型转换，索引将失效。

**模糊查询**

如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。

接下来，我们来看一下这三条SQL语句的执行效果，查看一下其执行计划：

由于下面查询语句中，都是根据profession字段查询，符合最左前缀法则，联合索引是可以生效的，我们主要看一下，模糊查询时，%加在关键字之前，和加在关键字之后的影响。

```sql
explain select * from tb_user where profession like '软件%';
explain select * from tb_user where profession like '%工程';
explain select * from tb_user where profession like '%工%';
```

![image](http://images.hellocode.top/3074738-20230130100656179-227148339.png)

经过上述的测试，我们发现，在like模糊查询中，在关键字后面加%，索引可以生效。而如果在关键字前面加了%，索引将会失效。

**or连接条件**

用or分割开的条件， 如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。

```sql
explain select * from tb_user where id = 10 or age = 23;
explain select * from tb_user where phone = '17799990017' or age = 23;
```

![image](http://images.hellocode.top/3074738-20230130100817373-769378694.png)

由于age没有索引，所以即使id、phone有索引，索引也会失效。所以需要针对于age也要建立索引。

然后，我们可以对age字段建立索引。

```sql
create index idx_user_age on tb_user(age);
```

![image](http://images.hellocode.top/3074738-20230130100914909-1612014701.png)

建立了索引之后，我们再次执行上述的SQL语句，看看前后执行计划的变化。

![image](http://images.hellocode.top/3074738-20230130100943807-1965965612.png)

最终，我们发现，当or连接的条件，左右两侧字段都有索引时，索引才会生效。

**数据分布影响**

如果MySQL评估使用索引比全表更慢，则不使用索引。

```sql
select * from tb_user where phone >= '17799990005';
select * from tb_user where phone >= '17799990015';
```

![image](http://images.hellocode.top/3074738-20230130101130206-126335872.png)

经过测试我们发现，相同的SQL语句，只是传入的字段值不同，最终的执行计划也完全不一样，这是为什么呢？

就是因为MySQL在查询时，会评估使用索引的效率与走全表扫描的效率，如果走全表扫描更快，则放弃索引，走全表扫描。 因为索引是用来索引少量数据的，如果通过索引查询返回大批量的数据，则还不如走全表扫描来的快，此时索引就会失效。

接下来，我们再来看看 is null 与 is not null 操作是否走索引。

执行如下两条语句 ：

```sql
explain select * from tb_user where profession is null;
explain select * from tb_user where profession is not null;
```

![image](http://images.hellocode.top/3074738-20230130101305249-196758491.png)

接下来，我们做一个操作将profession字段值全部更新为null。

![image](http://images.hellocode.top/3074738-20230130101350516-1462431768.png)

然后，再次执行上述的两条SQL，查看SQL语句的执行计划。

![image](http://images.hellocode.top/3074738-20230130101417976-1423677702.png)

最终我们看到，一模一样的SQL语句，先后执行了两次，结果查询计划是不一样的，为什么会出现这种现象，这是和数据库的数据分布有关系。查询时MySQL会评估，走索引快，还是全表扫描快，如果全表扫描更快，则放弃索引走全表扫描。 因此，is null 、is not null是否走索引，得具体情况具体分析，并不是固定的

#### 6.5. SQL提示

A. 执行SQL : `explain select * from tb_user where profession = '软件工程';`

![image](http://images.hellocode.top/3074738-20230130102220898-1951861704.png)

查询走了联合索引。

B. 执行SQL，创建profession的单列索引：`create index idx_user_pro on tb_user(profession);`

![image](http://images.hellocode.top/3074738-20230130102309768-182083348.png)

C. 创建单列索引后，再次执行A中的SQL语句，查看执行计划，看看到底走哪个索引。

![image](http://images.hellocode.top/3074738-20230130102345556-60294664.png)

测试结果，我们可以看到，possible_keys中 idx_user_pro_age_sta,idx_user_pro 这两个索引都可能用到，最终MySQL选择了idx_user_pro_age_sta索引。这是MySQL自动选择的结果。

那么，我们能不能在查询的时候，自己来指定使用哪个索引呢？ 答案是肯定的，此时就可以借助于MySQL的SQL提示来完成。 接下来，介绍一下SQL提示。

SQL提示，是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。

1). use index ： 建议MySQL使用哪一个索引完成此次查询（仅仅是建议，mysql内部还会再次进行评估）。

```sql
explain select * from tb_user use index(idx_user_pro) where profession = '软件工程';
```

2). ignore index ： 忽略指定的索引。

```sql
explain select * from tb_user ignore index(idx_user_pro) where profession = '软件工程';
```

3). force index ： 强制使用索引。

```sql
explain select * from tb_user force index(idx_user_pro) where profession = '软件工程';
```

示例演示：

A. use index

```sql
explain select * from tb_user use index(idx_user_pro) where profession = '软件工程';
```

![image](http://images.hellocode.top/3074738-20230130102640333-397214448.png)

B. ignore index

```sql
explain select * from tb_user ignore index(idx_user_pro) where profession = '软件工程';
```

![image](http://images.hellocode.top/3074738-20230130102715688-1852920760.png)

C. force index

```sql
explain select * from tb_user force index(idx_user_pro_age_sta) where profession = '软件工程';
```

![image](http://images.hellocode.top/3074738-20230130102801954-683024326.png)

#### 6.6. 覆盖索引

尽量使用覆盖索引，减少select *。 那么什么是覆盖索引呢？ 覆盖索引是指 查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到 。

接下来，我们来看一组SQL的执行计划，看看执行计划的差别，然后再来具体做一个解析。

```sql
explain select id, profession from tb_user where profession = '软件工程' and age = 31 and status = '0' ;
explain select id,profession,age, status from tb_user where profession = '软件工程' and age = 31 and status = '0' ;
explain select id,profession,age, status, name from tb_user where profession = '软件工程' and age = 31 and status = '0' ;
explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';
```

上述这几条SQL的执行结果为:

![image](http://images.hellocode.top/3074738-20230130104431907-1881542110.png)

从上述的执行计划我们可以看到，这四条SQL语句的执行计划前面所有的指标都是一样的，看不出来差异。但是此时，我们主要关注的是后面的Extra，前面两天SQL的结果为 Using where; Using Index ; 而后面两条SQL的结果为: Using index condition 。

| Extra                    | 含义                                                         |
| ------------------------ | ------------------------------------------------------------ |
| Using where; Using Index | 查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询数据 |
| Using index condition    | 查找使用了索引，但是需要回表查询数据                         |

因为，在tb_user表中有一个联合索引 idx_user_pro_age_sta，该索引关联了三个字段profession、age、status，而这个索引也是一个二级索引，所以叶子节点下面挂的是这一行的主键id。 所以当我们查询返回的数据在 id、profession、age、status 之中，则直接走二级索引直接返回数据了。 如果超出这个范围，就需要拿到主键id，再去扫描聚集索引，再获取额外的数据了，这个过程就是回表。 而我们如果一直使用select * 查询返回所有字段值，很容易就会造成回表查询（除非是根据主键查询，此时只会扫描聚集索引）。
为了大家更清楚的理解，什么是覆盖索引，什么是回表查询，我们一起再来看下面的这组SQL的执行过程。

![image](http://images.hellocode.top/3074738-20230130104726533-2091374110.png)

id是主键，是一个聚集索引。 name字段建立了普通索引，是一个二级索引（辅助索引）。

![image](http://images.hellocode.top/3074738-20230130104813792-1835796535.png)

根据id查询，直接走聚集索引查询，一次索引扫描，直接返回数据，性能高。

C. 执行SQL：`selet id,name from tb_user where name = 'Arm';`

![image](http://images.hellocode.top/3074738-20230130104901628-2024949168.png)

虽然是根据name字段查询，查询二级索引，但是由于查询返回在字段为 id，name，在name的二级索引中，这两个值都是可以直接获取到的，因为覆盖索引，所以不需要回表查询，性能高。

D. 执行SQL：`selet id,name,gender from tb_user where name = 'Arm';`

![image](http://images.hellocode.top/3074738-20230130105016066-1522738758.png)

由于在name的二级索引中，不包含gender，所以，需要两次索引扫描，也就是需要回表查询，性能相对较差一点。



**思考题：**

一张表, 有四个字段(id, username, password, status), 由于数据量大, 需要对以下SQL语句进行优化, 该如何进行才是最优方案:`select id,username,password from tb_user where username = 'guoguo';`

答案: 针对于 username, password建立联合索引, sql为: `create index idx_user_name_pass on tb_user(username,password);` 这样可以避免上述的SQL语句，在查询的过程中，出现回表查询。

#### 6.7. 前缀索引

当字段类型为字符串（varchar，text，longtext等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO， 影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

1). 语法

```sql
create index idx_xxxx on table_name(column(n)) ;
```

示例:

为tb_user表的email字段，建立长度为5的前缀索引。

```sql
create index idx_email_5 on tb_user(email(5));
```

![image](http://images.hellocode.top/3074738-20230130111311140-1530431454.png)

2). 前缀长度

可以根据索引的选择性来决定，而选择性是指不重复的索引值（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高， 唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。

```sql
select count(distinct email) / count(*) from tb_user ;
select count(distinct substring(email,1,5)) / count(*) from tb_user ;
```

3). 前缀索引的查询流程

![image](http://images.hellocode.top/3074738-20230130111544762-623350428.png)

#### 6.8. 单列索引与联合索引

单列索引：即一个索引只包含单个列。

联合索引：即一个索引包含了多个列。

我们先来看看 tb_user 表中目前的索引情况:

![image](http://images.hellocode.top/3074738-20230130111635100-1490461820.png)

在查询出来的索引中，既有单列索引，又有联合索引。

接下来，我们来执行一条SQL语句，看看其执行计划：

![image](http://images.hellocode.top/3074738-20230130111709650-1427319331.png)

通过上述执行计划我们可以看出来，在and连接的两个字段 phone、name上都是有单列索引的，但是最终mysql只会选择一个索引，也就是说，只能走一个字段的索引，此时是会回表查询的。

紧接着，我们再来创建一个phone和name字段的联合索引来查询一下执行计划。

```sql
create unique index idx_user_phone_name on tb_user(phone,name);
```

![image](http://images.hellocode.top/3074738-20230130111816521-1392925635.png)

此时，查询时，就走了联合索引，而在联合索引中包含 phone、name的信息，在叶子节点下挂的是对应的主键id，所以查询是无需回表查询的。

*在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。*

如果查询使用的是联合索引，具体的结构示意图如下：

![image](http://images.hellocode.top/3074738-20230130111917191-1469487942.png)

### 7、设计原则

1. 对查询频次较高，且数据量比较大的表建立索引
2. 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高
4. 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率
7. 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询

## 七、SQL优化

### 1、插入数据

#### 1.1. insert

如果我们需要一次性往数据库表中插入多条记录，可以从以下三个方面进行优化

```sql
insert into tb_test values(1,'tom');
insert into tb_test values(2,'cat');
insert into tb_test values(3,'jerry');
```

1. 优化方案一：批量插入数据

```sql
insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
```

2. 优化方案二：手动控制事务

```sql
start transaction;
insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
insert into tb_test values(4,'Tom'),(5,'Cat'),(6,'Jerry');
insert into tb_test values(7,'Tom'),(8,'Cat'),(9,'Jerry');
commit;
```

3. 优化方案三：主键顺序插入，性能要高于乱序插入

```sql
主键乱序插入 : 8 1 9 21 88 2 4 15 89 5 7 3
主键顺序插入 : 1 2 3 4 5 7 8 9 15 21 88 89
```

#### 1.2. 大批量插入数据

如果一次性需要插入大批量数据(比如: 几百万的记录)，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令进行插入。操作如下：

![image](http://images.hellocode.top/3074738-20230130153107941-196066956.png)

可以执行如下指令，将数据脚本文件中的数据加载到表结构中：

```sql
-- 客户端连接服务端时，加上参数 -–local-infile
mysql –-local-infile -u root -p
-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;
-- 执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table tb_user fields terminated by ',' lines terminated by '\n' ;
```

> 在load时，主键顺序插入性能高于乱序插入

### 2、主键优化

#### 2.1. 数据组织方式

在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为*索引组织表*(index organized table IOT)

![image](http://images.hellocode.top/3074738-20230130153346730-1355966370.png)

行数据，都是存储在聚集索引的叶子节点上的。而我们之前也讲解过InnoDB的逻辑结构图：

![image](http://images.hellocode.top/3074738-20230130153424340-1145273795.png)

在InnoDB引擎中，数据行是记录在逻辑结构 page 页中的，而每一个页的大小是固定的，默认16K。那也就意味着， 一个页中所存储的行也是有限的，如果插入的数据行row在该页存储不小，将会存储到下一个页中，页与页之间会通过指针连接

#### 2.2. 页分裂

页可以为空，也可以填充一半，也可以填充100%。每个页包含了2-N行数据(如果一行数据过大，会行溢出)，根据主键排列

A. 主键顺序插入效果

①. 从磁盘中申请页， 主键顺序插入

![image](http://images.hellocode.top/3074738-20230130153626630-1222875507.png)

②. 第一个页没有满，继续往第一页插入

![image](http://images.hellocode.top/3074738-20230130153704666-2019246553.png)

③. 当第一个也写满之后，再写入第二个页，页与页之间会通过指针连接

![image](http://images.hellocode.top/3074738-20230130153734291-1422125529.png)

④. 当第二页写满了，再往第三页写入

![image](http://images.hellocode.top/3074738-20230130153806055-820402511.png)

B. 主键乱序插入效果

①. 加入1#,2#页都已经写满了，存放了如图所示的数据

![image](http://images.hellocode.top/3074738-20230130153842993-2089083012.png)

②. 此时再插入id为50的记录，我们来看看会发生什么现象

会再次开启一个页，写入新的页中吗？

![image](http://images.hellocode.top/3074738-20230130153914377-702257093.png)

不会。因为，索引结构的叶子节点是有顺序的。按照顺序，应该存储在47之后。

![image](http://images.hellocode.top/3074738-20230130153950337-247847286.png)

但是47所在的1#页，已经写满了，存储不了50对应的数据了。 那么此时会开辟一个新的页 3#。

![image](http://images.hellocode.top/3074738-20230130154016243-999632006.png)

但是并不会直接将50存入3#页，而是会将1#页后一半的数据，移动到3#页，然后在3#页，插入50。

![image](http://images.hellocode.top/3074738-20230130154047676-558907289.png)

移动数据，并插入id为50的数据之后，那么此时，这三个页之间的数据顺序是有问题的。 1#的下一个页，应该是3#， 3#的下一个页是2#。 所以，此时，需要重新设置链表指针。

![image](http://images.hellocode.top/3074738-20230130154125054-1644831849.png)

上述的这种现象，称之为 "页分裂"，是比较耗费性能的操作。

#### 2.3. 页合并

目前表中已有数据的索引结构(叶子节点)如下：

![image](http://images.hellocode.top/3074738-20230130154255155-1076048903.png)

当我们对已有数据进行删除时，具体的效果如下:

当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间变得允许被其他记录声明使用。

![image](http://images.hellocode.top/3074738-20230130154335658-1062274244.png)

当我们继续删除2#的数据记录

![image](http://images.hellocode.top/3074738-20230130154402238-1237954978.png)

当页中删除的记录达到 *MERGE_THRESHOLD*（默认为页的50%），InnoDB会开始寻找最靠近的页（前或后）看看是否可以将两个页合并以优化空间使用

![image](http://images.hellocode.top/3074738-20230130154442558-64715392.png)

删除数据，并将页合并之后，再次插入新的数据21，则直接插入3#页

![image](http://images.hellocode.top/3074738-20230130154511471-1668789993.png)

这个里面所发生的合并页的这个现象，就称之为 "页合并"

> MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或者创建索引时指定，默认50%

#### 2.4. 索引设计原则

- 满足业务需求的情况下，尽量降低主键的长度
- 插入数据时，尽量选择顺序插入，选择使用AUTO_INCREMENT自增主键
- 尽量不要使用UUID做主键或者是其他自然主键，如身份证号
- 业务操作时，避免对主键的修改

### 3、order by优化

MySQL的排序，有两种方式：

- Using filesort : 通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区sort buffer中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序
- Using index : 通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。

对于以上的两种排序方式，Using index的性能高，而Using filesort的性能低，我们在优化排序操作时，尽量要优化为 Using index

接下来，我们来做一个测试：

A. 数据准备

把之前测试时，为tb_user表所建立的部分索引直接删除掉

```sql
drop index idx_user_phone on tb_user;
drop index idx_user_phone_name on tb_user;
drop index idx_user_name on tb_user;
```

![image](http://images.hellocode.top/3074738-20230130155339386-1417301960.png)

B. 执行排序SQL

```sql
explain select id,age,phone from tb_user order by age ;
```

![image](http://images.hellocode.top/3074738-20230130155426364-217096094.png)

```sql
explain select id,age,phone from tb_user order by age, phone ;
```

![image](http://images.hellocode.top/3074738-20230130155500049-493072458.png)

由于 age, phone 都没有索引，所以此时再排序时，出现Using filesort， 排序性能较低。

C. 创建索引

```sql
-- 创建索引
create index idx_user_age_phone_aa on tb_user(age,phone);
```

D. 创建索引后，根据age, phone进行升序排序

```sql
explain select id,age,phone from tb_user order by age;
```

![image](http://images.hellocode.top/3074738-20230130155834864-1884063365.png)

```sql
explain select id,age,phone from tb_user order by age , phone;
```

![image](http://images.hellocode.top/3074738-20230130155921535-1509415947.png)

建立索引之后，再次进行排序查询，就由原来的Using filesort， 变为了 Using index，性能就是比较高的了。

E. 创建索引后，根据age, phone进行降序排序

```sql
explain select id,age,phone from tb_user order by age desc , phone desc ;
```

![image](http://images.hellocode.top/3074738-20230130160024306-472005556.png)

也出现 Using index， 但是此时Extra中出现了 Backward index scan，这个代表反向扫描索引，因为在MySQL中我们创建的索引，默认索引的叶子节点是从小到大排序的，而此时我们查询排序时，是从大到小，所以，在扫描时，就是反向扫描，就会出现Backward index scan。 

在MySQL8版本中，支持降序索引，我们也可以创建降序索引

F. 根据phone，age进行升序排序，phone在前，age在后

```sql
explain select id,age,phone from tb_user order by phone , age;
```

![image](http://images.hellocode.top/3074738-20230130160140712-419411900.png)

排序时,也需要满足最左前缀法则,否则也会出现 filesort。因为在创建索引的时候， age是第一个字段，phone是第二个字段，所以排序时，也就该按照这个顺序来，否则就会出现 Using filesort

F. 根据age, phone进行降序一个升序，一个降序

```sql
explain select id,age,phone from tb_user order by age asc , phone desc;
```

![image](http://images.hellocode.top/3074738-20230130160305146-583978772.png)

因为创建索引时，如果未指定顺序，默认都是按照升序排序的，而查询时，一个升序，一个降序，此时就会出现Using filesort

![image](http://images.hellocode.top/3074738-20230130160339843-2092985799.png)

为了解决上述的问题，我们可以创建一个索引，这个联合索引中 age 升序排序，phone 倒序排序

G. 创建联合索引(age 升序排序，phone 倒序排序)

```sql
create index idx_user_age_phone_ad on tb_user(age asc ,phone desc);
```

![image](http://images.hellocode.top/3074738-20230130160433333-1462965181.png)

H. 然后再次执行如下SQL

```sql
explain select id,age,phone from tb_user order by age asc , phone desc;
```

![image](http://images.hellocode.top/3074738-20230130160511985-1769073978.png)

升序/降序联合索引结构图示:

![image](http://images.hellocode.top/3074738-20230130160545148-1962358987.png)
![image](http://images.hellocode.top/3074738-20230130160616202-614599259.png)

由上述的测试,我们得出order by优化原则:

- 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则
- 尽量使用覆盖索引
- 多字段排序, 一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）
- 如果不可避免的出现filesort，大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size(默认256k)

### 4、group by优化

在没有索引的情况下，执行如下SQL，查询执行计划：

```sql
explain select profession , count(*) from tb_user group by profession;
```

![image](http://images.hellocode.top/3074738-20230131084912946-867239132.png)

然后，我们在针对于 profession ， age， status 创建一个联合索引

```sql
create index idx_user_pro_age_sta on tb_user(profession , age , status);
```

紧接着，再执行前面相同的SQL查看执行计划

![image](http://images.hellocode.top/3074738-20230131085014242-2076898587.png)

再执行如下的分组查询SQL，查看执行计划：

![image](http://images.hellocode.top/3074738-20230131085053352-251153808.png)

我们发现，如果仅仅根据age分组，就会出现 Using temporary ；而如果是 根据profession,age两个字段同时分组，则不会出现 Using temporary。原因是因为对于分组操作，在联合索引中，也是符合最左前缀法则的

所以，在分组操作中，我们需要通过以下两点进行优化，以提升性能：

- 在分组操作时，可以通过索引来提高效率
- 分组操作时，索引的使用也是满足最左前缀法则的

### 5、limit优化

在数据量比较大时，如果进行limit分页查询，在查询时，越往后，分页查询效率越低

我们一起来看看执行limit分页查询耗时对比：

![image](http://images.hellocode.top/3074738-20230131085316313-1890692756.png)

通过测试我们会看到，越往后，分页查询效率越低，这就是分页查询的问题所在

因为，当在进行分页查询时，如果执行 `limit 2000000,10` ，此时需要MySQL排序前2000010 记录，仅仅返回 2000000 - 2000010 的记录，其他记录丢弃，查询排序的代价非常大

优化思路: 一般分页查询时，通过创建 覆盖索引 能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化

```sql
explain select * from tb_sku t , (select id from tb_sku order by id limit 2000000,10) a where t.id = a.id;
```

### 6、count优化

```sql
select count(*) from tb_user;
```

在之前的测试中，我们发现，如果数据量很大，在执行count操作时，是非常耗时的

- MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高； 但是如果是带条件的count，MyISAM也慢

- InnoDB 引擎就麻烦了，它执行 count(*) 的时候，需要把数据一行一行地从引擎里面读出来，然后累积计数

  如果说要大幅度提升InnoDB表的count效率，主要的优化思路：自己计数(可以借助于redis这样的数据库进行,但是如果是带条件的count又比较麻烦了)

**count用法**

count() 是一个聚合函数，对于返回的结果集，一行行地判断，如果 count 函数的参数不是NULL，累计值就加 1，否则不加，最后返回累计值

用法：count（*）、count（主键）、count（字段）、count（数字）

| count用 法  | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| count(主键) | InnoDB 引擎会遍历整张表，把每一行的主键id 值都取出来，返回给服务层。 服务层拿到主键后，直接按行进行累加(主键不可能为null) |
| count(字段) | 没有not null 约束 : InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加。 有not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加。 |
| count(数字) | InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一行，放一个数字“1” 进去，直接按行进行累加。 |
| count(*)    | InnoDB引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加。 |

> *按照效率排序的话，count(字段) < count(主键 id) < count(1) ≈ count(\*)，所以尽量使用 count(\*)。*

### 7、update优化

我们主要需要注意一下update语句执行时的注意事项。

```sql
update course set name = 'javaEE' where id = 1 ;
```

当我们在执行删除的SQL语句时，会锁定id为1这一行的数据，然后事务提交之后，行锁释放

但是当我们在执行如下SQL时

```sql
update course set name = 'SpringBoot' where name = 'PHP' ;
```

*当我们开启多个事务，在执行上述的SQL时，我们发现行锁升级为了表锁。 导致该update语句的性能大大降低*

*InnoDB的行锁是针对索引加的锁，不是针对记录加的锁 ,并且该索引不能失效，否则会从行锁升级为表锁*

## 八、视图

- 视图：是一种虚拟存在的数据表，这个数据表并不在数据库中实际存在

作用

- 简单：将一些较为复杂的查询语句的结果，封装到一个虚拟表中，后期再有相同需求时，直接查询该虚拟表即可
- 安全：数据库可以授权，但不能授权到数据库特定行和特定的列上。通过视图用户只能查询和修改他们所能见到的数据
- 数据独立：视图可帮助用户屏蔽真实表结构变化带来的影响

### 1、数据准备

```sql
-- 创建db5数据库
CREATE DATABASE db5;

-- 使用db5数据库
USE db5;

-- 创建country表
CREATE TABLE country(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 国家id
    NAME VARCHAR(30)            -- 国家名称
);

-- 添加数据
INSERT INTO country VALUES (NULL, '中国'), (NULL, '美国'), (NULL, '俄罗斯');

-- 创建city表
CREATE TABLE city(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 城市id
    NAME VARCHAR(30),           -- 城市名称
    cid INT,                -- 外键列
    CONSTRAINT cc_fk1 FOREIGN KEY (cid) REFERENCES country(id)  -- 添加外键约束
);

-- 添加数据
INSERT INTO city VALUES (NULL, '北京', 1), (NULL, '上海', 1), (NULL, '纽约', 2), (NULL, '莫斯科', 3);
```

### 2、创建和查询

- 创建视图语法 `CREATE [OR REPLACE] VIEW 视图名称 [(列表列名)] AS 查询语句 [WITH CHECK OPTION];`
- 查询视图语法 `SELECT * FROM 视图名称;`

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

### 3、修改和删除

- 修改视图数据语法 `UPDATE 视图名称 SET 列名=值 WHERE 条件;`
- 修改视图结构语法 `ALTER VIEW 视图名称 (列名列表) AS 查询语句;`或者`CREATE OR REPLACE VIEW 视图名称 (列名列表) AS 查询语句`
- 删除视图语法 `DROP VIEW [IF EXISTS] 视图名称;`

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

**视图的更新**

要使视图可更新，视图中的行与基础表中的行之间必须存在一对一的关系。如果视图包含以下任何一项，则该视图不可更新：

1. 聚合函数或窗口函数（`SUM()`、`MIN()`、`MAX()`、`COUNT()`等）
2. DISTINCT
3. GROUP BY
4. HAVING
5. UNION 或者 UNION ALL

### 4、视图的检查选项

当使用`WITH CHECK OPTION`子句创建视图时，MySQL会通过视图检查正在更新的每个行，例如 插入、更新、删除，以使其符合视图的定义。MySQL允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，MySQL提供了两个选项：CASCADED 和 LOCAL ，默认值为 CASCADED

**CASCADED**

```sql
-- case1
-- 创建一个基于students表的视图
create or replace view v1 as select id,name from students where id<=20;
-- 由于没有检查选项，所以插入id>20的数据也会插入成功
insert into v1 values(21,'john');#插入成功

-- case2
-- 创建一个基于v1的视图，并添加cascaded检查选项
create or replace view v2 as select id,name from v1 where id>10 with cascaded check option;

-- 添加检查选项后，再插入数据，MySQL就会判断插入数据是否满足条件，
-- 由于此视图是基于v1的，所以现在可以插入的id值为 10<id<=20。
insert into v2 values（22，'lucy');	-- 插入失败

-- case3
-- 创建一个基于v2的视图
create or replace v3 as select id,name from v2 where id<=15;

-- 由于v3没有添加检查选项，但v3是基于v2的，所以现在可以插入的id值依然为 10<id<=20。
insert into v3 values(18,'Tom');	-- 插入成功

insert into v3 values(24,'kobe');	-- 插入失败
```

当我们操作当前视图时，cascaded检查选项是，如果当前视图有检查选项，则插入数据要满足包括当前视图条件以及满足当前视图所依赖的视图的条件。如果当前视图没有检查选项，则插入数据要满足当时视图所依赖视图有检查选项及其依赖的视图的条件。

**LOCAL**

```sql
-- case1
-- 创建一个基于students表的视图
create or replace view v1 as select id,name from students where id<=20;

insert into v1 values(21,'john');	-- 插入成功

-- case2
-- 创建一个基于v1的视图，并添加local检查选项
create or replace view v2 as select id,name from v1 where id>10 with local check option;

-- 添加检查选项后，再插入数据，MySQL就会判断插入数据是否满足条件，
-- 由于此视图是基于v1的，v1没有检查选项，所以现在可以插入的id值为 id>10。
insert into v2 values（22，'lucy');	-- 插入成功

-- case3
-- 创建一个基于v2的视图
create or replace v3 as select id,name from v2 where id<=15;

-- 由于v3没有添加检查选项，但v3是基于v2的，所以现在可以插入的id值依然为 id>10。
insert into v3 values(18,'Tom');	-- 插入成功
```

当我们在操作当前视图时，local检查选项是递归的查找当前视图所依赖的视图是否有检查选项，如果有，则检查；如果没有，就不做检查

### 5、案例

1. 为了保证数据库表的安全性，开发人员在操作`tb_user`表时，只能看到用户的基本字段，屏蔽手机号和邮箱两个字段
2. 查询每个学生所选修的课程（三张表联查），这个功能在很多的业务中都有使用到，为了简化操作，定义一个视图

```sql
create view tb_user_view as select id,name,profession,age,gender,status,createtime from tb_user;

select * from tb_user_view;



create view tb_stu_course_view as select s.name student_name , s.no student_no ,c.name course_name from student s, student_course sc , course c where s.id =sc.studentid and sc.courseid = c.id;

select * from tb_stu_course_view
```

## 九、存储过程和函数

- 存储过程和函数是事先经过编译并存储在数据库中的一段SQL语句的集合
- 存储过程和函数的好处
  - 提高代码的复用性
  - 减少数据在数据库和应用服务器之间的传输，提高效率
  - 减少代码层面的业务处理
- 存储过程和函数的区别
  - 存储函数必须有返回值
  - 存储过程可以没有返回值

### 1、创建和调用

- 创建存储过程

  ```sql
  -- 修改结束分隔符(一般在可视化编辑器中不需要这个操作， 在命令行需要)
  DELIMITER $
  
  -- 创建存储过程
  CREATE PROCEDURE 存储过程名称(参数列表)
  BEGIN
      SQL 语句列表;
  END$
  
  -- 修改结束分隔符
  DELIMITER;
  ```

- 调用存储过程 `CALL 存储过程名称(实际参数);`

```sql
-- 数据准备

-- 创建db6数据库
CREATE DATABASE db6;

-- 使用db6数据库
USE db6;

-- 创建学生表
CREATE TABLE student(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 学生id
    NAME VARCHAR(20),           -- 学生姓名
    age INT,                -- 学生年龄
    gender VARCHAR(5),          -- 学生性别
    score INT               -- 学生成绩
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23, '男', 95), (NULL, '李四', 24, '男', 98), 
(NULL, '王五', 25, '女', 100), (NULL, '赵六', 26, '女', 90);


-- 按照性别进行分组，查询每组学生的总成绩。按照总成绩的升序排序
SELECT gender,SUM(score) getsum FROM student GROUP BY gender ORDER BY getsum ASC;
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

### 2、查看和删除

- 查看指定数据库的存储过程及状态信息： `SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='数据库名称';`
- 查询某个存储过程的定义：`SHOW CREATE PROCEDURE 存储过程名称`
- 删除存储过程 `DROP PROCEDURE [IF EXISTS] 存储过程名称;`

```sql
-- 查看db1数据库中所有的存储过程
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='db1';

-- 删除存储过程
DROP PROCEDURE IF EXISTS stu_group;
```

### 3、变量

**系统变量**

- 系统变量：MySQL服务器提供，不是用户定义的，属于服务器层面。分为全局变量（GLOBAL）、会话变量(SESSION)

- 查看系统变量

  ```sql
  -- 查看所有系统变量
  SHOW [SESSION | GLOBAL] VARIABLES;
  -- 可以通过LIKE模糊匹配方式查找变量
  SHOW [SESSION | GLOBAL] VARIABLES LIKE '......';
  -- 查看指定变量的值
  SELECT @@[SESSION. | GLOBAL.] 系统变量名;
  ```

- 设置系统变量

  ```sql
  SET [SESSION | GLOBAL] 系统变量名=值;
  SET @@[SESSION | GLOBAL] 系统变量名=值;
  ```

> 如果没有指定SESSION/GLOBAL，默认是SESSION，会话变量
>
> MySQL服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在`/etc/my.cnf`中配置

**用户定义变量**

- 用户定义变量是用户根据需要自定义的变量，用户变量不用提前声明，在用的时候直接`@变量名`使用就可以。其作用域为当前连接
- 变量赋值方式一 `SET @变量名=变量值[,@变量名=变量值,...];`或者`SET @变量名:=变量值,[@变量名:=变量值,...];`
- 变量赋值方式二 `SELECT 列名 INTO @变量名 FROM 表名 [WHERE 条件];`或者`SELECT @变量名:=变量值,[@变量名:=变量值,...];`
- 使用变量：`SELECT @变量名[,@变量名...];`

> 用户定义的变量无需对其进行声明或初始化，只不过获取到的值为NULL

**局部变量**

- 局部变量是根据需要定义在局部生效的变量，访问之前，需要DECLARE声明。可以用作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的 BEGIN...END 块

- 定义变量： `DECLARE 变量名 变量类型 [DEFAULT 默认值];`（变量类型就是数据库字段类型）

- 赋值

  ```sql
  SET 变量名=值;
  SET 变量名:=值;
  SELECT 字段名 INTO 变量名 FROM 表名 ...;
  ```

- 使用变量：`SELECT 变量名;`

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

### 4、if语句

if语句标准语法

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
        380分以上  学习优秀
        320~380     学习不错
        320以下       学习一般
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

### 5、参数传递

存储过程的参数和返回值

```sql
CREATE PROCEDURE 存储过程名称([IN][OUT][INOUT] 参数名 数据类型)
BEGIN
    SQL语句列表;
END$
```

- IN：代表输入参数，需要由调用者传递实际数据（默认） 

- OUT：代表输出参数，该参数可以作为返回值 

- INOUT：代表既可以作为输入参数，也可以作为输出参数

```sql
/*
    输入总成绩变量，代表学生总成绩
    输出分数描述变量，代表学生总成绩的描述信息
    根据总成绩判断
        380分及以上 学习优秀
        320~380     学习不错
        320分及以下 学习一般
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

### 6、case语句

**语法一**

```sql
CASE case_value
	WHEN when_value1 THEN statement_list1
	[WHEN when_value2 THEN statement_list2]...
	[ELSE statement_list]
END CASE;
```

**语法二**

```sql
CASE
	WHEN search_condition1 THEN statement_list1
	[WHEN search_condition2 THEN statement_list2]...
	[ELSE statement_list]
END CASE;
```



### 7、循环

#### 7.1. while循环

while 循环语法

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

#### 7.2. repeat循环

repeat是有条件的循环控制语句，当满足条件的时候退出循环。具体语法为：

```sql
-- 先执行一次逻辑，然后判断逻辑是否满足，如果满足则退出。如果不满足，则继续下一次循环
REPEAT
	SQL逻辑...
	UNTIL 条件
END REPEAT;
```

#### 7.3. loop循环

LOOP 实现简单的循环，如果不在SQL逻辑中增加退出循环的条件，可以用其来实现简单的死循环。LOOP可以配合以下两个语句使用：

- LEAVE：配合循环使用，退出循环
- ITERATE：必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环

```sql
[begin_label:]LOOP
	SQL逻辑...
END LOOP [end_label];
```

```sql
-- 退出指定标记的循环体
LEAVE label;
-- 直接进入下一次循环
ITERATE label;
```

### 8、游标cursor

游标（CURSOR）是用来存储查询结果集的数据类型，在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括游标的声明、OPEN、FETCH 和 CLOSE，其语法分别如下：

- 声明游标：`DECLARE 游标名称 CURSOR FOR 查询语句;`
- 打开游标：`OPEN 游标名称;`
- 获取游标记录：`FETCH 游标名称 INTO 变量[,变量];`
- 关闭游标：`CLOSE 游标名称;`

```sql
delimiter $$
create procedure proc20_cursor(in in_dname varchar(50))
begin
 -- 定义局部变量
 declare var_empno varchar(50);
 declare var_ename varchar(50);
 declare var_sal  decimal(7,2);
 
 -- 声明游标
 declare my_cursor cursor for
  select empno , ename, sal 
    from  dept a ,emp b
    where a.deptno = b.deptno and a.dname = in_dname;
    
    -- 打开游标
  open my_cursor;
  -- 通过游标获取每一行数据
  label:loop
        fetch my_cursor into var_empno, var_ename, var_sal;
        select var_empno, var_ename, var_sal;
    end loop label;
    
    -- 关闭游标
    close my_cursor;
end
 
 -- 调用存储过程
 call proc20_cursor('销售部');
```

- 游标和循环使用，特别是loop，一般可以不加条件也可以取完值

- 我们发现，这个可以运行成功，但是却出现了异常的警告，虽然不影响效果实现，作为精益求精的MySQL，怎么可以允许了，于是我们就创造了句柄

- MySql存储过程也提供了对异常处理的功能：通过定义HANDLER（handler）来完成异常声明的实现

> 注意：变量需要定义在游标上面

#### 8.1. 条件处理程序handler

条件处理程序（Handler）可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤。具体语法为：

```sql
DECLARE handler_action HANDLER
    FOR condition_value [, condition_value] ...
    statement;
 
handler_action
    CONTINUE：继续执行当前程序
    EXIT：终止执行当前程序
 
condition_value
    SQLSTATE sqlstate_value：状态码，如02000
    SQLWARNING：所有以01开头的SQLSTATE代码的简写
    NOT FOUND：所有以02开头的SQLSTATE代码的简写
    SQLEXCEPTION：所有没有被SQLWARNING 或 NOT FOUND 捕获的SQLSTATE 代码的简写
```

```sql
drop procedure if exists proc21_cursor_handler;
-- 需求：输入一个部门名，查询该部门员工的编号、名字、薪资 ，将查询的结果集添加游标
delimiter $$
create procedure proc20_cursor(in in_dname varchar(50))
begin
  -- 定义局部变量
    declare var_empno int;
    declare var_ename varchar(50);
    declare var_sal decimal(7,2);
    
    declare flag int default 1; -- ---------------------
    
    -- 声明游标
    declare my_cursor cursor for
        select empno,ename,sal
        from dept a, emp b
        where a.deptno = b.deptno and a.dname = in_dname;
    
    -- 定义句柄，当数据未发现时将标记位设置为0
    declare continue handler for NOT FOUND set flag = 0;   
    -- 打开游标
    open my_cursor;
    -- 通过游标获取值
    label:loop
        fetch my_cursor into var_empno, var_ename,var_sal;
        -- 判断标志位
        if flag = 1 then
            select var_empno, var_ename,var_sal;
        else
            leave label;
        end if;
    end loop label;
    
    -- 关闭游标
    close my_cursor;
end $$;
 
delimiter ;
call proc21_cursor_handler('销售部');
```

### 9、存储函数

- 存储函数和存储过程是非常相似的，区别在于存储函数必须有返回值
- 存储函数的参数只能是 IN 类型的

- 创建存储函数

```sql
CREATE FUNCTION 函数名称([参数列表])
RETURNS 返回值类型 [characteristic ...]
BEGIN
        SQL语句列表;
        RETURN 结果;
END $

-- characteristic说明：
-- DETERMINISTIC:相同的输入参数总是产生相同的结果
-- NO SQL：不包含SQL语句
-- READS SQL DATA：包含读取数据的语句，但不包含写入数据的语句
```

- 调用存储函数 `SELECT 函数名称(实际参数);`

- 删除函数 `DROP FUNCTION 函数名称;`

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

## 十、触发器

- 触发器是与表有关的数据库对象，可以在insert、update、delete 之前或之后触发并执行触发器中定义的SQL语句
- 这种特性可以协助应用系统在数据库端确保数据的完整性、日志记录、数据校验等操作
- 可以使用别名 `NEW` 或者 `OLD`来引用触发器中发生变化的内容记录
- 现在触发器还只支持行级触发，不支持语句级触发（比如一条插入语句，插入5行记录，就触发5次，就是行级，触发1次就是语句级）

触发器分类

| 触发器类型      | OLD                           | NEW                           |
| :-------------- | :---------------------------- | :---------------------------- |
| INSERT 型触发器 | 无（因为插入前无数据）        | NEW表示将要或者已经新增的数据 |
| UPDATE 型触发器 | OLD表示修改之前的数据         | NEW表示将要或已经修改后的数据 |
| DELETE 型触发器 | OLD表示将要或者已经删除的数据 | 无（因为删除后状态无数据）    |

### 1、触发器的操作

创建触发器

```sql
DELIMITER $

CREATE TRIGGER 触发器名称
BEFORE|AFTER INSERT|UPDATE|DELETE
ON 表名
FOR EACH ROW		-- 行级触发器
BEGIN
    触发器要执行的功能
END$

DELIMITER ;
```

数据准备

```sql
-- 创建db7数据库
CREATE DATABASE db7;

-- 使用db7数据库
USE db7;

-- 创建账户表account
CREATE TABLE account(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 账户id
    NAME VARCHAR(20),           -- 姓名
    money DOUBLE                -- 余额
);

-- 添加数据
INSERT INTO account VALUES (NULL, '张三', 1000), (NULL, '李四', 1000);

-- 创建日志表account_log
CREATE TABLE account_log(
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 日志id
    operation VARCHAR(20),          -- 操作类型 (insert update delete)
    operation_time DATETIME,        -- 操作时间
    operation_id INT,           -- 操作表的id
    operation_param VARCHAR(200)        -- 操作参数
);
```

INSERT 型触发器

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

UPDATE 型触发器

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

DELETE 型触发器

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

### 2、查看和删除

- 查看触发器 `SHOW TRIGGERS;`
- 删除触发器 `DROP TRIGGER 触发器名称;`

```sql
-- 查看触发器
SHOW TRIGGERS;

-- 删除account_delete触发器
DROP TRIGGER account_delete;
```

## 十一、锁

锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除传统的计算资源（CPU、RAM、I/O）的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂

- 锁机制：数据库为了保证数据的一致性，在共享的资源被并发访问时变得安全所设计的一种规则

- 锁机制类似多线程中的同步，作用就是可以保证数据的一致性和安全性

- 按操作分类

  - 共享锁：也叫读锁。针对同一份数据，多个事务读取操作可以同时加锁而不相互影响，但是不能修改数据
  - 排他锁：也叫写锁。当前的操作没有完成前，会阻断其他操作的读取和写入

- 按粒度分类

  - 全局锁：锁定数据库中的所有表
  - 表级锁：会锁定整张表。开销小，加锁快。锁定粒度大，发生锁冲突概率高，并发度低。不会出现死锁情况
  - 行级锁：会锁定当前行。开销大，加锁慢。锁定粒度小，发生锁冲突概率低，并发度高。会出现死锁情况

- 按使用方式分类

  - 悲观锁：每次查询数据时都认为别人会修改，很悲观，所以查询时加锁
  - 乐观锁：每次查询时都认为别人不会修改，很乐观，但是更新时会判断一下在此期间别人有没有去更新这个数据

- 不同存储引擎支持的锁

  | 存储引擎 | 表锁 | 行锁   |
  | -------- | ---- | ------ |
  | InnoDB   | 支持 | 支持   |
  | MyISAM   | 支持 | 不支持 |
  | MEMORY   | 支持 | 不支持 |

>  *注意：* 在下面所有的锁的操作中，只提到了修改操作，但是增删都是和修改一样的

### 1、全局锁

全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的DML的写语句，DDL语句，已经更新操作的事务提交语句都将被阻塞

- 其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性

![](http://images.hellocode.top/1b54e835e3944281bb97a4eabbb0c1cd.png)

- 在进行数据备份时，先备份了tb_stock库存表。
- 然后接下来，在业务系统中，执行了下单操作，扣减库存，生成订单（更新tb_stock表，插入tb_order表）。
- 然后再执行备份 tb_order表的逻辑。
- 业务中执行插入订单日志操作。
- 最后，又备份了tb_orderlog表。
- 此时备份出来的数据，是存在问题的。因为备份出来的数据，tb_stock表与tb_order表的数据不一致(有最新操作的订单信息,但是库存数没减)。

那如何来规避这种问题呢? 此时就可以借助于MySQL的全局锁来解决

![在这里插入图片描述](http://images.hellocode.top/02e28cd5c6c5414e9c4ef6fa0f2a5e67.png)

对数据库进行进行逻辑备份之前，先对整个数据库加上全局锁，一旦加了全局锁之后，其他的DDL、DML全部都处于阻塞状态，但是可以执行DQL语句，也就是处于只读状态，而数据备份就是查询操作。那么数据在进行逻辑备份的过程中，数据库中的数据就是不会发生变化的，这样就保证了数据的一致性和完整性

**语法**

- 加全局锁：`flush tables with read lock;`
- 释放锁：`unlock tables;`

**特点**

数据库中加全局锁，是一个比较重的操作，存在以下问题：

1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆
2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog），会导致主从延迟

在 InnoDB 引擎中，我们可以在备份时加上参数 `--single-transaction` 参数来完成不加锁的一致性数据备份

```bash
mysqldump --single-transaction -uroot -p123456 hellocode>hellocode.sql
```

### 2、表级锁

表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在MyISAM、InnoDB、BDB等存储引擎中

对于表级锁，主要分为以下三类：

**1. 表锁**

1. 表共享读锁（read lock）：不会阻塞读，但是会阻塞其他客户端的写操作（加锁客户端也不可写，只能读）
2. 表独占写锁（write lock）：加锁客户端既能读，也能写（其他客户端既不能读，也不能写，会阻塞）

*语法*

- 加锁：`lock tables 表名... read/write`
- 释放锁：`unlock tables` 或者 客户端断开连接

> 读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的写

**2. 元数据锁（meta data lock，MDL）**

MDL加锁过程是系统自动控制，无需显示使用，在访问一张表的时候会自动加上。MDL锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。为了避免DML 与 DDL冲突，保证读写的正确性

在MySQL 5.5中引入了MDL，当对一张表进行增删改查的时候，加MDL读锁（共享）；当对表结构进行变更操作的时候，加MDL写锁（排他）

![在这里插入图片描述](http://images.hellocode.top/8037ac7de9a143cb8fa4ccff13fd889f.png)

- 开启事务A，查询表1（默认增加MDL读锁），正常执行；

- 开启事务B，更新表1某条数据（默认增加MDL写锁），正常执行；

- 但是此时事务A和事务B都不能进行修改表结构

查看元数据锁

```sql
select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
```

**3. 意向锁**

为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

- 假如没有意向锁，客户端一对表加了行锁后，客户端二如何给表加表锁呢，来通过示意图简单分析一下：
- 首先客户端一，开启一个事务，然后执行DML操作，在执行DML语句时，会对涉及到的行加行锁。
- 当客户端二，想对这张表加表锁时，会检查当前表是否有对应的行锁，如果没有，则添加表锁，此时就会从第一行数据，检查到最后一行数据，效率较低。

![在这里插入图片描述](http://images.hellocode.top/2dadfe42381549e89bacbaef5d78fd12.png)

- 有了意向锁之后 :
- 客户端一，在执行DML操作时，会对涉及的行加行锁，同时也会对该表加上意向锁。
- 而其他客户端，在对这张表加表锁的时候，会根据该表上所加的意向锁来判定是否可以成功加表锁，而不用逐行判断行锁情况了

![在这里插入图片描述](http://images.hellocode.top/d379026eb0214d709a13cb0ed679e565.png)

*分类*

- 意向共享锁(IS): 由语句select … lock in share mode添加 。 与表锁共享锁(read)兼容，与表锁排他锁(write)互斥。
- 意向排他锁(IX): 由insert、update、delete、select…for update添加 。与表锁共享锁(read)及排他锁(write)都互斥，意向锁之间不会互斥

可以通过以下SQL，查看意向锁及行锁的加锁情况：

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

### 3、行级锁

> 行级锁，每次操作锁住对应的行数据。锁定粒度最小，发生锁冲突的概率最低，并发度最高。应用在InnoDB存储引擎中

InnoDB 的数据是基于索引组织的，行锁是通过对索引上的索引项加锁来实现的，而不是对记录加的锁。对于行级锁，主要分为以下三类：

1. 行锁（Record Lock）：锁定单个行记录的锁，防止其他事务对此进行update 和 delete。在RC、RR隔离级别下都支持

   ![在这里插入图片描述](http://images.hellocode.top/bdcf63f5d51144f28d66ffe8ab6f068b.png)

2. 间隙锁（Gap Lock）：锁定索引记录间隙（不含该记录），确保所有记录间隙不变，防止其他事务在这个间隙进行insert。产生幻读。在RR隔离级别下都支持

   ![在这里插入图片描述](http://images.hellocode.top/d17909366a1d4659a02f2fd682d8506f.png)

3. 临键锁（Next-Key Lock）：行锁和间隙锁组合，同时锁住数据，并锁住数据前面的间隙Gap。在RR隔离级别下支持

   ![在这里插入图片描述](http://images.hellocode.top/aa563fd9071140839e55ff38852461bf.png)

*InnoDB实现了以下两种类型的行锁：*

1. 共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排它锁
2. 排他锁（X）：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他锁

![两种行锁的](http://images.hellocode.top/74c86a4940cb405b82e90b6290928df1.png)

**加锁过程**

![在这里插入图片描述](http://images.hellocode.top/917b599056c74d1e8e8302a1f3deb4b1.png)

默认情况下，InnoDB在 REPEATABLE READ事务隔离级别运行，InnoDB使用临键锁进行搜索和索引扫描，以防止幻读。

1. 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁
2. InnoDB的行锁是针对于索引加的锁，不通过索引条件检索数据，那么InnoDB将对表中的所有记录加锁，此时 *就会升级为表锁*
3. 索引上的等值查询(唯一索引)，给不存在的记录加锁时, 优化为间隙锁 。
4. 索引上的等值查询(非唯一普通索引)，向右遍历时最后一个值不满足查询需求时，临键锁退化为间隙锁。
5. 索引上的范围查询(唯一索引)，会访问到不满足条件的第一个值为止

> 注意：间隙锁唯一目的是防止其他事务插入间隙。间隙锁可以共存，一个事务采用的间隙锁不会组织另一个事务在同一间隙上采用间隙锁

可以通过以下SQL，查看意向锁和行锁的加锁情况：

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks; 
```

### 4、InnoDB共享锁

共享锁特点

- 数据可以被多个事务查询，但是不能修改

- InnoDB引擎默认加的是行锁，如果不采用带索引的列加锁时加的就是表锁

创建共享锁格式

- `SELECT语句 LOCK IN SHARE MODE;`

```sql
/*
	数据准备
*/

-- 创建db10数据库
CREATE DATABASE db10;

-- 使用db10数据库
USE db10;

-- 创建student表
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(10),
	age INT,
	score INT
);

-- 添加数据
INSERT INTO student VALUES (NULL, '张三', 23, 99), (NULL, '李四', 24, 95),
(NULL, '王五', 25, 98), (NULL, '赵六', 26, 97);
```

```sql
/*
	窗口1
*/

-- 开启事务
START TRANSACTION;

-- 查询id为1的数据，并加入共享锁
SELECT * FROM student WHERE id = 1 LOCK IN SHARE MODE;

-- 查询分数为99的数据，并加入共享锁
SELECT * FROM student WHERE score = 99 LOCK IN SHARE MODE;

-- 提交事务
COMMIT;
```

```sql
/*
	窗口2
*/

-- 开启事务
START TRANSACTION;

-- 查询id为1的数据（普通查询没有问题）
SELECT * FROM student WHERE id = 1;

-- 查询id为1的数据，也加入共享锁(共享锁和共享锁之间相互兼容)
SELECT * FROM student WHERE id = 1 LOCK IN SHARE MODE;

-- 修改id为1的数据，姓名改为张三三(修改失败，出现锁的情况，只有在窗口一提交事务之后才能修改成功)
UPDATE student SET NAME = '张三三' WHERE id = 1;

-- 修改id为2的数据，将姓名修改为李四四(修改成功，InnoDB引擎默认加的是行锁)
UPDATE student SET NAME = '李四四' WHERE id = 2;

-- 修改id为3的数据，姓名改为王五五(修改失败，锁，InnoDB如果不采用带索引的列加锁时加的就是表锁)
UPDATE student SET NAME = '王五五' WHERE id = 3;

-- 提交事务(窗口2没提交事务时修改的内容在窗口1中不能查询到)
COMMIT;
```

### 5、InnoDB排他锁

排他锁特点

- 加锁的数据，不能被其他事务加锁查询或修改（普通查询可以）
- 锁和锁之间不能共存

创建排他锁的格式

- `SELECT语句 FOR UPDATE;`

```sql
/*
	窗口1
*/

-- 开启事务
START TRANSACTION;

-- 查询id为1的数据，并加入排他锁
SELECT * FROM student WHERE id = 1 FOR UPDATE;
SELECT * FROM student WHERE score = 99 FOR UPDATE;
-- 提交事务
COMMIT;
```

```sql
/*
	窗口2
*/

-- 开启事务
START TRANSACTION;

-- 查询id为1的数据(成功，普通查询没问题)
SELECT * FROM student WHERE id =1;

-- 查询id为1的数据，并加入共享锁(失败，排他锁和共享锁不兼容)
SELECT * FROM student WHERE id = 1 LOCK IN SHARE MODE;

-- 查询id为1的数据，并加入排他锁(失败，排他锁和排他锁也不兼容)
SELECT * FROM student WHERE id =1 FOR UPDATE;

-- 修改id为1的数据，姓名改为张三(失败，会出现锁的情况，只有窗口1提交事务后才能修改)
UPDATE student SET NAME = '张三' WHERE id = 1;

-- 提交事务
COMMIT;
```

### 6、MyISAM 读锁

读锁特点

- 所有连接只能查询数据，不能修改
- MyISAM存储引擎只能添加表锁，且不支持事务

读锁语法格式
- 加锁：`LOCK TABLE 表名 READ;`
- 解锁：`UNLOCK TABLES;`

```sql
-- 创建product表
CREATE TABLE product(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	price INT
)ENGINE = MYISAM;

-- 添加数据
INSERT INTO product VALUES (NULL, '华为手机', 4999), (NULL, '小米手机', 2999),
(NULL, '苹果', 8999), (NULL, '中兴', 1999);
```

```sql
/*
	窗口1
*/

-- 为product表添加读锁
LOCK TABLE product READ;

-- 查询id为1的数据
SELECT * FROM product WHERE id = 1;

-- 修改id为1的数据，金额改为4999(失败，读锁中所有连接只能读取数据不能修改数据)
UPDATE product SET price = 4999 WHERE id = 1;

-- 解锁
UNLOCK TABLES;
```

```sql
/*
	窗口2
*/

-- 查询id为1的数据
SELECT * FROM product WHERE id = 1;

-- 修改id为1的数据，金额改为5999(失败，读锁中所有连接只能读取数据不能修改数据)
UPDATE product SET price = 5999 WHERE id = 1;
```

### 7、MyISAM 写锁

写锁特点

- 其他连接不能查询和修改数据（当前连接下可以查询和修改）

写锁语法格式
- 加锁：`LOCK TABLE 表名 WRITE;`
- 解锁：`UNLOCK TABLES;`

```sql
/*
	窗口1
*/

-- 为product表添加写锁
LOCK TABLE product WRITE;

-- 查询(没有问题)
SELECT * FROM product;

-- 修改(没有问题)
UPDATE product SET price = 1999 WHERE id = 2;

-- 解锁
UNLOCK TABLES;
```

```sql
/*
	窗口2
*/

-- 查询(失败，出现锁，只有窗口1解锁后才能成功)
SELECT * FROM product;

-- 修改(失败，出现锁，只有窗口1解锁后才能成功)
UPDATE product SET price = 2999 WHERE id = 2;
```

### 8、悲观锁和乐观锁

悲观锁

- 就是很悲观，它对于数据被外界修改的操作持保守态度，认为数据随时会修改
- 整个数据处理中需要将数据加锁。悲观锁一般都是依靠关系型数据库提供的锁机制
- 我们之前所学习的锁机制都是悲观锁

乐观锁

- 就是很乐观，每次自己操作数据的时候认为没有人会来修改它，所以不去加锁
- 但是在更新的时候会去判断在此期间数据有没有被修改
- 需要用户自己去实现，不会发生并发抢占资源，只有在提交操作的时候检查是否违反数据完整性

**乐观锁实现方式**（了解）

方式一
- 给数据表中添加一个version列，每次更新后都将这个列的值加1
- 读取数据时，将版本号读取出来，再执行更新的时候，比较版本号
- 如果相同则执行更新，如果不同，说明此条数据已经发生了变化
- 用户自行根据这个通知来决定怎么处理，比如重新开始一遍，或者放弃本次更新

方式二
- 和版本号方式基本一样，给数据表加入一个列，名称无所谓，数据类型是 timestamp
- 每次更新后都将最新时间插入到此列
- 读取数据时，将时间读取出来，在执行更新的时候，比较时间
- 如果相同则更新，如果不相同，说明此条数据已经发生了变化

```sql
-- 创建city表
CREATE TABLE city(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	VERSION INT
);

-- 添加数据
INSERT INTO city VALUES (NULL, '北京', 1), (NULL, '上海', 1), (NULL, '广州', 1), (NULL, '深圳', 1);

-- 将北京修改为北京市
-- 1. 将北京的版本号读取出来
SELECT VERSION FROM city WHERE NAME = '北京';		-- 1
-- 2. 修改北京为北京市，版本号+1，并对比版本号是否相同
UPDATE city SET NAME = '北京市', VERSION = VERSION + 1 WHERE NAME = '北京' AND VERSION = 1;
```

## 十二、InnoDB引擎

### 1、逻辑存储结构

![在这里插入图片描述](http://images.hellocode.top/ee904c6679644c3c8a03bebba542f21b.png)

- 表空间（ibd文件），一个MySQL实例可以对应多个表空间，用于存储记录、索引等数据

- 段，分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment），InnoDB是索引组织表，数据段就是B+树的叶子节点，索引段即为B+树的非叶子节点。段用来管理多个Extent（区）

- 区，表空间的单元结构，每个区的大小为1M。 默认情况下， InnoDB存储引擎页大小为16K， 即一个区中一共有64个连续的页

- 页，是InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区

- 行，InnoDB 存储引擎数据是按行进行存放的

  在行中，默认有两个隐藏字段：

  - Trx_id：每次对某条记录进行改动时，都会把对应的事务id赋值给trx_id隐藏列。
  - Roll_pointer：每次对某条引记录进行改动时，都会把旧的版本写入到undo日志中，然后这个隐藏列就相当于一个指针，可以通过它来找到该记录修改前的信息。

### 2、架构

MySQL5.5 版本开始，默认使用InnoDB存储引擎，它擅长事务处理，具有崩溃恢复特性，在日常开发中使用非常广泛。下面是InnoDB架构图，左侧为内存结构，右侧为磁盘结构。

![img](http://images.hellocode.top/059a4cdc73e49bb27e615ba15271e31a.webp)

#### 2.1. 内存结构

![img](http://images.hellocode.top/882b68b48c16b46c235babb6ac214d3f.webp)

**Buffer Pool**

- InnoDB存储引擎基于磁盘文件存储，访问物理硬盘和在内存中进行访问，速度相差很大，为了尽可能弥补这两者之间的I/O效率的差值，就需要把经常使用的数据加载到缓冲池中，避免每次访问都进行磁盘I/O。

- 在InnoDB的缓冲池中不仅缓存了索引页和数据页，还包含了undo页、插入缓存、自适应哈希索引以及InnoDB的锁信息等等。

- 缓冲池 Buffer Pool，是主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增 删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），然后再以一定频 率刷新到磁盘，从而减少磁盘IO，加快处理速度。

缓冲池以Page页为单位，底层采用链表数据结构管理Page。根据状态，将Page分为三种类型：

- free page：空闲page，未被使用。
- clean page：被使用page，数据没有被修改过。
- dirty page：脏页，被使用page，数据被修改过，也中数据与磁盘的数据产生了不一致。

**Change Buffer**

Change Buffer，更改缓冲区（针对于非唯一二级索引页），在执行DML语句时，如果这些数据Page没有在Buffer Pool中，不会直接操作磁盘，而会将数据变更存在更改缓冲区 Change Buffer中，在未来数据被读取时，再将数据合并恢复到Buffer Pool中，再将合并后的数据刷新到磁盘中。

Change Buffer的意义是什么呢?

先来看一幅图，这个是二级索引的结构图：

![img](http://images.hellocode.top/5ef50ced70d01940d43485d82cbb1535.webp)

与聚集索引不同，二级索引通常是非唯一的，并且以相对随机的顺序插入二级索引。同样，删除和更新可能会影响索引树中不相邻的二级索引页，如果每一次都操作磁盘，会造成大量的磁盘IO。有了ChangeBuffer之后，我们可以在缓冲池中进行合并处理，减少磁盘IO。

**Adaptive Hash Index**

自适应hash索引，用于优化对Buffer Pool数据的查询。MySQL的innoDB引擎中虽然没有直接支持hash索引，但是给我们提供了一个功能就是这个自适应hash索引。因为前面我们讲到过，hash索引在进行等值匹配时，一般性能是要高于B+树的，因为hash索引一般只需要一次IO即可，而B+树，可能需要几次匹配，所以hash索引的效率要高，但是hash索引又不适合做范围查询、模糊匹配等。

InnoDB存储引擎会监控对表上各索引页的查询，如果观察到在特定的条件下hash索引可以提升速度，则建立hash索引，称之为自适应hash索引。

*自适应哈希索引，无需人工干预，是系统根据情况自动完成*

参数： `adaptive_hash_index`（控制是否开启自适应哈希）

**Log Buffer**

Log Buffer：日志缓冲区，用来保存要写入到磁盘中的log日志数据（redo log 、undo log），默认大小为 16MB，日志缓冲区的日志会定期刷新到磁盘中。如果需要更新、插入或删除许多行的事务，增加日志缓冲区的大小可以节省磁盘 I/O。

参数:

innodb_log_buffer_size：缓冲区大小

innodb_flush_log_at_trx_commit：日志刷新到磁盘时机，取值主要包含以下三个：

- `1`:日志在每次事务提交时写入并刷新到磁盘，默认值。

- `0`:每秒将日志写入并刷新到磁盘一次。
- `2`:日志在每次事务提交后写入，并每秒刷新到磁盘一次。

#### 2.2. 磁盘结构

![92ba0822ed0b46e1ae72df8a17d3a45b.png](http://images.hellocode.top/ndtrvef2bkfgi_a01a0804394f465c84f8ca9feda44291.png)

**System Tablespace**

系统表空间是更改缓冲区的存储区域。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。(在MySQL5.x版本中还包含InnoDB数据字典、undolog等)

参数：innodb_data_file_path

![d79b274929334152a6d38be91e2d1be3.png](http://images.hellocode.top/ndtrvef2bkfgi_f72426d0f6074951ac70a34852bc692b.png)

系统表空间，默认的文件名叫 ibdata1

**File-Per-Table Tablespaces**

如果开启了innodb_file_per_table开关 ，则每个表的文件表空间包含单个InnoDB表的数据和索引 ，并存储在文件系统上的单个数据文件中。

开关参数：innodb_file_per_table ，该参数默认开启。

![dfc80ca9d8004e6c9ddc00e8448ffc6a.png](http://images.hellocode.top/ndtrvef2bkfgi_33b22b9ff3cc419db767d10ab995484d.png)

那也就是说，我们没创建一个表，都会产生一个表空间文件，如图：

![e8beda27b2f643a380f9b38a7f7d8a2a.png](http://images.hellocode.top/ndtrvef2bkfgi_776c943e45f149559ca92c7ca1706ca6.png)

**General Tablespaces**

通用表空间，需要通过 CREATE TABLESPACE 语法创建通用表空间，在创建表时，可以指定该表空间。

1. 创建表空间

`CREATE TABLESPACE ts_name ADD DATAFILE 'file_name' ENGINE = engine_name;`

![f91d8a108d0c413eb930b624a9967d37.png](http://images.hellocode.top/ndtrvef2bkfgi_b97afb780d52494c8769cfc2e6d68591.png)

2. 创建表时指定表空间

`CREATE TABLE xxx ... TABLESPACE ts_name`

![0a2653c851af460fa595bd959398a8f1.png](http://images.hellocode.top/ndtrvef2bkfgi_18b302a0a89c4dbcaca9d24266673a71.png)

**Undo Tablespaces**

撤销表空间，MySQL实例在初始化时会自动创建两个默认的undo表空间（初始大小16M），用于存储undo log日志。

**Temporary Tablespaces**

InnoDB 使用会话临时表空间和全局临时表空间。存储用户创建的临时表等数据。

**Doublewrite Buffer Files**

双写缓冲区，innoDB引擎将数据页从Buffer Pool刷新到磁盘前，先将数据页写入双写缓冲区文件中，便于系统异常时恢复数据。

![2d65d23f6d4748949b924e4057485923.png](http://images.hellocode.top/ndtrvef2bkfgi_078001a379df48a29f88919b54db2130.png)

**Redo Log**

重做日志，是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log）,前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中, 用于在刷新脏页到磁盘时,发生错误时, 进行数据恢复使用

以循环方式写入重做日志文件，涉及两个文件：

![6de278e6d6694ce5bb08e7e842b7e74b.png](http://images.hellocode.top/ndtrvef2bkfgi_64a342e5aaa143578368e6d3a62a0944.png)

前面介绍了InnoDB的内存结构，以及磁盘结构，那么内存中我们所更新的数据，又是如何到磁盘中的？ 此时，就涉及到一组后台线程，接下来，介绍一些InnoDB中涉及到的后台线程。

![8ec4f2997fb246878c34ecd6d122b7c6.png](http://images.hellocode.top/ndtrvef2bkfgi_923c1151047d4cc28119145860c51c80.png)

#### 2.3. 后台线程

![12c3b7f3f8814309a195c64f051d4445.png](http://images.hellocode.top/ndtrvef2bkfgi_a98f91867f804a7c8d22f378a9444240.png)

在InnoDB的后台线程中，分为4类，分别是：Master Thread 、IO Thread、Purge Thread、 Page Cleaner Thread。

1. Master Thread

   核心后台线程，负责调度其他线程，还负责将缓冲池中的数据异步刷新到磁盘中, 保持数据的一致性， 还包括脏页的刷新、合并插入缓存、undo页的回收

2. IO Thread

   在InnoDB存储引擎中大量使用了AIO来处理IO请求, 这样可以极大地提高数据库的性能，而IO Thread主要负责这些IO请求的回调

![image.png](http://images.hellocode.top/ndtrvef2bkfgi_26cc3e31938d4dd88ba08b5cac7c0d9f.png)

可以通过以下的这条指令，查看到InnoDB的状态信息，其中就包含IO Thread信息

`show engine innodb status \G;`

![0a2653c851af460fa595bd959398a8f1.png](http://images.hellocode.top/ndtrvef2bkfgi_0b533e1ec0084147b32fbbdba76f6e33.png)

3. Purge Thread

   主要用于回收事务已经提交了的undo log，在事务提交之后，undo log可能不用了，就用它来回收。

4. Page Cleaner Thread

    协助 Master Thread 刷新脏页到磁盘的线程，它可以减轻 Master Thread 的工作压力，减少阻塞。

### 3、事务原理

#### 3.1. 概述

事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

特性

- 原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

- 一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。

- 隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。

- 持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

实际上，我们研究事务的原理，就是研究MySQL的InnoDB引擎是如何保证事务的这四大特性的。

而对于这四大特性，实际上分为两个部分。 其中的原子性、一致性、持久化，实际上是由InnoDB中的两份日志来保证的，一份是redo log日志，一份是undo log日志。 而持久性是通过数据库的锁， 加上MVCC来保证的。

![img](http://images.hellocode.top/939a7c1272dd53ec4f12d91aff798222.webp)

#### 3.2. redo log

- 重做日志，记录的是事务提交时数据页的物理修改，是用来实现事务的持久性。

- 该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log file）,前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中, 用于在刷新脏页到磁盘,发生错误时, 进行数据恢复使用。

**没有redolog，可能会存在什么问题的？**

在InnoDB引擎中的内存结构中，主要的内存区域就是缓冲池，在缓冲池中缓存了很多的数据页。 当我们在一个事务中，执行多个增删改的操作时，InnoDB引擎会先操作缓冲池中的数据，如果缓冲区没有对应的数据，会通过后台线程将磁盘中的数据加载出来，存放在缓冲区中，然后将缓冲池中的数据修改，修改后的数据页我们称为脏页。而脏页则会在一定的时机，通过后台线程刷新到磁盘中，从而保证缓冲区与磁盘的数据一致。而缓冲区的脏页数据并不是实时刷新的，而是一段时间之后 将缓冲区的数据刷新到磁盘中，假如刷新到磁盘的过程出错了，而提示给用户事务提交成功，而数据却没有持久化下来，这就出现问题了，没有保证事务的持久性。

![img](http://images.hellocode.top/e3c2b556f98e4050d4cdf4d59d0ef41d.webp)

如何解决上述的问题呢？ 在InnoDB中提供了一份日志 redo log，接下来我们再来分析一 下，通过redolog如何解决这个问题

![img](http://images.hellocode.top/4ced26c49777080a0323fba3a7ebcc1c.webp)

有了redolog之后，当对缓冲区的数据进行增删改之后，会首先将操作的数据页的变化，记录在redo log buffer中。在事务提交时，会将redo log buffer中的数据刷新到redo log磁盘文件中。 过一段时间之后，如果刷新缓冲区的脏页到磁盘时，发生错误，此时就可以借助于redo log进行数据恢复，这样就保证了事务的持久性。 而如果脏页成功刷新到磁盘或者涉及到的数据已经落盘，此 时redolog就没有作用了，就可以删除了，所以存在的两个redolog文件是循环写的。

**为什么每一次提交事务，要刷新redo log 到磁盘中呢，而不是直接将buffer pool中的脏页刷新到磁盘呢 ?**

因为在业务操作中，我们操作数据一般都是随机读写磁盘的，而不是顺序读写磁盘。 而redo log在 往磁盘文件中写入数据，由于是日志文件，所以都是顺序写的。顺序写的效率，要远大于随机写。 这种先写日志的方式，称之为 WAL（Write-Ahead Logging）

#### 3.3. undo log

> 回滚日志，用于记录数据被修改前的信息 , 作用包含两个 : 提供回滚(保证事务的原子性) 和 MVCC(多版本并发控制) 

undo log和redo log记录物理日志不一样，它是逻辑日志。可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然，当update一条记录时，它记录一条对应相反的 update记录。当执行rollback时，就可以从undo log中的逻辑记录读取到相应的内容并进行回滚。

- Undo log销毁：undo log在事务执行时产生，事务提交时，并不会立即删除undo log，因为这些日志可能还用于MVCC

- Undo log存储：undo log采用段的方式进行管理和记录，存放在前面介绍的 rollback segment 回滚段中，内部包含1024个undo log segment

### 4、MVCC

#### 4.1. 基本概念

**当前读**

读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如：`select ... lock in share mode`(共享锁)，`select ...for update`、`update`、`insert`、`delete`(排他锁)都是一种当前读

![img](http://images.hellocode.top/d1eedca2b639c552f9aba23445b8508a.webp)

在测试中我们可以看到，即使是在默认的RR隔离级别下，事务A中依然可以读取到事务B最新提交的内容，因为在查询语句后面加上了 `lock in share mode` 共享锁，此时是当前读操作。当然，当我们加排他锁的时候，也是当前读操作



**快照读**

简单的select（不加锁）就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。

- Read Committed：每次select，都生成一个快照读。
- Repeatable Read：开启事务后第一个select语句才是快照读的地方。
- Serializable：快照读会退化为当前读。

![img](http://images.hellocode.top/add3a04aa0ebcf9e48ac42d375649187.webp)

在测试中,我们看到即使事务B提交了数据,事务A中也查询不到。 原因就是因为普通的select是快照读，而在当前默认的RR隔离级别下，开启事务后第一个select语句才是快照读的地方，后面执行相同的select语句都是从快照中获取数据，可能不是当前的最新数据，这样也就保证了可重复读

**MVCC**

全称 Multi-Version Concurrency Control，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为MySQL实现MVCC提供了一个非阻塞读功能。MVCC的具体实现，还需要依赖于数据库记录中的三个隐式字段、undo log日志、readView。

#### 4.2. 隐藏字段

 **介绍**

![img](http://images.hellocode.top/7708e0b1f02b50a51c4a0e54b29f10f6.webp)

当我们创建了上面的这张表，我们在查看表结构的时候，就可以显式的看到这三个字段。 实际上除了这三个字段以外，InnoDB还会自动的给我们添加三个隐藏字段及其含义分别是：

| 隐藏字段    | 含义                                                         |
| :---------- | :----------------------------------------------------------- |
| DB_TRX_ID   | 最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID。 |
| DB_ROLL_PTR | 回滚指针，指向这条记录的上一个版本，用于配合undo log，指向上一个版本。 |
| DB_ROW_ID   | 隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段。       |

而上述的前两个字段是肯定会添加的， 是否添加最后一个字段DB_ROW_ID，得看当前表有没有主键，如果有主键，则不会添加该隐藏字段。

**测试**

*查看有主键的表 stu*

进入服务器中的 /var/lib/mysql/MySQL_Advanced/ , 查看stu的表结构信息, 通过如下指令:

```shell
ibd2sdi stu.ibd
```

查看到的表结构信息中，有一栏 columns，在其中我们会看到处理我们建表时指定的字段以外，还有额外的两个字段 分别是：DB_TRX_ID 、 DB_ROLL_PTR ，因为该表有主键，所以没有DB_ROW_ID隐藏字段

```json
            {
                "name": "DB_TRX_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 4,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1074;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_ROLL_PTR",
                "type": 9,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 5,
                "char_length": 7,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1074;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            }
```

*查看没有主键的表 employee*

建表语句：

```sql
create table employee (id int , name varchar(10));
```

此时，我们再通过以下指令来查看表结构及其其中的字段信息：

```bash
ibd2sdi employee.ibd
```

查看到的表结构信息中，有一栏 columns，在其中我们会看到处理我们建表时指定的字段以外，还有额外的三个字段 分别是：DB_TRX_ID 、 DB_ROLL_PTR 、DB_ROW_ID，因为employee表是没有指定主键的。

```json
            {
                "name": "DB_ROW_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 3,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1076;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_TRX_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 4,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1076;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_ROLL_PTR",
                "type": 9,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 5,
                "char_length": 7,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1076;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            }
        ],
```

#### 4.3. undo log版本链

- 回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。

- 当insert的时候，产生的undo log日志只在回滚时需要，在事务提交后，可被立即删除。

- 而update、delete的时候，产生的undo log日志不仅在回滚时需要，在快照读时也需要，不会立即被删除。

有一张表原始数据为：

![img](http://images.hellocode.top/e3e469e8f1cfc76306d25b2ca22d7b5b.webp)

> `DB_TRX_ID` : 代表最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID，是自增的
>
> `DB_ROLL_PTR`： 由于这条数据是才插入的，没有被更新过，所以该字段值为null

然后，有四个并发事务同时在访问这张表

A. 第一步

![img](http://images.hellocode.top/155aaf8efd9eff7937aec6211f482479.webp)

当事务2执行第一条修改语句时，会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本

![img](http://images.hellocode.top/e1aa6163b8abd39b0f4057ade590fcaa.webp)

B.第二步

![img](http://images.hellocode.top/00fe5f87ab12feeb5548825df662b0cd.webp)

当事务3执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本

![img](http://images.hellocode.top/409012fc41f4dc56c7f6a65eab588514.webp)

C. 第三步

![img](http://images.hellocode.top/eb84a95ffa35d21922d9dcf90c88ed36.webp)

当事务4执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本

![img](http://images.hellocode.top/3ea3ba508350cc5fbc5f97560419c9b4.webp)

> 最终我们发现，不同事务或相同事务对同一条记录进行修改，会导致该记录的undolog生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录

#### 4.4. readview

ReadView（读视图）是 快照读 SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id。

ReadView中包含了四个核心字段：

| 字段           | 含义                                                 |
| :------------- | :--------------------------------------------------- |
| m_ids          | 当前活跃的事务ID集合                                 |
| min_trx_id     | 最小活跃事务ID                                       |
| max_trx_id     | 预分配事务ID，当前最大事务ID+1（因为事务ID是自增的） |
| creator_trx_id | ReadView创建者的事务ID                               |

而在readview中就规定了版本链数据的访问规则：

- `trx_id` 代表当前undolog版本链对应事务ID。

| 条件                               | 是否可以访问                              | 说明                                       |
| :--------------------------------- | :---------------------------------------- | :----------------------------------------- |
| trx_id == creator_trx_id           | 可以访问该版本                            | 成立，说明数据是当前这个事务更改的。       |
| trx_id < min_trx_id                | 可以访问该版本                            | 成立，说明数据已经提交了。                 |
| trx_id > max_trx_id                | 不可以访问该版本                          | 成立，说明该事务是在ReadView生成后才开启。 |
| min_trx_id <= trx_id <= max_trx_id | 如果trx_id不在m_ids中，是可以访问该版本的 | 成立，说明数据已经提交。                   |

不同的隔离级别，生成ReadView的时机不同：

- READ COMMITTED ：在事务中每一次执行快照读时生成ReadView。
- REPEATABLE READ：仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。

**原理分析（RC级别）**

RC隔离级别下，在事务中*每一次*执行快照读时生成ReadView。

我们就来分析事务5中，两次快照读读取数据，是如何获取数据的?

在事务5中，查询了两次id为30的记录，由于隔离级别为Read Committed，所以每一次进行快照读都会生成一个ReadView，那么两次生成的ReadView如下。

![img](http://images.hellocode.top/b1a8ad2aacb2c193336a250ab0832303.webp)

那么这两次快照读在获取数据时，就需要根据所生成的ReadView以及ReadView的版本链访问规则，到undolog版本链中匹配数据，最终决定此次快照读返回的数据。

A. 先来看第一次快照读具体的读取过程：

![img](http://images.hellocode.top/55001a176b54ea69e192c2da8ca04065.webp)

在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：

- 先匹配 

![img](http://images.hellocode.top/25a658c7c0c00a80549e7c9cbdcfd42e.webp)

 这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。

- 再匹配第二条 

![img](http://images.hellocode.top/e97fd975a25d41eecd0b5b19eed4c7f9.webp)

这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。

- 再匹配第三条 

![img](http://images.hellocode.top/e51ec6e232f1a39ccab163bc29481f90.webp)

这条记录对应的trx_id为2，也就是将2带入右侧的匹配规则中。①不满足 ②满足 终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。

B. 再来看第二次快照读具体的读取过程:

![img](http://images.hellocode.top/c06d01831bda547b871d9eaf8f76e839.webp)

在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：

- 先匹配 

![img](http://images.hellocode.top/71a495e8b1f51cabf1acf110f796ffc8.webp)

 这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。

- 再匹配第二条 

![img](http://images.hellocode.top/666109098c2b4bc08d6ac6e7aa0fd157.webp)

这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②满足 。终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。

**原理分析（RR级别）**

RR隔离级别下，仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。 而RR 是可重复读，在一个事务中，执行两次相同的select语句，查询到的结果是一样的。

那MySQL是如何做到可重复读的呢? 我们简单分析一下就知道了

![img](http://images.hellocode.top/9291e07b9874508cec6b5d281bff70fd.webp)

我们看到，在RR隔离级别下，只是在事务中*第一次*快照读时生成ReadView，后续都是复用该ReadView，那么既然ReadView都一样， ReadView的版本链匹配规则也一样， 那么最终快照读返回的结果也是一样的。

所以呢，MVCC的实现原理就是通过 InnoDB表的隐藏字段、UndoLog 版本链、ReadView来实现的。而MVCC + 锁，则实现了事务的隔离性。 而一致性则是由redolog 与 undolog保证

![img](http://images.hellocode.top/711ab7835498d388cf7d09881fe5ebdb.webp)

## 十三、MySQL管理

### 1、系统数据库

MySQL数据库安装完成后，自带了以下四个数据库，具体作用如下：

| 数据库             | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| mysql              | 存储MySQL服务器正常运行所需要的各种信息（时区、主从、用户、权限等） |
| information_schema | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
| performance_schema | 为MySQL服务器运行时状态提供了一个底层监视功能，主要用于收集数据库服务器性能参数 |
| sys                | 包含了一系列方便DBA和开发人员利用performance_schema性能数据库进行性能调优和诊断的视图 |

### 2、常用工具

#### 2.1. mysql

该mysql不是指mysql服务，而是指mysql的客户端工具

**语法**

```sql
mysql [options] [database]
```

**选项**

```sql
-u, --user=name #指定用户名
-p, --password[=name] #指定密码
-h, --host=name #指定服务器IP或域名
-P, --port=port #指定连接端口
-e, --execute=name #执行SQL语句并退出
```

`-e`选项可以在Mysql客户端执行SQL语句，而不用连接到MySQL数据库再执行，对于一些批处理脚本，这种方式尤其方便。

示例：

```sql
mysql -uroot –p123456 db01 -e "select * from stu";
```

![在这里插入图片描述](http://images.hellocode.top/b4630286dc7441709222fe53b5e566a4.png)

#### 2.2. mysqladmin

mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。

通过帮助文档查看选项：

```sql
mysqladmin --help
```

![在这里插入图片描述](http://images.hellocode.top/94136f0b4c054fa1991af365a7777c74.png)

**语法:**

```sql
mysqladmin [options] command ...
```

**选项:**

```sql
-u, --user=name #指定用户名
-p, --password[=name] #指定密码
-h, --host=name #指定服务器IP或域名
-P, --port=port #指定连接端口
```

**示例：**

```sql
mysqladmin -uroot –p1234 drop 'test01';
mysqladmin -uroot –p1234 version;
```

![在这里插入图片描述](http://images.hellocode.top/eb2adc8b40a34ff5b763e5b683512993.png)

#### 2.3. mysqlbinlog

由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog 日志管理工具。

**语法 ：**

```sql
mysqlbinlog [options] log-files1 log-files2 ...
```

**选项 ：**

```sql
-d, --database=name 指定数据库名称，只列出指定的数据库相关操作。
-o, --offset=# 忽略掉日志中的前n行命令。
-r,--result-file=name 将输出的文本格式日志输出到指定文件。
-s, --short-form 显示简单格式， 省略掉一些信息。
--start-datatime=date1 --stop-datetime=date2 指定日期间隔内的所有日志。
--start-position=pos1 --stop-position=pos2 指定位置间隔内的所有日志。
```

**示例:**

A. 查看 binlog.000008这个二进制文件中的数据信息

![在这里插入图片描述](http://images.hellocode.top/5a72351c0862404382d8b4d356c5b947.png)

上述查看到的二进制日志文件数据信息量太多了，不方便查询。 我们可以加上一个参数 `-s` 来显示简单格式。

![在这里插入图片描述](http://images.hellocode.top/7770a6e6a6b7427cb8b85666cb078113.png)

#### 2.4. mysqlshow

mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。

**语法 ：**

```sql
mysqlshow [options] [db_name [table_name [col_name]]]
```

**选项 ：**

```sql
--count 显示数据库及表的统计信息（数据库，表 均可以不指定）
-i 显示指定数据库或者指定表的状态信息
```

**示例：**

- 查询test库中每个表中的字段书，及行数

```sql
mysqlshow -uroot -p2143 test --count
```

- 查询test库中book表的详细情况

```sql
mysqlshow -uroot -p2143 test book --count
```

- 查询每个数据库的表的数量及表中记录的数量

```sql
mysqlshow -uroot -p
```

![在这里插入图片描述](http://images.hellocode.top/6dc43d1c37544abb8af6ecd5bbead4da.png)

- 查看数据库db01的统计信息

```sql
mysqlshow -uroot -p1234 db01 --count
```

![在这里插入图片描述](http://images.hellocode.top/2c848d6e11954bee940c50585616d92e.png)

- 查看数据库db01中的course表的信息

```sql
mysqlshow -uroot -p1234 db01 course --count
```

![在这里插入图片描述](http://images.hellocode.top/430be2f1728e4088bc900eec6594e3c0.png)

- 查看数据库db01中的course表的id字段的信息

```sql
mysqlshow -uroot -p1234 db01 course id --count
```

![在这里插入图片描述](http://images.hellocode.top/887e56738cea432db4befe84de52691f.png)

#### 2.5. mysqldump

mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句。

**语法 ：**

```sql
mysqldump [options] db_name [tables]
mysqldump [options] --database/-B db1 [db2 db3...]
mysqldump [options] --all-databases/-A
```

**连接选项 ：**

```sql
-u, --user=name 指定用户名
-p, --password[=name] 指定密码
-h, --host=name 指定服务器ip或域名
-P, --port=# 指定连接端口
```

**输出选项：**

```sql
--add-drop-database 在每个数据库创建语句前加上 drop database 语句
--add-drop-table 在每个表创建语句前加上 drop table 语句 , 默认开启 ; 不开启 (--skip-add-drop-table)
-n, --no-create-db 不包含数据库的创建语句
-t, --no-create-info 不包含数据表的创建语句
-d --no-data 不包含数据
-T, --tab=name 自动生成两个文件：一个.sql文件，创建表结构的语句；一
个.txt文件，数据文件
```

**示例:**

A. 备份db01数据库

```sql
mysqldump -uroot -p1234 db01 > db01.sql
```

![在这里插入图片描述](http://images.hellocode.top/8df57035d50a4f9aa284186ecc79dced.png)

可以直接打开db01.sql，来查看备份出来的数据到底什么样。

![在这里插入图片描述](http://images.hellocode.top/ef036757af834274934fa1d3f6963c15.png)

备份出来的数据包含：

- 删除表的语句
- 创建表的语句
- 数据插入语句

如果我们在数据备份时，不需要创建表，或者不需要备份数据，只需要备份表结构，都可以通过对应的参数来实现。

B. 备份db01数据库中的表数据，不备份表结构(-t)

```sql
mysqldump -uroot -p1234 -t db01 > db01.sql
```

![在这里插入图片描述](http://images.hellocode.top/0997990d2fe54f23a9c483fd89991cb7.png)

打开 db02.sql ，来查看备份的数据，只有insert语句，没有备份表结构。

![在这里插入图片描述](http://images.hellocode.top/feda1998c06c40a0b85be61e22e16fd9.png)

C. 将db01数据库的表的表结构与数据分开备份(-T)

```sql
mysqldump -uroot -p1234 -T /root db01 score
```

![在这里插入图片描述](http://images.hellocode.top/6a2694ee11784b5aadd43b67eee0b107.png)

执行上述指令，会出错，数据不能完成备份，原因是因为我们所指定的数据存放目录/root，MySQL认为是不安全的，需要存储在MySQL信任的目录下。那么，哪个目录才是MySQL信任的目录呢，可以查看一下系统变量 secure_file_priv 。执行结果如下：

![在这里插入图片描述](http://images.hellocode.top/9682dca208544e648e0606a369dbc8cf.png)
![在这里插入图片描述](http://images.hellocode.top/ae775972f90044ad882c57752b2e601b.png)

上述的两个文件 score.sql 中记录的就是表结构文件，而 score.txt 就是表数据文件，但是需要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据。如下：

![在这里插入图片描述](http://images.hellocode.top/187c4d6c57e14fd8a92b68afc39b80cf.png)

#### 2.6. mysqlimport/source

**mysqlimport**

mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。

*语法 ：*

```sql
mysqlimport [options] db_name textfile1 [textfile2...]
```

*示例 ：*

```sql
mysqlimport -uroot -p2143 test /tmp/city.txt
```

![在这里插入图片描述](http://images.hellocode.top/48d82c8090484aa8a086330ea5866d99.png)

**source**

如果需要导入sql文件,可以使用mysql中的source 指令 :

*语法 ：*

```sql
source /root/xxxxx.sql
```

## 十四、日志

### 1、错误日志

错误日志是MySQL中最重要的日志之一，它记录了当mysqld启动和停止时，以及服务器在运行过程中发生任何严重错误时的相关信息。当数据库出现任何故障导致无法正常使用时，建议首先查看此日志

- 该日志是默认开启的，默认存放目录 /var/log/，默认的日志文件名为 mysqld.log。查看日志位置：`show variables like '%log_error%'`

  ![img](http://images.hellocode.top/aab1d76d220c44068ec7c977e2e3ab16.jpg)

示例：打开一个连接，持续追踪错误日志。

```shell
# 持续追踪错误日志
tail -f /var/log/mysqld.log
```

![img](http://images.hellocode.top/049d62a4c44047b79b2b37d9045015bf.jpg)

复制一个连接，去制造一个错误

```bash
# 编辑mysql配置文件
vim /var/lib/mysql/auto.cnf
```

![img](http://images.hellocode.top/8cb10d86ee664dd0bb5e9094b8181b3e.jpg)
![img](http://images.hellocode.top/7392253088d5485bb7964035b54a46b6.jpg)

现在去重启`MySQL`服务

```shell
 systemctl restart mysqld;
```

![img](http://images.hellocode.top/b1dd72f429dc41e88fd6c47f44d118cf.jpg)

我们现在去查看错误日志

![img](http://images.hellocode.top/85059f2101e5449eac0f920516dc421c.jpg)

然后我们把配置文件改回去就可以重启成功了

### 2、二进制日志

二进制日志（BINLOG）记录了所有的 DDL（数据定义语言）语句和 DML（数据操纵语言）语句，但不包括数据查询（SELECT、SHOW）语句。

**作用：**

- 灾难时的数据恢复
- MySQL的主从复制

在MySQL8版本中，默认二进制日志是开启着的，涉及到的参数如下：`show variables like '%log_bin%';`

![img](http://images.hellocode.top/6f061009412f4c98bae6b14007d72b40.jpg)

- `log_bin_basename`：当前数据库服务器的 *binlog* 日志的基础名称（前缀），具体的 binlog 文件名需要再该 basename 的基础上加上编号(编号从000001开始)。
- `log_bin_index`：binlog 的索引文件，里面记录了当前服务器关联的 binlog 文件有哪些

![img](http://images.hellocode.top/cf8a822bbf104872a00a0a0ed748ede6.jpg)

我们去查看 `binlog.index` 文件，查看当前服务器关联的 binlog 文件有哪些

![img](http://images.hellocode.top/d059494623364965b8298a4ed7efb25c.jpg)

**日志格式**

MySQL服务器中提供了多种格式来记录二进制日志，具体格式及特点如下：

![img](http://images.hellocode.top/5e6d2a60762d4bceaf633ddd041fca3e.jpg)

> STATEMENT会记录sql语句，而ROW会记录每一行数据变更。如果一条sql语句，影响了5行，ROW就会记录5条记录

```sql
-- 查看现在的日志格式
show variables like '%binlog_format%';
```

![img](http://images.hellocode.top/cb51aa09deef4bdf954ac3e679d7fcd7.jpg)

如果我们需要配置二进制日志的格式，只需要在 `/etc/my.cnf` 中配置 `binlog_format` 参数即可，但是需要重启`MySQL`服务才会生效

```shell
# 编辑配置文件
vim /etc/my.cnf
```

![img](http://images.hellocode.top/beaddafd15a24c6f902a9c852f0b410e.jpg)

**日志查看**

由于日志是以二进制方式存储的，不能直接读取，需要通过二进制日志查询工具 `mysqlbinlog` 来查看，具体语法：

![img](http://images.hellocode.top/296eab7d3a1745ffbf804f781cffd027.jpg)

说明：如果日志格式是`ROW`，则需要加上参数 `-v` 或者 `-vv`才可以看到日志信息

**日志删除**

对于比较繁忙的业务系统，每天生成的binlog数据巨大，如果长时间不清除，将会占用大量磁盘空间。可以通过以下几种方式清理日志：

![img](http://images.hellocode.top/3bcf2af252274d67acd676f0fd70987f.jpg)

也可以在`MySQL`的配置文件中配置二进制日志的过期时间，设置了之后，二进制日志过期会自动删除。

```sql
-- 查看日志文件保存时长
show variables like '%binlog_expire_logs_seconds%';
```

![img](http://images.hellocode.top/3571ec6e157340c4a9014ac4be688334.jpg)

也可以自己去配置文件里面设置二进制日志的保存时间，设置完成后保存退出然后重启MySQL服务。

```shell
# 编辑配置文件
vim /etc/my.cnf
```

![img](http://images.hellocode.top/f350a2c783c94ab2a43552e5ebde0574.jpg)

### 3、查询日志

*查询日志中记录了客户端的所有操作语句*，而二进制日志不包含查询数据的SQL语句。*默认情况下，查询日志是未开启的*。

```sql
show variables like '%general%';
```

![img](http://images.hellocode.top/da3537614d6c48d695e7077efd412aba.jpg)

如果需要开启查询日志，可以修改`MySQL`的配置文件 `/etc/my.cnf` 文件

```shell
# 编辑配置文件
vim /etc/my.cnf
```

添加如下内容：然后保存退出并重启`MySQL`服务

```shell
#该选项用来开启查询日志  可选值 ： 0 或者 1 ； 0 代表关闭， 1 代表开启 
general_log=1 
#设置日志的文件名 ， 如果没有指定， 默认的文件名为 host_name.log(我这里是本机, 所有host为localhost)
general_log_file=/var/lib/mysql/mysql_query.log
```

![img](http://images.hellocode.top/fff84a3a40464b75b69847540d225a0b.jpg)

开启了查询日志之后，在`MySQL`的数据存放目录，也就是 `/var/lib/mysql/` 目录下就会出现`mysql_query.log` 文件。之后所有的客户端的增删改查操作都会记录在该日志文件之中，长时间运行后，该日志文件将会非常大

### 4、慢查询日志

慢查询日志记录了所有执行时间超过参数 `long_query_time` 设置值并且扫描记录数不小于 `min_examined_row_limit` 的所有的SQL语句的日志，默认未开启。`long_query_time` 默认为10 秒，最小为 0， 精度可以到微秒。

`MySQL`的慢查询日志默认没有开启，我们可以查看一下系统变量 `slow_query_log`。

```sql
show variables like 'slow_query_log';
```

![img](http://images.hellocode.top/0d315ae4deb5484b991467d032d63b39.jpg)

#### 4.1. 开启慢查询日志

如果要开启慢查询日志，需要在`MySQL`的配置文件（`/etc/my.cnf`）中配置如下信息：

```shell
# 编辑/etc/my.cnf
vim /etc/my.cnf
# 开启MySQL慢日志查询开关 
slow_query_log=1 
# 设置慢日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志 
long_query_time=2
```

![img](http://images.hellocode.top/ad8b4f098bab405ea6bf99a1f4a66646.jpg)

配置完毕之后，通过以下指令重新启动`MySQL`服务器进行测试

```shell
# 重新启动MySQL服务器
systemctl restart mysqld
```

查看慢日志文件中记录的信息`/var/lib/mysql/localhost-slow.log`

然后，再次查看开关情况，慢查询日志就已经打开了

![img](http://images.hellocode.top/3c9d8535624c4f09a21a2a5861e30252.jpg)

#### 4.2. 慢查询日志测试

执行如下SQL语句 ：

```sql
select * from tb_user; -- 这条SQL执行效率比较高, 执行耗时 40ms 
select count(*) from tb_sku; -- 由于tb_sku表中, 预先存入了1000w的记录, count一次,耗时 13.35 s
```

![img](http://images.hellocode.top/a680a6314f1b43c586d7372a9917c5d2.jpg)

检查慢查询日志:

最终我们发现，在慢查询日志中，只会记录执行时间超多我们预设时间（`2s`）的SQL，执行较快的`SQL`是不会记录的

![img](http://images.hellocode.top/f7664ec9f2fe4bb5a0901e5f64a7a1d8.jpg)

那这样，通过慢查询日志，就可以定位出执行效率比较低的`SQL`，从而有针对性的进行优化。

#### 4.3. 补充说明

默认情况下，不会记录管理语句，也不会记录不使用索引进行查找的查询。可以使用`log_slow_admin_statements`和 更改此行为 `log_queries_not_using_indexes`，如下所述。还是使用`vim`编辑器编辑`/etc/my.cnf`文件并追加下面的内容

```shell
# 记录执行较慢的管理语句 
log_slow_admin_statements =1 
# 记录执行较慢的未使用索引的语句 
log_queries_not_using_indexes = 1
```

## 十五、主从复制

### 1、概述

主从复制是指将数据库的DDL 和 DML 操作通过二进制日志传到从库服务器中，然后在从库上对这些日志重新执行（也叫重做），从而使得从库和主库的数据保持同步

MySQL支持一台主库同时向多台从库进行复制， 从库同时也可以作为其他从服务器的主库，实现链状复制。

**优点**

1. 主库出现问题，可以快速切换到从库提供服务
2. 实现读写分离（增删改操作主库、查询操作从库），降低主库的访问压力
3. 可以在从库中执行备份（由于备份时要加上全局锁，数据库处于只读状态，其他客户端不能够执行增删改操作），以避免备份期间影响主库服务

### 2、原理

![img](http://images.hellocode.top/2691672-20220312134833209-1729378437.png)

从上图看，复制分成三步：　　　

1. Master主库在事务提交时，会把数据变更记录在二进制日志文件Binlog中

2. 从库读取主库的二进制日志文件Binlog ,写入到从库的中继日志Relay Log

3. slave重做中继日志中的事件，将改变反映它自己的数据

### 3、搭建

**主库配置**

首先准备两台主机并关闭防火墙:

```shell
# 开放指定的3306端口号
firewall-cmd --zone=public --add-port=3306/tcp -permanent
firewall-cmd -reload

# 或者关闭防火墙
systemctl stop firewalld
# 关闭防火墙开机自启
systemctl disable firewalld

# 查看firewall服务状态
systemctl status firewalld
# 查看firewall的状态
firewall-cmd --state
```

检查mysql 运行状态

```shell
systemctl status mysqld
```

**主库配置**

1. 在master 的配置文件（/usr/my.cnf）中，配置如下内容：

```shell
#mysql服务ID，保证整个集群环境中唯一，取值范围：1~ 2^32-1，默认为1
server-id=1
#是否只读，1代表只读，0代表读写
read-only=0

#忽略的数据，指不需要同步的数据库
#binlog-ignore-db=mysql

#指定同步的数据库
#binlog-do-db=db01
```

2. 执行完毕之后，需要重启Mysql

```shell
systemctl restart mysqld
```

3. 登录mysql，创建远程连接的账号，并授予主从复制权限

```sql
# 创建itcast用户，并设置密码，该用户可在任意主机连接该MySQL服务
CREATE USER 'hellocode'@'%' IDENTIFIED WITH mysql_native_password BY 'Root@123456';

# 为 'hellocode'@'%' 用户分配主从复制权限
GRANT REPLICATION SLAVE ON *.* TO 'hellocode'@'%';
```

4. 通过指令，查看二进制日志坐标

```sql
show master status;
```

![image-20220419104027294](http://images.hellocode.top/Y8QXe9vmSbCDZgp.png)

字段含义：

- File : 从哪个日志文件开始推送日志文件 
- Position ： 从哪个位置开始推送日志
- Binlog_Ignore_DB : 指定不需要同步的数据库

**从库配置**

1. 在 slave 端配置文件中，配置如下内容：

```shell
#mysql服务ID，保证整个集群环境中唯一，取值范围：1-232-1，和主库不一样即可
server-id=2
#是否只读，1代表只读，0代表读写
read-only=1
# 上述只读是针对普通用户的，如果要让超级管理员也是只读，可设置
super-read-only=1
```

2. 执行完毕之后，需要重启Mysql：

```shell
systemctl restart mysqld
```

3. 登录mysql，设置主库配置

```sql
CHANGE REPLICATION SOURCE TO SOURCE_HOST='101.201.100.130', SOURCE_USER='hellocode', SOURCE_PASSWORD='Root@123456', SOURCE_LOG_FILE='binlog.000001', SOURCE_LOG_POS=156;

# 上述是8.0.23中的语法。如果mysql是8.0.23之前的版本，执行如下SQL：
CHANGE MASTER TO MASTER_HOST='101.201.100.130', MASTER_USER='hellocode', MASTER_PASSWORD='Root@123456', MASTER_LOG_FILE='binlog.000001', MASTER_LOG_POS=156;
```

| 参数名          | 含义               | 8.0.23之前      |
| --------------- | ------------------ | --------------- |
| SOURCE_HOST     | 主库IP地址         | MASTER_HOST     |
| SOURCE_USER     | 连接主库的用户名   | MASTER_USER     |
| SOURCE_PASSWORD | 连接主库的密码     | MASTER_PASSWORD |
| SOURCE_LOG_FILE | binlog日志文件名   | MASTER_LOG_FILE |
| SOURCE_LOG_POS  | binlog日志文件位置 | MASTER_LOG_POS  |

4. 开启同步操作，查看主从同步状态

```sql
# 8.0.22 之后
start replica
# 8.0.22 之前
start slave


#查看主从同步状态
#8.0.22 之后
show replica status[\G]
#8.0.22 之前
show slave status[\G]
```

![img](http://images.hellocode.top/1242944-20200731220615750-785367599.png)

5. 查看是否成功，主要看 `replica_IO_Running` 和 `replica_SQL_Running`（都为YES）

![img](http://images.hellocode.top/1242944-20200731221210968-1090580385.png)



 注意：要保证上面两项都为YES,出现IO:NO的情况可能是我们两台主从服务器的UUID是相同的(因为我的两台虚拟机是安装过数据库之后克隆的,所以数据库所有信息一样)

解决:

分别去看看两台服务器的`/var/lib/mysql/auto.cof`果然UUID是相同的，随便改变一个数据库的UUID的数值，然后重启数据库

![img](http://images.hellocode.top/1242944-20200731221635857-1450230561.png)

![img](http://images.hellocode.top/1242944-20200731221722951-998507162.png)

再次执行

```sql
show slave status \G;
```

![img](http://images.hellocode.top/1242944-20200731221803140-480517976.png)

**验证同步操作**

1. 在主库中创建数据库，创建表，并插入数据 ：

```sql
create database db01;

use db01;

create table user(
    id int(11) not null auto_increment,
    name varchar(50) not null,
    sex varchar(1),
    primary key (id)
)engine=innodb default charset=utf8;

insert into user(id,name,sex) values(null,'Tom','1');
insert into user(id,name,sex) values(null,'Trigger','0');
insert into user(id,name,sex) values(null,'Dawn','1');
```

2. 在从库中查询数据，进行验证：

在从库中，可以查看到刚才创建的数据库

在该数据库中，查询user表中的数据：

![img](http://images.hellocode.top/1242944-20200731222432112-1110811858.png)

## 十六、分库分表

### 1、介绍

随着互联网及移动互联网的发展，应用系统的数据量也是呈指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：

1. IO瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘IO，效率较低。请求数据太多，宽带不够，网络IO瓶颈
2. CPU瓶颈：排序、分组、连接查询、聚合统计等SQL会耗费大量的CPU资源，请求数太多，CPU出现瓶颈

![img](http://images.hellocode.top/2217415-20220512215307597-374820340.png)

分库分表的中心思想就是将数据库分散存储，使得单一数据库/表的数据量变小来缓解单一数据库的性能问题，从而达到提升数据库性能的目的

**拆分方式**

分库分表的形式，主要是两种：垂直拆分和水平拆分。而拆分的粒度，一般又分为分库和分表，所以组成的拆分策略最终如下：
![img](http://images.hellocode.top/2217415-20220512215408794-246910451.png)

**垂直拆分**

*垂直分库*
![img](http://images.hellocode.top/2217415-20220512215437084-239767106.png)

垂直分库：以表为依据，根据业务将不同表拆分到不同库中

特点：

- 每个库的表结构都不一样。
- 每个库的数据也不一样。
- 所有库的并集是全量数据。

*垂直分表*
![img](http://images.hellocode.top/2217415-20220512215511640-657981669.png)

垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中

特点：

- 每个表的结构都不一样。
- 每个表的数据也不一样，一般通过一列（主键/外键）关联。
- 所有表的并集是全量数据

**水平拆分**

*水平分库*
![img](http://images.hellocode.top/2217415-20220512215554280-634496619.png)



水平分库：以字段为依据，按照一定策略，将一个库的数据拆分到多个库中。

特点：

- 每个库的表结构都一样。
- 每个库的数据都不一样。
- 所有库的并集是全量数据。

*水平分表*
![img](http://images.hellocode.top/2217415-20220512215631589-1629183972.png)

水平分表：以字段为依据，按照一定策略，将一个表的数据拆分到多个表中。

特点：

- 每个表的表结构都一样。
- 每个表的数据都不一样。
- 所有表的并集是全量数据。

> 在业务系统中，为了缓解磁盘IO及CPU的性能瓶颈，到底是垂直拆分，还是水平拆分；具体是分库，还是分表，都需要根据具体的业务需求具体分析。

**实现技术**

- shardingJDBC：基于AOP原理，在应用程序中对本地执行的SQL进行拦截，解析、改写、路由处理。需要自行编码配置实现，只支持java语言，性能较高。
- MyCat：数据库分库分表中间件，不用调整代码即可实现分库分表，支持多种语言，性能不及前者。

![img](http://images.hellocode.top/2217415-20220512215735065-623054692.png)
我们选择了是MyCat数据库中间件，通过MyCat中间件来完成分库分表操作。

### 2、Mycat概述

Mycat是开源的、活跃的、基于Java语言编写的MySQL数据库中间件。可以像使用mysql一样来使用mycat，对于开发人员来说根本感觉不到mycat的存在

开发人员只需要连接MyCat即可，而具体底层用到几台数据库，每一台数据库服务器里面存储了什么数据，都无需关心。 具体的分库分表的策略，只需要在MyCat中配置即可
![img](http://images.hellocode.top/2217415-20220512215812093-34303603.png)

优势：

- 性能可靠稳定
- 强大的技术团队
- 体系完善
- 社区活跃

**下载**

- 下载地址：http://dl.mycat.org.cn/
  ![img](http://images.hellocode.top/2217415-20220513194237035-2076682590.png)

  Mycat是采用java语言开发的开源的数据库中间件，支持Windows和Linux运行环境，下面介绍MyCat的Linux中的环境搭建。我们需要在准备好的服务器中安装如下软件。

- MySQL
- JDK
- Mycat

| 服务器          | 安装软件   | 说明              |
| --------------- | ---------- | ----------------- |
| 192.168.200.210 | JDK、Mycat | MyCat中间件服务器 |
| 192.168.200.210 | MySQL      | 分片服务器        |
| 192.168.200.213 | MySQL      | 分片服务器        |
| 192.168.200.214 | MySQL      | 分片服务器        |

**目录介绍**

![img](http://images.hellocode.top/2217415-20220513194518492-1782367079.png)

- bin : 存放可执行文件，用于启动停止mycat
- conf：存放mycat的配置文件
- lib：存放mycat的项目依赖包（jar）
- logs：存放mycat的日志文件

**概念介绍**

在MyCat的整体结构中，分为两个部分：上面的逻辑结构、下面的物理结构。
![img](http://images.hellocode.top/2217415-20220513194611034-1187632995.png)



在MyCat的逻辑结构主要负责逻辑库、逻辑表、分片规则、分片节点等逻辑结构的处理，而具体的数据存储还是在物理结构，也就是数据库服务器中存储的。

在后面讲解MyCat入门以及MyCat分片时，还会讲到上面所提到的概念。

### 3、Mycat入门

由于 tb_order 表中数据量很大，磁盘IO及容量都到达了瓶颈，现在需要对 tb_order 表进行数据分片，分为三个数据节点，每一个节点主机位于不同的服务器上, 具体的结构，参考下图：
![img](http://images.hellocode.top/2217415-20220513194730702-39688177.png)



#### 3.1. 环境准备

准备3台服务器：

- 192.168.200.210：MyCat中间件服务器，同时也是第一个分片服务器。

- 192.168.200.213：第二个分片服务器。

- 192.168.200.214：第三个分片服务器。
  ![img](http://images.hellocode.top/2217415-20220513194804633-1167785275.png)

  并且在上述3台数据库中创建数据库 db01

#### 3.2. 配置

**schema.xml**

在schema.xml中配置逻辑库、逻辑表、数据节点、节点主机等相关信息。具体的配置如下：

![img](http://images.hellocode.top/25626c3f88bf43d39088703a28927325.png)

```xml
<?xml version="1.0"?> <!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    <schema name="DB01" checkSQLschema="true" sqlMaxLimit="100">
        <table name="TB_ORDER" dataNode="dn1,dn2,dn3" rule="auto-sharding-long"/>
    </schema>
    <dataNode name="dn1" dataHost="dhost1" database="db01"/>
    <dataNode name="dn2" dataHost="dhost2" database="db01"/>
    <dataNode name="dn3" dataHost="dhost3" database="db01"/>
    <dataHost name="dhost1" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.210:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
    <dataHost name="dhost2" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.213:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
    <dataHost name="dhost3" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.214:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
</mycat:schema>
```

**server.xml**

需要在server.xml中配置用户名、密码，以及用户的访问权限信息，具体的配置如下：

```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">DB01
    </property> <!-- 表级 DML 权限设置 -->
    <!-- <privileges check="true"> 
    <schema name="DB01" dml="0110" > 
    <table name="TB_ORDER" dml="1110"></table> 
    </schema> 
    </privileges> -->
</user>
<user name="user">
    <property name="password">123456</property>
    <property name="schemas">DB01</property>
    <property name="readOnly">true</property>
</user>
```

上述的配置表示，定义了两个用户 root 和 user ，这两个用户都可以访问 DB01 这个逻辑库，访问密码都是123456，但是root用户访问DB01逻辑库，既可以读，又可以写，但是 user用户访问DB01逻辑库是只读的。

#### 3.3. 测试

**启动**

配置完毕后，先启动涉及到的3台分片服务器，然后启动MyCat服务器。切换到Mycat的安装目录，执行如下指令，启动Mycat：

```bash
#启动 
bin/mycat start 

#停止 
bin/mycat stop
```

Mycat启动之后，占用端口号 8066。
启动完毕之后，可以查看logs目录下的启动日志，查看Mycat是否启动完成

![img](http://images.hellocode.top/2217415-20220513202528432-1618467100.png)

**测试**

1. 连接MyCat

   通过如下指令，就可以连接并登陆MyCat。

```css
mysql -h 192.168.200.210 -P 8066 -uroot -p123456
```

我们看到我们是通过MySQL的指令来连接的MyCat，因为MyCat在底层实际上是模拟了MySQL的协议

2. 数据测试

   然后就可以在MyCat中来创建表，并往表结构中插入数据，查看数据在MySQL中的分布情况。

```sql
CREATE TABLE TB_ORDER ( 
    id BIGINT(20) NOT NULL,
    title VARCHAR(100) NOT NULL , 
    PRIMARY KEY (id) 
) ENGINE=INNODB DEFAULT CHARSET=utf8 ; 

INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1'); 
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2'); 
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3'); 
INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1'); 
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2'); 
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3');
INSERT INTO TB_ORDER(id,title) VALUES(5000000,'goods5000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(10000000,'goods10000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(10000001,'goods10000001'); 
INSERT INTO TB_ORDER(id,title) VALUES(15000000,'goods15000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(15000001,'goods15000001');
```

经过测试，我们发现，在往 TB_ORDER 表中插入数据时：

- 如果id的值在1-500w之间，数据将会存储在第一个分片数据库中。
- 如果id的值在500w-1000w之间，数据将会存储在第二个分片数据库中。
- 如果id的值在1000w-1500w之间，数据将会存储在第三个分片数据库中。
- 如果id的值超出1500w，在插入数据时，将会报错。

为什么会出现这种现象，数据到底落在哪一个分片服务器到底是如何决定的呢？ 

这是由逻辑表配置时的一个参数 rule 决定的，而这个参数配置的就是分片规则，关于分片规则的配置，在后面会详细讲解。

### 4、Mycat配置

#### 4.1. schema.xml

schema.xml 作为MyCat中最重要的配置文件之一 , 涵盖了MyCat的逻辑库 、 逻辑表 、 分片规则、分片节点及数据源的配置

![img](http://images.hellocode.top/2217415-20220513202851266-327059999.png)

主要包含以下三组标签：

- schema标签
- datanode标签
- datahost标签

**schema标签**

*schema 定义逻辑库*

![img](http://images.hellocode.top/2217415-20220513202928349-177943302.png)

- schema 标签用于定义 MyCat实例中的逻辑库 , 一个MyCat实例中, 可以有多个逻辑库 , 可以通过 schema 标签来划分不同的逻辑库。

- MyCat中的逻辑库的概念，等同于MySQL中的database概念, 需要操作某个逻辑库下的表时, 也需要切换逻辑库(use xxx)。

核心属性：

- name：指定自定义的逻辑库库名
- checkSQLschema：在SQL语句操作时指定了数据库名称，执行时是否自动去除；true：自动去除，false：不自动去除
- sqlMaxLimit：如果未指定limit进行查询，列表查询模式查询多少条记录



*schema 中的table定义逻辑表*

![img](http://images.hellocode.top/2217415-20220513203021695-1374076442.png)

table 标签定义了MyCat中逻辑库schema下的逻辑表 , 所有需要拆分的表都需要在table标签中定义 。

核心属性：

- name：定义逻辑表表名，在该逻辑库下唯一
- dataNode：定义逻辑表所属的dataNode，该属性需要与dataNode标签中name对应；多个dataNode逗号分隔
- rule：分片规则的名字，分片规则名字是在rule.xml中定义的
- primaryKey：逻辑表对应真实表的主键
- type：逻辑表的类型，目前逻辑表只有全局表和普通表，如果未配置，就是普通表；全局表，配置为 global

**datanode标签**

![img](http://images.hellocode.top/2217415-20220513203119347-1915658075.png)

核心属性：

- name：定义数据节点名称
- dataHost：数据库实例主机名称，引用自 dataHost 标签中name属性
- database：定义分片所属数据库

**datahost标签**

![img](http://images.hellocode.top/2217415-20220513203236054-1407981822.png)

该标签在MyCat逻辑库中作为底层标签存在, 直接定义了具体的数据库实例、读写分离、心跳语句。

核心属性：

- name：唯一标识，供上层标签使用
- maxCon/minCon：最大连接数/最小连接数
- balance：负载均衡策略，取值 0,1,2,3
- writeType：写操作分发方式（0：写操作转发到第一个writeHost，第一个挂了，切换到第二个；1：写操作随机分发到配置的writeHost）
- dbDriver：数据库驱动，支持 native、jdbc

#### 4.2. rule.xml

rule.xml中定义所有拆分表的规则, 在使用过程中可以灵活的使用分片算法, 或者对同一个分片算法使用不同的参数, 它让分片过程可配置化。主要包含两类标签：tableRule、Function

![img](http://images.hellocode.top/2217415-20220513203343156-35625421.png)

#### 4.3. server.xml

server.xml配置文件包含了MyCat的系统配置信息，主要有两个重要的标签：system、user

**system标签**

![img](http://images.hellocode.top/2217415-20220513203408597-1951177798.png)

主要配置MyCat中的系统配置信息，对应的系统配置项及其含义，如下：

| 属性                      | 取值       | 含义                                                         |
| :------------------------ | :--------- | :----------------------------------------------------------- |
| charset                   | utf8       | 设置Mycat的字符集, 字符集需要与MySQL的 字符集保持一致        |
| nonePasswordLogin         | 0,1        | 0为需要密码登陆、1为不需要密码登陆 ,默认 为0，设置为1则需要指定默认账户 |
| useHandshakeV10           | 0,1        | 使用该选项主要的目的是为了能够兼容高版本 的jdbc驱动, 是否采用 HandshakeV10Packet来与client进行通 信, 1:是, 0:否 |
| useSqlStat                | 0,1        | 开启SQL实时统计, 1 为开启 , 0 为关闭 ; 开启之后, MyCat会自动统计SQL语句的执行 情况 ; mysql -h 127.0.0.1 -P 9066 -u root -p 查看MyCat执行的SQL, 执行 效率比较低的SQL , SQL的整体执行情况、读 写比例等 ; show @@sql ; show @@sql.slow ; show @@sql.sum ; |
| useGlobleTableCheck       | 0,1        | 是否开启全局表的一致性检测。1为开启 ，0 为关闭 。            |
| sqlExecuteTimeout         | 1000       | SQL语句执行的超时时间 , 单位为 s ;                           |
| sequnceHandlerType        | 0,1,2      | 用来指定Mycat全局序列类型，0 为本地文 件，1 为数据库方式，2 为时间戳列方式，默 认使用本地文件方式，文件方式主要用于测试 |
| sequnceHandlerPattern     | 正则表达式 | 必须带有MYCATSEQ或者 mycatseq进入序列 匹配流程 注意MYCATSEQ_有空格的情况 |
| subqueryRelationshipCheck | true,false | 子查询中存在关联查询的情况下,检查关联字 段中是否有分片字段 .默认 false |
| useCompression            | 0,1        | 开启mysql压缩协议 , 0 : 关闭, 1 : 开 启                      |
| fakeMySQLVersion          | 5.5,5.6    | 设置模拟的MySQL版本号                                        |
| defaultSqlParser          |            | 由于MyCat的最初版本使用了FoundationDB 的SQL解析器, 在MyCat1.3后增加了Druid 解析器, 所以要设置defaultSqlParser属 性来指定默认的解析器; 解析器有两个 : druidparser 和 fdbparser, 在 MyCat1.4之后,默认是druidparser, fdbparser已经废除了 |
| processors                | 1,2....    | 指定系统可用的线程数量, 默认值为CPU核心 x 每个核心运行线程数量; processors 会 影响processorBufferPool, processorBufferLocalPercent, processorExecutor属性, 所有, 在性能 调优时, 可以适当地修改processors值 |
| processorBufferChunk      |            | 指定每次分配Socket Direct Buffer默认 值为4096字节, 也会影响BufferPool长度, 如果一次性获取字节过多而导致buffer不够 用, 则会出现警告, 可以调大该值 |
| processorExecutor         |            | 指定NIOProcessor上共享 businessExecutor固定线程池的大小; MyCat把异步任务交给 businessExecutor 线程池中, 在新版本的MyCat中这个连接池使 用频次不高, 可以适当地把该值调小 |
| packetHeaderSize          |            | 指定MySQL协议中的报文头长度, 默认4个字 节                    |
| maxPacketSize             |            | 指定MySQL协议可以携带的数据最大大小, 默 认值为16M            |
| idleTimeout               | 30         | 指定连接的空闲时间的超时长度;如果超时,将 关闭资源并回收, 默认30分钟 |
| txIsolation               | 1,2,3,4    | 初始化前端连接的事务隔离级别,默认为 REPEATED_READ , 对应数字为3 READ_UNCOMMITED=1; READ_COMMITTED=2; REPEATED_READ=3; SERIALIZABLE=4; |
| sqlExecuteTimeout         | 300        | 执行SQL的超时时间, 如果SQL语句执行超时, 将关闭连接; 默认300秒; |
| serverPort                | 8066       | 定义MyCat的使用端口, 默认8066                                |
| managerPort               | 9066       | 定义MyCat的管理端口, 默认9066                                |

**user标签**

配置MyCat中的用户、访问密码，以及用户针对于逻辑库、逻辑表的权限信息，具体的权限描述方式及配置说明如下：

![img](http://images.hellocode.top/2217415-20220513204620930-322222562.png)

在测试权限操作时，我们只需要将 privileges 标签的注释放开。 在 privileges 下的schema标签中配置的dml属性配置的是逻辑库的权限。 在privileges的schema下的table标签的dml属性中配置逻辑表的权限

### 5、Mycat分片

#### 5.1. 垂直拆分

**场景**

在业务系统中, 涉及以下表结构 ,但是由于用户与订单每天都会产生大量的数据, 单台服务器的数据存储及处理能力是有限的, 可以对数据库表进行拆分, 原有的数据库表如下

![img](http://images.hellocode.top/2217415-20220513204722380-1601416460.png)

现在考虑将其进行垂直分库操作，将商品相关的表拆分到一个数据库服务器，订单表拆分的一个数据库服务器，用户及省市区表拆分到一个服务器。最终结构如下：

![img](http://images.hellocode.top/2217415-20220513204751306-321557460.png)

**准备**

准备三台服务器，IP地址如图所示：

![img](http://images.hellocode.top/2217415-20220513204820264-651764290.png)

并且在192.168.200.210，192.168.200.213, 192.168.200.214上面创建数据库shopping。

**配置**

*schema.xml*

```xml
<schema name="SHOPPING" checkSQLschema="true" sqlMaxLimit="100">
    <table name="tb_goods_base" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_brand" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_cat" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_desc" dataNode="dn1" primaryKey="goods_id"/>
    <table name="tb_goods_item" dataNode="dn1" primaryKey="id"/>
    
    <table name="tb_order_item" dataNode="dn2" primaryKey="id"/>
    <table name="tb_order_master" dataNode="dn2" primaryKey="order_id"/>
    <table name="tb_order_pay_log" dataNode="dn2" primaryKey="out_trade_no"/>
    
    <table name="tb_user" dataNode="dn3" primaryKey="id"/>
    <table name="tb_user_address" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_provinces" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_city" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_region" dataNode="dn3" primaryKey="id"/>
</schema>

<dataNode name="dn1" dataHost="dhost1" database="shopping"/>
<dataNode name="dn2" dataHost="dhost2" database="shopping"/>
<dataNode name="dn3" dataHost="dhost3" database="shopping"/>

<dataHost name="dhost1" maxCon="1000" minCon="10" balance="0"
          writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1"
          slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.210:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost> 


<dataHost name="dhost2" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
          switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.213:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost>


<dataHost name="dhost3" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
          switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.214:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost>
```

*server.xml*

```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING</property>
    
    <!-- 表级 DML 权限设置 -->
    <!-- 
    <privileges check="true"> 
        <schema name="DB01" dml="0110" > 
            <table name="TB_ORDER" dml="1110"></table> 
        </schema> 
    </privileges> 
    -->
</user>

<user name="user">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING</property>
    <property name="readOnly">true</property>
</user>
```

**测试**

1. 上传测试SQL脚本到服务器的/root目录
   ![img](http://images.hellocode.top/2217415-20220513205837094-1786950836.png)

2. 执行指令导入测试数据

   重新启动MyCat后，在mycat的命令行中，通过source指令导入表结构，以及对应的数据，查看数据分布情况。

```bash
source /root/shopping-table.sql 
source /root/shopping-insert.sql
```

将表结构及对应的测试数据导入之后，可以检查一下各个数据库服务器中的表结构分布情况。 检查是否和我们准备工作中规划的服务器一致

![img](http://images.hellocode.top/2217415-20220513205849219-156893366.png)

3. 查询用户的收件人及收件人地址信息(包含省、市、区)。 在MyCat的命令行中，当我们执行以下多表联查的SQL语句时，可以正常查询出数据。

```csharp
select ua.user_id, ua.contact, p.province, c.city, r.area , ua.address from tb_user_address ua ,tb_areas_city c , tb_areas_provinces p ,tb_areas_region r 
where ua.province_id = p.provinceid and ua.city_id = c.cityid and ua.town_id = r.areaid ;
```

![img](http://images.hellocode.top/2217415-20220513205902645-500807341.png)

4. 查询每一笔订单及订单的收件地址信息(包含省、市、区)。

实现该需求对应的SQL语句如下：

```sql
SELECT order_id , payment ,receiver, province , city , area FROM tb_order_master o , tb_areas_provinces p , tb_areas_city c , tb_areas_region r 
WHERE o.receiver_province = p.provinceid AND o.receiver_city = c.cityid AND o.receiver_region = r.areaid ;
```

但是现在存在一个问题，订单相关的表结构是在 192.168.200.213 数据库服务器中，而省市区的数据库表是在 192.168.200.214 数据库服务器中。那么在MyCat中执行是否可以成功呢？

![img](http://images.hellocode.top/2217415-20220513210003468-1720428993.png)

经过测试，我们看到，SQL语句执行报错。原因就是因为MyCat在执行该SQL语句时，需要往具体的数据库服务器中路由，而当前没有一个数据库服务器完全包含了订单以及省市区的表结构，造成SQL语句失败，报错。

对于上述的这种现象，我们如何来解决呢？ 下面我们介绍的全局表，就可以轻松解决这个问题。

**全局表**

对于省、市、区/县表tb_areas_provinces , tb_areas_city , tb_areas_region，是属于数据字典表，在多个业务模块中都可能会遇到，可以将其设置为全局表，利于业务操作。

修改schema.xml中的逻辑表的配置，修改 tb_areas_provinces、tb_areas_city、tb_areas_region 三个逻辑表，增加 type 属性，配置为global，就代表该表是全局表，就会在所涉及到的dataNode中创建给表。对于当前配置来说，也就意味着所有的节点中都有该表了。

```xml
<table name="tb_areas_provinces" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/> 
<table name="tb_areas_city" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/> 
<table name="tb_areas_region" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/>
```

![img](http://images.hellocode.top/2217415-20220513210212828-1507611425.png)

配置完毕后，重新启动MyCat。

1. 删除原来每一个数据库服务器中的所有表结构
2. 通过source 指令，导入表及数据

```bash
source /root/shopping-table.sql 
source /root/shopping-insert.sql
```

3. 检查每一个数据库服务器中的表及数据分布，看到三个节点中都有这三张全局表
4. 然后再次执行上面的多表联查的SQL语句

```sql
SELECT order_id , payment ,receiver, province , city , area FROM tb_order_master o , tb_areas_provinces p , tb_areas_city c , tb_areas_region r 
WHERE o.receiver_province = p.provinceid AND o.receiver_city = c.cityid AND o.receiver_region = r.areaid ;
```

![img](http://images.hellocode.top/2217415-20220513210315258-370014658.png)

​	是可以正常执行成功的

5. 当在MyCat中更新全局表的时候，我们可以看到，所有分片节点中的数据都发生了变化，每个节点的全局表数据时刻保持一致。

#### 5.2. 水平拆分

**场景**

在业务系统中, 有一张表(日志表), 业务系统每天都会产生大量的日志数据 , 单台服务器的数据存储及处理能力是有限的, 可以对数据库表进行拆分

![img](http://images.hellocode.top/2217415-20220513210553428-1766243949.png)

**准备**

准备三台服务器，具体的结构如下：

![img](http://images.hellocode.top/2217415-20220513210629501-1792837929.png)

并且，在三台数据库服务器中分表创建一个数据库itcast。

**配置**

*schema.xml*

```xml
<schema name="ITCAST" checkSQLschema="true" sqlMaxLimit="100"> 
  <table name="tb_log" dataNode="dn4,dn5,dn6" primaryKey="id" rule="mod-long" /> 
</schema> 

<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

tb_log表最终落在3个节点中，分别是 dn4、dn5、dn6 ，而具体的数据分别存储在 dhost1、dhost2、dhost3的itcast数据库中

*server.xml*

配置root用户既可以访问 SHOPPING 逻辑库，又可以访问ITCAST逻辑库。

```xml
<user name="root" defaultAccount="true">
<property name="password">123456</property>
<property name="schemas">SHOPPING,ITCAST
</property>
    <!-- 表级 DML 权限设置 -->
    <!--
    <privileges check="true">
        <schema name="DB01" dml="0110" >
            <table name="TB_ORDER" dml="1110"></table>
        </schema>
    </privileges>
    -->
</user>
```

**测试**

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
CREATE TABLE tb_log ( 
    id bigint(20) NOT NULL COMMENT 'ID', 
    model_name varchar(200) DEFAULT NULL COMMENT '模块名', 
    model_value varchar(200) DEFAULT NULL COMMENT '模块值', 
    return_value varchar(200) DEFAULT NULL COMMENT '返回值', 
    return_class varchar(200) DEFAULT NULL COMMENT '返回值类型', 
    operate_user varchar(20) DEFAULT NULL COMMENT '操作用户', 
    operate_time varchar(20) DEFAULT NULL COMMENT '操作时间', 
    param_and_value varchar(500) DEFAULT NULL COMMENT '请求参数名及参数值', 
    operate_class varchar(200) DEFAULT NULL COMMENT '操作类', 
    operate_method varchar(200) DEFAULT NULL COMMENT '操作方法', 
    cost_time bigint(20) DEFAULT NULL COMMENT '执行方法耗时, 单位 ms', 
    source int(1) DEFAULT NULL COMMENT '来源 : 1 PC , 2 Android , 3 IOS', 
    PRIMARY KEY (id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```sql
INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('1','user','insert','success','java.lang.String','10001','2022-01-06 18:12:28','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','insert','10',1); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('2','user','insert','success','java.lang.String','10001','2022-01-06 18:12:27','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','insert','23',1); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('3','user','update','success','java.lang.String','10001','2022-01-06 18:16:45','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','update','34',1);

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('4','user','update','success','java.lang.String','10001','2022-01-06 18:16:45','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','update','13',2); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('5','user','insert','success','java.lang.String','10001','2022-01-06 18:30:31','{\"age\":\"200\",\"name\":\"TomCat\",\"gender\":\"0\"}','cn.itcast.co ntroller.UserController','insert','29',3); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('6','user','find','success','java.lang.String','10001','2022-01-06 18:30:31','{\"age\":\"200\",\"name\":\"TomCat\",\"gender\":\"0\"}','cn.itcast.co ntroller.UserController','find','29',2);
```

#### 5.3. 分片规则

**范围分片**

*介绍*

根据指定的字段及其配置的范围与数据节点的对应情况， 来决定该数据属于哪一个分片

![](http://images.hellocode.top/2217415-20220513211442833-1629450749.png)

*配置*

schema.xml逻辑表配置：

```lua
<table name="TB_ORDER" dataNode="dn1,dn2,dn3" rule="auto-sharding-long" />
```

schema.xml数据节点配置：

```xml
<dataNode name="dn1" dataHost="dhost1" database="db01" /> 
<dataNode name="dn2" dataHost="dhost2" database="db01" /> 
<dataNode name="dn3" dataHost="dhost3" database="db01" />
```

rule.xml分片规则配置：

```xml
<tableRule name="auto-sharding-long">
    <rule>
        <columns>id</columns>
        <algorithm>rang-long</algorithm>
    </rule>
</tableRule> 

<function name="rang-long" class="io.mycat.route.function.AutoPartitionByLong">
    <property name="mapFile">autopartition-long.txt</property>
    <property name="defaultNode">0</property>
</function>
```

分片规则配置属性含义：

| 属性        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| columns     | 标识将要分片的表字段                                         |
| algorithm   | 指定分片函数与function的对应关系                             |
| class       | 指定该分片算法对应的类                                       |
| mapFile     | 对应的外部配置文件                                           |
| type        | 默认值为0 ; 0 表示Integer , 1 表示String                     |
| defaultNode | 默认节点 默认节点的所用:枚举分片时,如果碰到不识别的枚举值, 就让它路由到默认节点 ; 如果没有默认值,碰到不识别的则报错 。 |

在rule.xml中配置分片规则时，关联了一个映射配置文件 autopartition-long.txt，该配置文件的配置如下：

```ini
# range start-end ,data node index 
# K=1000,M=10000. 
0-500M=0 
500M-1000M=1 
1000M-1500M=2
```

含义：0-500万之间的值，存储在0号数据节点(数据节点的索引从0开始) ； 500万-1000万之间的数据存储在1号数据节点 ； 1000万-1500万的数据节点存储在2号节点 ；

该分片规则，主要是针对于数字类型的字段适用。 在MyCat的入门程序中，我们使用的就是该分片规则。

**取模分片**

*介绍*

根据指定的字段值与节点数量进行求模运算，根据运算结果， 来决定该数据属于哪一个分片。

![image-20230210140442414](http://images.hellocode.top/image-20230210140442414.png)

*配置*

schema.xml逻辑表配置：

```lua
<table name="tb_log" dataNode="dn4,dn5,dn6" primaryKey="id" rule="mod-long" />
```

schema.xml数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml分片规则配置：

```xml
<tableRule name="mod-long">
    <rule>
        <columns>id</columns>
        <algorithm>mod-long</algorithm>
    </rule>
</tableRule> 

<function name="mod-long" class="io.mycat.route.function.PartitionByMod">
    <property name="count">3</property>
</function>
```

分片规则属性说明如下：

| 属性      | 描述                             |
| :-------- | :------------------------------- |
| columns   | 标识将要分片的表字段             |
| algorithm | 指定分片函数与function的对应关系 |
| class     | 指定该分片算法对应的类           |
| count     | 数据节点的数量                   |

该分片规则，主要是针对于数字类型的字段适用。 在前面水平拆分的演示中，我们选择的就是取模分片。

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

**一致性hash分片**

*介绍*

所谓一致性哈希，相同的哈希因子计算值总是被划分到相同的分区表中，不会因为分区节点的增加而改变原来数据的分区位置，有效的解决了分布式数据的拓容问题。

![img](http://images.hellocode.top/2217415-20220514182248342-215233009.png)

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 一致性hash --> 
<table name="tb_order" dataNode="dn4,dn5,dn6" rule="sharding-by-murmur" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-murmur">
    <rule>
        <columns>id</columns>
        <algorithm>murmur</algorithm>
    </rule>
</tableRule>

<function name="murmur" class="io.mycat.route.function.PartitionByMurmurHash">
    <property name="seed">0</property><!-- 默认是0 -->
    <property name="count">3</property>
    <property name="virtualBucketTimes">160</property>
</function>
```

分片规则属性含义：

| 属性               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| columns            | 标识将要分片的表字段                                         |
| algorithm          | 指定分片函数与function的对应关系                             |
| class              | 指定该分片算法对应的类                                       |
| seed               | 创建murmur_hash对象的种子，默认0                             |
| count              | 要分片的数据库节点数量，必须指定，否则没法分片               |
| virtualBucketTimes | 一个实际的数据库节点被映射为这么多虚拟节点，默认是160倍，也就是虚拟节点数是物理节点数的160倍;virtualBucketTimes*count就是虚拟结点数量 ; |
| weightMapFile      | 节点的权重，没有指定权重的节点默认是1。以properties文件的格式填写，以从0开始到count-1的整数值也就是节点索引为key，以节点权重值为值。所有权重值必须是正整数，否则以1代替 |
| bucketMapPath      | 用于测试时观察各物理节点与虚拟节点的分布情况，如果指定了这个属性，会把虚拟节点的murmur hash值与物理节点的映射按行输出到这个文件，没有默认值，如果不指定，就不会输出任何东西 |

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
create table tb_order( id varchar(100) not null primary key, money int null, content varchar(200) null );

INSERT INTO tb_order (id, money, content) VALUES ('b92fdaaf-6fc4-11ec-b831- 482ae33c4a2d', 10, 'b92fdaf8-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b93482b6-6fc4-11ec-b831- 482ae33c4a2d', 20, 'b93482d5-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b937e246-6fc4-11ec-b831- 482ae33c4a2d', 50, 'b937e25d-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b93be2dd-6fc4-11ec-b831- 482ae33c4a2d', 100, 'b93be2f9-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b93f2d68-6fc4-11ec-b831- 482ae33c4a2d', 130, 'b93f2d7d-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b9451b98-6fc4-11ec-b831- 482ae33c4a2d', 30, 'b9451bcc-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b9488ec1-6fc4-11ec-b831- 482ae33c4a2d', 560, 'b9488edb-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b94be6e6-6fc4-11ec-b831- 482ae33c4a2d', 10, 'b94be6ff-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b94ee10d-6fc4-11ec-b831- 482ae33c4a2d', 123, 'b94ee12c-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b952492a-6fc4-11ec-b831- 482ae33c4a2d', 145, 'b9524945-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b95553ac-6fc4-11ec-b831- 482ae33c4a2d', 543, 'b95553c8-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b9581cdd-6fc4-11ec-b831- 482ae33c4a2d', 17, 'b9581cfa-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b95afc0f-6fc4-11ec-b831- 482ae33c4a2d', 18, 'b95afc2a-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b95daa99-6fc4-11ec-b831- 482ae33c4a2d', 134, 'b95daab2-6fc4-11ec-b831-482ae33c4a2d');

INSERT INTO tb_order (id, money, content) VALUES ('b9667e3c-6fc4-11ec-b831- 482ae33c4a2d', 156, 'b9667e60-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b96ab489-6fc4-11ec-b831- 482ae33c4a2d', 175, 'b96ab4a5-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b96e2942-6fc4-11ec-b831- 482ae33c4a2d', 180, 'b96e295b-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b97092ec-6fc4-11ec-b831- 482ae33c4a2d', 123, 'b9709306-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b973727a-6fc4-11ec-b831- 482ae33c4a2d', 230, 'b9737293-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b978840f-6fc4-11ec-b831- 482ae33c4a2d', 560, 'b978843c-6fc4-11ec-b831-482ae33c4a2d');
```

**枚举分片**

*介绍*

通过在配置文件中配置可能的枚举值, 指定数据分布到不同数据节点上, 本规则适用于按照省份、性别、状态拆分数据等业务。

![img](http://images.hellocode.top/2217415-20220514182951394-368992556.png)

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 枚举 --> 
<table name="tb_user" dataNode="dn4,dn5,dn6" rule="sharding-by-intfile-enumstatus" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-intfile">
    <rule>
        <columns>sharding_id</columns>
        <algorithm>hash-int</algorithm>
    </rule>
</tableRule>

        <!-- 自己增加 tableRule -->
<tableRule name="sharding-by-intfile-enumstatus">
    <rule>
        <columns>status</columns>
        <algorithm>hash-int</algorithm>
    </rule>
</tableRule>

<function name="hash-int" class="io.mycat.route.function.PartitionByFileMap">
    <property name="defaultNode">2</property>
    <property name="mapFile">partition-hash-int.txt</property>
</function>
```

partition-hash-int.txt ，内容如下 :

```ini
1=0 
2=1 
3=2
```

分片规则属性含义：

| 属性        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| columns     | 标识将要分片的表字段                                         |
| algorithm   | 指定分片函数与function的对应关系                             |
| class       | 指定该分片算法对应的类                                       |
| mapFile     | 对应的外部配置文件                                           |
| type        | 默认值为0 ; 0 表示Integer , 1 表示String                     |
| defaultNode | 默认节点 ; 小于0 标识不设置默认节点 , 大于等于0代表设置默认节点 ;默认节点的所用:枚举分片时,如果碰到不识别的枚举值, 就让它路由到默认节点 ; 如果没有默认值,碰到不识别的则报错 。 |

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
CREATE TABLE tb_user ( 
    id bigint(20) NOT NULL COMMENT 'ID', 
    username varchar(200) DEFAULT NULL COMMENT '姓名', 
    status int(2) DEFAULT '1' COMMENT '1: 未启用, 2: 已启用, 3: 已关闭', 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_user (id,username ,status) values(1,'Tom',1); 
insert into tb_user (id,username ,status) values(2,'Cat',2); 
insert into tb_user (id,username ,status) values(3,'Rose',3); 
insert into tb_user (id,username ,status) values(4,'Coco',2); 
insert into tb_user (id,username ,status) values(5,'Lily',1);

insert into tb_user (id,username ,status) values(6,'Tom',1); 
insert into tb_user (id,username ,status) values(7,'Cat',2); 
insert into tb_user (id,username ,status) values(8,'Rose',3); 
insert into tb_user (id,username ,status) values(9,'Coco',2); 
insert into tb_user (id,username ,status) values(10,'Lily',1);
```

**应用指定算法**

*介绍*

运行阶段由应用自主决定路由到那个分片 , 直接根据字符子串（必须是数字）计算分片号。

![img](http://images.hellocode.top/2217415-20220514183549055-1971693108.png)
*配置*

schema.xml中逻辑表配置：

```xml
<!-- 应用指定算法 --> 
<table name="tb_app" dataNode="dn4,dn5,dn6" rule="sharding-by-substring" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-substring">
    <rule>
        <columns>id</columns>
        <algorithm>sharding-by-substring</algorithm>
    </rule>
</tableRule>

<function name="sharding-by-substring" class="io.mycat.route.function.PartitionDirectBySubString">
    <property name="startIndex">0</property> <!-- zero-based -->
    <property name="size">2</property>
    <property name="partitionCount">3</property>
    <property name="defaultPartition">0</property>
</function>
```

分片规则属性含义：

| 属性             | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| columns          | 标识将要分片的表字段                                         |
| algorithm        | 指定分片函数与function的对应关系                             |
| class            | 指定该分片算法对应的类                                       |
| startIndex       | 字符子串起始索引                                             |
| size             | 字符长度                                                     |
| partitionCount   | 分区(分片)数量                                               |
| defaultPartition | 默认分片(在分片数量定义时, 字符标示的分片编号不在分片数量内时,使用默认分片) |

示例说明 :

id=05-100000002 , 在此配置中代表根据id中从 startIndex=0，开始，截取siz=2位数字即05，05就是获取的分区，如果没找到对应的分片则默认分配到defaultPartition 。

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
CREATE TABLE tb_app ( 
    id varchar(10) NOT NULL COMMENT 'ID', 
    name varchar(200) DEFAULT NULL COMMENT '名称', 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_app (id,name) values('0000001','Testx00001'); 
insert into tb_app (id,name) values('0100001','Test100001'); 
insert into tb_app (id,name) values('0100002','Test200001'); 
insert into tb_app (id,name) values('0200001','Test300001'); 
insert into tb_app (id,name) values('0200002','TesT400001');
```

**固定分片hash算法**

*介绍*

该算法类似于十进制的求模运算，但是为二进制的操作，例如，取 id 的二进制低 10 位 与1111111111 进行位 & 运算，位与运算最小值为 0000000000，最大值为1111111111，转换为十进制，也就是位于0-1023之间。

![img](http://images.hellocode.top/2217415-20220514184016497-414349404.png)

特点：

- 如果是求模，连续的值，分别分配到各个不同的分片；但是此算法会将连续的值可能分配到相同的分片，降低事务处理的难度。
- 可以均匀分配，也可以非均匀分配。
- 分片字段必须为数字类型。

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 固定分片hash算法 --> 
<table name="tb_longhash" dataNode="dn4,dn5,dn6" rule="sharding-by-long-hash" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-long-hash">
    <rule>
        <columns>id</columns>
        <algorithm>sharding-by-long-hash</algorithm>
    </rule>
</tableRule>

        <!-- 分片总长度为1024，count与length数组长度必须一致； -->
<function name="sharding-by-long-hash"
          class="io.mycat.route.function.PartitionByLong">
    <property name="partitionCount">2,1</property>
    <property name="partitionLength">256,512</property>
</function>
```

分片规则属性含义：

| 属性            | 描述                             |
| :-------------- | :------------------------------- |
| columns         | 标识将要分片的表字段名           |
| algorithm       | 指定分片函数与function的对应关系 |
| class           | 指定该分片算法对应的类           |
| partitionCount  | 分片个数列表                     |
| partitionLength | 分片范围列表                     |

约束 :

1. 分片长度 : 默认最大2^10 , 为 1024 ;
2. count, length的数组长度必须是一致的 ;

以上分为三个分区:0-255,256-511,512-1023

示例说明 :

![img](http://images.hellocode.top/2217415-20220514184422781-1280525063.png)

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
CREATE TABLE tb_longhash ( 
    id int(11) NOT NULL COMMENT 'ID', 
    name varchar(200) DEFAULT NULL COMMENT '名称', 
    firstChar char(1) COMMENT '首字母', 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_longhash (id,name,firstChar) values(1,'七匹狼','Q'); 
insert into tb_longhash (id,name,firstChar) values(2,'八匹狼','B'); 
insert into tb_longhash (id,name,firstChar) values(3,'九匹狼','J'); 
insert into tb_longhash (id,name,firstChar) values(4,'十匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(5,'六匹狼','L'); 
insert into tb_longhash (id,name,firstChar) values(6,'五匹狼','W'); 
insert into tb_longhash (id,name,firstChar) values(7,'四匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(8,'三匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(9,'两匹狼','L');
```

**字符串hash解析算法**

*介绍*

截取字符串中的指定位置的子字符串, 进行hash算法， 算出分片

![img](http://images.hellocode.top/2217415-20220514184557039-964135436.png)

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 字符串hash解析算法 -->
<table name="tb_strhash" dataNode="dn4,dn5" rule="sharding-by-stringhash" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-stringhash">
    <rule>
        <columns>name</columns>
        <algorithm>sharding-by-stringhash</algorithm>
    </rule>
</tableRule> 

<function name="sharding-by-stringhash" class="io.mycat.route.function.PartitionByString">
    <property name="partitionLength">512</property> <!-- zero-based -->
    <property name="partitionCount">2</property>
    <property name="hashSlice">0:2</property>
</function>
```

分片规则属性含义：

| 属性                 | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| columns              | 标识将要分片的表字段                                         |
| algorithm            | 指定分片函数与function的对应关系                             |
| class                | 指定该分片算法对应的类                                       |
| partitionLength hash | 求模基数 ; length*count=1024 (出于性能考虑)                  |
| partitionCount       | 分区数                                                       |
| hashSlice            | hash运算位 , 根据子字符串的hash运算 ; 0 代表 str.length(), -1 代表 str.length()-1 , 大于0只代表数字自身 ; 可以理解为substring（start，end），start为0则只表示0 |

示例说明：

![img](http://images.hellocode.top/2217415-20220514184954135-456296395.png)



*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
create table tb_strhash( 
    name varchar(20) primary key, 
    content varchar(100) 
)engine=InnoDB DEFAULT CHARSET=utf8mb4; 

INSERT INTO tb_strhash (name,content) VALUES('T1001', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('ROSE', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('JERRY', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('CRISTINA', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('TOMCAT', UUID());
```

**按天分片算法**

*介绍*

按照日期及对应的时间周期来分片

![img](http://images.hellocode.top/2217415-20220514185100635-1924380362.png)

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 按天分片 -->
<table name="tb_datepart" dataNode="dn4,dn5,dn6" rule="sharding-by-date" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-date">
    <rule>
        <columns>create_time</columns>
        <algorithm>sharding-by-date</algorithm>
    </rule>
</tableRule>

<function name="sharding-by-date" class="io.mycat.route.function.PartitionByDate">
    <property name="dateFormat">yyyy-MM-dd</property>
    <property name="sBeginDate">2022-01-01</property>
    <property name="sEndDate">2022-01-30</property>
    <property name="sPartionDay">10</property>
</function> 

<!--从开始时间开始，每10天为一个分片，到达结束时间之后，会重复开始分片插入 配置表的 dataNode 的分片，必须和分片规则数量一致，例如 2022-01-01 到 2022-12-31 ，每 10天一个分片，一共需要37个分片。 -->
```

分片规则属性含义：

| 属性        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| columns     | 标识将要分片的表字段                                         |
| algorithm   | 指定分片函数与function的对应关系                             |
| class       | 指定该分片算法对应的类                                       |
| dateFormat  | 日期格式                                                     |
| sBeginDate  | 开始日期                                                     |
| sEndDate    | 结束日期，如果配置了结束日期，则代码数据到达了这个日期的分片后，会重复从开始分片插入 |
| sPartionDay | 分区天数，默认值 10 ，从开始日期算起，每个10天一个分区       |

*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

```sql
create table tb_datepart( 
    id bigint not null comment 'ID' primary key, 
    name varchar(100) null comment '姓名', 
    create_time date null 
);

insert into tb_datepart(id,name ,create_time) values(1,'Tom','2022-01-01'); 
insert into tb_datepart(id,name ,create_time) values(2,'Cat','2022-01-10');
insert into tb_datepart(id,name ,create_time) values(3,'Rose','2022-01-11'); 
insert into tb_datepart(id,name ,create_time) values(4,'Coco','2022-01-20'); 
insert into tb_datepart(id,name ,create_time) values(5,'Rose2','2022-01-21'); 
insert into tb_datepart(id,name ,create_time) values(6,'Coco2','2022-01-30'); 
insert into tb_datepart(id,name ,create_time) values(7,'Coco3','2022-01-31');
```

**自然月分片**

*介绍*

使用场景为按照月份来分片, 每个自然月为一个分片

![img](http://images.hellocode.top/2217415-20220514185535314-2082893584.png)

*配置*

schema.xml中逻辑表配置：

```xml
<!-- 按自然月分片 --> 
<table name="tb_monthpart" dataNode="dn4,dn5,dn6" rule="sharding-by-month" />
```

schema.xml中数据节点配置：

```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：

```xml
<tableRule name="sharding-by-month">
    <rule>
        <columns>create_time</columns>
        <algorithm>partbymonth</algorithm>
    </rule>
</tableRule>

<function name="partbymonth" class="io.mycat.route.function.PartitionByMonth">
    <property name="dateFormat">yyyy-MM-dd</property>
    <property name="sBeginDate">2022-01-01</property>
    <property name="sEndDate">2022-03-31</property>
</function>

<!--从开始时间开始，一个月为一个分片，到达结束时间之后，会重复开始分片插入 配置表的 dataNode 的分片，必须和分片规则数量一致，例如 2022-01-01 到 2022-12-31 ，一 共需要12个分片。 -->
```

分片规则属性含义：

| 属性       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| columns    | 标识将要分片的表字段                                         |
| algorithm  | 指定分片函数与function的对应关系                             |
| class      | 指定该分片算法对应的类                                       |
| dateFormat | 日期格式                                                     |
| sBeginDate | 开始日期                                                     |
| sEndDate   | 结束日期，如果配置了结束日期，则代码数据到达了这个日期的分片后，会重复从开始分片插入 |



*测试*

配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况

```sql
create table tb_monthpart( 
    id bigint not null comment 'ID' primary key, 
    name varchar(100) null comment '姓名', 
    create_time date null 
);

insert into tb_monthpart(id,name ,create_time) values(1,'Tom','2022-01-01'); 
insert into tb_monthpart(id,name ,create_time) values(2,'Cat','2022-01-10'); 
insert into tb_monthpart(id,name ,create_time) values(3,'Rose','2022-01-31'); 
insert into tb_monthpart(id,name ,create_time) values(4,'Coco','2022-02-20'); 
insert into tb_monthpart(id,name ,create_time) values(5,'Rose2','2022-02-25'); 
insert into tb_monthpart(id,name ,create_time) values(6,'Coco2','2022-03-10'); 
insert into tb_monthpart(id,name ,create_time) values(7,'Coco3','2022-03-31'); 
insert into tb_monthpart(id,name ,create_time) values(8,'Coco4','2022-04-10'); 
insert into tb_monthpart(id,name ,create_time) values(9,'Coco5','2022-04-30');
```

### 6、Mycat管理及监控

#### 6.1. MyCat原理

![img](http://images.hellocode.top/2217415-20220514190139548-136429863.png)



在MyCat中，当执行一条SQL语句时，MyCat需要进行SQL解析、分片分析、路由分析、读写分离分析等操作，最终经过一系列的分析决定将当前的SQL语句到底路由到那几个(或哪一个)节点数据库，数据库将数据执行完毕后，如果有返回的结果，则将结果返回给MyCat，最终还需要在MyCat中进行结果合并、聚合处理、排序处理、分页处理等操作，最终再将结果返回给客户端。

而在MyCat的使用过程中，MyCat官方也提供了一个管理监控平台MyCat-Web（MyCat-eye）。Mycat-web 是 Mycat 可视化运维的管理和监控平台，弥补了 Mycat 在监控上的空白。帮 Mycat分担统计任务和配置管理任务。Mycat-web 引入了 ZooKeeper 作为配置中心，可以管理多个节点。Mycat-web 主要管理和监控 Mycat 的流量、连接、活动线程和内存等，具备 IP 白名单、邮件告警等模块，还可以统计 SQL 并分析慢 SQL 和高频 SQL 等。为优化 SQL 提供依据。

#### 6.2. MyCat管理

Mycat默认开通2个端口，可以在server.xml中进行修改。

- 8066 数据访问端口，即进行 DML 和 DDL 操作。
- 9066 数据库管理端口，即 mycat 服务管理控制功能，用于管理mycat的整个集群状态

连接MyCat的管理控制台：

```css
mysql -h 192.168.200.210 -p 9066 -uroot -p123456
```

| 命令   | 含义                                   |
| :----- | :------------------------------------- |
| show   | @@help 查看Mycat管理工具帮助文档       |
| show   | @@version 查看Mycat的版本              |
| reload | @@config 重新加载Mycat的配置文件       |
| show   | @@datasource 查看Mycat的数据源信息     |
| show   | @@datanode 查看MyCat现有的分片节点信息 |
| show   | @@threadpool 查看Mycat的线程池信息     |
| show   | @@sql 查看执行的SQL                    |
| show   | @@sql.sum 查看执行的SQL统计            |

#### 6.3. MyCat-eye

**介绍**

Mycat-web(Mycat-eye)是对mycat-server提供监控服务，功能不局限于对mycat-server使用。他通过JDBC连接对Mycat、Mysql监控，监控远程服务器(目前仅限于linux系统)的cpu、内存、网络、磁盘

Mycat-eye运行过程中需要依赖zookeeper，因此需要先安装zookeeper。

*zookeeper安装*

- 参考[https://www.cnblogs.com/chen-guang/p/16063044.html](https://www.cnblogs.com/chen-guang/p/16264603.html)

*Mycat-web安装*

A. 上传安装包 ：Mycat-web.tar.gz

B. 解压：tar -zxvf Mycat-web.tar.gz -C /usr/local/

C. 目录介绍

- etc：jetty配置文件
- lib：依赖jar包
- mycat-web：mycat-web项目
- readme.txt
- start.jar：启动jar
- start.sh： linux启动脚本

D. 启动：sh start.sh

E. 访问：http://192.168.200.210:8082/mycat



> 备注:
> ​如果Zookeeper与Mycat-web不在同一台服务器上 , 需要设置Zookeeper的地址 ; 在/usr/local/mycat-web/mycat-web/WEB-INF/classes/mycat.properties文件中配置 :
>
> ![img](http://images.hellocode.top/2217415-20220514192104173-72169489.png)

**访问**

http://192.168.200.210:8082/mycat

![img](http://images.hellocode.top/2217415-20220514190540479-790802975.png)

**配置**

1). 开启MyCat的实时统计功能(server.xml)

```xml
<property name="useSqlStat">1</property> <!-- 1为开启实时统计、0为关闭 -->
```

2). 在Mycat监控界面配置服务地址

![img](http://images.hellocode.top/2217415-20220514190621637-399921710.png)

**测试**

配置好了之后，我们可以通过MyCat执行一系列的增删改查的测试，然后过一段时间之后，打开mycat-eye的管理界面，查看mycat-eye监控到的数据信息

A. 性能监控

![img](http://images.hellocode.top/2217415-20220514190705484-699414373.png)

B. 物理节点

![img](http://images.hellocode.top/2217415-20220514190733133-942877429.png)

C. SQL统计

![img](http://images.hellocode.top/2217415-20220514190750587-873304914.png)

D. SQL表分析

![img](http://images.hellocode.top/2217415-20220514190812710-1169255831.png)

E. SQL监控

![img](http://images.hellocode.top/2217415-20220514190834472-280689317.png)

F. 高频SQL

![img](http://images.hellocode.top/2217415-20220514190855004-912122114.png)

## 十七、读写分离

### 1、介绍

读写分离，简单地说就是把对数据库的读和写操作分开，以对应不同的数据库服务器。主数据库提供写操作，从数据库提供读操作，这样能有效地减轻单台数据库的压力。

通过MyCat即可轻易实现上述功能，不仅可以支持MySQL，也可以支持Oracle和SQL Server

![img](http://images.hellocode.top/b4d8023a5ef3c8ed5757a47f83e0b036.webp)

### 2、一主一从

#### 2.1. 原理

MySQL的主从复制，是基于二进制日志（binlog）实现的。

![img](http://images.hellocode.top/eb17ba57f77085d62a915b8b861fe46a.webp)

#### 2.2. 准备

| 主机           | 角色   | 用户名 | 密码   |
| :------------- | :----- | :----- | :----- |
| 192.168.91.166 | master | root   | 123456 |
| 192.168.91.167 | slave  | root   | 123456 |

> 主从具体搭建过程见主从复制部分

结果验证

```shell
mysql> show replica status\G
*************************** 1. row ***************************
             Replica_IO_State: Waiting for source to send event
                  Source_Host: 192.168.91.166
                  Source_User: itcast01
                  Source_Port: 3306
                Connect_Retry: 60
              Source_Log_File: binlog.000001
          Read_Source_Log_Pos: 156
               Relay_Log_File: MySQL-Slave-relay-bin.000002
                Relay_Log_Pos: 321
        Relay_Source_Log_File: binlog.000001
           Replica_IO_Running: Yes
          Replica_SQL_Running: Yes
```

#### 2.3. 搭建

MyCat控制后台数据库的读写分离和负载均衡由schema.xml文件datahost标签的balance属性控制。

**schema.xml配置**

```xml
<!-- 配置逻辑库 -->
<schema name="ITCAST_RW" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn7">
</schema>
<dataNode name="dn7" dataHost="dhost7" database="itcast01" />

<dataHost name="dhost7" maxCon="1000" minCon="10" balance="1" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">
	<heartbeat>select user()</heartbeat>
	<writeHost host="master1" url="jdbc:mysql://192.168.91.166:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456" >
	<readHost host="slave1" url="jdbc:mysql://192.168.91.167:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456" />
	</writeHost>
</dataHost>
```

上述配置的具体关联对应情况如下：

![img](http://images.hellocode.top/28bbedce74c45b020af1edeae5d7cd4c.webp)

writeHost代表的是写操作对应的数据库，readHost代表的是读操作对应的数据库。 所以我们要想实现读写分离，就得配置writeHost关联的是主库，readHost关联的是从库。

而仅仅配置好了writeHost以及readHost还不能完成读写分离，还需要配置一个非常重要的负责均衡的参数 balance，取值有4种，具体含义如下：

| 参数值 | 含义                                                         |
| :----- | :----------------------------------------------------------- |
| 0      | 不开启读写分离机制 , 所有读操作都发送到当前可用的writeHost上 |
| 1      | 全部的readHost 与 备用的writeHost 都参与select 语句的负载均衡（主要针对于双主双从模式） |
| 2      | 所有的读写操作都随机在writeHost , readHost上分发             |
| 3      | 所有的读请求随机分发到writeHost对应的readHost上执行, writeHost不负担读压力 |

所以，在一主一从模式的读写分离中，balance配置1或3都是可以完成读写分离的。

**server.xml配置**

配置root用户可以访问SHOPPING、ITCAST 以及 ITCAST_RW逻辑库。

```xml
<user name="root" defaultAccount="true">
	<property name="password">123456</property>
	<property name="schemas">SHOPPING,ITCAST,ITCAST_RW</property>
    
    <!-- 表级 DML 权限设置 -->
    <!--
    <privileges check="true">
		<schema name="DB01" dml="0110" >
			<table name="TB_ORDER" dml="1110"></table>
		</schema>
	</privileges>
-->
</user>
```

**测试**

配置完毕MyCat后，重新启动MyCat。

```shell
bin/mycat stop
bin/mycat start
```

然后观察，在执行增删改操作时，对应的主库及从库的数据变化。 在执行查询操作时，检查主库及从库对应的数据变化

![img](http://images.hellocode.top/b91e6e1c9cf61e0b8abb6e242f3da801.webp)

在数据库写入一条数据，发现主从节点都增加一条数据，其实这条数据是从主节点写入的，因为数据是由主机点同步到从节点。

在数据库修改一条数据，发现主节点没有改变，从节点改变了，还是因为数据是由主机点同步到从节点。

在测试中，我们可以发现当主节点Master宕机之后，业务系统就只能够读，而不能写入数据了。

```sql
mysql> select * from tb_user;
+------+---------+-----+
| id   | name    | sex |
+------+---------+-----+
|    1 | Tom     | 1   |
|    2 | Trigger | 0   |
|    3 | Dawn    | 1   |
|    8 | It5     | 0   |
+------+---------+-----+
4 rows in set (0.01 sec)

mysql> insert into tb_user(id,name,sex) values(10,'It5',0);
ERROR:
No operations allowed after connection closed.
mysql>
```

那如何解决这个问题呢？这个时候我们就得通过另外一种主从复制结构来解决了，也就是我们接下来演示的双主双从。

### 3、双主双从

#### 3.1. 原理

一个主机Master1用于处理所有写请求，它的从机Slave1和另一台主机Master2还有它的从机Slave2负责所有读请求。当Master1主机宕机后，Master2主机负责写请求，Master1、Master2互为备机。架构图如下：

![image-20220420213921034](http://images.hellocode.top/DjM9ylZkVL2BSQC.png)

#### 3.2. 准备

**主库配置**

1. 修改配置文件

```shell
#mysql服务ID，保证整个集群环境中唯一，取值范围：1-2的32次方-1，默认为1
server-id=1
#指定同步的数据库
binlog-do-db=db01
binlog-do-db=db02
binlog-do-db=db03
#在作为从数据库的时候，有写入操作也要更新二进制日志文件
log-slave-updates
```

2. 重启 mysql 服务器

*两台主库创建账户并授权*

```sql
-- 创建itcast用户，并设置密码，该用户可在任意主机连接该MySOL服务
CREATE USER 'itcast'@'%' IDENTIFIED WITH mysql_native_password BY 'Root@123456';

-- 为'itcast'@'%'用户分配主从复制权限
GRANT REPLICATION SLAVE ON *.* TO 'itcast'@'%1;
```

通过指令，查看两台主库的二进制日志坐标

```shell
show master status ;
```

**从库配置（Slave1-192.168.200.212）**

1. 修改配置文件/etc/my.cnf

```shell
# mysql服务ID，保证整个集群环境中唯一，取值范围：1-2的32次方-1，默认为1
server-id=2
```

2. 重启MySQL服务器

```shell
systemctl restart mysqld
```

*两台从库配置关联的主库*

```sql
CHANGE MASTER TO MASTER_HOST='xxx.xxx.xxx.xxx', MASTER_USER='xxx', MASTER_PASSWORD='xxx',
MASTER_LOG_FILE='xxx',MASTER_LOG_POS=xxx;
```

> 需要注意slave1对应的是master1,slave2对应的是master2

启动两台从库主从复制，查看从库状态

```sql
start slave;
show slave status\G
```

**两台主库相互复制**

Master2复制Master1,Master1复制Master2

```sql
CHANGE MASTER TO MASTER_HOST='xxx.xxx.xxx.xxx', MASTER_USER='XX', MASTER_PASSWORD='XX',
MASTER_LOG_FILE='xxx',MASTER_LOG_POS=XxX;
```

启动两台从库主从复制，查看从库状态

```sql
start slave;
show slave status\G
```

#### 3.3. 搭建

MyCat 控制后台数据库的读写分离和负载均衡由 schema.xml 文件 datahost 标签的 balance 属性控制，通过 writeType 及 switchType 来完成失败自动切换的。

![image-20230210164023907](http://images.hellocode.top/image-20230210164023907.png)

![image-20220420220210328](http://images.hellocode.top/JstQxaG567jPVC3.png)

`balance="1"`

- 代表全部的readHost与stand by writeHost参与select语句的负载均衡,简单的说，当双主双从模式（M1->S1,M2->S2,并且M1与M2互为主备）,正常情况下，M2,S1,S2都参与select 语句的负载均衡；

`writgType`

- 0:写操作都转发到第1台writeHost,writeHost1挂了,会切换到writeHost2上；
- 1：所有的写操作都随机地发送到配置的writeHost上；

`switchType`(writeHost1挂了,切换到writeHost2时)

- -1：不自动切换
- 1：自动切换

```xml
<!--schema.xml-->
<dataHost name="dhost1" maxCon="1000" minCon="10" balance="1" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1"  slaveThreshold="100">
    <heartbeat>select user()</heartbeat>
    <writeHost host="master1" url="jdbc:mysql://101.201.100.130:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" 
               user="root"  password="ll546546">
        <readHost host="slave" url="jdbc:mysql://59.110.217.19:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" 
                  user="root"  password="ll546546">
        </readHost>
    </writeHost>  
    <writeHost host="master2" url="jdbc:mysql://101.201.100.???:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" 
               user="root"  password="ll546546">
        <readHost host="slave2" url="jdbc:mysql://59.110.217.?:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" 
                  user="root"  password="ll546546">
        </readHost>
    </writeHost>  
</dataHost>
```

测试

- 登录MyCat，测试查询及更新操作，判定是否能够进行读写分离，以及读写分离的策略是否正确。
- 当主库挂掉一个之后，是否能够自动切换。