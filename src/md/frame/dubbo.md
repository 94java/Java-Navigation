---
title: "Dubbo"
order: 4
category:
  - 框架 | 中间件
---

# Dubbo

## 一、互联网项目架构

### 1、大型互联网项目架构目标

**传统项目与互联网项目**

传统项目（用户群体：企业员工）
- OA系统（办公自动化系统）
- HR系统（人力资源系统）
- CRM系统（客户关系管理系统）
- ......

互联网项目（用户群体：广大网民）
- 天猫
- 微信
- 百度
- ......

![](http://images.hellocode.top/MDtzuiRL12pCbH3.png)

**用户体验**

- 美观、功能、速度、稳定性

*衡量一个网站速度是否快*

- 打开一个新页面一瞬间完成，页面内跳转一刹那间完成
- 根据佛经《僧祇律》记载：一刹那者为一念，二十念为一瞬，二十瞬为一弹指，二十弹指为一罗预，二十罗预为一须臾，一日一夜有三十须臾
- 经过周密的计算，一瞬间为0.36秒，一刹那有0.018秒

**互联网项目特点**

- 用户多
- 流量大，并发高
- 海量数据
- 易受攻击
- 功能繁琐
- 变更快

**大型互联网项目架构目标**

*高性能*：提供快速的访问体验

- 响应时间：指执行一个请求从开始到最后收到响应数据所花费的总体时间

- 并发数：指系统同时能处理的请求数量

  - 并发连接数：指的是客户端向服务器发起请求，并建立了TCP连接。每秒钟服务器连接的总TCP数量
  - 请求数：也称为QPS（Query Per Second）指每秒多少请求
  - 并发用户数：单位时间内有多少用户

- 吞吐量：指单位时间内系统能处理的请求数量

  - QPS：Query Per Second 每秒查询数
  - TPS：Transactions Per Seconds 每秒事务数
  - 一个事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。客户机在发送请求时开始计时，收到服务器响应后结束计时，以此来计算使用的时间和完成的事务个数
  - 一个页面的一次访问，只会形成一个TPS；但一次页面请求，可能产生多次对服务器的请求，就会有多个QPS

  `QPS >= 并发连接数 >= TPS`

*高可用*：网站服务一直可以正常访问

*可伸缩*：通过硬件增加/减少，提高/降低处理能力

*高可扩展*：系统间耦合低，方便的通过新增/移除方式，增加/减少新的功能/模块

*安全性*：提供网站安全访问和数据加密，安全存储等策略

*敏捷性*：随需应变，快速响应

### 2、集群和分布式

![](http://images.hellocode.top/upAosSkhyIdCGKz.png)

- 集群：很多“人”一起，干一样的事
  - 一个业务模块，部署在多台服务器上
- 分布式：很多“人”一起，干不一样的事。这些不一样的事，合起来是一件大事
  - 一个大的业务系统，拆分为小的业务模块，分别部署在不同的机器上

**早期单体架构**

![](http://images.hellocode.top/ECunL1AbSg3Uo7t.png)

**改进之后**

![](http://images.hellocode.top/kz1FLDKEOX6MsQl.png)

**继续改进**

![](http://images.hellocode.top/a8VOu7BXiYRHgpF.png)

### 3、架构演进

![](http://images.hellocode.top/P92DAWIrR4tJUQo.png)

**单体架构**

![](http://images.hellocode.top/S9vBeLguzwcXmJs.png)

**垂直架构**

![](http://images.hellocode.top/aifjLHRnewZEGCu.png)

**分布式架构**

![](http://images.hellocode.top/fzdBqwrym7Dnc53.png)

**SOA架构**

![](http://images.hellocode.top/mchwTZP47gpnXbU.png)

**微服务架构**

![](http://images.hellocode.top/ew4Rf68HXk2u3aE.png)

## 二、快速入门

### 1、概述

#### 1.1. Dubbo

**概念**

- Dubbo是阿里巴巴公司开源的一个高性能、轻量级的Java RPC框架
- 致力于提供高性能和透明化的RPC远程服务调用方案，以及SOA服务治理方案
  - RPC： Remote Procedure Call 远程过程调用。有非常多的协议和技术来都实现了RPC的过程。比如：HTTP REST风格，Java RMI规范、WebService SOAP协议、Hession等等。
  - SOA：（Service-Oriented Architecture，面向服务的架构）是一个组件模型，它将应用程序的不同功能单元（称为服务）进行拆分，并通过这些服务之间定义良好的接口和契约联系起来。
- 官网：[http://dubbo.apache.org](http://dubbo.apache.org)

*架构*

![](http://images.hellocode.top/qgsr15OujH82bvk.png)

- Provider：暴露服务的服务提供方
- Container：服务运行容器
- Consumer：调用远程服务的服务消费方
- Registry：服务注册与发现的注册中心
- Monitor：统计服务的调用次数和调用时间的监控中心

#### 1.2. Zookeeper

**下载安装**

- Dubbo官方推荐使用Zookeeper作为注册中心（默认端口2181）

- Zookeeper服务器是用Java创建的，它运行在JVM之上，需要安装JDK 7或更高版本

- 将下载的Zookeeper放到/opt/zooKeeper目录下（建议）

  ```shell
  #上传zookeeper alt+p
  put e:/apache-zookeeper-3.5.6-bin.tar.gz
  #打开 opt目录
  cd /opt
  # 创建zooKeeper目录
  mkdir zooKeeper
  #将zooKeeper安装包移动到 /opt/zooKeeper
  mv apache-zookeeper-3.5.6-bin.tar.gz /opt/zooKeeper
  ```

- 将tar包解压到/opt/zooKeeper目录下（建议）
  
  `tar -zxvf apache-ZooKeeper-3.5.6-bin.tar.gz`

**配置启动**

- 配置zoo.cfg（初始的zoo_sample.cfg并不生效，需要改名为zoo.cfg）

  ```shell
  #进入到conf目录
  cd /opt/zooKeeper/apache-zooKeeper-3.5.6-bin/conf/
  #拷贝
  cp zoo_sample.cfg zoo.cfg
  ```

- 修改zoo.cfg

  ```shell
  #打开目录
  cd /opt/zooKeeper/
  #创建zooKeeper存储目录
  mkdir zkdata
  #修改zoo.cfg，修改存储目录dataDir=/opt/zooKeeper/zkdata
  vim /opt/zooKeeper/apache-zooKeeper-3.5.6-bin/conf/zoo.cfg
  ```

- 启动ZooKeeper

  ```shell
  #进入zk的bin目录
  cd /opt/zooKeeper/apache-zooKeeper-3.5.6-bin/bin/
  # 启动
  ./zkServer.sh start
  # 停止
  ./zkServer.sh stop
  # 状态
  ./zkServer.sh status
  ```

### 2、代码实现

**实现步骤**

1. 创建服务提供者Provider模块
2. 创建服务消费者Consumer模块
3. 在服务提供者模块编写UserServiceImpl提供服务
4. 在服务消费者中的UserController远程调用UserServiceImpl提供的服务
5. 分别启动两个服务，测试

```xml
<properties>
    <dubbo.version>2.7.4.1</dubbo.version>
    <zookeeper.version>4.0.0</zookeeper.version>
</properties>

<dependencies>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.5</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.21</version>
    </dependency>

    <!--dubbo的起步依赖，版本2.7之后统一为org.apache.dubbo-->
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo</artifactId>
        <version>${dubbo.version}</version>
    </dependency>
    <!--zookeeper客户端实现-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>${zookeeper.version}</version>
    </dependency>
    <!--zookeeper客户端实现-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
        <version>${zookeeper.version}</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <port>8000</port>
                <path>/</path>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

#控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%c]-%m%n

#文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/logFile.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n

#日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

**服务提供者：dubbo-service**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
        http://dubbo.apache.org/schema/dubbo
       http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <!--<context:component-scan base-package="top.hellocode.service"/>-->

    <!--除了tomcat占用端口，dubbo默认也会占用20880端口-->
    <!--<dubbo:protocol port="20880"/>-->
    <!--dubbo配置-->
    <!--1.配置项目的名称，唯一-->
    <dubbo:application name="dubbo-service"/>
    <!--2.配置注册中心的地址-->
    <dubbo:registry address="zookeeper://192.168.23.129:2181"/>
    <!--3.配置dubbo的包扫描-->
    <dubbo:annotation package="top.hellocode.service"/>

</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.4"
         xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">

  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath*:applicationContext.xml</param-value>
  </context-param>

  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
</web-app>
```

> 基本和Spring类似，Spring是将对应的bean加入到IOC容器中，而dubbo是将对应的方法（服务）加入到远程服务中，称为服务提供者
>
> 注解都是Service，但是要注意对应的包

**服务消费者：dubbo-web**

`@Reference`：远程注入注解（可以类比本地注入@Autowired理解）

- 从zookeeper注册中心获取userService的访问url
- 进行远程调用RPC
- 将结果封装为一个代理对象，给变量赋值

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
        http://dubbo.apache.org/schema/dubbo
        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="top.hellocode.controller"/>

    <dubbo:application name="dubbo-web">
        <dubbo:parameter key="qos.port" value="33333"/>
    </dubbo:application>
    <dubbo:registry address="zookeeper://192.168.23.129:2181"/>
    <dubbo:annotation package="top.hellocode.controller"/>
</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.4"
         xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">

  <servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath*:Spring-MVC.xml</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

**注意**

- 因为是远程注入，Controller不再通过maven依赖service，这样的话注入代码处就会报错，编译将不通过
- 解决方法有两种
  - 在controller中创建对应service中的接口，方法保持一致
  - 提取一个接口模块，将接口抽取出来，再通过maven依赖将接口依赖给所需要的模块（推荐）

## 三、高级特性

### 1、dubbo-admin

- dubbo-damin 管理平台，是图形化的服务管理平台
- 从注册中心中获取到所有的提供者/消费者进行配置管理
- 路由规则、动态配置、服务降级、访问控制、权重调整、负载均衡等管理功能
- dubbo-admin是一个前后端分离的项目。前端使用Vue，后端使用springboot
- 安装dubbo-admin 其实就是部署该项目，我们将dubbo-admin安装到开发环境上，要保证开发环境有jdk，maven，nodejs

**安装**

1. 安装nodejs

2. 下载dubbo-admin：[https://github.com/apache/dubbo-admin](https://github.com/apache/dubbo-admin)，并解压

3. 修改配置文件

   - 进入`dubbo-admin-develop\dubbo-admin-server\src\main\resources`目录，找到`application.properties`配置文件，进行修改
     ![](http://images.hellocode.top/fWv9m1rakpo7uhR.png)

   - admin.registry.address 注册中心

   - admin.config-center 配置中心

   - admin.metadata-report.address 元数据中心

4. 打包项目
   
   在dubbo-admin-develop目录调出cmd窗口执行命令`mvn clean package`
   
5. 启动后端
   - 切换到目录`dubbo-admin-develop\dubbo-admin-distribution\target`
   - 执行命令`java -jar .\dubbo-admin-0.4.0.jar`启动dubbo-admin对应的jar文件

6. 前台后端
   - 切换到目录`dubbo-admin-develop\dubbo-admin-ui`
   - 执行命令`nmp run dev`

7. 访问
   - 浏览器输入`http://localhost:8081`
   - 默认用户名密码均为root



> 第一次打开dubbo-admin时查看里面的元数据信息是空的
>
> 需要打开生产者配置文件加入下面配置
>
> `<dubbo:metadata-report address="zookeeper://192.168.23.129:2181" />`
>
> 重新启动生产者，再次打开dubbo-admin，这样元数据信息就出来了

### 2、序列化

**两个机器传输数据，如何传输Java对象？**

![](http://images.hellocode.top/fbBJOv41qU23kGE.png)

消费者调用生产者提供的服务，返回数据为Java对象时，将会通过序列化，以流的形式将对应的Java对象传递给消费者

> 补充：对应的Java类要想被序列化，需要实现Serializable接口
>
> 序列化和反序列化的过程还是比较麻烦的，不过dubbo内部已经将序列化和反序列化的过程内部封装了。我们只需要在定义pojo类的时候实现Serializable接口即可

实现Serializable接口之后，需要传输对象时，只需要在生产者对应服务（方法）中return即可（具体序列化与反序列化过程dubbo框架内部封装了）

### 3、地址缓存

**注册中心挂了，服务是否可以正常访问？**

- 可以，因为dubbo服务消费者在第一次调用时，会将服务提供方地址缓存到本地，以后在访问时不会访问注册中心
- 当服务提供者地址发生变化时，注册中心会通知服务消费者

> 也就是说，如果zookeeper因为意外故障导致服务停止的话，也不会影响旧功能的运行，对应的服务提供者地址都是有缓存的，如果不变更或新增，都不会影响使用

### 4、超时与重试

**超时**

![img](http://images.hellocode.top/20211002113544629.jpeg)

- 服务消费者在调用服务提供者的时候发生了阻塞、等待的情形，这个时候，服务消费者会一直等待下去
- 在某个峰值时刻，大量的请求都在同时请求服务消费者，会造成线程的大量堆积，势必会造成雪崩
- dubbo利用超时机制来解决这个问题，设置一个超时时间，在这个时间段内，无法完成服务访问，则自动断开连接
- 使用timeout属性配置超时时间，默认值1000，单位毫秒

> timeout属性是在`@Reference`或者`@Service`中使用的，推荐在服务提供方使用(`@Service`)

**重试**

- 如果只有超时机制，还是会引发一些问题
- 如果出现网络抖动，则这一次请求就会失败
- dubbo提供重试机制来避免类似问题的发生
- 和timeout类似，使用retries属性来设置重试次数。默认为2次

![](http://images.hellocode.top/QF5xJOYpNCWUeRz.png)

`@Service(timeout = 3000, retries = 2)`          当前服务3秒超时，重试2次，一共三次

### 5、多版本

![](http://images.hellocode.top/l7i9MIDJgvV1Efu.png)

- 灰度发布：当出现新功能时，会让一部分用户先使用新功能，用户反馈没问题时，再将所有用户迁移到新功能
- dubbo中使用version属性来设置和调用同一个接口的不同版本

![](http://images.hellocode.top/SdDWb5xNyOFz41j.png)

![](http://images.hellocode.top/NZFIoQC7yt5uSOf.png)

> 在指定相应的生产者的版本之后，在消费者的`@Reference`远程注入注解中同样使用version进行版本选择

![](http://images.hellocode.top/K9O3Rsdu6BYkTZp.png)

### 6、负载均衡

> dubbo一共提供四种负载均衡的策略

- Random ：按权重随机，默认值。按权重设置随机概率。

![](http://images.hellocode.top/rYbTUnBM3HxDX69.png)

- RoundRobin ：按权重轮询

![](http://images.hellocode.top/RjgLpJCm2qielfE.png)

- LeastActive：最少活跃调用数，相同活跃数的随机。

![](http://images.hellocode.top/sgF4MXV5NBrdAa6.png)

- ConsistentHash：一致性 Hash，相同参数的请求总是发到同一提供者

> 权重在服务提供者，`@Service`注解中，有一个weight属性，可对权重进行设置

负载均衡的策略需要在消费者远程注入处指定（`@Reference`）注解中，通过loadbalance属性进行指定

![](http://images.hellocode.top/Q7Nf8twodmkbHeK.png)

对应的策略值可以根据抽象类中的常量值查看，按两次shift搜索AbstractLoadBalance，查看对应的实现类

![](http://images.hellocode.top/uvgMH2Ze57xtTzL.png)

### 7、集群容错

![](http://images.hellocode.top/9cuLBRaA76WYjbG.png)

**集群容错模式**

• Failover Cluster：失败重试。默认值。当出现失败，重试其它服务器 ，默认重试2次，使用 retries 配置。一般用于读操作

• Failfast Cluster ：快速失败，只发起一次调用，失败立即报错。通常用于写操作。

• Failsafe Cluster ：失败安全，出现异常时，直接忽略。返回一个空结果。

• Failback Cluster ：失败自动恢复，后台记录失败请求，定时重发。通常用于消息通知操作。

• Forking Cluster ：并行调用多个服务器，只要一个成功即返回。

• Broadcast Cluster ：广播调用所有提供者，逐个调用，任意一台报错则报错。

> 对应的集群容错策略是在服务消费者远程注入处声明，即`@Reference`注解处
>
> 对应的策略字符串常量查询方式和负载均衡类似，查询Cluster接口对应的实现类

![](http://images.hellocode.top/rGoLvV5ImH8fFSn.png)

![](http://images.hellocode.top/qpJbHuMFv1XAGIV.png)

### 8、服务降级

> 可以通过服务降级功能临时屏蔽某个出错的非关键服务，并定义降级后的返回策略（如下图的广告和日志服务，属于非关键服务）

![](http://images.hellocode.top/TPnzkl3FgMLE8cH.png)

**服务降级方式**

- `mock=force:return null`表示消费方对该服务的方法调用都直接返回null值，不发起远程调用。用来屏蔽不重要服务不可用时对调用方的影响
- `mock=fail:return null`表示消费方对该服务的方法调用在失败后，再返回null值，不抛异常。用来容忍不重要服务不稳定时对调用方的影响

> 使用时需要在消费者远程注入的注解处声明降级方式(`@Reference`)

![](http://images.hellocode.top/JwcxgkNs6nQGOEt.png)