---
title: "MyBatis-Plus"
order: 3
category:
  - 框架 | 中间件
---

# MyBatis-Plus

## 入门案例

- MyBatisPlus（简称MP）是基于MyBatis框架基础上开发的增强型工具，旨在简化开发，提高效率
- 官网：https://mybatis.plus    https://mp.baomidou.com

**特性**

- 无侵入：只做增强不做改变，引入它不会对现有工程产生影响
- 强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- 支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- 支持主键自动生成
- 内置分页插件
- ......

**开发方式**

- 基于MyBatis使用MyBatisPlus
- 基于Spring使用MyBatisPlus
- *基于SpringBoot使用MyBatisPlus*

**SpringBoot整合MyBatis开发过程**

1. 创建SpringBoot工程
2. 勾选配置使用的技术
3. 设置dataSource相关属性（JDBC参数）
4. 定义数据层接口映射配置

**SpringBoot整合MyBatisPlus入门程序**

1. 创建新模块，选择Spring初始化，并配置模块相关基本信息

2. 选择当前模块需要使用的技术集（仅保留JDBC）

3. 手动添加起步依赖

   ```xml
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-boot-starter</artifactId>
       <version>3.4.1</version>
   </dependency>
   ```

4. 设置JDBC参数（application.yml）

   ```yml
   spring:
     datasource:
       type: com.alibaba.druid.pool.DruidDataSource
       driver-class-name: com.mysql.cj.jdbc.Driver
       url: jdbc:mysql://192.168.23.129:3306/mybatisplus_db
       username: root
       password: 密码
   ```

5. 制作实体类与表结构（类名与表名对应，属性名与字段名对应）

6. 定义数据接口，继承`BaseMapper<User>`

7. 测试类中注入dao接口，测试功能

## 标准数据层开发

### 标准CRUD功能

| 功能       | 自定义接口                               | MP接口                                         |
| ---------- | ---------------------------------------- | ---------------------------------------------- |
| 新增       | `boolean save(T t)`                      | `int insert(T t)`                              |
| 删除       | `boolean delete(int id)`                 | `int deleteById(Serializable id)`              |
| 修改       | `boolean update(T t)`                    | `int updateById(T t)`                          |
| 根据id查询 | `T getById(int id)`                      | `T selectById(Serializable id)`                |
| 查询全部   | `List<T> getAll()`                       | `List<T> selectList()`                         |
| 分页查询   | `PageInfo<T> getAll(int page, int size)` | `IPage<T> selectPage(IPage<T> page)`           |
| 按条件查询 | `List<T> getAll(Condition condition)`    | `Ipage<T> selectPage(Wrapper<T> queryWrapper)` |

### lombok

- Lombok，是一个Java类库，提供了一组注解，简化POJO实体类开发

- 为当前实体类在编译期设置对应的get / set方法，无参 / 有参构造方法，toString方法，hashCode方法，equals方法等

- 导入依赖（provided范围，不参与最终的打包）

  ```xml
  <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <scope>provided</scope>
  </dependency>
  ```

```java
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private Long id;
    private String name;
    private String password;
    private Integer age;
    private String tel;
}
```

> Data注解可以代替上述除构造方法以外的所有注解

### 分页功能

1. 设置分页拦截器作为Spring管理的bean

   ```java
   @Configuration
   public class MpConfig {
       @Bean
       public MybatisPlusInterceptor mpInterceptor(){
           // 定义mp拦截器
           MybatisPlusInterceptor mpInterceptor = new MybatisPlusInterceptor();
           // 添加具体的拦截器
           mpInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
           return mpInterceptor;
       }
   }
   ```

2. 执行分页查询

   ```java
   @Test
   void testQueryByPage(){
       IPage page = new Page(1,2);
       IPage result = userDao.selectPage(page, null);
       System.out.println("当前页：" + result.getCurrent());
       System.out.println("总页数：" + result.getPages());
       System.out.println("每页条数：" + result.getSize());
       System.out.println("总条数：" + result.getTotal());
       System.out.println("结果：" + result.getRecords());
   }
   ```

