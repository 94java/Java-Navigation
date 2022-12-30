---
title: "SpringCloud"
order: 6
category:
  - Spring
---

# SpringCloud

## 一、基本概念

### 1、微服务架构

- "微服务”一词源于 Martin Fowler的名为 Microservices的博文,可以在他的官方博客上找到http://martinfowler.com/articles/microservices.html
- 简单地说,微服务是系统架构上的一种设计风格,它的主旨是将一个原本独立的系统拆分成多个小型服务,这些小型服务都在各自独立的进程中运行,服务之间通过基于HTTP的 RESTfuL AP进行通信协作
- 被拆分的每一个小型服务都围绕着系统中的某一项或一些耦合度较高的业务功能进行构建，并且每个服务都维护着自身的数据存储、业务开发自动化测试案例以及独立部署机制
- 由于有了轻量级的通信协议做基础，所以这些微服务可以使用不同的语言来编写

### 2、Spring Cloud

- Spring Cloud是一系列框架的有序集合
- Spring Cloud并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来
- 通过 SpringBoot 风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包
- 利用SpringBoot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用SpringBoot的开发风格做到一键启动和部署
- Spring Cloud项目官方地址：https://spring.io/projects/spring-cloud
- Spring Cloud版本命名方式采用了伦敦地铁站的名称，同时根据字母表的顺序来对应版本时间顺序，比如：最早的Release版本：*A*ngel，第二个Release版本：*B*rixton............*H*oxton..........2022.0.0

### 3、Spring Cloud 与 Dubbo 对比

|              | Dubbo         | Spring Cloud                 |
| ------------ | ------------- | ---------------------------- |
| 服务注册中心 | Zookeeper     | Spring Cloud Netflix Eureka  |
| 服务调用方式 | RPC           | Rest API                     |
| 服务监控     | Dubbo-monitor | Spring Boot Admin            |
| 断路器       | 不完善        | Spring Cloud Netflix Hystrix |
| 服务网关     | 无            | Spring Cloud Gateway         |
| 分布式配置   | 无            | Spring Cloud Config          |
| 服务跟踪     | 无            | Spring Cloud Sleuth          |
| 消息总线     | 无            | Spring Cloud Bus             |
| 数据流       | 无            | Spring Cloud Stream          |
| 批量任务     | 无            | Spring Cloud Task            |

- Spring Cloud 与 Dubbo 都是实现微服务的有效工具
- Dubbo 只是实现了服务治理，而Spring Cloud子项目分别覆盖了微服务架构下的众多部件
- Dubbo 使用RPC 通讯协议，Spring Cloud使用RESTful 完成通信，Dubbo效率略高于 Spring Cloud

## 二、服务治理

### 1、Eureka

