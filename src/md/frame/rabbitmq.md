---
title: "RabbitMQ"
order: 6
category:
  - 框架 | 中间件
---

# RabbitMQ

## 一、基本概念

**MQ概述**

- MQ全称 *M*essage *Q*ueue（消息队列），是在消息的传输过程中保存消息的容器。多用于分布式系统之间进行通信
- 分布式系统通信有两种方式：直接远程调用 和 借助第三方中间件 完成间接通信
- 发送方称为生产者，接收方称为消费者

*优势*

- 应用解耦
  ![img](http://images.hellocode.top/9545b9dc37974c71ab2ac9b39c079518.png)

  系统的耦合性越高，容错性就越低，可维护性就越低

- 异步提速

  ![img](http://images.hellocode.top/61ba95a12af14cb48f1b60291987f3d1.png)
  提升用户体验和系统吞吐量（单位时间内处理请求的数目）

- 削峰填谷

  ![img](http://images.hellocode.top/1ce007439c8a405b8e46f8ae1da312f5.png)
  使用了MQ之后，假设服务器消费消息的速度为1000，这样一来，高峰期产生的数据势必会被积压在MQ中，高峰就被“削”掉了，但是因为消息积压，在高峰期过后的一段时间内，消费消息的速度还是会维持在1000，直到消费完积压掉的消息，这就叫“填谷”

*劣势*

- 系统可用性降低
  
  系统引入的外部依赖越多，系统稳定性越差。一旦MQ宕机，就会对业务造成影响。就需要保证MQ的高可用
  
- 系统复杂度提高
  
  MQ的加入大大增加了系统的复杂度，以前系统间是同步的远程调用，现在通过MQ进行异步调用。需要考虑消息是否被重复消费，如何处理丢失的消息，如何保证消息的顺序性
  
- 一致性问题
  
  A系统处理完业务，通过MQ给B、C、D三个系统发消息数据，如果B系统、C系统处理成功，D系统处理失败。如何保证消息数据处理的一致性

**使用MQ需要满足的条件**

1. 生产者不需要从消费者处获得反馈。引入消息队列之前的直接调用，其接口的返回值应该为空，这才让明明下层的动作还没做，上层却当成动作做完了继续往后走，即所谓异步成为了可能
2. 容许短暂的不一致性
3. 确实是用了有效果。即解耦、提速、削峰这些方面的收益，超过加入MQ，管理MQ这些成本

**常见的MQ产品**

目前业界有很多的MQ产品，例如 RabbitMQ、RocketMQ、ActiveMQ、Kafka、ZeroMQ、MetaMq等，也有直接使用Redis充当消息队列的案例，而这些消息队列产品，各有侧重，在实际选型时，需要结合自身需求及MQ产品特征，综合考虑

![img](http://images.hellocode.top/2140587-20201016115946384-1900840176.png)

## 二、快速入门

### 1、概述

**AMQP**，即*Advanced Message Queuing Protocol*（高级消息队列协议），是一个网络协议，是应用层协议的一个开放标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同开发语言等条件的限制。2006年，AMQP规范发布。*类别HTTP*

![img](http://images.hellocode.top/u=1059749409,303090146&fm=253&fmt=auto&app=138&f=PNG)

2007年，Rabbit技术公司基于AMQP标准开发的RabbitMQ1.0发布。RabbitMQ采用Erlang语言开发。Erlang语言由Ericson设计，专门为开发高并发和分布式系统的一种语言，在电信领域使用广泛

RabbitMQ基础架构如下图：

![img](http://images.hellocode.top/90ae75ef1d82478ca14539ddf960f210.png)

**RabbitMQ中的相关概念**

- Broker：接收和分发消息的应用，RabbitMQ Server就是 Message Broker

- Virtual host：出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个vhost，每个用户在自己的 vhost 创建 exchange／queue 等

- Connection：publisher／consumer 和 broker 之间的 TCP 连接

- Channel：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的 channel 进行通讯，AMQP method 包含了channel id 帮助客户端和message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销

- Exchange：message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到queue 中去。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout (multicast)

- Queue：消息最终被送到这里等待 consumer 取走

- Binding：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key。Binding 信息被保存到 exchange 中的查询表中，用于 message 的分发依据

**RabbitMQ提供了6种工作模式：** 简单模式、work queues、Publish/Subscribe发布与订阅模式、Routing路由模式、Topics主题模式、RPC远程调用模式（远程调用，不太算MQ，暂不介绍）

官网对应模式介绍：https://www.rabbitmq.com/getstarted.html

![在这里插入图片描述](http://images.hellocode.top/20200906215140115.png)

**JMS**

- JMS即Java消息服务（JavaMessage Service）应用程序接口，是一个Java平台中关于面向消息中间件的API
- JMS是JavaEE规范中的一种，类比JDBC
- 很多的消息中间件都实现了JMS规范，例如：ActiveMQ。RabbitMQ官方没有提供JMS的实现包，但是开源社区有

### 2、安装与配置

- RabbitMQ官方地址：http://www.rabbitmq.com

**步骤**

1. *安装依赖环境（在线安装依赖环境）*

```shell
yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz
```

2. *安装Erlang*
   
上传
   
   erlang-18.3-1.el7.centos.x86_64.rpm
   
   socat-1.7.3.2-5.el7.lux.x86_64.rpm
   
   rabbitmq-server-3.6.5-1.noarch.rpm

```sh
# 安装
rpm -ivh erlang-18.3-1.el7.centos.x86_64.rpm
```

3. *安装RabbitMQ*（默认安装路径`/usr/share/doc/rabbitmq-server-3.6.5/`）

```sh
# 安装
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm

# 安装
rpm -ivh rabbitmq-server-3.6.5-1.noarch.rpm
```

4. *开启管理界面及配置*

```sh
# 开启管理界面
rabbitmq-plugins enable rabbitmq_management
 
# 设置用户名密码
rabbitmqctl add_user 用户名 密码
# 设置权限
rabbitmqctl  set_user_tags  用户名 administrator
```

*角色说明*：

-  超级管理员(administrator)

   可登陆管理控制台，可查看所有的信息，并且可以对用户，策略(policy)进行操作。

- 监控者(monitoring)

  可登陆管理控制台，同时可以查看rabbitmq节点的相关信息(进程数，内存使用情况，磁盘使用情况等)

- 策略制定者(policymaker)

  可登陆管理控制台, 同时可以对policy进行管理。但无法查看节点的相关信息(上图红框标识的部分)。

- 普通管理者(management)

  仅可登陆管理控制台，无法看到节点信息，也无法对策略进行管理。

- 其他

  无法登陆管理控制台，通常就是普通的生产者和消费者。


5. *启动*

```sh
service rabbitmq-server start # 启动服务
service rabbitmq-server stop # 停止服务
service rabbitmq-server restart # 重启服务
```

- 设置配置文件

```shell
cd /usr/share/doc/rabbitmq-server-3.6.5/
cp rabbitmq.config.example /etc/rabbitmq/rabbitmq.config
```

6. *配置虚拟主机及用户*

   - RabbitMQ在安装好后，可以访问`http://ip地址:15672` ；使用自定义的用户名密码进行登录
   - 虚拟机及用户的添加通过图形化界面操作即可

### 3、入门程序

需求：使用简单模式完成消息传递

![image-20220908144201038](http://images.hellocode.top/image-20220908144201038.png)

**步骤**

1. 创建工程（生产者producer、消费者consumer）

2. 分别添加依赖

   ```xml
   <dependencies>
       <dependency>
           <groupId>com.rabbitmq</groupId>
           <artifactId>amqp-client</artifactId>
           <version>5.6.0</version>
       </dependency>
   </dependencies>
   
   
   <build>
       <plugins>
           <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-compiler-plugin</artifactId>
               <version>3.8.0</version>
               <configuration>
                   <source>1.8</source>
                   <target>1.8</target>
               </configuration>
           </plugin>
       </plugins>
   </build>
   ```

3. 编写生产者发送消息
   1. 创建连接工厂
   2. 设置参数（主机、端口、虚拟机、用户名以及密码等等）
   3. 创建连接Connection
   4. 创建channel
   5. 创建队列Queue
      - queue：队列名称（无则创建，有就不会创建）
      - durable：是否持久化，当mq重启之后，还在
      - exclusive：
        是否独占，只能由一个消费者监听这个队列
        当Connection关闭时，是否删除队列
      - autoDelete：是否自动删除。当没有Consumer时，自动删除掉
      - arguments：参数信息
   6. 发送消息（`basicPublish()`）
      - exchange：交换机名称。简单模式下交换机会使用默认的空字符串""
      - routingKey：路由名称，使用默认交换机时，路由名称要和队列名称一样
      - props：配置信息
      - body：要发送的消息数据
   7. 释放资源（channel和connection）
   
   ```java
   /**
    * @author HelloCode
    * @site https://www.hellocode.top
    * @date 2022年09月08日 15:10
    */
   public class Hello_Producer {
       public static void main(String[] args) throws IOException, TimeoutException {
           // 创建连接工厂
           ConnectionFactory factory = new ConnectionFactory();
           // 设置参数
           factory.setHost("192.168.23.129");
           factory.setPort(5672);
           factory.setVirtualHost("/");
           factory.setUsername("hellocode");
           factory.setPassword("hellocode");
           // 创建连接Connection
           Connection connection = factory.newConnection();
           // 创建channel
           Channel channel = connection.createChannel();
           // 创建消息队列queue
           channel.queueDeclare("hello_world", true, false, false, null);
           // 发送消息
           String body = "hello rabbitmq~~~";
           channel.basicPublish("","hello_world",null,body.getBytes(StandardCharsets.UTF_8));
           // 释放资源
           channel.close();
           connection.close();
       }
   }
   ```
   
4. 编写消费者接收消息`channel.`

   - queue：队列名称
   - autoAck：是否自动确认
   - callback：回调对象

   ```java
   /**
    * @author HelloCode
    * @site https://www.hellocode.top
    * @date 2022年09月08日 17:39
    */
   public class Hello_Consumer {
       public static void main(String[] args) throws IOException, TimeoutException {
           // 创建连接工厂
           ConnectionFactory factory = new ConnectionFactory();
           // 设置参数
           factory.setHost("192.168.23.129");
           factory.setPort(5672);
           factory.setVirtualHost("/");
           factory.setUsername("hellocode");
           factory.setPassword("hellocode");
           // 创建连接Connection
           Connection connection = factory.newConnection();
           // 创建channel
           Channel channel = connection.createChannel();
           
           
           // 接收消息
           Consumer consumer = new DefaultConsumer(channel){
               // 回调方法，收到消息后自动执行该方法
               /*
               * consumerTag:标识
               * envelope:获取一些信息，交换机、路由key。。。。
               * properties：配置信息
               * body：数据
               * */
               @Override
               public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                   System.out.println("consumerTag"+consumerTag);
                   System.out.println("getExchange"+envelope.getExchange());
                   System.out.println("getRoutingKey"+envelope.getRoutingKey());
                   System.out.println("properties"+properties);
                   System.out.println("body"+new String(body));
               }
           };
           // 获取消息
           channel.basicConsume("hello_world",true,consumer);
           // 消费者不需要关闭资源，需要一直保持监听状态
       }
   }
   ```
   
5. 测试

## 三、工作模式

### 1、Work queues工作队列模式

![img](http://images.hellocode.top/python-two.png)

- Work Queues：与入门程序的简单模式相比，多了一个或一些消费端，多个消费端共同消费同一个队列中的消息（竞争关系）
- 应用场景：对于任务过重或任务较多情况使用工作队列可以提高任务处理的速度，例如：短信服务部署多个，只需要有一个节点成功发送即可
- Work Queues与入门程序的简单模式的代码几乎是一样的。可以完全复制，并多复制一个消费者进行多个消费者同时对消费消息的测试

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 15:10
 */
public class Work_queues {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 创建连接Connection
        Connection connection = factory.newConnection();
        // 创建channel
        Channel channel = connection.createChannel();
        // 创建消息队列queue
        channel.queueDeclare("work_queues", true, false, false, null);
        // 发送消息
        for(int i = 1; i <= 10; i++){
            String body = i + "hello rabbitmq~~~";
            channel.basicPublish("","work_queues",null,body.getBytes(StandardCharsets.UTF_8));
        }
        // 释放资源
        channel.close();
        connection.close();
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 17:39
 */
public class Work_queues1 {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 创建连接Connection
        Connection connection = factory.newConnection();
        // 创建channel
        Channel channel = connection.createChannel();
        // 接收消息
        Consumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("body"+new String(body));
            }
        };
        channel.basicConsume("work_queues",true,consumer);
        // 消费者不需要关闭资源，需要一直保持监听状态

    }
}
```

> 两个消费者，10条消息。消费者1消费1 3 5 7 9，消费者2消费2 4 6 8 10

### 2、Pub/Sub订阅模式

![img](http://images.hellocode.top/python-three-overall.png)

在订阅模式中，多了一个Exchange角色，而且过程略有变化

- P：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发送给X（交换机）

- C：消费者，消息的接收者，会一直等待消息到来

- Queue：消息队列，接收消息、缓存消息

- Exchange：交换机（X）。一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型
  
  Exchange有常见以下3种类型
  
  - Fanout：广播，将消息交给所有绑定到交换机的队列
  - Direct：定向，把消息交给符合指定routing key的队列
  - Topic：通配符，把消息交给符合routing pattern（路由模式）的队列

> *Exchange*（交换机）只负责转发消息，不具备存储消息的能力，因此如果没有任何队列与Exchange绑定，或者没有符合路由规则的队列，那么消息会丢失

**生产者**

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 15:10
 */
public class PubSub {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 1.创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 2.设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 3.创建连接Connection
        Connection connection = factory.newConnection();
        // 4.创建channel
        Channel channel = connection.createChannel();

        // 5. 创建交换机
            // exchange：交换机名称
            // type：交换机类型（通过枚举类型调用选择BuiltinExchangeType）
                // DIRECT("direct")：定向
                // FANOUT("fanout")：扇形（广播）。发送消息到每一个与之绑定的队列
                // TOPIC("topic")：通配符的方式
                // HEADERS("headers")：参数匹配（用的少）
            // durable：是否持久化
            // autoDelete：是否自动删除
            // internal：内部使用（一般设为false）
            // arguments：参数
        String exchangeName = "test_fanout";
        channel.exchangeDeclare(exchangeName, BuiltinExchangeType.FANOUT,true,false,null);

        // 6. 创建队列
        String queue1Name = "test_fanout_queue1";
        String queue2Name = "test_fanout_queue2";
        channel.queueDeclare(queue1Name,true,false,false,null);
        channel.queueDeclare(queue2Name,true,false,false,null);

        // 7. 绑定队列和交换机
            // queue：队列名称
            // exchange：交换机名称
            // routingKey：路由键，绑定规则
                // 如果交换机的类型为fanout，routingKey设置为空字符串""
        channel.queueBind(queue1Name,exchangeName,"");
        channel.queueBind(queue2Name,exchangeName,"");

        // 8. 发送消息
        String body = "日志信息。。。。。。";
        channel.basicPublish(exchangeName,"",null,body.getBytes());

        // 9. 释放资源
        channel.close();
        connection.close();
    }
}
```

**消费者**

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 17:39
 */
public class PubSub1 {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 创建连接Connection
        Connection connection = factory.newConnection();
        // 创建channel
        Channel channel = connection.createChannel();
        // 接收消息
        Consumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("控制台："+new String(body));
            }
        };
        String queue1Name = "test_fanout_queue1";
        String queue2Name = "test_fanout_queue2";

        channel.basicConsume(queue1Name,true,consumer);
        // 消费者不需要关闭资源，需要一直保持监听状态

    }
}
```

### 3、Routing路由模式

- 队列与交换机的绑定，不能是任意绑定了，而是要指定一个RoutingKey（路由key）
- 消息的发送方在向Exchange发送消息时，也必须指定消息的RoutingKey
- Exchange不再把消息交给每一个绑定的队列，而是根据消息的Routing Key进行判断，只有队列的RoutingKey与消息的Routing Key完全一致，才会接收到消息

![img](http://images.hellocode.top/python-four.png)

**图解**

- P：生产者，向Exchange发送消息，发送消息时，会指定一个routing key
- X：Exchange（交换机），接收生产者的消息，然后把消息递交给与routing key完全匹配的队列
- C1：消费者，其所在队列指定了需要routing key为error的消息
- C2：消费者，其所在队列指定了需要routing key为info、error、warning的消息

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 15:10
 */
public class RoutingKey {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 1.创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 2.设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 3.创建连接Connection
        Connection connection = factory.newConnection();
        // 4.创建channel
        Channel channel = connection.createChannel();

        // 5. 创建交换机
        String exchangeName = "test_direct";
        channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT,true,false,null);

        // 6. 创建队列
        String queue1Name = "test_direct_queue1";
        String queue2Name = "test_direct_queue2";
        channel.queueDeclare(queue1Name,true,false,false,null);
        channel.queueDeclare(queue2Name,true,false,false,null);

        // 7. 绑定队列和交换机
        channel.queueBind(queue1Name,exchangeName,"error");
        channel.queueBind(queue2Name,exchangeName,"info");
        channel.queueBind(queue2Name,exchangeName,"error");
        channel.queueBind(queue2Name,exchangeName,"warning");

        // 8. 发送消息
        String body = "日志信息。。。。。。";
        channel.basicPublish(exchangeName,"info",null,body.getBytes());

        // 9. 释放资源
        channel.close();
        connection.close();
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 17:39
 */
public class RoutingKey1 {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 创建连接Connection
        Connection connection = factory.newConnection();
        // 创建channel
        Channel channel = connection.createChannel();
        // 接收消息
        Consumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("数据库："+new String(body));
            }
        };
        String queue1Name = "test_direct_queue1";
        String queue2Name = "test_direct_queue2";

        channel.basicConsume(queue1Name,true,consumer);
        // 消费者不需要关闭资源，需要一直保持监听状态

    }
}
```

> **Routing** 模式要求队列在绑定交换机时要指定**routing key**，消息会转发到符合routing key的队列

### 4、Topics通配符模式

![img](http://images.hellocode.top/python-five.png)

- 交换机类型：topic

- 通配符：`*`代表一个单词，`#`代表0个或多个（.分隔，#可以代表任意多个.分隔的单词）
  
  注意层级关系，*一层，#任意多层

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 15:10
 */
public class Topic {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 1.创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 2.设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 3.创建连接Connection
        Connection connection = factory.newConnection();
        // 4.创建channel
        Channel channel = connection.createChannel();

        // 5. 创建交换机
        String exchangeName = "test_topic";
        channel.exchangeDeclare(exchangeName, BuiltinExchangeType.TOPIC,true,false,null);

        // 6. 创建队列
        String queue1Name = "test_topic_queue1";
        String queue2Name = "test_topic_queue2";
        channel.queueDeclare(queue1Name,true,false,false,null);
        channel.queueDeclare(queue2Name,true,false,false,null);

        // 7. 绑定队列和交换机
        channel.queueBind(queue1Name,exchangeName,"#.error");
        channel.queueBind(queue1Name,exchangeName,"order.*");
        channel.queueBind(queue2Name,exchangeName,"*.*");

        // 8. 发送消息
        String body = "日志信息。。。。。。";
        channel.basicPublish(exchangeName,"goods.error",null,body.getBytes());

        // 9. 释放资源
        channel.close();
        connection.close();
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月08日 17:39
 */
public class Topic1 {
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置参数
        factory.setHost("192.168.23.129");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("hellocode");
        factory.setPassword("hellocode");
        // 创建连接Connection
        Connection connection = factory.newConnection();
        // 创建channel
        Channel channel = connection.createChannel();
        // 接收消息
        Consumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("数据库："+new String(body));
            }
        };
        String queue1Name = "test_topic_queue1";
        String queue2Name = "test_topic_queue2";

        channel.basicConsume(queue1Name,true,consumer);
        // 消费者不需要关闭资源，需要一直保持监听状态

    }
}
```

> Topic主题模式可以实现Pub/Sub发布与订阅模式和Routing路由模式的功能，只是Topic在配置routing key的时候可以使用通配符，显得更加灵活

### 5、总结

1. 简单模式 HelloWorld
   
   一个生产者、一个消费者，不需要设置交换机（使用默认的交换机）
   
2. 工作队列模式 Work Queue

   一个生产者、多个消费者（竞争关系），不需要设置交换机（使用默认的交换机）

3. 发布订阅模式 Publish/Subscribe

   需要设置类型为fanout的交换机，并且交换机和队列进行绑定，当发送消息到交换机后，交换机会将消息发送到绑定的队列

4. 路由模式 Routing

   需要设置类型为 direct的交换机，交换机和队列进行绑定，并且指定routing key，当发送消息到交换机后，交换机会根据routing key将消息发送到对应的队列

5. 通配符模式 Topic

   需要设置类型为 topic 的交换机，交换机和队列进行绑定，并且指定通配符方式的 routing key，当发送消息到交换机后，交换机会根据routing key将消息发送到对应的队列

## 四、Spring整合

### 1、Spring

**生产者**

1. 创建生产者工程
2. 添加依赖
3. 配置整合
4. 编写代码发送消息

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit</artifactId>
        <version>2.1.8.RELEASE</version>
    </dependency>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>

    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.0</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```properties
rabbitmq.host=192.168.23.129
rabbitmq.port=5672
rabbitmq.username=hellocode
rabbitmq.password=hellocode
rabbitmq.virtual-host=/
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">
    <!--加载配置文件-->
    <context:property-placeholder location="classpath:properties/rabbitmq.properties"/>

    <!-- 定义rabbitmq connectionFactory -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}"/>
    <!--定义管理交换机、队列-->
    <rabbit:admin connection-factory="connectionFactory"/>

    <!--定义持久化队列，不存在则自动创建；不绑定到交换机则绑定到默认交换机
    默认交换机类型为direct，名字为：""，路由键为队列的名称
		id：bean的名称
		name：queue的名称
		auto—declare：不存在是否自动创建
		auto-delete：自动删除。最后一个消费者和该队列断开连接后，自动删除
		durable：是否持久化
		exclusive：是否独占
    -->
    <rabbit:queue id="spring_queue" name="spring_queue" auto-declare="true"/>

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~广播；所有队列都能收到消息~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!--定义广播交换机中的持久化队列，不存在则自动创建-->
    <rabbit:queue id="spring_fanout_queue_1" name="spring_fanout_queue_1" auto-declare="true"/>

    <!--定义广播交换机中的持久化队列，不存在则自动创建-->
    <rabbit:queue id="spring_fanout_queue_2" name="spring_fanout_queue_2" auto-declare="true"/>

    <!--定义广播类型交换机；并绑定上述两个队列-->
    <rabbit:fanout-exchange id="spring_fanout_exchange" name="spring_fanout_exchange" auto-declare="true">
        <rabbit:bindings>
            <rabbit:binding queue="spring_fanout_queue_1"/>
            <rabbit:binding queue="spring_fanout_queue_2"/>
        </rabbit:bindings>
    </rabbit:fanout-exchange>

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~通配符；*匹配一个单词，#匹配多个单词 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!--定义广播交换机中的持久化队列，不存在则自动创建-->
    <rabbit:queue id="spring_topic_queue_star" name="spring_topic_queue_star" auto-declare="true"/>
    <!--定义广播交换机中的持久化队列，不存在则自动创建-->
    <rabbit:queue id="spring_topic_queue_well" name="spring_topic_queue_well" auto-declare="true"/>
    <!--定义广播交换机中的持久化队列，不存在则自动创建-->
    <rabbit:queue id="spring_topic_queue_well2" name="spring_topic_queue_well2" auto-declare="true"/>

    <rabbit:topic-exchange id="spring_topic_exchange" name="spring_topic_exchange" auto-declare="true">
        <rabbit:bindings>
            <rabbit:binding pattern="heima.*" queue="spring_topic_queue_star"/>
            <rabbit:binding pattern="heima.#" queue="spring_topic_queue_well"/>
            <rabbit:binding pattern="itcast.#" queue="spring_topic_queue_well2"/>
        </rabbit:bindings>
    </rabbit:topic-exchange>

    <!--定义rabbitTemplate对象操作可以在代码中方便发送消息-->
    <rabbit:template id="rabbitTemplate" connection-factory="connectionFactory"/>
</beans>
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月09日 17:47
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-producer.xml")
public class ProducerTest {
    // 1. 注入 RabbitTemplates
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testHelloWorld(){
        // 2. 发送消息
        rabbitTemplate.convertAndSend("spring_queue","hello world spring...");
    }

    // 发送fanout消息
    @Test
    public void testFanout(){
        rabbitTemplate.convertAndSend("spring_fanout_exchange","","spring fanout...");
    }

    // 发送topic消息
    @Test
    public void testTopic(){
        rabbitTemplate.convertAndSend("spring_topic_exchange","heima.test","spring topic...");
    }
}
```

**消费者**

1. 创建生产者工程
2. 添加依赖
3. 配置整合
4. 编写消息监听器

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">
    <!--加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>

    <!-- 定义rabbitmq connectionFactory -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}"/>

    <bean id="springQueueListener" class="top.hellocode.rabbitmq.listener.SpringQueueListener"/>
    <bean id="fanoutListener1" class="top.hellocode.rabbitmq.listener.FanoutListener1"/>
    <bean id="fanoutListener2" class="top.hellocode.rabbitmq.listener.FanoutListener2"/>
    <bean id="topicListenerStar" class="top.hellocode.rabbitmq.listener.TopicListenerStar"/>
    <bean id="topicListenerWell" class="top.hellocode.rabbitmq.listener.TopicListenerWell"/>
    <bean id="topicListenerWell2" class="top.hellocode.rabbitmq.listener.TopicListenerWell2"/>

    <rabbit:listener-container connection-factory="connectionFactory" auto-declare="true">
        <rabbit:listener ref="springQueueListener" queue-names="spring_queue"/>
        <rabbit:listener ref="fanoutListener1" queue-names="spring_fanout_queue_1"/>
        <rabbit:listener ref="fanoutListener2" queue-names="spring_fanout_queue_2"/>
        <rabbit:listener ref="topicListenerStar" queue-names="spring_topic_queue_star"/>
        <rabbit:listener ref="topicListenerWell" queue-names="spring_topic_queue_well"/>
        <rabbit:listener ref="topicListenerWell2" queue-names="spring_topic_queue_well2"/>
    </rabbit:listener-container>
</beans>
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月09日 17:57
 */
public class SpringQueueListener implements MessageListener {
    @Override
    public void onMessage(Message message) {
        System.out.println(new String(message.getBody()));
    }
}
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月09日 17:59
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-consumer.xml")
public class ConsumerTest {
    @Test
    public void test1(){
        // 只需要执行测试类，读取配置文件即可，这里使用循环让监听器处于工作状态
        while (true){

        }
    }
}
```

### 2、SpringBoot

**生产者**

1. 创建生产者SpringBoot工程

2. 引入依赖坐标

   ```xml
   <dependency>
   	<groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-amqp</artifactId>
   </dependency>
   ```

3. 编写yml配置，基本信息配置
4. 定义交换机，队列以及绑定关系的配置类
5. 注入RabbitTemplate，调用方法，完成消息发送

```yaml
spring:
  rabbitmq:
    host: 192.168.23.129
    port: 5672
    username: hellocode
    password: hellocode
    virtual-host: /
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月09日 18:38
 */
@Configuration
public class RabbitMQConfig {
    public static final String EXCHANGE_NAME = "boot_topic_exchange";
    public static final String QUEUE_NAME = "boot_queue";

    // 交换机
    @Bean("bootExchange")
    public Exchange bootExchange(){
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(true).build();
    }

    // Queue队列
    @Bean("bootQueue")
    public Queue bootQueue(){
        return QueueBuilder.durable(QUEUE_NAME).build();
    }

    // 队列和交换机绑定关系  Binding
        // 1. 知道哪个队列
        // 2. 知道哪个交换机
        // 3. routing key
    @Bean
    public Binding bindQueueExchange(@Qualifier("bootQueue") Queue queue, @Qualifier("bootExchange") Exchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with("boot.#").noargs();
    }
}
```

```java
@SpringBootTest
class ProducerSpringbootApplicationTests {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    void contextLoads() {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME,"boot.test","boot mq hello");
    }
}
```

**消费者**

1. 创建SpringBoot工程
2. 引入start依赖坐标
3. 编写yml配置，基本信息配置
4. 定义监听类，使用`@RabbitListener`注解完成队列监听

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月09日 19:04
 */
@Component
public class RabbitMQListener {
    @RabbitListener(queues = "boot_queue")
    public void ListenerQueue(Message message){
        System.out.println(new String(message.getBody()));
    }
}
```

> 定义完监听类，启动启动类即可

- 基本信息在yml中配置，队列交换机以及绑定关系在配置类中使用Bean的方式配置
- 生产端直接注入RabbitTemplate完成消息发送
- 消费端直接使用`@RabbitListener`完成消息接收

## 五、高级特性

### 1、消息可靠投递

在使用RabbitMQ的时候，作为消息发送方希望杜绝任何消息丢失或者投递失败的场景。RabbitMQ为我们提供了两种方式来控制消息的投递可靠性模式

- confirm 确认模式
- return 退回模式

rabbitmq整个消息投递的路径为：producer--->rabbitmq broker--->exchange--->queue--->consumer

- 消息从producer到exchange会返回一个confirmCallback，不论成功与否都会执行，返回boolean
- 消息从exchange-->queue投递失败则会返回一个returnCallback

我们将利用这两个callback控制消息的可靠性投递

**confirm确认模式**

1. 确认模式开启：在spring配置文件ConnectionFactory中开启   publisher-confirms="true"
2. 在rabbitTemplate中定义ConfirmCallBack回调函数
3. 发送消息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">
    <!--加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>

    <!-- 定义rabbitmq connectionFactory -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}"
                                publisher-confirms="true"
    />
    <!--定义管理交换机、队列-->
    <rabbit:admin connection-factory="connectionFactory"/>

    <!--定义rabbitTemplate对象操作可以在代码中方便发送消息-->
    <rabbit:template id="rabbitTemplate" connection-factory="connectionFactory"/>

    <!--消息可靠性投递（生产端）-->
    <rabbit:queue id="test_queue_confirm" name="test_queue_confirm"/>
    <rabbit:direct-exchange name="test_exchange_confirm">
        <rabbit:bindings>
            <rabbit:binding queue="test_queue_confirm" key="confirm"/>
        </rabbit:bindings>
    </rabbit:direct-exchange>
</beans>
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月12日 17:19
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-producer.xml")
public class ProducerTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    /*
    * 确认模式：
    *   步骤：
    *       1. 确认模式开启：在spring配置文件ConnectionFactory中开启   publisher-confirms="true"
    *       2、 在rabbitTemplate中定义ConfirmCallBack回调函数
    *       3、 发送消息
    * */
    @Test
    public void testConfirm(){
        // 2. 定义回调
        rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
            /*
            * correlationData：相关配置信息
            * ack：exchange交换机，是否成功收到了消息。true成功，false失败
            * cause：失败原因
            * */
            @Override
            public void confirm(CorrelationData correlationData, boolean ack, String cause) {
                if(ack){
                    System.out.println("confirm执行了.....");
                }else{
                    System.out.println("exchange接收消息失败：" + cause);
                }
            }
        });
        // 3.发送消息
        rabbitTemplate.convertAndSend("test_exchange_confirm","confirm","message.....");
    }
}
```

**return退回模式**

1. 开启回退模式：`publisher-returns="true"`
2. 设置ReturnCallBack
3. 设置Exchange处理消息的模式
   - 如果消息没有路由到Queue，则丢弃消息（默认）
   - 如果消息没有路由到Queue，返回给消息发送方ReturnCallBack

```java
@Test
public void testReturn(){
    // 设置交换机处理失败消息的模式
    rabbitTemplate.setMandatory(true);      //设置失败后将消息返回给发送方

    // 2. 定义回调
    rabbitTemplate.setReturnCallback(new RabbitTemplate.ReturnCallback() {
        /**
         * @param message: 消息对象
         * @param replyCode: 错误码
         * @param replyText: 错误信息
         * @param exchange: 交换机
         * @param routingKey: 路由键
         */
        @Override
        public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
            System.out.println(message);    //(Body:'message.....' MessageProperties [headers={}, contentType=text/plain, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, deliveryTag=0])
            System.out.println(replyCode);  //312
            System.out.println(replyText);  //NO_ROUTE
            System.out.println(exchange);   //test_exchange_confirm
            System.out.println(routingKey); //confirm111
            
            // 处理
        }
    });
    // 3.发送消息
    rabbitTemplate.convertAndSend("test_exchange_confirm","confirm111","message.....");
}
```

- return退回模式只有交换机接收消息失败才有机会执行回调函数

- 默认丢弃消息，这将不会执行回调函数，只有使用`rabbitTemplate.setMandatory(true);`设置交换机处理失败消息的模式为退回消息发送方，才会执行回调函数



> 在RabbitMQ中也提供了事务机制，但是性能较差，只需要了解即可

使用channel下列方法，完成事务控制：

- `txSelect()`：用于将当前channel设置成transaction模式
- `txCommit()`：用于提交事务
- `txRollback()`：用于回滚事务

### 2、Consumer Ack

> ack指Acknowledge，确认。表示消费端收到消息后的确认方式

有三种确认方式：

- 自动确认：`acknowledge="none"`
- 手动确认：`acknowledge="manual"`
- 根据异常情况确认：`acknowledge="auto"`（这种方式使用麻烦，不推荐）

其中自动确认是指，当消息一旦被Consumer接收到，则自动确认收到，并作出相应message从RabbitMQ的消息缓存中移除。但是在实际业务处理中，很可能消息接收到，业务处理出现异常，那么该消息就会丢失。如果设置了手动确认方式，则需要在业务处理成功后，调用`channel.basicAck()`，手动签收，如果出现异常，则调用`channel.basicNack()`或`basicReject()`方法，让其自动重新发送消息

**Consumer ACK机制**

1. 设置手动签收。`rabbit:listener-container`中的属性：`acknowledge="manual"`
2. 让监听器实现ChannelAwareMessageListener接口
3. 如果消息成功处理，则调用channel的basicAck方法签收
4. 如果消息处理失败，则调用channel的basicNack方法拒绝签收，broker重新发送给consumer

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">
    <!--加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>

    <!-- 定义rabbitmq connectionFactory -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}"/>

    <!--定义监听器bean-->
    <context:component-scan base-package="top.hellocode.listener"/>

    <!--定义监听器容器-->
    <rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual">
        <rabbit:listener ref="ackListener" queue-names="test_queue_confirm"/>
    </rabbit:listener-container>

</beans>
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月12日 18:18
 */
@Component
public class AckListener implements ChannelAwareMessageListener {
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        long deliveryTag = message.getMessageProperties().getDeliveryTag();

        try {
            // 1. 接收转换消息
            System.out.println(new String(message.getBody()));
            // 2. 处理业务逻辑
            System.out.println("处理业务逻辑....");
            int i = 3 / 0;
            // 手动签收
            channel.basicAck(deliveryTag,true);
        } catch (IOException e) {
            // 拒绝签收
            // 第三个参数：requeue，重回队列。如果设置为true，则消息重新回到queue，broker会重新发送该消息给消费端
            channel.basicNack(deliveryTag,true,true);
        }
    }
}
```

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-consumer.xml")
public class ConsumerTest {

    @Test
    public void test(){
        while (true){

        }
    }
}
```

