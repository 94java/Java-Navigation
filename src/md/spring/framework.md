---
title: "SpringFramework"
order: 3
category:
  - Spring
---

# SpringFramework

## 一、简介

### 1、框架

> 框架源自于建筑学，隶属于土木工程，后发展到软件工程领域

软件工程框架：经过验证的，具有一定功能的，半成品软件

- 经过验证
- 具有一定功能
- 半成品

**框架的作用**

- 提高开发效率
- 增强可重用性
- 提供编写规范
- 节约维护成本
- 解耦底层实现原理

### 2、概念与体系结构

> Spring是分层的JavaSE/EE应用 full-stack轻量级开源框架

- 分层：可以把Spring中的一部分单独拿出来使用，也可以整体一起使用（更加高效）

- full-stack：Spring提供一站式解决方案

**体系结构**

![](http://images.hellocode.top/gLwS4A8toIq7MYd.png)

**底层是核心容器**

- Beans
- Core
- Context
- SpringEl表达式

**中间层技术**

- AOP
- Aspects

**应用层技术**

- 数据访问与数据集成
- Web集成
- Web实现

**基于Test测试**

> Spring不是只有Java的，其他语言也有Spring

### 3、发展史与优势

![](http://images.hellocode.top/QjT97YgryRaWJ3G.png)

**优势**

- 方便解耦，简化开发
- 方便集成各种优秀框架
- 方便程序的测试
- AOP编程的支持
- 声明事务的支持
- 降低JavaEE API的使用难度
- Java源码是经典学习范例

## 二、IoC

### 1、简介

**耦合与内聚**

- 耦合（Coupling）：代码书写过程中所使用技术的结合紧密度，用于衡量软件中各个模块之间的互联程度
- 内聚（Cohesion）：代码书写过程中单个模块内部各组成部分间的联系，用于衡量软件中各个功能模块内部的功能联系

程序书写的目标：高内聚，低耦合

> 就是同一个模块内各个元素之间要高度紧密，但是各个模块之间的相互依存度却不要那么紧密

**工厂模式发展史**

![](http://images.hellocode.top/Zb7ho431PsJlLmC.png)

![](http://images.hellocode.top/6vnzJQy1UVaDkgO.png)

![](http://images.hellocode.top/hgBNwZRVvKCPXcr.png)

> 如果类耦合的话，修改后需要重新编译、打包、发布，但是如果是和配置文件耦合，不需要做这些事情

**IoC**

- IoC（Inversion Of Control）：控制反转，Spring反向控制应用程序所需要使用的外部资源
- Spring控制的资源全部放置在Spring容器中，该容器称为IoC容器

![](http://images.hellocode.top/VfN1KoDqbEuF4xp.png)

### 2、入门案例

**案例环境说明**

模拟三层架构中表现层调用业务层功能

- 表现层：UserApp模拟UserServlet（使用main方法模拟）
- 业务层：UserService

**步骤**

1. 导入spring坐标（5.1.9.release）

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
           <version>5.1.9.RELEASE</version>
       </dependency>
   </dependencies>
   ```

2. 编写业务层与表现层（模拟）接口与实现类

   ```java
   public interface UserService {
       public void save();
   }
   ```

   ```java
   public class UserServiceImpl implements UserService {
       public void save() {
           System.out.println("user service running...");
       }
   }
   ```

3. 建立spring配置文件(`applicationContext.xml`)

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">
       <!--1. 创建spring控制的资源-->
       <bean id="userService" class="top.hellocode.service.impl.UserServiceImpl"></bean>
   
   </beans>
   ```

4. 配置所需资源（Service）为spring控制的资源

5. 表现层（App）通过spring获取资源（Service实例）

   ```java
   public static void main(String[] args) {
       // 2. 加载配置文件
       ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
       // 3. 获取资源
       UserService userService = (UserService) ctx.getBean("userService");
   
       userService.save();
   }
   ```

### 3、IOC配置

#### 3.1. bean

- 名称：bean

- 类型：*标签*

- 归属：beans标签

- 作用：定义spring中的资源，受此标签定义的资源将受到spring控制


格式

```xml
<beans>
	<bean />
</beans>
```

基本属性

```xml
<bean id="beanId" name="beanName1,beanName2,..." class="ClassName"/>
```

- id：bean的名称，通过id获取bean
- class：bean的类型
- name：bean的名称，可以通过name值获取bean，用于多人配合时给bean起别名

**scope属性**

- 名称：scope

- 类型：属性

- 归属：bean标签

- 作用：定义bean的作用范围


格式

```xml
<bean scope="singleton"/>
```

取值

- singleton：设定创建出的对象保存在spring容器中，是一个单例的对象（默认）
- prototype：设定创建出的对象保存在spring容器中，是一个非单例的对象
- request、session、application、websocket：设定创建出的对象放置在web容器对应的位置

> 单例模式：通过单例模式的方法创建的类在当前进程中只有一个实例

> 单例和非单例模式创建对象的时机不同：单例模式是在加载时创建，非单例是在使用时创建

**bean生命周期**

- 名称：init-method，destroy-method

- 类型：属性

- 归属：bean标签

- 作用：定义bean对象在初始化或销毁时完成的工作


格式

```xml
<bean init-method="init" destroy-method="destroy"/>
```

取值：bean对应的类中对应的具体方法名

注意事项

- 当`scope="singleton"`时，spring容器中有且仅有一个对象，init方法在创建容器时仅执行一次
- 当`scope="prototype"`时，spring容器要创建同一类型的多个对象，init方法在每个对象创建时均执行一次
- 当`scope="singleton"`时，关闭容器会导致bean实例的销毁，调用destroy方法一次
- 当`scope="prototype"`时，对象的销毁由垃圾回收机制gc()控制，destroy方法将不会被执行

> 当scope为非单例模式时，销毁不归spring管理

**静态工厂与实例工厂创建bean**（了解）

- 名称：factory-bean，factory-method

- 类型：属性

- 归属：bean标签

- 作用：定义bean对象创建方式，使用实例工厂的形式创建bean，兼容早期遗留系统的升级工作


格式

```xml
<bean factory-bean="factoryBeanId" factory-method="factoryMethodName"/>
```

取值：工厂bean中用于获取对象的实例方法名

注意事项

- 使用实例工厂创建bean首先需要将实例工厂配置bean，交由spring进行管理
- factory-bean是实例工厂的beanId

#### 3.2. DI

> DI（Dependency Injection）：依赖注入，应用程序运行依赖的资源由Spring为其提供，资源进入应用程序的方式称为注入

![](http://images.hellocode.top/My3rngxRkZX2qYp.png)

- IoC与DI是同一件事站在不同的角度看待问题

**set注入**（主流）

- 名称：property

- 类型：标签

- 归属：bean标签

- 作用：使用set方法的形式为bean提供资源


格式

```xml
<bean>
	<property />
</bean>
```

基本属性

```xml
<property name="propertyName" value="propertyValue" ref="beanId"/>
```

- name：对应bean中的属性名，要求该属性必须提供可访问的set方法（严格规范此名是set方法对应的名称）
- value：设定非引用类型属性对应的值，不能与ref同时使用
- ref：设定引用类型属性对应bean的id，不能与value同时使用

- 注意：一个bean可以有多个property标签

> 字符串当作非引用类型处理

**构造器注入**（了解）

- 名称：constructor-arg

- 类型：标签

- 归属：bean标签

- 作用：使用构造方法的形式为bean提供资源，兼容早期遗留系统的升级工作


格式

```xml
<bean>
	<constructor-arg />
</bean>
```

基本属性

```xml
<constructor-arg name="argsName" value="argsValue"/>
```

- name：对应bean中的构造方法所携带的参数名
- value：设定非引用类型构造方法参数对应的值，不能与ref同时使用
- ref：设定引用类型属性对应bean的id，不能与value同时使用

其他属性

- type：设定构造方法参数的类型，用于按类型匹配参数或进行类型校验
- index：设定构造方法参数的位置，用于按位置匹配参数，参数index值从0开始计数

注意：一个bean可以有多个constructor-arg标签

**集合注入**

- 名称：array，list，set，map，props

- 类型：*标签*

- 归属：property标签 或 constructor-arg标签

- 作用：注入集合数据类型属性


格式

```xml
<property>
	<list></list>
</property>
```

```xml
<property name="myList">
    <list>
        <value>hellocode</value>
        <value>666</value>
        <ref bean="userService" />
        <bean class="top.hellocode.service.UserService"/>
    </list>
</property>
```

```xml
<property name="myProps">
    <props>
        <prop key="username">root</prop>
        <prop key="password">123456</prop>
    </props>
</property>
```

```xml
<property name="myArray">
    <array>
        <value>hellocode</value>
        <value>666</value>
        <ref bean="userService" />
        <bean class="top.hellocode.service.UserService"/>
    </array>
</property>
```

```xml
<property name="mySet">
    <set>
        <value>hellocode</value>
        <value>666</value>
        <ref bean="userService" />
        <bean class="top.hellocode.service.UserService"/>
    </set>
</property>
```

```xml
<property name="myMap">
    <map>
        <entry key="name" value-ref="hellocode"/>
        <entry key="fame" value="666"/>
        <entry key="userService">
            <ref bean="userService"></ref>
        </entry>
        <entry key="applyService">
            <bean class="applyService"></bean>
        </entry>
    </map>
</property>
```

> array和list是互通的，二者可以相互注入

**使用p命名空间简化配置**（了解）

- 名称：p:peopertyName，p:peopertyName-ref

- 类型：*属性*

- 归属：bean标签

- 作用：为bean注入属性值


格式

```xml
<bean p:propertyName="propertyValue" p:propertyName-ref="beanId"/>
```

注意：使用p命令空间需要先开启spring对p命令空间的支持，在beans标签中添加对应空间支持

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
```

> `xmlns:p="http://www.springframework.org/schema/p"`

**SpEL**（了解）

- Spring提供了对EL表达式的支持，统一属性注入格式

- 类型：*属性值*

- 归属：value属性

- 作用：为bean注入属性值


格式

```xml
<bean>
    <property value="EL" />
</bean>
```

注意：所有属性不区分是否引用类型，统一使用value赋值

所有格式统一使用 `value="******"`

- 常量：`#{10}`   `#{3.14}`    `#{2e5}`    `#{"hellocode"}`
- 引用bean：`#{beanId}`
- 引用bean属性：`#{beanId.propertyName}`
- 引用bean方法：`beanId.methodName().method2()`
- 引用静态方法：`T(java.lang.Math).PI`
- 运算符支持：`#{3 lt 4 == 4 ge 3}`
- 正则表达式支持：`#{user.name.matches '[a-z]{6,}'}`
- 集合支持：`#{likes[3]}`

#### 3.3. properties文件

> Spring提供了读取外部properties文件的机制，使用读取到的数据为bean的属性赋值

**操作步骤**

1. 准备外部properties文件

2. 开启context命名空间支持

   ```xml
   xmlns:context="http://www.springframework.org/schema/context"
   ```

3. 加载指定的properties文件

   ```xml
   <context:property-placeholder location="classpath:filename.properties">
   ```

4. 使用加载的数据

   ```xml
   <property name="propertyName" value="${propertiesName}"/>
   ```

- 注意：如果需要加载所有的properties文件，可以使用`*.properties`表示加载所有的properties文件
- 注意：读取数据使用`${propertiesName}`格式进行，其中propertiesName指properties文件中的属性名

> 在读取username值时，出现的是当前电脑的用户名，是因为context中已经有username属性，为了区分，尽量避免使用username，可以用user代替

#### 3.4. 团队开发

- 名称：import

- 类型：标签

- 归属：beans标签

- 作用：在当前配置文件中导入其他配置文件中的项


格式

```xml
<beans>
	<import />
</beans>
```

基本属性

```xml
<import resources="config.xml" />
```

- resources：加载的配置文件名

Spring容器加载多个配置文件（了解）

```java
new ClassPathXmlApplicationContext("config1.xml","config2.xml");
```

Spring容器中的bean定义冲突问题

- 同id的bean，后定义的覆盖先定义的
- 导入配置文件可以理解为将导入的配置文件复制粘贴到对应位置
- 导入配置文件的顺序与位置不同可能会导致最终程序运行结果不同

#### 3.5. ApplicationContext

![](http://images.hellocode.top/TCNs3Y7cJKzRpQ2.png)

- ApplicationContext是一个接口，提供了访问spring容器的API
- ClassPathXmlApplicationContext是一个类，实现了上述功能
- ApplicationContext的顶层接口是BeanFactory
- BeanFactory定义了bean相关的最基本操作
- ApplicationContext在BeanFactory基础上追加了若干新功能

**对比BeanFactory**

- BeanFactory创建的bean采用延迟加载形式，使用才创建
- ApplicationContext创建的bean默认采用立即加载形式

**FileSystemXmlApplicationContext**

- 可以加载文件系统中任意位置的配置文件，而ClassPathXmlApplicationContext只能加载类路径下的配置文件

#### 3.6. 第三方资源配置

阿里数据源方案Druid

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3306/spring_db" />
    <property name="username" value="root" />
    <property name="password" value="hellocode" />
</bean>
```

## 三、常用注解

**什么是注解驱动**

- 注解驱动是使用注解的形式替代xml配置，将繁杂的spring配置文件从工程中彻底消除掉，简化书写

*弊端*

- 为了达成注解驱动的目的，可能会将原先很简单的书写，变得更加繁杂
- XML中配置第三方开发的资源是很方便的，但使用注解驱动无法在第三方开发的资源中进行编辑，因此会增大开发工作量

**启动注解功能**

- 启动注解扫描，加载类中配置的注解项

  ```xml
  <context:component-scan base-package="packageName" />
  ```

*说明*

- 在进行包的扫描时，会对配置的包及其子包中所有文件进行扫描
- 扫描过程是以文件夹递归迭代的形式进行的
- 扫描过程仅读取合法的Java文件
- 扫描时仅读取spring可识别的注解
- 扫描结束后会将可识别的有效注解转化为spring对应的资源加入IoC容器

*注意*

- 无论是注解格式还是xml配置格式，最终都是将资源加载到IoC容器中，差别仅仅是数据读取方式不同
- 从加载效率上来说注解优于xml配置文件

### 1、基础注解

**bean的定义**

- 名称：`@Component`    `@Controller`     `@Service`    `@Repository`

- 类型：*类注解*

- 位置：类定义上方

- 作用：设置该类为spring管理的bean

- 范例

  ```java
  @Component
  public class ClassName{}
  ```

- 说明

  - `@Controller`、`@Service`、`@Repository`是`@Component`的衍生注解，功能同`@Component`

- 相关属性

  - `value`（默认）：定义bean的访问id

**bean的作用域**

- 名称：`@Scope`

- 类型：*类注解*

- 位置：类定义上方

- 作用：设置该类作为bean对应的scope属性

- 范例

  ```java
  @Scope
  public class ClassName{}
  ```

- 相关属性

  - value（默认）：定义bean的作用域，默认为singleton

**生命周期**

- 名称：`@PostConstruct`、`PreDestroy`

- 类型：*方法注解*

- 位置：方法定义上方

- 作用：设置该类作为bean对应的生命周期方法

- 范例

  ```java
  @PostConstruct
  public void init(){
      System.out.println("init...");
  }
  ```

### 2、第三方资源

- 名称：`@Bean`

- 类型：*方法注解*

- 位置：方法定义上方

- 作用：设置该方法的返回值作为spring管理的bean


**范例**

```java
@Bean("dataSource")
public DruidDataSource createDataSource(){
    return ...;
}
```

**说明**

- 因为第三方bean无法在其源码上进行修改，使用@Bean解决第三方bean的引入问题
- 该注解用于替代xml配置中的静态工厂与实例工厂创建bean，不区分方法是否为静态或非静态
- @Bean所在的类必须按spring扫描加载，否则该注解无法生效

- 相关属性

  - value（默认）：定义bean的访问id

### 3、属性注入

**bean的非引用类型属性注入**

- 名称：`@Value`

- 类型：*属性注解、方法注解*

- 位置：属性定义上方、方法定义上方

- 作用：设置对应属性的值或对方法进行传参

- 范例

  ```java
  @Value("$(jdbc.username)")
  private String username;
  ```

- 说明

  - value值仅支持非引用类型数据，赋值时对方法的所有参数全部赋值
  - value值支持读取properties文件中的属性值，通过类属性将properties中数据传入类中
  - value值支持spEL
  - @value注解如果添加在属性上方，可以省略set方法（set方法的目的是为属性赋值）

- 相关属性

  - value（默认）：定义对应的属性值或参数值

**bean的引用类型属性注入**

- 名称：`@Autowired`、`@Qualifier`

- 类型：*属性注解、方法注解*

- 位置：属性定义上方、方法定义上方

- 作用：设置对应属性的对象或对方法进行引用类型传参

- 范例

  ```java
  @Autowired(required = false)
  @Qualifier("userDao")
  private UserDao userDao;
  ```

- 说明

  - @Autowired默认按类型装配，指定@Qualifier后可以指定自动装配的bean的id

- 相关属性

  - required：定义该属性是否允许为null



----



- 名称：@Primary

- 类型：*类注解*

- 位置：类定义上方

- 作用：设置类对应的bean按类型装配时优先装配

- 范例

  ```java
  @Primary
  public class ClassName{}
  ```

- 说明

  - @Autowired默认按类型装配，当出现相同类型的bean，使用@Primary提高按类型自动装配的优先级，多个@Primary会导致优先级设置无效

**了解**

- 名称：`@Inject`、`@Named`、`@Resource`
- 说明
  - @Inject与@Named是JSR330规范中的注解，功能与@Autowired和@Qualifier完全相同，适用于不同架构场景
  - @Resource是JSR250规范中的注解，可以简化书写格式
- @Resource相关书写
  - name：设置注入的bean的id
  - type：设置注入的bean的类型，接收的参数为Class类型

### 4、peoperties文件

- 名称：`@PropertySource`

- 类型：*类注释*

- 位置：类定义上方

- 作用：加载properties文件中的属性值

- 范例

  ```java
  @PropertiesSource(value = "classpath:filename.properties")
  public class ClassName{
      @Value("${propertiesAttributeName}")
      private String attributeName;
  }
  ```

- 说明

  - 不支持*通配格式，一旦加载，所有spring控制的bean中均可使用对应属性值

- 相关属性

  - value（默认）：设置加载的properties文件名
  - ignoreResourceNotFound：如果资源未找到，是否忽略，默认为false

### 5、注解驱动

- 名称：`@Configuration`、`@ComponentScan`

- 类型：*类注解*

- 位置：类定义上方

- 作用：设置当前类为spring核心配置加载类

- 范例

  ```java
  @Configuration
  @ComponentScan("scanPackageName")
  public class SpringConfigClassName{
  }
  ```

- 说明

  - 核心配置类用于替换spring核心配置文件，此类可以设置为空，不设置变量与属性
  - bean扫描工作使用注解`@ComponentScan`替代

### 6、第三方bean配置与管理

- 名称：`@Import`

- 类型：*类注解*

- 位置：类定义上方

- 作用：导入第三方bean作为spring控制的资源

- 范例

  ```java
  @Configuration
  @Import(OtherClassName.class)
  public class ClassName{
  }
  ```

- 说明

  - `@Import`注解在同一个类上，仅允许添加一次，如果需要导入多个，使用数组的形式进行设定
  - 在被导入的类中可以继续使用`@Import`导入其他资源（了解）
  - `@Bean`所在的类可以使用导入的形式进入spring容器，无需声明为bean

### 7、bean加载控制

**依赖加载**

- 名称：`@DependsOn`

- 类型：*类注解*、*方法注解*

- 位置：bean定义的位置（类上或方法上）

- 作用：控制bean的加载顺序，使其在指定bean加载完毕后再加载

- 范例

  ```java
  @DependsOn("beanId")
  public class ClassName{
  }
  ```

- 说明

  - 配置在方法上，使`@DependsOn`指定的bean优先于`@Bean`配置的bean进行加载
  - 配置在类上，使`@DependsOn`指定的bean优先于当前类中所有`@Bean`配置的bean进行加载
  - 配置在类上，使`@DependsOn`指定的bean优先于`@Component`等配置的bean进行加载

- 相关属性

  - value（默认）：设置当前bean所依赖的bean的id



----



- 名称：`@Order`

- 类型：*配置类注解*

- 位置：配置类定义的位置（类上）

- 作用：控制配置类的加载顺序

- 范例

  ```java
  @Order(1)
  public class SpringConfigClassName{
  }
  ```

  

----



- 名称：`@Lazy`

- 类型：*类注解*、*方法注解*

- 位置：bean定义的位置（类上或方法上）

- 作用：控制bean的加载时机，使其延迟加载

- 范例

  ```java
  @Lazy
  public class ClassName{
  }
  ```

**依赖加载应用场景**

- `@DependsOn`
  - 微信订阅号，发布消息和订阅消息的加载顺序控制
  - 双11活动期间，零点前是结算策略A，零点后是结算策略B，策略B操作的数据为促销数据。策略B加载顺序与促销数据的加载顺序
- `@Lazy`
  - 程序灾难出现后对应的应急预案处理是启动容器时加载时机
- `@Order`
  - 多个种类的配置出现后，优先加载系统级的，然后加载业务级的，避免细粒度的加载控制

## 四、整合第三方技术

### 1、整合MyBatis

#### 1.1. xml方式

1. 导入Spring整合Mybatis坐标

   ```xml
   <dependencies>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-context</artifactId>
   			<version>5.1.9.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-jdbc</artifactId>
   			<version>5.1.9.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.mybatis</groupId>
   			<artifactId>mybatis</artifactId>
   			<version>3.5.3</version>
   		</dependency>
   		<dependency>
   			<groupId>mysql</groupId>
   			<artifactId>mysql-connector-java</artifactId>
   			<version>5.1.46</version>
   		</dependency>
   		<dependency>
   			<groupId>com.alibaba</groupId>
   			<artifactId>druid</artifactId>
   			<version>1.1.20</version>
   		</dependency>
   		<dependency>
   			<groupId>org.mybatis</groupId>
   			<artifactId>mybatis-spring</artifactId>
   			<version>1.3.0</version>
   		</dependency>
   	</dependencies>
   ```

2. 将Mybatis配置成spring管理的bean（`sqlSessionFactoryBean`）

   - 将原始配置文件中的所有项，转入到当前配置中

     数据源转换

     映射转换

3. 通过spring加载mybatis的映射配置文件到spring环境中

4. 设置类别名

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/context
          http://www.springframework.org/schema/context/spring-context.xsd">
   
       <context:property-placeholder location="classpath:*.properties"/>
   
       <!--加载druid资源-->
       <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
           <property name="driverClassName" value="${jdbc.driver}"/>
           <property name="url" value="${jdbc.url}"/>
           <property name="username" value="${jdbc.username}"/>
           <property name="password" value="${jdbc.password}"/>
       </bean>
       
       <!--配置service作为spring的bean，注入dao-->
       <bean id="accountService" class="top.hellocode.service.impl.AccountServiceImpl">
           <property name="accountDao" ref="accountDao"/>
       </bean>
       
       <!--spring整合mybatis后控制的创建连接用的对象-->
       <bean class="org.mybatis.spring.SqlSessionFactoryBean">
           <property name="typeAliasesPackage" value="top.hellocode.domain"/>
           <property name="dataSource" ref="dataSource"/>
       </bean>
       
       <!--加载mybatis映射配置的扫描，将其作为spring的bean进行管理-->
       <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
           <property name="basePackage" value="top.hellocode.dao"/>
       </bean>
   </beans>
   ```

5. 测试结果


使用spring环境加载业务层bean，执行操作

```java
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService accountService = (AccountService) ctx.getBean("accountService");
        Account account = new Account();
        account.setId(1);
        account.setName("xxx");
        account.setMoney(888.88);
        // accountService.save(account);
        accountService.update(account);
    }
}
```

**小结**

- 需要专用的spring整合mybatis的jar包
- Mybatis核心配置文件消失
  - 环境environment转换成数据源对象
  - 映射Mapper扫描工作交由spring处理
  - 类型别名交由spring处理
- 业务发起使用spring上下文对象获取对应的bean

#### 1.2. 注解方式

- 业务类使用注解形式声明bean，属性采用注解注入
- 建立独立的配置管理类，分类管理外部资源，根据功能进行分类，并提供对应的方法获取bean
- 使用注解形式启动bean扫描，加载所有注解配置的资源（bean）
- 使用`AnnotationConfigApplicationContext`对象加载所有的启动配置类，内部使用导入方式进行关联

**步骤**

1. 修改mybatis外部配置文件格式为注解格式
2. 业务类使用@Commponent声明bean，使用@Autowired注入对象
3. 建立配置文件JDBCConfig与MyBatisConfig类，并将其导入到核心配置类SpringConfig
4. 开启注解扫描
5. 使用AnnotationConfigApplicationContext对象加载配置项

*Dao*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月06日 16:33
 */

public interface AccountDao {
    // 新增
    @Insert("INSERT INTO account(name,money) values(#{name},#{money})")
    public int save(Account account);
    // 删除
    @Delete("DELETE FROM account WHERE id = #{id}")
    public int delete(Integer id);
    // 修改
    @Update("UPDATE account SET name=#{name},money=#{money} where id = #{id}")
    public int update(Account account);
    // 查询
    @Select("SELECT * FROM account")
    public List<Account> findAll();
    @Select("SELECT * FROM account WHERE id = #{id}")
    public Account findById(Integer id);
}
```

*Service*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月06日 16:35
 */
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;

    //    public void setAccountDao(AccountDao accountDao) {
    //        this.accountDao = accountDao;
    //    }

    public void save(Account account) {
        accountDao.save(account);
    }

    public void delete(Integer id) {
        accountDao.delete(id);
    }

    public void update(Account account) {
        accountDao.update(account);
    }

    public List<Account> findAll() {
        return accountDao.findAll();
    }

    public Account findById(Integer id) {
        return accountDao.findById(id);
    }
}

```

*config*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月09日 14:24
 */
@Configuration
@ComponentScan("top.hellocode")
@PropertySource("classpath:jdbc.properties")
@Import({JDBCConfig.class,MyBatisConfig.class})
public class SpringConfig {
}

```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月09日 14:26
 */
public class JDBCConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String userName;
    @Value("${jdbc.password}")
    private String password;

    @Bean("dataSource")
    public DataSource getDataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(userName);
        ds.setPassword(password);
        return ds;
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月09日 14:34
 */
public class MyBatisConfig {
    @Bean
    public SqlSessionFactoryBean getSqlSessionFactoryBean(@Autowired DataSource dataSource){
        SqlSessionFactoryBean ssfb = new SqlSessionFactoryBean();
        ssfb.setTypeAliasesPackage("top.hellocode.domain");
        ssfb.setDataSource(dataSource);
        return ssfb;
    }

    @Bean
    public MapperScannerConfigurer getMapperScannerConfigurer(){
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("top.hellocode.dao");
        return msc;
    }
}
```

### 2、注解整合Junit

1. Spring接管Junit的运行权，使用Spring专用的Junit类加载器
2. 为Junit测试用例设定对应的Spring容器

**注意**

- 从Spring5.0之后，要求Junit的版本必须是4.12及以上
- Junit仅用于单元测试，不能将Junit的测试类配置成Spring的bean，否则该配置将会被打包进入工程中

**导入Spring整合Junit坐标**

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.1.9.RELEASE</version>
</dependency>
```

**Spring整合junit测试用例注解格式**

```java
@RunWith(SpringJunit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class UserServiceTest{
}
```

**测试代码**

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年06月09日 14:51
 */
// 设定spring专用的类加载器
@RunWith(SpringJUnit4ClassRunner.class)
// 设定加载的Spring上下文对应的配置
@ContextConfiguration(classes = SpringConfig.class)
public class UserServiceTest {
    @Autowired
    private AccountService accountService;
    @Test
    public void testFindById(){
        Account ac = accountService.findById(1);
        Assert.assertEquals("xxx",ac.getName());
    }
}
```

## 五、IOC底层核心原理

> xml解析、工厂模式、反射

- 解析xml文件，获取配置内容
- 通过反射，以工厂模式将对应的bean创建出来并返回

### 1、核心接口

![](http://images.hellocode.top/T9flr7QGtPpJkMX.png)

**BeanFactory：提供Bean的基本操作**

- bean获取
  - 按名称获取
  - 按类型获取
- bean供应商
- bean基本信息
  - 是否存在
  - 是否单例
  - 类型获取
  - 类型检测（类型是否匹配）
  - 别名获取

**HierarchicalBeanFactory：提供bean分层结构，提出父子容器概念**

- 获取本地bean

**AutowireCapableBeanFactory：提供bean自动装配功能**

- bean创建
- 自动装配
  - 装配方式
  - 前置动作
  - 后置动作

**ListableBeanFactory：提供容器内部遍历搜索bean的功能**

- 容器中bean信息
  - bean存在性
  - bean的数量
  - bean的类型
- bean相关信息获取
  - 由类型获取bean的名称
  - 由注解获取bean的名称
- bean信息获取
  - bean的注解
  - bean的定义名称

### 2、组件扫描过滤器

![](http://images.hellocode.top/xOS3ItBQJP8Zcbq.png)

> 开发过程中，需要根据需求加载必要的bean，排除指定bean

**设定组件扫描加载过滤器**

- 名称：`@ComponentScan`

- 类型：*类注解*

- 位置：类定义上方

- 作用：设置spring配置加载类扫描规则


范例

```java
@ComponentScan(
	value = "top.hellocode"			// 设置基础扫描路径
    excludeFilters = 				// 设置过滤规则，当前为排除过滤
    	@ComponentScan.Filter(		// 设置过滤器
        	type = FilterType.ANNOTATION,		// 设置过滤方式为按照注解进行过滤
            classes = Repository.class			// 设置具体的过滤项，过滤所有@Repository修饰的bean
        )
)
```

- includeFilters：设置包含性过滤器
- excludeFilters：设置排除性过滤器
- type：设置过滤器类型

**自定义组件过滤器**

- 名称：TypeFilter

- 类型：*接口*

- 作用：自定义类型过滤器


范例

```java
public class MyTypeFilter implements TypeFilter {
    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
        // 加载的类满足要求，匹配成功
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        String className = classMetadata.getClassName();
        if(className.equals("top.hellocode.service.impl.UserServiceImpl")){
            return true;
        }
        return false;
    }
}
```

### 3、自定义导入器

> bean只有通过配置才可以进入spring容器，被spring加载并控制

**配置bean的方式如下**

- XML文件中使用`<bean/>`标签配置
- 使用`@Component`及衍生注解配置

> 企业开发中，通常需要配置大量的bean，需要一种快速高效配置大量bean的方式，就需要用到导入器

**自定义导入器**

- 名称：ImportSelector

- 类型：*接口*

- 作用：自定义bean导入器


范例

```java
public class MyImportSelector implements ImportSelector{
    public String[] selectImports(AnnotationMetadata icm){
        return new String[]("top.hellocode.service.impl.UserServiceImpl");
    }
}
```

```java
@Configuration
@ComponentScan("top.hellocode")
@Import(MyImportSelector.class)
public class SpringConfig{
}
```

### 4、自定义注册器

- 名称：ImportBeanDefinitionRegistrar

- 类型：*接口*

- 作用：自定义bean定义注册器


**范例**

```java
public class MyImportRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata annotationMetadata, BeanDefinitionRegistry beanDefinitionRegistry) {
        ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(beanDefinitionRegistry,false);
        scanner.addIncludeFilter(new TypeFilter() {
            @Override
            public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
                return true;
            }
        });
        scanner.scan("top.hellocode");
    }
}
```

- 使用：`@Import(MyImportRegistrar.class)`

### 5、bean初始化过程

![](http://images.hellocode.top/4WOLroqtFAVUjZM.png)

**BeanFactoryPostProcessor**

- 作用：定义了在bean工厂对象创建后，bean对象创建前执行的动作，用于对工厂进行创建后业务处理
- 运行时机：当前操作用于对工厂进行处理，仅运行一次

**BeanPostProcessor**

- 作用：定义了所有bean初始化前后进行的统一动作，用于对bean进行创建前业务处理与创建后业务处理
- 运行时机：当前操作伴随着每个bean的创建过程，每次创建bean均运行该操作

**InitializingBean**

- 作用：定义了每个bean的初始化前进行的动作，属于非统一性动作，用于对bean进行创建前业务处理

- 运行时机：当前操作伴随着任意一个bean的创建过程，保障其个性化业务处理

>  注意：上述操作均需要被spring容器加载方可运行（@Import）
>
>  @Import只能有一个，需要导入多个时使用数组形式

**繁琐的bean初始化过程处理**

- FactoryBean
  - 对单一的bean的初始化过程进行封装，达到简化配置的目的

**FactoryBean与BeanFactory的区别**

- FactoryBean：封装单个bean的创建过程
- BeanFactory：Spring容器顶层接口，定义了bean相关的获取操作

## 六、AOP配置

**OOP开发思路**

![](http://images.hellocode.top/in5weF74Kc6VguU.png)

### 1、简介

- AOP（Aspect Oriented Programing）：面向切面编程，一种编程*范式*，隶属于软件工厂范畴，知道开发者如何组织程序结构
- AOP弥补了OOP的不足，基于OOP基础之上进行横向开发
  - OOP规定程序开发以类为主体模型，一切围绕对象进行，完成某个任务先构建模型
  - AOP程序开发主要关注基于OOP开发中的共性功能，一切围绕共性功能进行，完成某个任务先构建可能遇到的所有共性功能（当所有功能都开发出来也就没有共性与非共性之分）
- “AOP联盟”：不是公司，是一个组织，提出了AOP思想

**作用**

- 伴随着AOP时代的降临，可以从各个行业的标准化、规范化开始入手，一步一步将所有共性功能逐一开发完毕，最终以功能组合来完成个别业务模块乃至整体业务系统的开发
- 目标：将软件开发由手工制作走向半自动化/全自动化阶段，实现“拔插式组件体系结构”搭建

**优势**

- 提高代码的可重用性
- 业务代码编码更简洁
- 业务代码维护更高效
- 业务功能扩展更便捷

### 2、入门案例

**AOP相关概念**

- Joinpoint（连接点）：就是方法
- *Pointcut（切入点）*：就是挖掉共性功能的方法
- *Advice（通知）*：就是共性功能，最终以一个方法的形式呈现
- Target（目标对象）：就是挖掉功能的方法对应的类产生的对象，这种对象是是无法直接完成最终工作的
- Weaving（织入）：就是将挖掉的功能回填的动态过程
- Proxy（代理）：目标对象无法直接完成工作，需要对其进行功能回填，通过创建原始对象的代理对象实现
- Introduction（引入/引介）：就是对原始对象无中生有的添加成员变量或成员方法

**AOP开发过程**

- 开发阶段（开发者完成）
  - 正常的制作程序
  - 将非共性功能开发到对应的目标对象类中，并制作成切入点方法
  - 将共性功能独立开发出来，制作成*通知*
  - 在配置文件中，声明*切入点*
  - 在配置文件中，声明*切入点*和*通知*间的关系（含*通知类型*），即*切面*
- 运行阶段（AOP完成）
  - Spring容器加载配置文件，监控所有配置的*切入点*方法的执行
  - 当监控到*切入点*方法被运行，使用*代理*机制，动态创建*目标对象*的*代理对象*，根据*通知类型*，在*代理对象*的对应位置将*通知*对应的功能*织入*，完成完整的代码逻辑并运行

**AOP开发方式**

- XML方式
- XML+注解方式
- 注解方式

**入门案例制作分析**

1. 导入相关坐标

   ```xml
   <dependencies>
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-context</artifactId>
               <version>5.1.9.RELEASE</version>
           </dependency>
           <dependency>
               <groupId>org.aspectj</groupId>
               <artifactId>aspectjweaver</artifactId>
               <version>1.9.4</version>
           </dependency>
       </dependencies>
   ```

2. 确认要抽取的功能，并将其制作成方法保存到专用的类中，删除原始业务中对应的功能

   ```java
   public class UserServiceImpl implements UserService {
       public void save() {
           // 抽取共性功能
           // System.out.println("共性功能");
           System.out.println("user service running...");
       }
   }
   ```

   **AOPAdvice**

   ```java
   public class AOPAdvice {
       public void function(){
           System.out.println("共性功能");
       }
   }
   ```

3. 将所有AOP操作的资源加载到IoC容器中

4. 使用配置的方式描述被抽取功能的位置，并描述被抽取功能与对应位置的关系

5. 运行程序

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启AOP命名空间-->

    <bean id="userService" class="top.hellocode.impl.UserServiceImpl"/>

    <!--配置共性功能成为spring控制的bean-->
    <bean id="myAdvice" class="top.hellocode.aop.AOPAdvice"/>

    <!--配置AOP-->
    <aop:config>
        <!--配置切入点-->
        <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
        <!--配置切面（切入点与通知的关系）-->
        <aop:aspect ref="myAdvice">
            <!--配置具体的切入点对应通知的哪个操作方法-->
            <aop:before method="function" pointcut-ref="pt"/>
        </aop:aspect>
    </aop:config>
</beans>
```

### 3、XML配置

**AspectJ**

- Aspect（切面）用于描述切入点与通知间的关系，是AOP编程中的一个概念
- AspectJ是基于Java语言对Aspect的实现

**AOP配置**

- 名称：`aop:config`

- 类型：*标签*

- 归属：beans标签

- 作用：设置AOP

- 格式

  ```xml
  <beans>
      <aop:config>...</aop:config>
      <aop:config>...</aop:config>
  </beans>
  ```

- 说明：一个beans标签中可以配置多个aop:config标签

----

- 名称：`aop:aspect`

- 类型：*标签*

- 归属：`aop:config`标签

- 作用：设置具体的AOP通知对应的切入点

- 格式

  ```xml
  <aop:config>
      <aop:aspect ref="beanId">...</aop:aspect>
      <aop:aspect ref="beanId">...</aop:aspect>
  </aop:config>
  ```

- 说明：一个aop:config中可以配置多个aop:aspect标签

- 基本属性

  - ref：通知类所在的bean的id

----

- 名称：`aop:pointcut`

- 类型：*标签*

- 归属：`aop:config`标签、`aop:aspect`标签

- 作用：设置切入点

- 格式

  ```xml
  <aop:config>
  	<aop:pointcut id="pointcutId" expression="...."/>
      <aop:aspect>
      	<aop:pointcut id="pointcutId" expression="...."/>
      </aop:aspect>
  </aop:config>
  ```

- 说明：一个aop:config可以配置多个aop:pointcut标签，且该标签可以配置在aop:aspect标签内

- 基本属性

  - id：识别切入点的名称
  - expression：切入点表达式

**切入点表达式**

- 切入点描述的是某个方法
- 切入点表达式是一个快速匹配方法描述的通配格式，类似于正则表达式

*语法格式*

`关键字 (访问修饰符 返回值 包名.类名.方法名 (参数) 异常名)`

- 关键字：描述表达式的匹配模式（参看关键字列表）
- 访问修饰符：方法的访问控制权限修饰符
- 类名：方法所在的类（此处可以配置接口名称）
- 异常：方法定义中指定抛出的异常
- 范例
  `execution (public User top.hellocode.service.UserService.findById(int))`

> 访问修饰符为public时可以省略

*关键字*

| 关键字             | 描述                       |
| ------------------ | -------------------------- |
| execution【常用】  | 匹配执行指定方法           |
| args【了解】       | 匹配带有指定参数类型的方法 |
| within             | ....                       |
| this               | ....                       |
| target             | ....                       |
| @within            | ....                       |
| @target            | ....                       |
| @args              | ....                       |
| @annotation        | ....                       |
| bean               | ....                       |
| reference pointcut | ....                       |

> 除了前两个，后面的关键字基本不会用，需要使用的时候再查阅资料即可

*通配符*

- `*`：单个独立的任意符号，可以独立出现，也可以作为前缀或者后缀的匹配符出现

  `execution(public * top.hellocode.*.UserService.find*(*))`

  匹配top.hellocode包下的任意包中的UserService类或接口中所有find开头的带有一个参数的方法

- `..`：多个连续的任意符号，可以独立出现，常用于简化包名与参数的书写

  `execution(public User top..UserService.findById(..))`

  匹配top包下的任意包中的UserService类或接口中所有名称为findById的方法

- `+`：专用于匹配子类类型
  
  `execution(* *..*Service+.*(..))`

*逻辑运算符*

- `&&`：连接两个切入点表达式，表示两个切入点表达式同时成立的匹配
- `||`：连接两个切入点表达式，表示两个切入点表达式成立任意一个的匹配
- `!`：连接单个切入点表达式，表示该切入点表达式不成立的匹配

**三种切入点配置方式**

```xml
<!--配置AOP-->
<aop:config>
    <!--公共切入点-->
    <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
    <!--配置切面（切入点与通知的关系）-->
    <aop:aspect ref="myAdvice">
        <!--局部切入点-->
        <aop:pointcut id="pt2" expression="execution(* *..*(..))"/>
        <!--配置具体的切入点对应通知的哪个操作方法-->
        <aop:before method="before" pointcut-ref="pt2"/>
		<!--直接配置切入点-->
        <aop:before method="before" pointcut="execution(* *..*(..))"/>
    </aop:aspect>
</aop:config>
```

*切入点配置经验*

- 企业开发命名规范严格遵循规范文档进行
- 先为方法配置局部切入点
- 再抽取类中公共切入点
- 最后抽取全局切入点
- 代码走查过程中检测切入点是否存在越界性包含
- 代码走查过程中检测切入点是否存在非包含性进驻
- 设定AOP执行检测程序，在单元测试中监控通知被执行次数与预计次数是否匹配
- *设定完毕的切入点如果发生调整务必进行回归测试*

(以上规则适用于XML配置格式)

**五种通知类型配置**

*AOP的通知类型共五种*

- 前置通知（`before`）：原始方法执行前执行，如果通知中抛出异常，阻止原始方法运行
  - 应用：数据校验
- 后置通知(`after`)：原始方法执行后执行，无论原始方法中是否出现异常，都将执行通知
  - 应用：现场清理
- 返回后通知(`after-returning`)：原始方法正常执行完毕后返回结果后执行，如果原始方法中抛出异常，无法执行
  - 应用：返回值相关数据处理
- 抛出异常后通知(`after-throwing`)：原始方法抛出异常后执行，如果原始方法没有抛出异常，无法执行
  - 应用：对原始方法中出现的异常信息进行处理
- 环绕通知(`around`)：在原始方法执行前后均有对应方法执行，还可以阻止原始方法的执行
  - 应用：十分强大，可以做任何事情

----

- 名称：`aop:before`

- 类型：*标签*

- 归属：`aop:aspect`标签

- 作用：设置前置通知

- 格式

  ```xml
  <aop:aspect ref="adviceId">
      <aop:before method="methodName" pointcut="..."/>
  </aop:aspect>
  ```

- 说明：一个`aop:aspect`标签中可以配置多个`aop:before`标签

- 基本属性

  - method：在通知类中设置当前通知类别对应的方法
  - pointcut：设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
  - pointcut-ref：设置当前通知对应的切入点id，与pointcut属性冲突

----

*环绕通知开发方式*

- 环绕通知是在原始方法的前后添加功能，在环绕通知中，存在对原始方法的显示调用

  ```java
  public Object around(ProceedingJoinPoint pjp) throws Throwable {
      System.out.println("around before");
      // 对原始方法调用
      Object ret = pjp.proceed();
      System.out.println("around after");
      return ret;
  }
  ```

- 环绕通知方法相关说明

  - 方法须设定Object类型的返回值，否则会拦截原始方法的返回。如果原始方法返回值类型为void，通知方法也可以设定返回值类型为void，最终返回null
  - 方法需在第一个参数位置设定ProceedingJoinPoint对象，通过该对象调用proceed()方法，实现对原始方法的调用。如省略该参数，原始方法将无法执行
  - 使用proceed()方法调用原始方法时，因无法预知原始方法运行过程中是否会出现异常，强制抛出Throwable对象，封装原始方法中可能出现的异常信息

**通知顺序**：当同一个切入点配置了多个通知时，通知会存在运行的先后顺序，该顺序以通知配置的顺序为准

**通知中获取参数**

- 设定通知方法第一个参数为`JoinPoint`，通过该对象调用`getArgs()`方法，获取原始方法运行的参数数组

  ```java
  public void before(JoinPoint jp){
      Object[] args = jp.getArgs();
      System.out.println("before..." + args[0]);
  }
  ```

- 所有的通知均可以获取参数

----

- 设定切入点表达式为通知方法传递参数（锁定通知变量名）

- 原始方法

  ```java
  public void save(int param1, int param2){
      System.out.println("user service running...");
  }
  ```

- AOP配置

  ```xml
  <aop:aspect ref="myAdvice">
      <aop:pointcut id="pt" expression="execution(* *..*(..)) &amp;&amp; args(a,b) "/>
      <aop:before method="before" pointcut-ref="pt"/>
  </aop:aspect>
  ```

- 通知类

  ```java
  public void before(int a, int b){
      System.out.println("a=" + a);
      System.out.println("b=" + b);
  }
  ```

![](http://images.hellocode.top/NgWDYkSzEaHfti4.png)

![](http://images.hellocode.top/dn8eqMtTx9U2jmC.png)

**通知中获取返回值**

- 设定返回值变量名

- 原始方法

  ```java
  public int save(){
      System.out.println("user service running...");
      return 100;
  }
  ```

- AOP配置

  ```xml
  <aop:aspect ref="myAdvice">
      <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
      <aop:after-returning method="afterReturning" pointcut-ref="pt" returning="ret"/>
  </aop:aspect>
  ```

- 通知类

  ```java
  public void afterReturning(Object ret){
      System.out.println(ret);
  }
  ```

- 适用于返回后通知(after-returning)

----

- 在通知类的方法中调用原始方法获取返回值

- 原始方法

  ```java
  public int save(){
      System.out.println("user service running...");
      return 100;
  }
  ```

- AOP配置

  ```xml
  <aop:aspect ref="myAdvice">
      <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
      <aop:around method="around" pointcut-ref="pt"/>
  </aop:aspect>
  ```

- 通知类

  ```java
  public Object around(Object ret){
      Object ret = pjp.proceed();
      return ret;
  }
  ```

- 适用于环绕通知(around)

**通知中获取异常对象**

- 设定异常对象变量名

- 原始方法

  ```java
  public void save(){
      System.out.println("user service running...");
      int i = 1 / 0;
  }
  ```

- AOP配置

  ```xml
  <aop:aspect ref="myAdvice">
      <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
      <aop:after-throwing method="afterThrowing" pointcut-ref="pt" throwing="t"/>
  </aop:aspect>
  ```

- 通知类

  ```java
  public Object afterThrowing(Throwable t){
      System.out.println(t.getMessage());
  }
  ```

- 适用于返回后通知(after-throwing)

----

- 在通知类的方法中调用原始方法捕获异常

- 原始方法

  ```java
  public void save(){
      System.out.println("user service running...");
      int i = 1 / 0;
  }
  ```

- AOP配置

  ```xml
  <aop:aspect ref="myAdvice">
      <aop:pointcut id="pt" expression="execution(* *..*(..))"/>
      <aop:around method="around" pointcut-ref="pt"/>
  </aop:aspect>
  ```

- 通知类

  ```java
  public Object around(ProceedingJoinPoint pjp) throws Throwable {
      Object ret = pjp.proceed();			// 对此处进行try...catch...捕获异常，或者抛出异常
      return ret;
  }
  ```

- 适用于环绕通知(around)

### 4、注解配置

![](http://images.hellocode.top/9G7XQvMCwzpaAEh.png)

**在XML格式基础上**

- 导入坐标（伴随spring-context坐标导入以及依赖导入完成）
- 开启AOP注解支持
- 配置切面`@Aspect`
- 定义专用的切入点方法，并配置切入点`@Pointcut`
- 为通知方法配置通知类型及对应切入点`@Before`

**注解开发AOP注意事项**

1. 切入点最终体现为一个方法，无参无返回值，无实际方法体内容，但不能是抽象方法
2. 引用切入点时必须使用方法调用名称，方法后面的`()`不能省略
3. 切面类中定义的切入点只能在当前类中使用，如果想引用其他类中定义的切入点使用“`类名.方法名()`”引用（可以专门定义一个类来存放切入点）
4. 可以在通知类型注解后添加参数，实现XML配置中的属性，例如：after-returning后的returning属性

![](http://images.hellocode.top/LcxKmq4TVsMgZhi.png)![](http://images.hellocode.top/JvhApbzRPagFO6T.png)

**AOP注解开发通知执行顺序控制（了解）**

> AOP使用XML配置情况下，通知的执行顺序由配置顺序决定，在注解情况下由于不存在配置顺序的概念，参照通知所配置的方法名字符串对应的编码值顺序，可以简单理解为字母排序

- 同一个通知类中，相同通知类型以方法名排序为准
- 不同通知类中，以类名排序为准
- 使用`@Order`注解通过变更bean的加载顺序改变通知的加载顺序

*企业开发经验*

- 通知方法名由3部分组成，分别是前缀、顺序编码、功能描述
- 前缀为固定字符串，例如baidu、hellocode等，无实际意义
- 顺序编码为6位以内的整数，通常3位即可，不足位补0
- 功能描述为该方法对应的实际通知功能，例如exception、strLenCheck
- 控制通知执行顺序使用顺序编码控制，使用时做一定空间预留
  - 003使用，006使用，预留001、002、004、005、007、008
  - 使用时从中段开始使用，方便后期做前置追加或后置追加
  - 最终顺序以运行顺序为准，以测试结果为准，不以设定规则为准

**AOP注解驱动**

- 名称：`@EnableAspectJAutoProxy`

- 类型：*注解*

- 位置：Spring注解配置类定义上方

- 作用：设置当前类开启AOP注解驱动的支持，加载AOP注解

- 格式

  ```java
  @Configuration
  @ComponentScan("top.hellocode")
  @EnableAspectJAutoProxy
  public class SpringConfig{
      
  }
  ```

### 5、综合案例

**案例介绍：**对项目进行业务层接口执行监控，测量业务层接口的执行效率

**案例分析**

- 测量接口执行效率：接口方法执行前后获取执行时间，求出执行时长
  - System.currentTimeMillis()
- 对项目进行监控：项目中所有接口方法，AOP思想，执行期动态织入代码
  - 环绕通知
  - proceed()方法执行前后获取系统时间

**制作步骤**

- 定义切入点（务必要绑定到接口上，而不是接口实现类上）
- 制作AOP环绕通知，完成测量功能
- 注解配置AOP
- 开启注解驱动支持

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月13日 15:16
 */
@Component
@Aspect
public class RunTimeMonitorAdvice {

    // 定义切入点，监控业务层接口
    @Pointcut("execution(* top.hellocode.*Service.find*(..))")
    public void pt(){}

    @Around("pt()")
    public Object runtimeAround(ProceedingJoinPoint pjp) throws Throwable{
        Signature signature = pjp.getSignature();
        String className = signature.getDeclaringTypeName();        // 获取接口名
        String methodName = signature.getName();        // 获取方法名

        long sum = 0L;
        Object ret = null;
        // 为了增强精确度，使用循环
        for(int i = 0; i < 10000; i++){
            long startTime = System.currentTimeMillis();
            ret = pjp.proceed(pjp.getArgs());
            long endTime = System.currentTimeMillis();
            sum += endTime - startTime;
        }
        System.out.println(className + ":" + methodName + "(万次)run:" + sum + "ms");
        return ret;
    }
}
```

**案例后续思考与设计**

*测量真实性*

- 开发测量是隔离性反复执行某个操作，是理想情况，上线测量差异过大
- 上线测量服务器性能略低于单机开发测量
- 上线测量基于缓存的性能查询要优于数据库查询测量
- 上线测量接口的性能与最终对外提供的服务性能差异过大
- 当外部条件发生变化（硬件），需要进行回归测试，例如数据库迁移

*测量结果展示*

- 测量结果无需每一个都展示，需要设定检测阈值
- 阈值设定要根据业务进行区分，一个复杂的查询与简单的查询差异化很大
- 阈值设定需要做独立的配置文件或通过图形工具配置（工具级别的开发）
- 配合图形界面展示测量结果

## 七、AOP底层原理

### 1、静态代理

> 装饰者模式（Decorator Pattern）：在不惊动原始设计的基础上，为其添加功能

```java
package base.decorator;

import top.hellocode.service.UserService;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月13日 18:05
 */
public class UserServiceImplDecorator implements UserService {
    private UserService userService;

    public UserServiceImplDecorator(UserService userService){
        this.userService = userService;
    }
    
    public void save() {
        userService.save();
        // 增强功能
        System.out.println("刮大白");
    }
}
```

```java
public static void main(String[] args) {
    UserService userService = new UserServiceImpl();
    UserService userService1 = new UserServiceImplDecorator(userService);
    userService1.save();	// 此处增强了功能
}
```

### 2、JDKProxy动态代理

> JDKProxy动态代理是针对对象做代理，要求原始对象具有接口实现，并对接口方法进行增强

```java
package base.proxy;

import top.hellocode.service.UserService;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月13日 18:11
 */
public class UserServiceJDKProxy {
    public static UserService createUserServiceJDKProxy(final UserService userService){
        ClassLoader cl = userService.getClass().getClassLoader();
        Class[] classes = userService.getClass().getInterfaces();
        InvocationHandler ih = new InvocationHandler() {
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                Object ret = method.invoke(userService, args);
                System.out.println("刮大白");
                return ret;
            }
        };
        UserService service = (UserService) Proxy.newProxyInstance(cl,classes,ih);
        return service;
    }
}
```

```java
public static void main(String[] args) {
    UserService userService = new UserServiceImpl();
    UserService userService1 = UserServiceJDKProxy.createUserServiceJDKProxy(userService);
    userService1.save();
}
```

### 3、Cglib动态代理

- CGLIB(Code Generation Library),Code生成类库
- CGLIB动态代理不限定是否具有接口，可以对任意操作进行增强
- CGLIB动态代理无需要原始被代理对象，动态创建出新的代理对象![](http://images.hellocode.top/QkcfRzM6uqSZ9pj.png)

```java
package base.cglib;

import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;
import top.hellocode.service.UserService;

import java.lang.reflect.Method;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月13日 18:30
 */
public class UserServiceCglibProxy {
    public static UserService createUserServiceCglibProxy(Class clazz) {
        Enhancer enhancer = new Enhancer();     // 创建动态字节码
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(new MethodInterceptor() {
            public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                Object ret = methodProxy.invokeSuper(o, objects);        // 调用原始方法
                if (method.getName().equals("save")) {
                    System.out.println("刮大白");      // 对原始方法做增强
                }
                return ret;
            }
        });
        return (UserService) enhancer.create();
    }
}
```

```java
public static void main(String[] args) {
    UserService userService = UserServiceCglibProxy.createUserServiceCglibProxy(UserServiceImpl.class);
    userService.save();
}
```

**代理模式的选择**

> Spring可以通过配置的形式控制使用的代理形式，默认使用JDKProxy，通过配置可以修改为使用CGLib

*XML配置*

```xml
<aop:config proxy-target-class="false">
</aop:config>
```

*XML注解支持*

```xml
<aop:aspectj-autoproxy proxy-target-class="false"/>
```

*注解驱动*

```java
@EnableAspectJAutoProxy(proxyTargetClass = true)
```

> false（默认）：JDKProxy；
>
> true：CGLibProxy

### 4、织入时机

![](http://images.hellocode.top/CjJtw56b8E9OmrN.png)

> Spring使用的是运行期织入

## 八、事务管理

### 1、基础概念

- 事务指数据库中个别操作失败时，提供一种方式使数据库恢复到正常状态（A），保障数据库即使在异常状态下仍能保持数据一致性（C）（要么操作前状态，要么操作后状态）
- 当出现并发访问时，在多个访问间进行相互隔离，防止并发访问操作结果互相干扰（I）

**事务特征（ACID）**

- 原子性（Atomicity）：指事务是一个不可分割的整体，其中的操作要么全执行或全不执行
- 一致性（Consistency）：事务前后数据的完整性必须保持一致
- 隔离性（Isolation）：事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要互相隔离
- 持久性（Durability）：持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响

**事务隔离级**

*脏读*：允许读取未提交的信息

- 原因：Read uncommitted
- 解决方案：Read Committed（表级读锁）

*不可重复读*：读取过程中单个数据发生了变化

- 解决方案：Repeatable read（行级写锁）

*幻读*：读取过程中数据条目发生了变化

- 解决方案：Serializable（表级写锁）

### 2、Spring核心事务对象

> J2EE开发使用分层设计的思想进行，对于简单的业务层转调数据层的单一操作，事务开启在业务层或者数据层并无太大差别，当业务中包含多个数据层的调用时，需要在业务层开启事务，对数据层中多个操作进行组合并归属于同一个事务进行处理

Spring为业务层提供了整套的事务解决方案
- PlatformTransactionManager
- TransactionDefinition
- TransactionStatus

**PlatformTransactionManager**（平台事务管理器实现类）

- *DataSourceTransactionManager*：适用于Spring JDBC或Mybatis
- HibernateTransactionManager：适用于Hibernate3.0及以上版本
- JpaTransactionManager：适用于JPA
- JdoTransactionManager：适用于JDO
- JtaTransactionManager：适用于JTA

----

- JPA(Java Persistence API)：Java EE标准之一，为POJO提供持久化标准规范，并规范了持久化开发的统一API，符合JPA规范的开发可以在不同的JPA框架下运行
- JDO(Java Data Object)：是Java对象持久化规范，用于存取某数据库中的对象，并提供规范化API。与JDBC相比，JDBC仅针对关系型数据库进行操作，JDO可以扩展到关系型数据库、文件、XML、对象数据库（ODBMS）等，可移植性更强
- JTA(Java Transaction API)：Java EE标准之一，允许应用程序执行分布式事务处理。与JDBC相比，JDBC事务则被限定在一个单一的数据库连接，而一个JTA事务可以有多个参与者，比如JDBC连接、JDO都可以参与到一个JTA事务中

----

> PlatformTransactionManager接口定义了事务的基本操作

- 获取事务

  ```java
  TransactionStatus getTransaction(TransactionDefinition definition)
  ```

- 提交事务

  ```java
  void commit(TransactionStatus status)
  ```

- 回滚事务

  ```java
  void rollback(TransactionStatus status)
  ```

**TransactionDefinition**

> 此接口定义了事务的基本信息

- 获取事务定义名称

  `String getName()`

- 获取事务的读写属性
  
`boolean isReadOnly()`
  
- 获取事务隔离级别
  
`int getIsolationLevel()`
  
- 获取事务超时时间
  
`int getTimeout()`
  
- 获取事务传播行为特征
  
  `int getPropagationBehavior()`

**TransactionStatus**

> 此接口定义了事务在执行过程中某个时间点上的状态信息及对应的状态操作

- 获取事务是否处于新开启事务状态：`boolean isNewTransaction()`
- 获取事务是否处于已完成状态：`boolean isCompleted()`
- 获取事务是否处于回滚状态：`boolean isRollbackOnly()`
- 刷新事务状态：`void flush()`
- 获取事务是否具有回滚存储点：`boolean hasSavepoint()`
- 设置事务处于回滚状态：`void setRollbackOnly()`

### 3、案例介绍

**基于Spring、Mybatis整合**

- 银行转账业务说明
  
银行转账操作中，涉及从A账户到B账户的资金转移操作。数据层仅提供单条数据的基础操作，未设计多账户间的业务操作
  
- 业务层接口提供转账操作

  ```java
  package top.hellocode.service;
  
  /**
   * @author HelloCode
   * @site https://www.hellocode.top
   * @date 2022年07月14日 17:34
   */
  public interface AccountService {
      public void transfer(String outName, String inName, Double money);
  }
  ```

- 业务层实现提供转账操作

  ```java
  public void transfer(String outName, String inName, Double money) {
      accountDao.inMoney(outName, money);
      accountDao.outMoney(inName, money);
  }
  ```

- 数据层提供对应的入账与出账操作

  ```java
  <mapper namespace="top.hellocode.dao.AccountDao">
      <update id="inMoney">
          update account set money = money + #{money} where name = #{name}
      </update>
  
      <update id="outMoney">
          update account set money = money - #{money} where name = #{name}
      </update>
  </mapper>
  ```

### 4、编程式事务

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月14日 17:33
 */
public class AccountServiceImpl implements AccountService {
    private AccountDao accountDao;
    private DataSource dataSource;
    public void setDataSource(DataSource dataSource){
        this.dataSource = dataSource;
    }
    public void setAccountDao(AccountDao accountDao){
        this.accountDao = accountDao;
    }
    @Override
    public void transfer(String outName, String inName, Double money) {
        // 创造事务管理器
        PlatformTransactionManager ptm = new DataSourceTransactionManager(dataSource);
        // 创建事务定义对象
        TransactionDefinition td = new DefaultTransactionDefinition();
        // 创建事务状态对象，用于控制事务执行
        TransactionStatus ts = ptm.getTransaction(td);

        accountDao.inMoney(outName, money);
        int i = 1 / 0;		// 模拟错误
        accountDao.outMoney(inName, money);

        // 提交事务
        ptm.commit(ts);
    }
}
```

**AOP改造编程式事务**

> 将业务层的事务处理功能抽取出来制作成AOP通知，利用环绕通知运行期的动态织入

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月14日 17:33
 */
public class AccountServiceImpl implements AccountService {
    private AccountDao accountDao;
    public void setAccountDao(AccountDao accountDao){
        this.accountDao = accountDao;
    }
    @Override
    public void transfer(String outName, String inName, Double money) {
        accountDao.inMoney(outName, money);
        int i = 1 / 0;
        accountDao.outMoney(inName, money);
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月14日 18:53
 */
public class TxAdvice {
    private AccountDao accountDao;
    private DataSource dataSource;
    public void setDataSource(DataSource dataSource){
        this.dataSource = dataSource;
    }
    public Object transactionManager(ProceedingJoinPoint pjp) throws Throwable {
        // 开启事务
        PlatformTransactionManager ptm = new DataSourceTransactionManager(dataSource);
        // 事务定义对象
        TransactionDefinition td = new DefaultTransactionDefinition();
        // 事务状态对象
        TransactionStatus ts = ptm.getTransaction(td);

        Object ret = pjp.proceed(pjp.getArgs());

        // 提交事务
        ptm.commit(ts);

        return ret;
    }
}
```

```xml
<aop:config>
    <aop:pointcut id="pt" expression="execution(* *..transfer(..))"/>
    <aop:aspect ref="txAdvice">
        <aop:around method="transactionManager" pointcut-ref="pt"/>
    </aop:aspect>
</aop:config>
```

### 5、声明式事务

#### 5.1. 配置文件

- 开启tx命名空间

  ```xml
  xmlns:tx="http://www.springframework.org/schema/tx"
  http://www.springframework.org/schema/tx
  http://www.springframework.org/schema/tx/spring-tx.xsd
  ```

- 使用tx命名空间配置事务专属通知类

  ```xml
  <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  <!--定义事务管理的通知类-->
  <tx:advice id="txAdvice" transaction-manager="txManager">
      <!--定义控制的事务-->
      <tx:attributes>
          <tx:method name="*" read-only="false"/>
          <tx:method name="get*" read-only="true"/>
      </tx:attributes>
  </tx:advice>
  ```

- 使用aop:advisor在AOP配置中引用事务专属通知类

  ```xml
  <aop:config>
      <aop:pointcut id="pt" expression="execution(* top.hellocode.service.*Service.*(..))"/>
      <aop:advisor advice-ref="txAdvice" pointcut-ref="pt"/>
  </aop:config>
  ```

**aop:advice与aop:advisor的区别**

- `aop:advice`：配置的通知类可以是普通的Java对象，不实现接口，也不使用继承关系
- `aop:advisor`：配置的通知类必须实现通知接口
  - MethodBeforeAdvice
  - AfterReturningAdvice
  - ThrowsAdvice
  - ......

----

**tx配置**

- 名称：`tx:advice`

- 类型：*标签*

- 归属：beans标签

- 作用：专用于声明事务通知

- 格式

  ```xml
  <beans>
  	<tx:advice id="txAdvice" transaction-manager="txManager">
      </tx:advice>
  </beans>
  ```

- 基本属性

  - id：用于配置aop时指定通知器的id
  - transaction-manager：指定事务管理器bean



----



- 名称：`tx:attributes`

- 类型：*标签*

- 归属：`tx:advice`标签

- 作用：定义通知属性

- 格式

  ```xml
  <tx:advice id="txAdvice" transaction-manager="txManager">
  	<tx:attributes>
      </tx:attributes>
  </tx:advice>
  ```

- 基本属性

  - 无

----



- 名称：`tx:method`

- 类型：*标签*

- 归属：`tx:attribute`标签

- 作用：设置具体的事务属性

- 格式

  ```xml
  <tx:attributes>
      <tx:method name="*" read-only="false"/>
      <tx:method name="get*" read-only="true"/>
  </tx:attributes>
  ```

- 说明：通常事务属性会配置多个，包含1个读写的全事务属性，1个只读的查询类事务属性

**tx:method属性**

```xml
<tx:method
    name="*"			待添加事务的方法名表达式（支持*号通配符），例如get*、*、....
    read-only="false"		设置事务的读写属性，true为只读，false为读写
    timeout="-1"		设置事务的超时时长，单位秒
    isolation="DEFAULT"		设置事务隔离级别，该隔离级设定是基于Spring的设定，非数据库端
    no-rollback-for=""		设置事务中不回滚的异常，多个异常间使用,分割
    rollback-for=""			设置事务中必回滚的异常，多个异常间使用,分割
    propagation="REQUIRED"		设置事务的传播行为
    />
```

#### 5.2. 事务传播行为

- 事务管理员
- 事务协调员

![](http://images.hellocode.top/KkrzXBANPFDQLig.png)

- 事务传播行为描述的是事务协调员对事务管理员所携带事务的处理态度

![](http://images.hellocode.top/3vilr2seS4cQH5J.png)

- `REQUIRED`：如果事务管理员开启了一个事务，那么如果事务协调员就会加入这个事务，所以他们两个都是用同一个事务都是T1；如果事务管理员没有开事务，那么事务协调员就会直接新建一个事务

![](http://images.hellocode.top/A6VoBywmfvJYa5p.png)

- `REQUIRES_NEW`：事务管理员不管开启还是没有开启一个事务，事务协调员都会再新建一个事务

![](http://images.hellocode.top/mH2AF9PagwJuR1k.png)

- `SUPPORTS`：如果事务管理员原来有事务，那么事务协调员就会加入这个事务；如果事务管理员原来没有事务，那么事务协调员不会加入，不要事务了

![](http://images.hellocode.top/a8VhZzjPuOFKbWq.png)

- `NOT_SUPPORTED`：原来事务管理员来的时候有没有事务，事务协调员都不会有事务

![](http://images.hellocode.top/yGUTkvjLX3HZDqF.png)

- `MANDATORY`：必须有事务，事务管理员来的时候带的有事务，事务协调员就会加入这个事务，如果事务管理员来的时候没有事务，那么就会报错

![](http://images.hellocode.top/ZAzxDCu4QGneYvJ.png)

- `NEVER`：不需要带的有事务，事务管理员来的时候如果带了事务，就会出现错误；如果不带事务的话，事务协调员也不会有事务

![](http://images.hellocode.top/ec4jwXSU9H3gYZ1.png)

*事务传播应用*

场景A：生成订单业务

- 子业务S1：记录日志到数据库表X
- 子业务S2：保存订单数据到数据库表Y
- 子业务S3：......
- 如果S2或S3或...事务提交失败，此时S1是否回滚？如何控制？
- （S1需要新事务）

场景B：生成订单业务

- 背景1：订单号生成依赖数据库中一个专门用于控制订单号编号生成的表M获取
- 背景2：每次获取完订单号，表M中记录的编号自增1
- 子业务S1：从表M中获取订单编号
- 子业务S2：保存订单数据，订单编号来自于表M
- 子业务S3：......
- （S1需要新事务）

#### 5.3. 注解方式

- 名称：`@Transactional`

- 类型：*方法注解*、*类注解*、*接口注解*(主流)

- 位置：方法定义上方，类定义上方，接口定义上方

- 作用：设置当前类/接口中所有的方法或具体方法开启事务，并指定相关事务属性

- 范例

  ```java
  @Transactional{
      readOnly = false,
      timeout = -1,
      isolation = Isolation.DEFAULT,
      rollbackFor = {ArithmeticException.class, IOException.class},
      noRollbackFor = {}
      propagation = Propagation.REQUIRES_NEW
  }
  ```

----

- 名称：`tx:annotation-driven`

- 类型：*标签*

- 归属：beans标签

- 作用：开启事务注解驱动，并指定对应的事务管理器

- 范例

  ```xml
  <tx:annotation-driven transaction-manager="txManager"/>
  ```

**注解驱动**

- 名称：`@EnableTransactionManagement`

- 类型：*类注解*

- 位置：Spring注解配置类上方

- 作用：开启注解驱动，等同XML格式中的注解驱动

- 范例

  ```java
  @Configuration
  @ComponentScan("top.hellocode")
  @EnableTransactionManagement
  public class SpringConfig {
  }
  ```

  ```java
  public class TransactionManagerConfig{
      @Bean
      public PlatformTransactionManager getTransactionManager(@Autowired DataSource dataSource){
          return new DataSourceTransactionManager(dataSource);
      }
  }
  ```

## 九、模板对象

- TransactionTemplate
- JDBCTemplate
- RedisTemplate
- RabbitTemplate
- JmsTemplate
- HibernateTemplate
- RestTemplate

### 1、JdbcTemplate

> 了解学习即可

- 提供标准的sql语句操作API

  ```java
  public void save(Account account){
      String sql = "insert into account(name,money) values(?,?)";
      jdbcTemplate.update(sql,account.getName(),account.getMoney());
  }
  ```

**NamedParameterJdbcTemplate(了解)**

- 提供标准的具名sql语句操作API

  ```java
  public void save(Account account){
      String sql = "insert into account(name,money) values(:name,:money)";
      Map pm = new HashMap();
      pm.put("name",account.getName());
      pm.put("money",account.getMoney());
      jdbcTemplate.update(sql,pm);
  }
  ```

### 2、RedisTemplate

- RedisTemplate对象结构

![](http://images.hellocode.top/l9P1JFe4Ldp5XbQ.png)

```java
public void changeMoney(Integer id, Double money) {
    redisTemplate.opsForValue().set("account:id:"+id,money);
}

public Double findMondyById(Integer id) {
    Object money = redisTemplate.opsForValue().get("account:id:" + id);
    return new Double(money.toString());
}
```

### 3、设计模式

**策略模式**

- 策略模式（Strategy Pattern）：使用不同策略的对象实现不同的行为方式，策略对象的变化导致行为的变化

![](http://images.hellocode.top/vsG7PQzKkw6VbBU.png)

![img](http://images.hellocode.top/20210629105229403.png)

**装饰模式**

- JdbcTemplate
- NamedParameterJdbcTemplate