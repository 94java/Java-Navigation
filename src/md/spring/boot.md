---
title: "SpringBoot"
order: 5
category:
  - Spring
---

# SpringBoot

## 一、概述

- SpringBoot提供了一种快速使用Spring的方式，基于约定优于配置的思想，可以让开发人员不必在配置与逻辑业务之间进行思维的切换，全身心投入到逻辑业务的代码编写中，从而大大提高了开发的效率，一定程度上缩短了项目周期，2014年4月，SpringBoot 1.0.0 发布。Spring的顶级项目之一(https://spring.io)

**Spring缺点**

1. 配置繁琐
   虽然Spring的组件代码是轻量级的，但它的配置却是重量级的。一开始，Spring用XML配置，而且是很多XML配置。Spring 2.5引入了基于注解的组件扫描，这消除了大量针对应用程序自身组件的显示XML配置。Spring 3.0引入了基于Java的配置，这是一种类型安全的可重构配置方式，可以代替XML
   所有这些配置都代表了开发时的损耗。因为在思考Spring特性配置和解决业务问题之间需要进行思维切换，所以编写配置挤占了编写应用程序逻辑的时间。和所有框架一样，Spring实用，但它要求的回报也不少
2. 依赖繁琐
   项目的依赖管理也是一件耗时耗力的事情。在环境搭建时，需要分析要导入哪些库的坐标，而且还需要分析导入与之有依赖关系的其他库的坐标，一旦选错了依赖的版本，随之而来的不兼容问题就会严重阻碍项目的开发进度

**SpringBoot功能**

1. 自动配置
   SpringBoot的自动配置是一个运行时（更准确的说，是应用程序启动时）的过程，考虑了众多因素，才决定Spring配置应该用哪个，不该用哪个。该过程是SpringBoot自动完成的
2. 起步依赖
   起步依赖本质上是一个Maven项目对象模型（Project Object Model, POM），定义了对其他库的*传递依赖*，这些东西加在一起即支持某项功能
   简单地说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能
3. 辅助功能
   提供了一些大型项目中常见的非功能性特性，如嵌入式服务器、安全、指标，监控检测、外部配置等

*SpringBoot并不是对Spring功能上的增强，而是提供了一种快速使用Spring的方式*

## 二、快速入门

**需求**

搭建SpringBoot工程，定义HelloController.hello()方法，返回"Hello SpringBoot！"

**实现步骤**

1. 创建Maven项目

2. 导入SpringBoot起步依赖

   ```xml
   <!--SpringBoot需要继承的父项目--> 
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-parent</artifactId>
       <version>2.6.12-SNAPSHOT</version>
       <relativePath/> <!-- lookup parent from repository -->
   </parent>
   
   <dependencies>
       <!--web开发的起步依赖-->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
   </dependencies>
   ```

3. 定义Controller

4. 编写引导类（SpringBoot项目的入口）

   - 加注解：`@SpringBootApplication`

   - 编写main方法

     ```java
     @SpringBootApplication
     public class HelloApplication {
         public static void main(String[] args) {
             SpringApplication.run(HelloApplication.class,args);
         }
     }
     ```

5. 启动测试

> SpringBoot在创建项目时，使用jar打包方式
>
> SpringBoot的引导类，是项目入口，运行main方法就可以启动项目
>
> 使用SpringBoot和Spring构建的项目，业务代码编写方式完全一样

#### 快速构建

**需求**

使用idea快速构建SpringBoot工程，定义`HelloController.hello()`方法，返回"Hello SpringBoot!"

**步骤**

![image-20220905115243972](http://images.hellocode.top/image-20220905115243972.png)

![image-20220905115426311](http://images.hellocode.top/image-20220905115426311.png)

使用idea，选择Spring Initializr，进行图形化操作即可完成SpringBoot项目的快速构建

![image-20220905115558046](http://images.hellocode.top/image-20220905115558046.png)

## 三、起步依赖

**原理分析**

1. spring-boot-starter-parent
   定义了一些版本信息，通过maven父工程，将对应的依赖以及版本由dependencyManagement进行管理
   在父工程预定义了经过测试无冲突的一些常用maven坐标及版本，子工程直接继承
2. spring-boot-starter-web

**小结**

- 在spring-boot-starter-parent中定义了各种技术的版本信息，组合了一套最优搭配的技术版本
- 在各种starter中，定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程
- 我们的工程继承parent，引入starter后，通过依赖传递，就可以简单方便获得需要的jar包，并且不会存在版本冲突等问题

## 四、配置

#### 文件分类

- SpringBoot是基于约定的，所以很多配置都有默认值，但如果想使用自己的配置替换默认配置的话，就可以使用application.properties或者application.yml（application.yaml）进行配置

- properties
  `server.port=8080`

- yml

  ```yaml
  server:
  	port: 8080
  ```

  > yaml中，值与键的`:`之间要有空格
  > 即`port:`和8080之间必须有一个空格

- 默认配置文件名称：application

- 加载优先级
  properties  >  yml  >  yaml
  如果三种配置文件都有相同的配置，将优先使用高优先级的配置

#### yaml

- YAML全称是YAML Ain`t Markup Language。YAML是一种直观的能够被电脑识别的数据序列化格式，并且容易被人类阅读，容易和脚本语言交互，可以被支持YAML库的不同的编程语言导入，比如：C/C++，Ruby，Python，Java，Perl，C#，PHP等。YML文件是以*数据为核心*的，比传统的xml方式更加简洁

- YAML文件的扩展名可以使用`.yml`或者`.yaml`

**对比**

- properties

  ```properties
  server.port=8080
  server.address=127.0.0.1
  ```

- xml

  ```xml
  <server>
  	<port>8080</port>
      <address>127.0.0.1</address>
  </server>
  ```

- yaml

  ```yaml
  server:
  	port: 8080
  	address: 127.0.0.1
  ```

**基本语法**

- 大小写敏感

- 数据值前边必须有空格，作为分隔符

- 使用缩进表示层级关系

- 缩进时不允许使用Tab键，只允许使用空格（各个系统Tab对应的空格数目可能不同，导致层次混乱）

- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

- `# `表示注释，从这个字符一直到行尾，都会被解析器忽略

  ```yaml
  server:
    port: 8080
    address: 127.0.0.1
  
  name: abc
  ```

**数据格式**

- 对象（map）：键值对的集合

  ```yaml
  person:
    name: zhangsan
  # 行内写法（了解）
  person: {name: zhangsan}
  ```

- 数组：一组按次序排列的值

  ```yaml
  address:
    - beijing
    - shanghai
  # 行内写法
  address: [beijing,shanghai]
  ```

- 纯量：单个的、不可再分的值

  ```yaml
  msg1: 'hello \n world'     # 单引忽略转义字符（原样输出）
  msg2: "hello \n world"	   # 双引识别转义字符
  ```

**参数引用**

```yaml
name: lisi

person:
  name: ${name}     # 引用上方定义的name值
```

#### 读取配置内容

1. `@Value`
   ![image-20220905181220979](http://images.hellocode.top/image-20220905181220979.png)
2. Environment对象
   ![image-20220905181359454](http://images.hellocode.top/image-20220905181359454.png)
3. `@ConfigurationProperties`
   ![image-20220905182518689](http://images.hellocode.top/image-20220905182518689.png)
   - 该注解可直接将对应的配置值封装到Java对象中，需要字段名称相同
   - 为了便于区分，一般会加上*prefix*前缀指定配置，如不指定，将查找配置文件中的纯数据，而不会进入到对象中
   - 需要给对应的Java类添加`@Component`和`@ConfigurationProperties`注解以及set方法

#### profile

我们在开发SpringBoot应用时，通常一套程序会被安装到不同环境，比如：开发、测试、生产等。其中数据库地址、服务器端口等等配置都不同，如果每次打包时，都需要修改配置文件，那么非常麻烦。profile功能就是来进行动态配置切换的

1. profile配置方式

   - 多profile文件方式

     - 创建多个配置文件，对应不同的环境

     - 文件名称application-xxx，一般推荐application-dev（开发），application-test（测试），application-pro（生产）

       ![image-20220905184543883](http://images.hellocode.top/image-20220905184543883.png)

   - yml多文档方式

     - 对应上方多profile文件方式，yml多文档方式只需要创建一个yml配置文件

     - 通过`---`将yml文档分为多个部分，对应不同的环境，通过`spring.profiles`指定对应区域名称

       ```yaml
       spring:
         profiles:
           active: pro
       
       ---
       server:
         port: 8084
       
       spring:
         profiles: dev
       ---
       server:
         port: 8085
       
       spring:
         profiles: test
       
       ---
       server:
         port: 8086
       
       spring:
         profiles: pro
       ```

2. profile激活方式

   - 配置文件
     在application配置文件中参数：`spring.profiles.active=环境名称`
     ![image-20220905184451250](http://images.hellocode.top/image-20220905184451250.png)
   - 虚拟机参数(VM options)（`-D`开始）
     `-Dspring.profiles.active=环境名称`
     ![image-20220905184959770](http://images.hellocode.top/image-20220905184959770.png)
   - 命令行参数（Program arguments）(`--`开始)
     `--spring.profiles.active=环境名称`
     ![image-20220905185234399](http://images.hellocode.top/image-20220905185234399.png)
     或者cmd命令行启动
     ![image-20220905190027880](http://images.hellocode.top/image-20220905190027880.png)

#### 加载顺序

**内部配置加载顺序**

SpringBoot程序启动时，会从以下位置加载配置文件

1. `file:./config/`：当前项目下的`/config`目录下
2. `file:./`：当前项目的根目录
3. `classpath:/config/`：classpath的`/config`目录
4. `classpath:/`：classpath的根目录（java和resources目录中的文件最终都会打包进入classpath根目录）

> *加载顺序为上文的排列顺序，高优先级配置的属性会生效*
>
> *上述路径下的配置文件均会加载，有冲突时默认高优先级*

**外部配置加载顺序**

通过官网查看外部属性加载顺序：[https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html)

## 五、整合其他框架

#### Junit

**需求**：SpringBoot整合Junit

**实现步骤**

1. 搭建SpringBoot工程
2. 引入starter-test起步依赖
3. 编写测试类
4. 添加测试相关注解
   - `@RunWith(SpringRunner.class)`
   - `@SpringBootTest(classes = 启动类.class)`
     如果测试类和启动类在同一个包或者位于启动类子包，就不用写classes属性
5. 编写测试方法

> 新版spring-boot-starter-test不再集成junit，而是junit-jupiter
>
> spring-boot-starter-test 2.5.5 版本只需要在类上加上@SpringBootTest即可，不需要再加@RunWith()注解了。

#### Redis

**需求**：SpringBoot整合Redis

**实现步骤**

1. 搭建SpringBoot工程
2. 引入redis起步依赖
3. 配置redis相关属性（默认ip：localhost，默认端口6379）
   在application配置文件中输入redis，就会有相应的提示，进行配置即可
   ![image-20220905202917965](http://images.hellocode.top/image-20220905202917965.png)
4. 引入RedisTemplate模板
5. 编写测试方法，测试

```java
package top.hellocode.springredis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class SpringRedisApplicationTests {
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    void testSet() {
        redisTemplate.boundValueOps("name").set("zhangsan");
    }
    @Test
    void testGet() {
        String name = (String) redisTemplate.boundValueOps("name").get();
        System.out.println(name);
    }
}
```

#### MyBatis

**需求**：SpringBoot整合MyBatis

**实现步骤**

1. 搭建SpringBoot工程

2. 引入mybatis起步依赖，添加mysql驱动
   如果mysql为5.x版本，引入的起步依赖是最新版，需要单独指定mysql驱动的版本，测试5.1.32可用

3. 编写DataSource和MyBatis相关配置
   相关配置同样是application中配置，输入MyBatis就会有提示
   可以配置别名、核心配置文件路径、映射配置文件路径等等
   
   ```yaml
   # datasource
   spring:
     datasource:
       driver-class-name: com.mysql.jdbc.Driver
       url: jdbc:mysql://192.168.23.129:3306/db1
       username: root
       password: 
   mybatis:
     config-location:
     mapper-locations:
     type-aliases-package: 
   ```
   
4. 定义表和实体类

5. 编写dao和mapper文件/纯注解开发

   ```java
   @Mapper
   public interface StudentMapper {
       @Select("select * from student")
       public List<Student> findAll();
   }
   ```

6. 测试

> SpringBoot版本低于2.4.3（不含），Mysql驱动版本大于8.0时，需要在url连接串中配置时区
>
> `jdbc:mysql://localhost:3306/db1?serverTimezone=UTC`
>
> 或在MySql数据库端配置时区解决此问题

## 六、高级原理分析

#### 自动配置

**Condition**

> Condition是在Spring4.0增加的条件判断功能，通过这个功能可以实现选择性的创建Bean操作

**需求**

- 在Spring的IOC容器中有一个User的Bean，现要求：

1. 导入Jedis坐标后，加载该bean，没导入，不加载

```java
@Configuration
public class UserConfig {
    @Bean
    @Conditional(ClassCondition.class)
    public User user(){
        return new User();
    }
}
```

```java
package top.hellocode.springcondition.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;


/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月06日 10:58
 */
public class ClassCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 思路：判断redis.clients.jedis.Jedis.class文件是否存在
        try{
            Class<?> cls = Class.forName("redis.clients.jedis.Jedis");
            return true;
        }catch (ClassNotFoundException e){
            e.printStackTrace();
            return false;
        }
    }
}
```

```java
@SpringBootApplication
public class SpringConditionApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SpringConditionApplication.class, args);
        User user = (User) context.getBean("user");
        System.out.println(user);
    }

}
```

2. 将类的判断定义为动态的。判断哪个字节码文件存在可以动态指定

```java
package top.hellocode.springcondition.condition;

import org.springframework.context.annotation.Conditional;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(ClassCondition.class)
public @interface ConditionOnClass {
    String[] value();
}
```

```java
package top.hellocode.springcondition.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import java.util.Map;


/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月06日 10:58
 */
public class ClassCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 思路：自定义注解完成
        Map<String, Object> map = metadata.getAnnotationAttributes(ConditionOnClass.class.getName());
        String[] value = (String[]) map.get("value");
        try{
            for (String cls : value) {
                Class.forName(cls);
            }
            return true;
        }catch (ClassNotFoundException e){
            e.printStackTrace();
            return false;
        }
    }
}
```

*小结*

- 自定义条件
  1. 定义条件类：自定义类实现Condition接口，重写matches方法，在matches方法中进行逻辑判断，返回boolean值。matches方法两个参数：
     - context：上下文对象，可以获取属性值，获取类加载器，获取BeanFactory等
     - metadata：元数据对象，用于获取注解属性
  2. 判断条件：在初始化bean时，使用`@Conditional(条件类.class)`注解
- SpringBoot提供的常用条件注解
  - ConditionalOnProperty：判断配置文件中是否有对应属性和值才初始化bean
  - ConditionalOnClass：判断环境中是否有对应字节码文件才初始化bean
  - ConditionalOnMissingBean：判断环境中没有对应的Bean才初始化Bean

**切换内置web服务器**

> SpringBoot的web环境中默认使用tomcat作为内置服务器，其实SpringBoot提供了4种内置服务器供我们选择，我们可以很方便的切换

SpringBoot内置了四种服务器

- Jetty
- Netty
- Tomcat（默认）
- Undertow

基于自动配置思想，如果需要切换内置服务器，只需要将tomcat的maven依赖排除，导入上述其他依赖即可完成自动切换

**@Enable*注解**

> SpringBoot中提供了很多Enable开头的注解，这些注解都是用于动态启用某些功能的。而其底层原理是使用`@Import`注解导入一些配置类，实现bean的动态加载

![image-20220906125256675](http://images.hellocode.top/image-20220906125256675.png)

- SpringBoot工程无法直接获取到jar包中定义的bean
  - 可以通过使用`@ComponentScan`注解扫描对应的包，实现bean加载
  - 使用`@Import`注解，加载类。这些类都会被Spring创建，并放入IOC容器
  - 自定义注解封装`@Import`，实现bean的加载

**@Import注解**

> `@Enable*`底层依赖于`@Import`导入的类会被Spring加载到IOC容器中

`@Import`提供4种用法：

1. 导入Bean

   ```java
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.context.ConfigurableApplicationContext;
   import org.springframework.context.annotation.Import;
   
   @SpringBootApplication
   @Import(User.class)
   public class SpringbootImportApplication {
   
       public static void main(String[] args) {
           ConfigurableApplicationContext context = SpringApplication.run(SpringbootImportApplication.class, args);
   
           // User user = context.getBean(User.class); // 这种获取不到
           User user = (User) context.getBean("user");
           System.out.println(user);
       }
   
   }
   ```

   > 使用这种方法，配置类上的@Configuration注解可以不需要了

2. 导入配置类（UserConfig）

   ```java
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   @Configuration
   public class UserConfig {
       @Bean
       public User user(){
           return new User();
       }
   }
   ```

   ```java
   import com.aiw.springbootimport.config.UserConfig;
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.context.ConfigurableApplicationContext;
   import org.springframework.context.annotation.Import;
   
   @SpringBootApplication
   @Import(UserConfig.class)
   public class SpringbootImportApplication {
   
       public static void main(String[] args) {
           ConfigurableApplicationContext context = SpringApplication.run(SpringbootImportApplication.class, args);
   
           User user = context.getBean(User.class);
           // User user = (User) context.getBean("user");     // 这种也可以获取到
           System.out.println(user);
       }
   
   }
   ```

3. 导入ImportSelector实现类。一般用于加载配置文件中的类（SpringBootApplication注解使用的这个方式）

   ```java
   import org.springframework.context.annotation.ImportSelector;
   import org.springframework.core.type.AnnotationMetadata;
   
   public class MyImportSelector implements ImportSelector {
       @Override
       public String[] selectImports(AnnotationMetadata importingClassMetadata) {
           return new String[]{"com.aiw.springbootimport.pojo.User"};
       }
   }
   ```

   > 字符串不是写死的，以后可以写到配置文件中去

   ```java
   import com.aiw.springbootimport.config.MyImportSelector;
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.context.ConfigurableApplicationContext;
   import org.springframework.context.annotation.Import;
   
   @SpringBootApplication
   @Import(MyImportSelector.class)
   public class SpringbootImportApplication {
   
       public static void main(String[] args) {
           ConfigurableApplicationContext context = SpringApplication.run(SpringbootImportApplication.class, args);
   
           // User user = context.getBean(User.class); // 这种获取不到
           User user = (User) context.getBean("user");    
           System.out.println(user);
       }
   
   }
   ```

4. 导入ImportBeanDefinitionRegistrar实现类

   ```java
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.beans.factory.support.AbstractBeanDefinition;
   import org.springframework.beans.factory.support.BeanDefinitionBuilder;
   import org.springframework.beans.factory.support.BeanDefinitionRegistry;
   import org.springframework.beans.factory.support.BeanNameGenerator;
   import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
   import org.springframework.core.type.AnnotationMetadata;
   
   public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
   
       @Override
       public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry, BeanNameGenerator importBeanNameGenerator) {
           AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder.rootBeanDefinition(User.class).getBeanDefinition();
           registry.registerBeanDefinition("user",beanDefinition);
       }
   
   }
   ```

   ```java
   import com.aiw.springbootimport.config.MyImportBeanDefinitionRegistrar;
   import com.aiw.springbootimport.pojo.User;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.context.ConfigurableApplicationContext;
   import org.springframework.context.annotation.Import;
   
   @SpringBootApplication
   @Import(MyImportBeanDefinitionRegistrar.class)
   public class SpringbootImportApplication {
   
       public static void main(String[] args) {
           ConfigurableApplicationContext context = SpringApplication.run(SpringbootImportApplication.class, args);
   
           // User user = context.getBean(User.class); // 这种也可以获取到
           User user = (User) context.getBean("user");
           System.out.println(user);
       }
   
   }
   ```

   

**@EnableAutoConfiguration注解**

- `@EnableAutoConfiguration`注解内部使用`@Import(AutoConfigurationImportSelector.class)`来加载配置类
- 配置文件位置：`META-INF/spring.factories`，该配置文件中定义了大量的配置类，当SpringBoot应用启动后，会自动加载这些配置类，初始化Bean
- 并不是所有的Bean都会被初始化，在配置类中使用Condition来加载满足条件的Bean

**自定义starter**

*需求*：自定义redis-starter。要求当导入redis坐标时，SpringBoot自动创建Jedis的Bean

*步骤*

1. 创建redis-spring-boot-autoconfigure模块

   ```java
   @ConfigurationProperties(prefix = "redis") //用户自定义的配置文件属性定义要以“redis”开头
   public class RedisProperties {
       private String host="localhost";//默认本机地址
       private int port=6379;//默认端口6379
       public String getHost() {
           return host;
       }
       public void setHost(String host) {
           this.host = host;
       }
       public int getPort() {
           return port;
       }
       public void setPort(int port) {
           this.port = port;
       }
   }
   ```

   ```java
   @Configuration
   @EnableConfigurationProperties(RedisProperties.class)
   public class RedisAutoConfiguration {
       //提供jedis的bean
       @Bean
       public Jedis jedis(RedisProperties redisProperties){
           System.out.println("RedisAutoConfiguration.....");
           return new Jedis(redisProperties.getHost(),redisProperties.getPort());
       }
   }
   ```

2. 创建redis-spring-boot-starter模块，依赖redis-spring-boot-autoconfigure模块

3. 在redis-spring-boot-autoconfigure模块中初始化Jedis的Bean。并定义META-INF/spring.factories文件

   ```factories
   org.springframework.boot.autoconfigure.EnableAutoConfiguration=\ 
     com.qf.config.RedisAutoConfiguration （这是我们自己编写的配置类的全限定名）
   ```

4. 在测试文件中引入自定义的redis-starter依赖，测试获取Jedis的Bean，操作redis

   ```xml
   <!--自定义的starter-->
   <dependency>
       <groupId>top.hellocode</groupId>
       <artifactId>redis-spring-boot-starter</artifactId>
       <version>0.0.1-SNAPSHOT</version>
   </dependency>
   ```

   ```java
   public static void main(String[] args) {
       ConfigurableApplicationContext context = SpringApplication.run(SpringBootTestApplication.class, args);
       Jedis jedis = context.getBean(Jedis.class);
       System.out.println(jedis);
       jedis.set("name","hehe");
       String name = jedis.get("name");
       System.out.println(name);
   }
   ```

#### 监听机制

**Java监听机制**

> SpringBoot的监听机制，其实是对Java提供的事件监听机制的封装

Java中的事件监听机制定义了以下几个角色

1. 事件：Event，继承java.util.EventObject类的对象
2. 事件源：Source，任意对象Object
3. 监听器：Listener，实现java.util.EventListener接口的对象

**SpringBoot监听机制**

SpringBoot 在项目启动时，会对几个监听器进行回调，我们可以实现这些监听器接口，在项目启动时完成
一些操作。
`ApplicationContextInitializer、 SpringApplicationRunListener、 CommandLineRunner、 ApplicationRunner`

- 实现 `CommandLineRunner、 ApplicationRunner`监听只需要将对应的实现类加入到Spring容器中，就会在项目启动后执行在实现类中重写后的run方法，可以完成一些缓存的预热操作

- `ApplicationContextInitializer、 SpringApplicationRunListener`需要在`META-INF/spring.factories`中配置后才能执行，会在spring容器初始化前执行，做一些参数的校验

  - 配置方式：`接口全路径名=实现类全路径名`

  - `org.springframework.context.ApplicationContextInitializer=实现类全路径名`

  - `org.springframework.boot.SpringApplicationRunListener=实现类全路径名`

#### 启动流程

![image](http://images.hellocode.top/005OV8mQgy1gro036ub0qj31ve0s14lu.jpg)

## 七、高级监控

> SpringBoot自带监控功能**Actuator**，可以帮助实现对程序内部运行情况的监控，比如监控状况、bean的加载情况、配置属性、日志信息等

#### 使用步骤

1. 导入依赖坐标（也可以在初始化项目过程通过idea在OPS分类手动勾选）

   ```xml
   <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-actuator -->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
   ```

2. 访问http://localhost:8080/actuator

- 开启健康检查的完整信息需要在application配置文件手动开启（项目上线需要关闭，防止信息泄露）
  `management.endpoint.health.show-details=always`
  健康检查除了监控本地磁盘，还可以监控数据库、redis等信息
- 开启所有的监控endpoint
  `management.endpoints.web.exposure.include=*`

#### 图形化界面

**Spring Boot Admin**

- Spring Boot Admin是一个开源社区项目，用于管理和监控SpringBoot应用程序
- Spring Boot Admin有两个角色，客户端(Client)和服务端(Server)
- 应用程序作为Spring Boot Admin Client项为Spring Boot Admin Server注册
- Spring Boot Admin Server的UI界面将展示Spring Boot Admin Client的Actuator Endpoint上的一些监控信息

**使用步骤**

*admin-server*

1. 创建admin-server模块
2. 导入依赖坐标admin-starter-server
3. 在引导类上启用监控功能@EnableAdminServer

*admin-client*

1. 创建admin-client模块

2. 导入依赖坐标信息 admin-starter-client

3. 配置相关信息：server地址等

   ```properties
   #指定admin.server地址（以9000端口模拟）   String[]可以指定多个
   spring.boot.admin.client.url=http://localhost:9000
   
   #配置actuator相关配置
   management.endpoint.health.show-details=always
   management.endpoints.web.exposure.include=*
   #...
   ```

4. 启动server和client服务，访问server

![image-20220906184509370](http://images.hellocode.top/image-20220906184509370.png)

![image-20220906184536079](http://images.hellocode.top/image-20220906184536079.png)

除了图形化界面，idea也提供了展示面板

![image-20220906183501688](http://images.hellocode.top/image-20220906183501688.png)

## 八、项目部署

SpringBoot项目开发完毕后，支持两种方式部署到服务器：

1. jar包（官方推荐）
   将jar包放到安装了jdk的linux服务器上，通过`java -jar jar包文件`启动即可

2. war包

   1. 在pom文件中修改打包方式为war包

   2. 让SpringBoot启动类继承SpringBootServletInitializer类并覆写configure方法

      ```java
      protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
          return builder.sources(SpringBoot启动类.class);
      }
      ```

   3. 打包
   4. 将war包放到服务器的tomcat下的webapp目录下，启动tomcat即可（虚拟目录会发生变化）