### 3、消费端限流

![image-20210219023003482](http://images.hellocode.top/2115723-20210309020755148-205864159.png)

**Consumer限流机制**

1. 确保ack机制为手动确认(`acknowledge="manual"`)
2. 在配置文件中`rabbit:listener-container`中配置属性 `perfetch = "n"`，每次从MQ中拉取n条消息，只有手动确认消费完毕，才会进行下一次拉取

```xml
<!--定义监听器容器-->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" prefetch="1">
    <!--<rabbit:listener ref="ackListener" queue-names="test_queue_confirm"/>-->
    <rabbit:listener ref="qosListener" queue-names="test_queue_confirm"/>
</rabbit:listener-container>
```

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年09月12日 18:18
 */
@Component
public class QosListener implements ChannelAwareMessageListener {
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        // 1. 获取消息
        System.out.println(new String(message.getBody()));

        // 2. 处理业务逻辑

        // 3. 签收
        channel.basicAck(message.getMessageProperties().getDeliveryTag(),true);
    }
}
```

### 4、TTL

- TTL全称Time To Live（存活时间/过期时间）
- 当消息到达存活时间后，还没有被消费，会被自动清除
- RabbitMQ可以对消息设置过期时间，也可以对整个队列（Queue）设置过期时间

**设置队列过期**

1. 配置队列参数信息

   ```xml
   <!--ttl-->
   <rabbit:queue id="test_queue_ttl" name="test_queue_ttl">
       <rabbit:queue-arguments>
           <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer"/>
       </rabbit:queue-arguments>
   </rabbit:queue>
   
   <rabbit:topic-exchange name="test_exchange_ttl">
       <rabbit:bindings>
           <rabbit:binding pattern="ttl.#" queue="test_queue_ttl" />
       </rabbit:bindings>
   </rabbit:topic-exchange>
   ```

   key值`x-message-ttl`是配置ttl的固定属性，过期时间单位为毫秒，因为是number类型，所以需要指定type

2. 发送消息
   
   `rabbitTemplate.convertAndSend("test_exchange_ttl", "ttl.run", "hello ttl.....");`

> 队列过期后，会将队列中的所有消息全部移除

**设置消息单独过期**

1. 定义消息后处理对象，设置一些消息的参数信息

   ```java
   MessagePostProcessor messagePostProcessor = new MessagePostProcessor() {
   
       @Override
       public Message postProcessMessage(Message message) throws AmqpException {
           // 1. 设置message消息
           message.getMessageProperties().setExpiration("5000");   // 消息的过期时间（ms）
           // 2.返回该消息
           return message;
       }
   };
   ```

2. 发送消息

   ```java
   rabbitTemplate.convertAndSend("test_exchange_ttl", "ttl.run", "hello ttl.....",messagePostProcessor);
   ```

> 如果设置了消息的过期时间，也设置了队列的过期时间，以时间短的为准

> 消息过期后，只有消息在队列的顶端（快被消费），才会判断其是否过期（移除掉），提高效率

### 5、死信队列

死信队列，英文缩写：DLX。Dead Letter Exchange（死信交换机），当消息称为Dead message后，可以被重新发送到另一个交换机，这个交换机就是DLX

![img](http://images.hellocode.top/20210407124404353.png)

**消息称为死信的三种情况**

1. 队列消息长度达到限制
2. 消费者拒接消费消息，basicNack/basicReject，并且不把消息重新放入原目标队列，`requeue=false`
3. 原队列存在消息过期设置，消息到达超时时间未被消费

**队列绑定死信交换机**

- 给队列设置参数：`x-dead-letter-exchange`和`x-dead-letter-routing-key`

**步骤**：

1. 声明正常的队列和交换机
2. 声明死信队列和死信交换机
3. 正常队列绑定死信交换机，设置两个参数
   - x-dead-letter-exchange：死信交换机名称
   - x-dead-letter-routing-key：发送给死信交换机的routing key

```xml
<!--死信队列-->
<!--1. 声明正常的队列交换机-->
<rabbit:queue id="test_queue_dlx" name="test_queue_dlx">
    <!--3. 正常队列绑定死信交换机-->
    <rabbit:queue-arguments>
        <entry key="x-dead-letter-exchange" value="exchange_dlx"/>
        <entry key="x-dead-letter-routing-key" value="dlx.hehe"/>

        <!--设置队列过期时间或者长度限制,让死信出现-->
        <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer"/>
        <!--队列长度限制-->
        <entry key="x-max-length" value="10" value-type="java.lang.Integer"/>
    </rabbit:queue-arguments>
