---
title: "Redis"
order: 5
category:
  - 数据库
---



# Redis

## 一、Redis入门

### 1、NoSQL

**问题**

- 类似12306春运期间、淘宝京东双11促销等情况面临的问题
  - 海量用户
  - 高并发

*罪魁祸首——关系型数据库*

- 性能瓶颈：磁盘IO性能低下
- 扩展瓶颈：数据关系复杂，扩展性差，不便于大规模集群

**解决思路**

- 降低磁盘IO次数，越低越好——*内存存储*
- 去除数据间关系，越简单越好——*不存储关系，仅存储数据*

*由上述面临的问题，NoSQL由此诞生*

**NoSQL**

- 即Not-Only SQL(泛指非关系型的数据库)，作为关系型数据库的补充
- 作用：应对基于海量用户和海量数据前提下的数据处理问题

*特征*

- 可扩容，可伸缩
- 大数据量下高性能（不走磁盘，通过内存读写）
- 灵活的数据模型（有自己的一套数据模型）
- 高可用

*常见NoSQL数据库*

- Redis
- memcache
- HBase
- MongoDB

**NoSQL和SQL的对比**

![](http://images.hellocode.top/image.png)

### 2、Redis

**概念**：*Redis（REmote DIctionary Server）*是用C语言开发的一个开源的高性能键值对（*key-value*）数据库

**特征**

1. 数据库之间没有必然的关联关系
2. 内部采用单线程机制进行工作（单线程不会有数据并发问题，安全）
3. 高性能：低延迟，速度快（基于内存、IO多路复用、良好的编码）
4. 多数据类型支持
   - 字符串类型——string
   - 列表类型——list
   - 散列类型——hash
   - 集合类型——set
   - 有序集合类型——zset/sorted_set（仅了解，应用场景不多）
5. 支持持久化，可以进行数据灾难恢复
6. 支持主从集群、分片集群
7. 支持多语言客户端

**应用场景**

- 为热点数据加速查询（*主要场景*），如热点商品、热点新闻、热点资讯、推广类等高访问量信息等
- 即时信息查询，如各类排行榜、网站访问统计、公交到站信息、在线人数信息（聊天室、网站）、设备信号等
- 时效性信息控制，如验证码控制、投票控制等
- 分布式数据共享，如分布式集群架构中的session分离
- 消息队列（了解即可，已经慢慢的弱化）

### 3、下载与安装

**基于Centos 7 安装Redis**

1. 安装redis依赖
   
   `yum install -y gcc tcl`
   
2. 解压安装包（下载：https://redis.io/download/#redis-downloads，推荐放到/usr/local/src/下）

   `tar -zxvf redis-6.2.6.tar.gz`

3. 进入解压后的文件夹，编译

   `make && make install`

默认安装路径为：`/usr/local/bin`目录下，查看redis开头的文件，就是可执行的文件

![](http://images.hellocode.top/rjzEQBI6mD3yXTF.png)

> `redis-server`服务器启动指令；`redis-cli`客户端启动指令

再退回上一级，可以看到redis.conf，即为Redis的配置文件

> 在根目录下，redis目录名为`redis-6.2.6`,名称比较长，使用起来不太方便，可以做一个快链（快捷方式）
>
> `ln -s redis-6.2.6 redis`

### 4、服务器与客户端启动

**服务器**

![](http://images.hellocode.top/L6g3wDhTHBvfAZr.png)

- 启动服务器——参数启动（*默认端口：6379*）
  
  `redis-server [--port port]`
  
- 范例
  
  `redis-server --port 6379`
  
- 启动服务器——配置文件启动【*主流*】
  
  `redis-server config_file_name`
  
- 范例
  
  `redis-server redis.conf`

**客户端**

![](http://images.hellocode.top/Cor9fEw8v7sqjIH.png)

- 启动客户端（默认端口：6379）
  
  `redis-cli [-h host] [-p port] [-a password] [commonds]`
  
- 范例
  
  `redis-cli -h 61.129.65.248 -p 6384 -a 123456`
  
  密码也可以在连接成功后，通过`AUTH`指定

- 其中的commonds就是redis的操作命令，例如
  - `ping`：与redis服务端做心跳测试，服务端正常会返回pong
  - 不指定命令就是持续通信，指定命令就在连接成功后执行对应命令后结束通信

> 注意：服务器启动指定端口使用的是`--port`，客户端启动指定端口使用的是`-p`，注意`-`的数量是不同的

**基础环境设置约定**

- 创建配置文件存储目录
  
  `mkdir conf`
  
- 创建服务器文件存储目录（包含日志、数据、临时配置文件等）
  
  `mkdir data`
  
- 创建快速访问链接
  
  `ln -s redis-6.2.6 redis`

### 5、配置文件启动与常用配置

- 过滤原redis.conf配置文件并保存到redis-6379.conf文件
  `cat redis.conf | grep -v "#" | grep -v "^$" > redis-6379.conf`

![](http://images.hellocode.top/FQE8Z62W4AfIubL.png)

- *bind*：绑定主机地址

- prot：指定端口号

- timeout：客户端连接超时时间（客户端多久无操作就将其关闭）

- *daemonize*：设置服务器以守护进程的方式运行，yes即为后台运行

- loglevel：日志等级（debug/*verbose*/notice/warning）

- *requirepass*：密码，设置后访问redis必须输入密码

  > 日志级别开发期设置为verbose即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度

- logfile：日志文件，默认为空，不记录日志，可以指定日志文件名（存在工作目录下）

- dir .：工作目录，默认是当前目录，也就是运行redis-server时的目录，日志、持久化等文件会保存在这个目录

- maxclients：服务器允许客户端连接最大数量，默认0，表示无限制。当客户端连接达到上限后，Redis会拒绝新的连接

- maxmemory：设置redis能够使用的最大内存

- databases：数据库数量，默认有16个库（0-15）

**修改配置文件**

![](http://images.hellocode.top/bRlmdJwA1IQ4YoZ.png)

**启动**

`redis-server /redis/conf/redis-6379.conf`

*将darmonize改为yes，方便学习，开发中还是使用前台启动*

### 6、开机自启

1. 新建一个系统服务文件

   `vim /etc/systemd/system/redis.service`

2. 内容如下

   ```shell
   [Unit]
   Description=redis-server
   After=network.target
   
   [Service]
   Type=forking
   ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
   PrivateTmp=true
   
   [Install]
   WantedBy=multi-user.target
   ```

3. 重载系统服务

   `systemctl dameon-reload`

4. 现在就可以使用以下命令操作redis

   启动：`systemctl start redis`

   查看状态：`systemctl status redis`

   停止：`systemctl stop redis`

   开机自启：`systemctl enable redis`

## 二、Redis命令

### 1、数据结构

Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样：

![image-20220627122222854](http://images.hellocode.top/74c75022e1e9c05b397accdf315e7e01.png)

帮助文档

- 英文版：https://redis.io/commands/
- 中文版：http://www.redis.cn/commands.html
- 也可以在命令行连接客户端后使用`help`命令查看，`help @组名`可以按分组查看

### 2、通用命令

> 通过`help [command]`可以查看一个命令的具体用法

- `KEYS`：查看符合模板的所有key，不建议在生产环境设备上使用（支持通配符：`*`多个字符，`?`一个字符）
- `DEL`：删除一个指定的key，支持同时删除多个（返回影响的数据）
- `EXISTS`：判断key是否存在，支持同时查询多个（返回存在的个数）
- `EXPIRE`：给一个key设置有效期，有效期到期时该key会自动删除
- `TTL`：查看一个key的剩余有效期
  - -1：永久有效
  - -2：已失效或者不存在
- `SELECT index`：切换数据库（默认16个数据库：0-15）
- `move key db`：数据移动

### 3、String类型

String类型，也就是字符串类型，是Redis中最简单的存储类型

其value是字符串，不过根据字符串的格式不同，又可以分为3类：

- String：普通字符串
- int：整数类型，可以做自增、自减操作
- float：浮点类型，可以做自增、自减操作

不管是哪种类型，底层都是字节数组形式存储，只不过是编码方式不同。字符串类型的最大空间不能超过512m

**常见命令**

- `SET`：添加或修改已存在的一个String类型的键值对
- `GET`：根据key获取String类型的value
- `MSET`：批量添加多个String类型的键值对
- `MGET`：根据多个key获取多个String类型的value
- `STRLEN`：获取数据字符个数（字符串长度）
- `APPEND`：追加信息到原始信息后部（如果原始信息存在就追加，否则新建）
- `INCR`：让一个整型的key自增1（对应的还有DECR）
- `INCRBY`：让一个整型的key自增并指定步长，例如：incrby num 2，让num值自增2（对应的还有DECRBY）
- `INCRBYFLOAT`：让一个浮点类型的数字自增并指定步长（没有对应的DECR方法，可以通过加负值实现）
- `SETNX`：添加一个String类型的键值对，前提是这个key不存在，否则不执行
- `SETEX`：添加一个String类型的键值对，并且指定有效期

> 如果Value是一个Java对象，可以将对象序列化后以JSON字符串的形式存入

**key的层级结构**

在Redis中没有Table的概念，一般key使用id存储，例如需要把用户和商品都存入redis（id都为1），那应该怎么解决？

- Redis的key允许有多个单词形成层级结构，多个单词之间用`:`隔开，格式如下：

  `项目名:业务名:类型:id`

- 格式并非固定，可以根据自己的需求进行修改

> 图形化界面会自动分级显示

![image-20230108102652999](http://images.hellocode.top/image-20230108102652999.png)

### 4、Hash类型

- Hash类型，也叫散列，其value是一个无序字典，类似于Java中的HashMap结构

- String结构将对象序列化为JSON字符串存储，需要修改某个字段时很不方便

- Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD

![在这里插入图片描述](http://images.hellocode.top/8960f20da4008c425c314a0b8fc2e20a.png)

**常见命令**

- `HSET key field value`：添加或者修改hash类型key的field的值
- `HGET key field`：获取一个hash类型key的field的值
- `HDEL`：删除一个hash类型key的field的值
- `HMSET`：批量添加多个hash类型key的field的值
- `HMGET`：批量获取多个hash类型key的field的值
- `HGETALL`：获取一个hash类型的key中的所有的field和value
- `HKEYS`：获取一个hash类型的key中所有的field
- `HVALS`：获取一个hash类型的key中所有的field
- `HINCRBY`：让一个hash类型key的字段值自增并指定步长
- `HSETNX`：添加一个hash类型key的field值，前提是这个field不存在，否则不执行
- `HLEN`：获取哈希表中字段的数量
- `HEXISTS`：获取哈希表中是否存在指定的字段

### 5、List类型

> Redis中的List类型与Java中的LinkedList类似，可以看作是一个双向链表结构。既可以支持正向检索也可以支持反向检索

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等

**常见命令**

- `LPUSH key element ...`：向列表左侧插入一个或多个元素
- `LPOP key`：移除并返回列表左侧的第一个元素，没有则返回nil
- `RPUSH ket element ...`：向列表右侧插入一个或多个元素
- `RPOP key`：移除并返回列表右侧的第一个元素
- `LRANGE key start end`：返回一段角标范围内的所有元素
  - `LRANGE key 0 -1`：返回list中的所有元素
- `LINDEX key index`：返回指定索引处的元素
- `LREM key count value`：移除指定元素
- `LLEN key`：返回指定key的元素个数
- `BLPOP`和`BRPOP`：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil

### 6、Set类型

> Redis的Set结构与Java中的HashSet类似，可以看作是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征

- 无序
- 元素不可重复
- 查找快
- 支持交集、并集、差集等功能

**常见命令**

- `SADD key member ...`：向set中添加一个或多个元素
- `SREM key member ...`：移除set中的指定元素
- `SCARD key`：返回set中元素的个数
- `SISMEMBER key member`：判断一个元素是否存在于set中
- `SMEMBERS`：获取set中的所有元素
- `SINTER key1 key2 ...`：求key1与key2的交集
- `SDIFF key1 key2 ...`：求key1与key2的差集
- `SUNION key1 key2 ...`：求key1与key2的并集

### 7、SortedSet类型

> Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加hash表

- 可排序
- 元素不重复
- 查询速度快

因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能

**常见命令**

- `ZADD key score member`：添加一个或多个元素到sorted set，如果已经存在则更新其score值
- `ZREM key member`：删除sorted set中的一个指定元素
- `ZSCORE key member`：获取sorted set中的指定元素的score值
- `ZRANK key member`：获取sorted set中指定元素的排名
- `ZCARD key`：获取sorted set中的元素个数
- `ZCOUNT key min max`：统计score值在给定范围内的所有元素的个数
- `ZINCRBY key increment member`：让sorted set中的指定元素自增，步长为指定的increment值
- `ZRANGE key min max`：按照score排序后，获取指定排名范围内的元素
- `ZRANGEBYSCORE key min max`：按照score排序后，获取指定score范围内的元素
- `ZDIFF`、`ZINTER`、`ZUNION`：求差集、交集、并集

> 注意：所有排名默认都是升序，如果要降序则在命令Z后面添加REV即可

## 三、Java客户端

在Redis官网中提供了各种语言的客户端，地址：https://redis.io/resources/clients/

![img](http://images.hellocode.top/cbcfc4462d024f27bb037953ec5398e6.png)

### 1、Jedis

官网：https://github.com/redis/jedis

#### 1.1. 快速入门

1. 引入依赖

   ```xml
   <dependency>
       <groupId>redis.clients</groupId>
       <artifactId>jedis</artifactId>
       <version>4.3.0</version>
   </dependency>
   ```

2. 建立连接

   ```java
   private Jedis jedis;
   
   @BeforeEach
   void setUp(){
       // 建立连接
       jedis = new Jedis("192.168.36.128",6379);
       // 设置密码
       jedis.auth("123456");		// 没有开启密码就不用设置
       // 选择库（默认为0）
       jedis.select(0);
   }
   ```

3. 测试String

   ```java
   @Test
   void testString(){
       // 插入数据，方法和redis命令一致
       String result = jedis.set("name","张三");
       System.out.println("result=" + result);
       // 获取数据
       String name = jedis.get("name");
       System.out.println("name=" + name);
   }
   ```

4. 测试Hash

   ```java
   @Test
   void testHash() {
       jedis.hset("user:1","name","李四");
       jedis.hset("user:1","age","20");
       Map<String, String> map = jedis.hgetAll("user:1");
       System.out.println(map);
   }
   ```

5. 释放资源

   ```java
   @AfterEach
   void tearDown(){
       // 释放资源
       if(jedis != null){
           jedis.close();
       }
   }
   ```

![image-20230108124540711](http://images.hellocode.top/image-20230108124540711.png)

#### 1.2. 连接池

Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此推荐使用Jedis连接池代替Jedis的直连方式

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2023年01月08日 12:52
 */
public class JedisConnectionFactory {
    private static final JedisPool jedisPool;
    static {
        // 配置连接池
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 最大连接
        jedisPoolConfig.setMaxTotal(8);
        // 最大空闲连接
        jedisPoolConfig.setMaxIdle(8);
        // 最小空闲连接
        jedisPoolConfig.setMinIdle(0);
        // 设置最长等待时间（默认-1，无限）
        jedisPoolConfig.setMaxWaitMillis(1000);
        // 创建连接池对象
        jedisPool = new JedisPool(jedisPoolConfig, "192.168.36.128", 6379, 1000);
    }
    public static Jedis getJedis(){
        return jedisPool.getResource();
    }
}
```

### 2、SpringDataRedis

 SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis

官网地址：https://spring.io/projects/spring-data-redis

- 提供了对不同Redis客户端的整合（Lettuce和Jedis）
- 提供了RedisTemplate通一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKCollection实现

#### 2.1. 快速入门

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

![img](http://images.hellocode.top/modb_20220727_cb4bcee4-0d93-11ed-bf3a-fa163eb4f6be.png)

**SpringBoot**已经提供了对SpringDataRedis的支持，使用非常简单

1. 引入依赖

   ```xml
   <!--Redis依赖-->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   <!--连接池依赖-->
   <dependency>
       <groupId>org.apache.commons</groupId>
       <artifactId>commons-pool2</artifactId>
   </dependency>
   ```

2. 配置文件

   ```yaml
   spring:
     redis:
       host: 192.168.36.128
       port: 6379
       # password: 123456
       lettuce:
         pool:
           max-active: 8   # 最大连接
           max-idle: 8   # 最大空闲连接
           min-idle: 0   # 最小空闲连接
           max-wait: 100   # 连接等待时间
   ```

   需要手动配置lettuce的pool连接池才会生效（默认是lettuce，可以手动引入jedis）

3. 注入RedisTemplate

   ```java
   @Autowired
   private RedisTemplate redisTemplate;
   ```

4. 编写测试

   ```java
   @SpringBootTest
   class RedisSpringDataApplicationTests {
       @Autowired
       private RedisTemplate redisTemplate;
   
       @Test
       void contextLoads() {
           // 插入一条String类型数据
           redisTemplate.opsForValue().set("name","李四");
           // 读取一条String类型数据
           Object name = redisTemplate.opsForValue().get("name");
           System.out.println("name=" + name);
       }
   }
   ```

#### 2.2. 序列化RedisSerializer

> RedisTemplate可以接收任意Object作为值写入Redis，只不过写入之前会把Object序列化为字节形式，默认采用的是JDK序列化

![image-20230108142954255](http://images.hellocode.top/image-20230108142954255.png)

![image-20230108143055323](http://images.hellocode.top/image-20230108143055323.png)

**缺点**

- 可读性差
- 内存占用较大

![image-20230108143605075](http://images.hellocode.top/image-20230108143605075.png)

默认有7种序列化器供我们选择，一般来说：

- `StringRedisSerializer`：做key的序列化器（String类型的序列化器）
- `GenericJackson2JsonRedisSerializer`：做value的序列化器（对象转换为JSON）

**自定义SpringDataRedis的序列化方式**

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        // 创建Template
        RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(connectionFactory);
        // 设置序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
        // key和hashkey采用String序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());
        // value和hashvalue采用JSON序列化
        redisTemplate.setValueSerializer(jsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return redisTemplate;
    }
}
```

需要引入jackson依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

#### 2.3. StringRedisTemplate

尽管JSON的序列化方式可以满足我们的需求，但是依然存在一些问题

![image-20230108145717711](http://images.hellocode.top/image-20230108145717711.png)

为了在自动反序列化时知道对象的类型，JSON序列化器会将类的class类型写入json结果中，存入Redis，会带来额外的内存开销 。

因此，为了节省空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化

![Redis快速入门插图43](http://images.hellocode.top/frc-212a71448792033196ca3326e7a4e475.png)

Spring默认提供了一个StringRedisTemplate类，它的key和value的序列化方式默认就是String方式，省去了我们自定义RedisTemplate的过程

```java
@SpringBootTest
class RedisSpringDataApplicationTests {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    private static final ObjectMapper mapper = new ObjectMapper();

    @Test
    void testStringTemplate() throws JsonProcessingException {
        // 准备对象
        User user = new User("李四", 24);
        // 手动序列化
        String value = mapper.writeValueAsString(user);
        // 写入数据
        stringRedisTemplate.opsForValue().set("User:2",value);
        // 读取数据
        String s = stringRedisTemplate.opsForValue().get("User:2");
        // 反序列化
        User res = mapper.readValue(s, User.class);
        System.out.println(res);
    }
}
```

> 推荐使用这种方式进行序列化和反序列化，可以封装一个工具类简化操作

## 四、应用场景

### 1、短信登录

#### 1.1. 基于Session

![在这里插入图片描述](http://images.hellocode.top/9e6337b2deed414f8619eacb01e1e9c0.png)

**问题**

- 单体应用时用户的会话信息保存在session中，session存在于服务器端的内存中，由于前前后后用户只针对一个web服务器，所以没有问题

- 面对web服务器集群的环境下（我们一般都是用Nginx做负载均衡，若是使用了轮询等这种请求分配策略），就会导致用户小a在A服务器登录了，session存在于A服务器中，但是第二次请求被分配到了B服务器，由于B服务器中没有用户小a的session会话，导致用户小a还要再登陆一次，以此类推
- 这样用户体验很不好。当然解决办法也有很多种，比如同一个用户分配到同一个服务处理、使用cookie保持用户会话信息等

因此，要解决这样的问题必须满足以下条件：

- 数据共享
- 内存存储
- key、value结构

#### 1.2. 基于Redis

![在这里插入图片描述](http://images.hellocode.top/79783e6d465249b882ca325c68c2c288.png)

这里使用redis的hash结构存储user信息，原因是：

![在这里插入图片描述](http://images.hellocode.top/bbd45d3afc1048ceb9edee5f58fc9303.png)

- 若使用String结构，以JSON字符串来保存，比较直观
- 但Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD，并且内存占用更少

拦截器：

- 首先，对于每个请求，我们首先根据token判断用户是否已经登陆（是否已经保存到ThreadLocal中），如果没有登陆，放行交给登陆拦截器去做，如果已经登陆，刷新token的有效期，然后放行
- 之后来到登陆拦截器，如果ThreadLocal没有用户，说明没有登陆，拦截，否则放行

![在这里插入图片描述](http://images.hellocode.top/ea8e9b4151cd4e1aab71252051b0c1ac.png)

### 2、查询缓存

#### 2.1. 缓存穿透

**缓存穿透**是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会发送到数据库，造成数据库压力

**常见解决方案有两种**

*缓存空对象*

- 优点：实现简单、便于维护
- 缺点
  - 额外的内存消耗
  - 可能造成短期的不一致

*布隆过滤*

- 优点：内存占用较少，没有多余key
- 缺点
  - 实现复杂（Redis自带）
  - 存在误判可能（判断为有，但是实际情况并没有）

**缓存穿透的原因**

用户请求的数据在缓存中和数据库中都不存在，不断发起这样的请求，给数据库带来巨大压力

**缓存穿透的解决方案**

- 缓存null值
- 布隆过滤
- 增强id的复杂度，避免被猜测id规律
- 做好数据的基础格式校验
- 加强用户权限校验
- 做好热点参数的限流

#### 2.2. 缓存雪崩

**缓存雪崩**是指在同一时段大量的缓存key同时失效或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力

**解决方案**

- 给不同的key的TTL添加随机值
- 利用Redis集群提高服务的可用性
- 给缓存业务添加降级限流策略
- 给业务添加多级缓存

#### 2.3. 缓存击穿

**缓存击穿**问题也叫热点Key问题，就是一个被**高并发访问**并且**缓存重建业务教复杂**的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击

**解决方案**

- 互斥锁
- 逻辑过期

| 解决方案 | 优点                                     | 缺点                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| 互斥锁   | 没有额外的内存消耗、保证一致性、实现简单 | 线程需要等待，性能受影响、可能有死锁风险 |
| 逻辑过期 | 线程无需等待，性能较好                   | 不保证一致性、有额外内存消耗、实现复杂   |

### 3、优惠券秒杀

#### 3.1. 全局唯一ID

每个店铺都可以发布优惠券：

![image-20230112163144990](http://images.hellocode.top/image-20230112163144990.png)

当用户抢购时，就会生成订单并保存到数据库对应表中，而订单表如果使用数据库自增ID就会存在一些问题：

- id的规律性太明显
- 受单表数据量的限制

**全局id生成器**

全局id生成器，是一种在分布式系统下用来生成全局唯一ID的工具，一般要满足下列特性：

![1653363100502](http://images.hellocode.top/cd8504ad23b175bb6786003c6b461634.png)

> 可以使用Redis的数值自增特性，来实现全局id生成器

为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其他信息：

- 每天一个key，方便统计订单量
- ID构造是 时间戳 + 计数器

![img](http://images.hellocode.top/e59d1ff49d354931b6e19313449cc890.png)

![img](http://images.hellocode.top/b4d38b60110d49708c4570dffbb2ba4d.png)

```java
// 生成初始时间戳
public static void main(String[] args) {
    LocalDateTime time = LocalDateTime.of(2023, 1, 1, 0, 0, 0);
    long second = date.toEpochSecond(ZoneOffset.UTC);
    System.out.println(second);		// 1672531200
}
```

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2023年01月12日 16:51
 */
@Component
public class RedisIdWorker {
    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final long BEGIN_TIMESTAMP = 1672531200L;
    private static final int COUNT_BITS = 32;

    public long nextId(String keyPrefix){
        // 生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        long timestamp = nowSecond - BEGIN_TIMESTAMP;

        // 生成序列号
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        // redis存储数值有上限，对key拼接date可以让每天订单分开统计（解决上限问题且便于统计）
        long count = redisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + date);

        // 拼接并返回（使用位运算）
        return timestamp << COUNT_BITS | count;
    }
}
```

```java
// 测试方法
private ExecutorService es = Executors.newFixedThreadPool(500);
@Test
void testIdWorker() throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(300);
    Runnable task = () -> {
        for (int i = 0; i < 100; i++) {
            long id = redisIdWorker.nextId("order");
            System.out.println("id= "+ id);
        }
        latch.countDown();
    };
    long begin = System.currentTimeMillis();
    for (int i = 0; i < 300; i++) {
        es.submit(task);
    }
    latch.await();
    long end = System.currentTimeMillis();
    System.out.println("耗时："+(end - begin));
}
```

**全局唯一ID生成策略**

- UUID（16位，不推荐）
- Redis自增
- snowflake（雪花算法）
- 数据库自增

#### 3.2. 优惠券秒杀下单

每个店铺都可以发布优惠券，分为平价券和特价券。平价券可以任意购买，而特价券需要秒杀抢购：

![1653365145124](http://images.hellocode.top/90b1db6bd3d59960384c11d50db782f3.png)

表关系如下：

- tb_voucher：优惠券的基本信息，优惠金额、使用规则等
- tb_seckill_voucher：优惠券的库存、开始抢购时间、结束抢购时间。特价优惠券才需要填写这些信息

在下单时需要判断两点内容：

- 秒杀是否开始或结束，如果尚未开始或已经结束则无法下单
- 库存是否充足，不足则无法下单

![1653366238564](http://images.hellocode.top/3e7618180ea07fe0c332196683715656.png)

```java
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, VoucherOrder> implements IVoucherOrderService {
    @Resource
    private ISeckillVoucherService seckillVoucherService;
    @Resource
    private RedisIdWorker redisIdWorker;

    @Override
    @Transactional
    public Result seckillVoucher(Long voucherId) {
        // 查询优惠券信息
        SeckillVoucher voucher = seckillVoucherService.getById(voucherId);

        // 判断秒杀是否开始
        if(voucher.getBeginTime().isAfter(LocalDateTime.now())){
            // 尚未开始
            return Result.fail("秒杀尚未开始！");
        }
        // 判断秒杀是否结束
        if(voucher.getEndTime().isBefore(LocalDateTime.now())){
            // 已经结束
            return Result.fail("秒杀已经结束！");
        }
        // 判断库存是否充足
        if(voucher.getStock() < 1){
            // 库存不足
            return Result.fail("库存不足！");
        }

        // 扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1")
                .eq("voucher_id",voucherId)
                .update();
        if(!success){
            return Result.fail("库存不足！");
        }

        // 创建订单
        VoucherOrder voucherOrder = new VoucherOrder();
        // 订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 用户id
        voucherOrder.setUserId(UserHolder.getUser().getId());
        // 代金券id
        voucherOrder.setVoucherId(voucherId);
        save(voucherOrder);

        // 返回订单id
        return Result.ok(orderId);
    }
}
```

#### 3.3. 超卖问题

假设线程 1 过来查询库存，判断出来库存大于 1，正准备去扣减库存，但是还没有来得及去扣减，此时线程 2 过来，线程 2 也去查询库存，发现这个数量一定也大于 1，那么这两个线程都会去扣减库存，最终多个线程相当于一起去扣减库存，此时就会出现库存的超卖问题

![1653368335155](http://images.hellocode.top/1653368335155.png)

超卖问题是典型的多线程安全问题，针对这一问题的常见解决方案就是加锁：而对于加锁，我们通常有两种解决方案：见下图：

![1653368562591](http://images.hellocode.top/1653368562591.png)

**悲观锁：**

悲观锁可以实现对于数据的串行化执行，比如 syn，和 lock 都是悲观锁的代表。同时，悲观锁中又可以再细分为公平锁，非公平锁，可重入锁等等

- 优点：简单粗暴
- 缺点：性能一般

**乐观锁：**

- 优点：性能好
- 缺点：存在成功率低的问题

乐观锁的关键是判断之前查询的数据是否有被修改过，常见的方式有两种：

*版本号法*

![1653369268550](http://images.hellocode.top/1653369268550.png)

*CAS法*

> 对版本号法的一个简化，因为库存和版本号的作用是一样的，这里可以用库存代替版本号

- CAS是英文单词`Compare And Swap`的缩写，翻译过来就是比较并替换
- CAS机制当中使用了3个基本操作数：内存地址V，旧的预期值A，要修改的新值B
- 更新一个变量的时候，只有当变量的预期值A和内存地址V当中的实际值相同时，才会将内存地址V对应的值修改为B

![](http://images.hellocode.top/32e85082a87b457baeb5aef46963047c.png)

```java
boolean success = seckillVoucherService.update()
            .setSql("stock= stock -1") //set stock = stock -1
            .eq("voucher_id", voucherId).eq("stock",voucher.getStock()) //where id = ？ and stock = ?
    		.update();
```

> 上面这个代码是解决了超卖问题，但是成功率太低，可能导致有库存却卖不出的情况。比如刚开始100个线程查询库存，然后有1个修改了库存，剩余99个线程进行判断，因为库存已经被修改，都将会失败

为了解决上述问题，可以将CAS法做一个修改，让库存大于0都可以进行购买，就能够将问题解决

```java
boolean success = seckillVoucherService.update()
            .setSql("stock= stock -1") //set stock = stock -1
            .eq("voucher_id", voucherId).gt("stock",0) //where id = ？ and stock = ?
    		.update();
```

#### 3.4. 一人一单

需求：修改秒杀业务，要求同一个优惠券，一个用户只能下一单

**现在的问题在于：**

- 优惠卷是为了引流，但是目前的情况是，一个人可以无限制的抢这个优惠卷，所以我们应当增加一层逻辑，让一个用户只能下一个单，而不是让一个用户下多个单

- 具体操作逻辑如下：比如时间是否充足，如果时间充足，则进一步判断库存是否足够，然后再根据优惠卷 id 和用户 id 查询是否已经下过这个订单，如果下过这个订单，则不再下单，否则进行下单

![1653371854389](http://images.hellocode.top/1653371854389.png)

**初步代码：增加一人一单逻辑**

```java
@Override
public Result seckillVoucher(Long voucherId) {
    // 1.查询优惠券
    SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
    // 2.判断秒杀是否开始
    if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀尚未开始！");
    }
    // 3.判断秒杀是否已经结束
    if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
        // 尚未开始
        return Result.fail("秒杀已经结束！");
    }
    // 4.判断库存是否充足
    if (voucher.getStock() < 1) {
        // 库存不足
        return Result.fail("库存不足！");
    }
    // 5.一人一单逻辑
    // 5.1.用户id
    Long userId = UserHolder.getUser().getId();
    int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
    // 5.2.判断是否存在
    if (count > 0) {
        // 用户已经购买过了
        return Result.fail("用户已经购买过一次！");
    }
 
    //6，扣减库存
    boolean success = seckillVoucherService.update()
            .setSql("stock= stock -1")
            .eq("voucher_id", voucherId).update();
    if (!success) {
        //扣减库存
        return Result.fail("库存不足！");
    }
    //7.创建订单
    VoucherOrder voucherOrder = new VoucherOrder();
    // 7.1.订单id
    long orderId = redisIdWorker.nextId("order");
    voucherOrder.setId(orderId);
 
    voucherOrder.setUserId(userId);
    // 7.3.代金券id
    voucherOrder.setVoucherId(voucherId);
    save(voucherOrder);
 
    return Result.ok(orderId);
 
}
```

**存在问题：**现在的问题还是和之前一样，并发过来，查询数据库，都不存在订单，所以我们还是需要加锁，但是乐观锁比较适合更新数据，而现在是插入数据，所以我们需要使用悲观锁操作

**注意：**在这里提到了非常多的问题，我们需要慢慢的来思考，首先我们的初始方案是封装了一个 createVoucherOrder 方法，同时为了确保他线程安全，在方法上添加了一把 synchronized 锁

```java
@Transactional
public synchronized Result createVoucherOrder(Long voucherId) {
 
    Long userId = UserHolder.getUser().getId();
         // 5.1.查询订单
        int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
        // 5.2.判断是否存在
        if (count > 0) {
            // 用户已经购买过了
            return Result.fail("用户已经购买过一次！");
        }
 
        // 6.扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("voucher_id", voucherId).gt("stock", 0) // where id = ? and stock > 0
                .update();
        if (!success) {
            // 扣减失败
            return Result.fail("库存不足！");
        }
 
        // 7.创建订单
        VoucherOrder voucherOrder = new VoucherOrder();
        // 7.1.订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 7.2.用户id
        voucherOrder.setUserId(userId);
        // 7.3.代金券id
        voucherOrder.setVoucherId(voucherId);
        save(voucherOrder);
 
        // 7.返回订单id
        return Result.ok(orderId);
}
```

但是这样添加锁，锁的粒度太粗了，在使用锁过程中，控制**锁粒度** 是一个非常重要的事情，因为如果锁的粒度太大，会导致每个线程进来都会锁住，所以我们需要去控制锁的粒度，以下这段代码需要修改为：
intern () 这个方法是从常量池中拿到数据，如果我们直接使用 userId.toString () 他拿到的对象实际上是不同的对象，new 出来的对象，我们使用锁必须保证锁必须是同一把，所以我们需要使用 intern () 方法

```java
@Transactional
public Result createVoucherOrder(Long voucherId) {
    Long userId = UserHolder.getUser().getId();
    synchronized(userId.toString().intern()){
         // 5.1.查询订单
        int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
        // 5.2.判断是否存在
        if (count > 0) {
            // 用户已经购买过了
            return Result.fail("用户已经购买过一次！");
        }
 
        // 6.扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("voucher_id", voucherId).gt("stock", 0) // where id = ? and stock > 0
                .update();
        if (!success) {
            // 扣减失败
            return Result.fail("库存不足！");
        }
 
        // 7.创建订单
        VoucherOrder voucherOrder = new VoucherOrder();
        // 7.1.订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 7.2.用户id
        voucherOrder.setUserId(userId);
        // 7.3.代金券id
        voucherOrder.setVoucherId(voucherId);
        save(voucherOrder);
 
        // 7.返回订单id
        return Result.ok(orderId);
    }
}
```

但是以上代码还是存在问题，问题的原因在于当前方法被 spring 的事务控制，如果你在方法内部加锁，可能会导致当前方法事务还没有提交，但是锁已经释放也会导致问题，所以我们选择将当前方法整体包裹起来，确保事务不会出现问题：如下：

在 seckillVoucher 方法中，添加以下逻辑，这样就能保证事务的特性，同时也控制了锁的粒度



![1653373434815](http://images.hellocode.top/1653373434815.png)



但是以上做法依然有问题，因为你调用的方法，其实是 this. 的方式调用的，事务想要生效，还得利用代理来生效，所以这个地方，我们需要获得原始的事务对象， 来操作事务



![1653383810643](http://images.hellocode.top/1653383810643.png)

**集群环境下的并发问题**

通过加锁可以解决在单机情况下的一人一单安全问题，但是在集群模式下就不行了。

1、我们将服务启动两份，端口分别为 8081 和 8082：



![1653373887844](http://images.hellocode.top/1653373887844.png)



2、然后修改 nginx 的 conf 目录下的 nginx.conf 文件，配置反向代理和负载均衡：



![1653373908620](http://images.hellocode.top/1653373908620.png)



*有关锁失效原因分析*

由于现在我们部署了多个 tomcat，每个 tomcat 都有一个属于自己的 jvm，那么假设在服务器 A 的 tomcat 内部，有两个线程，这两个线程由于使用的是同一份代码，那么他们的锁对象是同一个，是可以实现互斥的，但是如果现在是服务器 B 的 tomcat 内部，又有两个线程，但是他们的锁对象写的虽然和服务器 A 一样，但是锁对象却不是同一个，所以线程 3 和线程 4 可以实现互斥，但是却无法和线程 1 和线程 2 实现互斥，这就是 集群环境下，syn 锁失效的原因，在这种情况下，我们就需要使用分布式锁来解决这个问题

![1653374044740](http://images.hellocode.top/1653374044740.png)

### 4、分布式锁

分布式锁：满足分布式系统或集群模式下多进程可见并且互斥的锁。

分布式锁的核心思想就是让大家都使用同一把锁，只要大家使用的是同一把锁，那么我们就能锁住线程，不让线程进行，让程序串行执行，这就是分布式锁的核心思路

![1653374296906](http://images.hellocode.top/1653374296906.png)

**那么分布式锁他应该满足一些什么样的条件呢？**

可见性：多个线程都能看到相同的结果，注意：这个地方说的可见性并不是并发编程中指的内存可见性，只是说多个进程之间都能感知到变化的意思

互斥：互斥是分布式锁的最基本的条件，使得程序串行执行

高可用：程序不易崩溃，时时刻刻都保证较高的可用性

高性能：由于加锁本身就让性能降低，所有对于分布式锁本身需要他就较高的加锁性能和释放锁性能

安全性：安全也是程序中必不可少的一环

![1653381992018](http://images.hellocode.top/1653381992018.png)

**常见的分布式锁有三种**

Mysql：mysql 本身就带有锁机制，但是由于 mysql 性能本身一般，所以采用分布式锁的情况下，其实使用 mysql 作为分布式锁比较少见

Redis：redis 作为分布式锁是非常常见的一种使用方式，现在企业级开发中基本都使用 redis 或者 zookeeper 作为分布式锁，利用 setnx 这个方法，如果插入 key 成功，则表示获得到了锁，如果有人插入成功，其他人插入失败则表示无法获得到锁，利用这套逻辑来实现分布式锁

Zookeeper：zookeeper 也是企业级开发中较好的一个实现分布式锁的方案，由于本套视频并不讲解 zookeeper 的原理和分布式锁的实现，所以不过多阐述

![1653382219377](http://images.hellocode.top/1653382219377.png)

#### 4.1. 核心思路

我们利用 redis 的 setNx 方法，当有多个线程进入时，我们就利用该方法，第一个线程进入时，redis 中就有这个 key 了，返回了 1，如果结果是 1，则表示他抢到了锁，那么他去执行业务，然后再删除锁，退出锁逻辑，没有抢到锁的哥们，等待一定时间后重试即可

![在这里插入图片描述](http://images.hellocode.top/262e1e3b1e734d3faf409a41c9156a48.png)

#### 4.2. 版本一

**锁的基本接口**

![1656079017728](http://images.hellocode.top/1656079017728.png)

**SimpleRedisLock**

利用 setnx 方法进行加锁，同时增加过期时间，防止死锁，此方法可以保证加锁和增加过期时间具有原子性

```java
private String name;
private StringRedisTemplate redisTemplate;

private static final String KEY_PREFIX="lock:";

public SimpleRedisLock(String name, StringRedisTemplate redisTemplate){
    this.name = name;
    this.redisTemplate = redisTemplate;
}

@Override
public boolean tryLock(long timeoutSec) {
    // 获取线程标示
    String threadId = Thread.currentThread().getId()
    // 获取锁
    Boolean success = stringRedisTemplate.opsForValue()
            .setIfAbsent(KEY_PREFIX + name, threadId + "", timeoutSec, TimeUnit.SECONDS);
    return Boolean.TRUE.equals(success);
}
```

- 释放锁逻辑

SimpleRedisLock

释放锁，防止删除别人的锁

```java
public void unlock() {
    //通过del删除锁
    stringRedisTemplate.delete(KEY_PREFIX + name);
}
```

- 修改业务代码

```java
  @Override
    public Result seckillVoucher(Long voucherId) {
        // 1.查询优惠券
        SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
        // 2.判断秒杀是否开始
        if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀尚未开始！");
        }
        // 3.判断秒杀是否已经结束
        if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀已经结束！");
        }
        // 4.判断库存是否充足
        if (voucher.getStock() < 1) {
            // 库存不足
            return Result.fail("库存不足！");
        }
        Long userId = UserHolder.getUser().getId();
        //创建锁对象(新增代码)
        SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
        //获取锁对象
        boolean isLock = lock.tryLock(1200);
        //加锁失败
        if (!isLock) {
            return Result.fail("不允许重复下单");
        }
        try {
            //获取代理对象(事务)
            IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
            return proxy.createVoucherOrder(voucherId);
        } finally {
            //释放锁
            lock.unlock();
        }
    }
```

#### 4.3. 解决误删问题

需求：修改之前的分布式锁实现，满足：在获取锁时存入线程标示（可以用 UUID 表示）

在释放锁时先获取锁中的线程标示，判断是否与当前线程标示一致

- 如果一致则释放锁
- 如果不一致则不释放锁

核心逻辑：在存入锁时，放入自己线程的标识，在删除锁时，判断当前这把锁的标识是不是自己存入的，如果是，则进行删除，如果不是，则不进行删除

![1653387398820](http://images.hellocode.top/1653387398820.png)

具体代码如下：加锁

```java
private static final String KEY_PREFIX="lock:";
// 线程id拼接前缀，保证不同JVM下的线程标识也不一样
private static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-";
@Override
public boolean tryLock(long timeoutSec) {
   // 获取线程标示
   String threadId = ID_PREFIX + Thread.currentThread().getId();
   // 获取锁
   Boolean success = stringRedisTemplate.opsForValue()
                .setIfAbsent(KEY_PREFIX + name, threadId, timeoutSec, TimeUnit.SECONDS);
   return Boolean.TRUE.equals(success);
}
```

释放锁

```java
public void unlock() {
    // 获取线程标示
    String threadId = ID_PREFIX + Thread.currentThread().getId();
    // 获取锁中的标示
    String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
    // 判断标示是否一致
    if(threadId.equals(id)) {
        // 释放锁
        stringRedisTemplate.delete(KEY_PREFIX + name);
    }
}
```

**有关代码实操说明：**

在我们修改完此处代码后，我们重启工程，然后启动两个线程，第一个线程持有锁后，手动释放锁，第二个线程 此时进入到锁内部，再放行第一个线程，此时第一个线程由于锁的 value 值并非是自己，所以不能释放锁，也就无法删除别人的锁，此时第二个线程能够正确释放锁，通过这个案例初步说明我们解决了锁误删的问题

#### 4.4. 原子性问题

线程 1 现在持有锁之后，在执行业务逻辑过程中，他正准备删除锁，而且已经走到了条件判断的过程中，比如他已经拿到了当前这把锁确实是属于他自己的，正准备删除锁，但是此时他的锁到期了，那么此时线程 2 进来，但是线程 1 他会接着往后执行，当他卡顿结束后，他直接就会执行删除锁那行代码，相当于条件判断并没有起到作用，这就是删锁时的原子性问题，之所以有这个问题，是因为线程 1 的拿锁，比锁，删锁，实际上并不是原子性的，我们要防止刚才的情况发生

![1653387764938](http://images.hellocode.top/1653387764938.png)

**Lua 脚本解决多条命令原子性问题**

Redis 提供了 Lua 脚本功能，在一个脚本中编写多条 Redis 命令，确保多条命令执行时的原子性。Lua 是一种编程语言，它的基本语法大家可以参考网站：https://www.runoob.com/lua/lua-tutorial.html，这里重点介绍 Redis 提供的调用函数，我们可以使用 lua 去操作 redis，又能保证他的原子性，这样就可以实现拿锁比锁删锁是一个原子性动作了，作为 Java 程序员这一块并不作一个简单要求，并不需要大家过于精通，只需要知道他有什么作用即可

这里重点介绍 Redis 提供的调用函数，语法如下：

```lua
redis.call('命令名称', 'key', '其它参数', ...)
```

例如，我们要执行 set name jack，则脚本是这样：

```lua
# 执行 set name jack
redis.call('set', 'name', 'jack')
```

例如，我们要先执行 set name Rose，再执行 get name，则脚本如下：

```lua
# 先执行 set name jack
redis.call('set', 'name', 'Rose')
# 再执行 get name
local name = redis.call('get', 'name')
# 返回
return name
```

写好脚本以后，需要用 Redis 命令来调用脚本，调用脚本的常见命令如下：

![1653392181413](http://images.hellocode.top/1653392181413.png)

例如，我们要执行 `redis.call ('set', 'name', 'jack') `这个脚本，语法如下：

![1653392218531](http://images.hellocode.top/1653392218531.png)

如果脚本中的 key、value 不想写死，可以作为参数传递。key 类型参数会放入 KEYS 数组，其它参数会放入 ARGV 数组，在脚本中可以从 KEYS 和 ARGV 数组获取这些参数（*索引从1开始*）：

![1653392438917](http://images.hellocode.top/1653392438917.png)

*释放锁的业务流程：*

1. 获取锁中的线程标示

2. 判断是否与指定的标示（当前线程标示）一致

3. 如果一致则释放锁（删除）

4. 如果不一致则什么都不做

如果用 Lua 脚本来表示则是这样的：

```lua
-- 这里的 KEYS[1] 就是锁的key，这里的ARGV[1] 就是当前线程标示
-- 获取锁中的标示，判断是否与当前线程标示一致
if (redis.call('GET', KEYS[1]) == ARGV[1]) then
  -- 一致，则删除锁
  return redis.call('DEL', KEYS[1])
end
-- 不一致，则直接返回
return 0
```

**利用 Java 代码调用 Lua 脚本改造分布式锁**

lua 脚本本身并不需要大家花费太多时间去研究，只需要知道如何调用，大致是什么意思即可，所以在笔记中并不会详细的去解释这些 lua 表达式的含义。

我们的 RedisTemplate 中，可以利用 `execute` 方法去执行 lua 脚本，参数对应关系就如下图：

![1653393304844](http://images.hellocode.top/1653393304844.png)

```java
private static final DefaultRedisScript<Long> UNLOCK_SCRIPT;
static {
    UNLOCK_SCRIPT = new DefaultRedisScript<>();
    UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
    UNLOCK_SCRIPT.setResultType(Long.class);
}
 
public void unlock() {
    // 调用lua脚本
    stringRedisTemplate.execute(
            UNLOCK_SCRIPT,
            Collections.singletonList(KEY_PREFIX + name),
            ID_PREFIX + Thread.currentThread().getId());
}
```

经过以上代码改造后，我们就能够实现 拿锁比锁删锁的原子性动作了~

**总结**

基于 Redis 的分布式锁实现思路：

- 利用 set nx ex 获取锁，并设置过期时间，保存线程标示
- 释放锁时先判断线程标示是否与自己一致，一致则删除锁

特性：

- 利用 set nx 满足互斥性
- 利用 set ex 保证故障时锁依然能释放，避免死锁，提高安全性
- 利用 Redis 集群保证高可用和高并发特性

### 5、RedisSession

基于 setnx 实现的分布式锁存在下面的问题：

![1653546070602](http://images.hellocode.top/1653546070602.png)

*重入问题*：重入问题是指 获得锁的线程可以再次进入到相同的锁的代码块中，可重入锁的意义在于防止死锁，比如 HashTable 这样的代码中，他的方法都是使用 synchronized 修饰的，假如他在一个方法内，调用另一个方法，那么此时如果是不可重入的，不就死锁了吗？所以可重入锁他的主要意义是防止死锁，我们的 synchronized 和 Lock 锁都是可重入的

*不可重试*：是指目前的分布式只能尝试一次，我们认为合理的情况是：当线程在获得锁失败后，他应该能再次尝试获得锁

*超时释放：*我们在加锁时增加了过期时间，这样的我们可以防止死锁，但是如果卡顿的时间超长，虽然我们采用了 lua 表达式防止删锁的时候，误删别人的锁，但是毕竟没有锁住，有安全隐患

*主从一致性：* 如果 Redis 提供了主从集群，当我们向集群写数据时，主机需要异步的将数据同步给从机，而万一在同步过去之前，主机宕机了，就会出现死锁问题

#### 5.1. 功能介绍

> Redisson 是一个在 Redis 的基础上实现的 Java 驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的 Java 常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现

![1653546736063](http://images.hellocode.top/1653546736063.png)

- 官网地址：https://redisson.org
- GitHub地址：https://github.com/redisson/redisson

#### 5.2. 快速入门

1. 引入依赖：

```java
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.13.6</version>
</dependency>
```

2. 配置 Redisson 客户端：

```java
@Configuration
public class RedissonConfig {
 
    @Bean
    public RedissonClient redissonClient(){
        // 配置
        Config config = new Config();
        config.useSingleServer().setAddress("redis://192.168.150.101:6379")
            .setPassword("123321");
        // 创建RedissonClient对象
        return Redisson.create(config);
    }
}
```

3. 如何使用 Redission 的分布式锁

```java
@Resource
private RedissionClient redissonClient;
 
@Test
void testRedisson() throws Exception{
    //获取锁(可重入)，指定锁的名称
    RLock lock = redissonClient.getLock("anyLock");
    //尝试获取锁，参数分别是：获取锁的最大等待时间(期间会重试)，锁自动释放时间，时间单位
    boolean isLock = lock.tryLock(1,10,TimeUnit.SECONDS);
    //判断获取锁成功
    if(isLock){
        try{
            System.out.println("执行业务");          
        }finally{
            //释放锁
            lock.unlock();
        }
    }
}
```

**融入案例**

```java
@Resource
private RedissonClient redissonClient;
 
@Override
public Result seckillVoucher(Long voucherId) {
        // 1.查询优惠券
        SeckillVoucher voucher = seckillVoucherService.getById(voucherId);
        // 2.判断秒杀是否开始
        if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀尚未开始！");
        }
        // 3.判断秒杀是否已经结束
        if (voucher.getEndTime().isBefore(LocalDateTime.now())) {
            // 尚未开始
            return Result.fail("秒杀已经结束！");
        }
        // 4.判断库存是否充足
        if (voucher.getStock() < 1) {
            // 库存不足
            return Result.fail("库存不足！");
        }
        Long userId = UserHolder.getUser().getId();
        //创建锁对象 这个代码不用了，因为我们现在要使用分布式锁
        //SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
        RLock lock = redissonClient.getLock("lock:order:" + userId);
        //获取锁对象
        boolean isLock = lock.tryLock();
 
        //加锁失败
        if (!isLock) {
            return Result.fail("不允许重复下单");
        }
        try {
            //获取代理对象(事务)
            IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
            return proxy.createVoucherOrder(voucherId);
        } finally {
            //释放锁
            lock.unlock();
        }
 }
```

#### 5.3. 可重入锁原理

在Lock锁中，他是借助于底层的一个voaltile的一个state变量来记录重入的状态的，比如当前没有人持有这把锁，那么state=0，假如有人持有这把锁，那么state=1，如果持有这把锁的人再次持有这把锁，那么state就会+1 ，如果是对于synchronized而言，他在c语言代码中会有一个count，原理和state类似，也是重入一次就加一，释放一次就-1 ，直到减少成0 时，表示当前这把锁没有被人持有

在 redission 中，也支持可重入锁，他采用 hash 结构用来存储锁，其中大 key 表示表示这把锁是否存在，用小 key 表示当前这把锁被哪个线程持有，所以接下来我们一起分析一下当前的这个 lua 表达式

这个地方一共有 3 个参数

- `KEYS [1]` ： 锁名称

- `ARGV [1]`： 锁失效时间

- `ARGV [2]`： id + ":" + threadId; 锁的小 key

```lua
"if (redis.call('exists', KEYS[1]) == 0) then " +
                  "redis.call('hset', KEYS[1], ARGV[2], 1); " +
                  "redis.call('pexpire', KEYS[1], ARGV[1]); " +
                  "return nil; " +
              "end; " +
              "if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then " +
                  "redis.call('hincrby', KEYS[1], ARGV[2], 1); " +
                  "redis.call('pexpire', KEYS[1], ARGV[1]); " +
                  "return nil; " +
              "end; " +
              "return redis.call('pttl', KEYS[1]);"
```

![1653548087334](http://images.hellocode.top/1653548087334.png)

#### 5.4. 锁重试和看门狗机制

**锁重试**

1. tryAcquire()进行加锁，该加锁逻辑和之前是一样的
2. 如果返回锁失效时间，而不是nil，代表加锁失败。
3. 订阅持有锁进程释放锁的信号量，阻塞等待。
4. 信号量发布，继续执行
5. while(true)循环开始
   1. 尝试获取锁
   2. 如果失败，继续等释放锁的信号量，阻塞等待
   3. 信号量发布继续执行循环

> 期间会不停判断是否超过最大等待时间！
>
> 信号量机制使得不会无休止尝试，每一次尝试时都有人释放了锁

```java
public boolean tryLock(long waitTime, long leaseTime, TimeUnit unit) throws InterruptedException {
    long time = unit.toMillis(waitTime);
    long current = System.currentTimeMillis();
    long threadId = Thread.currentThread().getId();
    Long ttl = tryAcquire(waitTime, leaseTime, unit, threadId);
    // lock acquired
    if (ttl == null) {
        return true;
    }
	// 未获取到锁，进入重试环节
    
    // 超过wait_time，直接失败
    time -= System.currentTimeMillis() - current;
    if (time <= 0) {
        acquireFailed(waitTime, unit, threadId);
        return false;
    }

    current = System.currentTimeMillis();
    // 订阅持有锁线程释放锁的信号量
    RFuture<RedissonLockEntry> subscribeFuture = subscribe(threadId);
    // 阻塞等待该信号量的发布
    if (!subscribeFuture.await(time, TimeUnit.MILLISECONDS)) {
        // 阻塞时间超过wait_time，直接失败
        if (!subscribeFuture.cancel(false)) {
            subscribeFuture.onComplete((res, e) -> {
                if (e == null) {
                    unsubscribe(subscribeFuture, threadId);
                }
            });
        }
        acquireFailed(waitTime, unit, threadId);
        return false;
    }

    try {
        // 超过wait_time，直接失败
        time -= System.currentTimeMillis() - current;
        if (time <= 0) {
            acquireFailed(waitTime, unit, threadId);
            return false;
        }

        while (true) {
            long currentTime = System.currentTimeMillis();
            // 尝试获取锁
            ttl = tryAcquire(waitTime, leaseTime, unit, threadId);
            // lock acquired
            if (ttl == null) {
                return true;
            }
			// 获取锁失败
            
            // 超过wait_time，直接失败
            time -= System.currentTimeMillis() - currentTime;
            if (time <= 0) {
                acquireFailed(waitTime, unit, threadId);
                return false;
            }

            // 继续等释放锁的信号量，waiting for message
            currentTime = System.currentTimeMillis();
            if (ttl >= 0 && ttl < time) {
                subscribeFuture.getNow().getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);
            } else {
                subscribeFuture.getNow().getLatch().tryAcquire(time, TimeUnit.MILLISECONDS);
            }
			
            // 超过wait_time，直接失败
            time -= System.currentTimeMillis() - currentTime;
            if (time <= 0) {
                acquireFailed(waitTime, unit, threadId);
                return false;
            }
        }
    } finally {
        unsubscribe(subscribeFuture, threadId);
    }
}
```

**看门狗机制**

1. 传入释放时间，无看门狗机制，调用一次lua脚本设置过期时间
2. 使用默认释放时间，看门狗逻辑自动续约，调用自动续约函数
   1. 10s后自动续约
   2. 续约完成后，递归调用自身（自动续约函数）
   3. 无限续约
3. 锁释放时，会根据一个map找到该线程持有的看门狗线程，并将其取消掉

```java
// 被tryLock方法调用
private RFuture<Boolean> tryAcquireOnceAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {
     // 传入释放时间，无看门狗机制
     if (leaseTime != -1) {
         return tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_NULL_BOOLEAN);
     }
     
     // 释放时间为默认看门狗时间，30s
     RFuture<Boolean> ttlRemainingFuture = tryLockInnerAsync(waitTime,      commandExecutor.getConnectionManager().getCfg().getLockWatchdogTimeout(),
TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_NULL_BOOLEAN);
     
     // 异步任务完成后，如果获取到锁，自动更新续期
     ttlRemainingFuture.onComplete((ttlRemaining, e) -> {
         if (e != null) {
             return;
         }

         // lock acquired
         if (ttlRemaining) {
             scheduleExpirationRenewal(threadId);
         }
     });
     return ttlRemainingFuture;
 }
```

```java
private void renewExpiration() {
    Timeout task = commandExecutor.getConnectionManager().newTimeout(new TimerTask() {
        @Override
        public void run(Timeout timeout) throws Exception {
           	// renewExpirationAsync，重置锁有效期
            RFuture<Boolean> future = renewExpirationAsync(threadId);
            future.onComplete((res, e) -> {
                if (e != null) {
                    log.error("Can't update lock " + getName() + " expiration", e);
                    return;
                }
                
                // 递归调用，效果是下一个10s执行
                if (res) {
                    // reschedule itself
                    renewExpiration();
                }
            });
        }
        // 10s后执行一次task
    }, internalLockLeaseTime / 3, TimeUnit.MILLISECONDS);
    
    ee.setTimeout(task);
}
```

> 假设我们的线程出现了宕机他还会续约吗？当然不会，因为没有人再去调用renewExpiration这个方法，所以等到时间之后自然就释放了

**总结**

- 可重入：利用hash结构记录线程id和重入次数

- 可重试：利用信号量和PubSub功能实现等待、唤醒，获取锁失败的重试机制

- 超时续约：利用watchDog，每隔一段时间（releaseTime / 3），重置超时时间

![image-20221210115241632](http://images.hellocode.top/2215373-20230114214349117-1875050780.png)

#### 5.5. MutiLock 原理

为了提高 redis 的可用性，我们会搭建集群或者主从，现在以主从为例

当我们去写命令，写在主机上， 主机会将数据同步给从机，但是假设在主机还没有来得及把数据写入到从机去的时候，此时主机宕机，哨兵会发现主机宕机，并且选举一个 slave 变成 master，而此时新的 master 中实际上并没有锁信息，此时锁信息就已经丢掉了



![1653553998403](http://images.hellocode.top/1653553998403.png)



**联锁**

为了解决这个问题，redission 提出来了 MutiLock 锁，每个节点的地位都是一样的， 这把锁加锁的逻辑需要写入到每一个主丛节点上，只有所有的服务器都写入成功，此时才是加锁成功，假设现在某个节点挂了，那么他去获得锁的时候，只要有一个节点拿不到，都不能算是加锁成功，就保证了加锁的可靠性

![1653554055048](http://images.hellocode.top/1653554055048.png)

那么 MutiLock 加锁原理是什么呢？

当我们去设置了多个锁时，redission 会将多个锁添加到一个集合中，然后用 while 循环去不停去尝试拿锁，但是会有一个总共的加锁时间，这个时间是用需要加锁的个数 * 1500ms ，假设有 3 个锁，那么时间就是 4500ms，假设在这 4500ms 内，所有的锁都加锁成功， 那么此时才算是加锁成功，如果在 4500ms 有线程加锁失败，则会再次去进行重试



![1653553093967](http://images.hellocode.top/1653553093967.png)

### 6、秒杀优化

#### 6.1. 异步秒杀思路

**下单流程**

当用户发起请求，此时会请求 nginx，nginx 会访问到 tomcat，而 tomcat 中的程序，会进行串行操作，分成如下几个步骤

1. 查询优惠卷
2. 判断秒杀库存是否足够、秒杀是否开始
3. 查询订单
4. 校验是否是一人一单
5. 扣减库存
6. 创建订单

在这六步操作中，又有很多操作是要去操作数据库的，而且还是一个线程串行执行， 这样就会导致我们的程序执行的很慢，所以我们需要异步程序执行，那么如何加速呢？

![1653560986599](http://images.hellocode.top/1653560986599.png)

**优化方案**：我们将耗时比较短的逻辑判断放入到 redis 中，比如是否库存足够，比如是否一人一单，这样的操作，只要这种逻辑可以完成，就意味着我们是一定可以下单完成的，我们只需要进行快速的逻辑判断，根本就不用等下单逻辑走完，我们直接给用户返回成功， 再在后台开一个线程，后台线程慢慢的去执行 queue 里边的消息，这样程序不就超级快了吗？而且也不用担心线程池消耗殆尽的问题，因为这里我们的程序中并没有手动使用任何线程池

- 第一个难点是我们怎么在 redis 中去快速校验一人一单，还有库存判断

- 第二个难点是由于我们校验和 tomct 下单是两个线程，那么我们如何知道到底哪个单他最后是否成功，或者是下单完成，为了完成这件事我们在 redis 操作完之后，我们会将一些信息返回给前端，同时也会把这些信息丢到异步 queue 中去，后续操作中，可以通过这个 id 来查询我们 tomcat 中的下单逻辑是否完成了



![1653561657295](http://images.hellocode.top/1653561657295.png)



我们现在来看看整体思路：当用户下单之后，判断库存是否充足只需要到 redis 中去根据 key 找对应的 value 是否大于 0 即可，如果不充足，则直接结束，如果充足，继续在 redis 中判断用户是否可以下单，如果 set 集合中没有这条数据，说明他可以下单，将 userId 和优惠卷存入到 redis 中，并且返回 0，整个过程需要保证是原子性的，我们可以使用 lua 来操作

当以上判断逻辑走完之后，我们可以判断当前 redis 中返回的结果是否是 0 ，如果是 0，则表示可以下单，则将之前说的信息存入到 queue 中去，返回，然后再来个线程异步下单，前端可以通过返回的订单 id 来判断是否下单成功

![1653562234886](http://images.hellocode.top/1653562234886.png)

#### 6.2. Redis完成秒杀资格判断

- 新增秒杀优惠券的同时，将优惠券信息保存到 Redis 中

- 基于 Lua 脚本，判断秒杀库存、一人一单，决定用户是否抢购成功

- 如果抢购成功，将优惠券 id 和用户 id 封装后存入阻塞队列

- 开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能

  ![1656080546603](http://images.hellocode.top/1656080546603.png)

VoucherServiceImpl

```java
@Override
@Transactional
public void addSeckillVoucher(Voucher voucher) {
    // 保存优惠券
    save(voucher);
    // 保存秒杀信息
    SeckillVoucher seckillVoucher = new SeckillVoucher();
    seckillVoucher.setVoucherId(voucher.getId());
    seckillVoucher.setStock(voucher.getStock());
    seckillVoucher.setBeginTime(voucher.getBeginTime());
    seckillVoucher.setEndTime(voucher.getEndTime());
    seckillVoucherService.save(seckillVoucher);
    // 保存秒杀库存到Redis中(优惠券的数量)
    //SECKILL_STOCK_KEY 这个变量定义在RedisConstans中
    //private static final String SECKILL_STOCK_KEY ="seckill:stock:"
    stringRedisTemplate.opsForValue().set(SECKILL_STOCK_KEY + voucher.getId(), voucher.getStock().toString());
}
```

完整 lua 表达式

```lua
-- 1.参数列表
-- 1.1.优惠券id
local voucherId = ARGV[1]
-- 1.2.用户id
local userId = ARGV[2]
-- 1.3.订单id
local orderId = ARGV[3]
 
-- 2.数据key
-- 2.1.库存key
local stockKey = 'seckill:stock:' .. voucherId
-- 2.2.订单key
local orderKey = 'seckill:order:' .. voucherId
 
-- 3.脚本业务
-- 3.1.判断库存是否充足 get stockKey
if(tonumber(redis.call('get', stockKey)) <= 0) then
    -- 3.2.库存不足，返回1
    return 1
end
-- 3.2.判断用户是否下单 SISMEMBER orderKey userId
if(redis.call('sismember', orderKey, userId) == 1) then
    -- 3.3.存在，说明是重复下单，返回2
    return 2
end
-- 3.4.扣库存 incrby stockKey -1
redis.call('incrby', stockKey, -1)
-- 3.5.下单（保存用户）sadd orderKey userId
redis.call('sadd', orderKey, userId)
-- 3.6.发送消息到队列中， XADD stream.orders * k1 v1 k2 v2 ...
redis.call('xadd', 'stream.orders', '*', 'userId', userId, 'voucherId', voucherId, 'id', orderId)
return 0
```

当以上 lua 表达式执行完毕后，剩下的就是根据步骤 3,4 来执行我们接下来的任务了

VoucherOrderServiceImpl

```java
@Override
public Result seckillVoucher(Long voucherId) {
    //获取用户
    Long userId = UserHolder.getUser().getId();
    long orderId = redisIdWorker.nextId("order");
    // 1.执行lua脚本
    Long result = stringRedisTemplate.execute(
            SECKILL_SCRIPT,
            Collections.emptyList(),
            voucherId.toString(), userId.toString(), String.valueOf(orderId)
    );
    int r = result.intValue();
    // 2.判断结果是否为0
    if (r != 0) {
        // 2.1.不为0 ，代表没有购买资格
        return Result.fail(r == 1 ? "库存不足" : "不能重复下单");
    }
    //TODO 保存阻塞队列
    // 3.返回订单id
    return Result.ok(orderId);
}
```

#### 6.3. 基于阻塞队列实现秒杀优化

VoucherOrderServiceImpl

修改下单动作，现在我们去下单时，是通过 lua 表达式去原子执行判断逻辑，如果判断我出来不为 0 ，则要么是库存不足，要么是重复下单，返回错误信息，如果是 0，则把下单的逻辑保存到队列中去，然后异步执行

```java
//异步处理线程池
private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();
 
//在类初始化之后执行，因为当这个类初始化好了之后，随时都是有可能要执行的
@PostConstruct
private void init() {
   SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
}
// 用于线程池处理的任务
// 当初始化完毕后，就会去从对列中去拿信息
 private class VoucherOrderHandler implements Runnable{
 
        @Override
        public void run() {
            while (true){
                try {
                    // 1.获取队列中的订单信息
                    VoucherOrder voucherOrder = orderTasks.take();
                    // 2.创建订单
                    handleVoucherOrder(voucherOrder);
                } catch (Exception e) {
                    log.error("处理订单异常", e);
                }
             }
        }
 
       // 处理订单信息
       private void handleVoucherOrder(VoucherOrder voucherOrder) {
            //1.获取用户
            Long userId = voucherOrder.getUserId();
            // 2.创建锁对象
            RLock redisLock = redissonClient.getLock("lock:order:" + userId);
            // 3.尝试获取锁
            boolean isLock = redisLock.tryLock();
            // 4.判断是否获得锁成功
            if (!isLock) {
                // 获取锁失败，直接返回失败或者重试
                log.error("不允许重复下单！");
                return;
            }
            try {
                // 注意：由于是spring的事务是放在threadLocal中，此时的是多线程，事务会失效
                // 这个线程进行创建订单
                proxy.createVoucherOrder(voucherOrder);
            } finally {
                // 释放锁
                redisLock.unlock();
            }
    }
     // 阻塞队列
    private BlockingQueue<VoucherOrder> orderTasks = new ArrayBlockingQueue<>(1024 * 1024);
 
    @Override
    public Result seckillVoucher(Long voucherId) {
        Long userId = UserHolder.getUser().getId();
        long orderId = redisIdWorker.nextId("order");
        // 1.执行lua脚本
        Long result = stringRedisTemplate.execute(
                SECKILL_SCRIPT,
                Collections.emptyList(),
                voucherId.toString(), userId.toString(), String.valueOf(orderId)
        );
        int r = result.intValue();
        // 2.判断结果是否为0
        if (r != 0) {
            // 2.1.不为0 ，代表没有购买资格
            return Result.fail(r == 1 ? "库存不足" : "不能重复下单");
        }
        VoucherOrder voucherOrder = new VoucherOrder();
        // 2.3.订单id
        long orderId = redisIdWorker.nextId("order");
        voucherOrder.setId(orderId);
        // 2.4.用户id
        voucherOrder.setUserId(userId);
        // 2.5.代金券id
        voucherOrder.setVoucherId(voucherId);
        // 2.6.放入阻塞队列
        orderTasks.add(voucherOrder);
        //3.获取代理对象
         proxy = (IVoucherOrderService)AopContext.currentProxy();
        //4.返回订单id
        return Result.ok(orderId);
    }
 
    @Transactional
    public void createVoucherOrder(VoucherOrder voucherOrder) {
        Long userId = voucherOrder.getUserId();
        // 5.1.查询订单
        int count = query().eq("user_id", userId).eq("voucher_id", voucherOrder.getVoucherId()).count();
        // 5.2.判断是否存在
        if (count > 0) {
            // 用户已经购买过了
           log.error("用户已经购买过了");
           return ;
        }
 
        // 6.扣减库存
        boolean success = seckillVoucherService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("voucher_id", voucherOrder.getVoucherId()).gt("stock", 0) // where id = ? and stock > 0
                .update();
        if (!success) {
            // 扣减失败
            log.error("库存不足");
            return ;
        }
        save(voucherOrder);
 
    }
```

**小总结：**

秒杀业务的优化思路是什么？

- 先利用 Redis 完成库存余量、一人一单判断，完成抢单业务
- 再将下单业务放入阻塞队列，利用独立线程异步下单
- 基于阻塞队列的异步秒杀存在哪些问题？
  - 内存限制问题
  - 数据安全问题

### 7、消息队列

#### 7.1. 认识消息队列

什么是消息队列：字面意思就是存放消息的队列。最简单的消息队列模型包括 3 个角色：

- 消息队列：存储和管理消息，也被称为消息代理（Message Broker）
- 生产者：发送消息到消息队列
- 消费者：从消息队列获取消息并处理消息

![1653574849336](http://images.hellocode.top/1653574849336.png)

使用队列的好处在于 *解耦*：所谓解耦，举一个生活中的例子就是：快递员 (生产者) 把快递放到快递柜里边 (Message Queue) 去，我们 (消费者) 从快递柜里边去拿东西，这就是一个异步，如果耦合，那么这个快递员相当于直接把快递交给你，这事固然好，但是万一你不在家，那么快递员就会一直等你，这就浪费了快递员的时间，所以这种思想在我们日常开发中，是非常有必要的

这种场景在我们秒杀中就变成了：我们下单之后，利用 redis 去进行校验下单条件，再通过队列把消息发送出去，然后再启动一个线程去消费这个消息，完成解耦，同时也加快我们的响应速度

这里我们可以使用一些现成的 mq，比如 kafka，rabbitmq 等等，我们也可以直接使用 redis 提供的 mq 方案，降低我们的部署和学习成本

#### 7.2. 基于 List 实现消息队列

**基于 List 结构模拟消息队列**

消息队列（Message Queue），字面意思就是存放消息的队列。而 Redis 的 list 数据结构是一个双向链表，很容易模拟出队列效果。

队列是入口和出口不在一边，因此我们可以利用：LPUSH 结合 RPOP、或者 RPUSH 结合 LPOP 来实现。

不过要注意的是，当队列中没有消息时 RPOP 或 LPOP 操作会返回 null，并不像 JVM 的阻塞队列那样会阻塞并等待消息。因此这里应该使用 BRPOP 或者 BLPOP 来实现阻塞效果

![1653575176451](http://images.hellocode.top/1653575176451.png)

基于 List 的消息队列有哪些优缺点？
优点：

- 利用 Redis 存储，不受限于 JVM 内存上限
- 基于 Redis 的持久化机制，数据安全性有保证
- 可以满足消息有序性

缺点：

- 无法避免消息丢失
- 只支持单消费者

#### 7.3. 基于 PubSub 的消息队列

PubSub（发布订阅）是 Redis2.0 版本引入的消息传递模型。顾名思义，消费者可以订阅一个或多个 channel，生产者向对应 channel 发送消息后，所有订阅者都能收到相关消息

- `SUBSCRIBE channel [channel]` ：订阅一个或多个频道
- `PUBLISH channel msg` ：向一个频道发送消息
- `PSUBSCRIBE pattern [pattern]` ：订阅与 pattern 格式匹配的所有频道

![1653575506373](http://images.hellocode.top/1653575506373.png)

优点：

- 采用发布订阅模型，支持多生产、多消费

缺点：

- 不支持数据持久化
- 无法避免消息丢失
- 消息堆积有上限，超出时数据丢失

#### 7.4. 基于 Stream 的消息队列

Stream 是 Redis 5.0 引入的一种新数据类型，可以实现一个功能非常完善的消息队列

发送消息的命令：

![1653577301737](http://images.hellocode.top/1653577301737.png)

例如：

![1653577349691](http://images.hellocode.top/1653577349691.png)

读取消息的方式之一：XREAD

![1653577445413](http://images.hellocode.top/1653577445413.png)

例如，使用 XREAD 读取第一个消息：

![1653577643629](http://images.hellocode.top/1653577643629.png)

XREAD 阻塞方式，读取最新的消息：

![1653577659166](http://images.hellocode.top/1653577659166.png)

在业务开发中，我们可以循环的调用 XREAD 阻塞方式来查询最新消息，从而实现持续监听队列的效果，伪代码如下

![1653577689129](http://images.hellocode.top/1653577689129.png)

注意：当我们指定起始 ID 为 $ 时，代表读取最新的消息，如果我们处理一条消息的过程中，又有超过 1 条以上的消息到达队列，则下次获取时也只能获取到最新的一条，会出现漏读消息的问题

STREAM 类型消息队列的 XREAD 命令特点：

- 消息可回溯
- 一个消息可以被多个消费者读取
- 可以阻塞读取
- 有消息漏读的风险

#### 7.5. 基于 Stream 的消息队列 - 消费者组

消费者组（Consumer Group）：将多个消费者划分到一个组中，监听同一个队列。具备下列特点：



![1653577801668](http://images.hellocode.top/1653577801668.png)



**创建消费者组**

![1653577984924](http://images.hellocode.top/1653577984924.png)

- key：队列名称
- groupName：消费者组名称
- ID：起始 ID 标示，`$`代表队列中最后一个消息，0 则代表队列中第一个消息
- MKSTREAM：队列不存在时自动创建队列

**删除指定的消费者组**

```shell
XGROUP DESTORY key groupName
```

**给指定的消费者组添加消费者**

```java
XGROUP CREATECONSUMER key groupname consumername
```

**删除消费者组中的指定消费者**

```java
XGROUP DELCONSUMER key groupname consumername
```

**从消费者组读取消息**

```java
XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]
```

- group：消费组名称

- consumer：消费者名称，如果消费者不存在，会自动创建一个消费者

- count：本次查询的最大数量

- BLOCK milliseconds：当没有消息时最长等待时间

- NOACK：无需手动 ACK，获取到消息后自动确认

- STREAMS key：指定队列名称

- ID：获取消息的起始 ID

  - `>`：从下一个未消费的消息开始

  - 其它：根据指定 id 从 pending-list 中获取已消费但未确认的消息，例如 0，是从 pending-list 中的第一个消息开始

**消费者监听消息的基本思路**

![1653578211854](http://images.hellocode.top/1653578211854.png)

STREAM 类型消息队列的 XREADGROUP 命令特点：

- 消息可回溯
- 可以多消费者争抢消息，加快消费速度
- 可以阻塞读取
- 没有消息漏读的风险
- 有消息确认机制，保证消息至少被消费一次

![1653578560691](http://images.hellocode.top/1653578560691.png)

#### 7.6. 基于 Redis 的消息队列实现异步秒杀下单

需求：

- 创建一个 Stream 类型的消息队列，名为 stream.orders
- 修改之前的秒杀下单 Lua 脚本，在认定有抢购资格后，直接向 stream.orders 中添加消息，内容包含 voucherId、userId、orderId
- 项目启动时，开启一个线程任务，尝试获取 stream.orders 中的消息，完成下单

修改 lua 表达式，新增 3.6

![1656082824939](http://images.hellocode.top/1656082824939.png)

VoucherOrderServiceImpl

```java
private class VoucherOrderHandler implements Runnable {
 
    @Override
    public void run() {
        while (true) {
            try {
                // 1.获取消息队列中的订单信息 XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 >
                List<MapRecord<String, Object, Object>> list = stringRedisTemplate.opsForStream().read(
                    Consumer.from("g1", "c1"),
                    StreamReadOptions.empty().count( 1).block(Duration.ofSeconds(2)),
                    StreamOffset.create("stream.orders", ReadOffset.lastConsumed())
                );
                // 2.判断订单信息是否为空
                if (list == null || list.isEmpty()) {
                    // 如果为null，说明没有消息，继续下一次循环
                    continue;
                }
                // 解析数据
                MapRecord<String, Object, Object> record = list.get(0);
                Map<Object, Object> value = record.getValue();
                VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(value, new VoucherOrder(), true);
                // 3.创建订单
                createVoucherOrder(voucherOrder);
                // 4.确认消息 XACK
                stringRedisTemplate.opsForStream().acknowledge("s1", "g1", record.getId());
            } catch (Exception e) {
                log.error("处理订单异常", e);
                //处理异常消息
                handlePendingList();
            }
        }
    }
 
    private void handlePendingList() {
        while (true) {
            try {
                // 1.获取pending-list中的订单信息 XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 0
                List<MapRecord<String, Object, Object>> list = stringRedisTemplate.opsForStream().read(
                    Consumer.from("g1", "c1"),
                    StreamReadOptions.empty().count(1),
                    StreamOffset.create("stream.orders", ReadOffset.from("0"))
                );
                // 2.判断订单信息是否为空
                if (list == null || list.isEmpty()) {
                    // 如果为null，说明没有异常消息，结束循环
                    break;
                }
                // 解析数据
                MapRecord<String, Object, Object> record = list.get(0);
                Map<Object, Object> value = record.getValue();
                VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(value, new VoucherOrder(), true);
                // 3.创建订单
                createVoucherOrder(voucherOrder);
                // 4.确认消息 XACK
                stringRedisTemplate.opsForStream().acknowledge("s1", "g1", record.getId());
            } catch (Exception e) {
                log.error("处理pendding订单异常", e);
                try{
                    Thread.sleep(20);
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

### 8、达人探店

#### 8.1. 发布探店笔记

探店笔记类似点评网站的评价，往往是图文结合。对应的表有两个：

- tb_blog：探店笔记表，包含笔记中的标题、文字、图片等
- tb_blog_comments：其他用户对探店笔记的评价

**具体发布流程**

![1653578992639](http://images.hellocode.top/1653578992639.png)

*上传接口*

```java
@Slf4j
@RestController
@RequestMapping("upload")
public class UploadController {
 
    @PostMapping("blog")
    public Result uploadImage(@RequestParam("file") MultipartFile image) {
        try {
            // 获取原始文件名称
            String originalFilename = image.getOriginalFilename();
            // 生成新文件名
            String fileName = createNewFileName(originalFilename);
            // 保存文件
            image.transferTo(new File(SystemConstants.IMAGE_UPLOAD_DIR, fileName));
            // 返回结果
            log.debug("文件上传成功，{}", fileName);
            return Result.ok(fileName);
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败", e);
        }
    }
 
}
```

> 注意：在操作时，需要修改 `SystemConstants.IMAGE_UPLOAD_DIR` 为自己图片所在的地址，在实际开发中图片一般会放在 nginx 上或者是云存储上

*BlogController*

```java
@RestController
@RequestMapping("/blog")
public class BlogController {
 
    @Resource
    private IBlogService blogService;
 
    @PostMapping
    public Result saveBlog(@RequestBody Blog blog) {
        //获取登录用户
        UserDTO user = UserHolder.getUser();
        blog.setUserId(user.getId());
        //保存探店博文
        blogService.saveBlog(blog);
        //返回id
        return Result.ok(blog.getId());
    }
}
```

#### 8.2. 查看探店笔记

![1653579931626](http://images.hellocode.top/1653579931626.png)

*BlogServiceImpl*

```java
@Override
public Result queryBlogById(Long id) {
    // 1.查询blog
    Blog blog = getById(id);
    if (blog == null) {
        return Result.fail("笔记不存在！");
    }
    // 2.查询blog有关的用户
    queryBlogUser(blog);
 
    return Result.ok(blog);
}
```

#### 8.3. 点赞功能

*初始代码*

```java
@GetMapping("/likes/{id}")
public Result queryBlogLikes(@PathVariable("id") Long id) {
    //修改点赞数量
    blogService.update().setSql("liked = liked +1 ").eq("id",id).update();
    return Result.ok();
}
```

- 问题分析：这种方式会导致一个用户无限点赞，明显是不合理的

- 造成这个问题的原因是，我们现在的逻辑，发起请求只是给数据库 + 1，所以才会出现这个问题

![1653581590453](http://images.hellocode.top/1653581590453.png)

**完善点赞功能**

需求

- 同一个用户只能点赞一次，再次点击则取消点赞
- 如果当前用户已经点赞，则点赞按钮高亮显示（前端已实现，判断字段 Blog 类的 isLike 属性）

实现步骤

- 给 Blog 类中添加一个 isLike 字段，标示是否被当前用户点赞
- 修改点赞功能，利用 Redis 的 set 集合判断是否点赞过，未点赞过则点赞数 + 1，已点赞过则点赞数 - 1
- 修改根据 id 查询 Blog 的业务，判断当前登录用户是否点赞过，赋值给 isLike 字段
- 修改分页查询 Blog 业务，判断当前登录用户是否点赞过，赋值给 isLike 字段

具体步骤：

1. 在 Blog 添加一个字段

```java
@TableField(exist = false)
private Boolean isLike;
```

2. 修改代码

```java
@Override
public Result likeBlog(Long id){
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.判断当前登录用户是否已经点赞
    String key = BLOG_LIKED_KEY + id;
    Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, userId.toString());
    if(BooleanUtil.isFalse(isMember)){
        //3.如果未点赞，可以点赞
        //3.1 数据库点赞数+1
        boolean isSuccess = update().setSql("liked = liked + 1").eq("id", id).update();
        //3.2 保存用户到Redis的set集合
        if(isSuccess){
            stringRedisTemplate.opsForSet().add(key,userId.toString());
        }
    }else{
        //4.如果已点赞，取消点赞
        //4.1 数据库点赞数-1
        boolean isSuccess = update().setSql("liked = liked - 1").eq("id", id).update();
        //4.2 把用户从Redis的set集合移除
        if(isSuccess){
            stringRedisTemplate.opsForSet().remove(key,userId.toString());
        }
    }
```

#### 8.4. 点赞排行榜

在探店笔记的详情页面，应该把给该笔记点赞的人显示出来，比如最早点赞的 TOP5，形成点赞排行榜

之前的点赞是放到 set 集合，但是 set 集合是不能排序的，所以这个时候，可以采用一个可以排序的 set 集合，就是`sortedSet`

![1653805077118](http://images.hellocode.top/1653805077118.png)

我们接下来来对比一下这些集合的区别是什么

所有点赞的人，需要是唯一的，所以我们应当使用 set 或者是 sortedSet

其次我们需要排序，就可以直接锁定使用 sortedSet 

![1653805203758](http://images.hellocode.top/1653805203758.png)

*BlogServiceImpl*

```java
@Override
public Result likeBlog(Long id) {
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.判断当前登录用户是否已经点赞
    String key = BLOG_LIKED_KEY + id;
    Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
    if (score == null) {
        // 3.如果未点赞，可以点赞
        // 3.1.数据库点赞数 + 1
        boolean isSuccess = update().setSql("liked = liked + 1").eq("id", id).update();
        // 3.2.保存用户到Redis的set集合  zadd key value score
        if (isSuccess) {
            stringRedisTemplate.opsForZSet().add(key, userId.toString(), System.currentTimeMillis());
        }
    } else {
        // 4.如果已点赞，取消点赞
        // 4.1.数据库点赞数 -1
        boolean isSuccess = update().setSql("liked = liked - 1").eq("id", id).update();
        // 4.2.把用户从Redis的set集合移除
        if (isSuccess) {
            stringRedisTemplate.opsForZSet().remove(key, userId.toString());
        }
    }
    return Result.ok();
}

private void isBlogLiked(Blog blog) {
    // 1.获取登录用户
    UserDTO user = UserHolder.getUser();
    if (user == null) {
        // 用户未登录，无需查询是否点赞
        return;
    }
    Long userId = user.getId();
    // 2.判断当前登录用户是否已经点赞
    String key = "blog:liked:" + blog.getId();
    Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
    blog.setIsLike(score != null);
}
```

*BlogController*

```java
@GetMapping("/likes/{id}")
public Result queryBlogLikes(@PathVariable("id") Long id) {
    return blogService.queryBlogLikes(id);
}
```

*BlogService*

```java
@Override
public Result queryBlogLikes(Long id) {
    String key = BLOG_LIKED_KEY + id;
    // 1.查询top5的点赞用户 zrange key 0 4
    Set<String> top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);
    if (top5 == null || top5.isEmpty()) {
        return Result.ok(Collections.emptyList());
    }
    // 2.解析出其中的用户id
    List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());
    String idStr = StrUtil.join(",", ids);
    // 3.根据用户id查询用户 WHERE id IN ( 5 , 1 ) ORDER BY FIELD(id, 5, 1)
    List<UserDTO> userDTOS = userService.query()
            .in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list()
            .stream()
            .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
            .collect(Collectors.toList());
    // 4.返回
    return Result.ok(userDTOS);
}
```

### 9、好友关注

#### 9.1. 关注和取消关注

针对用户的操作：可以对用户进行关注和取消关注功能

![1653806140822](http://images.hellocode.top/1653806140822.png)

需求：实现两个接口：

- 关注和取关接口
- 判断是否关注的接口

关注是 User 之间的关系，是博主与粉丝的关系，数据库中有一张 tb_follow 表来标示：

![1653806253817](http://images.hellocode.top/1653806253817.png)

> 注意：这里需要把主键修改为自增长，简化开发

*FollowController*

```java
//关注
@PutMapping("/{id}/{isFollow}")
public Result follow(@PathVariable("id") Long followUserId, @PathVariable("isFollow") Boolean isFollow) {
    return followService.follow(followUserId, isFollow);
}
//取消关注
@GetMapping("/or/not/{id}")
public Result isFollow(@PathVariable("id") Long followUserId) {
      return followService.isFollow(followUserId);
}
```

*FollowService*

```java
// 取消关注service
@Override
public Result isFollow(Long followUserId) {
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.查询是否关注 select count(*) from tb_follow where user_id = ? and follow_user_id = ?
    Integer count = query().eq("user_id", userId).eq("follow_user_id", followUserId).count();
    // 3.判断
    return Result.ok(count > 0);
}

// 关注service
@Override
public Result follow(Long followUserId, Boolean isFollow) {
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    String key = "follows:" + userId;
    // 1.判断到底是关注还是取关
    if (isFollow) {
        // 2.关注，新增数据
        Follow follow = new Follow();
        follow.setUserId(userId);
        follow.setFollowUserId(followUserId);
        boolean isSuccess = save(follow);

    } else {
        // 3.取关，删除 delete from tb_follow where user_id = ? and follow_user_id = ?
        remove(new QueryWrapper<Follow>()
               .eq("user_id", userId).eq("follow_user_id", followUserId));

    }
    return Result.ok();
}
```

#### 9.2. 共同关注

想要去看共同关注的好友，需要首先进入到这个页面，这个页面会发起两个请求

1. 去查询用户的详情

2. 去查询用户的笔记

以上两个功能和共同关注没有什么关系，大家可以自行将笔记中的代码拷贝到 idea 中就可以实现这两个功能了，我们的重点在于共同关注功能

![1653806706296](http://images.hellocode.top/1653806706296.png)

```java
// UserController 根据id查询用户
@GetMapping("/{id}")
public Result queryUserById(@PathVariable("id") Long userId){
    // 查询详情
    User user = userService.getById(userId);
    if (user == null) {
        return Result.ok();
    }
    UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
    // 返回
    return Result.ok(userDTO);
}
 
// BlogController  根据id查询博主的探店笔记
@GetMapping("/of/user")
public Result queryBlogByUserId(
        @RequestParam(value = "current", defaultValue = "1") Integer current,
        @RequestParam("id") Long id) {
    // 根据用户查询
    Page<Blog> page = blogService.query()
            .eq("user_id", id).page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
    // 获取当前页数据
    List<Blog> records = page.getRecords();
    return Result.ok(records);
}
```

需求：利用 Redis 中恰当的数据结构，实现共同关注功能。在博主个人页面展示出当前用户与博主的共同关注

使用我们之前学习过的 set 集合，在 set 集合中，有交集并集补集的 api，我们可以把两人的关注的人分别放入到一个 set 集合中，然后再通过 api 去查看这两个 set 集合中的交集数据。

![1653806973212](http://images.hellocode.top/1653806973212.png)



我们先来改造当前的关注列表

改造原因是因为我们需要在用户关注了某位用户后，需要将数据放入到 set 集合中，方便后续进行共同关注，同时当取消关注时，也需要从 set 集合中进行删除

*FollowServiceImpl*

```java
@Override
public Result follow(Long followUserId, Boolean isFollow) {
    // 1.获取登录用户
    Long userId = UserHolder.getUser().getId();
    String key = "follows:" + userId;
    // 1.判断到底是关注还是取关
    if (isFollow) {
        // 2.关注，新增数据
        Follow follow = new Follow();
        follow.setUserId(userId);
        follow.setFollowUserId(followUserId);
        boolean isSuccess = save(follow);
        if (isSuccess) {
            // 把关注用户的id，放入redis的set集合 sadd userId followerUserId
            stringRedisTemplate.opsForSet().add(key, followUserId.toString());
        }
    } else {
        // 3.取关，删除 delete from tb_follow where user_id = ? and follow_user_id = ?
        boolean isSuccess = remove(new QueryWrapper<Follow>()
                .eq("user_id", userId).eq("follow_user_id", followUserId));
        if (isSuccess) {
            // 把关注用户的id从Redis集合中移除
            stringRedisTemplate.opsForSet().remove(key, followUserId.toString());
        }
    }
    return Result.ok();
}
```

**具体的关注代码：**

*FollowServiceImpl*

```java
@Override
public Result followCommons(Long id) {
    // 1.获取当前用户
    Long userId = UserHolder.getUser().getId();
    String key = "follows:" + userId;
    // 2.求交集
    String key2 = "follows:" + id;
    Set<String> intersect = stringRedisTemplate.opsForSet().intersect(key, key2);
    if (intersect == null || intersect.isEmpty()) {
        // 无交集
        return Result.ok(Collections.emptyList());
    }
    // 3.解析id集合
    List<Long> ids = intersect.stream().map(Long::valueOf).collect(Collectors.toList());
    // 4.查询用户
    List<UserDTO> users = userService.listByIds(ids)
            .stream()
            .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
            .collect(Collectors.toList());
    return Result.ok(users);
}
```

#### 9.3. Feed 流实现方案

当我们关注了用户后，这个用户发了动态，那么我们应该把这些数据推送给用户，这个需求，其实我们又把他叫做 Feed 流，关注推送也叫做 Feed 流，直译为投喂。为用户持续的提供 “沉浸式” 的体验，通过无限下拉刷新获取新的信息。

对于传统的模式的内容解锁：我们是需要用户去通过搜索引擎或者是其他的方式去解锁想要看的内容

![1653808641260](http://images.hellocode.top/1653808641260.png)



对于新型的 Feed 流的的效果：不需要我们用户再去推送信息，而是系统分析用户到底想要什么，然后直接把内容推送给用户，从而使用户能够更加的节约时间，不用主动去寻找。

![1653808993693](http://images.hellocode.top/1653808993693.png)

Feed 流产品有两种常见模式：

**Timeline**：不做内容筛选，简单的按照内容发布时间排序，常用于好友或关注。例如朋友圈

- 优点：信息全面，不会有缺失。并且实现也相对简单
- 缺点：信息噪音较多，用户不一定感兴趣，内容获取效率低

**智能排序**：利用智能算法屏蔽掉违规的、用户不感兴趣的内容。推送用户感兴趣信息来吸引用户

- 优点：投喂用户感兴趣信息，用户粘度很高，容易沉迷
- 缺点：如果算法不精准，可能起到反作用

我们本次针对好友的操作，采用的就是 Timeline 的方式，只需要拿到我们关注用户的信息，然后按照时间排序即可。该模式的实现方案有三种：

- 拉模式
- 推模式
- 推拉结合

**拉模式**：也叫做读扩散

- 该模式的核心含义就是：当张三和李四和王五发了消息后，都会保存在自己的邮箱中，假设赵六要读取信息，那么他会读取他自己的收件箱，此时系统会从他关注的人群中，把他关注人的信息全部都进行拉取，然后在进行排序

- 优点：比较节约空间，因为赵六在读信息时，并没有重复读取，而且读取完之后可以把他的收件箱进行清除

- 缺点：比较延迟，当用户读取数据时才去关注的人里边去读取数据，假设用户关注了大量的用户，那么此时就会拉取海量的内容，对服务器压力巨大

![1653809450816](http://images.hellocode.top/1653809450816.png)



**推模式**：也叫做写扩散

- 推模式是没有写邮箱的，当张三写了一个内容，此时会主动的把张三写的内容发送到他的粉丝收件箱中去，假设此时李四再来读取，就不用再去临时拉取了

- 优点：时效快，不用临时拉取

- 缺点：内存压力大，假设一个大 V 写信息，很多人关注他， 就会写很多分数据到粉丝那边去



![1653809875208](http://images.hellocode.top/1653809875208.png)



**推拉结合模式**：也叫做读写混合，兼具推和拉两种模式的优点。

推拉模式是一个折中的方案，站在发件人这一段，如果是个普通的人，那么我们采用写扩散的方式，直接把数据写入到他的粉丝中去，因为普通的人他的粉丝关注量比较小，所以这样做没有压力，如果是大 V，那么他是直接将数据先写入到一份到发件箱里边去，然后再直接写一份到活跃粉丝收件箱里边去，现在站在收件人这端来看，如果是活跃粉丝，那么大 V 和普通的人发的都会直接写入到自己收件箱里边来，而如果是普通的粉丝，由于他们上线不是很频繁，所以等他们上线时，再从发件箱里边去拉信息

![1653812346852](http://images.hellocode.top/1653812346852.png)

#### 9.4. 推送到粉丝收件箱

需求：

- 修改新增探店笔记的业务，在保存 blog 到数据库的同时，推送到粉丝的收件箱
- 收件箱满足可以根据时间戳排序，必须用 Redis 的数据结构实现
- 查询收件箱数据时，可以实现分页查询

Feed 流中的数据会不断更新，所以数据的角标也在变化，因此不能采用传统的分页模式

传统了分页在 feed 流是不适用的，因为我们的数据会随时发生变化

假设在 t1 时刻，我们去读取第一页，此时 page = 1 ，size = 5 ，那么我们拿到的就是 10~6 这几条记录，假设现在 t2 时候又发布了一条记录，此时 t3 时刻，我们来读取第二页，读取第二页传入的参数是 page=2 ，size=5 ，那么此时读取到的第二页实际上是从 6 开始，然后是 6~2 ，那么我们就读取到了重复的数据，所以 feed 流的分页，不能采用原始方案来做

![1653813047671](http://images.hellocode.top/1653813047671.png)



**Feed 流的滚动分页**

我们需要记录每次操作的最后一条，然后从这个位置开始去读取数据

举个例子：我们从 t1 时刻开始，拿第一页数据，拿到了 10~6，然后记录下当前最后一次拿取的记录，就是 6，t2 时刻发布了新的记录，此时这个 11 放到最顶上，但是不会影响我们之前记录的 6，此时 t3 时刻来拿第二页，第二页这个时候拿数据，还是从 6 后一点的 5 去拿，就拿到了 5-1 的记录。我们这个地方可以采用 sortedSet 来做，可以进行范围查询，并且还可以记录当前获取数据时间戳最小值，就可以实现滚动分页了

![1653813462834](http://images.hellocode.top/1653813462834.png)

核心的意思：就是我们在保存完探店笔记后，获得到当前笔记的粉丝，然后把数据推送到粉丝的 redis 中去

```java
@Override
public Result saveBlog(Blog blog) {
    // 1.获取登录用户
    UserDTO user = UserHolder.getUser();
    blog.setUserId(user.getId());
    // 2.保存探店笔记
    boolean isSuccess = save(blog);
    if(!isSuccess){
        return Result.fail("新增笔记失败!");
    }
    // 3.查询笔记作者的所有粉丝 select * from tb_follow where follow_user_id = ?
    List<Follow> follows = followService.query().eq("follow_user_id", user.getId()).list();
    // 4.推送笔记id给所有粉丝
    for (Follow follow : follows) {
        // 4.1.获取粉丝id
        Long userId = follow.getUserId();
        // 4.2.推送
        String key = FEED_KEY + userId;
        stringRedisTemplate.opsForZSet().add(key, blog.getId().toString(), System.currentTimeMillis());
    }
    // 5.返回id
    return Result.ok(blog.getId());
}
```

#### 9.5. 实现分页查询收邮箱

需求：在个人主页的 “关注” 卡片中，查询并展示推送的 Blog 信息：

1. 每次查询完成后，我们要分析出查询出数据的最小时间戳，这个值会作为下一次查询的条件

2. 我们需要找到与上一次查询相同的查询个数作为偏移量，下次查询时，跳过这些查询过的数据，拿到我们需要的数据

综上：我们的请求参数中就需要携带 lastId：上一次查询的最小时间戳 和偏移量这两个参数

这两个参数第一次会由前端来指定，以后的查询就根据后台结果作为条件，再次传递到后台

![1653819821591](http://images.hellocode.top/1653819821591.png)

定义出来具体的返回值实体类

```java
@Data
public class ScrollResult {
    private List<?> list;
    private Long minTime;
    private Integer offset;
}
```

*BlogController*

注意：RequestParam 表示接受 url 地址栏传参的注解，当方法上参数的名称和 url 地址栏不相同时，可以通过 RequestParam 来进行指定

```java
@GetMapping("/of/follow")
public Result queryBlogOfFollow(
    @RequestParam("lastId") Long max, @RequestParam(value = "offset", defaultValue = "0") Integer offset){
    return blogService.queryBlogOfFollow(max, offset);
}
```

*BlogServiceImpl*

```java
@Override
public Result queryBlogOfFollow(Long max, Integer offset) {
    // 1.获取当前用户
    Long userId = UserHolder.getUser().getId();
    // 2.查询收件箱 ZREVRANGEBYSCORE key Max Min LIMIT offset count
    String key = FEED_KEY + userId;
    Set<ZSetOperations.TypedTuple<String>> typedTuples = stringRedisTemplate.opsForZSet()
        .reverseRangeByScoreWithScores(key, 0, max, offset, 2);
    // 3.非空判断
    if (typedTuples == null || typedTuples.isEmpty()) {
        return Result.ok();
    }
    // 4.解析数据：blogId、minTime（时间戳）、offset
    List<Long> ids = new ArrayList<>(typedTuples.size());
    long minTime = 0; // 2
    int os = 1; // 2
    for (ZSetOperations.TypedTuple<String> tuple : typedTuples) { // 5 4 4 2 2
        // 4.1.获取id
        ids.add(Long.valueOf(tuple.getValue()));
        // 4.2.获取分数(时间戳）
        long time = tuple.getScore().longValue();
        if(time == minTime){
            os++;
        }else{
            minTime = time;
            os = 1;
        }
    }
    os = minTime == max ? os : os + offset;
    // 5.根据id查询blog
    String idStr = StrUtil.join(",", ids);
    List<Blog> blogs = query().in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list();
 
    for (Blog blog : blogs) {
        // 5.1.查询blog有关的用户
        queryBlogUser(blog);
        // 5.2.查询blog是否被点赞
        isBlogLiked(blog);
    }
 
    // 6.封装并返回
    ScrollResult r = new ScrollResult();
    r.setList(blogs);
    r.setOffset(os);
    r.setMinTime(minTime);
 
    return Result.ok(r);
}
```

### 10、附近商户

#### 10.1. GEO 数据结构的基本用法

GEO 就是 Geolocation 的简写形式，代表地理坐标。Redis 在 3.2 版本中加入了对 GEO 的支持，允许存储地理坐标信息，帮助我们根据经纬度来检索数据。常见的命令有：

- GEOADD：添加一个地理空间信息，包含：经度（longitude）、纬度（latitude）、值（member）
- GEODIST：计算指定的两个点之间的距离并返回
- GEOHASH：将指定 member 的坐标转为 hash 字符串形式并返回
- GEOPOS：返回指定 member 的坐标
- GEORADIUS：指定圆心、半径，找到该圆内包含的所有 member，并按照与圆心之间的距离排序后返回。6.x以后已废弃
- GEOSEARCH：在指定范围内搜索 member，并按照与指定点之间的距离排序后返回。范围可以是圆形或矩形。6.2. 新功能
- GEOSEARCHSTORE：与 GEOSEARCH 功能一致，不过可以把结果存储到一个指定的 key。 6.2. 新功能

#### 10.2. 导入店铺数据到 GEO

![1653822036941](http://images.hellocode.top/1653822036941.png)

当我们点击美食之后，会出现一系列的商家，商家中可以按照多种排序方式，我们此时关注的是距离，这个地方就需要使用到我们的 GEO，向后台传入当前 app 收集的地址 (我们此处是写死的) ，以当前坐标作为圆心，同时绑定相同的店家类型 type，以及分页信息，把这几个条件传入后台，后台查询出对应的数据再返回

![1653822021827](http://images.hellocode.top/1653822021827.png)

我们要做的事情是：将数据库表中的数据导入到 redis 中去，redis 中的 GEO，GEO 在 redis 中就一个 menber 和一个经纬度，我们把 x 和 y 轴传入到 redis 做的经纬度位置去，但我们不能把所有的数据都放入到 menber 中去，毕竟作为 redis 是一个内存级数据库，如果存海量数据，redis 还是力不从心，所以我们在这个地方存储他的 id 即可

但是这个时候还有一个问题，就是在 redis 中并没有存储 type，所以我们无法根据 type 来对数据进行筛选，所以我们可以按照商户类型做分组，类型相同的商户作为同一组，以 typeId 为 key 存入同一个 GEO 集合中即可

*HmDianPingApplicationTests*

```java
@Test
void loadShopData() {
    // 1.查询店铺信息
    List<Shop> list = shopService.list();
    // 2.把店铺分组，按照typeId分组，typeId一致的放到一个集合
    Map<Long, List<Shop>> map = list.stream().collect(Collectors.groupingBy(Shop::getTypeId));
    // 3.分批完成写入Redis
    for (Map.Entry<Long, List<Shop>> entry : map.entrySet()) {
        // 3.1.获取类型id
        Long typeId = entry.getKey();
        String key = SHOP_GEO_KEY + typeId;
        // 3.2.获取同类型的店铺的集合
        List<Shop> value = entry.getValue();
        List<RedisGeoCommands.GeoLocation<String>> locations = new ArrayList<>(value.size());
        // 3.3.写入redis GEOADD key 经度 纬度 member
        for (Shop shop : value) {
            // stringRedisTemplate.opsForGeo().add(key, new Point(shop.getX(), shop.getY()), shop.getId().toString());
            locations.add(new RedisGeoCommands.GeoLocation<>(
                    shop.getId().toString(),
                    new Point(shop.getX(), shop.getY())
            ));
        }
        stringRedisTemplate.opsForGeo().add(key, locations);
    }
}
```

#### 10.3. 实现附近商户功能

SpringDataRedis 的 2.3.9 版本并不支持 Redis 6.2 提供的 GEOSEARCH 命令，因此我们需要提示其版本，修改自己的 POM

第一步：导入 pom

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>spring-data-redis</artifactId>
            <groupId>org.springframework.data</groupId>
        </exclusion>
        <exclusion>
            <artifactId>lettuce-core</artifactId>
            <groupId>io.lettuce</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-redis</artifactId>
    <version>2.6.2</version>
</dependency>
<dependency>
    <groupId>io.lettuce</groupId>
    <artifactId>lettuce-core</artifactId>
    <version>6.1.6.RELEASE</version>
</dependency>
```

*ShopController*

```java
@GetMapping("/of/type")
public Result queryShopByType(
        @RequestParam("typeId") Integer typeId,
        @RequestParam(value = "current", defaultValue = "1") Integer current,
        @RequestParam(value = "x", required = false) Double x,
        @RequestParam(value = "y", required = false) Double y
) {
   return shopService.queryShopByType(typeId, current, x, y);
}
```

*ShopServiceImpl*

```java
@Override
    public Result queryShopByType(Integer typeId, Integer current, Double x, Double y) {
        // 1.判断是否需要根据坐标查询
        if (x == null || y == null) {
            // 不需要坐标查询，按数据库查询
            Page<Shop> page = query()
                    .eq("type_id", typeId)
                    .page(new Page<>(current, SystemConstants.DEFAULT_PAGE_SIZE));
            // 返回数据
            return Result.ok(page.getRecords());
        }
 
        // 2.计算分页参数
        int from = (current - 1) * SystemConstants.DEFAULT_PAGE_SIZE;
        int end = current * SystemConstants.DEFAULT_PAGE_SIZE;
 
        // 3.查询redis、按照距离排序、分页。结果：shopId、distance
        String key = SHOP_GEO_KEY + typeId;
        GeoResults<RedisGeoCommands.GeoLocation<String>> results = stringRedisTemplate.opsForGeo() // GEOSEARCH key BYLONLAT x y BYRADIUS 10 WITHDISTANCE
                .search(
                        key,
                        GeoReference.fromCoordinate(x, y),
                        new Distance(5000),
                        RedisGeoCommands.GeoSearchCommandArgs.newGeoSearchArgs().includeDistance().limit(end)
                );
        // 4.解析出id
        if (results == null) {
            return Result.ok(Collections.emptyList());
        }
        List<GeoResult<RedisGeoCommands.GeoLocation<String>>> list = results.getContent();
        if (list.size() <= from) {
            // 没有下一页了，结束
            return Result.ok(Collections.emptyList());
        }
        // 4.1.截取 from ~ end的部分
        List<Long> ids = new ArrayList<>(list.size());
        Map<String, Distance> distanceMap = new HashMap<>(list.size());
        list.stream().skip(from).forEach(result -> {
            // 4.2.获取店铺id
            String shopIdStr = result.getContent().getName();
            ids.add(Long.valueOf(shopIdStr));
            // 4.3.获取距离
            Distance distance = result.getDistance();
            distanceMap.put(shopIdStr, distance);
        });
        // 5.根据id查询Shop
        String idStr = StrUtil.join(",", ids);
        List<Shop> shops = query().in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list();
        for (Shop shop : shops) {
            shop.setDistance(distanceMap.get(shop.getId().toString()).getValue());
        }
        // 6.返回
        return Result.ok(shops);
    }
```

### 11、用户签到

#### 11.1. BitMap 功能演示

我们针对签到功能完全可以通过 mysql 来完成，比如说以下这张表

![1653823145495](http://images.hellocode.top/1653823145495.png)

- 用户一次签到，就是一条记录，假如有 1000 万用户，平均每人每年签到次数为 10 次，则这张表一年的数据量为 1 亿条

- 每签到一次需要使用（8 + 8 + 1 + 1 + 3 + 1）共 22 字节的内存，一个月则最多需要 600 多字节

- 我们如何能够简化一点呢？其实可以考虑小时候一个挺常见的方案，准备一张小小的卡片，你只要签到就打上一个勾，我最后判断你是否签到，其实只需要到小卡片上看一看就知道了，我们可以采用类似这样的方案来实现我们的签到需求

- 按月来统计用户签到信息，签到记录为 1，未签到则记录为 0.

- 把每一个 bit 位对应当月的每一天，形成了映射关系。用 0 和 1 标示业务状态，这种思路就称为位图（BitMap）。这样我们就用极小的空间，来实现了大量数据的表示

Redis 中是利用 string 类型数据结构实现 BitMap，因此最大上限是 512M，转换为 bit 则是 2^32 个 bit 位

![1653824498278](http://images.hellocode.top/1653824498278.png)

BitMap 的操作命令有：

- SETBIT：向指定位置（offset）存入一个 0 或 1
- GETBIT ：获取指定位置（offset）的 bit 值
- BITCOUNT ：统计 BitMap 中值为 1 的 bit 位的数量
- BITFIELD ：操作（查询、修改、自增）BitMap 中 bit 数组中的指定位置（offset）的值
- BITFIELD_RO ：获取 BitMap 中 bit 数组，并以十进制形式返回
- BITOP ：将多个 BitMap 的结果做位运算（与 、或、异或）
- BITPOS ：查找 bit 数组中指定范围内第一个 0 或 1 出现的位置

#### 11.2. 实现签到功能

- 需求：实现签到接口，将当前用户当天签到信息保存到 Redis 中

- 思路：我们可以把年和月作为 bitMap 的 key，然后保存到一个 bitMap 中，每次签到就到对应的位上把数字从 0 变成 1，只要对应是 1，就表明说明这一天已经签到了，反之则没有签到。

我们通过接口文档发现，此接口并没有传递任何的参数，没有参数怎么确实是哪一天签到呢？这个很容易，可以通过后台代码直接获取即可，然后到对应的地址上去修改 bitMap

![1653833970361](http://images.hellocode.top/1653833970361.png)

**代码**

*UserController*

```java
 @PostMapping("/sign")
 public Result sign(){
    return userService.sign();
 }
```

*UserServiceImpl*

```java
@Override
public Result sign() {
    // 1.获取当前登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.获取日期
    LocalDateTime now = LocalDateTime.now();
    // 3.拼接key
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = USER_SIGN_KEY + userId + keySuffix;
    // 4.获取今天是本月的第几天
    int dayOfMonth = now.getDayOfMonth();
    // 5.写入Redis SETBIT key offset 1
    stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
    return Result.ok();
}
```

#### 11.3. 签到统计

**问题 1：**什么叫做连续签到天数？

从最后一次签到开始向前统计，直到遇到第一次未签到为止，计算总的签到次数，就是连续签到天数。



![1653834455899](http://images.hellocode.top/1653834455899.png)



Java 逻辑代码：获得当前这个月的最后一次签到数据，定义一个计数器，然后不停的向前统计，直到获得第一个非 0 的数字即可，每得到一个非 0 的数字计数器 + 1，直到遍历完所有的数据，就可以获得当前月的签到总天数了

**问题 2：**如何得到本月到今天为止的所有签到数据？

`BITFIELD key GET u[dayOfMonth] 0`

假设今天是 10 号，那么我们就可以从当前月的第一天开始，获得到当前这一天的位数，是 10 号，那么就是 10 位，去拿这段时间的数据，就能拿到所有的数据了，那么这 10 天里边签到了多少次呢？统计有多少个 1 即可

**问题 3：如何从后向前遍历每个 bit 位？**

注意：bitMap 返回的数据是 10 进制，哪假如说返回一个数字 8，那么我哪儿知道到底哪些是 0，哪些是 1 呢？我们只需要让得到的 10 进制数字和 1 做与运算就可以了，因为 1 只有遇见 1 才是 1，其他数字都是 0 ，我们把签到结果和 1 进行与操作，每与一次，就把签到结果向右移动一位，以此类推，我们就能完成逐个遍历的效果了

需求：实现下面接口，统计当前用户截止当前时间在本月的连续签到天数

有用户有时间我们就可以组织出对应的 key，此时就能找到这个用户截止这天的所有签到记录，再根据这套算法，就能统计出来他连续签到的次数了

![1653835784444](http://images.hellocode.top/1653835784444.png)

**UserController**

```java
@GetMapping("/sign/count")
public Result signCount(){
    return userService.signCount();
}
```

**UserServiceImpl**

```java
@Override
public Result signCount() {
    // 1.获取当前登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.获取日期
    LocalDateTime now = LocalDateTime.now();
    // 3.拼接key
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = USER_SIGN_KEY + userId + keySuffix;
    // 4.获取今天是本月的第几天
    int dayOfMonth = now.getDayOfMonth();
    // 5.获取本月截止今天为止的所有的签到记录，返回的是一个十进制的数字 BITFIELD sign:5:202203 GET u14 0
    List<Long> result = stringRedisTemplate.opsForValue().bitField(
            key,
            BitFieldSubCommands.create()
                    .get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt(0)
    );
    if (result == null || result.isEmpty()) {
        // 没有任何签到结果
        return Result.ok(0);
    }
    Long num = result.get(0);
    if (num == null || num == 0) {
        return Result.ok(0);
    }
    // 6.循环遍历
    int count = 0;
    while (true) {
        // 6.1.让这个数字与1做与运算，得到数字的最后一个bit位  // 判断这个bit位是否为0
        if ((num & 1) == 0) {
            // 如果为0，说明未签到，结束
            break;
        }else {
            // 如果不为0，说明已签到，计数器+1
            count++;
        }
        // 把数字右移一位，抛弃最后一个bit位，继续下一个bit位
        num >>>= 1;
    }
    return Result.ok(count);
}
```

#### 11.4. 关于使用 bitmap 来解决缓存穿透的方案

回顾**缓存穿透**：

发起了一个数据库不存在的，redis 里边也不存在的数据，通常你可以把他看成一个攻击

解决方案：

- 判断 id<0
- 如果数据库是空，那么就可以直接往 redis 里边把这个空数据缓存起来

第一种解决方案：遇到的问题是如果用户访问的是 id 不存在的数据，则此时就无法生效

第二种解决方案：遇到的问题是：如果是不同的 id 那就可以防止下次过来直击数据

所以我们如何解决呢？

我们可以将数据库的数据，所对应的 id 写入到一个 list 集合中，当用户过来访问的时候，我们直接去判断 list 中是否包含当前的要查询的数据，如果说用户要查询的 id 数据并不在 list 集合中，则直接返回，如果 list 中包含对应查询的 id 数据，则说明不是一次缓存穿透数据，则直接放行

![1653836416586](http://images.hellocode.top/1653836416586.png)



现在的问题是这个主键其实并没有那么短，而是很长的一个 主键

哪怕你单独去提取这个主键，但是在 11 年左右，淘宝的商品总量就已经超过 10 亿个

所以如果采用以上方案，这个 list 也会很大，所以我们可以使用 bitmap 来减少 list 的存储空间

我们可以把 list 数据抽象成一个非常大的 bitmap，我们不再使用 list，而是将 db 中的 id 数据利用哈希思想，比如：

id % bitmap.size = 算出当前这个 id 对应应该落在 bitmap 的哪个索引上，然后将这个值从 0 变成 1，然后当用户来查询数据时，此时已经没有了 list，让用户用他查询的 id 去用相同的哈希算法， 算出来当前这个 id 应当落在 bitmap 的哪一位，然后判断这一位是 0，还是 1，如果是 0 则表明这一位上的数据一定不存在， 采用这种方式来处理，需要重点考虑一个事情，就是误差率，所谓的误差率就是指当发生哈希冲突的时候，产生的误差

![1653836578970](http://images.hellocode.top/1653836578970.png)

### 12、UV 统计

#### 12.1. HyperLogLog

首先我们搞懂两个概念：

- UV：全称 Unique Visitor，也叫独立访客量，是指通过互联网访问、浏览这个网页的自然人。1 天内同一个用户多次访问该网站，只记录 1 次
- PV：全称 Page View，也叫页面访问量或点击量，用户每访问网站的一个页面，记录 1 次 PV，用户多次打开页面，则记录多次 PV。往往用来衡量网站的流量

通常来说 PV 会比 UV 大很多，所以衡量同一个网站的访问量，我们需要综合考虑很多因素，所以我们只是单纯的把这两个值作为一个参考值

UV 统计在服务端做会比较麻烦，因为要判断该用户是否已经统计过了，需要将统计过的用户信息保存。但是如果每个访问的用户都保存到 Redis 中，数据量会非常恐怖，那怎么处理呢？

Hyperloglog (HLL) 是从 Loglog 算法派生的概率算法，用于确定非常大的集合的基数，而不需要存储其所有值。相关算法原理大家可以参考：https://juejin.cn/post/6844903785744056333#heading-0
Redis 中的 HLL 是基于 string 结构实现的，单个 HLL 的内存*永远小于 16kb*，*内存占用低*的令人发指！作为代价，其测量结果是概率性的，*有小于 0.81％的误差*。不过对于 UV 统计来说，这完全可以忽略

![1653837988985](http://images.hellocode.top/1653837988985.png)

#### 12.2. 测试百万数据的统计

测试思路：我们直接利用单元测试，向 HyperLogLog 中添加 100 万条数据，看看内存占用和统计效果如何

![1653838053608](http://images.hellocode.top/1653838053608.png)

经过测试：我们会发生他的误差是在允许范围内，并且内存占用极小

## 五、分布式缓存

![img](http://images.hellocode.top/626a67f57b6a403eb64812ef00f4d7ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 数据丢失问题：Redis是内存存储，服务重启可能会丢失数据
- 并发能力问题：单节点Redis并发能力虽然不错，但也无法满足如618这样的高并发场景
- 故障恢复问题 ： 如果Redis宕机，则服务不可用，需要一种自动的故障恢复手段
- 存储能力问题： Redis基于内存，单节点能存储的数据量难以满足海量数据需求

### 1、持久化

- 将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据（RDB）
- 将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程（AOF）

#### 1.1. RDB

- RDB全称是Redis Database Backup file（Redis数据备份文件），也被叫做Redis数据快照。简单来说就是把内存中的所有数据都记录到磁盘中。当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。
- 快照文件称为RDB文件，默认是保存在当前运行目录。

**命令**

- `save`：由Redis主进程来执行RDB，会阻塞所有命令
- `bgsave`：开启子进程执行bgsave，避免主进程受到影响

> Redis停机时会自动的执行一次RDB

![img](http://images.hellocode.top/63326861407a45378d6710545e246731.png)

Redis内部有触发RDB的机制，可以在redis.conf文件中找到，格式如下：

![image-20230125133505701](http://images.hellocode.top/image-20230125133505701.png)

RDB的其他配置也可以在redis.conf中配置：

![image-20230125133623148](http://images.hellocode.top/image-20230125133623148.png)

**fork原理**

> bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入RDB文件

![img](http://images.hellocode.top/a5f62df95bc04c138bc5ea8d4379f389.png)

fork采用的是copy-on-write技术：

- 当主进程执行读操作时，访问共享内存
- 当主进程执行写操作时，则会拷贝一份数据，执行写操作

**小结**

RDB方式bgsave的基本流程？

- fork主进程得到一个子进程，共享内存空间
- 子进程读取内存数据并写入新的RDB文件
- 用新RDB文件替换旧的RDB文件

RDB会在什么时候执行？save 60 1000代表什么含义？

- 默认是服务停止时
- 代表60秒内至少执行1000次修改则触发RDB

RDB的缺点？

- RDB执行间隔时间长，两次RDB之间写入数据有丢失的风险
- fork子进程、压缩、写出RDB文件都比较耗时

#### 1.2. AOF

> AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件

![Redis持久化](http://images.hellocode.top/ea3817210e3844b396b7034247c681d2.png)

**配置**

AOF默认是关闭的，需要修改redis.conf配置文件来开启AOF：

```bash
# 是否开启AOF功能，默认是no
appendonly yes
# AOF文件的名称
appendfilename "appendonly.aof"
```

AOF的命令记录的频率也可以通过redis.conf文件来配：

```bash
# 表示每执行一次写命令，立即记录到AOF文件
appendfsync always 
# 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案
appendfsync everysec 
# 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘
appendfsync no
```

| 配置项   | 刷盘时机     | 优点                   | 缺点                         |
| :------- | :----------- | :--------------------- | :--------------------------- |
| Always   | 同步刷盘     | 可靠性高，几乎不丢数据 | 性能影响大                   |
| everysec | 每秒刷盘     | 性能适中               | 最多丢失1秒数据              |
| no       | 操作系统控制 | 性能最好               | 可靠性较差，可能丢失大量数据 |

**bgrewriteaof**

因为是记录命令，AOF文件会比RDB文件大的多。而且AOF会记录对同一个key的多次写操作，但只有最后一次写操作才有意义。通过执行`bgrewriteaof`命令，可以让AOF文件执行重写功能，用最少的命令达到相同效果

![img](http://images.hellocode.top/cded3545f31535dfd13a31f3a2a09519.webp)

Redis也会在触发阈值时自动去重写AOF文件。阈值也可以在redis.conf中配置：

```bash
# AOF文件比上次文件 增长超过多少百分比则触发重写
auto-aof-rewrite-percentage 100
# AOF文件体积最小多大以上才触发重写
auto-aof-rewrite-min-size 64mb
```

**RDB与AOF的对比**

> RDB和AOF各有自己的优缺点，如果对数据安全性要求较高，在实际开发中往往会*结合*两者来使用

|                | RDB                                          | AOF                                                      |
| :------------- | :------------------------------------------- | :------------------------------------------------------- |
| 持久化方式     | 定时对整个内存做快照                         | 记录每一次执行的命令                                     |
| 数据完整性     | 不完整，两次备份之间会丢失                   | 相对完整，取决于刷盘策略                                 |
| 文件大小       | 会有压缩，文件体积小                         | 记录命令，文件体积很大                                   |
| 宕机恢复速度   | 很快                                         | 慢                                                       |
| 数据恢复优先级 | 低，因为数据完整性不如AOF                    | 高，因为数据完整性更高                                   |
| 系统资源占用   | 高，大量CPU和内存消耗                        | 低，主要是磁盘IO资源  但AOF重写时会占用大量CPU和内存资源 |
| 使用场景       | 可以容忍数分钟的数据丢失，追求更快的启动速度 | 对数据安全性要求较高常见                                 |

### 2、主从

#### 2.1. 搭建主从架构

> 单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要搭建主从集群，实现读写分离

![在这里插入图片描述](http://images.hellocode.top/be71c14569884ffea6869961ab8ccfc6.png)

主从节点搭建以后，主节点可以读和写，从节点只能读不能写

**开启多个Redis服务**

![在这里插入图片描述](http://images.hellocode.top/fa57323e90994007851999f28f74aab1.png)

**建立这些Redis之间的主从关系：**

有临时和永久两种模式：

- 修改配置文件（永久生效），在redis.conf中添加一行配置

  `slaveof <masterip> <masterport>`

- 使用redis-cli客户端连接到redis服务，执行slaveof命令（重启后失效）

  `slaveof <masterip> <masterport>`

> 在5.0版本以后，有了`replicaof`命令，和`slaveof`用法相同

**查看结果：**

执行`INFO replication`命令

![在这里插入图片描述](http://images.hellocode.top/f77370fa5ffe4388a6a2b6f23fe6d9a5.png)

#### 2.2. 主从数据同步原理

**全量同步**

> 主从第一次同步是全量同步

![在这里插入图片描述](http://images.hellocode.top/402f5ff77631458591c75b5c6e6e00d5.png)

master如何判断slave是不是第一次来同步数据？

- replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid。

- offset：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。

因此slave做数据同步，必须向master声明自己的replication id 和offset，master才可以判断到底需要同步哪些数据

- slave在第一次同步的时候，会向master发送自己的id，master判断到它的id和自己不一样，则是第一次请求同步数据，需要做全量同步数据
- master先把自己的id和offset返回给slave同步，然后再通过bgsave生成RDB文件，同时记录RDB期间的所有命令，然后把RDB发送给slave同步，再把repl_baklog中的命令发给slave进行同步

![在这里插入图片描述](http://images.hellocode.top/a83c08bc17c74285bb8d26b23eeade26.png)

**增量同步**

![在这里插入图片描述](http://images.hellocode.top/c8ba2a8adf5244a09cbc23003a50e94e.png)

**优化Redis主从集群**

1. 在master中配置`repl-diskless-sync yes`启用无磁盘复制，避免全量同步时的磁盘IO。
2. Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO
3. 适当提高repl_baklog的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步
4. 限制一个master上的slave节点数量，如果实在是太多slave，则可以采用主-从-从链式结构，减少master压力

![在这里插入图片描述](http://images.hellocode.top/3945378e20fd424cb06bb35511d0a4ca.png)

**总结**

![在这里插入图片描述](http://images.hellocode.top/fe23210097bb42feb92041be690915ee.png)

### 3、哨兵

slave节点宕机恢复后可以找master节点同步数据，那master节点宕机怎么办

#### 3.1. 作用及原理

Redis提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复

![在这里插入图片描述](http://images.hellocode.top/83ca48a54fa64c11ac6538d3644a7aae.png)

**作用**

- 监控：Sentinel 会不断检查您的master和slave是否按预期工作
- 自动故障恢复：如果master故障，Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主

- 通知：Sentinel充当Redis客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给Redis的客户端

> 为了保证哨兵的高可用，哨兵本身也是一个集群

**服务状态监控**

sentinel基于心跳机制监测服务状态，每隔1s向集群的每个实例发送ping命令：

- 主观下线：如果某sentinel节点发现某实例未在规定时间响应，则认为该实例主观下线
- 客观下线：若超过指定数量（quorum）的sentinel都认为该实例主观下线，则该实例客观下线。quorum值最好超过sentinel实例数量的一半

![img](http://images.hellocode.top/c670f7db6a154ec88026a58988f0e1ee.png)

**选举新的master**

一旦发现master故障，sentinel需要在slave中选择一个作为新的master，选择依据是这样的：

- 首先会判断slave节点与master节点断开时间长短，如果超过指定值（down- after- millisecond * 10）则会排除该slave节点
- 然后判断slave节点的slave- priority值，越小优先级越高，如果是0则永不参与选举
- 如果slave- priority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高
- 最后是判断slave节点的运行id大小，越小优先级越高

**如何实现故障转移**

当选中了其中一个slave为新的master后（例如slave1），故障的转移的步骤如下：

- sentinel给备选的slave节点发送slaveof no one命令，让该节点成为master
- sentinel给所有其它slave发送slaveof 新主节点ip 端口命令，让这些slave成为新master的从节点，开始从新的master上同步数据
- 最后，sentinel将故障节点标记为slave，当故障节点恢复后会自动成为新的master的slave节点

**总结**

sentinel的三个作用是什么？

- 监控、故障转移、通知

sentinel如何判断一个redis实例是否健康？

- 每隔1s发送一次ping命令，如果超过一定时间没有响应则认为是主观下线
- 如果大多数sentinel都认为实例主观下线，则判定服务下线

故障转移步骤有哪些？

- 首先选定一个slave作为新的master，执行slaveof no one
- 然后让所有节点都执行slaveof 新master
- 修改故障节点配置，添加slaveof 新master

#### 3.2. 搭建哨兵集群

要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。

我们创建三个文件夹，名字分别叫s1、s2、s3：

```bash
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir s1 s2 s3
```

如图：

![](http://images.hellocode.top/202205_49911651848489016.jpg)

然后我们在s1目录创建一个sentinel.conf文件，添加下面的内容：

```bash
port 27001
sentinel announce-ip 192.168.36.128
# mymaster是集群的名称，此行指定当前mymaster集群中master服务器的地址和端口 
# 2为法定人数限制(quorum)，即有几个sentinel认为master down了就进行故障转移，一般此值是所有 sentinel节点(一般总数是>=3的 奇数,如:3,5,7等)
# 的一半以上的整数值，比如，总数是3，即3/2=1.5， 取整为2,是master的ODOWN客观下线的依据
sentinel monitor mymaster 192.168.36.128 7001 2
#设置连接master和slave时的密码，注意的是sentinel不能分别为master和slave设置不同的密码，因此master和slave的密码应该设置相同。
sentinel auth-pass mymaster 123456 
#这个配置项指定了需要多少失效时间，一个master才会被这个sentinel主观地认为是不可用的。 单位是毫秒，默认为30秒
sentinel down-after-milliseconds mymaster 5000
#当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了。
sentinel failover-timeout mymaster 60000
# 发生故障转移后，可以同时向新master同步数据的slave的数量，数字越小总同步时间越长，但可以减轻新 master的负载压力
sentinel parallel-syncs mymaster 1 
dir "/tmp/s1"
```

- `port 27001`：是当前sentinel实例的端口
- `sentinel monitor mymaster 192.168.36.128 7001 2`：指定主节点信息
- `mymaster`：主节点名称，自定义，任意写
- `192.168.36.128 7001`：主节点的ip和端口
- `2`：选举master时的quorum值，主观下线到客观下线的一个阈值

然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在/tmp目录执行下列命令）：

```bash
# 方式一：逐个拷贝
cp s1/sentinel.conf s2
cp s1/sentinel.conf s3
# 方式二：管道组合命令，一键拷贝
echo s2 s3 | xargs -t -n 1 cp s1/sentinel.conf
```

修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：

```bash
sed -i -e 's/27001/27002/g' -e 's/s1/s2/g' s2/sentinel.conf
sed -i -e 's/27001/27003/g' -e 's/s1/s3/g' s3/sentinel.conf
```

##### 启动

为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：

```bash
# 第1个
redis-sentinel s1/sentinel.conf
# 第2个
redis-sentinel s2/sentinel.conf
# 第3个
redis-sentinel s3/sentinel.conf
```

启动后：

![](http://images.hellocode.top/202205_73171651848489469.jpg)

##### 测试

尝试让master节点7001宕机，查看sentinel日志：

![](http://images.hellocode.top/202205_38981651848490012.jpg)

查看7003的日志：

![](http://images.hellocode.top/202205_53451651848491565.jpg)

查看7002的日志：

![](http://images.hellocode.top/202205_71221651848491944.jpg)

#### 3.3. RedisTemplate的哨兵模式

在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化，及时更新连接信息。Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换

**引入依赖**

在项目的pom文件中引入依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**配置Redis地址**

然后在配置文件application.yml中指定redis的sentinel相关信息：

```yml
spring:
  redis:
    sentinel:
      master: mymaster
      nodes:
        - 192.168.150.101:27001
        - 192.168.150.101:27002
        - 192.168.150.101:27003
```

**配置读写分离**

在项目的启动类中，添加一个新的bean：

```java
@Bean
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

这个bean中配置的就是读写策略，包括四种：

- MASTER：从主节点读取
- MASTER_PREFERRED：优先从master节点读取，master不可用才读取replica
- REPLICA：从slave（replica）节点读取
- REPLICA _PREFERRED：优先从slave（replica）节点读取，所有的slave都不可用才读取master

### 4、分片集群

主从和哨兵可以解决高可用、高并发读的问题，但是依然有两个问题没有解决：

- 海量数据存储问题，单个Redis节点对于数据的存储量是有上限的
- 高并发写的问题，高并发读的问题我们可以用主从集群来解决，那高并发写的问题又该怎样解决呢

针对上述问题，我们可以搭建Redis的分片集群，如图所示：

![在这里插入图片描述](http://images.hellocode.top/b0af165fa4224d1582e6e10991ce5bc7.png)

Redis的分片集群具有以下特征：

- 集群中有多个master，每个master保存不同数据
- 每个master都可以有多个slave节点
- master之间通过ping监测彼此健康状态（可以取代哨兵机制）
- 客户端请求可以访问集群任意节点，最终都会被转发到正确节点

#### 4.1. 搭建分片集群

分片集群需要的节点数量较多，这里我们搭建一个最小的分片集群，包含3个master节点，每个master包含一个slave节点，结构如下：

![在这里插入图片描述](http://images.hellocode.top/062ae4f944864ec5b41aceb63f10cc4d.png)

这里我们会在同一台虚拟机中开启6个redis实例，模拟分片集群，信息如下：

|       IP       | PORT |  角色  |
| :------------: | :--: | :----: |
| 192.168.36.128 | 7001 | master |
| 192.168.36.128 | 7002 | master |
| 192.168.36.128 | 7003 | master |
| 192.168.36.128 | 8001 | slave  |
| 192.168.36.128 | 8002 | slave  |
| 192.168.36.128 | 8003 | slave  |

**准备实例和配置**

这里我的redis安装目录为/usr/local/redis-6.2.6，以下操作将以此目录进行参考，额外需要注意的是，以下操作都是在redis没有设置密码的情况下进行的，如果你的redis设置了密码，那么按照以下步骤进行就会出问题。

1. 创建出7001、7002、7003、8001、8002、8003目录

```bash
# 进入/local目录
cd /usr/local
# 创建目录
mkdir 7001 7002 7003 8001 8002 8003
```

2. 在/usr/local下准备一个新的redis.conf文件，内容如下：

```bash
port 6379
# 开启集群功能
cluster-enabled yes
# 集群的配置文件名称，不需要我们创建，由redis自己维护
cluster-config-file /usr/local/6379/nodes.conf
# 节点心跳失败的超时时间
cluster-node-timeout 5000
# 持久化文件存放目录
dir /usr/local/6379
# 绑定地址
bind 0.0.0.0
# 让redis后台运行
daemonize yes
# 注册的实例ip
replica-announce-ip 192.168.211.100
# 保护模式
protected-mode no
# 数据库数量
databases 1
# 日志
logfile /usr/local/6379/run.log
```

3. 将这个文件拷贝到每个目录下：

```bash
# 进入/local目录
cd /usr/local
# 执行拷贝
echo 7001 7002 7003 8001 8002 8003 | xargs -t -n 1 cp redis.conf
```

4. 修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：

```bash
# 进入/local目录
cd /usr/local
# 修改配置文件
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf
```

**启动**

因为已经配置了后台启动模式，所以可以直接启动服务：

```bash
# 进入/usr/local目录
cd /usr/local
# 一键启动所有服务
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-server {}/redis.conf
```

通过ps查看状态：

```bash
ps -ef | grep redis
```

如果要关闭所有进程，可以执行命令：

```bash
ps -ef | grep redis | awk '{print $2}' | xargs kill
```

或者（推荐这种方式）：

```bash
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-cli -p {} shutdown
```

**创建集群**

虽然服务启动了，但是目前每个服务之间都是独立的，没有任何关联。我们需要执行以下命令来创建集群，注意，以下命令需要你的redis版本在5.0之后：

```bash
redis-cli --cluster create --cluster-replicas 1 192.168.36.128:7001 192.168.36.128:7002 192.168.36.128:7003 192.168.36.128:8001 192.168.36.128:8002 192.168.36.128:8003
```

命令说明：

- `redis-cli --cluster`：代表集群操作命令
- `create`：代表创建集群
- `--cluster-replicas 1 `：指定集群中每个master的副本个数为1，也就是说一个master只有一个slave，此时节点总数 ÷ (replicas + 1) 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，在创建集群时这些slave会被随机分配给不同master

执行上述命令之后，控制台会列出当前主从节点分配的结果，即将那些slave分别分配给哪些master，并询问你是否同意，这里我们输入`'yes'`即可

![在这里插入图片描述](http://images.hellocode.top/9997d27e07694c93af8a099fcec3960b.png)

确定之后，集群开始创建

![在这里插入图片描述](http://images.hellocode.top/fc4cff829b004174acdd7f5a39eac784.png)

通过命令可以查看集群状态：

```bash
redis-cli -p 7001 cluster nodes
```

**测试**

集群操作时，需要在redis-cli连接时带上-c参数才可以

```bash
redis-cli -c -p 7001
```

通过观察上述从节点的状态，我们发现7001的slave是8001，我们可以尝试在7001里插入一个数字，再从8001里获取

![在这里插入图片描述](http://images.hellocode.top/e783ad3853e149ccb2efe8e29a264ce1.png)

事实上，我们不仅可以从8001里获取到num，也可以从其他slave甚至其他master里获取到num：

![在这里插入图片描述](http://images.hellocode.top/ce798473426b4c91b553d90582786a89.png)

而且我们发现，当我们试图从其他节点获取num时，最后都会跳转到7001，为什么会这样呢？这就涉及到我们即将讲解的插槽原理

#### 4.2. 散列插槽

一个Redis分片集群有0~16383共16384个插槽（hash slot），这些插槽会被平均分给每一个master节点，一个master节点映射着一部分插槽，这一点在集群创建时的信息中可以看到

![在这里插入图片描述](http://images.hellocode.top/4dff51903d0a439db1d522d217e638b5.png)

在分片集群中，数据key并不是与某个节点绑定，而是与插槽绑定。数据key与插槽是多对一的关系，redis会根据key的有效部分计算插槽值，然后将key放入对应插槽，key的有效部分分两种情况：

- 当key中包含`{}`时，且`{}`中至少包含1个字符，`{}`中的部分是有效部分
- key中不包含`{}`，整个key都是有效部分

举个例子，假如key是num，那么插槽值就会根据num来计算，如果key是{itheima}num，那么插槽值就会根据itheima来计算。计算方式是利用CRC16算法得到一个hash值，然后对16384取余，得到的结果就是slot值。

如果当前操作的key所在的插槽不属于本节点，则会发生重定向，重定向的目标是该插槽所属的节点，这个节点一定是master，如果我们连接的节点为slave，则会直接进行重定向，因为slave是没有插槽的。

针对上述几点，演示如下：

![在这里插入图片描述](http://images.hellocode.top/64c3d22061ba4d38b9a8a7d13a7d0945.png)

如上图所示，我们连接了7001，并试图插入数据k1，这时redis需要去判断k1所属的插槽位置，由于key中不包含`{}`，因此整个key都是有效部分，redis会对k1做hash运算然后对16384取余，得到的结果是12706，这也就是k1所在的插槽的位置，在当前集群中，映射该插槽的节点是7003，此时就会发生重定向，我们也可以观察到当我们执行完`set k1 1`命令之后，操作的端口已经变成了7003。此时我们继续在7003端口中进行操作，比如修改数据num的值，而num所在的插槽是2765，在当前集群中，映射该插槽的节点是7001，因此当我们执行完`set num 2`命令之后，操作的端口又重新变成了7001

**几个问题**

*为什么数据key要与插槽绑定，而不是与节点绑定呢？*

这是因为Redis的主节点有可能会出现宕机情况，也有可能由于集群伸缩而被删除，当节点删除或者发生宕机时，节点上保存的数据也就丢失了，但如果数据绑定的是插槽而不是节点，那么当出现上述情况时，就可以将故障节点的插槽转移至存活节点上。这样，数据跟插槽绑定，就永远都能够找到数据所在位置。

*Redis如何判断某个key应该在哪个实例？*

- 将16384个插槽分配到不同的实例
- 根据key的有效部分计算哈希值，对16384取余
- 余数作为插槽，寻找插槽所在实例即可

*如何将同一类数据固定的保存在同一个Redis实例？*

在业务开发中，同一类型的数据key最好是保存在一个插槽中，因为如果分散保存，在我们调用的时候就很可能出现重定向的情况，重定向是会消耗一部分性能的。如果我们希望将同一类型的数据key最好是保存在一个插槽中，可以为这些key带上一个用`{}`包裹的固定前缀，比如`{user}zs`、`{user}ls`等等，因为我们之前说过，当key中包含`{}`，且`{}`中至少包含1个字符时，`{}`中的部分是有效部分，redis会根据这一部分来计算插槽值，如果我们将同一类型的key都加上这类前缀，就能保证这些key在同一个插槽中了

#### 4.3. 集群伸缩

集群已经创建了，那么如果我们想在集群中添加节点或删除节点，又应该怎么做呢？

`redis-cli --cluster`提供了很多操作集群的命令，可以通过下面方式查看：

![在这里插入图片描述](http://images.hellocode.top/dedfdcf4096d4b90871c379dc5bf4ff5.png)

其中就包括添加节点的命令：

![在这里插入图片描述](http://images.hellocode.top/9b7b6551075a4521a83380203ecea9e4.png)

假设现在有以下需求：向集群中添加一个新的master节点7004，并在这个节点中存储 num = 10，执行步骤如下：

**创建节点并添加到集群**

1. 在/usr/local目录下创建一个文件夹：`mkdir 7004`
2. 拷贝配置文件：`cp redis.conf 7004`
3. 修改配置文件：`printf '%s\n' 7004 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf`
4. 启动：`redis-server 7004/redis.conf`

接下来就需要将7004添加到集群中了，在执行添加操作之前，我们先来了解以下添加节点的命令

![在这里插入图片描述](http://images.hellocode.top/2b79b4947c7b446b917e2ecf0c8e51a7.png)

添加节点首先需要以下几个参数：

- `new_host:new_port` ：指定新添加的节点的ip地址与端口号，这个没什么好说的
- `existing_host:existing_port`：任意指定一个集群中已经存在的节点的ip地址与端口号。因为集群中加入新节点是需要通知其他旧节点的，新节点只需要将自己的信息提供给集群中任意一个节点，那么整个集群就都能知道关于新节点的信息了
- `cluster-slave`：可选项，不指定则表示该节点是master，如果指定了则表示该节点是一个slave
- `cluster-master-id <arg>`：如果我们指定了cluster-slave，那么就需要通过该参数指定该节点的master的id

了解了该命令之后，接下来我们来执行添加节点操作：

执行命令：

```bash
redis-cli --cluster add-node  192.168.211.100:7004 192.168.211.100:7001
```

通过命令查看集群状态：

```bash
redis-cli -p 7001 cluster nodes
```

如图，7004加入了集群，并且默认是一个master节点：

![在这里插入图片描述](http://images.hellocode.top/762771e4f323470e909c43b99259e7d2.png)

但是，我们也可以看到7004是没有插槽的，因为插槽已经被其他master瓜分完毕了，因此没有任何数据可以存储到7004上，这时候我们就需要进行插槽的转移，即将其他matser的插槽分出一部分给7004

**转移插槽**

首先回归需求本身，我们的需求是将num=10存储在7004节点上，那么我们的目的就很明显了，首先需要知道num存储在哪个插槽上，然后将这个插槽转移到7004上即可

![在这里插入图片描述](http://images.hellocode.top/a15b896c7a47404e91c31a390024cc0e.png)

如上图所示，num的插槽为2765，该插槽目前是保存在7001上的，因此我们可以将0~3000的插槽从7001转移到7004，转移插槽的命令格式如下：

![在这里插入图片描述](http://images.hellocode.top/5a7e51c4b4014688ae60d78f6f2d0c16.png)

1. 输入转移插槽命令，这里我们需要转移的插槽在7001上，因此需要指定7001的地址

```bash
redis-cli --cluster reshard 192.168.211.100:7001
```

2. 系统会询问我们要移动多少个插槽，这里我们输入3000即可

![在这里插入图片描述](http://images.hellocode.top/9f8552b0275d4e418600c87369a5d8fb.png)

3. 系统接着询问我们需要让哪个节点来接收插槽，这里我们需要输入7004的ID

![在这里插入图片描述](http://images.hellocode.top/39254d9066fe469091eea66ead29b9aa.png)

4. 接着系统会询问我们要从哪些节点中移动这些插槽到7004

![在这里插入图片描述](http://images.hellocode.top/db21db18186f487ead132c964e5b48f6.png)

这里我们有三个选择：

- all：代表全部，也就是三个节点各转移一部分
- 具体的id：目标节点的id
- done：表示结束

这里我们需要从7001中获取插槽，因此填写7001的id，然后输入done表示结束

![在这里插入图片描述](http://images.hellocode.top/b642bf960c594c91959695d772ff3d9a.png)

5. 接下来会冒出一大串东西，并询问我们是否确定要移动这些插槽，这里我们直接输入yes即可

![在这里插入图片描述](http://images.hellocode.top/fa202a46a18a4a7aa7eb9a0e2a10b93f.png)

输入yes之后，等待控制台打印结束，插槽也就移动完毕了

6. 输入以下命令查看插槽是否已经移动到7004

```bash
redis-cli -p 7001 cluster nodes
```

很显然，我们的目的已经达成了

![在这里插入图片描述](http://images.hellocode.top/ae324221066f4319bcfcb13713d13e1c.png)

**补充**

那么如果我们要删除7004节点，又应该怎样做呢？这里笔者只给去具体思路，大家可以自行尝试一下：

- 先将 7004 分配的插槽转移至其他节点
- 执行删除节点命令redis-cli --cluster del-node host:port node_id
- 通过命令查询结果redis-cli -p 7001 cluster nodes

#### 4.4. 故障转移

之前我们提到过，redis分片集群可以通过master之间的心跳监测来监测彼此之间的健康状态，从而取代哨兵。而我们也知道，哨兵的作用就是监测master和slave的状态，当认为一个master客观下线后，会从slave中选举出一个新的master，现在让我们来验证一下redis分片集群是否具备这个功能。

首先集群的初始状态是这样的，如果状态为connected则表示节点正常连接

![在这里插入图片描述](http://images.hellocode.top/9373ca3843204a4e8853eddeca54b935.png)

其中7001、7002、7003、7004都是master，我们计划让7002宕机

**自动故障转移**

当集群中有一个master宕机会发生什么呢？我们可以直接停止一个redis实例，例如7002：

```bash
redis-cli -p 7002 shutdown
```

1. 首先是该实例与其它实例失去连接
2. 然后是疑似宕机，7002的状态变成了disconnected

![在这里插入图片描述](http://images.hellocode.top/682597414b0443b2be84f117203cc0bf.png)

3. 最后是确定下线，将7002的一个slave提升为新的master，这里由于7002只有一个slave，即8002，因此8002被选为了新的master

![在这里插入图片描述](http://images.hellocode.top/3b151353967f4fe591bc69e218163ae3.png)

4. 接下来我们通过以下命令再次启动7002节点

```bash
redis-server /usr/local/7002/redis.conf
```

当7002再次启动之后，它就已经变为一个slave节点了

![在这里插入图片描述](http://images.hellocode.top/993f8d0fdb0d4aecb128c3c38feba1ce.png)

上面这种叫自动故障转移，但有的时候我们可能需要做手动故障转移，比如当某台master机器比较老旧，需要升级时，我们就可以在这个集群中新增一个节点，让这个节点成为取代原来的master成为新的master，这样原来的master就会变成新master的一个slave，从而实现机器的无感知升级

**手动故障转移**

我们可以在slave节点中使用cluster failover命令，这个命令会让当前slave节点的master暂时宕机，宕机期间会将自身的数据转移给执行命令的slave节点，宕机结束后，之前的master会变成slave，而执行命令的slave会变成新的master。

其详细流程如下：

![在这里插入图片描述](http://images.hellocode.top/56bb13a8a76d492499fa409801c8a526.png)

当slave执行了cluster failover命令之后，就会向master节点发送节点替换通知，为了避免数据的丢失，master接收到slave节点发送过来的通知后，就会暂时拒绝来自客户端的任何数据读写请求。然后，master会将自己当前的offset返回给slave，slave接收到后会判断自身数据中的offset与master的offset是否一致，如果不一致，则需要进行数据同步。由于 master 已经拒绝了客户端的所有请求，那么一旦 slave完成数据同步，也就表示slave与master之间数据是完全一致的。

数据同步结束之后，就会开始进行故障转移，让slave与master 进行角色互换，该slave成为新的master，而旧的master则转变为一个新的slave。转移结束后，slave便会标记自己为master，并向集群中每一个节点广播故障转移的结果。当集群中节点收到广播后，后续的所有交互便转移至新的master。

这种failover命令可以指定三种模式：

- 缺省：默认的流程，如图1~6歩，一般我们会选择这个
- force：省略了对offset的一致性校验，直接开始故障转移
- takeover：直接执行第5歩，忽略数据一致性、忽略master状态和其它master的意见

接下来我们可以尝试一下，在7002这个slave节点上执行手动故障转移，让它重新夺回master地位，步骤如下：

1. 利用redis-cli连接7002，并执行cluster failover命令

![在这里插入图片描述](http://images.hellocode.top/6c824d011a1643f2bd14fd8cbd185572.png)

2. 通过`redis-cli -p 7001 cluster nodes`命令查看节点状态

![在这里插入图片描述](http://images.hellocode.top/161e5627ea54462796eef9eb60a4e630.png)

#### 4.5. RedisTemplate访问分片集群

我们只需要通过以下简单的配置，就可以通过Java代码访问我们之前部署好的分片集群

1. 在boot项目的pom文件中导入依赖

   ```java
    <dependency>
    	<groupId>org.springframework.boot</groupId>
   	<artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
   ```

2. 在application.yml中指定sentinel相关信息：

   ```yaml
   spring:
     redis:
       cluster:
         nodes: #指定分片集群中每一个节点信息
           - 192.168.150.101:7001
           - 192.168.150.101:7002
           - 192.168.150.101:7003
           - 192.168.150.101:8001
           - 192.168.150.101:8002
           - 192.168.150.101:8003
   ```

3. 在项目的启动类中，添加一个新的bean，这个bean是用来做Redis集群的读写分离的

   ```java
   @Bean
   public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){
       return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
   }
   ```

bean中配置的信息是读写策略，包括四种可选项：

- MASTER：从master读取
- MASTER_PREFERRED：优先从master节点读取，master不可用才读取slave
- REPLICA：从slave节点读取
- REPLICA _PREFERRED：优先从slave节点读取，所有的slave都不可用才读取master

上述配置完毕之后，我们就可以正常使用RedisTemplate来对redis集群进行操作，如果集群中某个的master宕机了，集群就会自动选举新的master，并将新master的信息发送给该Java程序，这样Java程序就可以对新master进行写操作而对其他节点进行读操作了。而这一过程都是自动完成的，无需我们过多关注

## 六、多级缓存

传统的缓存策略一般是请求到达Tomcat后，先查询Redis，如果未命中则查询数据库，存在下面的问题：

![img](http://images.hellocode.top/2217415-20220601202612671-2115519316.png)

- 请求要经过Tomcat处理，Tomcat的性能成为整个系统的瓶颈
- Redis缓存失效时，会对数据库产生冲击

多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻Tomcat压力，提升服务性能：

![img](http://images.hellocode.top/2217415-20220601202838833-481070793.png)

- 浏览器访问静态资源时，优先读取浏览器本地缓存
- 访问非静态资源（ajax查询数据）时，访问服务端
- 请求到达Nginx后，优先读取Nginx本地缓存
- 如果Nginx本地缓存未命中，则去直接查询Redis（不经过Tomcat）
- 如果Redis查询未命中，则查询Tomcat
- 请求进入Tomcat后，优先查询JVM进程缓存
- 如果JVM进程缓存未命中，则查询数据库

在多级缓存架构中，Nginx内部需要编写本地缓存查询、Redis查询、Tomcat查询的业务逻辑，因此这样的nginx服务不再是一个**反向代理服务器**，而是一个编写**业务的Web服务器了**。
因此这样的业务Nginx服务也需要搭建集群来提高并发，再有专门的nginx服务来做反向代理，如图：

![img](http://images.hellocode.top/2217415-20220601202925991-1446896736.png)

另外，我们的Tomcat服务将来也会部署为集群模式：

![img](http://images.hellocode.top/2217415-20220601202952375-632030181.png)

可见，多级缓存的关键有两个：

- 一个是在nginx中编写业务，实现nginx本地缓存、Redis、Tomcat的查询
- 另一个就是在Tomcat中实现JVM进程缓存

其中Nginx编程则会用到OpenResty框架结合Lua这样的语言

### 1、JVM进程缓存

#### 1.1. Caffeine

缓存在日常开发中启动至关重要的作用，由于是存储在内存中，数据的读取速度是非常快的，能大量减少对数据库的访问，减少数据库的压力。我们把缓存分为两类：

- 分布式缓存，例如Redis：
  - 优点：存储容量更大、可靠性更好、可以在集群间共享
  - 缺点：访问缓存有网络开销
  - 场景：缓存数据量较大、可靠性要求较高、需要在集群间共享
- 进程本地缓存，例如HashMap、GuavaCache：
  - 优点：读取本地内存，没有网络开销，速度更快
  - 缺点：存储容量有限、可靠性较低、无法共享
  - 场景：性能要求较高，缓存数据量较小

我们今天会利用Caffeine框架来实现JVM进程缓存。

*Caffeine*是一个基于Java8开发的，提供了近乎最佳命中率的高性能的本地缓存库。目前Spring内部的缓存使用的就是Caffeine。GitHub地址：https://github.com/ben-manes/caffeine

Caffeine的性能非常好，下图是官方给出的性能对比：

![img](http://images.hellocode.top/2217415-20220601203125200-375803060.png)

可以看到Caffeine的性能遥遥领先！

缓存使用的基本API：

```java
@Test
void testBasicOps() {
    // 构建cache对象
    Cache<String, String> cache = Caffeine.newBuilder().build();

    // 存数据
    cache.put("gf", "迪丽热巴");

    // 取数据
    String gf = cache.getIfPresent("gf");
    System.out.println("gf = " + gf);

    // 取数据，包含两个参数：
    // 参数一：缓存的key
    // 参数二：Lambda表达式，表达式参数就是缓存的key，方法体是查询数据库的逻辑
    // 优先根据key查询JVM缓存，如果未命中，则执行参数二的Lambda表达式
    String defaultGF = cache.get("defaultGF", key -> {
        // 根据key去数据库查询数据
        return "柳岩";
    });
    System.out.println("defaultGF = " + defaultGF);
}
```

Caffeine既然是缓存的一种，肯定需要有缓存的清除策略，不然的话内存总会有耗尽的时候。
Caffeine提供了三种缓存驱逐策略：

- *基于容量*：设置缓存的数量上限

  ```java
  // 创建缓存对象
  Cache<String, String> cache = Caffeine.newBuilder()
      .maximumSize(1) // 设置缓存大小上限为 1
      .build();
  ```

- *基于时间*：设置缓存的有效时间

  ```java
  // 创建缓存对象
  Cache<String, String> cache = Caffeine.newBuilder()
      // 设置缓存有效期为 10 秒，从最后一次写入开始计时 
      .expireAfterWrite(Duration.ofSeconds(10)) 
      .build();
  ```

- *基于引用*：设置缓存为软引用或弱引用，利用GC来回收缓存数据。性能较差，不建议使用。

> *注意*：在默认情况下，当一个缓存元素过期的时候，Caffeine不会自动立即将其清理和驱逐。而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐。

#### 1.2. 实现JVM进程缓存

利用Caffeine实现下列需求：

- 给根据id查询商品的业务添加缓存，缓存未命中时查询数据库
- 给根据id查询商品库存的业务添加缓存，缓存未命中时查询数据库
- 缓存初始大小为100
- 缓存上限为10000

首先，我们需要定义两个Caffeine的缓存对象，分别保存商品、库存的缓存数据。

在item-service的`com.heima.item.config`包下定义`CaffeineConfig`类：

```java
package com.heima.item.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.heima.item.pojo.Item;
import com.heima.item.pojo.ItemStock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CaffeineConfig {

    @Bean
    public Cache<Long, Item> itemCache(){
        return Caffeine.newBuilder()
                .initialCapacity(100)
                .maximumSize(10_000)
                .build();
    }

    @Bean
    public Cache<Long, ItemStock> stockCache(){
        return Caffeine.newBuilder()
                .initialCapacity(100)
                .maximumSize(10_000)
                .build();
    }
}
```

然后，修改item-service中的`com.heima.item.web`包下的ItemController类，添加缓存逻辑：

```java
@RestController
@RequestMapping("item")
public class ItemController {

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;

    @Autowired
    private Cache<Long, Item> itemCache;
    @Autowired
    private Cache<Long, ItemStock> stockCache;
    
    // ...其它略
    
    @GetMapping("/{id}")
    public Item findById(@PathVariable("id") Long id) {
        return itemCache.get(id, key -> itemService.query()
                .ne("status", 3).eq("id", key)
                .one()
        );
    }

    @GetMapping("/stock/{id}")
    public ItemStock findStockById(@PathVariable("id") Long id) {
        return stockCache.get(id, key -> stockService.getById(key));
    }
}
```

### 2、Lua语法入门

Nginx编程需要用到Lua语言，因此我们必须先入门Lua的基本语法。

#### 2.1. 初识Lua

Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放， 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。官网：https://www.lua.org/

![img](http://images.hellocode.top/2217415-20220601203419413-264426680.png)

Lua经常嵌入到C语言开发的程序中，例如游戏开发、游戏插件等。
Nginx本身也是C语言开发，因此也允许基于Lua做拓展。

#### 2.2. HelloWorld

CentOS7默认已经安装了Lua语言环境，所以可以直接运行Lua代码。

1. 在Linux虚拟机的任意目录下，新建一个hello.lua文件

![img](http://images.hellocode.top/2217415-20220601203454061-1795317692.png)

2. 添加下面的内容

```lua
print("Hello World!")  
```

3. 运行

   ![img](http://images.hellocode.top/2217415-20220601203512068-1874788007.png)

#### 2.3. 变量和循环

学习任何语言必然离不开变量，而变量的声明必须先知道数据的类型

**Lua的数据类型**

Lua中支持的常见数据类型包括：

![img](http://images.hellocode.top/2217415-20220601203551466-1435962684.png)

另外，Lua提供了type()函数来判断一个变量的数据类型：

![img](http://images.hellocode.top/2217415-20220601203627756-2002773617.png)

**声明变量**

Lua声明变量的时候无需指定数据类型，而是用local来声明变量为局部变量：

```lua
-- 声明字符串，可以用单引号或双引号，
local str = 'hello'
-- 字符串拼接可以使用 ..
local str2 = 'hello' .. 'world'
-- 声明数字
local num = 21
-- 声明布尔类型
local flag = true
```

Lua中的table类型既可以作为数组，又可以作为Java中的map来使用。数组就是特殊的table，key是数组角标而已：

```lua
-- 声明数组 ，key为角标的 table
local arr = {'java', 'python', 'lua'}
-- 声明table，类似java的map
local map =  {name='Jack', age=21}
```

Lua中的数组角标是从1开始，访问的时候与Java中类似：

```lua
-- 访问数组，lua数组的角标从1开始
print(arr[1])
```

Lua中的table可以用key来访问：

```lua
-- 访问table
print(map['name'])
print(map.name)
```

**循环**

对于table，我们可以利用for循环来遍历。不过数组和普通table遍历略有差异。

遍历数组：

```lua
-- 声明数组 key为索引的 table
local arr = {'java', 'python', 'lua'}
-- 遍历数组
for index,value in ipairs(arr) do
    print(index, value) 
end
```

遍历普通table

```lua
-- 声明map，也就是table
local map = {name='Jack', age=21}
-- 遍历table
for key,value in pairs(map) do
   print(key, value) 
end
```

#### 2.4. 条件控制、函数

Lua中的条件控制和函数声明与Java类似

**函数**

定义函数的语法：

```lua
function 函数名(argument1, argument2..., argumentn)
    -- 函数体
    return 返回值
end
```

例如，定义一个函数，用来打印数组：

```lua
function printArr(arr)
    for index, value in ipairs(arr) do
        print(value)
    end
end
```

**条件控制**

类似Java的条件控制，例如if、else语法：

```lua
if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end
```

与java不同，布尔表达式中的逻辑运算是基于英文单词：

![img](http://images.hellocode.top/2217415-20220601203734692-1479598731.png)

**案例**

需求：自定义一个函数，可以打印table，当参数为nil时，打印错误信息

```lua
function printArr(arr)
    if not arr then
        print('数组不能为空！')
    end
    for index, value in ipairs(arr) do
        print(value)
    end
end
```

### 3、多级缓存

多级缓存的实现离不开Nginx编程，而Nginx编程又离不开OpenResty

#### 3.1. OpenResty

**安装OpenResty**

OpenResty® 是一个基于 Nginx的高性能 Web 平台，用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。具备下列特点：

- 具备Nginx的完整功能
- 基于Lua语言进行扩展，集成了大量精良的 Lua 库、第三方模块
- 允许使用Lua*自定义业务逻辑*、*自定义库*

官方网站： https://openresty.org/cn/

![img](http://images.hellocode.top/2217415-20220601203803071-340093771.png)

**快速入门**

我们希望达到的多级缓存架构如图：

![img](http://images.hellocode.top/2217415-20220601205213800-290209960.png)

其中：

- windows上的nginx用来做反向代理服务，将前端的查询商品的ajax请求代理到OpenResty集群
- OpenResty集群用来编写多级缓存业务

*反向代理流程*

现在，商品详情页使用的是假的商品数据。不过在浏览器中，可以看到页面有发起ajax请求查询真实商品数据。

这个请求如下：

![img](http://images.hellocode.top/2217415-20220601203836465-1321818148.png)

请求地址是localhost，端口是80，就被windows上安装的Nginx服务给接收到了。然后代理给了OpenResty集群：

![img](http://images.hellocode.top/2217415-20220601203852466-530789986.png)

我们需要在OpenResty中编写业务，查询商品数据并返回到浏览器。

但是这次，我们先在OpenResty接收请求，返回假的商品数据。

*OpenResty监听请求*

OpenResty的很多功能都依赖于其目录下的Lua库，需要在nginx.conf中指定依赖库的目录，并导入依赖：

1）添加对OpenResty的Lua模块的加载

修改`/usr/local/openresty/nginx/conf/nginx.conf`文件，在其中的http下面，添加下面代码：

```nginx
#lua 模块
lua_package_path "/usr/local/openresty/lualib/?.lua;;";
#c模块     
lua_package_cpath "/usr/local/openresty/lualib/?.so;;";  
```

2）监听/api/item路径

修改`/usr/local/openresty/nginx/conf/nginx.conf`文件，在nginx.conf的server下面，添加对/api/item这个路径的监听：

```nginx
location  /api/item {
    # 默认的响应类型
    default_type application/json;
    # 响应结果由lua/item.lua文件来决定
    content_by_lua_file lua/item.lua;
}
```

这个监听，就类似于SpringMVC中的`@GetMapping("/api/item")`做路径映射。

而`content_by_lua_file lua/item.lua`则相当于调用item.lua这个文件，执行其中的业务，把结果返回给用户。相当于java中调用service。

*编写item.lua*

1. 在`/usr/loca/openresty/nginx`目录创建文件夹：lua

![img](http://images.hellocode.top/2217415-20220601203916609-1201993081.png)

2. 在`/usr/loca/openresty/nginx/lua`文件夹下，新建文件：item.lua

   ![img](http://images.hellocode.top/2217415-20220601203925100-1285658871.png)

3. 编写item.lua，返回假数据

item.lua中，利用ngx.say()函数返回数据到Response中

```lua
ngx.say('{"id":10001,"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')
```

4. 重新加载配置

```sh
nginx -s reload
```

刷新商品页面：http://localhost/item.html?id=1001，即可看到效果：

![img](http://images.hellocode.top/2217415-20220601203947967-232866167.png)

#### 3.2. 请求参数处理

上一节中，我们在OpenResty接收前端请求，但是返回的是假数据。

要返回真实数据，必须根据前端传递来的商品id，查询商品信息才可以。

那么如何获取前端传递的商品参数呢？

**获取参数的API**

OpenResty中提供了一些API用来获取不同类型的前端请求参数：

![img](http://images.hellocode.top/2217415-20220601204000985-6276163.png)

**获取参数并返回**

在前端发起的ajax请求如图：

![img](http://images.hellocode.top/2217415-20220601204020507-1085116215.png)

可以看到商品id是以路径占位符方式传递的，因此可以利用正则表达式匹配的方式来获取ID

1. 获取商品id

修改`/usr/loca/openresty/nginx/nginx.conf`文件中监听/api/item的代码，利用正则表达式获取ID：

```nginx
location ~ /api/item/(\d+) {
    # 默认的响应类型
    default_type application/json;
    # 响应结果由lua/item.lua文件来决定
    content_by_lua_file lua/item.lua;
}
```

2. 拼接ID并返回

修改`/usr/loca/openresty/nginx/lua/item.lua`文件，获取id并拼接到结果中返回：

```lua
-- 获取商品id
local id = ngx.var[1]
-- 拼接并返回
ngx.say('{"id":' .. id .. ',"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')
```

3. 重新加载并测试

运行命令以重新加载OpenResty配置：

```sh
nginx -s reload
```

刷新页面可以看到结果中已经带上了ID：

![img](http://images.hellocode.top/2217415-20220601204043219-2037799338.png)

#### 3.3. 查询Tomcat

拿到商品ID后，本应去缓存中查询商品信息，不过目前我们还未建立nginx、redis缓存。因此，这里我们先根据商品id去tomcat查询商品信息。我们实现如图部分：

![img](http://images.hellocode.top/2217415-20220601204055702-1216803508.png)

需要注意的是，我们的OpenResty是在虚拟机，Tomcat是在Windows电脑上。两者IP一定不要搞错了。

![img](http://images.hellocode.top/2217415-20220601204109910-1216276989.png)

**发送http请求的API**

nginx提供了内部API用以发送http请求：

```lua
local resp = ngx.location.capture("/path",{
    method = ngx.HTTP_GET,   -- 请求方式
    args = {a=1,b=2},  -- get方式传参数
})
```

返回的响应内容包括：

- resp.status：响应状态码
- resp.header：响应头，是一个table
- resp.body：响应体，就是响应数据

注意：这里的path是路径，并不包含IP和端口。这个请求会被nginx内部的server监听并处理。

但是我们希望这个请求发送到Tomcat服务器，所以还需要编写一个server来对这个路径做反向代理：

```nginx
 location /path {
     # 这里是windows电脑的ip和Java服务端口，需要确保windows防火墙处于关闭状态
     proxy_pass http://192.168.150.1:8081; 
 }
```

原理如图：

![img](http://images.hellocode.top/2217415-20220601204146991-669759948.png)

**封装http工具**

下面，我们封装一个发送Http请求的工具，基于ngx.location.capture来实现查询tomcat。

1）添加反向代理，到windows的Java服务

因为item-service中的接口都是/item开头，所以我们监听/item路径，代理到windows上的tomcat服务。

修改 `/usr/local/openresty/nginx/conf/nginx.conf`文件，添加一个location：

```nginx
location /item {
    proxy_pass http://192.168.150.1:8081;
}
```

以后，只要我们调用`ngx.location.capture("/item")`，就一定能发送请求到windows的tomcat服务。

2）封装工具类

之前我们说过，OpenResty启动时会加载以下两个目录中的工具文件：

![img](http://images.hellocode.top/2217415-20220601204213432-1116283442.png)

所以，自定义的http工具也需要放到这个目录下。

在`/usr/local/openresty/lualib`目录下，新建一个common.lua文件：

```sh
vi /usr/local/openresty/lualib/common.lua
```

内容如下:

```lua
-- 封装函数，发送http请求，并解析响应
local function read_http(path, params)
    local resp = ngx.location.capture(path,{
        method = ngx.HTTP_GET,
        args = params,
    })
    if not resp then
        -- 记录错误信息，返回404
        ngx.log(ngx.ERR, "http请求查询失败, path: ", path , ", args: ", args)
        ngx.exit(404)
    end
    return resp.body
end
-- 将方法导出
local _M = {  
    read_http = read_http
}  
return _M
```

这个工具将read_http函数封装到_M这个table类型的变量中，并且返回，这类似于导出。

使用的时候，可以利用`require('common')`来导入该函数库，这里的common是函数库的文件名。

3）实现商品查询

最后，我们修改`/usr/local/openresty/lua/item.lua`文件，利用刚刚封装的函数库实现对tomcat的查询：

```lua
-- 引入自定义common工具模块，返回值是common中返回的 _M
local common = require("common")
-- 从 common中获取read_http这个函数
local read_http = common.read_http
-- 获取路径参数
local id = ngx.var[1]
-- 根据id查询商品
local itemJSON = read_http("/item/".. id, nil)
-- 根据id查询商品库存
local itemStockJSON = read_http("/item/stock/".. id, nil)
```

这里查询到的结果是json字符串，并且包含商品、库存两个json字符串，页面最终需要的是把两个json拼接为一个json：

![img](http://images.hellocode.top/2217415-20220601204237641-407869268.png)

这就需要我们先把JSON变为lua的table，完成数据整合后，再转为JSON。

**CJSON工具类**

OpenResty提供了一个cjson的模块用来处理JSON的序列化和反序列化。

官方地址： https://github.com/openresty/lua-cjson/

1）引入cjson模块：

```lua
local cjson = require "cjson"
```

2）序列化：

```lua
local obj = {
    name = 'jack',
    age = 21
}
-- 把 table 序列化为 json
local json = cjson.encode(obj)
```

3）反序列化：

```lua
local json = '{"name": "jack", "age": 21}'
-- 反序列化 json为 table
local obj = cjson.decode(json);
print(obj.name)
```

**实现Tomcat查询**

下面，我们修改之前的item.lua中的业务，添加json处理功能：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
-- 导入cjson库
local cjson = require('cjson')

-- 获取路径参数
local id = ngx.var[1]
-- 根据id查询商品
local itemJSON = read_http("/item/".. id, nil)
-- 根据id查询商品库存
local itemStockJSON = read_http("/item/stock/".. id, nil)

-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(stockJSON)

-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

**基于ID负载均衡**

刚才的代码中，我们的tomcat是单机部署。而实际开发中，tomcat一定是集群模式：
![img](http://images.hellocode.top/2217415-20220601204305022-979669573.png)

因此，OpenResty需要对tomcat集群做负载均衡。

而默认的负载均衡规则是轮询模式，当我们查询/item/10001时：

- 第一次会访问8081端口的tomcat服务，在该服务内部就形成了JVM进程缓存
- 第二次会访问8082端口的tomcat服务，该服务内部没有JVM缓存（因为JVM缓存无法共享），会查询数据库
- ...

你看，因为轮询的原因，第一次查询8081形成的JVM缓存并未生效，直到下一次再次访问到8081时才可以生效，缓存命中率太低了。

怎么办？

如果能让同一个商品，每次查询时都访问同一个tomcat服务，那么JVM缓存就一定能生效了。

也就是说，我们需要根据商品id做负载均衡，而不是轮询。

*1）原理*

nginx提供了基于请求路径做负载均衡的算法：

nginx根据请求路径做hash运算，把得到的数值对tomcat服务的数量取余，余数是几，就访问第几个服务，实现负载均衡。

例如：

- 我们的请求路径是 /item/10001
- tomcat总数为2台（8081、8082）
- 对请求路径/item/1001做hash运算求余的结果为1
- 则访问第一个tomcat服务，也就是8081

只要id不变，每次hash运算结果也不会变，那就可以保证同一个商品，一直访问同一个tomcat服务，确保JVM缓存生效。

*2）实现*

修改`/usr/local/openresty/nginx/conf/nginx.conf`文件，实现基于ID做负载均衡。

首先，定义tomcat集群，并设置基于路径做负载均衡：

```nginx
upstream tomcat-cluster {
    hash $request_uri;
    server 192.168.150.1:8081;
    server 192.168.150.1:8082;
}
```

然后，修改对tomcat服务的反向代理，目标指向tomcat集群：

```nginx
location /item {
    proxy_pass http://tomcat-cluster;
}
```

重新加载OpenResty

```sh
nginx -s reload
```

*3）测试*

启动两台tomcat服务：

![img](http://images.hellocode.top/2217415-20220601204344580-758791102.png)

同时启动：

![img](http://images.hellocode.top/2217415-20220601204358514-1513818877.png)

清空日志后，再次访问页面，可以看到不同id的商品，访问到了不同的tomcat服务：

![img](http://images.hellocode.top/2217415-20220601204409054-543299579.png)

![img](http://images.hellocode.top/2217415-20220601204419407-836446306.png)

#### 3.4. Redis缓存预热

Redis缓存会面临冷启动问题：

**冷启动**：服务刚刚启动时，Redis中并没有缓存，如果所有商品数据都在第一次查询时添加缓存，可能会给数据库带来较大压力。

**缓存预热**：在实际开发中，我们可以利用大数据统计用户访问的热点数据，在项目启动时将这些热点数据提前查询并保存到Redis中。

我们数据量较少，并且没有数据统计相关功能，目前可以在启动时将所有数据都放入缓存中。

1）利用Docker安装Redis

```sh
docker run --name redis -p 6379:6379 -d redis redis-server --appendonly yes
```

2）在item-service服务中引入Redis依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

3）配置Redis地址

```yaml
spring:
  redis:
    host: 192.168.150.101
```

4）编写初始化类

缓存预热需要在项目启动时完成，并且必须是拿到RedisTemplate之后。

这里我们利用InitializingBean接口来实现，因为InitializingBean可以在对象被Spring创建并且成员变量全部注入后执行。

```java
package com.heima.item.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heima.item.pojo.Item;
import com.heima.item.pojo.ItemStock;
import com.heima.item.service.IItemService;
import com.heima.item.service.IItemStockService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RedisHandler implements InitializingBean {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public void afterPropertiesSet() throws Exception {
        // 初始化缓存
        // 1.查询商品信息
        List<Item> itemList = itemService.list();
        // 2.放入缓存
        for (Item item : itemList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(item);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:id:" + item.getId(), json);
        }

        // 3.查询商品库存信息
        List<ItemStock> stockList = stockService.list();
        // 4.放入缓存
        for (ItemStock stock : stockList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(stock);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:stock:id:" + stock.getId(), json);
        }
    }
}
```

#### 3.5. 查询Redis缓存

现在，Redis缓存已经准备就绪，我们可以再OpenResty中实现查询Redis的逻辑了。如下图红框所示：

![img](http://images.hellocode.top/2217415-20220601204505616-1077052896.png)

当请求进入OpenResty之后：

- 优先查询Redis缓存
- 如果Redis缓存未命中，再查询Tomcat

**封装Redis工具**

OpenResty提供了操作Redis的模块，我们只要引入该模块就能直接使用。但是为了方便，我们将Redis操作封装到之前的common.lua工具库中。

修改`/usr/local/openresty/lualib/common.lua`文件：

1）引入Redis模块，并初始化Redis对象

```lua
-- 导入redis
local redis = require('resty.redis')
-- 初始化redis
local red = redis:new()
red:set_timeouts(1000, 1000, 1000)
```

2）封装函数，用来释放Redis连接，其实是放入连接池

```lua
-- 关闭redis连接的工具方法，其实是放入连接池
local function close_redis(red)
    local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒
    local pool_size = 100 --连接池大小
    local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.ERR, "放入redis连接池失败: ", err)
    end
end
```

3）封装函数，根据key查询Redis数据

```lua
-- 查询redis的方法 ip和port是redis地址，key是查询的key
local function read_redis(ip, port, key)
    -- 获取一个连接
    local ok, err = red:connect(ip, port)
    if not ok then
        ngx.log(ngx.ERR, "连接redis失败 : ", err)
        return nil
    end
    -- 查询redis
    local resp, err = red:get(key)
    -- 查询失败处理
    if not resp then
        ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)
    end
    --得到的数据为空处理
    if resp == ngx.null then
        resp = nil
        ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)
    end
    close_redis(red)
    return resp
end
```

4）导出

```lua
-- 将方法导出
local _M = {  
    read_http = read_http,
    read_redis = read_redis
}  
return _M
```

完整的common.lua：

```lua
-- 导入redis
local redis = require('resty.redis')
-- 初始化redis
local red = redis:new()
red:set_timeouts(1000, 1000, 1000)

-- 关闭redis连接的工具方法，其实是放入连接池
local function close_redis(red)
    local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒
    local pool_size = 100 --连接池大小
    local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.ERR, "放入redis连接池失败: ", err)
    end
end

-- 查询redis的方法 ip和port是redis地址，key是查询的key
local function read_redis(ip, port, key)
    -- 获取一个连接
    local ok, err = red:connect(ip, port)
    if not ok then
        ngx.log(ngx.ERR, "连接redis失败 : ", err)
        return nil
    end
    -- 查询redis
    local resp, err = red:get(key)
    -- 查询失败处理
    if not resp then
        ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)
    end
    --得到的数据为空处理
    if resp == ngx.null then
        resp = nil
        ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)
    end
    close_redis(red)
    return resp
end

-- 封装函数，发送http请求，并解析响应
local function read_http(path, params)
    local resp = ngx.location.capture(path,{
        method = ngx.HTTP_GET,
        args = params,
    })
    if not resp then
        -- 记录错误信息，返回404
        ngx.log(ngx.ERR, "http查询失败, path: ", path , ", args: ", args)
        ngx.exit(404)
    end
    return resp.body
end
-- 将方法导出
local _M = {  
    read_http = read_http,
    read_redis = read_redis
}  
return _M
```

**实现Redis查询**

接下来，我们就可以去修改item.lua文件，实现对Redis的查询了。

查询逻辑是：

- 根据id查询Redis
- 如果查询失败则继续查询Tomcat
- 将查询结果返回

1）修改`/usr/local/openresty/lua/item.lua`文件，添加一个查询函数：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 封装查询函数
function read_data(key, path, params)
    -- 查询本地缓存
    local val = read_redis("127.0.0.1", 6379, key)
    -- 判断查询结果
    if not val then
        ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
        -- redis查询失败，去查询http
        val = read_http(path, params)
    end
    -- 返回数据
    return val
end
```

2）而后修改商品查询、库存查询的业务：

![img](http://images.hellocode.top/2217415-20220601204537356-906686431.png)

3）完整的item.lua代码：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 导入cjson库
local cjson = require('cjson')

-- 封装查询函数
function read_data(key, path, params)
    -- 查询本地缓存
    local val = read_redis("127.0.0.1", 6379, key)
    -- 判断查询结果
    if not val then
        ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
        -- redis查询失败，去查询http
        val = read_http(path, params)
    end
    -- 返回数据
    return val
end

-- 获取路径参数
local id = ngx.var[1]

-- 查询商品信息
local itemJSON = read_data("item:id:" .. id,  "/item/" .. id, nil)
-- 查询库存信息
local stockJSON = read_data("item:stock:id:" .. id, "/item/stock/" .. id, nil)

-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(stockJSON)
-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

#### 3.6. Nginx本地缓存

现在，整个多级缓存中只差最后一环，也就是nginx的本地缓存了。如图：

![img](http://images.hellocode.top/2217415-20220601204555288-2141953920.png)

**本地缓存API**

OpenResty为Nginx提供了**shard dict**的功能，可以在nginx的多个worker之间共享数据，实现缓存功能。

1）开启共享字典，在nginx.conf的http下添加配置：

```nginx
 # 共享字典，也就是本地缓存，名称叫做：item_cache，大小150m
 lua_shared_dict item_cache 150m; 
```

2）操作共享字典：

```lua
-- 获取本地缓存对象
local item_cache = ngx.shared.item_cache
-- 存储, 指定key、value、过期时间，单位s，默认为0代表永不过期
item_cache:set('key', 'value', 1000)
-- 读取
local val = item_cache:get('key')
```

**实现本地缓存查询**

1）修改`/usr/local/openresty/lua/item.lua`文件，修改read_data查询函数，添加本地缓存逻辑：

```lua
-- 导入共享词典，本地缓存
local item_cache = ngx.shared.item_cache

-- 封装查询函数
function read_data(key, expire, path, params)
    -- 查询本地缓存
    local val = item_cache:get(key)
    if not val then
        ngx.log(ngx.ERR, "本地缓存查询失败，尝试查询Redis， key: ", key)
        -- 查询redis
        val = read_redis("127.0.0.1", 6379, key)
        -- 判断查询结果
        if not val then
            ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
            -- redis查询失败，去查询http
            val = read_http(path, params)
        end
    end
    -- 查询成功，把数据写入本地缓存
    item_cache:set(key, val, expire)
    -- 返回数据
    return val
end
```

2）修改item.lua中查询商品和库存的业务，实现最新的read_data函数：

![img](http://images.hellocode.top/2217415-20220601204608189-1495845030.png)

其实就是多了缓存时间参数，过期后nginx缓存会自动删除，下次访问即可更新缓存。

这里给商品基本信息设置超时时间为30分钟，库存为1分钟。

因为库存更新频率较高，如果缓存时间过长，可能与数据库差异较大。

3）完整的item.lua文件：

```lua
-- 导入common函数库
local common = require('common')
local read_http = common.read_http
local read_redis = common.read_redis
-- 导入cjson库
local cjson = require('cjson')
-- 导入共享词典，本地缓存
local item_cache = ngx.shared.item_cache

-- 封装查询函数
function read_data(key, expire, path, params)
    -- 查询本地缓存
    local val = item_cache:get(key)
    if not val then
        ngx.log(ngx.ERR, "本地缓存查询失败，尝试查询Redis， key: ", key)
        -- 查询redis
        val = read_redis("127.0.0.1", 6379, key)
        -- 判断查询结果
        if not val then
            ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)
            -- redis查询失败，去查询http
            val = read_http(path, params)
        end
    end
    -- 查询成功，把数据写入本地缓存
    item_cache:set(key, val, expire)
    -- 返回数据
    return val
end

-- 获取路径参数
local id = ngx.var[1]

-- 查询商品信息
local itemJSON = read_data("item:id:" .. id, 1800,  "/item/" .. id, nil)
-- 查询库存信息
local stockJSON = read_data("item:stock:id:" .. id, 60, "/item/stock/" .. id, nil)

-- JSON转化为lua的table
local item = cjson.decode(itemJSON)
local stock = cjson.decode(stockJSON)
-- 组合数据
item.stock = stock.stock
item.sold = stock.sold

-- 把item序列化为json 返回结果
ngx.say(cjson.encode(item))
```

### 4、缓存同步策略

大多数情况下，浏览器查询到的都是缓存数据，如果缓存数据与数据库数据存在较大差异，可能会产生比较严重的后果。
所以我们必须保证数据库数据、缓存数据的一致性，这就是缓存与数据库的同步。

#### 4.1. 数据同步策略

缓存数据同步的常见方式有三种：

**设置有效期**：给缓存设置有效期，到期后自动删除。再次查询时更新

- 优势：简单、方便
- 缺点：时效性差，缓存过期之前可能不一致
- 场景：更新频率较低，时效性要求低的业务

**同步双写**：在修改数据库的同时，直接修改缓存

- 优势：时效性强，缓存与数据库强一致
- 缺点：有代码侵入，耦合度高；
- 场景：对一致性、时效性要求较高的缓存数据

**异步通知：**修改数据库时发送事件通知，相关服务监听到通知后修改缓存数据

- 优势：低耦合，可以同时通知多个缓存服务
- 缺点：时效性一般，可能存在中间不一致状态
- 场景：时效性要求一般，有多个服务需要同步

而异步实现又可以基于MQ或者Canal来实现：

1）基于MQ的异步通知：

![img](http://images.hellocode.top/2217415-20220601204653932-306830408.png)

解读：

- 商品服务完成对数据的修改后，只需要发送一条消息到MQ中。
- 缓存服务监听MQ消息，然后完成对缓存的更新

依然有少量的代码侵入。

2）基于Canal的通知
![img](http://images.hellocode.top/2217415-20220601204817242-1469078918.png)

解读：

- 商品服务完成商品修改后，业务直接结束，没有任何代码侵入
- Canal监听MySQL变化，当发现变化后，立即通知缓存服务
- 缓存服务接收到canal通知，更新缓存

代码零侵入

#### 4.2. 安装Canal

**认识Canal**

*Canal [kə'næl]*，译意为水道/管道/沟渠，canal是阿里巴巴旗下的一款开源项目，基于Java开发。基于数据库增量日志解析，提供增量数据订阅&消费。GitHub的地址：https://github.com/alibaba/canal

Canal是基于mysql的主从同步来实现的，MySQL主从同步的原理如下：

![img](http://images.hellocode.top/2217415-20220601204854275-1203876302.png)

- MySQL master 将数据变更写入二进制日志( binary log），其中记录的数据叫做binary log events
- MySQL slave 将 master 的 binary log events拷贝到它的中继日志(relay log)
- MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据

而Canal就是把自己伪装成MySQL的一个slave节点，从而监听master的binary log变化。再把得到的变化信息通知给Canal的客户端，进而完成对其它数据库的同步。

![img](http://images.hellocode.top/2217415-20220601204909159-1648872685.png)

**安装Canal**

下面我们就开启mysql的主从同步机制，让Canal来模拟salve

*开启MySQL主从*

Canal是基于MySQL的主从同步功能，因此必须先开启MySQL的主从功能才可以。

这里以之前用Docker运行的mysql为例：

1）开启binlog

打开mysql容器挂载的日志文件，我的在`/tmp/mysql/conf`目录:
![img](http://images.hellocode.top/2217415-20220601210915510-1654871786.png)

修改文件：

```sh
vi /tmp/mysql/conf/my.cnf
```

添加内容：

```ini
log-bin=/var/lib/mysql/mysql-bin
binlog-do-db=heima
```

配置解读：

- `log-bin=/var/lib/mysql/mysql-bin`：设置binary log文件的存放地址和文件名，叫做mysql-bin
- `binlog-do-db=heima`：指定对哪个database记录binary log events，这里记录heima这个库

最终效果：

```ini
[mysqld]
skip-name-resolve
character_set_server=utf8
datadir=/var/lib/mysql
server-id=1000
log-bin=/var/lib/mysql/mysql-bin
binlog-do-db=heima
```

2）设置用户权限

接下来添加一个仅用于数据同步的账户，出于安全考虑，这里仅提供对heima这个库的操作权限。

```sql
create user canal@'%' IDENTIFIED by 'canal';
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT,SUPER ON *.* TO 'canal'@'%' identified by 'canal';
FLUSH PRIVILEGES;
```

重启mysql容器即可

```undefined
docker restart mysql
```

测试设置是否成功：在mysql控制台，或者Navicat中，输入命令：

```lua
show master status;
```

![img](http://images.hellocode.top/2217415-20220601210953847-194233797.png)

*安装Canal*

1）创建网络

我们需要创建一个网络，将MySQL、Canal、MQ放到同一个Docker网络中：

```sh
docker network create heima
```

让mysql加入这个网络：

```sh
docker network connect heima mysql
```

下载canal的镜像压缩包:
上传到虚拟机，然后通过命令导入：

```css
docker load -i canal.tar
```

然后运行命令创建Canal容器：

```sh
docker run -p 11111:11111 --name canal \
-e canal.destinations=heima \
-e canal.instance.master.address=mysql:3306  \
-e canal.instance.dbUsername=canal  \
-e canal.instance.dbPassword=canal  \
-e canal.instance.connectionCharset=UTF-8 \
-e canal.instance.tsdb.enable=true \
-e canal.instance.gtidon=false  \
-e canal.instance.filter.regex=heima\\..* \
--network heima \
-d canal/canal-server:v1.1.5
```

说明:

- `-p 11111:11111`：这是canal的默认监听端口
- `-e canal.instance.master.address=mysql:3306`：数据库地址和端口，如果不知道mysql容器地址，可以通过`docker inspect 容器id`来查看
- `-e canal.instance.dbUsername=canal`：数据库用户名
- `-e canal.instance.dbPassword=canal` ：数据库密码
- `-e canal.instance.filter.regex=`：要监听的表名称

表名称监听支持的语法：

```markdown
mysql 数据解析关注的表，Perl正则表达式.
多个正则之间以逗号(,)分隔，转义符需要双斜杠(\\) 
常见例子：
1.  所有表：.*   or  .*\\..*
2.  canal schema下所有表： canal\\..*
3.  canal下的以canal打头的表：canal\\.canal.*
4.  canal schema下的一张表：canal.test1
5.  多个规则组合使用然后以逗号隔开：canal\\..*,mysql.test1,mysql.test2 
```

#### 4.3. 监听Canal

Canal提供了各种语言的客户端，当Canal监听到binlog变化时，会通知Canal的客户端。

![img](http://images.hellocode.top/2217415-20220601205058086-1039173958.png)

我们可以利用Canal提供的Java客户端，监听Canal通知消息。当收到变化的消息时，完成对缓存的更新。

不过这里我们会使用GitHub上的第三方开源的canal-starter客户端。地址：https://github.com/NormanGyllenhaal/canal-client

与SpringBoot完美整合，自动装配，比官方客户端要简单好用很多。

**引入依赖**

```xml
<dependency>
    <groupId>top.javatool</groupId>
    <artifactId>canal-spring-boot-starter</artifactId>
    <version>1.2.1-RELEASE</version>
</dependency>
```

**编写配置**

```yaml
canal:
  destination: heima # canal的集群名字，要与安装canal时设置的名称一致
  server: 192.168.150.101:11111 # canal服务地址
```

**修改Item实体类**

通过@Id、@Column、等注解完成Item与数据库表字段的映射：

```java
package com.heima.item.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import javax.persistence.Column;
import java.util.Date;

@Data
@TableName("tb_item")
public class Item {
    @TableId(type = IdType.AUTO)
    @Id
    private Long id;//商品id
    @Column(name = "name")
    private String name;//商品名称
    private String title;//商品标题
    private Long price;//价格（分）
    private String image;//商品图片
    private String category;//分类名称
    private String brand;//品牌名称
    private String spec;//规格
    private Integer status;//商品状态 1-正常，2-下架
    private Date createTime;//创建时间
    private Date updateTime;//更新时间
    @TableField(exist = false)
    @Transient
    private Integer stock;
    @TableField(exist = false)
    @Transient
    private Integer sold;
}
```

**编写监听器**

通过实现`EntryHandler<T>`接口编写监听器，监听Canal消息。注意两点：

- 实现类通过`@CanalTable("tb_item")`指定监听的表信息
- EntryHandler的泛型是与表对应的实体类

```java
package com.heima.item.canal;

import com.github.benmanes.caffeine.cache.Cache;
import com.heima.item.config.RedisHandler;
import com.heima.item.pojo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.javatool.canal.client.annotation.CanalTable;
import top.javatool.canal.client.handler.EntryHandler;

@CanalTable("tb_item")
@Component
public class ItemHandler implements EntryHandler<Item> {

    @Autowired
    private RedisHandler redisHandler;
    @Autowired
    private Cache<Long, Item> itemCache;

    @Override
    public void insert(Item item) {
        // 写数据到JVM进程缓存
        itemCache.put(item.getId(), item);
        // 写数据到redis
        redisHandler.saveItem(item);
    }

    @Override
    public void update(Item before, Item after) {
        // 写数据到JVM进程缓存
        itemCache.put(after.getId(), after);
        // 写数据到redis
        redisHandler.saveItem(after);
    }

    @Override
    public void delete(Item item) {
        // 删除数据到JVM进程缓存
        itemCache.invalidate(item.getId());
        // 删除数据到redis
        redisHandler.deleteItemById(item.getId());
    }
}
```

在这里对Redis的操作都封装到了RedisHandler这个对象中，是我们之前做缓存预热时编写的一个类，内容如下：

```java
package com.heima.item.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heima.item.pojo.Item;
import com.heima.item.pojo.ItemStock;
import com.heima.item.service.IItemService;
import com.heima.item.service.IItemStockService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RedisHandler implements InitializingBean {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private IItemService itemService;
    @Autowired
    private IItemStockService stockService;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public void afterPropertiesSet() throws Exception {
        // 初始化缓存
        // 1.查询商品信息
        List<Item> itemList = itemService.list();
        // 2.放入缓存
        for (Item item : itemList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(item);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:id:" + item.getId(), json);
        }

        // 3.查询商品库存信息
        List<ItemStock> stockList = stockService.list();
        // 4.放入缓存
        for (ItemStock stock : stockList) {
            // 2.1.item序列化为JSON
            String json = MAPPER.writeValueAsString(stock);
            // 2.2.存入redis
            redisTemplate.opsForValue().set("item:stock:id:" + stock.getId(), json);
        }
    }

    public void saveItem(Item item) {
        try {
            String json = MAPPER.writeValueAsString(item);
            redisTemplate.opsForValue().set("item:id:" + item.getId(), json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteItemById(Long id) {
        redisTemplate.delete("item:id:" + id);
    }
}
```

## 七、Redis最佳实践

### 1、键值设计

#### 1.1. 优雅的key结构

Redis的Key虽然可以自定义，但最好遵循下面的几个最佳实践约定：

- 遵循基本格式：[业务名称]:[数据名]:[id]
- 长度不超过44字节
- 不包含特殊字符

例如：我们的登录业务，保存用户信息，其key可以设计成如下格式：

![img](http://images.hellocode.top/2217415-20220725204026834-1876935695.png)

这样设计的好处：

- 可读性强
- 避免key冲突
- 方便管理
- 更节省内存： key是string类型，底层编码包含int、embstr和raw三种。embstr在小于44字节使用，采用连续内存空间，内存占用更小。当字节数大于44字节时，会转为raw模式存储，在raw模式下，内存空间不是连续的，而是采用一个指针指向了另外一段内存空间，在这段空间里存储SDS内容，这样空间不连续，访问的时候性能也就会收到影响，还有可能产生内存碎片

![img](http://images.hellocode.top/2217415-20220725204059426-1179812367.png)

#### 1.2. 拒绝BigKey

BigKey通常以Key的大小和Key中成员的数量来综合判定，例如：

- Key本身的数据量过大：一个String类型的Key，它的值为5 MB
- Key中的成员数过多：一个ZSET类型的Key，它的成员数量为10,000个
- Key中成员的数据量过大：一个Hash类型的Key，它的成员数量虽然只有1,000个但这些成员的Value（值）总大小为100 MB

那么如何判断元素的大小呢？redis也给我们提供了命令

![img](http://images.hellocode.top/2217415-20220725204153996-1956079449.png)

推荐值：

- 单个key的value小于10KB
- 对于集合类型的key，建议元素数量小于1000

**BigKey的危害**

- 网络阻塞
  - 对BigKey执行读请求时，少量的QPS就可能导致带宽使用率被占满，导致Redis实例，乃至所在物理机变慢
- 数据倾斜
  - BigKey所在的Redis实例内存使用率远超其他实例，无法使数据分片的内存资源达到均衡
- Redis阻塞
  - 对元素较多的hash、list、zset等做运算会耗时较旧，使主线程被阻塞
- CPU压力
  - 对BigKey的数据序列化和反序列化会导致CPU的使用率飙升，影响Redis实例和本机其它应用

**如何发现BigKey**

*①redis-cli --bigkeys*

利用redis-cli提供的--bigkeys参数，可以遍历分析所有key，并返回Key的整体统计信息与每个数据的Top1的big key

命令：`redis-cli -a 密码 --bigkeys`

![img](http://images.hellocode.top/2217415-20220725204304733-1889349053.png)

*②scan扫描*

自己编程，利用scan扫描Redis中的所有key，利用strlen、hlen等命令判断key的长度（此处不建议使用MEMORY USAGE）

![img](http://images.hellocode.top/2217415-20220725204328398-2070282997.png)

scan 命令调用完后每次会返回2个元素，第一个是下一次迭代的光标，第一次光标会设置为0，当最后一次scan 返回的光标等于0时，表示整个scan遍历结束了，第二个返回的是List，一个匹配的key的数组

```java
import com.heima.jedis.util.JedisConnectionFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.ScanResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JedisTest {
    private Jedis jedis;

    @BeforeEach
    void setUp() {
        // 1.建立连接
        // jedis = new Jedis("192.168.150.101", 6379);
        jedis = JedisConnectionFactory.getJedis();
        // 2.设置密码
        jedis.auth("123321");
        // 3.选择库
        jedis.select(0);
    }

    final static int STR_MAX_LEN = 10 * 1024;
    final static int HASH_MAX_LEN = 500;

    @Test
    void testScan() {
        int maxLen = 0;
        long len = 0;

        String cursor = "0";
        do {
            // 扫描并获取一部分key
            ScanResult<String> result = jedis.scan(cursor);
            // 记录cursor
            cursor = result.getCursor();
            List<String> list = result.getResult();
            if (list == null || list.isEmpty()) {
                break;
            }
            // 遍历
            for (String key : list) {
                // 判断key的类型
                String type = jedis.type(key);
                switch (type) {
                    case "string":
                        len = jedis.strlen(key);
                        maxLen = STR_MAX_LEN;
                        break;
                    case "hash":
                        len = jedis.hlen(key);
                        maxLen = HASH_MAX_LEN;
                        break;
                    case "list":
                        len = jedis.llen(key);
                        maxLen = HASH_MAX_LEN;
                        break;
                    case "set":
                        len = jedis.scard(key);
                        maxLen = HASH_MAX_LEN;
                        break;
                    case "zset":
                        len = jedis.zcard(key);
                        maxLen = HASH_MAX_LEN;
                        break;
                    default:
                        break;
                }
                if (len >= maxLen) {
                    System.out.printf("Found big key : %s, type: %s, length or size: %d %n", key, type, len);
                }
            }
        } while (!cursor.equals("0"));
    }
    
    @AfterEach
    void tearDown() {
        if (jedis != null) {
            jedis.close();
        }
    }

}
```

*③第三方工具*

- 利用第三方工具，如 Redis-Rdb-Tools 分析RDB快照文件，全面分析内存使用情况
- https://github.com/sripathikrishnan/redis-rdb-tools

*④网络监控*

- 自定义工具，监控进出Redis的网络数据，超出预警值时主动告警
- 一般阿里云搭建的云服务器就有相关监控页面

![img](http://images.hellocode.top/2217415-20220725204412121-1910777436.png)

**如何删除BigKey**

BigKey内存占用较多，即便时删除这样的key也需要耗费很长时间，导致Redis主线程阻塞，引发一系列问题。

- redis 3.0 及以下版本
  - 如果是集合类型，则遍历BigKey的元素，先逐个删除子元素，最后删除BigKey

![img](http://images.hellocode.top/2217415-20220725204453113-937748453.png)

- Redis 4.0以后
  - Redis在4.0后提供了异步删除的命令：unlink

#### 1.3. 恰当的数据类型

**案例1：**

比如存储一个User对象，我们有三种存储方式：

*①方式一：json字符串*

|  key   | value |
| :----: | :---: |
| user:1 |       |

优点：实现简单粗暴

缺点：数据耦合，不够灵活

*②方式二：字段打散*

|     key     | value |
| :---------: | :---: |
| user:1:name | Jack  |
| user:1:age  |  21   |

优点：可以灵活访问对象任意字段

缺点：占用空间大、没办法做统一控制

*③方式三：hash（推荐）*

| user:1 | name | jack |
| ------ | ---- | ---- |
| age    | 21   |      |

优点：底层使用ziplist，空间占用小，可以灵活访问对象的任意字段

缺点：代码相对复杂

**案例2**

假如有hash类型的key，其中有100万对field和value，field是自增id，这个key存在什么问题？如何优化？

| key       | field       | value  |
| --------- | ----------- | ------ |
| someKey   | id:0        | value0 |
| .....     | .....       |        |
| id:999999 | value999999 |        |

存在的问题：

- hash的entry数量超过500时，会使用哈希表而不是ZipList，内存占用较多
- 可以通过hash-max-ziplist-entries配置entry上限。但是如果entry过多就会导致BigKey问题

*方案一*

拆分为string类型

| key       | value       |
| --------- | ----------- |
| id:0      | value0      |
| .....     | .....       |
| id:999999 | value999999 |

存在的问题：

- string结构底层没有太多内存优化，内存占用较多

![img](http://images.hellocode.top/2217415-20220725205928158-1305109203.png)

- 想要批量获取这些数据比较麻烦

*方案二*

拆分为小的hash，将 id / 100 作为key， 将id % 100 作为field，这样每100个元素为一个Hash

| key      | field       | value       |
| -------- | ----------- | ----------- |
| key:0    | id:00       | value0      |
| .....    | .....       |             |
| id:99    | value99     |             |
| key:1    | id:00       | value100    |
| .....    | .....       |             |
| id:99    | value199    |             |
| ....     |             |             |
| key:9999 | id:00       | value999900 |
| .....    | .....       |             |
| id:99    | value999999 |             |

![img](http://images.hellocode.top/2217415-20220725210027175-187608673.png)



```java
package com.heima.test;

import com.heima.jedis.util.JedisConnectionFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.ScanResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JedisTest {
    private Jedis jedis;

    @BeforeEach
    void setUp() {
        // 1.建立连接
        // jedis = new Jedis("192.168.150.101", 6379);
        jedis = JedisConnectionFactory.getJedis();
        // 2.设置密码
        jedis.auth("123321");
        // 3.选择库
        jedis.select(0);
    }

    @Test
    void testSetBigKey() {
        Map<String, String> map = new HashMap<>();
        for (int i = 1; i <= 650; i++) {
            map.put("hello_" + i, "world!");
        }
        jedis.hmset("m2", map);
    }

    @Test
    void testBigHash() {
        Map<String, String> map = new HashMap<>();
        for (int i = 1; i <= 100000; i++) {
            map.put("key_" + i, "value_" + i);
        }
        jedis.hmset("test:big:hash", map);
    }

    @Test
    void testBigString() {
        for (int i = 1; i <= 100000; i++) {
            jedis.set("test:str:key_" + i, "value_" + i);
        }
    }

    @Test
    void testSmallHash() {
        int hashSize = 100;
        Map<String, String> map = new HashMap<>(hashSize);
        for (int i = 1; i <= 100000; i++) {
            int k = (i - 1) / hashSize;
            int v = i % hashSize;
            map.put("key_" + v, "value_" + v);
            if (v == 0) {
                jedis.hmset("test:small:hash_" + k, map);
            }
        }
    }

    @AfterEach
    void tearDown() {
        if (jedis != null) {
            jedis.close();
        }
    }
}
```

#### 1.4. 总结

- Key的最佳实践
  - 固定格式：[业务名]:[数据名]:[id]
  - 足够简短：不超过44字节
  - 不包含特殊字符
- Value的最佳实践：
  - 合理的拆分数据，拒绝BigKey
  - 选择合适数据结构
  - Hash结构的entry数量不要超过1000
  - 设置合理的超时时间

### 2、批处理优化

#### 2.1. Pipeline

**我们的客户端与redis服务器是这样交互的**

单个命令的执行流程

![img](http://images.hellocode.top/2217415-20220725210125643-1309822493.png)

N条命令的执行流程

![img](http://images.hellocode.top/2217415-20220725210144752-1332616009.png)

redis处理指令是很快的，主要花费的时候在于网络传输。于是乎很容易想到将多条指令批量的传输给redis
![img](http://images.hellocode.top/2217415-20220725210158160-605992858.png)

**MSet**

Redis提供了很多Mxxx这样的命令，可以实现批量插入数据，例如：

- mset
- hmset

利用mset批量插入10万条数据

```java
@Test
void testMxx() {
    String[] arr = new String[2000];
    int j;
    long b = System.currentTimeMillis();
    for (int i = 1; i <= 100000; i++) {
        j = (i % 1000) << 1;
        arr[j] = "test:key_" + i;
        arr[j + 1] = "value_" + i;
        if (j == 0) {
            jedis.mset(arr);
        }
    }
    long e = System.currentTimeMillis();
    System.out.println("time: " + (e - b));
}
```

**Pipeline**

MSET虽然可以批处理，但是却只能操作部分数据类型，因此如果有对复杂数据类型的批处理需要，建议使用Pipeline

```java
@Test
void testPipeline() {
    // 创建管道
    Pipeline pipeline = jedis.pipelined();
    long b = System.currentTimeMillis();
    for (int i = 1; i <= 100000; i++) {
        // 放入命令到管道
        pipeline.set("test:key_" + i, "value_" + i);
        if (i % 1000 == 0) {
            // 每放入1000条命令，批量执行
            pipeline.sync();
        }
    }
    long e = System.currentTimeMillis();
    System.out.println("time: " + (e - b));
}
```

#### 2.2. 集群下的批处理

如MSET或Pipeline这样的批处理需要在一次请求中携带多条命令，而此时如果Redis是一个集群，那批处理命令的多个key必须落在一个插槽中，否则就会导致执行失败。大家可以想一想这样的要求其实很难实现，因为我们在批处理时，可能一次要插入很多条数据，这些数据很有可能不会都落在相同的节点上，这就会导致报错了

这个时候，我们可以找到4种解决方案

![img](http://images.hellocode.top/2217415-20220725210254396-1787556920.png)

第一种方案：串行执行，所以这种方式没有什么意义，当然，执行起来就很简单了，缺点就是耗时过久。

第二种方案：串行slot，简单来说，就是执行前，客户端先计算一下对应的key的slot，一样slot的key就放到一个组里边，不同的，就放到不同的组里边，然后对每个组执行pipeline的批处理，他就能串行执行各个组的命令，这种做法比第一种方法耗时要少，但是缺点呢，相对来说复杂一点，所以这种方案还需要优化一下

第三种方案：并行slot，相较于第二种方案，在分组完成后串行执行，第三种方案，就变成了并行执行各个命令，所以他的耗时就非常短，但是实现呢，也更加复杂。

第四种：hash_tag，redis计算key的slot的时候，其实是根据key的有效部分来计算的，通过这种方式就能一次处理所有的key，这种方式耗时最短，实现也简单，但是如果通过操作key的有效部分，那么就会导致所有的key都落在一个节点上，产生数据倾斜的问题，所以我们推荐使用第三种方式。

**串行化执行代码实践**

```java
public class JedisClusterTest {

    private JedisCluster jedisCluster;

    @BeforeEach
    void setUp() {
        // 配置连接池
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(8);
        poolConfig.setMaxIdle(8);
        poolConfig.setMinIdle(0);
        poolConfig.setMaxWaitMillis(1000);
        HashSet<HostAndPort> nodes = new HashSet<>();
        nodes.add(new HostAndPort("192.168.150.101", 7001));
        nodes.add(new HostAndPort("192.168.150.101", 7002));
        nodes.add(new HostAndPort("192.168.150.101", 7003));
        nodes.add(new HostAndPort("192.168.150.101", 8001));
        nodes.add(new HostAndPort("192.168.150.101", 8002));
        nodes.add(new HostAndPort("192.168.150.101", 8003));
        jedisCluster = new JedisCluster(nodes, poolConfig);
    }

    @Test
    void testMSet() {
        jedisCluster.mset("name", "Jack", "age", "21", "sex", "male");

    }

    @Test
    void testMSet2() {
        Map<String, String> map = new HashMap<>(3);
        map.put("name", "Jack");
        map.put("age", "21");
        map.put("sex", "Male");
        //对Map数据进行分组。根据相同的slot放在一个分组
        //key就是slot，value就是一个组
        Map<Integer, List<Map.Entry<String, String>>> result = map.entrySet()
                .stream()
                .collect(Collectors.groupingBy(
                        entry -> ClusterSlotHashUtil.calculateSlot(entry.getKey()))
                );
        //串行的去执行mset的逻辑
        for (List<Map.Entry<String, String>> list : result.values()) {
            String[] arr = new String[list.size() * 2];
            int j = 0;
            for (int i = 0; i < list.size(); i++) {
                j = i<<2;
                Map.Entry<String, String> e = list.get(0);
                arr[j] = e.getKey();
                arr[j + 1] = e.getValue();
            }
            jedisCluster.mset(arr);
        }
    }

    @AfterEach
    void tearDown() {
        if (jedisCluster != null) {
            jedisCluster.close();
        }
    }
}
```

**Spring集群环境下批处理代码**

```java
@Test
void testMSetInCluster() {
    Map<String, String> map = new HashMap<>(3);
    map.put("name", "Rose");
    map.put("age", "21");
    map.put("sex", "Female");
    stringRedisTemplate.opsForValue().multiSet(map);


    List<String> strings = stringRedisTemplate.opsForValue().multiGet(Arrays.asList("name", "age", "sex"));
    strings.forEach(System.out::println);

}
```

**原理分析**

在RedisAdvancedClusterAsyncCommandsImpl 类中

首先根据slotHash算出来一个partitioned的map，map中的key就是slot，而他的value就是对应的对应相同slot的key对应的数据

通过 RedisFuture mset = super.mset(op);进行异步的消息发送

```Java
@Override
public RedisFuture<String> mset(Map<K, V> map) {

    Map<Integer, List<K>> partitioned = SlotHash.partition(codec, map.keySet());

    if (partitioned.size() < 2) {
        return super.mset(map);
    }

    Map<Integer, RedisFuture<String>> executions = new HashMap<>();

    for (Map.Entry<Integer, List<K>> entry : partitioned.entrySet()) {

        Map<K, V> op = new HashMap<>();
        entry.getValue().forEach(k -> op.put(k, map.get(k)));

        RedisFuture<String> mset = super.mset(op);
        executions.put(entry.getKey(), mset);
    }

    return MultiNodeExecution.firstOfAsync(executions);
}
```

### 3、持久化配置

Redis的持久化虽然可以保证数据安全，但也会带来很多额外的开销，因此持久化请遵循下列建议：

- 用来做缓存的Redis实例尽量不要开启持久化功能
- 建议关闭RDB持久化功能，使用AOF持久化
- 利用脚本定期在slave节点做RDB，实现数据备份
- 设置合理的rewrite阈值，避免频繁的bgrewrite
- 配置no-appendfsync-on-rewrite = yes，禁止在rewrite期间做aof，避免因AOF引起的阻塞

部署有关建议：

- Redis实例的物理机要预留足够内存，应对fork和rewrite
- 单个Redis实例内存上限不要太大，例如4G或8G。可以加快fork的速度、减少主从同步、数据迁移压力
- 不要与CPU密集型应用部署在一起
- 不要与高硬盘负载应用一起部署。例如：数据库、消息队列

### 4、慢查询优化

#### 4.1. 什么是慢查询

并不是很慢的查询才是慢查询，而是：在Redis执行时耗时超过某个阈值的命令，称为慢查询。

慢查询的危害：由于Redis是单线程的，所以当客户端发出指令后，他们都会进入到redis底层的queue来执行，如果此时有一些慢查询的数据，就会导致大量请求阻塞，从而引起报错，所以我们需要解决慢查询问题。

![img](http://images.hellocode.top/2217415-20220725210432705-337137732.png)

慢查询的阈值可以通过配置指定：

slowlog-log-slower-than：慢查询阈值，单位是微秒。默认是10000，建议1000

慢查询会被放入慢查询日志中，日志的长度有上限，可以通过配置指定：

slowlog-max-len：慢查询日志（本质是一个队列）的长度。默认是128，建议1000

![img](http://images.hellocode.top/2217415-20220725210451502-1237734033.png)

修改这两个配置可以使用：config set命令：

![img](http://images.hellocode.top/2217415-20220725210502756-1138818498.png)

#### 4.2. 如何查看慢查询

知道了以上内容之后，那么咱们如何去查看慢查询日志列表呢：

- slowlog len：查询慢查询日志长度
- slowlog get [n]：读取n条慢查询日志
- slowlog reset：清空慢查询列表

![img](http://images.hellocode.top/2217415-20220725210509876-1750796453.png)

### 5、命令及安全配置

安全可以说是服务器端一个非常重要的话题，如果安全出现了问题，那么一旦这个漏洞被一些坏人知道了之后，并且进行攻击，那么这就会给咱们的系统带来很多的损失，所以我们这节课就来解决这个问题。

Redis会绑定在0.0.0.0:6379，这样将会将Redis服务暴露到公网上，而Redis如果没有做身份认证，会出现严重的安全漏洞.
漏洞重现方式：https://cloud.tencent.com/developer/article/1039000

为什么会出现不需要密码也能够登录呢，主要是Redis考虑到每次登录都比较麻烦，所以Redis就有一种ssh免秘钥登录的方式，生成一对公钥和私钥，私钥放在本地，公钥放在redis端，当我们登录时服务器，再登录时候，他会去解析公钥和私钥，如果没有问题，则不需要利用redis的登录也能访问，这种做法本身也很常见，但是这里有一个前提，前提就是公钥必须保存在服务器上，才行，但是Redis的漏洞在于在不登录的情况下，也能把秘钥送到Linux服务器，从而产生漏洞

漏洞出现的核心的原因有以下几点：

- Redis未设置密码
- 利用了Redis的config set命令动态修改Redis配置
- 使用了Root账号权限启动Redis

所以：如何解决呢？我们可以采用如下几种方案

为了避免这样的漏洞，这里给出一些建议：

- Redis一定要设置密码
- 禁止线上使用下面命令：keys、flushall、flushdb、config set等命令。可以利用rename-command禁用。
- bind：限制网卡，禁止外网网卡访问
- 开启防火墙
- 不要使用Root账户启动Redis
- 尽量不是有默认的端口

### 6、内存划分和配置

当Redis内存不足时，可能导致Key频繁被删除、响应时间变长、QPS不稳定等问题。当内存使用率达到90%以上时就需要我们警惕，并快速定位到内存占用的原因。

**有关碎片问题分析**

Redis底层分配并不是这个key有多大，他就会分配多大，而是有他自己的分配策略，比如8,16,20等等，假定当前key只需要10个字节，此时分配8肯定不够，那么他就会分配16个字节，多出来的6个字节就不能被使用，这就是我们常说的 碎片问题

**进程内存问题分析：**

这片内存，通常我们都可以忽略不计

**缓冲区内存问题分析：**

一般包括客户端缓冲区、AOF缓冲区、复制缓冲区等。客户端缓冲区又包括输入缓冲区和输出缓冲区两种。这部分内存占用波动较大，所以这片内存也是我们需要重点分析的内存问题。

| 内存占用   | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| 数据内存   | 是Redis最主要的部分，存储Redis的键值信息。主要问题是BigKey问题、内存碎片问题 |
| 进程内存   | Redis主进程本身运⾏肯定需要占⽤内存，如代码、常量池等等；这部分内存⼤约⼏兆，在⼤多数⽣产环境中与Redis数据占⽤的内存相⽐可以忽略。 |
| 缓冲区内存 | 一般包括客户端缓冲区、AOF缓冲区、复制缓冲区等。客户端缓冲区又包括输入缓冲区和输出缓冲区两种。这部分内存占用波动较大，不当使用BigKey，可能导致内存溢出。 |

于是我们就需要通过一些命令，可以查看到Redis目前的内存分配状态：

- info memory：查看内存分配的情况

![img](http://images.hellocode.top/2217415-20220725210530263-1543892142.png)

- memory xxx：查看key的主要占用情况

![img](http://images.hellocode.top/2217415-20220725210538430-1407508142.png)

接下来我们看到了这些配置，最关键的缓存区内存如何定位和解决呢？

内存缓冲区常见的有三种：

- 复制缓冲区：主从复制的repl_backlog_buf，如果太小可能导致频繁的全量复制，影响性能。通过replbacklog-size来设置，默认1mb
- AOF缓冲区：AOF刷盘之前的缓存区域，AOF执行rewrite的缓冲区。无法设置容量上限
- 客户端缓冲区：分为输入缓冲区和输出缓冲区，输入缓冲区最大1G且不能设置。输出缓冲区可以设置

以上复制缓冲区和AOF缓冲区 不会有问题，最关键就是客户端缓冲区的问题

客户端缓冲区：指的就是我们发送命令时，客户端用来缓存命令的一个缓冲区，也就是我们向redis输入数据的输入端缓冲区和redis向客户端返回数据的响应缓存区，输入缓冲区最大1G且不能设置，所以这一块我们根本不用担心，如果超过了这个空间，redis会直接断开，因为本来此时此刻就代表着redis处理不过来了，我们需要担心的就是输出端缓冲区

![img](http://images.hellocode.top/2217415-20220725210547382-704615162.png)

我们在使用redis过程中，处理大量的big value，那么会导致我们的输出结果过多，如果输出缓存区过大，会导致redis直接断开，而默认配置的情况下， 其实他是没有大小的，这就比较坑了，内存可能一下子被占满，会直接导致咱们的redis断开，所以解决方案有两个

1. 设置一个大小
2. 增加我们带宽的大小，避免我们出现大量数据从而直接超过了redis的承受能力

```sh
# 查看连接客户端全局信息
info clients
```

![在这里插入图片描述](http://images.hellocode.top/e062ca1bb2554ca6aafa49a6ed066e1c.png)

```bash
# 查看连接客户端列表
clients list
```

![在这里插入图片描述](http://images.hellocode.top/a0d4099f141d44e5aae38d515f5e8e0b.png)

> 如果客户端输出缓冲区溢出，那么omem的值会很大

### 7、集群优化

集群虽然具备高可用特性，能实现自动故障恢复，但是如果使用不当，也会存在一些问题：

- 集群完整性问题
- 集群带宽问题
- 数据倾斜问题
- 客户端性能问题
- 命令的集群兼容性问题
- lua和事务问题

**问题1、在Redis的默认配置中，如果发现任意一个插槽不可用，则整个集群都会停止对外服务：**

大家可以设想一下，如果有几个slot不能使用，那么此时整个集群都不能用了，我们在开发中，其实最重要的是可用性，所以需要把如下配置修改成no，即有slot不能使用时，我们的redis集群还是可以对外提供服务

![img](http://images.hellocode.top/2217415-20220725210555442-1380547951.png)

**问题2、集群带宽问题**

集群节点之间会不断的互相Ping来确定集群中其它节点的状态。每次Ping携带的信息至少包括：

- 插槽信息
- 集群状态信息

集群中节点越多，集群状态信息数据量也越大，10个节点的相关信息可能达到1kb，此时每次集群互通需要的带宽会非常高，这样会导致集群中大量的带宽都会被ping信息所占用，这是一个非常可怕的问题，所以我们需要去解决这样的问题

**解决途径：**

- 避免大集群，集群节点数不要太多，最好少于1000，如果业务庞大，则建立多个集群。
- 避免在单个物理机中运行太多Redis实例
- 配置合适的cluster-node-timeout值

**问题3、命令的集群兼容性问题**

有关这个问题咱们已经探讨过了，当我们使用批处理的命令时，redis要求我们的key必须落在相同的slot上，然后大量的key同时操作时，是无法完成的，所以客户端必须要对这样的数据进行处理，这些方案我们之前已经探讨过了，所以不再这个地方赘述了。

**问题4、lua和事务的问题**

lua和事务都是要保证原子性问题，如果你的key不在一个节点，那么是无法保证lua的执行和事务的特性的，所以在集群模式是没有办法执行lua和事务的

**那我们到底是集群还是主从**

单体Redis（主从Redis）已经能达到万级别的QPS，并且也具备很强的高可用特性。如果主从能满足业务需求的情况下，所以如果不是在万不得已的情况下，尽量不搭建Redis集群

## 八、原理篇

### 1、数据结构

#### 1.1. 动态字符串

我们都知道Redis中保存的Key是字符串，value往往是字符串或者字符串的集合。可见字符串是Redis中最常用的一种数据结构。

不过Redis没有直接使用C语言中的字符串，因为C语言字符串存在很多问题:

- 获取字符串长度的需要通过运算，O(n)复杂度
- 非二进制安全，不能出现类似于’\0’的字符，因为在c字符串中，'\0’代表字符串结束
- 不可修改

Redis构建了一种新的字符串结构，称为*简单动态字符串*(Simple Dynamic String)，简称SDS

例如，我们执行命令:

```bash
set name "张三"
"OK"
```

那么Redis将在底层创建两个SDS，其中一个是包含name的SDS，另一个是包含“张三”的SDS。

redis是用C语言写的，其中SDS是一个结构体，源码如下：

```c
struct __attribute__((__packed__)) sdshdr8 {
	uint8_t len; /* buf已保存的字符串字节数，不包含结束标示 */
	uint8_t alloc; /* buf申请的总的字节数，不包含结束标示 */
	unsigned char flags; /* 不同SDS的头类型，用来控制SDS的头的大小 */
	char buf[];
}
```

![在这里插入图片描述](http://images.hellocode.top/842b2a4d65244411af2e6d533261ec5a.png)

例如，一个包含字符串“name"的sds结构如下:

![在这里插入图片描述](http://images.hellocode.top/4aa7d2a71de54c9aa93536d2f66a7cda.png)

SDS之所以叫做动态字符串，是因为它具备动态扩容的能力，例如一个内容为“hi”的SDS:

![在这里插入图片描述](http://images.hellocode.top/8f9f42e9e7cc4fd0b234ee96573069e0.png)

假如我们要给SDS追加一段字符串",Amy”，这里首先会申请新内存空间:

- 如果新字符串小于1M，则新空间为扩展后字符串长度的两倍+1;
- 如果新字符串大于1M，则新空间为扩展后字符串长度+1M+1。称为*内存预分配*。

![在这里插入图片描述](http://images.hellocode.top/71a1da39a65a457c9df856ae6aba2189.png)

使用SDS的优点如下：

- 获取字符串长度的时间复杂度为0(1)
- 支持动态扩容
- 减少内存分配次数
- 二进制安全

当然上面的源码只是选取一个出来，事实上redis还提供很多种比特位的结构体，打开redis源码的sds.h文件就可以看见：

![在这里插入图片描述](http://images.hellocode.top/26ecff88dc6a47c8860ba137caa9c57a.png)

#### 1.2. IntSet

IntSet是Redis中set集合的一种实现方式，基于整数数组来实现，并且具备长度可变、有序等特征。

结构如下：

![在这里插入图片描述](http://images.hellocode.top/fe763912457843b88048f1c274edc795.png)

其中的encoding包含三种模式，表示存储的整数大小不同：

![在这里插入图片描述](http://images.hellocode.top/ed59279b139f409a998bb59399d10f45.png)

为了方便查找，Redis会将intset中所有的整数按照升序依次保存在contents数组中，结构如图：

![在这里插入图片描述](http://images.hellocode.top/608bdde8f85a46e0813878a004b3fd8d.png)

现在，数组中每个数字都在int16_t的范围内，因此采用的编码方式是INTSET_ENC_INT16，每部分占用的字节大小为：

- encoding：4字节
- length：4字节
- contents：2字节 * 3 = 6字节

**IntSet升级**

现在，假设有一个intset，元素为{5,10，20}，采用的编码是INTSET_ENC_INT16，则每个整数占2字节：

![在这里插入图片描述](http://images.hellocode.top/10b2befacdf64d46bd7aa4f07a5b4742.png)

我们向该其中添加一个数字：50000，这个数字超出了int16_t的范围，intset会自动升级编码方式到合适的大小。

以当前案例来说流程如下：

- 升级编码为INTSET_ENC_INT32, 每个整数占4字节，并按照新的编码方式及元素个数扩容数组
- 倒序依次将数组中的元素拷贝到扩容后的正确位置

拷贝20

![在这里插入图片描述](http://images.hellocode.top/57b2c7952a6f4f53b9ba5c22bdcc38b8.png)

拷贝10

![在这里插入图片描述](http://images.hellocode.top/d1f79a3041d94fa4b770384b6cffd50c.png)

拷贝5

![在这里插入图片描述](http://images.hellocode.top/d77f3c5dff2f42dc82fbc41b80fd602a.png)

我们向该其中添加一个数字：50000，这个数字超出了int16_t的范围，intset会自动升级编码方式到合适的大小。
以当前案例来说流程如下：

- 升级编码为INTSET_ENC_INT32, 每个整数占4字节，并按照新的编码方式及元素个数扩容数组
- 倒序依次将数组中的元素拷贝到扩容后的正确位置
- 将待添加的元素放入数组末尾
- 最后，将inset的encoding属性改为INTSET_ENC_INT32，将length属性改为4

![在这里插入图片描述](http://images.hellocode.top/0d6fce4661d34aeb932fa2a4850b473c.png)

**IntSet新增流程**

![在这里插入图片描述](http://images.hellocode.top/959d48bee8c94a5fb8eecfcc6bbc0faa.png)

**IntSet升级流程**

![在这里插入图片描述](http://images.hellocode.top/78bc7210f05c487c9e053fca53561e65.png)

**总结**

Intset可以看做是特殊的整数数组，具备一些特点：

- Redis会确保Intset中的元素唯一、有序
- 具备类型升级机制，可以节省内存空间
- 底层采用二分查找方式来查询

#### 1.3. Dict

我们知道Redis是一个键值型（Key-Value Pair）的数据库，我们可以根据键实现快速的增删改查。而键与值的映射关系正是通过Dict来实现的。

Dict由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）

![在这里插入图片描述](http://images.hellocode.top/82cf2ba9389040e194743968e4309ff7.png)

当我们向Dict添加键值对时，Redis首先根据key计算出hash值(h)，然后利用h & sizemask来计算元素应该存储到数组中的哪个索引位置。我们存储k1=v1，假设k1的哈希值h =1，则1&3 =1，因此k1=v1要存储到数组角标1位置。

![在这里插入图片描述](http://images.hellocode.top/df8a0df250c3428cb47dba202d371d8f.png)

Dict由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）

![在这里插入图片描述](http://images.hellocode.top/e2002790ecc84a9ebd9ea8de3c29ad3a.png)

![在这里插入图片描述](http://images.hellocode.top/e1e0f9f2c1b9498380a506998a11e8de.png)

![在这里插入图片描述](http://images.hellocode.top/25de31baea4c48bd9864c2968bc217b1.png)

![在这里插入图片描述](http://images.hellocode.top/2cad0649e54f4e30bdaefe1a4d66fd9b.png)

**Dict的扩容**

ict中的HashTable就是数组结合单向链表的实现，当集合中元素较多时，必然导致哈希冲突增多，链表过长，则查询效率会大大降低

Dict在每次新增键值对时都会检查负载因子（LoadFactor = used/size） ，满足以下两种情况时会触发哈希表扩容：

- 哈希表的 LoadFactor >= 1，并且服务器没有执行 BGSAVE 或者 BGREWRITEAOF 等后台进程
- 哈希表的 LoadFactor > 5 

![在这里插入图片描述](http://images.hellocode.top/dade492c723647d5a381fc93c5305b4e.png)

**Dict的收缩**

Dict除了扩容以外，每次删除元素时，也会对负载因子做检查，当LoadFactor < 0.1 时，会做哈希表收缩：

![在这里插入图片描述](http://images.hellocode.top/65f5f80b90c24e9199b3aceb02727517.png)

![在这里插入图片描述](http://images.hellocode.top/0e2fedd7131d4bc3b1bd84e89c97e5f2.png)

![在这里插入图片描述](http://images.hellocode.top/2e40ee9ca5ca463fbe43abbb5d3d6472.png)

**Dict的rehash**

不管是扩容还是收缩，必定会创建新的哈希表，导致哈希表的size和sizemask变化，而key的查询与sizemask有关。因此必须对哈希表中的每一个key重新计算索引，插入新的哈希表，这个过程称为rehash。过程是这样的：

- 计算新hash表的realeSize，值取决于当前要做的是扩容还是收缩：

  如果是扩容，则新size为第一个大于等于dict.ht[0].used + 1的2^n

  如果是收缩，则新size为第一个大于等于dict.ht[0].used的2^n （不得小于4）

- 按照新的realeSize申请内存空间，创建dictht，并赋值给dict.ht[1]

- 设置dict.rehashidx = 0，标示开始rehash

- 将dict.ht[0]中的每一个dictEntry都rehash到dict.ht[1]

- 将dict.ht[1]赋值给dict.ht[0]，给dict.ht[1]初始化为空哈希表，释放原来的dict.ht[0]的内存

Dict的rehash并不是一次性完成的。试想一下，如果Dict中包含数百万的entry，要在一次rehash完成，极有可能导致主线程阻塞。因此Dict的rehash是分多次、渐进式的完成，因此称为渐进式rehash。流程如下：

![在这里插入图片描述](http://images.hellocode.top/6bbdc0af8a9644dd88cfcc9786bb82da.png)

**总结**

Dict的结构：

- 类似java的HashTable，底层是数组加链表来解决哈希冲突
- Dict包含两个哈希表，ht[0]平常用，ht[1]用来rehash

Dict的伸缩：

- 当LoadFactor大于5或者LoadFactor大于1并且没有子进程任务时，Dict扩容
- 当LoadFactor小于0.1时，Dict收缩
- 扩容大小为第一个大于等于used + 1的2^n
- 收缩大小为第一个大于等于used 的2^n
- Dict采用渐进式rehash，每次访问Dict时执行一次rehash
- rehash时ht[0]只减不增，新增操作只在ht[1]执行，其它操作在两个哈希表

#### 1.4. ZipList

ZipList 是一种特殊的“双端链表” ，由一系列特殊编码的连续内存块组成。可以在任意一端进行压入/弹出操作, 并且该操作的时间复杂度为 O(1)

![在这里插入图片描述](http://images.hellocode.top/7b00f6293035446ebbb91714c0b57504.png)

![在这里插入图片描述](http://images.hellocode.top/cb91b9dbe9ce4d3cbae3365f18f7219c.png)

**ZipListEntry**

ZipList 中的Entry并不像普通链表那样记录前后节点的指针，因为记录两个指针要占用16个字节，浪费内存。而是采用了下面的结构：

![在这里插入图片描述](http://images.hellocode.top/c886d71acadc4cb2bdd24760cfb3c5f8.png)

- previous_entry_length：前一节点的长度，占1个或5个字节。

  如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值

  如果前一节点的长度大于254字节，则采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实长度数据

- encoding：编码属性，记录content的数据类型（字符串还是整数）以及长度，占用1个、2个或5个字节
- contents：负责保存节点的数据，可以是字符串或整数

> 注意：ZipList中所有存储长度的数值均采用小端字节序，即低位字节在前，高位字节在后。例如：数值0x1234，采用小端字节序后实际存储值为：0x3412

**Encoding编码**

ZipListEntry中的encoding编码分为字符串和整数两种：

字符串：如果encoding是以“00”、“01”或者“10”开头，则证明content是字符串

![在这里插入图片描述](http://images.hellocode.top/920f065769bc47b7b5b1cdfb782c81a6.png)

例如，我们要保存字符串：“ab”和 “bc”

![在这里插入图片描述](http://images.hellocode.top/66f9159e489e477f8dac4bd90f4d824b.png)

ZipListEntry中的encoding编码分为字符串和整数两种：

整数：如果encoding是以“11”开始，则证明content是整数，且encoding固定只占用1个字节

![在这里插入图片描述](http://images.hellocode.top/01192ecce16d4c389f9794b5e60cd2a9.png)

例如，一个ZipList中包含两个整数值：“2”和“5”

![在这里插入图片描述](http://images.hellocode.top/bc54b94773c54cecbf3e906db9d73495.png)

**ZipList的连锁更新问题**

ZipList的每个Entry都包含previous_entry_length来记录上一个节点的大小，长度是1个或5个字节：

- 如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值

- 如果前一节点的长度大于等于254字节，则采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实长度数据
  现在，假设我们有N个连续的、长度为250~253字节之间的entry，因此entry的previous_entry_length属性用1个字节即可表示，如图所示：

  ![在这里插入图片描述](http://images.hellocode.top/db2d50d9597c4d219a7dcd5f5285c838.png)

  ZipList这种特殊情况下产生的连续多次空间扩展操作称之为连锁更新（Cascade Update）。新增、删除都可能导致连锁更新的发生。

**ZipList特性总结**

- 压缩列表的可以看做一种连续内存空间的"双向链表"
- 列表的节点之间不是通过指针连接，而是记录上一节点和本节点长度来寻址，内存占用较低
- 如果列表数据过多，导致链表过长，可能影响查询性能
- 增或删较大数据时有可能发生连续更新问题

#### 1.5. QuickList

问题1：ZipList虽然节省内存空间，但申请内存必须是连续空间，如果内存占用较多，申请内存效率很低，怎么办？

答：为了缓解这个问题，我们必须限制ZipList的长度和entry大小。

问题2：但是我们要存储大量数据，超出了ZipList最佳的上限该怎么办？

答：我们可以创建多个ZipList来分片存储数据。

问题3：数据拆分后比较分散，不方便管理和查找，这多个ZipList如何建立联系？

答：Redis在3.2版本引入了新的数据结构QuickList，它是一个双端链表，只不过链表中的每个节点都是一个ZipList

![在这里插入图片描述](http://images.hellocode.top/0e09d70f9da5497c9d98227c517c51f3.png)

为了避免QuickList中的每个ZipList中entry过多，Redis提供了一个配置项：list-max-ziplist-size来限制。

- 如果值为正，则代表ZipList的允许的entry个数的最大值

- 如果值为负，则代表ZipList的最大内存大小，分5种情况：

  -1：每个ZipList的内存占用不能超过4kb

  -2：每个ZipList的内存占用不能超过8kb

  -3：每个ZipList的内存占用不能超过16kb

  -4：每个ZipList的内存占用不能超过32kb

  -5：每个ZipList的内存占用不能超过64kb

  其默认值为 -2：

  ![在这里插入图片描述](http://images.hellocode.top/51771c4696914269bb4b64b2dc25955e.png)

除了控制ZipList的大小，QuickList还可以对节点的ZipList做压缩。通过配置项list-compress-depth来控制。因为链表一般都是从首尾访问较多，所以首尾是不压缩的。这个参数是控制首尾不压缩的节点个数：

- 0：特殊值，代表不压缩

- 1：标示QuickList的首尾各有1个节点不压缩，中间节点压缩

- 2：标示QuickList的首尾各有2个节点不压缩，中间节点压缩

- 以此类推

- 默认值：

  ![在这里插入图片描述](http://images.hellocode.top/a940f496f7c94aa2bce55b7bbd993d5c.png)

**源码解析**

以下是QuickList的和QuickListNode的结构源码：

![在这里插入图片描述](http://images.hellocode.top/2b72f83643db4c9ea8c3c734d22f49c6.png)

**结构图**

![在这里插入图片描述](http://images.hellocode.top/f9a741ab8316496b99e2c55abefa4556.png)

**QuickList特点**

- 是一个节点为ZipList的双端链表
- 节点采用ZipList，解决了传统链表的内存占用问题
- 控制ZipList大小，解决连续内存空间申请效率问题
- 中间节点可以压缩，进一步节省了内存

#### 1.6. SkipList

**原理**

SkipList（跳表）首先是链表，但与传统链表相比有几点差异：

- 元素按照升序排列存储
- 节点可能包含多个指针，指针跨度不同

![在这里插入图片描述](http://images.hellocode.top/ea2ce83e5e3c4cc78aa39bec46b75a0f.png)

**源码分析**

![在这里插入图片描述](http://images.hellocode.top/387a7597150543e188a277a44c259b1d.png)

![在这里插入图片描述](http://images.hellocode.top/5fd7d7e504ae4cda8b0ca1fcf7069db5.png)

**SkipList的特点**

- 跳跃表是一个双向链表，每个节点都包含score和ele值
- 节点按照score值排序，score值一样则按照ele字典排序
- 每个节点都可以包含多层指针，层数是1到32之间的随机数
- 不同层指针到下一个节点的跨度不同，层级越高，跨度越大
- 增删改查效率与红黑树基本一致，实现却更简单

#### 1.7. RedisObject

Redis中的任意数据类型的键和值都会被封装为一个RedisObject，也叫做Redis对象，源码如下：

![在这里插入图片描述](http://images.hellocode.top/76e20a7429534c579e4ee4da6e66e350.png)

**Redis的编码方式**

Redis中会根据存储的数据类型不同，选择不同的编码方式，共包含11种不同类型：

![在这里插入图片描述](http://images.hellocode.top/522f34b6d4334fab876c1ee862e98c84.png)

#### 1.8. 五种数据类型

Redis中会根据存储的数据类型不同，选择不同的编码方式。每种数据类型的使用的编码方式如下：

![在这里插入图片描述](http://images.hellocode.top/829dec48c6ed4ff1821c95d4097944e8.png)

##### String

String是Redis中最常见的数据存储类型：

- 其基本编码方式是RAW，基于简单动态字符串（SDS）实现，存储上限为512mb

![在这里插入图片描述](http://images.hellocode.top/0bd9b4b1ecd54c89b531a8e0ba6df935.png)

- 如果存储的SDS长度小于44字节，则会采用EMBSTR编码，此时object head与SDS是一段连续空间。申请内存时只需要调用一次内存分配函数，效率更高。

  ![在这里插入图片描述](http://images.hellocode.top/2aa5286c1d104b53aa45531c8d242a7e.png)

- 如果存储的字符串是整数值，并且大小在LONG_MAX范围内，则会采用INT编码：直接将数据保存在RedisObject的ptr指针位置（刚好8字节），不再需要SDS了

  ![在这里插入图片描述](http://images.hellocode.top/05c55991f94b452d9de61308aebd5fb6.png)

##### List

Redis的List类型可以从首、尾操作列表中的元素：

![在这里插入图片描述](http://images.hellocode.top/80afd96aa22d4349882af46d12e7799e.png)

哪一个数据结构能满足上述特征？

- LinkedList ：普通链表，可以从双端访问，内存占用较高，内存碎片较多
- ZipList ：压缩列表，可以从双端访问，内存占用低，存储上限低
- QuickList：LinkedList + ZipList，可以从双端访问，内存占用较低，包含多个ZipList，存储上限高

Redis的List结构类似一个双端链表，可以从首、尾操作列表中的元素：

- 在3.2版本之前，Redis采用ZipList和LinkedList来实现List，当元素数量小于512并且元素大小小于64字节时采用ZipList编码，超过则采用LinkedList编码。
- 在3.2版本之后，Redis统一采用QuickList来实现List

![在这里插入图片描述](http://images.hellocode.top/3f0f0f5d213949e5b8d9718379578d08.png)

![在这里插入图片描述](http://images.hellocode.top/ba642844c0b543f1afcd58b9ce4738f7.png)

##### Set

**原理**

Set是Redis中的单列集合，满足下列特点：

- 不保证有序性
- 保证元素唯一（可以判断元素是否存在）
- 求交集、并集、差集

![在这里插入图片描述](http://images.hellocode.top/a5b175fcf5ef40c09ad7b5467c00be09.png)

可以看出，Set对查询元素的效率要求非常高，思考一下，什么样的数据结构可以满足？

- HashTable，也就是Redis中的Dict，不过Dict是双列集合（可以存键、值对）

Set是Redis中的集合，不一定确保元素有序，可以满足元素唯一、查询效率要求极高。

- 为了查询效率和唯一性，set采用HT编码（Dict）。Dict中的key用来存储元素，value统一为null。
- 当存储的所有数据都是整数，并且元素数量不超过set-max-intset-entries时，Set会采用IntSet编码，以节省内

**源码分析**

![在这里插入图片描述](http://images.hellocode.top/d63c5da40c034dac8ce602ed9f07da2a.png)

![在这里插入图片描述](http://images.hellocode.top/d45e1b40ec5b4431b640db8b7cf7e27b.png)

set-max-intset-entries的默认值是512：

![在这里插入图片描述](http://images.hellocode.top/e04cee98a65f4f46bd361c361d18666c.png)

**内存结构图**

![在这里插入图片描述](http://images.hellocode.top/b525d15a77db4457be64d59bf3a487b1.png)

##### ZSet

**原理**

ZSet也就是SortedSet，其中每一个元素都需要指定一个score值和member值：

- 可以根据score值排序后
- member必须唯一
- 可以根据member查询分数

![在这里插入图片描述](http://images.hellocode.top/4fa5b28005704297beb28927627c60af.png)

因此，zset底层数据结构必须满足键值存储、键必须唯一、可排序这几个需求。之前学习的哪种编码结构可以满足？

- SkipList：可以排序，并且可以同时存储score和ele值（member）
- HT（Dict）：可以键值存储，并且可以根据key找value

![在这里插入图片描述](http://images.hellocode.top/e9ca5edba19345858f298530f80e9d93.png)

**源码分析**

![在这里插入图片描述](http://images.hellocode.top/8839f7b02bff4059b90ce0b4f80749d7.png)

![在这里插入图片描述](http://images.hellocode.top/66fd259accea49e9a0dad5513b67d125.png)

**元素数量不多时采用ZipList编码**

当元素数量不多时，HT和SkipList的优势不明显，而且更耗内存。因此zset还会采用ZipList结构来节省内存，不过需要同时满足两个条件：

- 元素数量小于zset_max_ziplist_entries，默认值128
- 每个元素都小于zset_max_ziplist_value字节，默认值64

![在这里插入图片描述](http://images.hellocode.top/a07427cb451340c1a7d8b121e73299dc.png)

![在这里插入图片描述](http://images.hellocode.top/78a45da48c5c442f9455d46595fcc961.png)

ziplist本身没有排序功能，而且没有键值对的概念，因此需要有zset通过编码实现：

- ZipList是连续内存，因此score和element是紧挨在一起的两个entry， element在前，score在后
- score越小越接近队首，score越大越接近队尾，按照score值升序排列

![在这里插入图片描述](http://images.hellocode.top/0f67c931e7144184a5680661776ac540.png)

##### Hash

**原理**

Hash结构与Redis中的ZSet非常类似：

- 都是键值存储
- 都需求根据键获取值
- 键必须唯一

区别如下：

- zset的键是member，值是score；hash的键和值都是任意值
- zset要根据score排序；hash则无需排序

因此，Hash底层采用的编码与Zset也基本一致，只需要把排序相关的SkipList去掉即可：

- Hash结构默认采用ZipList编码，用以节省内存。 ZipList中相邻的两个entry 分别保存field和value

- 当数据量较大时，Hash结构会转为HT编码，也就是Dict，触发条件有两个

  （1）ZipList中的元素数量超过了hash-max-ziplist-entries（默认512）

  （2）ZipList中的任意entry大小超过了hash-max-ziplist-value（默认64字节）

![在这里插入图片描述](http://images.hellocode.top/aa8e279d40cf4067accfb3c9be91d444.png)

**源码分析**

![在这里插入图片描述](http://images.hellocode.top/57d5d4e448fa49f4a999ce3c8dffbbf0.png)

![在这里插入图片描述](http://images.hellocode.top/aec559615977470eb07463c3003d8a53.png)

![在这里插入图片描述](http://images.hellocode.top/68eac09ce74b4f93aeb48cb3baec1efa.png)

![在这里插入图片描述](http://images.hellocode.top/91ca725763744f40a636c54c1e5a1ba5.png)

![在这里插入图片描述](http://images.hellocode.top/358cbf9a8738460dbe5ae71a10d7b4b8.png)

**内存结构**

![在这里插入图片描述](http://images.hellocode.top/adade263c51b495aacd07ae7a22aa082.png)

### 2、网络模型

#### 2.1. 用户空间和内核态空间

计算机硬件包括，如cpu，内存，网卡等等，内核（通过寻址空间）可以操作硬件的，但是内核需要不同设备的驱动，有了这些驱动之后，内核就可以去对计算机硬件去进行 内存管理，文件系统的管理，进程的管理等等

![1653896065386](http://images.hellocode.top/119a60070d73491fa584d05254b99e8b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

我们想要用户的应用来访问，计算机就必须要通过对外暴露的一些接口，才能访问到，从而简介的实现对内核的操控，但是内核本身上来说也是一个应用，所以他本身也需要一些内存，cpu等设备资源，用户应用本身也在消耗这些资源，如果不加任何限制，用户去操作随意的去操作我们的资源，就有可能导致一些冲突，甚至有可能导致我们的系统出现无法运行的问题，因此我们需要把用户和内核隔离开

进程的寻址空间划分成两部分：内核空间、用户空间

什么是寻址空间呢？我们的应用程序也好，还是内核空间也好，都是没有办法直接去物理内存的，而是通过分配一些虚拟内存映射到物理内存中，我们的内核和应用程序去访问虚拟内存的时候，就需要一个虚拟地址，这个地址是一个无符号的整数，比如一个32位的操作系统，他的带宽就是32，他的虚拟地址就是2的32次方，也就是说他寻址的范围就是0~2的32次方， 这片寻址空间对应的就是2的32个字节，就是4GB，这个4GB，会有3个GB分给用户空间，会有1GB给内核系统

![1653896377259](http://images.hellocode.top/37bae5261cee454693e4fb4f2a04b9e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在linux中，他们权限分成两个等级，0和3，用户空间只能执行受限的命令（Ring3），而且不能直接调用系统资源，必须通过内核提供的接口来访问内核空间可以执行特权命令（Ring0），调用一切系统资源，所以一般情况下，用户的操作是运行在用户空间，而内核运行的数据是在内核空间的，而有的情况下，一个应用程序需要去调用一些特权资源，去调用一些内核空间的操作，所以此时他俩需要在用户态和内核态之间进行切换

比如：

Linux系统为了提高IO效率，会在用户空间和内核空间都加入缓冲区：

- 写数据时，要把用户缓冲数据拷贝到内核缓冲区，然后写入设备

- 读数据时，要从设备读取数据到内核缓冲区，然后拷贝到用户缓冲区

针对这个操作：我们的用户在写读数据时，会去向内核态申请，想要读取内核的数据，而内核数据要去等待驱动程序从硬件上读取数据，当从磁盘上加载到数据之后，内核会将数据写入到内核的缓冲区中，然后再将数据拷贝到用户态的buffer中，然后再返回给应用程序，整体而言，速度慢，就是这个原因，为了加速，我们希望read也好，还是wait for data也最好都不要等待，或者时间尽量的短。

![1653896687354](http://images.hellocode.top/e80f63068dc84b08b43b7aa9e6706524~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 2.2. IO模型

在《UNIX网络编程》一书中，总结归纳了5种IO模型：

- 阻塞IO（Blocking IO）
- 非阻塞IO（Nonblocking IO）
- IO多路复用（IO Multiplexing）
- 信号驱动IO（Signal Driven IO）
- 异步IO（Asynchronous IO）

**阻塞IO**

应用程序想要去读取数据，他是无法直接去读取磁盘数据的，他需要先到内核里边去等待内核操作硬件拿到数据，这个过程就是1，是需要等待的，等到内核从磁盘上把数据加载出来之后，再把这个数据写给用户的缓存区，这个过程是2，如果是阻塞IO，那么整个过程中，用户从发起读请求开始，一直到读取到数据，都是一个阻塞状态。

![1653897115346](http://images.hellocode.top/3ea49d5ed508430699a34fb869b0498e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

用户去读取数据时，会去先发起recvform一个命令，去尝试从内核上加载数据，如果内核没有数据，那么用户就会等待，此时内核会去从硬件上读取数据，内核读取数据之后，会把数据拷贝到用户态，并且返回ok，整个过程，都是阻塞等待的，这就是阻塞IO

顾名思义，阻塞IO就是两个阶段都必须阻塞等待：

*阶段一：*

- 用户进程尝试读取数据（比如网卡数据）
- 此时数据尚未到达，内核需要等待数据
- 此时用户进程也处于阻塞状态

*阶段二：*

- 数据到达并拷贝到内核缓冲区，代表已就绪
- 将内核数据拷贝到用户缓冲区
- 拷贝过程中，用户进程依然阻塞等待
- 拷贝完成，用户进程解除阻塞，处理数据

可以看到，阻塞IO模型中，用户进程在两个阶段都是阻塞状态。

![1653897270074](http://images.hellocode.top/49651d855e564ed2b6619b1585156ea3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**非阻塞IO**

顾名思义，非阻塞IO的recvfrom操作会立即返回结果而不是阻塞用户进程。

*阶段一：*

- 用户进程尝试读取数据（比如网卡数据）
- 此时数据尚未到达，内核需要等待数据
- 返回异常给用户进程
- 用户进程拿到error后，再次尝试读取
- 循环往复，直到数据就绪

*阶段二：*

- 将内核数据拷贝到用户缓冲区
- 拷贝过程中，用户进程依然阻塞等待
- 拷贝完成，用户进程解除阻塞，处理数据
- 可以看到，非阻塞IO模型中，用户进程在第一个阶段是非阻塞，第二个阶段是阻塞状态。虽然是非阻塞，但性能并没有得到提高。而且忙等机制会导致CPU空转，CPU使用率暴增。

![1653897490116](http://images.hellocode.top/b2ae85405efe464da9864f9b1aeb84fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



**IO多路复用**

无论是阻塞IO还是非阻塞IO，用户应用在一阶段都需要调用recvfrom来获取数据，差别在于无数据时的处理方案：

- 如果调用recvfrom时，恰好没有数据，阻塞IO会使CPU阻塞，非阻塞IO使CPU空转，都不能充分发挥CPU的作用。 
- 如果调用recvfrom时，恰好有数据，则用户进程可以直接进入第二阶段，读取并处理数据

所以怎么看起来以上两种方式性能都不好

而在单线程情况下，只能依次处理IO事件，如果正在处理的IO事件恰好未就绪（数据不可读或不可写），线程就会被阻塞，所有IO事件都必须等待，性能自然会很差。

就比如服务员给顾客点餐，分两步：

- 顾客思考要吃什么（等待数据就绪）
- 顾客想好了，开始点餐（读取数据）

要提高效率有几种办法？

- 方案一：增加更多服务员（多线程） 
- 方案二：不排队，谁想好了吃什么（数据就绪了），服务员就给谁点餐（用户应用就去读取数据）

那么问题来了：用户进程如何知道内核中数据是否就绪呢？

所以接下来就需要详细的来解决多路复用模型是如何知道到底怎么知道内核数据是否就绪的问题了

*文件描述符*（File Descriptor）：简称FD，是一个从0 开始的无符号整数，用来关联Linux中的一个文件。在Linux中，一切皆文件，例如常规文件、视频、硬件设备等，当然也包括网络套接字（Socket）。

通过FD，我们的网络模型可以利用一个线程监听多个FD，并在某个FD可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源。

*阶段一：*

- 用户进程调用select，指定要监听的FD集合
- 核监听FD对应的多个socket
- 任意一个或多个socket数据就绪则返回readable
- 此过程中用户进程阻塞

*阶段二：*

- 用户进程找到就绪的socket
- 依次调用recvfrom读取数据
- 内核将数据拷贝到用户空间
- 用户进程处理数据

当用户去读取数据的时候，不再去直接调用recvfrom了，而是调用select的函数，select函数会将需要监听的数据交给内核，由内核去检查这些数据是否就绪了，如果说这个数据就绪了，就会通知应用程序数据就绪，然后来读取数据，再从内核中把数据拷贝给用户态，完成数据处理，如果N多个FD一个都没处理完，此时就进行等待。

用IO复用模式，可以确保去读数据的时候，数据是一定存在的，他的效率比原来的阻塞IO和非阻塞IO性能都要高

![1653898691736](http://images.hellocode.top/e8ebb697c70a454296384956f0bede2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

IO多路复用是利用单个线程来同时监听多个FD，并在某个FD可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源。不过监听FD的方式、通知的方式又有多种实现，常见的有：

- select
- poll
- epoll

其中select和pool相当于是当被监听的数据准备好之后，他会把你监听的FD整个数据都发给你，你需要到整个FD中去找，哪些是处理好了的，需要通过遍历的方式，所以性能也并不是那么好

而epoll，则相当于内核准备好了之后，他会把准备好的数据，直接发给你，咱们就省去了遍历的动作。

**异步IO**

这种方式，不仅仅是用户态在试图读取数据后，不阻塞，而且当内核的数据准备完成后，也不会阻塞

他会由内核将所有数据处理完成后，由内核将数据写入到用户态中，然后才算完成，所以性能极高，不会有任何阻塞，全部都由内核完成，可以看到，异步IO模型中，用户进程在两个阶段都是非阻塞状态。

![1653911877542](http://images.hellocode.top/cea8ae73cb7742059d275039fdcb9fbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



**信号驱动IO**

信号驱动IO是与内核建立SIGIO的信号关联并设置回调，当内核有FD就绪时，会发出SIGIO信号通知用户，期间用户应用可以执行其它业务，无需阻塞等待。

阶段一：

- 用户进程调用sigaction，注册信号处理函数
- 内核返回成功，开始监听FD
- 用户进程不阻塞等待，可以执行其它业务
- 当内核数据就绪后，回调用户进程的SIGIO处理函数

阶段二：

- 收到SIGIO回调信号
- 调用recvfrom，读取
- 内核将数据拷贝到用户空间
- 用户进程处理数据

![1653911776583](http://images.hellocode.top/a1fbb6b5420e4257a80195a70831a1e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

当有大量IO操作时，信号较多，SIGIO处理函数不能及时处理可能导致信号队列溢出，而且内核空间与用户空间的频繁信号交互性能也较低。

**对比**

![1653912219712](http://images.hellocode.top/6c40d35ac6e645be9d2257632275f1f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



#### 2.3. IO多路复用

**1、IO多路复用-select方式**

select是Linux最早是由的I/O多路复用技术：

简单说，就是我们把需要处理的数据封装成FD，然后在用户态时创建一个fd的集合（这个集合的大小是要监听的那个FD的最大值+1，但是大小整体是有限制的 ），这个集合的长度大小是有限制的，同时在这个集合中，标明出来我们要控制哪些数据，

比如要监听的数据，是1,2,5三个数据，此时会执行select函数，然后将整个fd发给内核态，内核态会去遍历用户态传递过来的数据，如果发现这里边都数据都没有就绪，就休眠，直到有数据准备好时，就会被唤醒，唤醒之后，再次遍历一遍，看看谁准备好了，然后再将处理掉没有准备好的数据，最后再将这个FD集合写回到用户态中去，此时用户态就知道了，奥，有人准备好了，但是对于用户态而言，并不知道谁处理好了，所以吧 用户态也需要去进行遍历，然后找到对应准备好数据的节点，再去发起读请求，我们会发现，这种模式下他虽然比阻塞IO和非阻塞IO好，但是依然有些麻烦的事情， 比如说频繁的传递fd集合，频繁的去遍历FD等问题

![1653900022580](http://images.hellocode.top/9d02e1a0c91b4f52b7ac6a2fdf40d96f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**2、IO多路复用模型-poll模式**

poll模式对select模式做了简单改进，但性能提升不明显，部分关键代码如下：

IO流程：

- 创建pollfd数组，向其中添加关注的fd信息，数组大小自定义
- 调用poll函数，将pollfd数组拷贝到内核空间，转链表存储，无上限
- 内核遍历fd，判断是否就绪
- 数据就绪或超时后，拷贝pollfd数组到用户空间，返回就绪fd数量n
- 用户进程判断n是否大于0,大于0则遍历pollfd数组，找到就绪的fd

*与select对比：*

- select模式中的fd_set大小固定为1024，而pollfd在内核中采用链表，理论上无上限
- 监听FD越多，每次遍历消耗时间也越久，性能反而会下降

![1653900721427](http://images.hellocode.top/5970859e476d4ce5b2b20140abaf2342~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**3、IO多路复用模型-epoll函数**

![image-20221115151819906](http://images.hellocode.top/51362271ecfb4ea0b27b307f27549e48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

epoll模式是对select和poll的改进，它提供了三个函数：

*eventpoll的函数，他内部包含两个东西*

- 红黑树 ->  记录的事要监听的FD
- 链表 -> 记录的是就绪的FD

*紧接着调用epoll_ctl操作*，将要监听的数据添加到红黑树上去，并且给每个fd设置一个监听函数，这个函数会在fd数据就绪时触发，就是准备好了，现在就把fd把数据添加到list_head中去

*调用epoll_wait函数*

就去等待，在用户态创建一个空的events 数组，当就绪之后，我们的回调函数会把数据添加到list_head中去，当调用这个函数的时候，会去检查list_head，当然这个过程需要参考配置的等待时间，可以等一定时间，也可以一直等， 如果在此过程中，检查到了list_head中有数据会将数据添加到链表中，此时将数据放入到events数组中，并且返回对应的操作的数量，用户态的此时收到响应后，从events中拿到对应准备好的数据的节点，再去调用方法去拿数据。

**小总结：**

select模式存在的三个问题：

- 能监听的FD最大不超过1024
- 每次select都需要把所有要监听的FD都拷贝到内核空间
- 每次都要遍历所有FD来判断就绪状态

poll模式的问题：

- poll利用链表解决了select中监听FD上限的问题，但依然要遍历所有FD，如果监听较多，性能会下降

epoll模式中如何解决这些问题的？

- 基于epoll实例中的红黑树保存要监听的FD，理论上无上限，而且增删改查效率都非常高
- 每个FD只需要执行一次epoll_ctl添加到红黑树，以后每次epol_wait无需传递任何参数，无需重复拷贝FD到内核空间
- 利用ep_poll_callback机制来监听FD状态，无需遍历所有FD，因此性能不会随监听的FD数量增多而下降

**网络模型-epoll中的ET和LT**

当FD有数据可读时，我们调用epoll_wait（或者select、poll）可以得到通知。但是事件通知的模式有两种：

- LevelTriggered：简称LT，也叫做水平触发。只要某个FD中有数据可读，每次调用epoll_wait都会得到通知。
- EdgeTriggered：简称ET，也叫做边沿触发。只有在某个FD有状态变化时，调用epoll_wait才会被通知。

举个栗子：

- 假设一个客户端socket对应的FD已经注册到了epoll实例中
- 客户端socket发送了2kb的数据
- 服务端调用epoll_wait，得到通知说FD就绪
- 服务端从FD读取了1kb数据回到步骤3（再次调用epoll_wait，形成循环）

结论

如果我们采用LT模式，因为FD中仍有1kb数据，则第⑤步依然会返回结果，并且得到通知 如果我们采用ET模式，因为第③步已经消费了FD可读事件，第⑤步FD状态没有变化，因此epoll_wait不会返回，数据无法读取，客户端响应超时。

**网络模型-基于epoll的服务器端流程**

![1653902845082](http://images.hellocode.top/c18bb42864314bb7a2d5074952de7f89~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

服务器启动以后，服务端会去调用epoll_create，创建一个epoll实例，epoll实例中包含两个数据

- 红黑树（为空）：rb_root 用来去记录需要被监听的FD
- 链表（为空）：list_head，用来存放已经就绪的FD

创建好了之后，会去调用epoll_ctl函数，此函数会会将需要监听的数据添加到rb_root中去，并且对当前这些存在于红黑树的节点设置回调函数，当这些被监听的数据一旦准备完成，就会被调用，而调用的结果就是将红黑树的fd添加到list_head中去(但是此时并没有完成)

3、当第二步完成后，就会调用epoll_wait函数，这个函数会去校验是否有数据准备完毕（因为数据一旦准备就绪，就会被回调函数添加到list_head中），在等待了一段时间后(可以进行配置)，如果等够了超时时间，则返回没有数据，如果有，则进一步判断当前是什么事件，如果是建立连接时间，则调用accept() 接受客户端socket，拿到建立连接的socket，然后建立起来连接，如果是其他事件，则把数据进行写出

**网络模型-Redis是单线程的吗？为什么使用单线程**

*Redis到底是单线程还是多线程？*

- 如果仅仅聊Redis的核心业务部分（命令处理），答案是单线程
- 如果是聊整个Redis，那么答案就是多线程

在Redis版本迭代过程中，在两个重要的时间节点上引入了多线程的支持：

- Redis v4.0：引入多线程异步处理一些耗时较旧的任务，例如异步删除命令unlink
- Redis v6.0：在核心网络模型中引入 多线程，进一步提高对于多核CPU的利用率

因此，对于Redis的核心网络模型，在Redis 6.0之前确实都是单线程。是利用epoll（Linux系统）这样的IO多路复用技术在事件循环中不断处理客户端情况。

*为什么Redis要选择单线程？*

- 抛开持久化不谈，Redis是纯 内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度，因此多线程并不会带来巨大的性能提升。
- 多线程会导致过多的上下文切换，带来不必要的开销
- 引入多线程会面临线程安全问题，必然要引入线程锁这样的安全手段，实现复杂度增高，而且性能也会大打折扣

#### 2.4. 源码分析

Redis通过*IO多路复用*来提高网络性能，并且支持各种不同的多路复用实现，并且将这些实现进行封装， 提供了统一的高性能事件库API库 AE：

![在这里插入图片描述](http://images.hellocode.top/34a8bc8682354506aa0c31e3478b76b6.png)

来看下Redis单线程网络模型的整个流程：

![在这里插入图片描述](http://images.hellocode.top/8d7a419fc7034fa1959abdde1f087c3e.png)

#### 2.5. Redis单线程网络模型

![在这里插入图片描述](http://images.hellocode.top/7f937be0fa934ef48e8cf81adef4572d.png)

#### 2.6. Redis多线程网络模型

Redis 6.0版本中引入了多线程，目的是为了提高IO读写效率。因此在解析客户端命令、写响应结果时采用了多线程。核心的命令执行、IO多路复用模块依然是由主线程执行

![在这里插入图片描述](http://images.hellocode.top/6c754999070d4b90b0cb5d00ca697584.png)

### 3、通信协议

**前言**

Redis是一个CS架构的软件，通信一般分两步（不包括pipeline和PubSub）：

- 客户端（client）向服务端（server）发送一条命令
- 服务端解析并执行命令，返回响应结果给客户端

因此客户端发送命令的格式、服务端响应结果的格式必须有一个规范，这个规范就是通信协议。

而在Redis中采用的是RESP（Redis Serialization Protocol）协议：

- Redis 1.2版本引入了RESP协议
- Redis 2.0版本中成为与Redis服务端通信的标准，称为RESP2
- Redis 6.0版本中，从RESP2升级到了RESP3协议，增加了更多数据类型并且支持6.0的新特性–客户端缓存

但目前，默认使用的依然是RESP2协议，也是我们要学习的协议版本（以下简称RESP）

**RESP协议-数据类型**

在RESP中，通过首字节的字符来区分不同数据类型，常用的数据类型包括5种：

- 单行字符串：首字节是 `+` ，后面跟上单行字符串，以CRLF（ “\r\n” ）结尾。例如返回"OK"： `+OK\r\n`

- 错误（Errors）：首字节是 `-` ，与单行字符串格式一样，只是字符串是异常信息，例如：`-Error message\r\n`

- 数值：首字节是 `:`，后面跟上数字格式的字符串，以CRLF结尾。例如：`:10\r\n`

- 多行字符串：首字节是 `$` ，表示二进制安全的字符串，最大支持512MB：

  ![在这里插入图片描述](http://images.hellocode.top/2861ebc6353543519513a14ee38e6f98.png)

- 数组：首字节是 ‘*’，后面跟上数组元素个数，再跟上元素，元素数据类型不限:

  ![在这里插入图片描述](http://images.hellocode.top/2abe5c657ad1422e9e87c50cc590d1de.png)

  ![在这里插入图片描述](http://images.hellocode.top/6ed46a36f2b44bc0be1eb63dc53a0093.png)

**模拟redis客户端发送命令和解析数据**

```java
import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class Main {

    static Socket s;
    static PrintWriter writer;
    static BufferedReader reader;

    public static void main(String[] args) {
        try {
            // 1.建立连接
            String host = "192.168.150.101";
            int port = 6379;
            s = new Socket(host, port);
            // 2.获取输出流、输入流
            writer = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8));//tcp发送请求，就是向socket中发送数据，获取数据，也是从socket中获取
            reader = new BufferedReader(new InputStreamReader(s.getInputStream(), StandardCharsets.UTF_8));//理应用字节流，但这里为了方便用字符流，按行读

            // 3.发出请求
            // 3.1.获取授权 auth 123321
            sendRequest("auth", "123456");//redis设置了密码就要授权
            Object obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 三月
            sendRequest("set", "name", "三月");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 三月
            sendRequest("get", "name");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 虎哥
            sendRequest("mget", "name", "num", "msg");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 5.释放连接
            try {
                if (reader != null) reader.close();
                if (writer != null) writer.close();
                if (s != null) s.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // 解析命令 set name sanyue
    /**set name sanyue
   	*3/r/n
   	$3/r/nset/r/n
   	$4/r/nname/r/n
   	$/6/r/nsanyue/r/n
    */
    private static void sendRequest(String ... args) {
        writer.println("*" + args.length);//字符流println结尾会打印换行
        for (String arg : args) {
            writer.println("$" + arg.getBytes(StandardCharsets.UTF_8).length);
            writer.println(arg);
        }
        writer.flush();
    }
    //解析命令
    private static Object handleResponse() throws IOException {
        // 读取首字节
        int prefix = reader.read();
        // 判断数据类型标示
        switch (prefix) {
            case '+': // 单行字符串，直接读一行
                return reader.readLine();
            case '-': // 异常，也读一行
                throw new RuntimeException(reader.readLine());
            case ':': // 数字
                return Long.parseLong(reader.readLine());
            case '$': // 多行字符串
                // 先读长度
                int len = Integer.parseInt(reader.readLine());
                if (len == -1) {
                    return null;
                }
                if (len == 0) {
                    return "";
                }
                // 再读数据,读len个字节。我们假设没有特殊字符，所以读一行（简化）
                return reader.readLine();
            case '*':
                return readBulkString();
            default:
                throw new RuntimeException("错误的数据格式！");
        }
    }

    private static Object readBulkString() throws IOException {
        // 获取数组大小
        int len = Integer.parseInt(reader.readLine());
        if (len <= 0) {
            return null;
        }
        // 定义集合，接收多个元素
        List<Object> list = new ArrayList<>(len);
        // 遍历，依次读取每个元素
        for (int i = 0; i < len; i++) {
            list.add(handleResponse());
        }
        return list;
    }
}
```

### 4、内存回收

#### 4.1. 过期策略

在学习Redis缓存的时候我们说过，可以通过expire命令给Redis的key设置TTL（存活时间）：

![在这里插入图片描述](http://images.hellocode.top/16f136ad5cde4ae48878b5174019929b.png)

可以发现，当key的TTL到期以后，再次访问name返回的是nil，说明这个key已经不存在了，对应的内存也得到释放。从而起到内存回收的目的。

**过期策略-DB结构**

Redis本身是一个典型的key-value内存存储数据库，因此所有的key、value都保存在之前学习过的Dict结构中。不过在其database结构体中，有两个Dict：一个用来记录key-value；另一个用来记录key-TTL。

![在这里插入图片描述](http://images.hellocode.top/b5e3ff151b68470e8149b8ed0efbd029.png)

![在这里插入图片描述](http://images.hellocode.top/b5fb0245fdd44487a7b81c59811dec93.png)

**过期策略-惰性删除**

惰性删除：顾明思议并不是在TTL到期后就立刻删除，而是在访问一个key的时候，检查该key的存活时间，如果已经过期才执行删除。

![在这里插入图片描述](http://images.hellocode.top/53138b5972f5426a917a6d44a96dccbf.png)

**过期策略-周期删除**

周期删除：顾明思议是通过一个定时任务，周期性的抽样部分过期的key，然后执行删除。执行周期有两种：

- Redis服务初始化函数initServer()中设置定时任务，按照server.hz的频率来执行过期key清理，模式为SLOW
- Redis的每个事件循环前会调用beforeSleep()函数，执行过期key清理，模式为FAST

![在这里插入图片描述](http://images.hellocode.top/4c323aab49a94d768d3a62c1b5d87dfc.png)

**SLOW和FAST模式对比**

SLOW模式规则：

- 执行频率受server.hz影响，默认为10，即每秒执行10次，每个执行周期100ms。
- 执行清理耗时不超过一次执行周期的25%.默认slow模式耗时不超过25ms
- 逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
- 如果没达到时间上限（25ms）并且过期key比例大于10%，再进行一次抽样，否则结束

FAST模式规则（过期key比例小于10%不执行 ）：

- 执行频率受beforeSleep()调用频率影响，但两次FAST模式间隔不低于2ms
- 执行清理耗时不超过1ms
- 逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
- 如果没达到时间上限（1ms）并且过期key比例大于10%，再进行一次抽样，否则结束

#### 4.2. 淘汰策略

内存淘汰：就是当Redis内存使用达到设置的上限时，主动挑选部分key删除以释放更多内存的流程。Redis会在处理客户端命令的方法processCommand()中尝试做内存淘汰：

![在这里插入图片描述](http://images.hellocode.top/bbb6ab1d107f4f339dec2d68cc7afb34.png)

**Redis支持的淘汰策略**

Redis支持8种不同策略来选择要删除的key：

- noeviction： 不淘汰任何key，但是内存满时不允许写入新数据，默认就是这种策略。
- volatile-ttl： 对设置了TTL的key，比较key的剩余TTL值，TTL越小越先被淘汰
- allkeys-random：对全体key ，随机进行淘汰。也就是直接从db->dict中随机挑选
- volatile-random：对设置了TTL的key ，随机进行淘汰。也就是从db->expires中随机挑选。
- allkeys-lru： 对全体key，基于LRU算法进行淘汰
- volatile-lru： 对设置了TTL的key，基于LRU算法进行淘汰
- allkeys-lfu： 对全体key，基于LFU算法进行淘汰
- volatile-lfu： 对设置了TTL的key，基于LFI算法进行淘汰

![在这里插入图片描述](http://images.hellocode.top/926441d9a48548318d7aa6acb86aacfc.png)

比较容易混淆的有两个：

- LRU（Least Recently Used），最少最近使用。用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高。
- LFU（Least Frequently Used），最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高。

Redis的数据都会被封装为RedisObject结构：

![在这里插入图片描述](http://images.hellocode.top/beefa3aad57f45fbbed5028d2f8f1859.png)

LFU的访问次数之所以叫做逻辑访问次数，是因为并不是每次key被访问都计数，而是通过运算：

- 生成0~1之间的随机数R
- 计算 (旧次数 * lfu_log_factor + 1)，记录为P
- 如果 R < P ，则计数器 + 1，且最大不超过255
- 访问次数会随时间衰减，距离上一次访问时间每隔 lfu_decay_time 分钟，计数器 -1

**执行流程**

![在这里插入图片描述](http://images.hellocode.top/9fb219a5af7f46e488bac3670c1a8c1f.png)