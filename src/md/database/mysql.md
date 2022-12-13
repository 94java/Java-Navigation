---
title: "MySQL"
order: 4
category:
  - 数据库
---

# MySQL

### 存储引擎

![](http://images.hellocode.top/mysql%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84.png)

#### 体系结构

- 客户端连接
  支持接口：支持的客户端连接，例如：C、Java、PHP等语言来连接MySQL数据库
- 第一层：网络连接层
  连接池：管理、缓冲用户的连接，线程处理等需要缓存的需求
- 第二层：核心服务层
  - 管理服务和工具：系统的管理和控制工具，例如备份恢复、复制、集群等
  - SQL接口：接受SQL命令，并且返回查询结果
  - 查询解析器：验证和解析SQL命令，例如过滤条件、语法结构等
  - 缓存：如果缓存当中有想查询的数据，则直接将缓存中的数据返回。没有的话重新查询
- 第三层：存储引擎层
  插件式存储引擎：管理和操作数据的一种机制，包括（存储数据、如何更新、查询数据等）
- 第四层：系统文件层
  文件系统：配置文件、数据文件、日志文件、错误文件、二进制文件等等的保存

#### 存储引擎

- 在生活中，引擎就是整个机器运行的核心（发动机），不同的引擎具备不同的功能，应用于不同的场景之中
- MySQL数据库使用不同的机制存取表文件，包括存储方式、索引技巧、锁定水平等不同的功能。这些不同的技术以及配套的功能称为存储索引
- Oracle、SQL server等数据库只有一种存储引擎。而MySQL针对不同的需求，配置不同的存储索引，就会让数据库采取不同处理数据的方式和扩展功能
- MySQL支持的存储引擎有很多，常用的有三种：InnoDB、MyISAM、MEMORY
- 特性对比
  - MyISAM存储引擎：访问快，不支持事务和外键操作
  - InnoDB存储引擎：支持事务和外键操作，支持并发控制，占用磁盘空间大（MySQL 5.5版本后默认）
  - MEMORY存储引擎：内存存储，速度快，不安全。适合小量快速访问的数据

#### 基本操作

- 查询数据库支持的存储引擎
  `SHOW ENGINES;`

- 查询某个数据库中所有数据表的存储引擎
  `SHOW TABLE STATUS FROM 数据库名称;`

- 查询某个数据库中某个数据表的存储索引
  `SHOW TABLE STATUS FROM 数据库名称 WHERE NAME = '数据表名称';`

- 创建数据表，指定存储引擎

  ```sql
  CREATE TABLE 表名(
  	列名 数据类型,
      ...
  )ENGINE = 引擎名称;
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

#### 存储引擎的选择

- MyISAM
  - 特点：不支持事务和外键操作。读取速度快，节约资源
  - 使用场景：以查询操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不是很高
- InnoDB
  - 特点：MySQL的默认存储引擎，支持事务和外键操作
  - 使用场景：对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，读写频繁的操作
- MEMORY
  - 特点：将所有数据保存在内存中，在需要快速定位记录和其他类似数据环境下，可以提供更快的访问
  - 使用场景：通常用于更新不太频繁的小表，用来快速得到访问的结果

**总结** ：针对不同的需求场景，来选择最适合的存储引擎即可。如果不确定，则使用默认的存储引擎

### 索引

- MySQL索引：是帮助MySQL高效获取数据的一种数据结构。所以，索引的本质就是数据结构
- 在表数据之外，数据系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式指向数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引

#### 分类

- 按照功能分类
  - 普通索引：最基本的索引，没有任何限制
  - 唯一索引：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值组合必须唯一
  - 主键索引：一种特殊的唯一索引，不允许有空值。在建表时有主键列同时创建主键索引
  - 联合索引：顾名思义，就是将单列索引进行组合
  - 外键索引：只有InnoDB引擎支持外键索引，用来保证数据的一致性、完整性和实现级联操作
  - 全文索引：快速匹配全部文档的方式。InnoDB引擎5.6版本后才支持全文索引。MEMORY引擎不支持
- 按照结构分类
  - BTree索引：MySQL使用最频繁的一个索引数据结构，是InnoDB和MyISAM存储索引默认的索引类型，底层是基于B+Tree数据结构
  - Hash索引：MySQL中Memory存储引擎默认支持的索引类型

#### 创建和查询

- 创建索引

  ```sql
  CREATE [UNIQUE | FULLTEXT] INDEX 索引名称
  [USING 索引类型] 	-- 默认是BTREE
  ON 表名(列名...);
  ```

- 查看索引
  `SHOW INDEX FROM 表名;`

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

#### 添加和删除

- 添加索引
  普通索引：`ALTER TABLE 表名 ADD INDEX 索引名称(列名);`
  组合索引：`ALTER TABLE 表名 ADD INDEX 索引名称(列名1,列名2,...);`
  主键索引：`ALTER TABLE 表名 ADD PRIMARY KEY(主键列名);`
  外键索引：`ALTER TABLE 表名 ADD CONSTRAINT 外键名 FOREIGN KEY (本表外键列名) REFERENCES 主表名(主键列名);`
  唯一索引：`ALTER TABLE 表名 ADD UNIQUE 索引名称(列名);`
  全文索引：`ALTER TABLE 表名 ADD FULLTEXT 索引名称(列名);`
- 删除索引
  `DROP INDEX 索引名称 ON 表名;`

```sql
-- 为student表中score列添加唯一索引
ALTER TABLE student ADD UNIQUE idx_score(score);

-- 查询student表的索引
SHOW INDEX FROM student;

-- 删除索引
DROP INDEX idx_score ON student;
```

#### 索引的原理

- 索引是在存储引擎中实现的，不同的存储引擎所支持的索引也不一样，这里主要介绍InnoDB 引擎的BTree索引
- BTree索引类型是基于B+Tree数据结构的，而B+Tree数据结构又是BTree数据结构的变种。通常使用在数据库和操作系统中的文件系统，特点是能够保持数据稳定有序
- 需要理解的
  - 磁盘存储
  - BTree
  - B+Tree

**磁盘存储**

- 系统从磁盘读取数据到内存时是以磁盘块（block）为基本单位的
- 位于同一个磁盘块中的数据会被一次性读取出来，而不是需要什么取什么
- InnoDB 存储引擎中有页（page）的概念，页是其磁盘管理的最小单位。InnoDB存储引擎中默认每个页的大小为 16 KB
- InnoDB 引擎将若干个地址连接磁盘块，以此来达到页的大小 16 KB，在查询数据时如果一个页中的每条数据都能有助于定位数据记录的位置，这将会减少磁盘 I/O 次数，提高查询效率

**BTree**

![](http://images.hellocode.top/BTree.png)

- 在每一个结点上，除了保存键值外，还会保存真实的数据
- 左边存小的，右边存大的，类似二叉树
- 但是在查询数据时，涉及到的磁盘块数据都会被读取出来，会增加查询数据时磁盘的IO次数，效率并不高

**B+Tree**

![](http://images.hellocode.top/B+Tree.png)

- 在每一个结点上，只保存键值，并不保存真实的数据
- 在叶子结点上保存着真实数据
- 所有的叶子结点之间都有连接指针
- 好处
  - 提高查询速度
  - 减少磁盘的IO次数
  - 树型结构较小

#### 设计原则

- 创建索引遵循的原则
  1. 对查询频次较高，且数据量比较大的表建立索引
  2. 使用唯一索引，区分度越高，使用索引的效率越高
  3. 索引字段的选择，最佳候选应当从where子句的条件中提取
  4. 索引虽然可以有效的提升查询数据的效率，但并不是多多益善
- 最左匹配原则（使用组合索引）
  - 例如：为user表中的name、address、phone 列添加组合索引
    `ALTER TABLE user ADD INDEX idx_three(name,address,phone);`
  - 此时，组合索引idx_three实际建立了(name)、(name,address)、(name,address,phone)三个索引
  - 下面的三个SQL语句都可以命中索引
    `SELECT * FROM user WHERE address = ‘北京’ AND phone = '12345' AND name = '张三';`
    `SELECT * FROM user WHERE name = '张三' AND address = '北京';`
    `SELECT * FROM user WHERE name = '张三';`
  - 这三条SQL语句在检索时分别会使用以下索引进行数据匹配
    (name,address,phone)
    (name,address)
    (name)
  - 索引字段出现的顺序可以是任意的，MySQL 优化器会帮我们自动的调整where 条件中的顺序
  - 如果组合索引中最左边的列不在查询条件中，则不会命中索引
    `SELECT * FROM user WHERE address = '北京';`

### 锁

- 锁机制：数据库为了保证数据的一致性，在共享的资源被并发访问时变得安全所设计的一种规则

- 锁机制类似多线程中的同步，作用就是可以保证数据的一致性和安全性

- 按操作分类

  - 共享锁：也叫读锁。针对同一份数据，多个事务读取操作可以同时加锁而不相互影响，但是不能修改数据
  - 排他锁：也叫写锁。当前的操作没有完成前，会阻断其他操作的读取和写入

- 按粒度分类

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

>  **注意：** 在下面所有的锁的操作中，只提到了修改操作，但是增删都是和修改一样的

#### InnoDB共享锁

- 共享锁特点
  数据可以被多个事务查询，但是不能修改
  InnoDB引擎默认加的是行锁，如果不采用带索引的列加锁时加的就是表锁
- 创建共享锁格式
  `SELECT语句 LOCK IN SHARE MODE;`

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

#### InnoDB排他锁

- 排他锁特点
  加锁的数据，不能被其他事务加锁查询或修改（普通查询可以）
  锁和锁之间不能共存
- 创建排他锁的格式
  `SELECT语句 FOR UPDATE;`

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

#### MyISAM 读锁

- 读锁特点
  所有连接只能查询数据，不能修改
  MyISAM存储引擎只能添加表锁，且不支持事务
- 读锁语法格式
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

#### MyISAM 写锁

- 写锁特点
  其他连接不能查询和修改数据（当前连接下可以查询和修改）
- 写锁语法格式
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

#### 悲观锁和乐观锁

- 悲观锁
  就是很悲观，它对于数据被外界修改的操作持保守态度，认为数据随时会修改
  整个数据处理中需要将数据加锁。悲观锁一般都是依靠关系型数据库提供的锁机制
  我们之前所学习的锁机制都是悲观锁
- 乐观锁
  就是很乐观，每次自己操作数据的时候认为没有人会来修改它，所以不去加锁
  但是在更新的时候会去判断在此期间数据有没有被修改
  需要用户自己去实现，不会发生并发抢占资源，只有在提交操作的时候检查是否违反数据完整性

**乐观锁实现方式**（了解）

- 方式一
  - 给数据表中添加一个version列，每次更新后都将这个列的值加1
  - 读取数据时，将版本号读取出来，再执行更新的时候，比较版本号
  - 如果相同则执行更新，如果不同，说明此条数据已经发生了变化
  - 用户自行根据这个通知来决定怎么处理，比如重新开始一遍，或者放弃本次更新
- 方式二
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

### MyCat

> 本部分内容理解就行，在最终项目时可能才会用到，后期还需要单独的学习

>  随着互联网的发展，数据的量级也是不断地增长，从GB 到 TB 到 PB。对数据的各种操作也是越来越困难，一台数据库服务器已经无法满足海量数据的存储需求，所以多台数据库服务器构成的数据库集群成了必然的方式。不过，还要保证数据的一致性，查询效率等，同时又要解决多台服务器间的通信、负载均衡等问题

- MyCat可以针对多台服务器做统一的管理，连接时只需要连接MyCat

- Mycat是一款出色的数据库集群软件，不仅支持MySQL，常用关系型数据库也都支持
- 其实就是一个数据库中间件产品，支持MySQL集群。提供高可用性数据分片集群
- 我们可以像使用MySQL一样使用MyCat。对于开发人员来说几乎感觉不到MyCat 的存在

#### 安装

1. MyCat官网
   http://www.mycat.io
2. 通过CRT工具上传到linux
   `put D:\Mycat-server-1.6.7.1-release-20190627191042-linux.tar.gz `
3. 解压并查看
   `tar -zxvf mycat.tar.gz`
   `cd mycat`
   `ls`
4. 为mycat目录授权
   `chmod -R 777 mycat`
5. 配置环境变量
   编辑文件：`vi /etc/profile`
   添加内容：`export MYCAT_HOME=/root/mycat`(最下方)
   加载文件：`source /etc/profile`
6. 启动mycat
   进入目录：`cd /root/mycat/bin`
   执行启动：`./mycat start`
7. 查看端口监听
   `netstat -ant|grep 8066`
8. SQLyog连接mycat
   默认用户名：root
   默认密码：123456
   默认端口号：8066

#### 集群环境

- 集群模型
  - MyCat MySQL 主服务器
  - MySQL 从服务器
- 克隆虚拟机
- 修改第二个虚拟机的网卡，重新生成MAC地址
- 修改第二个服务器MySQL 配置文件 uuid
  - 编辑配置文件：`vi /var/lib/mysql/auto.cnf`
  - 将 server-uuid 更改一个数字即可
- 启动相关服务
  - 关闭两台服务器的防火墙：`systemctl stop firewalld`
  - 启动两台服务器的MySQL：`service mysqld restart`
  - 启动两台服务器的MyCat：`cd /root/mycat/bin`  `./mycat restart`
  - 查看两台服务器的监听端口：`netstat -ant|grep 3306`  `netstat -ant|grep 8066`

#### 主从复制

- 为了使用MyCat进行读写分离，我们先要配置MySQL 数据库的主从复制
- 从服务器自动同步主服务器的数据，从而达到数据一致
- 进而，我们可以在写操作时，只操作主服务器，而读操作，就可以操作从服务器了

**配置**

==主服务器==

1. 在第一个服务器上，编辑mysql配置文件

   - 编辑mysql配置文件：`vi /etc/my.cnf`
   - 在[mysqld]下面加上

   ```shell
   // log-bin代表开启主从复制，server-id代表主从服务器的唯一标识
   log-bin=mysql-bin
   server-id=1
   innodb_flush_log_at_trx_commit=1
   sync_binlog=1
   ```

2. 查看主服务器的配置

   - 重启mysql：`service mysqld restart`
   - 登录mysql：`mysql -u root -p`
   - 查看主服务的配置：`show master status;`
     需要记住 File 列和 Position 列的数据，将来配置从服务器需要使用

==从服务器==

1. 在第二个服务器上，编辑mysql配置文件

   - 编辑mysql配置文件：`vi /etc/my.cnf`
   - 在[mysqld]下面加上：`server-id=2`

2. 登录mysql：`mysql -u root -p`

3. 执行

   ```sql
   use mysql;
   drop table slave_master_info;
   drop table slave_relay_log_info;
   drop table slave_worker_info;
   drop table innodb_index_stats;
   drop table innodb_table_stats;
   source /usr/share/mysql/mysql_system_tables.sql;
   ```

4. 重启mysql，重新登录，配置从节点

   - 重启mysql：`service mysqld restart`
   - 重新登录mysql：`mysql -u root -p`
   - 执行：`change master to master_host='192.168.59.143',master_port=3306,master_user='root',master_password='itheima',master_log_file='mysql-bin.000001',master_log_pos=154;`
   - 开启从节点：`start slave;`
   - 查询结果：`show slave status\G;`
     Slave_IO_Running和Slave_SQL_Running都为YES才表示同步成功。

5. 测试：在主服务器上创建一个db1数据库，查看从服务器上是否自动同步

#### 读写分离

- 写操作只写入主服务器，由于有主从复制，从服务器中也会自动同步数据
- 读操作是读取从服务器中的数据

**配置**

- 修改主服务器 server.xml：`vi /root/mycat/conf/server.xml`

  ```xml
  <user name="root">
      <property name="password">MyCat密码</property>
      <property name="schemas">MyCat逻辑数据库显示的名字（虚拟数据库名）</property>
  </user>
  ```

- 修改主服务器 schema.xml：`vi /root/mycat/conf/schema.xml`

  ```xml
  <?xml version="1.0"?>
  <!DOCTYPE mycat:schema SYSTEM "schema.dtd">
  <mycat:schema xmlns:mycat="http://io.mycat/">
  
  	<schema name="和MyCat逻辑数据库名一致" checkSQLschema="false" sqlMaxLimit="100" dataNode="dn1"></schema>
  	
  	<dataNode name="dn1" dataHost="localhost1" database="db1" />
  	
  	<dataHost name="localhost1" maxCon="1000" minCon="10" balance="1"
  			  writeType="0" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
  		<heartbeat>select user()</heartbeat>
  		<!-- 主服务器负责写的操作 -->
  		<writeHost host="hostM1" url="localhost:3306" user="root" password="itheima">
  			<!-- 从服务器负责读的操作 -->
  			<readHost host="hostS1" url="192.168.59.182:3306" user="root" password="itheima" />
  		</writeHost>
  	</dataHost>
  </mycat:schema>
  ```

- 重启MyCat
  进入mycat路径：`cd /root/mycat/bin`
  重启mycat：`./mycat restart`
  查看端口监听：`netstat -ant|grep 8066`

#### 分库分表

- 分库分表：将庞大的数据量拆分为不同的数据库和数据表进行存储
- 水平拆分
  根据表的数据逻辑关系，将同一表中的数据按照某种条件，拆分到多台数据库服务器上，也叫做横向拆分
  例如：一张 1000万的大表，按照一模一样的结构，拆分成4个250万的小表，分别保存到4个数据库中
- 垂直拆分
  根据业务的维度，将不同的表切分到不同的数据库上，也叫做纵向拆分
  例如：所有的动物表都保存到动物库中，所有的水果表都保存到水果库中，同类型的表保存在同一个库中

**水平拆分**

- 修改主服务器中 server.xml：`vi /root/mycat/conf/server.xml`

  ```xml
  <!--配置主键方式 0代表本地文件方式-->
  <property name="sequnceHandlerType">0</property>
  ```

- 修改主服务器中 sequence_conf.properties：`vi /root/mycat/conf/sequence_conf.properties`

  ```xml
  #default global sequence
  GLOBAL.HISIDS=			# 可以自定义关键字
  GLOBAL.MINID=10001		# 最小值
  GLOBAL.MAXID=20000		# 最大值
  ```

- 修改主服务器中 schema.xml：`vi /root/mycat/conf/schema.xml`

  ```xml
  <?xml version="1.0"?>
  <!DOCTYPE mycat:schema SYSTEM "schema.dtd">
  <mycat:schema xmlns:mycat="http://io.mycat/">
  
  	<schema name="HEIMADB" checkSQLschema="false" sqlMaxLimit="100">
  		<table name="product" primaryKey="id" dataNode="dn1,dn2,dn3" rule="mod-long"/>
  	</schema>
  	
  	<dataNode name="dn1" dataHost="localhost1" database="db1" />
  	<dataNode name="dn2" dataHost="localhost1" database="db2" />
  	<dataNode name="dn3" dataHost="localhost1" database="db3" />
  	
  	<dataHost name="localhost1" maxCon="1000" minCon="10" balance="1"
  			  writeType="0" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
  		<heartbeat>select user()</heartbeat>
  		<!-- 主服务器负责写的操作 -->
  		<writeHost host="hostM1" url="localhost:3306" user="root" password="itheima">
  			<!-- 从服务器负责读的操作 -->
  			<readHost host="hostS2" url="192.168.59.182:3306" user="root" password="itheima" />
  		</writeHost>
  	</dataHost>
  </mycat:schema>
  ```

- 修改主服务器中 rule：`vi /root/mycat/conf/rule.xml`

  ```xml
  <function name="mod-long" class="io.mycat.route.function.PartitionByMod">
  	<!-- 指定节点数量 -->
  	<property name="count">3</property>
  </function>
  ```

**垂直拆分**

- 修改主服务器中 schema.xml：`vi /root/mycat/conf/schema.xml`

  ```xml
  <?xml version="1.0"?>
  <!DOCTYPE mycat:schema SYSTEM "schema.dtd">
  <mycat:schema xmlns:mycat="http://io.mycat/">
  
  	<schema name="HEIMADB" checkSQLschema="false" sqlMaxLimit="100">
  		<table name="product" primaryKey="id" dataNode="dn1,dn2,dn3" rule="mod-long"/>
  		
  		<!-- 动物类数据表 -->
  		<table name="dog" primaryKey="id" autoIncrement="true" dataNode="dn4" />
  		<table name="cat" primaryKey="id" autoIncrement="true" dataNode="dn4" />
      
         <!-- 水果类数据表 -->
  		<table name="apple" primaryKey="id" autoIncrement="true" dataNode="dn5" />
  		<table name="banana" primaryKey="id" autoIncrement="true" dataNode="dn5" />
  	</schema>
  	
  	<dataNode name="dn1" dataHost="localhost1" database="db1" />
  	<dataNode name="dn2" dataHost="localhost1" database="db2" />
  	<dataNode name="dn3" dataHost="localhost1" database="db3" />
  	
  	<dataNode name="dn4" dataHost="localhost1" database="db4" />
  	<dataNode name="dn5" dataHost="localhost1" database="db5" />
  	
  	<dataHost name="localhost1" maxCon="1000" minCon="10" balance="1"
  			  writeType="0" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
  		<heartbeat>select user()</heartbeat>
  		<!-- 主服务器负责写的操作 -->
  		<writeHost host="hostM1" url="localhost:3306" user="root"
  				   password="itheima">
  			<!-- 从服务器负责读的操作 -->
  			<readHost host="hostS1" url="192.168.59.182:3306" user="root" password="itheima" />
  		</writeHost>
  	</dataHost>
  </mycat:schema>
  ```