</rabbit:queue>
<rabbit:topic-exchange name="test_exchange_dlx">
    <rabbit:bindings>
        <rabbit:binding pattern="test.dlx.#" queue="test_queue_dlx"/>
    </rabbit:bindings>
</rabbit:topic-exchange>

<!--2. 声明死信队列交换机-->
<rabbit:queue id="queue_dlx" name="queue_dlx"/>
<rabbit:topic-exchange name="exchange_dlx">
    <rabbit:bindings>
        <rabbit:binding pattern="dlx.#" queue="queue_dlx"/>
    </rabbit:bindings>
</rabbit:topic-exchange>
```

```java
@Test
public void testDlx(){
    // 测试过期时间,死信消息
    rabbitTemplate.convertAndSend("test_exchange_dlx","test.dlx.hehe","message.....");

    // 测试长度限制后,消息死信
    for(int i = 0; i < 20; i++){
        rabbitTemplate.convertAndSend("test_exchange_dlx","test.dlx.hehe","message.....");
    }
}
```

**小结**

1. 死信交换机和死信队列和普通的没有区别
2. 当消息成为死信后，如果该队列绑定了死信交换机，则消息会被死信交换机重新路由到死信队列
3. 消息成为死信的三种情况
   1. 队列消息长度达到限制
   2. 消费者拒绝接收消费消息，并且不重回队列
   3. 原队列存在消息过期设置，消息达到超时时间未被消费

### 6、延迟队列

> 延迟队列，即消息进入队列后不会立即被消费，只有到达指定时间后，才会被消费（需要重点掌握）

**需求**

1. 下单后，30分钟未支付，取消订单，回滚库存
2. 新用户注册成功7天后，发送短信问候

**实现方式**

1. 定时器

2. 延迟队列

   ![](http://images.hellocode.top/2021061015222514.png)

很可惜，在RabbitMQ中并未提供延迟队列功能

但是可以用：*TTL+死信队列* 组合实现延迟队列的效果

![在这里插入图片描述](http://images.hellocode.top/20210610152606193.png)

### 7、日志与监控

> 这部分了解即可

- RabbitMQ默认日志存放路径：`/var/log/rabbitmq/rabbit@xxx.log`

- 还有一些信息可以在可视化界面15672界面查看

**rabbitmqctl管理和监控**

- 查看队列：`rabbitmqctl list_queues`
- 查看exchanges：`rabbitmqctl list_exchanges`
- 查看用户：`rabbitmqctl list_users`
- 查看连接：`rabbitmqctl list_connections`
- 查看消费者信息：`rabbitmqctl list_consumer`
- 查看环境变量：`rabbitmqctl environment`
- 查看未被确认的队列：`rabbitmqctl list_queues name messages_unacknowledged`
- 查看单个队列的内存使用：`rabbitmqctl list_queues name memory`
- 查看准备就绪的队列：`rabbitmqctl list_queues name messages_ready`

### 8、消息追踪

- 在使用任何消息中间件的过程中，难免会出现某条消息异常丢失的情况。

- 对于RabbitMQ而言，可能是因为生产者或消费者与RabbitMQ断开了连接，而他们与RabbitMQ又采用了不同的确认机制；也有可能是因为交换器与队列之间不同的转发策略；甚至是交换器并没有与任何队列进行绑定，生产者又不感知或者没有采取相应的措施；另外RabbitMQ本身的集群策略也可能导致消息的丢失。

- 这个时候就需要有一个较好的机制跟踪记录消息的投递过程，以此协助开发和运维人员进行问题的定位

在RabbitMQ中可以使用Firehose和rabbitmq_tracing插件功能来实现消息跟踪

**消息追踪-Firehose**

firehose的机制是将生产者投递给rabbitmq的消息,rabbitmq投递给消费者的消息按照指定的格式发送到默认的exchange上.这个默认的exchange的名称为amq.rabbitmq.trace,它是一个topic类型的exchange.发送到这个exchange上的消息的routing key为public.exchangename和deliver.queuename.其中exchangename和queuename为实际exchange和queue的名称.分别对应生产者投递到exchange的消息,和消费者从queue上获取的消息.

注意:打开trace会影响消息写入功能,适当打开后请关闭.（Linux命令）

- `rabbitmqctl trace_on`:开启Firehose命令

- `rabbitmqctl trace_off`:关闭Firehose命令

**消息追踪-rabbitmqq_tracing**

rabbitmq_tracing和Firehose在实现上如出一辙，只不过rabbitmq_tracing的方式比Firehose多了一层GUI的包装，更容易使用和管理

启用插件:`rabbitmq-plugins enable rabbitmq_tracing`

> 开发阶段排错会方便一些，但是生产环境需要慎用，会影响性能

## 六、应用问题

1. 消息可靠性保障
   - 消息补偿机制
2. 消息幂等性保障
   - 乐观锁解决方案

### 1、消息补偿

**需求**：100%确保消息发送成功

*方案图示：*

![img](http://images.hellocode.top/20200409102835144.png)

### 2、幂等性保障

幂等性指一次和多次请求某一个资源，对于资源本身应该具有同样的结果。也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同

在MQ中指，消费多条相同的消息，得到与消费该消息一次相同的结果

*方案图示（乐观锁机制）：*

![img](http://images.hellocode.top/20200409102904789.png)

## 七、集群搭建

一般来说，如果只是为了学习RabbitMQ或者验证业务工程的正确性那么在本地环境或者测试环境上使用其单实例部署就可以了，但是出于MQ中间件本身的可靠性、并发性、吞吐量和消息堆积能力等问题的考虑，在生产环境上一般都会考虑使用RabbitMQ的集群方案。

### 1、集群方案的原理

RabbitMQ这款消息队列中间件产品本身是基于Erlang编写，Erlang语言天生具备分布式特性（通过同步Erlang集群各节点的magic cookie来实现）。因此，RabbitMQ天然支持Clustering。这使得RabbitMQ本身不需要像ActiveMQ、Kafka那样通过ZooKeeper分别来实现HA方案和保存集群的元数据。集群是保证可靠性的一种方式，同时可以通过水平扩展以达到增加消息吞吐量能力的目的。

![](http://images.hellocode.top/1566073768274.png)


### 2、单机多实例部署

由于某些因素的限制，有时候你不得不在一台机器上去搭建一个rabbitmq集群，这个有点类似zookeeper的单机版。真实生成环境还是要配成多机集群的。有关怎么配置多机集群的可以参考其他的资料，这里主要论述如何在单机中配置多个rabbitmq实例。

主要参考官方文档：https://www.rabbitmq.com/clustering.html

1. 首先确保RabbitMQ运行没有问题：`rabbitmqctl status`

2. 停止rabbitmq服务:`service rabbitmq-server stop`

3. 启动第一个节点：`RABBITMQ_NODE_PORT=5673 RABBITMQ_NODENAME=rabbit1 rabbitmq-server start`

4. 启动第二个节点：`RABBITMQ_NODE_PORT=5674 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15674}]" RABBITMQ_NODENAME=rabbit2 rabbitmq-server start`