3. 开启日志（便于观察sql语句）

   ```yaml
   mybatis-plus:
     configuration:
       log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
   ```

## DQL编程控制

### 条件查询方式

- MyBatisPlus将书写复杂的sql查询条件进行了封装，使用编程的形式完成查询条件的组合

#### 三种查询方式

**方式一：按条件查询**

```java
@Test
void testGetAll(){
    QueryWrapper qw = new QueryWrapper();
    qw.lt("age",18);
    qw.gt("age",12);
    List<User> userList = userDao.selectList(qw);
    System.out.println(userList);
}
```

**方式二：Lambda格式**（*推荐*）

```java
@Test
void testGetAll2(){
    QueryWrapper<User> qw = new QueryWrapper();
    //qw.lambda().lt(User::getAge,18).gt(User::getAge,12);
    qw.lambda().lt(User::getAge,18);
    qw.lambda().gt(User::getAge,12);
    List<User> userList = userDao.selectList(qw);
    System.out.println(userList);
}
```

**方式三：Lambda简化格式**（*推荐*）

```java
@Test
void testGetAll3(){
    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    //lqw.lt(User::getAge,18).gt(User::getAge,12);
    lqw.lt(User::getAge,18);
    lqw.gt(User::getAge,12);
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

#### 或者条件

```java
@Test
void testGetAll3(){
    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    //lqw.lt(User::getAge,12);
    //lqw.or().gt(User::getAge,18);
    lqw.lt(User::getAge,18).or().gt(User::getAge,12);
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

> 不加`.or()`默认为并且关系

#### null值处理

- 当只设置了部分查询条件时使用

```java
@Test
void testGetAll4(){
    // 模拟页面传递过来的查询数据
    UserQuery uq = new UserQuery();
    //uq.setAge(10);
    uq.setAge2(30);

    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    lqw.lt(null != uq.getAge2(),User::getAge,uq.getAge2())
        .gt(null != uq.getAge(),User::getAge,uq.getAge());
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

> 查询操作的第一个参数为条件，为true时进行条件判断，为false则不进行条件判断

### 查询投影

```java
// 查询投影
@Test
void testGetAll5(){
    //QueryWrapper<User> qw = new QueryWrapper<>();
    //qw.select("id","name");
    //----------------------------
    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    lqw.select(User::getId,User::getName);
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

**聚合函数**

```java
@Test
void testGetAll6(){
    QueryWrapper<User> qw = new QueryWrapper<>();
    //qw.select("count(*)");
    qw.select("count(*) as count");
    // 分组统计
    qw.groupBy("tel");
    List<Map<String, Object>> userList = userDao.selectMaps(qw);
    System.out.println(userList);
}
```

> 这里如果继续使用`selectList`查询会将结果封装到User中，而导致封装失败，所以需要使用`selectMaps`将结果封装到Map中

### 查询条件设定

**查询条件**

- 范围匹配（>、=、between）
- 模糊匹配（like）
- 空判定（null）
- 包含性匹配（in）
- 分组（group）
- 排序（order）
- ......

**使用**

```java
// 模拟登录
@Test
void testGetAll7(){
    QueryWrapper<User> qw = new QueryWrapper<>();
    qw.lambda().eq(User::getName,"HelloCode").eq(User::getPassword,"66666");
    User user = userDao.selectOne(qw);
    System.out.println(user);
}
```

> 当查询结果为单个时，就不需要用`selectList`了，可以使用`selectOne`

```java
// 范围查询 lt le gt ge eq between
@Test
void testGetAll8(){
    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    lqw.between(User::getAge,10,30);
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

```java
// 模糊匹配
@Test
void testGetAll9(){
    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
    //lqw.like(User::getName,"J");
    //lqw.likeLeft(User::getName,"J");
    lqw.likeRight(User::getName,"J");
    List<User> userList = userDao.selectList(lqw);
    System.out.println(userList);
}
```

> `like`会在匹配字左右都加上`%`，`likeLeft`和`likeRight`则分别在匹配字左或者you

### 字段映射与表名映射

**问题一：表字段与编码属性设计不同步**

- MP提供了一个注解：`@TableField(value="xxx")`来解决该问题
  可以通过指定value值来将对应的编码字段与表字段进行映射

- 名称：@TableField

- 类型：属性注解

- 位置：模型类属性定义上方

- 作用：设置当前属性对应的数据库表中的字段关系

- 范例

  ```java
  public class User{
      @TableField(value="pwd")
      private String password;
  }
  ```

- 相关属性：value（默认）———设置数据库表字段名称

**问题二：编码中添加了数据库中未定义的属性**

- 使用`@TableField`中的`exist`属性解决该问题，设置属性在数据库表字段中是否存在
  - false表示表字段中没有该属性
  - true表示表字段中有该属性（默认）
  - 此属性无法与value合并使用

**问题三：采用默认查询开放了更多的字段查看权限**

- 使用`@TableField`中的`select`属性解决该问题，设置属性是否参与查询
  - 默认为true，参与查询
  - false为不参与查询
  - 此属性与select()映射配置不冲突

**问题四：表名与编码开发设计不同步**

- 名称：`@TableName`

- 类型：类注解

- 位置：模型类定义上方

- 作用：设置当前类对应与数据库表关系

- 范例

  ```java
  @TableName("tbl_user")
  public class User{
      private Long id;
  }
  ```

- 相关属性

  - value：设置数据库表名称

> 可以在全局配置文件中配置统一的表名前缀，就能够省略该注解：`table-prefix`

## DML编程控制

### Insert

**id生成策略控制**

- 不同的表应用不同的id生成策略
  - 日志：自增（1，2，3，4，......）
  - 购物订单：特殊规则（FQ23948AK3843）
  - 外卖单：关联地区日期等信息（10 04 20200314 34 91）
  - 关系表：可省略id
  - ..........

**注解**

- 名称：`@TableId`

- 类型：属性注解

- 位置：模型类中用于表示主键的属性定义上方

- 作用：设置当前类中主键属性的生成策略

- 范例

  ```java
  public class User{
      @TableId(type = IdType.AUTO)
      private Long id;
  }
  ```

- 相关属性

  - value：设置数据库主键名称
  - type：设置主键属性的生成策略，值参照IdType枚举值

*类型*

- AUTO：使用数据库主键自增策略
- NONE：不设置id生成策略
- INPUT：由用户输入指定主键id
- ASSIGN_ID：根据雪花算法生成主键id（默认，可兼容数值型与字符串型）

- ASSIGN_UUID：根据uuid生成主键id

> 可以在application.xml中对所有类主键id生成策略做全局配置：`id-type`

### Delete

**多记录操作**

- 按主键删除多条记录

  ```java
  List<Long> ids = new ArrayList<>();
  ids.add(1L);
  ids.add(2L);
  userDao.deleteBatchIds(ids);
  ```

- 根据主键查询多条记录

  ```java
  List<Long> ids = Arrays.asList(new Long[]{2,3});
  userDao.selectBatchIds(ids);
  ```

**逻辑删除**

- 删除操作业务问题：业务数据从数据库中丢弃
- 逻辑删除：为数据设置是否可用状态字段，删除时设置状态字段为不可用状态，数据保留在数据库中

*步骤*

1. 数据库表中添加逻辑删除标记字段（eg：deleted），并指定默认值（未被删除默认值）

2. 实体类中添加对应字段，并设定当前字段为逻辑删除标记字段（`@TableLogic`）

3. 配置逻辑删除字面值

   ```yaml
   mybatis-plus:
     global-config:
       db-config:
         logic-delete-field: deleted
         logic-not-delete-value: 0
         logic-delete-value: 1
   ```

> 配置了全局配置就不需要每个类中添加`@TableLogic`注解了，并且删除操作将变为Update操作，更改标记字段值
>
> 查询操作也将附加条件，只查询标记字段不为被删除的数据
>
> 如果需要查询所有数据（包括被删除数据），需要自己编写sql语句

### Update

**乐观锁**

- 业务并发现象带来的问题：秒杀
  当一个库存为100的商品被多个用户秒杀，如果降为1个库存，不加锁的情况下，多个用户操作将会导致并发问题

*步骤*

1. 数据库表中添加锁标记字段（eg：version），并指定默认值（一般是1）

2. 实体类中添加对应字段，并设定当前字段为乐观锁标记字段（`@Version`）

3. 配置乐观锁拦截器实现锁机制对应的动态sql语句拼装

   ```java
   @Configuration
   public class MpConfig {
       @Bean
       public MybatisPlusInterceptor mpInterceptor(){
           MybatisPlusInterceptor mpInterceptor = new MybatisPlusInterceptor();
           mpInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
           return mpInterceptor;
       }
   }
   ```

> 实现就是通过拦截器拼接对锁标记字段的操作和判断，例如：`update set abc = 1, version = version + 1 where id = 1 AND version = 1` 

## 代码生成器

- 模板：MyBatisPlus提供
- 数据库相关配置：读取数据库获取信息
- 开发者自定义配置：手工配置

**步骤**

1. 导入坐标

   ```xml
   <!--代码生成器-->
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-generator</artifactId>
       <version>3.4.1</version>
   </dependency>
   <!--velocity模板引擎-->
   <dependency>
       <groupId>org.apache.velocity</groupId>
       <artifactId>velocity-engine-core</artifactId>
       <version>2.3</version>
   </dependency>
   ```

2. 核心代码

   ```java
   AutoGenerator autoGenerator = new AutoGenerator();
   autoGenerator.execute();
   ```

3. 通过autoGenerator指定相应的数据源配置、全局配置、包名相关配置、策略设置

   ```java
   package top.hellocode;
   
   import com.baomidou.mybatisplus.annotation.IdType;
   import com.baomidou.mybatisplus.generator.AutoGenerator;
   import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
   import com.baomidou.mybatisplus.generator.config.GlobalConfig;
   import com.baomidou.mybatisplus.generator.config.PackageConfig;
   import com.baomidou.mybatisplus.generator.config.StrategyConfig;
   
   public class Generator {
       public static void main(String[] args) {
           //创建代码生成器的对象
           AutoGenerator auto=new AutoGenerator();
   
           DataSourceConfig dataSource=new DataSourceConfig();
           dataSource.setDriverName("com.mysql.cj.jdbc.Driver");
           dataSource.setUrl("jdbc:mysql://127.0.0.1:3306/test?serverTimezone=UTC");
           dataSource.setUsername("root");
           dataSource.setPassword("123456");
           auto.setDataSource(dataSource);
   
           //设置全局配置
           GlobalConfig gc=new GlobalConfig();
           gc.setOutputDir(System.getProperty("user.dir")+"/src/main/java");  //设置输出位置（默认D盘）
           gc.setOpen(false);                       //设置生成完毕后是否打开生成代码所在的目录
           gc.setAuthor("HelloCode.");                      //设置生成作者
           gc.setFileOverride(true);                //设置是否覆盖原始生产的文件
           gc.setMapperName("%sDao");               //设置数据层接口，%s为占位符，指代模块名称
           gc.setIdType(IdType.ASSIGN_ID);          //设置id生成策略
           auto.setGlobalConfig(gc);
   
   
           //设置包名相关配置
           PackageConfig p=new PackageConfig();
           p.setParent("top.hellocode");         //设置生成的包名，与代码所在位置不冲突，二者叠加组成完整路径
           p.setEntity("domain");                //设置实体类包名
           p.setMapper("dao");                   //设置数据层包名
           auto.setPackageInfo(p);
   
   
           //策略设置
           StrategyConfig s=new StrategyConfig();
           s.setInclude("user");                    //设置当前参与生成的表名，参数为可变参数
           s.setTablePrefix("tb_");                 //设置数据库表的前缀名称，模块名=数据库表名-前缀名
           s.setRestControllerStyle(true);          //是否启用Rest风格
           s.setVersionFieldName("version");        //设置乐观锁字段名
           s.setLogicDeleteFieldName("deleted");    //设置逻辑删除字段名
           s.setEntityLombokModel(true);            //设置是否启用lombok
           auto.setStrategy(s);
   
           //执行代码生成器
           auto.execute();
       }
   }
   ```

   