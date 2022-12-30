---
title: "MyBatis"
order: 2
category:
  - 框架 | 中间件
---

# MyBatis

## 一、快速入门

> 框架是一款半成品软件，我们可以基于这个半成品软件继续开发，来完成我们的个性化需求

- ORM(Object Relational Mapping)：*对象关系映射*
- 指的是持久化数据和实体对象的映射模式，为了解决面向对象与关系型数据库存在的互不匹配的现象的技术

### 1、MyBatis介绍

**原始 JDBC 的操作问题分析**

1. 频繁创建和销毁数据库的连接会造成系统资源浪费从而影响系统性能
2. sql 语句在代码中硬编码，如果要修改sql语句，就需要修改 java 代码，造成代码不易维护
3. 查询操作时，需要手动将结果集中的数据封装到实体对象中
4. 增删改查操作需要参数时，需要手动将实体对象的数据设置到sql 语句的占位符

**原始 JDBC 的操作问题解决方案**

1. 使用数据库连接池初始化连接资源
2. 将sql 语句抽取到配置文件中
3. 使用反射、内省等底层操作技术，将实体与表进行属性与字段的自动映射

**Mybatis**

- MyBatis 是一个优秀的基于Java的持久层框架，它内部封装了 JDBC，使开发者只需要关注 SQL 语句本身，而不需要花费精力去处理加载驱动、创建连接、创建执行者等复杂的操作
- MyBatis 通过xml 或注解的方式将要执行的各种 Statement 配置起来，并通过Java 对象和Statement 中 SQL 的动态参数进行映射生成最终要执行的SQL语句
- 最后 MyBatis 框架执行完SQL 并将结果映射为 Java对象并返回。采用 ORM 思想解决了实体和数据库映射的问题，对 JDBC 进行了封装，屏蔽了 JDBC API 底层访问细节，使我们不用与 JDBC API 打交道，就可以完成对数据库的持久化操作
- MyBatis官网：[http://www.mybatis.org/mybatis-3](http://www.mybatis.org/mybatis-3)

### 2、入门程序

1. 数据库数据准备

2. 导入 jar 包

3. 在src 下创建映射配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <mapper namespace="StudentMapper">
       <select id="selectAll" resultType="mybaits.study.bean.Student">
           SELECT * FROM student
       </select>
   </mapper>
   ```

4. 在 src 下创建核心配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
   
   <configuration>
       <environments default="mysql">
           <environment id="mysql">
               <transactionManager type="JDBC"></transactionManager>
               <dataSource type="POOLED">
                   <property name="driver" value="com.mysql.jdbc.Driver"/>
                   <property name="url" value="jdbc:mysql://192.168.23.129:3306/db1"/>
                   <property name="username" value="root"/>
                   <property name="password" value="密码"/>
               </dataSource>
           </environment>
       </environments>
       
       <mappers>
           <mapper resource="StudentMapper.xml"></mapper>
       </mappers>
   </configuration>
   ```

5. 编写测试类完成相关API 的使用
6. 运行测试查看结果

```java
public class StudentTest01 {
    /*
    *       查询全部
    * */
    @Test
    public void selectAll() throws IOException {
        // 1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        // 2. 获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        // 3.通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 4.执行映射配置文件中的sql语句，并接收结果
        List<Student> list = sqlSession.selectList("StudentMapper.selectAll");

        // 5.处理结果
        for(Student stu : list){
            System.out.println(stu);
        }

        // 6.释放资源
        sqlSession.close();
        is.close();
    }
}
```

## 二、相关API

**Resources**

- org.apache.ibaties.io.Resources：加载资源的工具类


核心方法

| 返回值      | 方法名                                | 说明                                 |
| ----------- | ------------------------------------- | ------------------------------------ |
| InputStream | getResourcesAsStream(String fileName) | 通过类加载器返回指定资源的字节输入流 |

> 除了使用这个工具类的方法，还可以使用`类名.class.getClassLoader().getResourceAsStream(配置文件名.xml)`获取到字节输入流对象

**SqlSessionFactoryBuilder**

- org.apache.ibaties.session.SqlSessionFactoryBuilder：获取SqlSessionFactory 工厂对象的功能类


核心方法

| 返回值            | 方法名                | 说明                                          |
| ----------------- | --------------------- | --------------------------------------------- |
| SqlSessionFactory | build(InputStream is) | 通过指定资源字节输入流获取SqlSession 工厂对象 |

**SqlSessionFactory**

- org.apache.ibaties.srssion.SqlSessionFactory：获取SqlSession 构建者对象的工厂接口


核心方法

| 返回值     | 方法名                          | 说明                                                         |
| ---------- | ------------------------------- | ------------------------------------------------------------ |
| SqlSession | openSession()                   | 获取SqlSession 构建者对象，并开启手动提交事务                |
| SqlSession | openSession(boolean autoCommit) | 获取SqlSession构建者对象，如果参数为true，则开启自动提交事务 |

**SqlSession**

- org.apache.ibaties.session.SqlSession：构建者对象接口。用于执行SQL、管理事务、接口代理


核心方法

| 返回值    | 方法名                                         | 说明                           |
| --------- | ---------------------------------------------- | ------------------------------ |
| `List<E>` | `selectList(String statement,Object paramter)` | 执行查询语句，返回List集合     |
| `T`       | `selectOne(String statement,Object paramter)`  | 执行查询语句，返回一个结果对象 |
| `int`     | `insert(String statement,Object paramter)`     | 执行新增语句，返回影响行数     |
| `int`     | `update(String statement,Object paramter)`     | 执行修改语句，返回影响行数     |
| `int`     | `delete(String statement,Object paramter)`     | 执行删除语句，返回影响行数     |
| `void`    | `commit()`                                     | 提交事务                       |
| `void`    | `rollback()`                                   | 回滚事务                       |
| `T`       | `getMapper(Class<T> cls)`                      | 获取指定接口的代理实现类对象   |
| `void`    | `close()`                                      | 释放资源                       |

## 三、映射配置文件

> 映射配置文件包含了数据和对象之间的映射关系以及要执行的SQL语句

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBaties 的DTD约束-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--
	mapper：核心根标签
	namespace属性：名称空间
-->
<mapper namespace="StudentMapper">
    <!--
		select：查询功能的标签
		id：唯一标识，配合名称空间最终找到对应的sql语句
		resultType：指定结果映射对象的类型（查询出的数据封装到哪个对象，需要全类名）
		parameterType：指定参数映射对象lei'x
	-->
    <select id="selectAll" resultType="mybaits.study.bean.Student">
        SELECT * FROM student
    </select>
</mapper>
```

### 1、查询功能

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="StudentMapper">
    <select id="selectAll" resultType="mybatis.study.bean.Student">
        SELECT * FROM student
    </select>
    <select id="selectById" resultType="mybatis.study.bean.Student" parameterType="java.lang.Integer">
        SELECT * FROM student WHERE id = #{参数名称}
    </select>
</mapper>
```

```java
@Test 
public void selectById() throws IOException {
    InputStream is = Resources.getResourceAsStream("MybatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    Student stu = sqlSession.selectOne("StudentMapper.selectById", 1);
    System.out.println(stu);
    sqlSession.close();
    is.close();
}
```

- `<select>`：查询功能标签

- 属性
  
  id：唯一标识
  
parameterType：指定参数映射的对象类型
  
  resultType：指定结果映射的对象类型
  
- SQL 获取参数
  
#{属性名}

> 注意：属性名要和对象中的成员变量名称一致，才能获取到正确的值

### 2、新增功能

```xml
<insert id="insert" parameterType="mybatis.study.bean.Student">
	INSERT INTO student VALUES (#{id},#{name},#{age})
</insert>
```

```java
@Test
public void insert() throws IOException {
    InputStream is = Resources.getResourceAsStream("MybatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    Student stu = new Student(7,"老八",28);
    int result = sqlSession.insert("StudentMapper.insert", stu);
    // 如果没有开启自动提交事务，对于增删改，在执行完SQL后还需要提交事务
    // sqlSession.commit();
    System.out.println(result);
    is.close();
    sqlSession.close();
}
```

- `<insert>`：新增功能标签

- 属性
  
  id：唯一标识，配合名称空间使用
  
parameterType：指定参数映射的对象类型
  
resultType：指定结果映射的对象类型
  
  > 对于增删改操作，返回的的结果都是int类型的影响行数，故resultType可以省略不写
  
- SQL获取参数
  
#{属性名}

> 注意：属性名要和对象中的成员变量名称一致，才能获取到正确的值

### 3、修改功能

```xml
<update id="update" parameterType="mybatis.study.bean.Student">
	UPDATE student SET name = #{name},age = #{age} WHERE id = #{id}
</update>
```

```java
@Test
public void update() throws IOException {
    InputStream is = Resources.getResourceAsStream("MybatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    Student stu = new Student(6,"周七七",37);
    int result = sqlSession.insert("StudentMapper.update", stu);
    // 如果没有开启自动提交事务，对于增删改，在执行完SQL后还需要提交事务
    sqlSession.commit();
    System.out.println(result);
    is.close();
    sqlSession.close();
}
```

- `<update>`：修改功能标签

- 属性
  
  id：唯一标识，配合名称空间使用
  
  parameterType：指定参数映射的对象类型
  
  resultType：指定结果映射的对象类型
  
- SQL 获取参数
  
  #{属性名}

### 4、删除功能

```xml
<delete id="delete" parameterType="java.lang.Integer">
	DELETE FROM student WHERE id = #{id}
</delete>
```

```java
@Test
public void delete() throws IOException {
    InputStream is = Resources.getResourceAsStream("MybatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    int result = sqlSession.delete("StudentMapper.delete", 7);
    System.out.println(result);
    // 提交事务
    sqlSession.commit();
    sqlSession.close();
    is.close();
}
```

- `<delete>`：删除功能标签

- 属性

  id：唯一标识，配合名称空间使用

  parameterType：指定参数映射的对象类型

  resultType：指定结果映射的对象类型

- SQL 获取参数
  
  #{属性名}

## 四、核心配置文件

> 核心配置文件包含了MyBatis 最核心的设置和属性信息。如数据库的连接、事务、连接池信息等

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<!--核心根标签-->
<configuration>
    <!--配置数据库环境，环境可以有多个。default指定使用的是哪个-->
    <environments default="mysql">
        <!--配置数据库环境，可以写很多个，id表示唯一的标识-->
        <environment id="mysql">
            <!--事务管理，type属性代表采用JDBC默认的事务处理-->
            <transactionManager type="JDBC"></transactionManager>
            <!--数据源信息，type属性代表连接池-->
            <dataSource type="POOLED">
                <!--获取数据库连接的配置信息-->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://192.168.23.129:3306/db1"/>
                <property name="username" value="root"/>
                <property name="password" value="lh18391794828"/>
            </dataSource>
        </environment>
    </environments>
    <!--引入映射配置文件-->
    <mappers>
        <!--引入指定的映射配置文件  resource属性来指定映射配置文件的名称-->
        <mapper resource="StudentMapper.xml"></mapper>
    </mappers>
</configuration>
```

### 1、配置文件引用

> 为了方便修改，可以将核心配置文件中的数据库连接信息抽取出来：jdbc.properties

```properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://192.168.23.129
username=root
password=密码
```

- `<properties>`：使用该标签可以引入数据库连接配置文件

- 属性
  
  resource：数据库连接配置文件路径
  
- 获取数据库连接参数
  
  `${键名}`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--引入数据库连接配置文件-->
    <properties resource="jdbc.properties"></properties>
    <environments default="mysql">
        <environment id="mysql">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <!--获取数据库连接的配置信息-->
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="StudentMapper.xml"></mapper>
    </mappers>
</configuration>
```

### 2、起别名

- `<typeAliases>`：为全类名起别名的父标签

- `<typeAlias>`：为全类名起别名的子标签

- 属性
  
  type：指定全类名
  
  alias：指定别名
  
- `<package>`：为指定包下所有的类起别名的子标签（别名就是类名）

```xml
<!--起别名-->
<typeAliases>
	<typeAlias type="mybatis.study.bean.Student" alias="Student"></typeAlias>
    <!--<package name="mybatis.study.bean"/>-->
</typeAliases>
```

*在核心配置文件中起别名后，就可以简化映射配置文件中的全类名*

**MyBatis自带的一些别名**

| 别名    | 数据类型          |
| ------- | ----------------- |
| string  | java.lang.String  |
| long    | java.lang.Long    |
| int     | java.lang.Integer |
| double  | java.lang.Double  |
| boolean | java.lang.Boolean |
| ...     | ...               |

## 五、Dao层的实现

### 1、传统方式

- 分层思想：控制层（controller）、业务层（service）、持久层（dao）

- 调用流程
  
控制层 --> 业务层 --> 持久层 --> DB

> 在MyBatis中，持久层叫mapper

```java
package mybatis.study.mapper;

import mybatis.study.bean.Student;

import java.util.List;

/*
*       持久层
* */


public interface StudentMapper {
    // 查询全部
    public abstract List<Student> selectAll();

    // 根据id查询
    public abstract Student selectById(Integer id);

    // 新增数据
    public abstract Integer insert(Student stu);

    // 修改数据
    public abstract Integer update(Student stu);

    // 删除数据
    public abstract Integer delete(Integer id);
}
```

```java
package mybatis.study.mapper.impl;

import mybatis.study.bean.Student;
import mybatis.study.mapper.StudentMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class StudentMapperImpl implements StudentMapper {
    @Override
    public List<Student> selectAll() {
        InputStream is = null;
        SqlSession sqlSession = null;
        List<Student> list = null;
        try{
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession(true);
            list = sqlSession.selectList("StudentMapper.selectAll");
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(is != null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(sqlSession != null){
                sqlSession.close();
            }
        }
        return list;
    }

    @Override
    public Student selectById(Integer id) {
        InputStream is = null;
        SqlSession sqlSession = null;
        Student stu = null;
        try{
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession(true);
            stu = sqlSession.selectOne("StudentMapper.selectById",id);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(is != null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(sqlSession != null){
                sqlSession.close();
            }
        }
        return stu;
    }

    @Override
    public Integer insert(Student stu) {
        InputStream is = null;
        SqlSession sqlSession = null;
        Integer result = null;
        try{
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession(true);
            result = sqlSession.insert("StudentMapper.insert",stu);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(is != null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(sqlSession != null){
                sqlSession.close();
            }
        }
        return result;
    }

    @Override
    public Integer update(Student stu) {
        InputStream is = null;
        SqlSession sqlSession = null;
        Integer result = null;
        try{
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession(true);
            result = sqlSession.update("StudentMapper.update",stu);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(is != null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(sqlSession != null){
                sqlSession.close();
            }
        }
        return result;
    }

    @Override
    public Integer delete(Integer id) {
        InputStream is = null;
        SqlSession sqlSession = null;
        Integer result = null;
        try{
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession(true);
            result = sqlSession.delete("StudentMapper.delete",id);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(is != null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(sqlSession != null){
                sqlSession.close();
            }
        }
        return result;
    }
}
```

```java
package mybatis.study.service;

import mybatis.study.bean.Student;

import java.util.List;

/*
*       业务层
* */

public interface StudentService {
    // 查询全部
    public abstract List<Student> selectAll();

    // 根据id查询
    public abstract Student selectById(Integer id);

    // 新增数据
    public abstract Integer insert(Student stu);

    // 修改数据
    public abstract Integer update(Student stu);

    // 删除数据
    public abstract Integer delete(Integer id);
}
```

```java
package mybatis.study.service.impl;

import mybatis.study.bean.Student;
import mybatis.study.mapper.StudentMapper;
import mybatis.study.mapper.impl.StudentMapperImpl;
import mybatis.study.service.StudentService;

import java.util.List;

public class StudentServiceImpl implements StudentService {
    // 创建持久层对象
    private StudentMapper mapper = new StudentMapperImpl();

    @Override
    public List<Student> selectAll() {
        return mapper.selectAll();
    }

    @Override
    public Student selectById(Integer id) {
        return mapper.selectById(id);
    }

    @Override
    public Integer insert(Student stu) {
        return mapper.insert(stu);
    }

    @Override
    public Integer update(Student stu) {
        return mapper.update(stu);
    }

    @Override
    public Integer delete(Integer id) {
        return mapper.delete(id);
    }
}
```

```java
package mybatis.study.controller;

import mybatis.study.bean.Student;
import mybatis.study.service.StudentService;
import mybatis.study.service.impl.StudentServiceImpl;
import org.junit.Test;

import java.util.List;

/*
*   控制层测试类
* */
public class StudentController {
    // 创建业务层对象
    private StudentService service = new StudentServiceImpl();

    @Test
    public void selectAll(){
        List<Student> stus = service.selectAll();
        for(Student stu : stus){
            System.out.println(stu);
        }
    }

    @Test
    public void selectById(){
        Student stu = service.selectById(5);
        System.out.println(stu);
    }

    @Test
    public void insert(){
        Student stu = new Student(5,"赵六",46);
        Integer result = service.insert(stu);
        System.out.println(result);
    }

    @Test
    public void delete(){
        Integer result = service.delete(5);
        System.out.println(result);
    }

    @Test
    public void update(){
        Student stu = new Student(5,"赵六六",36);
        Integer result = service.update(stu);
        System.out.println(result);
    }
}
```

**LOG4J**

> 在日常开发过程中，排查问题时难免需要输出 MyBatis 真正执行的 SQL语句、参数、结果等信息，我们就可以借助 LOG4J 的功能来实现执行信息的输出

1. 导入jar 包

2. 修改核心配置文件

   ```xml
   <!--集成LOG4J日志信息-->
   <settings>
   	<setting name="logImpl" value="log4j"/>
   </settings>
   ```

3. 在 src下编写LOG4J 配置文件

   ```properties
   # Global logging configuration
   # 输出信息的显示。四个级别：ERROR、WARN、INFO、DEBUG
   log4j.rootLogger=DEBUG, stdout
   # Console output...
   log4j.appender.stdout=org.apache.log4j.ConsoleAppender
   log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
   log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
   ```

### 2、接口代理方式

> 传统方式实现Dao层，我们既需要写接口，还要写实现类。而MyBatis 框架可以帮助我们省略编写 Dao层接口实现类的步骤。程序员只需要编写接口，由MyBatis 框架根据接口的定义来创建该接口的动态代理对象

**实现规则**

1. 映射配置文件中的名称空间必须和 Dao 层接口的全类名相同
2. 映射配置文件中的增删改查标签的id属性必须和Dao层接口的方法名相同
3. 映射配置文件中的增删改查标签的 parameterType 属性必须和 Dao层 接口方法的参数相同
4. 映射配置文件中的增删改查标签的resultType 属性必须和 Dao层 接口方法的返回值相同

**代码实现**

1. 删除mapper层接口的实现类
2. 修改映射配置文件
3. 修改service 层接口的实现类，采用接口代理方式实现功能

```xml
<!--映射配置文件-->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mybatis.study.mapper.StudentMapper">
    <select id="selectAll" resultType="Student">
        SELECT * FROM student
    </select>
    <select id="selectById" resultType="Student" parameterType="int">
        SELECT * FROM student WHERE id = #{id}
    </select>
    <insert id="insert" parameterType="Student">
        INSERT INTO student VALUES (#{id},#{name},#{age})
    </insert>
    <update id="update" parameterType="Student">
        UPDATE student SET name = #{name},age = #{age} WHERE id = #{id}
    </update>
    <delete id="delete" parameterType="int">
        DELETE FROM student WHERE id = #{id}
    </delete>
</mapper>
```

```java
@Override
public List<Student> selectAll() {
    InputStream is = null;
    List<Student> list = null;
    SqlSession sqlSession = null;
    try{
        // 1.加载核心配置文件
        is = Resources.getResourceAsStream("MyBatisConfig.xml");
        // 2. 获取SqlSessionFactory 工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        // 3. 获取SqlSession对象
        sqlSession = sqlSessionFactory.openSession(true);
        // 4.获取StudentMapper持久层接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
        // 5.通过实现类对象调用方法，接收结果
        list = mapper.selectAll();
    }catch (Exception e){
        e.printStackTrace();
    }finally {
        // 6.释放资源
        if(sqlSession != null){
            sqlSession.close();
        }
        if(is != null){
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    return list;
}
```

> 通过动态代理开发模式，我们只编写一个接口，不写实现类，我们通过 getMapper()方法最终获取到org.apache.ibatis.binding.MapperProxy 代理对象，然后执行功能，而这个代理对象正是 MyBatis 使用了 JDK 的动态代理技术，帮助我们生成了代理实现类对象，从而可以进行相关持久化操作

> 动态代理实现类对象在执行方法的时候最终调用了 mapperMethod.execute() 方法，这个方法中通过 switch语句根据操作类型来判断是新增、修改、删除、查询操作，最后一步回到了 MyBatis 最原生的  SqlSession 方式来执行增删改查

## 六、动态sql

- MyBatis 映射配置文件中，前面使用的SQL 都是比较简单的，有些时候业务逻辑复杂时，我们的 SQL就是动态变化的，此时前面学习的 SQL 就不能满足需求了

- 多条件查询
  
  `SELECT * FROM student WHERE id = ? AND name = ? AND age = ?`
  
  `SELECT * FROM student WHERE id = ? AND name = ?`
  
- 动态SQL 标签
  
  `<if>`：条件判断标签
  
  `<foreach>`：循环遍历标签

### 1、if标签

`<where>`：条件标签。如果有动态条件，则使用该标签代替where 关键字

`<if>`：条件判断标签

```xml
<if test="条件判断">
    查询条件拼接
</if>
```

``` xml
<select id="selectCondition" resultType="student" parameterType="student">
    SELECT * FROM student
    <where>
        <if test="id != null">
            id = #{id}
        </if>
        <if test="name != null">
            AND name = #{name}
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
    </where>
</select>
```

### 2、foreach标签

`<foreach>`：循环遍历标签。适用于多个参数或者的关系

```xml
<foreach collection = "" open = "" close = "" item = "" separator = "">
    获取参数
</foreach>
```

**属性**

- collection：参数容器类型，（list-集合，array-数组）
- open：开始的 SQL 语句
- close：结束的 SQL 语句
- item：参数变量名
- separator：分隔符

``` xml
<select id="selectByIds" resultType="Student" parameterType="list">
    SELECT * FROM student
    <where>
        <foreach collection="list" open="id IN (" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```

### 3、SQL 片段的抽取

> 我们可以将一些重复性的SQL 语句进行抽取，以达到复用的效果

- `<sql>`：抽取SQL语句标签
  
  `<sql id="片段唯一标识">抽取的SQL语句</sql>`
  
- `<include>`：引入SQL片段标签
  
  `<include refid="片段唯一标识" />`

```xml
<sql id="select">SELECT * FROM student</sql>

<select id="selectAll" resultType="Student">
    <include refid="select" />
</select>
<select id="selectById" resultType="Student" parameterType="int">
    <include refid="select" /> WHERE id = #{id}
</select>
```

## 七、分页插件

- 分页可以将很多条结果进行分页显示
- 如果当前在第一页，则没有上一页。如果在最后一页，则没有下一页
- 需要明确当前是第几页，这一页中显示多少条结果

> 在企业级的开发中，分页也是一种常见的技术。而目前使用的 MyBatis 是不带分页功能的，如果想实现分页的功能，需要我们手动编写 LIMIT 语句。但是不同的数据库实现分页的 SQL 语句也是不同的，所以手写分页成本较高。这个时候可以借助分页插件来帮助我们实现分页功能

- PageHelper：第三方分页助手。将复杂的分页操作进行封装，从而让分页功能变得非常简单

**分页插件实现步骤**

1. 导入jar 包：pagehelper-5.1.10.jar、jsqlparser-3.1.jar
2. 在核心配置文件中集成分页助手插件
3. 在测试类中使用分页助手相关 API 实现分页功能

```xml
<!--集成分页助手插件-->
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

**分页参数的获取**

- PageInfo：封装分页相关参数的功能类


核心方法

| 返回值  | 方法名          | 说明               |
| ------- | --------------- | ------------------ |
| long    | getTotal()      | 获取总条数         |
| int     | getPages()      | 获取总页数         |
| int     | getPageNum()    | 获取当前页         |
| int     | getPageSize()   | 获取每页显示条数   |
| int     | getPrePage()    | 获取上一页         |
| int     | getNextPage()   | 获取下一页         |
| boolean | isIsFirstPage() | 获取是否是第一页   |
| boolean | isIsLastPage()  | 获取是否是最后一页 |

```java
@Test
public void selectPaging() throws IOException {
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

    // 通过分页助手实现分页功能
    // 参数：当前页,显示的条数
    PageHelper.startPage(1,3);

    List<Student> list = mapper.selectAll();
    for(Student stu : students){
        System.out.println(stu);
    }

    //获取分页相关参数
    PageInfo<Student> info = new PageInfo<>(list);
    
    System.out.println("总条数" + info.getTotal());
    System.out.println("总页数" + info.getPages());
    System.out.println("当前页" + info.getPageNum());
    System.out.println("每页条数" + info.getPageSize());
    System.out.println("上一页" + info.getPrePage());
    System.out.println("下一页" + info.getNextPage());
    System.out.println("是否是第一页：" + info.isIsFirstPage());
    System.out.println("是否是最后一页：" + info.isIsLastPage());

    sqlSession.close();
    is.close();
}
```

## 八、多表操作

多表模型的分类
- 一对一：在任意一方建立外键，关联对方的主键
- 一对多：在多的一方建立外键，关联少的一方的主键
- 多对多：借助中间表，中间表至少两个字段，分别关联两张表的主键

### 1、一对一

> 一对一模型：人和身份证，是一对一的关系

**数据准备**

```sql
CREATE DATABASE db12;
USE db12;
CREATE TABLE person(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	age INT
);
INSERT INTO person VALUES (NULL,'张三',23),(NULL,'李四',24),(NULL,'王五',25);
CREATE TABLE card(
	id INT PRIMARY KEY AUTO_INCREMENT,
	number VARCHAR(30),
	pid INT,
	CONSTRAINT cp_fk FOREIGN KEY (pid) REFERENCES person(id)
);
INSERT INTO card VALUES (NULL,'12345',1),(NULL,'23456',2),(NULL,'34567',3);
```

**映射配置文件**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mybatis.study.table01.OneToOneMapper">
    <!--配置表中的字段和实体对象属性的映射关系-->
    <resultMap id="oneToOne" type="card">
        <id column="cid" property="id" />
        <result column="number" property="number" />
        <!--
            配置被包含对象的映射关系
            property：被包含对象的变量名
            javaType：被包含对象的实际的数据类型
        -->
        <association property="p" javaType="person">
            <id column="pid" property="id" />
            <result column="name" property="name" />
            <result column="age" property="age" />
        </association>
    </resultMap>
    <select id="selectAll" resultMap="oneToOne">
        SELECT c.id,number,pid,NAME,age FROM card c,person p WHERE c.pid = p.id;
    </select>
</mapper>
```

```java
@Test
public void selectAll() throws IOException {
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    OneToOneMapper mapper = sqlSession.getMapper(OneToOneMapper.class);
    List<Card> list = mapper.selectAll();
    for(Card card : list){
        System.out.println(card);
    }
}
```

- `<resultMap>`：配置字段和对象属性的映射关系标签
  
  id属性：唯一标识

  type属性：实体对象类型
  
- `<id>`：配置主键映射关系标签

- `<result>`：配置非主键映射关系标签

  column属性：表中字段名称

  property属性：实体对象变量名称

- `<association>`：配置被包含对象的映射关系标签
  
  property属性：被包含对象的变量名
  
  javaType属性：被包含对象的数据类型

### 2、一对多

> 一对多模型：班级和学生，一个班级可以有多个学生

**数据准备**

```sql
CREATE TABLE classes(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO classes VALUES (NULL,'一班'), (NULL,'二班');
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(30),
	age INT,
	cid INT,
	CONSTRAINT cs_fk FOREIGN KEY (cid) REFERENCES classes(id)
);
INSERT INTO student VALUES (NULL,'张三',23,1),(NULL,'李四',24,1),(NULL,'王五',25,2),(NULL,'赵六',26,2);
```

**映射配置文件**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mybatis.study.table02.OneToManyMapper">
    <resultMap id="oneToMany" type="classes">
        <id column="cid" property="id" />
        <result column="cname" property="name" />
        
        <!--
            collection：配置被包含的集合对象映射关系
                property：被包含对象的变量名称
                ofType：被包含对象的实际数据类型
        -->
        <collection property="students" ofType="student">
            <id column="sid" property="id" />
            <result column="sname" property="name" />
            <result column="sage" property="age" />
        </collection>
        
    </resultMap>
    <select id="selectAll" resultMap="oneToMany">
        SELECT c.id cid,c.name cname,s.id sid, s.name sname,s.age sage FROM classes c,student s WHERE c.id = s.cid;
    </select>
</mapper>
```

```java
@Test
    public void selectAll() throws IOException {
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        OneToManyMapper mapper = sqlSession.getMapper(OneToManyMapper.class);
        List<Classes> classes = mapper.selectAll();
        for(Classes cls : classes){
            System.out.println(cls.getId() + "," + cls.getName());
            List<Student> students = cls.getStudents();
            for(Student stu : students){
                System.out.println("\t" + stu);
            }
        }
    }
```

- `<resultMap>`：配置字段和对象属性的映射关系标签
  
  id属性：唯一标识
  
  type属性：实体对象类型
  
- `<id>`：配置主键映射的关系标签

- `<result>`：配置非主键映射关系标签
  
  column属性：表中字段名称
  
  property属性：实体对象变量名称
  
- `<collection>`：配置被包含集合对象的映射关系标签
  
  property属性：被包含集合对象的变量名
  
  ofType属性：集合中保存的对象数据类型

### 3、多对多

> 多对多模型：学生和课程，一个学生可以选择多门课程，一个课程也可以被多个学生所选择

**数据准备**

```sql
CREATE TABLE course(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO course VALUES (NULL,'语文'),(NULL,'数学');
CREATE TABLE stu_cr(
	id INT PRIMARY KEY AUTO_INCREMENT,
	sid INT,
	cid INT,
	CONSTRAINT sc_fk1 FOREIGN KEY (sid) REFERENCES student(id),
	CONSTRAINT sc_fk2 FOREIGN KEY (cid) REFERENCES course(id)
);
INSERT INTO stu_cr VALUES (NULL,1,1),(NULL,1,2),(NULL,2,1),(NULL,2,2);
```

**映射配置文件**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mybatis.study.table03.ManyToManyMapper">
    <resultMap id="manyToMany" type="student">
        <id column="sid" property="id" />
        <result column="sname" property="name" />
        <result column="sage" property="age" />
        
        <collection property="courses" ofType="course">
            <id column="cid" property="id" />
            <result column="cname" property="name" />
        </collection>
    </resultMap>
    
    <select id="selectAll" resultMap="manyToMany">
        SELECT sc.sid,s.name sname,s.age sage,sc.cid,c.name cname FROM student s,course c,stu_cr sc WHERE sc.sid = s.id AND sc.cid = c.id;
    </select>
</mapper>
```

```java
@Test
public void selectAll() throws IOException {
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    ManyToManyMapper mapper = sqlSession.getMapper(ManyToManyMapper.class);
    List<Student> students = mapper.selectAll();
    for(Student stu : students){
        System.out.println(stu.getId() + "," + stu.getName() + "," + stu.getAge());
        List<Course> courses = stu.getCourses();
        for(Course cour : courses){
            System.out.println("\t" + cour);
        }
    }
}
```

- `<resultMap>`：配置字段和对象属性的映射关系标签
  
  id属性：唯一标识
  
  type属性：实体对象类型
  
- `<id>`：配置主键映射关系标签

- `<result>`：配置非主键映射关系标签
  
  column属性：表中字段名称
  
  property属性：实体对象变量名称
  
- `<collection>`：配置被包含集合对象的映射关系标签
  
  property属性：被包含集合对象的变量名
  
  ofType属性：集合中保存的对象数据类型

## 九、注解开发

- `@Select("查询的SQL语句")`：执行查询操作注解

- `@Insert("新增的SQL语句")`：执行新增操作注解

- `@Update("修改的SQL语句")`：执行修改操作注解

- `@Delete("删除的SQL语句")`：执行删除操作注解

### 1、查询操作

1. 创建接口和查询方法

2. 在核心配置文件中配置映射关系

   ```xml
   <mappers>
       <!--指定接口所在的包即可-->
   	<package name="mybatis.study.mapper" />
   </mappers>
   ```

3. 编写测试类

   ```java
   @Test
   public void selectAll() throws IOException {
       InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
       SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
       SqlSession sqlSession = sqlSessionFactory.openSession(true);
       StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
       List<Student> students = mapper.selectAll();
       for (Student student : students) {
           System.out.println(student);
       }
   }
   ```

### 2、新增操作

1. 在接口中创建新增方法

   ```java
   // 新增操作
   @Insert("INSERT INTO student VALUES (#{id},#{name},#{age})")
   public abstract Integer insert(Student stu);
   ```

2. 编写测试类

3. 实现功能

   ```java
   @Test
   public void insert() throws IOException {
       InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
       SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
       SqlSession sqlSession = sqlSessionFactory.openSession(true);
       StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
       Student stu = new Student(null,"周七",27);
       Integer result = mapper.insert(stu);
       System.out.println(result);
   }
   ```

> 修改、删除操作原理相同

## 十、注解多表操作

### 1、一对一

```java
// 查询全部
@Select("SELECT * FROM card")
@Results(
    {
        @Result(column = "id", property = "id"),
        @Result(column = "number", property = "number"),
        @Result(
            property = "p",     //被包含对象的变量名
            javaType = Person.class,     //被包含对象的实际数据类型
            column = "pid",         // 根据查询出的card表中的pid查询person表
            // one、@One 是一对一操作的固定写法
            // select属性：指定调用哪个接口中的哪个方法
            one=@One(select = "mybatis.study.one_to_one.PersonMapper.selectById")
        )
    }
)
public abstract List<Card> selectAll();
```

```java
// 根据id查询
@Select("SELECT * FROM student WHERE id = #{id}")
public abstract Person selectById(Integer id);
```

- `@Results`：封装映射关系的父注解
  
  Result[] value()：定义了Result数组
  
- `@Result`：封装映射关系的子注解
  
  column属性：查询出表中的字段名称
  
  property属性：实体对象中的属性名
  
  javaType属性：被包含对象的数据类型
  
  one属性：一对一查询的固定属性
  
- `@One`：一对一查询的注解
  
  select属性：指定调用某个接口中的方法

### 2、一对多

```java
// 查询全部
@Select("SELECT * FROM classes")
@Results({
    @Result(column = "id",property = "id"),
    @Result(column = "name",property = "name"),
    @Result(
        property = "students",
        javaType = List.class,
        column = "id",
        /*
        *       many、@Many 一对多查询的固定写法
        *       select：指定调用哪个接口中的哪个查询方法
        * */
        many=@Many(select = "mybatis.study.one_to_many.StudentMapper.selectByCid")
    )
})
public abstract List<Classes> selectAll();
```

```java
//根据cid查询student表
@Select("SELECT * FROM student WHERE cid = #{cid}")
public abstract List<Student> selectByCid(Integer cid);
```

- many属性：一对多查询的固定属性

- @Many：一对多查询的注解
  
  select属性：指定调用某个接口中的方法

### 3、多对多

```java
// 查询全部
@Select("SELECT DISTINCT s.id,s.name,s.age FROM student s,stu_cr sc WHERE sc.sid=s.id")
@Results({
    @Result(column = "id",property = "id"),
    @Result(column = "name",property = "name"),
    @Result(column = "age",property = "age"),
    @Result(
        property = "courses",
        javaType= List.class,
        column = "id",
        many = @Many(select = "mybatis.study.many_to_many.CourseMapper.selectBySid")
    )
})
public abstract List<Student> selectAll();
```

```java
// 根据学生id查询所选课程
@Select("SELECT c.id,c.name FROM stu_cr sc,course c WHERE sc.cid=c.id AND sc.sid = #{id}")
public abstract List<Course> selectBySid(Integer id);
```

> 多对多中的一些注解和一对多一样，主要区别就是多对多中使用了第三张中间表

## 十一、构建SQL

- 我们之前通过注解开发时，相关SQL语句都是自己直接拼写的。一些关键字写起来比较麻烦，而且容易出错
- MyBatis 给我们提供了 org.apache.ibatis.jdbc.SQL 功能类，专门用于构建 SQL语句

| 方法名                              | 说明                         |
| ----------------------------------- | ---------------------------- |
| SELECT(String...column)             | 根据字段拼接查询语句         |
| FROM(String...table)                | 根据表名拼接语句             |
| WHERE(String...condition)           | 根据条件拼接语句             |
| INSERT_INTO(String table)           | 根据表名拼接新增语句         |
| VALUES(String column,String values) | 根据字段和值拼接插入数据语句 |
| UPDATE(String table)                | 根据表名拼接修改语句         |
| DELETE_FROM(String table)           | 根据表名拼接删除语句         |
| ... ...                             | ... ...                      |

### 1、查询操作

- 定义功能类并提供获取查询的SQL 语句的方法

- `@SelectProvider`：生成查询用的 SQL语句注解
  
  type属性：生成SQL 语句功能类对象
  
  method属性：指定调用方法

```java
public static String getSql(){
    String sql = new SQL(){
        {
            SELECT("*");
            FROM("student");
        }
    }.toString();
    return sql;
}
```

```java
// 查询全部
// @Select("SELECT * FROM student")
@SelectProvider(type = ReturnSql.class, method = "getSelectAll")
public abstract List<Student> selectAll();
```

### 2、新增操作

- 定义功能类并提供获取新增SQL语句的方法

- `@InsertProvider`：生成新增用的SQL语句注解
  
  type属性：生成SQL语句功能类对象
  
  method属性：指定调用方法

```java
// 定义方法，返回新增的sql语句
public String getInsert(Student stu){
    return new SQL(){
        {
            INSERT_INTO("student");
            INTO_VALUES("#{id},#{name},#{age}");
        }
    }.toString();
}
```

```java
// 新增操作
// @Insert("INSERT INTO student VALUES (#{id},#{name},#{age})")
@InsertProvider(type = ReturnSql.class,method = "getInsert")
public abstract Integer insert(Student stu);
```

### 3、修改操作

- 定义功能类并提供获取修改SQL语句的方法

- `@UpdateProvider`：生成修改用的 SQL语句注解
  
  type属性：生成SQL 语句功能类对象
  
  method属性：指定调用方法

```java
// 定义方法，返回修改的SQL语句
public String getUpdate(Student stu){
    return new SQL(){
        {
            UPDATE("student");
            SET("name=#{name}","age=#{age}");
            WHERE("id=#{id}");
        }
    }.toString();
}
```

```java
// 修改操作
//@Update("UPDATE student SET name=#{name},age=#{age} WHERE id = #{id}")
@UpdateProvider(type = ReturnSql.class,method = "getUpdate")
public abstract Integer update(Student stu);
```

### 4、删除操作

- 定义功能类并提供获取删除的  SQL语句的方法

- `@DeleteProvider`：生成删除用的SQL语句注解
  
  type属性：生成SQL 语句功能类对象
  
  method属性：指定调用方法

```java
// 定义方法，返回删除的sql语句
public String getDelete(Integer id){
    return new SQL(){
        {
            DELETE_FROM("student");
            WHERE("id=#{id}");
        }
    }.toString();
}
```

```java
// 删除操作
//@Delete("DELETE FROM student WHERE id = #{id}")
@DeleteProvider(type = ReturnSql.class,method = "getDelete")
public abstract Integer delete(Integer id);
```