> web管理插件端口占用,所以还要指定其web插件占用的端口号。

结束命令：

```shell
rabbitmqctl -n rabbit1 stop
rabbitmqctl -n rabbit2 stop
```

5. rabbit1操作作为主节点：

```shell
rabbitmqctl -n rabbit1 stop_app
rabbitmqctl -n rabbit1 reset
rabbitmqctl -n rabbit1 start_app
```

6. rabbit2操作为从节点：

```shell
rabbitmqctl -n rabbit2 stop_app
rabbitmqctl -n rabbit2 reset
rabbitmqctl -n rabbit2 join_cluster rabbit1@'super' 	# ''内是主机名换成自己的
rabbitmqctl -n rabbit2 start_app
```

7. 查看集群状态：`rabbitmqctl cluster_status -n rabbit1`

8. web监控：

![](http://images.hellocode.top/1566065096459.png)

> 此时集群已经搭建完成，但是数据并未同步，如果向主节点队列发送消息，再将主节点停止，从节点将无法获取队列中的数据，显示NAN
>
> 要解决此问题，需要镜像队列来处理

### 3、集群管理

- `rabbitmqctl join_cluster {cluster_node} [–ram]`：将节点加入指定集群中。在这个命令执行前需要停止RabbitMQ应用并重置节点。

- `rabbitmqctl cluster_status`：显示集群的状态。

- `rabbitmqctl change_cluster_node_type {disc|ram}`：修改集群节点的类型。在这个命令执行前需要停止RabbitMQ应用。

- `rabbitmqctl forget_cluster_node [–offline]`：将节点从集群中删除，允许离线执行。

- `rabbitmqctl update_cluster_nodes {clusternode}`：在集群中的节点应用启动前咨询clusternode节点的最新信息，并更新相应的集群信息。这个和join_cluster不同，它不加入集群。考虑这样一种情况，节点A和节点B都在集群中，当节点A离线了，节点C又和节点B组成了一个集群，然后节点B又离开了集群，当A醒来的时候，它会尝试联系节点B，但是这样会失败，因为节点B已经不在集群中了。

- `rabbitmqctl cancel_sync_queue [-p vhost] {queue}`：取消队列queue同步镜像的操作。

- `rabbitmqctl set_cluster_name {name}`：设置集群名称。集群名称在客户端连接时会通报给客户端。Federation和Shovel插件也会有用到集群名称的地方。集群名称默认是集群中第一个节点的名称，通过这个命令可以重新设置。

### 4、RabbitMQ镜像集群配置

上面已经完成RabbitMQ默认集群模式，但并不保证队列的高可用性，尽管交换机、绑定这些可以复制到集群里的任何一个节点，但是队列内容不会复制。虽然该模式解决一项目组节点压力，但队列节点宕机直接导致该队列无法应用，只能等待重启，所以要想在队列节点宕机或故障也能正常应用，就要复制队列内容到集群里的每个节点，必须要创建镜像队列。

> 镜像队列是基于普通的集群模式的，然后再添加一些策略，所以你还是得先配置普通集群，然后才能设置镜像队列，我们就以上面的集群接着做。

*设置的镜像队列可以通过开启的网页的管理端Admin->Policies，也可以通过命令*

`rabbitmqctl set_policy my_ha "^" '{"ha-mode":"all"}'`

![](http://images.hellocode.top/1566072300852.png)

- Name:策略名称
- Pattern：匹配的规则，如果是匹配所有的队列，是`^`
- Definition:使用ha-mode模式中的all，也就是同步所有匹配的队列。问号链接帮助文档。

### 5、负载均衡-HAProxy

HAProxy提供高可用性、负载均衡以及基于TCP和HTTP应用的代理，支持虚拟主机，它是免费、快速并且可靠的一种解决方案,包括Twitter，Reddit，StackOverflow，GitHub在内的多家知名互联网公司在使用。HAProxy实现了一种事件驱动、单一进程模型，此模型支持非常大的并发连接数。

#### 5.1. 安装HAProxy

```shell
# 下载依赖包
yum install gcc vim wget

# 上传haproxy源码包

# 解压
tar -zxvf haproxy-1.6.5.tar.gz -C /usr/local

# 进入目录、进行编译、安装
cd /usr/local/haproxy-1.6.5
make TARGET=linux31 PREFIX=/usr/local/haproxy
make install PREFIX=/usr/local/haproxy

# 赋权
groupadd -r -g 149 haproxy
useradd -g haproxy -r -s /sbin/nologin -u 149 haproxy

# 创建haproxy配置文件
mkdir /etc/haproxy
vim /etc/haproxy/haproxy.cfg
```


#### 5.2. 配置HAProxy

配置文件路径：/etc/haproxy/haproxy.cfg

```shell
#logging options
global
	log 127.0.0.1 local0 info
	maxconn 5120
	chroot /usr/local/haproxy
	uid 99
	gid 99
	daemon
	quiet
	nbproc 20
	pidfile /var/run/haproxy.pid

defaults
	log global
	
	mode tcp

	option tcplog
	option dontlognull
	retries 3
	option redispatch
	maxconn 2000
	contimeout 5s
   
     clitimeout 60s

     srvtimeout 15s	
#front-end IP for consumers and producters

listen rabbitmq_cluster
	bind 0.0.0.0:5672
	
	mode tcp
	#balance url_param userid
	#balance url_param session_id check_post 64
	#balance hdr(User-Agent)
	#balance hdr(host)
	#balance hdr(Host) use_domain_only
	#balance rdp-cookie
	#balance leastconn
	#balance source //ip
	
	balance roundrobin
	
        server node1 127.0.0.1:5673 check inter 5000 rise 2 fall 2
        server node2 127.0.0.1:5674 check inter 5000 rise 2 fall 2

listen stats
	bind 192.168.23.129:8100
	mode http
	option httplog
	stats enable
	stats uri /rabbitmq-stats
	stats refresh 5s
```

启动HAproxy负载

```shell
/usr/local/haproxy/sbin/haproxy -f /etc/haproxy/haproxy.cfg
//查看haproxy进程状态
ps -ef | grep haproxy

访问如下地址对mq节点进行监控
http://192.168.23.129:8100/rabbitmq-stats
```

代码中访问mq集群地址，则变为访问haproxy地址:5672

**集群代码入门**

```java
public class HelloWorld{
    public static void main(String[] args) throws IOException,TimeoutException{
        // 1. 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 2. 设置参数
        factory.setHost("192.168.23.129");	//HaProxy ip
        factory.setPort(5672);	// HaProxy 端口
        // 3. 创建连接Connection
        Connection connection = factory.newConnection(`;
        // 4. 创建channel
        Channel channel = connection.createChannel();
        // 5. 创建队列Queue
        channel.queueDeclare("hello_world",true,false,false,null);
        String body = "hello rabbitmq~";
        // 6. 发送消息
        channel.basicPublish("","hello_world",null,body.getBytes());
        // 7. 释放资源
        channel.close();
        connection.close();
        
        System.out.println("send success...");
    }
}
```