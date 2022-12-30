---
title: "Zookeeper"
order: 5
category:
  - 框架 | 中间件
---

# Zookeeper

## 一、概述

- Zookeeper是Apache Hadoop项目下的一个子项目，是一个树形目录服务
- Zookeeper翻译过来就是 动物管理员，他是用来管理Hadoop（大象）、Hive（蜜蜂）、Pig（小猪）的管理员。简称zk
- Zookeeper是一个分布式的、开源的分布式应用程序的协调服务
- Zookeeper提供的主要功能包括
  - 配置管理
  - 分布式锁
  - 集群管理

> 安装与启动参看Dubbo注册中心部分

## 二、命令操作

### 1、数据模型

- Zookeeper是一个树形目录服务，其数据模型和Unix的文件系统目录树很类似，拥有一个层次化结构
- 这里面的每一个节点都被称为：ZNode，每个节点上都会保存自己的数据和节点信息
- 节点可以拥有子节点，同时也允许少量（1MB）数据存储在该节点之下

![](http://images.hellocode.top/gslDpkZUAOJbTof.png)

*节点可以分为四大类*

- PERSISTENT 持久化节点
- EPHEMERAL 临时节点：-e
- PERSISTENT_SEQUENTIAL 持久化顺序节点：-s
- EPHEMERAL_SEQUENTIAL 临时顺序节点：-es

### 2、服务端

- 启动ZooKeeper服务：`./zkServer.sh start`
- 查看ZooKeeper服务状态：`./zkServer.sh status`
- 停止ZooKeeper服务：`./zkServer.sh stop`
- 重启ZooKeeper服务：`./zkServer.sh restart`

### 3、客户端

**基本CRUD**

- 连接ZooKeeper服务端：`./zkCli.sh -server ip:2181`（连接本机的话不需要`-server ip:端口`）
- 断开连接：`quit`
- 查看指定目录下的子节点：`ls /` 、`ls /dubbo/config`
- 查看命令帮助：`help`
- 创建节点：`create /节点名 [节点数据]`
- 获取数据：`get /节点名`
- 设置数据：`set /节点名 数据`
- 删除节点：`delete /节点名`

> 当被删节点含有子节点时，不能使用delete删除，需要使用`deleteall`命令

**临时顺序节点**

- 创建临时节点：`create -e /节点名`
- 创建顺序节点：`create -s /节点名`
- 创建临时顺序节点： `create -es /节点名`
- 查看节点详细信息：`ls2 /路径`（已经被淘汰，替换为：）`ls -s /路径`
  - czxid：节点被创建的事务id
  - ctime：创建时间
  - mzxid：最后一次被更新的事务id
  - mtime：修改时间
  - pzxid：子节点列表最后一次被更新的事务id
  - cversion：子节点的版本号
  - dataversion：数据版本号
  - aclversion：权限版本号
  - ephemeralOwner：用于临时节点，代表临时节点的事务id，如果为持久节点则为0
  - dataLength：节点存储的数据长度
  - numChildrean：当前节点的子节点个数

## 三、JavaAPI操作

### 1、Curator

**简介**

- Curator 是 Apache ZooKeeper 的Java客户端库
- 常见的ZooKeeper Java API
  - 原生Java API
  - ZkClient
  - Curator

- Curator项目的目标是简化ZooKeeper客户端的使用
- Curator 最初是Netfix 研发的，后来捐献了Apache基金会，目前是Apache的顶级项目
- 官网：[http://curator.apache.org/](http://curator.apache.org/)

**常用操作**

- 建立连接
- 添加节点
- 删除节点
- 修改节点
- 查询节点
- Watch事件监听
- 分布式锁实现

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>

    <!--curator-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>4.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
        <version>4.0.0</version>
    </dependency>

    <!--日志-->
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
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**建立连接**

```java
@Test
public void testConnect(){
    /*
    connectString 连接字符串。zk server 地址和端口（多个用逗号隔开） "192.168.23.129:2181，192.131.34.168:2181"
    sessionTimeoutMs 会话超时时间  单位ms
    connectionTimeoutMs 连接超时时间 单位ms
    retryPolicy 重试策略
    */
    // 第一种方式
    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);
    // CuratorFramework client = CuratorFrameworkFactory.newClient("192.168.23.129:2181",
                                                                60 * 1000, 15 * 1000, retryPolicy);
    // 开启连接
    // client.start();

    // 第二种方式
    CuratorFramework client = CuratorFrameworkFactory.builder().connectString("192.168.23.129:2181")
        .sessionTimeoutMs(60 * 1000).connectionTimeoutMs(15 * 1000).retryPolicy(retryPolicy).namespace("hellocode").build();
    client.start();
}
```

> 第二种方式指定namespace可以简化操作，让指定的名称空间作为根目录

**添加节点**

```java
public class CuratorTest {
    private CuratorFramework client;
    @Before
    public void testConnect(){
        // 建立连接
        RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);
        client = CuratorFrameworkFactory.builder().connectString("192.168.23.129:2181")
                .sessionTimeoutMs(60 * 1000).connectionTimeoutMs(15 * 1000).retryPolicy(retryPolicy).namespace("hellocode").build();
        client.start();
    }

    /**
     * 创建节点：create 持久 临时 顺序
     * 1. 基本创建：create().forPath("")
     * 2. 创建节点 带有数据：create().forPath("",data)
     * 3. 设置节点的类型：create().withMode(节点类型).forPath("",data)
     * 4，创建多级节点：create().withMode(节点类型).creatingParentsIfNeeded().forPath("",data)
     */
    @Test
    public void testCreate() throws Exception {
        // 1. 基本创建：create().forPath("")
        // 如果创建节点没有指定数据，则默认当前客户端的ip作为数据存储
        String path = client.create().forPath("/app1");
        System.out.println(path);
    }
    @Test
    public void testCreate2() throws Exception {
        // 2. 创建节点 带有数据：create().forPath("",data)
        // 如果创建节点没有指定数据，则默认当前客户端的ip作为数据存储
        String path = client.create().forPath("/app2","Hello World".getBytes());
        System.out.println(path);
    }
    @Test
    public void testCreate3() throws Exception {
        // 3. 设置节点的类型：create().withMode(节点类型).forPath("",data)
        // 如果创建节点没有指定数据，则默认当前客户端的ip作为数据存储
        String path = client.create().withMode(CreateMode.EPHEMERAL).forPath("/app3");
        System.out.println(path);
    }
    @Test
    public void testCreate4() throws Exception {
        // 4，创建多级节点：create().withMode(节点类型).creatingParentsIfNeeded().forPath("",data)
        // 如果创建节点没有指定数据，则默认当前客户端的ip作为数据存储
        String path = client.create().creatingParentsIfNeeded().forPath("/app3/p1");
        System.out.println(path);
    }

    @After
    public void close(){
        if(client != null){
            client.close();
        }
    }
}
```

**查询节点**

```java
/**
     * 查询节点：
     * 1. 查询数据：get：getData().forPath()
     * 2. 查询子节点：ls：getChildren().forPath()
     * 3. 查询节点状态信息：ls -s：getData().storingStatIn(状态对象).forPath()
*/
@Test
public void testGet1() throws Exception {
    // 1. 查询数据：get：getData().forPath()
    byte[] bytes = client.getData().forPath("/app2");
    System.out.println(new String(bytes));
}

@Test
public void testGet2() throws Exception {
    // 2. 查询子节点：ls：getChildren().forPath()
    List<String> childrens = client.getChildren().forPath("/");
    System.out.println(childrens);
}

@Test
public void testGet3() throws Exception {
    // 3. 查询节点状态信息：ls -s：getData().storingStatIn(状态对象).forPath()
    Stat stat = new Stat();
    client.getData().storingStatIn(stat).forPath("/app1");
    System.out.println(stat);
}
```

**修改节点**

```java
/*
    *  修改数据
    *   1. 修改数据 ：setData().forPath()
    *   2. 根据版本修改：setData().withVersion(version).forPath()
    *   version是通过查询出来的。目的是为了让其他客户端或者线程不干扰当前操作
* */
@Test
public void testSet() throws Exception {
    Stat stat = client.setData().forPath("/app1", "hehe".getBytes(StandardCharsets.UTF_8));
    System.out.println(stat);
}

@Test
public void testForVersion() throws Exception {
    Stat stat = new Stat();
    client.getData().storingStatIn(stat).forPath("/app1");
    client.setData().withVersion(stat.getVersion()).forPath("/app1", "haha".getBytes(StandardCharsets.UTF_8));
}
```

**删除节点**

```java
/*
     *  删除节点 delete deleteall
     *  1. 删除单个节点
     *  2. 删除带有子节点的节点
     *  3. 必须成功的删除（防止网络抖动）
     *  4. 回调
* */
@Test
public void testDelete() throws Exception {
    // 1. 删除单个节点
    client.delete().forPath("/app1");
}

@Test
public void testDelete2() throws Exception {
    // 2. 删除带有子节点的节点
    client.delete().deletingChildrenIfNeeded().forPath("/app3");
}

@Test
public void testDelete3() throws Exception {
    // 3. 必须成功的删除（防止网络抖动）
    client.delete().guaranteed().forPath("/app2");
}

@Test
public void testDelete4() throws Exception {
    // 4. 回调
    client.delete().guaranteed().inBackground(new BackgroundCallback() {
        @Override
        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
            System.out.println(curatorEvent);
        }
    }).forPath("/app2");
}
```

### 2、Watch监听

- ZooKeeper允许用户在指定节点上注册一些Watcher，并且在一些特定事件触发的时候，ZooKeeper服务端会将事件通知到感兴趣的客户端上去，该机制是ZooKeeper实现分布式协调服务的重要特性
- ZooKeeper中引入了Watcher机制来实现了发布/订阅功能，能够让多个订阅者同时监听某一个对象，当一个对象自身状态变化时，会通知所有订阅者
- ZooKeeper原生支持通过注册Watcher来进行事件监听，但是其使用并不是特别方便，需要开发人员自己反复注册Watcher，比较繁琐
- Curator引入了Cache来实现对ZooKeeper服务端事件的监听
- ZooKeeper提供了三种Watcher
  - NodeCache：只是监听某一个特定的节点
  - PathChildrenCache：监控一个ZNode的子节点
  - TreeCache：可以监控整个树上的所有节点，类似于PathChildrenCache和NodeCache的组合

**NodeCache**

```java
@Test
public void testNodeCache() throws Exception {
    // 1. 创建NodeCache对象
    NodeCache nodeCache = new NodeCache(client,"/app1");
    // 2.注册监听
    nodeCache.getListenable().addListener(new NodeCacheListener() {
        @Override
        public void nodeChanged() throws Exception {
            System.out.println("节点变化了~~");

            // 获取修改后节点的数据
            byte[] data = nodeCache.getCurrentData().getData();
            System.out.println(new String(data));
        }
    });
    nodeCache.start();
}
```

**PathChildrenCache**

```java
@Test
public void testPathChildrenCache() throws Exception {
    PathChildrenCache pathChildrenCache = new PathChildrenCache(client,"/app2",true);
    pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
        @Override
        public void childEvent(CuratorFramework curatorFramework, PathChildrenCacheEvent pathChildrenCacheEvent) throws Exception {
            System.out.println("子节点变化了~~~");
            if(pathChildrenCacheEvent.getType().equals(PathChildrenCacheEvent.Type.CHILD_UPDATED)){
                System.out.println("子节点更改了~~~");
                System.out.println(new String(pathChildrenCacheEvent.getData().getData()));
            }
        }
    });
    pathChildrenCache.start();
    while (true){

    }
}
```

**TreeCache**

```java
@Test
public void testTreeCache() throws Exception {
    TreeCache treeCache = new TreeCache(client,"/app2");
    treeCache.getListenable().addListener(new TreeCacheListener() {
        @Override
        public void childEvent(CuratorFramework curatorFramework, TreeCacheEvent treeCacheEvent) throws Exception {
            System.out.println("节点变化了");
            System.out.println(treeCacheEvent);
        }
    });
    treeCache.start();
    while (true){

    }
}
```

## 四、分布式锁

### 1、概述

- 在我们进行单机应用开发，涉及并发同步的时候，我们往往采用synchronized或者Lock的方式来解决多线程间的代码同步问题，这时多线程的运行都是在同一个JVM之下，没有任何问题
- 但当我们的应用是分布式集群工作的情况下，属于多JVM下的工作环境，跨JVM之间已经无法通过多线程的锁解决同步问题
- 那么就需要一种更高级的锁机制，来处理这种*跨机器的进程之间的数据同步问题*——这就是分布式锁

![](http://images.hellocode.top/301301.jpg)

![](http://images.hellocode.top/301303.jpg)

### 2、原理

> 核心思想：当客户端要获取锁，则创建节点，使用完锁，则删除该节点

![](http://images.hellocode.top/1.webp)

1. 客户端获取锁时，在lock节点下创建*临时顺序*节点
2. 然后获取/lock下面的所有子节点，客户端获取到所有的子节点之后，如果发现自己创建的子节点序号最小，那么就认为该客户端获取到了锁。使用完锁后，将该节点删除
3. 如果发现自己创建的节点并非lock所有子节点中最小的，说明自己还没有获取到锁，此时客户端需要找到比自己小的那个节点，同时对其注册事件监听器，监听删除事件
4. 如果发现比自己小的那个节点被删除，则客户端的Watcher会收到相应的通知，此时再次判断自己创建的节点是否是lock子节点中序号最小的，如果是则获取到了锁，如果不是则重复以上步骤继续获取到比自己小的一个节点并注册监听

### 3、售票案例

**Curator实现分布式锁API**

Curator中有五种锁方案：

- InterProcessSemaphoreMutex：分布式排它锁（非可重入锁）
- InterProcessMutex：分布式可重入排它锁
- InterProcessReadWriteLock：分布式读写锁
- InterProcessMultiLock：将多个锁作为单个实体管理的容器
- InterProcessSemaphoreV2：共享信号量

**模拟12306售票案例**

![](http://images.hellocode.top/301302.jpg)

*Ticket12306*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月18日 11:18
 */
public class Ticket12306 implements Runnable{

    private int tickets = 10;
    private InterProcessMutex lock;

    public Ticket12306(){
        RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);
        CuratorFramework client = CuratorFrameworkFactory.builder()
            .connectString("192.168.23.129:2181")
            .connectionTimeoutMs(15 * 1000)
            .sessionTimeoutMs(60 * 1000)
            .retryPolicy(retryPolicy)
            .build();
        client.start();
        lock = new InterProcessMutex(client,"/lock");
    }

    @Override
    public void run() {
        while(true){
            try {
                // 获取锁
                lock.acquire(3, TimeUnit.SECONDS);
                if(tickets > 0){
                    System.out.println(Thread.currentThread() + ":" + tickets--);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }finally {
                // 释放锁
                try {
                    lock.release();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

*LockTest*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月18日 17:11
 */
public class LockTest {
    public static void main(String[] args) {
        Ticket12306 ticket = new Ticket12306();

        // 创建客户端
        Thread t1 = new Thread(ticket,"携程");
        Thread t2 = new Thread(ticket,"飞猪");

        t1.start();
        t2.start();
    }
}
```

## 五、集群

### 1、搭建

**要求**

真实的集群是需要部署在不同的服务器上的，但是在我们测试时同时启动很多个虚拟机内存会吃不消，所以我们通常会搭建*伪集群*，也就是把所有的服务都搭建在一台虚拟机上，用端口进行区分

**配置集群**

1. 在每个zookeeper的data目录下创建一个myid文件，内容分别是1、2、3。这个文件就是记录每个服务器的id

   ```shell
   echo 1 > /usr/local/zookeeper-cluster/zookeeper-1/data/myid
   echo 2 > /usr/local/zookeeper-cluster/zookeeper-2/data/myid
   echo 3 > /usr/local/zookeeper-cluster/zookeeper-3/data/myid
   ```

2. 在每一个zookeeper的zoo.cfg配置客户端访问端口（clientPort）和集群服务器IP列表
   
集群服务器IP列表如下
   
   ```shell
   vim /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo.cfg
   vim /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo.cfg
   vim /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo.cfg
   
   server.1=192.168.23.129:2881:3881
   server.2=192.168.23.129:2882:3882
   server.3=192.168.23.129:2883:3883
```
   
   > server.服务器id=服务器IP地址:服务器之间通信端口（默认2881）:服务器之间投票选举端口（默认3881）
   >
   > 真实环境搭建集群时的2881和3881就直接使用默认值即可

**启动集群**

启动集群就是分别启动每个实例

```shell
/usr/local/zookeeper-cluster/zookeeper-1/bin/zkServer.sh start
/usr/local/zookeeper-cluster/zookeeper-2/bin/zkServer.sh start
/usr/local/zookeeper-cluster/zookeeper-3/bin/zkServer.sh start
```

启动后查询一下运行状态

```shell
/usr/local/zookeeper-cluster/zookeeper-1/bin/zkServer.sh status
/usr/local/zookeeper-cluster/zookeeper-2/bin/zkServer.sh status
/usr/local/zookeeper-cluster/zookeeper-3/bin/zkServer.sh status
```

### 2、故障测试

- 3个节点的集群，1个从服务器挂掉，集群正常
- 3个节点的集群，2个从服务器都挂掉，主服务器也无法运行。因为可运行的机器没有超过集群总数量的半数
- 3个节点的集群，2个从服务器都挂掉，再重启一个从服务器，主服务器恢复运行，集群恢复正常
- 当主服务器挂掉，将在正常的从服务器中重新进行选举，选举出新的leader

### 3、集群角色

在ZooKeeper集群服务中有三个角色：

- Leader 领导者
  1. 处理事务请求
  2. 集群内部各服务器的调度者
- Follower 跟随者
  1. 处理客户端非事务请求，转发事务请求给Leader服务器
  2. 参与Leader选举投票
- Observer 观察者
  1. 处理客户端非事务请求，转发事务请求给Leader服务器

![](http://images.hellocode.top/2.webp)