![img](http://images.hellocode.top/e55064e61f6b44ec93c42590f9082fef.png)

- Eureka是Netflix公司开源的一个服务注册与发现的组件
- Eureka和其他Netflix 公司的服务组件（例如负载均衡、熔断器、网关等）一起，被Spring Cloud社区整合为Spring-Cloud-Netflix模块
- Eureka 包含两个组件：Eureka Server（注册中心）和Eureka Client（服务提供者、服务消费者）

#### 1.1. 使用步骤

![在这里插入图片描述](http://images.hellocode.top/20210323141105314.png)

1. 搭建Provider 和 Consumer服务
2. 使用RestTemplate 完成远程调用（provider服务地址发生变化，consumer也要改，高耦合）
   1. 定义restTemplate Bean
   2. 注入Bean
   3. 调用方法
3. 搭建Eureka Server服务
   1. 创建eureka-server模块
   2. 引入SpringCloud和eureka-server相关依赖
   3. 完成Eureka Server相关配置
   4. 启动该模块
4. 改造Provider 和 Consumer 成为Eureka Client
   1. 引入eureka-client相关依赖
   2. 完成eureka client相关配置
   3. 启动 测试
5. Consumer 服务通过从 Eureka Server中抓取Provider地址完成远程调用
   1. 注入DiscoveryClient对象
   2. 激活（启动类添加注解：`@EnableDiscoveryClient`，可以省略）
   3. 调用方法

*RestTemplta*

- Spring提供的一种简单便捷的模板类，用于在Java代码里访问restful服务
- 其功能与HttpClient类似，但是RestTemplate实现更优雅，使用更方便                  

*Eureka Server*

- 需要在启动类添加注解：`@EnableEurekaServer`
- 默认端口：8761
- 配置：一共四部分
  - dashboard：eureka的web控制台配置
  - instance：eureka的实例配置
  - client：eureka的客户端配置
  - server：eureka的服务端配置

```yml
server:
  port: 8761

# eureka配置(一共四部分)
eureka:
  instance:
    hostname: localhost
  client:
    service-url:
      # defaultZone: http://localhost:8761/eureka (默认)
      # eureka服务端地址，将来客户端使用该地址和eureka进行通信
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka
    # 是否将自己的路径注册到eureka上，一般server不需要，provider（client）需要
    register-with-eureka: false
    # 是否需要从eureka上抓取路径，server不需要，consumer（client）需要
    fetch-registry: false
```

> http://localhost:8761/eureka是客户端进行通信使用的，eureka后台地址是http://localhost:8761

![image-20221220112051622](http://images.hellocode.top/image-20221220112051622.png)

*Eureka Client*

- 需要在启动类添加注解：`@EnableEurekaClient`
- 为了在eureka后台显示服务名称，需要配置`spring.application.name`
- 需要配置service-url（是一个map，要配置该分类下的`defaultZone`）

**代码**

*依赖*

```xml
<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
    <spring-cloud.version>Greenwich.RELEASE</spring-cloud.version>
</properties>
<parent>
    <groupId>org.springframework.boot</groupId>
    <version>2.1.6.RELEASE</version>
    <artifactId>spring-boot-parent</artifactId>
</parent>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-dependencies -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>


    </dependencies>
</dependencyManagement>
```

```xml
<parent>
    <artifactId>parent</artifactId>
    <groupId>top.hellocode</groupId>
    <version>1.0-SNAPSHOT</version>
</parent>
<modelVersion>4.0.0</modelVersion>

<artifactId>provider</artifactId>

<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
</dependencies>
```

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    </dependency>
</dependencies>
```

*配置*

```yml
server:
  port: 8761

# eureka配置(一共四部分)
eureka:
  instance:
    hostname: localhost
  client:
    service-url:
      # defaultZone: http://localhost:8761/eureka (默认)
      # eureka服务端地址，将来客户端使用该地址和eureka进行通信
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka
    # 是否将自己的路径注册到eureka上，一般server不需要，provider（client）需要
    register-with-eureka: false
    # 是否需要从eureka上抓取路径，server不需要，consumer（client）需要
    fetch-registry: false
```

```yml
server:
  port: 8001

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka

spring:
  application:
    # 设置当前的应用名称，将来会在eureka中Application显示。将来需要使用该名称来获取路径
    name: provider
```

*java*

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月19日 16:05
 */
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    DiscoveryClient discoveryClient;

    @GetMapping("/goods/{id}")
    public Goods getGoodsById(@PathVariable Long id) {
        List<ServiceInstance> provider = discoveryClient.getInstances("PROVIDER");
        if (provider == null || provider.size() == 0) {
            return null;
        }
        ServiceInstance serviceInstance = provider.get(0);
        String host = serviceInstance.getHost();
        int port = serviceInstance.getPort();

        String url = "http://" + host + ":" + port + "/goods/getOne/" + id;
        Goods goods = restTemplate.getForObject(url, Goods.class);
        return goods;
    }
}
```

#### 1.2. 配置详解

**instance**

```yml
eureka:
  instance:
  	# 主机名
    hostname: localhost	
    # 是否将自己的ip注册到eureka中。默认false，注册的主机名
    prefer-ip-address:	
    # 设置web控制台显示的实例ip
    ip-address:	
    # 修改instance-id显示
    instance-id: 
    # 每一次eureka client向eureka server发送心跳的时间间隔
    lease-renewal-interval-in-seconds: 30  
    # 如果90s内eureka server没有收到eureka client的心跳包，则剔除该服务
    lease-expiration-duration-in-seconds: 90 	
```

**server**

```yml
eureka:
  server:
    # 是否开启自我保护机制，默认true
    enable-self-preservation:
    # 清理间隔（单位毫秒，默认是60*1000）
    evication-interval-timer-in-ms:
```

#### 1.3. 高可用

![img](http://images.hellocode.top/474ff16d790744e59c85cb445fbdecbb.png)

**步骤**

1. 准备两个Eureka Server
2. 分别进行配置，相互注册（defaultZone），定义相同的应用名称（spring.application.name）
3. Eureka Client 分别注册到这两个 Eureka Server中

**代码**

eureka-server1

```yml
server:
  port: 8761

# eureka配置(一共四部分)
eureka:
  instance:
    hostname: eureka-server1
  client:
    service-url:
      defaultZone: http://localhost:8762/eureka
    register-with-eureka: true
    fetch-registry: true
spring:
  application:
    name: eureka-serve-ha
```

eureka-server2

```yml
server:
  port: 8762

# eureka配置(一共四部分)
eureka:
  instance:
    hostname: eureka-server2
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka
    register-with-eureka: true
    fetch-registry: true
spring:
  application:
    name: eureka-serve-ha
```

client

```yml
server:
  port: 8001

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka,http://localhost:8762/eureka
  server:
    enable-self-preservation: false
spring:
  application:
    name: provider
```

### 2、Consul

- Consul是由HashiCorp基于Go语言开发的，支持多数据中心，分布式高可用的服务发布和注册服务软件
- 用于实现分布式系统的服务发现与配置
- 使用起来也较为简单。具有天然可移植性（支持Linux、Windows和Mac OS X）；安装包仅包含一个可执行文件，方便部署
- 官网地址：https://www.consul.io
- 启动：`.\consul agent -dev`
- 控制台默认端口：8500

**快速入门**

![SpringCloud-06-Consul注册中心](http://images.hellocode.top/img)

1. 搭建provider和consumer服务
2. 使用RestTemplate完成远程调用
3. 将provider服务注册到consul中
4. consumer服务通过从Consul中抓取Provider地址完成远程调用

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!--consul客户端-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

- 其他和eureka基本上一致

### 3、Nacos

- Nacos（Dynamic *Na*ming and *Co*nfiguration *S*ervice）是阿里巴巴2018年7月开源的项目
- 它专注于服务发现和配置管理领域，致力于帮助您发现、配置和管理微服务。Nacos支持几乎所有主流类型的“服务”的发现、配置和管理
- 一句话概括就是Nacos = Spring Cloud注册中心 + Spring Cloud配置中心
- 官网：https://nacos.io
- 下载地址：https://github.com/alibaba/nacos/
- 默认端口：8848
- 控制台：http://localhost:8848/nacos
- 默认账号密码：nacos

**快速入门**

```xml
<!--nacos-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>0.2.2.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.1.0</version>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## 三、Ribbon 负载均衡

> Ribbon是Netflix提供的一个基于HTTP和TCP的客户端负载均衡工具

**服务端负载均衡**

![img](http://images.hellocode.top/72b4e43005e04f02aeb46af1911f04b3.png)

- 负载均衡算法在服务端
- 由负载均衡器维护服务地址列表

**客户端负载均衡**

![img](http://images.hellocode.top/0c1c4a846b5341cdbc4e0c884144e297.png)

- 负载均衡算法在客户端
- 客户端维护服务地址列表

**Ribbon主要有两个功能**

1. 简化远程调用
2. 负载均衡

### 1、简化远程调用

Ribbon可以简化RestTemplate的远程调用

1. 在声明restTemplate的Bean的时候，添加一个注解：`@LoadBalanced`
2. 在使用restTemplate发起请求时，需要定义url时，`host:post`可以替换为服务提供方的应用名称

> Ribbon和Eureka是集成的，使用时不需要导包

```java
@Configuration
public class RestTemplateConfig {

    @LoadBalanced
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

```java
@GetMapping("/goods2/{id}")
public Goods getGoodsById2(@PathVariable Long id) {
    String url = "http://PROVIDER/goods/getOne/" + id;
    Goods goods = restTemplate.getForObject(url, Goods.class);
    return goods;
}
```

### 2、负载均衡

> Ribbon默认集成了负载均衡，默认是轮询的策略

- 随机：RandomRule
- 轮询：RoundRobinRule（默认）
- 最小并发：BestAvailableRule
- 过滤：AvailabilityFilteringRule
- 响应时间：WeightedResponseTimeRule
- 轮询重试：RetryRule
- 性能可用性：ZoneAvoidanceRule

**设置负载均衡策略**

*方式一：编码*

1. 定义一个配置类（在客户端/消费者）
2. 类中通过`@Bean`返回一个`IRule`实例（具体策略对象如上）
3. 配置负载均衡策略的作用对象(在对应的服务启动类添加`@RibbonClient`)
   - name：设置服务提供方的应用名称
   - configuration：设置负载均衡Bean

```java
@Configuration
public class MyRule {

    @Bean
    public IRule rule(){
        return new RandomRule();
    }
}

```

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月19日 16:05
 */
@SpringBootApplication
@RibbonClient(name = "PROVIDER",configuration = MyRule.class)
public class ConsummerApp {
    public static void main(String[] args) {
        SpringApplication.run(ConsummerApp.class,args);
    }
}
```

*方式二：配置*

```yml
应用名:
  ribbon:
    NFloadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
```

```yml
spring:
  application:
    name: consummer

PROVIDER:
  ribbon:
    NFloadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
```

> 这里的策略类要写全类名。可以通过按两次shift进行搜索复制

## 四、Feign 声明式服务调用

- Feign是一个声明式的REST客户端，它用了基于接口的注解方式，很方便实现客户端配置
- Feign最初由Netflix公司提供，但不支持SpringMVC注解，后由SpringCloud对其封装，支持了SpringMVC注解，让使用者更易于接受

### 1、快速入门

1. 在消费端引入open-feign依赖

   ```xml
   <!--feign-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-openfeign</artifactId>
   </dependency>
   ```

2. 编写Feign调用接口(添加注解：`@FeignClient`)

   - 注解的value属性为服务提供者的应用名称
   - 编写调用接口，接口的声明规则和提供方接口保持一致

3. 在启动类添加`@EnableFeignClients`注解，开启Feign功能

4. 测试调用

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月19日 16:05
 */
@FeignClient(value = "PROVIDER")
public interface GoodsFeignClient {
    @GetMapping("/goods/getOne/{id}")
    public Goods getGoodsById(@PathVariable("id") Long id);
}
```

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月19日 16:05
 */
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private GoodsFeignClient goodsFeignClient;

    @GetMapping("/goods/{id}")
    public Goods getGoodsById(@PathVariable Long id) {
        return goodsFeignClient.getGoodsById(id);
    }
}
```

### 2、超时设置

- Feign底层依赖于Ribbon实现负载均衡和远程调用
- Ribbon默认1秒超时

超时配置：

```yml
ribbon:
  ConnectTimeout: 1000   # 连接超时时间，毫秒
  ReadTimeout: 1000    # 逻辑处理超时时间，毫秒
```

### 3、日志记录

- Feign只能记录debug级别的日志信息(设置其他的无效果)

  ```yml
  logging:
    level:
      top.hellocode: debug
  ```

- 定义Feign日志级别Bean

  ```java
  @Bean
  public Logger.Level feignLoggerLevel(){
      return Logger.Level.Full;
  }
  ```
  - NONE：不记录
  - BASIC：记录基本的请求行，响应状态码数据
  - HEADERS：记录基本的请求行，响应状态码数据，记录响应头信息
  - FULL：记录完整的请求，响应数据

- 启用该Bean（FeignClient接口）

  `@FeignClient(configuration = XxxConfig.class)`

## 五、Hystrix 熔断器

- Hystix 是Netflix 开源的一个延迟和容错库，用于隔离访问远程服务、第三方库，防止出现级联失败（雪崩）
- 雪崩：一个服务失败，导致整条链路的服务都失败的情形

**主要功能**

- 隔离
  - 线程池隔离（默认）
  - 信号量隔离
- 降级：出异常、超时等情况时（B计划）
- 熔断
- 限流

### 1、降级

>  Hystix降级：当服务发送异常或调用超时，返回默认数据

**服务提供方**

1. 在服务提供方，引入hystrix依赖

   ```xml
   <!--hystrix-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
   </dependency>
   ```

2. 定义降级方法

   1. 方法的返回值需要和原方法一样
   2. 方法的参数需要和原方法一样

   ```java
   // 降级方案
   public Goods getOneFallback(Long id){
       Goods goods = new Goods();
       goods.setName("降级了~~");
       return goods;
   }
   ```

3. 使用`@HystrixCommand`注解配置降级方法

   - fallbackMethod：指定降级后调用的方法名称
   - commandProperties：通过键值对形式对Hystrix的一些配置进行修改

   ```java
   @GetMapping("/getOne/{id}")
   @HystrixCommand(fallbackMethod = "getOneFallback",
                   commandProperties = {
       // 超时时间 默认1s
       @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds",value = "3000")
   }
                  )
   public Goods getOne(@PathVariable Long id){
       try {
           Thread.sleep(2000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
       Goods goods = goodsService.getOne(id);
       goods.setName(goods.getName() + ":" + port);
       return goods;
   }
   ```

4. 在启动类上开启Hystrix功能：`@EnableCircuitBreaker`

**服务消费方**

> Feign组件已经集成了hystrix组件，使用时就不需要再去引入hystrix依赖了

1. 定义feign调用接口实现类(`@Component`)，复写方法，即降级方法
2. 在`@FeignClient`注解中使用fallback属性设置降级处理类
3. 配置开启 `feign.hystrix.enabled = true`

```java
@Component
public class GoodsFeignClientFallBack implements GoodsFeignClient{
    @Override
    public Goods getGoodsById(Long id) {
        Goods goods = new Goods();
        goods.setName("消费方降级~~");
        return goods;
    }
}
```

> 提供方和消费方都进行降级的情况下，最终返回的是提供方降级的结果（提供方已经降级返回，消费方就不需要再进行降级了）

### 2、熔断

- Hystrix 熔断机制，用于监控微服务调用情况，当失败的情况达到预定的阈值（5秒失败20次），会打开断路器，拒绝所有请求，直到服务器恢复正常为止
- 断路器一共有三种状态：打开、关闭、半开
- 当失败达到阈值，断路器会打开，拒绝所有请求。当断路器开启时间达到配置的值（默认5秒），会处于半开状态，向微服务发起请求：若请求达不到预定的阈值，则关闭断路器；若请求还是达到了预定的阈值，则继续打开断路器

**熔断机制默认处于打开状态，可以通过参数修改配置**

- circuitBreaker.sleepWindowInMilliseconds：监控时间
- circuitBreaker.requestVolumeThreshold：失败次数
- circuitBreaker.errorThresholdPercentage：失败率

```java
@GetMapping("/getOne/{id}")
@HystrixCommand(fallbackMethod = "getOneFallback",
                commandProperties = {
    // 监控时间 默认5000ms
    @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "5000"),
    // 失败次数 默认20次
    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "20"),
    // 失败率 默认50%
    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "50")
}
               )
public Goods getOne(@PathVariable Long id){
    if(id == 1){
        // 模拟异常
        int i = 1 / 0;
    }
    Goods goods = goodsService.getOne(id);
    goods.setName(goods.getName() + ":" + port);
    return goods;
}
```

### 3、熔断监控

- Hystrix 提供了 Hystrix-dashboard 功能，用于实时监控微服务运行状态
- 但是Hystrix-dashboard只能监控一个微服务
- Netflix还提供了Turbine，进行聚合监控

**一. 搭建监控模块**

1. 创建监控模块

   创建hystrix-monitor模块，使用Turbine聚合监控多个Hystrix dashboard功能

2. 引入Turbine聚合监控起步依赖

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-turbine</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-actuator</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
       </dependency>
   </dependencies>
   ```

3. 修改application.yml

   ```yaml
   spring:
     application:
       name: hystrix-monitor
   server:
     port: 8769
   turbine:
     combine-host-port: true
     # 配置需要被监控的服务名称列表
     app-config: provider,consummer
     cluster-name-expression: "'default'"
     aggregator:
       cluster-config: default
     # instanceUrlSuffix: /actuator/hystrix.stream
   eureka:
     client:
       service-url: 
         defaultZone: http://localhost:8761/eureka/
   ```

4. 创建启动类

   ```java
   /**
    * @author HelloCode
    * @blog https://www.hellocode.top
    * @date 2022年12月23日 11:57
    */
   @SpringBootApplication
   @EnableEurekaClient
   
   @EnableTurbine  // 开启Turbine，聚合监控功能
   @EnableHystrixDashboard // 开启Hystrix仪表盘监控功能
   public class MonitorApp {
       public static void main(String[] args) {
           SpringApplication.run(MonitorApp.class,args);
       }
   }
   ```

**二、修改被监控模块**

1. 导入依赖

   ```xml
   <!--turbine监控-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
   </dependency>
   ```

2. 配置Bean

   为了方便，将其配置在启动类中（配置完Bean还需要在启动类添加注解：`@EnableHystrixDashboard`）

   ```java
   @Bean
   public ServletRegistrationBean getServlet(){
       HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
       ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
       registrationBean.setLoadOnStartup(1);
       registrationBean.addUrlMappings("/actuator/hystrix.stream");
       registrationBean.setName("HystrixMetricsStreamServlet");
       return registrationBean;
   }
   ```

**访问：**http://localhost:8769/hystrix/ 进入Hystrix Dashboard界面

![image-20221223121318393](http://images.hellocode.top/image-20221223121318393.png)

界面中输入监控的Url地址：http://localhost:8769/turbine.stream（控制台可以查看），监控时间间隔2000ms

![image-20221223121603972](http://images.hellocode.top/image-20221223121603972.png)

## 六、Gateway 网关

### 1、概述

![在这里插入图片描述](http://images.hellocode.top/20200830222634447.png)

- 网关旨在为微服务架构提供一种简单而有效的统一API路由管理方式
- 在微服务架构中，不同的微服务可以有不同的网络地址，各个微服务之间通过互相调用完成用户请求，客户端可能通过调用N个微服务的接口完成一个用户请求
- 网关就是系统的入口，封装了应用程序的内部结构，为客户端提供统一服务，一些与业务本身功能无关的公共逻辑可以在这里实现，诸如认证、鉴权、监控、缓存、负载均衡、流量管控、路由转发等
- 在目前的网关解决方案里，有Nginx + Lua、Netflix Zuul、Spring Cloud Gateway等等

**存在的问题**

1. 客户端多次请求不同的微服务，增加客户端的复杂性
2. 认证复杂，每个服务都要进行认证
3. http请求不同服务次数增加，性能不高


### 2、快速入门

1. 搭建网关模块

2. 引入依赖：starter-gateway

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-gateway</artifactId>
       </dependency>
   </dependencies>
   ```

3. 编写启动类

4. 编写配置文件

   ```yaml
   server:
     port: 80
   spring:
     application:
       name: api-gateway
     
     cloud:
       # 网关配置
       gateway:
         # 路由配置：转发规则
         routes:   # 集合
         # id：唯一标识，默认是UUID
         # uri：转发路径
         # predicates：条件，用于请求网关路径的匹配规则
         - id: provider
           uri: http://localhost:8003/
           predicates:
           - Path=/goods/**
   ```

5. 启动测试

### 3、路由配置

**静态路由**

> 了解即可，很少用

```yaml
spring:
  application:
    name: api-gateway
  
  cloud:
    # 网关配置
    gateway:
      # 路由配置：转发规则
      routes:   # 集合
      # id：唯一标识，默认是UUID
      # uri：转发路径
      # predicates：条件，用于请求网关路径的匹配规则
      # filters：配置局部过滤器
      - id: provider
        uri: http://localhost:8003/
        predicates:
        - Path=/goods/**
      - id: consumer
        uri: http://localhost:9000/
        predicates:
        - Path=/order/**
```

**动态路由**

> 服务的ip和端口都会注册到Eureka中，因此Gateway只需要从Eureka中获取即可

1. 引入eureka-client配置
2. 修改uri属性：`lb://服务名称`

**微服务名称配置**

> 随着服务数量的增多，配置的路由匹配规则也有可能会冲突，比如：`http://localhost/goods/getOne/1`，通过微服务名称的配置，可以将上面链接改为：`http://localhost/服务名/goods/getOne/1`，防止冲突

```yaml
spring:
  application:
    name: api-gateway

  cloud:
  	# 网关配置
    gateway:
      discovery:
        locator:
          enabled: true   # 开启微服务发现功能(请求路径前可以添加微服务名称)
          lower-case-service-id: true   # 将请求路径上的服务名称配置为小写
```

### 4、过滤器

- Gateway支持过滤器功能，对请求或响应进行拦截，完成一些通用操作
- Gateway提供两种过滤器方式：“pre”和“post”
- pre过滤器，在转发之前执行，可以做参数校验、权限校验、流量监控、日志输出、协议转换等
- post过滤器，在响应之前执行，可以做响应内容、响应头的修改，日志的输出，流量监控等
- Gateway还提供了两种类型过滤器
  - GatewayFilter：局部过滤器，针对单个路由
  - GlobalFilter：全局过滤器，针对所有路由

**局部过滤器**

- GatewayFilter局部过滤器，是针对单个路由的过滤器
- 在Spring Cloud Gateway组件中提供了大量内置的局部过滤器，对请求和响应做过滤操作
- 遵循约定大于配置的思想，只需要在配置文件配置局部过滤器名称，并为其指定对应的值，就可以让其生效

```yaml
spring:
  application:
    name: api-gateway

  cloud:
    # 网关配置
    gateway:
      # 路由配置：转发规则
      routes:   # 集合
      # filters: 配置局部过滤器
        - id: provider
          uri: lb://PROVIDER
          predicates:
            - Path=/goods/**
          filters:
            - AddRequestParameter=username,zhangsan		# 键,值
```

| 过滤器工厂                  | 作用                                                         | 参数                                                         |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| AddRequestHeader            | 为原始请求添加Header                                         | Header的名称及值                                             |
| AddRequestParameter         | 为原始请求添加请求参数                                       | 参数名称及值                                                 |
| AddResponseHeader           | 为原始响应添加Header                                         | Header的名称及值                                             |
| DedupeResponseHeader        | 剔除响应头中重复的值                                         | 需要去重的Header名称及去重策略                               |
| Hystrix                     | 为路由引入Hystrix的断路器保护                                | Hystrixcommand的名称                                         |
| FallbackHeaders             | 为fallbackUri的请求头中添加具体的异常信息                    | Header的名称                                                 |
| PrefixPath                  | 为原始请求路径添加前缀                                       | 前缀路径                                                     |
| PreserveHostHeader          | 为请求添加一个preserveHostHeader=true的属性，路由过滤器会检查该属性以决定是否要发送原始的Host | 无                                                           |
| RequestRateLimiter          | 用于对请求限流，限流算法为令牌桶                             | keyResolver、rateLimiter、statusCode、denyEmptyKey、emptyKeyStatus |
| RedirectTo                  | 将原始请求重定向到指定的URL                                  | http状态码及重定向的url                                      |
| RemoveHopByHopHeadersFilter | 为原始请求删除IETF组织规定的一系列Header                     | Header名称                                                   |
| RemoveResponseHeader        | 为原始请求删除某个Header                                     | Header名称                                                   |
| RewritePath                 | 重写原始的请求路径                                           | 原始路径正则表达式以及重写后路径的正则表达式                 |
| RewriteResponseHeader       | 重写原始响应中的某个Header                                   | Header名称，值的正则表达式，重写后的值                       |
| SaveSession                 | 在转发请求之前，强制执行`websession::save`操作               | 无                                                           |
| secureHeaders               | 为原始响应添加一系列起安全作用的响应头                       | 无，支持修改这些安全响应头的值                               |
| SetPath                     | 修改原始的请求路径                                           | 修改后的路径                                                 |
| SetResponseHeader           | 修改原始响应中某个Header的值                                 | Header名称，修改后的值                                       |
| SetStatus                   | 修改原始响应的状态码                                         | HTTP状态码，可以是数字，也可以是字符串                       |
| StripPrefix                 | 用于截断原始请求的路径                                       | 使用数字表示要截断的路径的数量                               |
| Retry                       | 针对不同的响应进行重试                                       | retries、statuses、methods、 series                          |
| RequestSize                 | 设置允许接收最大请求包的大小。如果请求包大小超过设置的值，则返413Payload Too Large | 请求包大小，单位为字节，默认值为5M                           |
| ModifyRequestBody           | 在转发请求之前修改原始请求体内容                             | 修改后的请求体内容                                           |
| ModifyResponseBody          | 修改原始响应体的内容                                         | 修改后的响应体内容                                           |

**全局过滤器**

![img](http://images.hellocode.top/20210706194840951.png)

- GlobalFilter 全局过滤器，不需要在配置文件中配置，系统初始化时加载，并作用在每个路由上
- Spring Cloud Gateway 核心的功能也是通过内置的全局过滤器来完成

*自定义全局过滤器*

1. 定义类实现GlobalFilter和Ordered接口
2. 复写方法
3. 完成逻辑处理

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月23日 19:23
 */
@Component
public class TestFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("自定义全局过滤器执行了~~~");
        return chain.filter(exchange);        // 放行
    }

    /**
     * @Description: 过滤器排序
     * @return int，数值越小，越先执行
     **/
    @Override
    public int getOrder() {
        return 0;
    }
}
```

## 七、config 分布式配置中心

### 1、概述

> Spring Cloud Config解决了在分布式场景下多环境配置文件的管理和维护

![img](http://images.hellocode.top/f7da956abdee44ac9ba23296cd071aee.png)

**好处**

- 集中管理配置文件
- 不同环境不同配置，动态化的配置更新
- 配置信息改变时，不需要重启即可更新配置信息到服务

### 2、快速入门

**config server：**

1. 使用gitee创建远程仓库，上传配置文件

2. 搭建 config server 模块（启动类添加`@EnableConfigServer`）

3. 导入 config-server 依赖

   ```xml
   <!--config-server-->
   <dependency>
   	<groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-config-server</artifactId>
   </dependency>
   ```

4. 编写配置，设置gitee远程仓库地址（默认端口8888）

   ```yaml
   server:
     port: 8888
   spring:
     application:
       name: config-server
     # Spring Cloud Config
     cloud:
       config:
         server:
           # git 的远程仓库地址
           git:
             uri: https://gitee.com/java-navigation/config-server.git
             # 如果仓库私有需要账号密码（公有不需要）
             #username:
             #password:
         label: master   # 分支配置
   ```

5. 测试访问远程配置文件：访问http://localhost:8888/master/config-dev

**config client：**

1. 导入 starter-config 依赖

   ```xml
   <!--config-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-config</artifactId>
   </dependency>
   ```

2. 配置config server地址，读取配置文件名等信息（bootstrap.yml）

   `config-dev.yml`（config为文件名，dev为profile）

   ```yaml
   # 配置config-server地址
   spring:
     cloud:
       config:
         # config-server地址
         uri: http://localhost:8888
         # 文件名称
         name: config
         # profile指定
         profile: dev  # config-dev.yml
         # 分支名
         label: master
   ```

   > `bootstrap.yml`比`application.yml`优先级更高一些，一般用于加载系统配置

3. 获取配置值

   ```java
   /**
    * @author HelloCode
    * @blog https://www.hellocode.top
    * @date 2022年12月19日 16:00
    */
   @RestController
   @RequestMapping("/goods")
   public class GoodsController {
       @Value("${hellocode}")
       private String hellocode;
   }
   
   ```

4. 启动测试

**客户端刷新**

1. 在config 客户端引入actuator 依赖

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
   ```

2. 获取配置信息类上，添加`@RefreshScope`注解，开启刷新功能

3. 添加配置：`management.endpoints.web.exposure.include=refresh`（bootstrap.yml）

   ```yaml
   management:
     endpoints:
       web:
         exposure:
           include: '*'
   ```

4. 使用curl工具发送post请求（cmd命令行）

   `curl -X POST http://localhost:端口/actuator/refresh`

   ![image-20221224122008951](http://images.hellocode.top/image-20221224122008951.png)

### 3、集成Eureka

**config-server配置**

```yml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka  # eureka地址
```

**config-client配置**

```yaml
# 配置config-server地址
spring:
  cloud:
    config:
      # 文件名称
      name: config
      # profile指定
      profile: dev  # config-dev.yml
      # 分支名
      label: master
      discovery:
        # 从注册中心去寻找config-server
        enable: true
        # 应用名称
        service-id: config-server  
```

**测试功能**

## 八、bus 消息总线

> 在config中，当配置文件发生修改，需要执行curl命令进行刷新（才能不重启服务获得最新值），当微服务数量增多时，这种方式就不太合适

![在这里插入图片描述](http://images.hellocode.top/20200709184624248.png)

- Spring Cloud Bus 是用轻量的消息中间件将分布式的节点连接起来，可以用于广播配置文件的更改或者服务的监控管理。关键的思想就是，消息总线可以为微服务做监控，也可以实现应用程序之间相互通信
- Spring Cloud Bus可选的消息中间件包括 RabbitMQ 和 Kafka
- 建议先回顾一下*RabbitMQ*，加深印象

**快速入门**

1. 分别在config-server 和 config-client 中引入bus 依赖：bus-amqp

   ```xml
   <!--bus-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-bus-amqp</artifactId>
   </dependency>
   ```

2. 分别在config-server 和 config-client 中配置RabbitMQ（bootstrap.yml）

   ```yaml
   spring:
     rabbitmq:
       host: 192.168.36.128
       port: 5672
       username: hellocode
       password: 123456
       virtual-host: /
   ```

3. 在config-server中设置暴露监控断点：bus-refresh

   ```yml
   # 暴露bus的刷新断点
   management:
     endpoints:
       web:
         exposure:
           include: 'bus-refresh'
   ```

4. 启动测试

## 九、stream 消息驱动

### 1、概述

- Spring Cloud Stream 是一个构建消息驱动微服务应用的框架
- Stream 解决了开发人员无感知的使用消息中间件的问题，因为Stream对消息中间件的进一步封装，可以做到代码层面对中间件的无感知，甚至于动态的切换中间件，使得微服务开发的高度解耦，服务可以关注更多自己的业务流程
- Spring Cloud Stream目前支持两种消息中间件 RabbitMQ和Kafka

**组件**

![img](http://images.hellocode.top/99bd8dd5b5854684a685438fb859ca05.png)

- Spring Cloud Stream 构建的应用程序与消息中间件之间是通过绑定器Binder相关联的。绑定器对于应用程序而言起到了隔离作用，他使得不同消息中间件的实现细节对应用程序来说是透明的
- binding 是我们通过配置把应用和Spring Cloud Stream 的binder 绑定在一起
- output：发送消息Channel，内置Source接口
- input：接收消息Channel，内置Sink接口

### 2、消息生产者

1. 创建消息生产者模块，引入依赖：starter-stream-rabbit

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
   </dependency>
   ```

2. 编写配置，定义binder 和 bingings

   ```yaml
   server:
     port: 8000
   spring:
     cloud:
       stream:
         # 定义绑定器，绑定到哪个消息中间件上
         binders: 
           # 自定义绑定器名
           hellocode_binder:
             # 绑定器类型
             type: rabbit
             # 指定mq的环境
             environment:
               spring:
                 rabbitmq:
                   host: 192.168.36.128
                   port: 5672
                   username: hellocode
                   password: lh18391794828
                   virtual-host: /
         bindings: 
           # channel名称
           output:
             # 指定使用哪一个binder
             binder: hellocode_binder
             # 消息目的地
             destination: hellocode_exchange
   ```

3. 定义消息发送业务类。添加`@EnableBinding(Source.class)`，注入MessageChannel output，完成消息发送

   ```java
   /**
    * @author HelloCode
    * @blog https://www.hellocode.top
    * @date 2022年12月24日 14:52
    */
   @Component
   @EnableBinding({Source.class})
   public class MessageProducer {
       @Autowired
       private MessageChannel output;
       public void send(){
           String message = "hello stream~~";
           // 发送消息
           output.send(MessageBuilder.withPayload(message).build());
           System.out.println("消息发送成功~~~");
       }
   }
   ```

4. 编写启动类，测试

### 3、消息消费者

1. 创建消息消费者模块，引入依赖：starter-stream-rabbit（和生产者一致）

2. 编写配置，定义binder 和 bingings（只需要将生产者的output改为input）

3. 定义消息接收业务类。添加`@EnableBinding(Sink.class)`，使用`@StreamListener(Sink.INPUT)`完成消息接收

   ```java
   /**
    * @author HelloCode
    * @blog https://www.hellocode.top
    * @date 2022年12月24日 15:07
    */
   @Component
   @EnableBinding(Sink.class)
   public class MessageListener {
       @StreamListener(Sink.INPUT)
       public void receive(Message message){
           System.out.println(message);
           System.out.println(message.getPayload());
       }
   }
   ```

   ![image-20221224151039452](http://images.hellocode.top/image-20221224151039452.png)

4. 编写启动类，测试

## 十、Sleuth+Zipkin 链路追踪

- Spring Cloud Sleuth 是一个工具，它在整个分布式系统中能跟踪一个用户请求的过程，捕获这些跟踪数据，就能构建微服务的整个调用链的视图，这是调试和监控微服务的关键工具
  - 耗时分析
  - 可视化错误
  - 链路优化
- Zipkin 是 Twitter 的一个开源项目，它致力于收集服务的定时数据，以解决微服务架构中的延迟问题，包括数据的收集、存储、查找和展现

**快速入门**

1. 安装启动zipkin

   - 下载：https://repo1.maven.org/maven2/io/zipkin/zipkin-server/
   - 启动：`java -jar zipkin.jar`

   ![image-20221224153128842](http://images.hellocode.top/image-20221224153128842.png)

2. 访问zipkin web界面：http://localhost:9411

3. 在服务提供方和消费方分别引入 sleuth 和 zipkin 依赖

   ```xml
   <!--sleuth-zipkin-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-sleuth</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-zipkin</artifactId>
   </dependency>
   ```

   > zipkin已经依赖了sleuth，所以可以省略sleuth的依赖

4. 分别配置服务提供方和消费方

   ```yaml
   spring:
     application:
       name: provider
     
     zipkin:
       # 设置zipkin的服务端路径
       base-url: http://localhost:9411
     sleuth:
       sampler:
         # 采集率，默认0.1（百分之10）
         probability: 1 
   ```

   ![image-20221224153200196](http://images.hellocode.top/image-20221224153200196.png)

![在这里插入图片描述](http://images.hellocode.top/20210407225219126.png)

![在这里插入图片描述](http://images.hellocode.top/20210407225230437.png)

**SpringCloud总结**

![在这里插入图片描述](http://images.hellocode.top/2021040722524284.jpg)

服务治理 : 注册中心 , 提供服务管理功能(服务注册 服务发现 服务状态监管)

- Eureka
- Consul
- Nacos

负载均衡 : 根据不同的负载均衡算法, 将用户请求分发到不同的服务器

- Ribbon

服务保护 : 熔断器 , 保证系统服务的可用性

- Hystrix

服务调用 : 简化服务调用过

- Feign

服务网关 : 系统服务的唯一入口 , 主要负责 鉴权 , 动态路由 , 跨域请求

- Zuul
- Spring Cloud Gateway

配置管理 : 配置中心 , 可以实现配置的统一管理(git/svn)

- Spring Cloud Config
- Nacos

消息总线 : 服务通信 , 可以实现配置的不重启更新

- Spring Cloud BUS

服务调用链路追踪 : 追踪服务调用过程, 及时发现有问题或者效率低的服务器

- Sleuth+Zipkin
