---
title: "Redis"
order: 5
category:
  - 数据库
---

# Redis

### Redis入门

#### NoSQL

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

> NoSQL并不是一个数据库，只是对关系型数据库的补充，是一个辅助工具

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

**解决方案（电商场景）**

1. 商品基本信息（MySQL）
   - 名称
   - 价格
   - 厂商
2. 商品附加信息（MongoDB）
   - 描述
   - 详情
   - 评论
3. 图片信息（分布式文件系统）
4. 搜索关键字（ES、Lucene、solr）
5. *热点信息*（Redis、memcache、tair）
   - *高频*
   - *波段性*（不是稳定的热度很高，具有一定时效）

> 即所有基础信息都是存储在MySQL中，在它之上，就是类似于MongoDB、Redis等NoSQL，他们原来并没有数据，是把MySQL中的数据加载进去，由此来提高效率

#### Redis

**概念**：*Redis（REmote DIctionary Server）*是用C语言开发的一个开源的高性能键值对（*key-value*）数据库

**特征**

1. 数据库之间没有必然的关联关系
2. 内部采用单线程机制进行工作（单线程不会有数据并发问题，安全）
3. 高性能
   官方提提供测试数据，50个并发执行100000个请求，读的速度是110000次/s，写的速度是81000次/s
4. 多数据类型支持
   - 字符串类型——string
   - 列表类型——list
   - 散列类型——hash
   - 集合类型——set
   - 有序集合类型——zset/sorted_set（仅了解，应用场景不多）
5. 支持持久化，可以进行数据灾难恢复

**应用场景**

- 为热点数据加速查询（*主要场景*），如热点商品、热点新闻、热点资讯、推广类等高访问量信息等
- 即时信息查询，如各类排行榜、网站访问统计、公交到站信息、在线人数信息（聊天室、网站）、设备信号等
- 时效性信息控制，如验证码控制、投票控制等
- 分布式数据共享，如分布式集群架构中的session分离
- 消息队列（了解即可，已经慢慢的弱化）

#### 下载与安装

**基于Centos 7 安装Redis**

1. 下载安装包
   `wget http://download.redis.io/releases/redis-5.0.0.tar.gz`
2. 解压安装包
   `tar -zxvf redis-5.0.0.tar.gz`
3. 编译（再解压的目录中执行）
   `make`
4. 安装（在解压的目录中执行）
   `make install`

解压完成后，进入src目录，查看redis开头的文件，就是可执行的文件
![](http://images.hellocode.top/rjzEQBI6mD3yXTF.png)

> Redis-server服务器启动指令；Redis-cli客户端启动指令

再退回上一级，可以看到redis.conf，即为Redis的配置文件

> 在根目录下，redis目录名为`redis-5.0.0`,名称比较长，使用起来不太方便，可以做一个快链（快捷方式）
> `ln -s redis-5.0.0 redis`

#### 服务器与客户端启动

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
  `redis-cli [-h host] [-p port]`
- 范例
  `redis-cli -h 61.129.65.248 -p 6384`

> 注意：服务器启动指定端口使用的是`--port`，客户端启动指定端口使用的是`-p`，注意`-`的数量是不同的

**基础环境设置约定**

- 创建配置文件存储目录
  `mkdir conf`
- 创建服务器文件存储目录（包含日志、数据、临时配置文件等）
  `mkdir data`
- 创建快速访问链接
  `ln -s redis-5.0.0 redis`

#### 配置文件启动与常用配置

- 过滤原redis.conf配置文件并保存到redis-6379.conf文件
  `cat redis.conf | grep -v "#" | grep -v "^$" > redis-6379.conf`

![](http://images.hellocode.top/FQE8Z62W4AfIubL.png)

- bind：绑定主机地址

- prot：指定端口号

- timeout：客户端连接超时时间（客户端多久无操作就将其关闭）

- daemonize：设置服务器以守护进程的方式运行，开启后服务器控制台中将打印服务器运行信息（同日志内容相同）

- loglevel：日志等级（debug/*verbose*/notice/warning）

  > 日志级别开发期设置为verbose即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度

- logfile：日志文件

- dir ./：设置服务器文件保存地址（data目录）

- maxclients：服务器允许客户端连接最大数量，默认0，表示无限制。当客户端连接达到上限后，Redis会拒绝新的连接

**修改配置文件**

![](http://images.hellocode.top/bRlmdJwA1IQ4YoZ.png)

**启动**

`redis-server /redis/conf/redis-6379.conf`

*将darmonize改为yes，方便学习，开发中还是使用前台启动*

#### 基本操作

**信息读写**

- 设置key、value数据
  `set key value`
- 范例
  `set name hellocode`
- 根据key查询对应的value，如果不存在，返回空(null)
  `get key`
- 范例
  `get name`

![](http://images.hellocode.top/udBTViE8vkSs7RA.png)

**帮助信息**

- 获取命令帮助文档
  `help [command]`
- 范例
  `help set`
- 获取组中所有命令信息名称
  `help [@group-name]`
- 范例
  `help @string`

**退出命令行客户端模式**

- 退出客户端
  `quit`
  `exit`
- 快捷键(*推荐*)
  `Ctrl + C`
- 清屏
  `clear`

### 数据类型

**业务数据的特殊性**

1. 原始业务功能设计
   - 秒杀
   - 618活动
   - 双11活动
   - 排队购票
2. 运营平台监控到的突发高频访问数据
   - 突发时政要闻，被强势关注围观
3. 高频、复杂的统计数据
   - 在线人数
   - 投票排行榜

**Redis数据类型（5种常用）**

- string
- hash
- list
- set
- sorted_set/zset（应用性较低，了解即可）

> redis 自身是一个Map，其中所有的数据都是采用`key:value`的形式存储

#### string

- 存储的数据：单个数据，最简单的数据存储类型，也是最常用的数据存储类型
- 存储数据的格式：一个存储空间保存一个数据
- 存储内容：通常使用字符串，如果字符串以整数的形式展示，可以作为数字操作使用

> 每一个存储空间只能保存一个字符串，如果存的是纯数字，也可以当作纯数字使用

**基本操作**

- 添加/修改数据
  `set key value`
- 获取数据
  `get key`
- 删除数据
  `del key`
- 判定性添加数据
  `setnx key value`
- 添加多个数据
  `mset key1 value1 key2 value2 ...`
- 获取多个数据
  `mget key1 key2 ...`
- 获取数据字符个数（字符串长度）
  `strlen key`
- 追加信息到原始信息后部（如果原始信息存在就追加，否则新建）
  `append key value`

![](http://images.hellocode.top/IhVdgonKXBm4e2v.png)

> `setnx`在设置时，如果对应的键没设置过，则为1（设置成功），如果键已存在，则为0（设置失败）

> *单数据操作与多数据操作的选择之感*
>
> 发送的数据少的时候，可以用单数据操作；如果发送的量大，就用多指令，可以减少指令发送和接收的时间

**扩展操作**

- 设置数值数据增加指定范围的值

  ```redis
  incr key
  incrby key increment
  incrbyfloat key increment
  ```

- 设置数值数据减少指定范围的值

  ```redis
  decr key
  decrby key increment
  ```

- 设置数据具有指定的生命周期

  ```redis
  setex key seconds value
  psetex key milliseconds value
  ```

![](http://images.hellocode.top/y8Rb51mDSGlkWVM.png)

> `incr`操作，如果变量不存在，会直接从0开始累加（需要是数字）

**注意事项**

1. 数据操作不成功的反馈与数据正常操作之间的差异
   - 表示运行结果是否成功
     (integer)0——false——失败
     (integer)1——true——成功
   - 表示运行结果值
     (integer)3——3——3个
     (integer)1——1——1个
2. 数据未获取到时，对应的数据为(nil)，等同于null
3. 数据最大存储量：512MB
4. string在redis内部存储默认就是一个字符串，当遇到增减类操作incr，decr时会转成数值型进行计算
5. 按数值进行操作的数据，如果原始数据不能转换为数值，或超越了redis数值上限范围，将报错
6. redis所有的操作都是原子性的，采用单线程处理所有业务，命令是一个一个执行的，因此无需考虑并发带来的数据影响

**应用场景**

- 主页高频访问信息显示控制，例如新浪微博大V主页显示粉丝数与微博数量

- 在redis中为大V用户设定用户信息，以用户主键和属性值作为key，后台设定定时刷新策略即可
  eg:`user:id:3506728370:fans`->12210947
  eg:`user:id:3506728370:blogs`->6164
  eg:`user:id:3506728370:focuses`->83

- 也可以使用json格式保存数据
  eg:`user:id:3506728370`->`{"fans":12210947,"blogs":6164,"focusees":83}`

- 数据库中的热点数据key命名惯例

  |      | 表名  | 主键名 | 主键值   | 字段名 |
  | ---- | ----- | ------ | -------- | ------ |
  | eg1  | order | id     | 123456   | name   |
  | eg2  | equip | id     | 34567    | type   |
  | eg3  | news  | id     | 20220429 | title  |

#### hash

> 数据存储的困惑：
>
> 对象类数据的存储如果具有较频繁的更新需求操作会显得笨重，需要将整个对象数据全部获取修改

**hash类型**

- 新的存储需求：对一系列存储的数据进行编组，方便管理，典型应用存储对象信息

- 需要的存储结构：一个存储空间保存多个键值对数据

- hash类型：底层使用哈希表结构实现数据存储

  > key+hash存储空间(field+value)

*hash存储结构优化*

- 如果field数量较少，存储结构优化为类数组结构
- 如果field数量较多，存储结构使用HashMap结构

**基本操作**

- 添加/修改数据
  `hset key field value`
- 获取数据
  `hget key field`
  `hgetall key`
- 删除数据
  `hdel key field1 [field2]`
- 设置field的值，如果该field存在则不做任何操作
  `hsetnx key field value`
- 添加/修改多个数据
  `hmset key field1 value1 field2 value2 ...`
- 获取数据
  `hmget key field1 field2 ...`
- 获取哈希表中字段的数量
  `hlen key`
- 获取哈希表中是否存在指定的字段
  `hexists key field`

![](http://images.hellocode.top/jbHZzJWDXtfGnxO.png)

**扩展操作**

- 获取哈希表中所有的字段名或字段值

  ```redis
  hkeys key
  hvals key
  ```

- 设置指定字段的数值数据增加指定范围的值

  ```redis
  hincrby key field increment
  hincrbyfloat key field increment
  ```

  > 需要进行decr操作时，在increment传递负值即可

![](http://images.hellocode.top/nNQHThwfUFI4jky.png)

**注意事项**

1. hash类型中value只能存储字符串，不允许存储其他数据类型，不存在嵌套现象。如果数据未获取到，对应的值为(nil)
2. 每个hash可以存储2^32 -1个键值对
3. hash类型十分贴近对象的数据存储形式，并且可以灵活添加删除对象属性。但hash设计初衷不是为了存储大量对象而设计的，切记不可滥用，更不可以将hash作为对象列表使用
4. hgetall操作可以获取全部属性，如果内部field过多，遍历整体数据效率就会很低，很有可能成为数据访问瓶颈

**应用场景**

双11活动日，销售手机充值卡的商家对移动、联通、电信的30元、50元、100元商品推出抢购活动，每种商品抢购上限1000张

- 存储结构
  - 商家id——key
  - 充值卡id——field
  - 数量——value
- 抢购时使用降值的方式控制产品数量

![](http://images.hellocode.top/mHUd6sitbCWLT3j.png)

*注意：实际业务中还有超卖等实际问题，这里不做讨论*

#### list

- 数据存储需求：存储多个数据，并对数据进入存储空间的顺序进行区分
- 需要的存储结构：一个存储空间保存多个数据，且通过数据可以体现进入顺序
- list类型：保存多个数据，底层使用双向链表存储结构实现（key——list）

**基本操作**

- 添加/修改数据
  `lpush key value1 [value2] ...`
  `rpush key value1 [value2] ...`
- 获取数据
  `lrange key start stop`
  `lindex key index`
  `llen key`
- 获取并移除数据
  `lpop key`
  `rpop key`

![](http://images.hellocode.top/gJ7VOeKZiGtBTSo.png)

**扩展操作**

- 移除指定数据
  `lrem key count value`
- 规定时间内获取并移除数据
  `blpop key1 [key2] timeout`
  `brpop key1 [key2] timeout`
  `brpoplpush source destination timeout`

![](http://images.hellocode.top/149VbyKg5jiuSvB.png)

![](http://images.hellocode.top/ytEZ4qCYfUNKdAW.png)

**注意事项**

1. list中保存的数据都是string类型的，数据总容量是有限的，最多2^32-1个元素(4294967295)
2. list具有索引的概念，但是操作数据时通常以队列的形式进行入队和出队操作，或以栈的形式进行入栈出栈操作
3. 获取全部数据操作结束索引可以设置为-1
4. list可以对数据进行分页操作，通常第一页的信息来自于list，第2页及更多的信息通过数据库的形式加载

**应用场景**

企业运营过程中，系统将产生出大量的运营数据，如何保障多台服务器操作日志的统一顺序输出？

- 依赖list的数据具有顺序的特征对信息进行管理
- 使用队列模型解决多路信息汇总合并的问题
- 使用栈模型解决最新消息的问题

#### set

- 新的存储需求：存储大量的数据，在查询方面提供更高的效率
- 需要的存储结构：能够保存大量的数据，高效的内部存储机制，便于查询
- set类型：与hash存储结构完全相同，仅存储键，不存储值(nil)，并且值是不允许重复的(key-field(value))

**基本操作**

- 添加数据
  `sadd key member1 [member2]`
- 获取全部数据
  `smembers key`
- 删除数据
  `srem key member1 [member2]`
- 获取大小
  `scard key`

![](http://images.hellocode.top/BzCvc2qEUleNS3r.png)

**扩展操作**

- 求两个集合的交、并、差集

  ```redis
  sinter key1 [key2] ...
  sunion key1 [key2] ...
  sdiff key1 [key2] ...
  ```

- 求两个集合的交、并、差集并存储到指定集合中

  ```redis
  sinterstore destination key1 [key2 ...]
  sunionstore destination key1 [key2 ...]
  sdiffstore destination key1 [key2 ...]
  ```

- 将指定数据从原始集合中移动到目标集合中
  `smove source destination member`

![](http://images.hellocode.top/LFePOnhtu9TfsSg.png)

**注意事项**

- set 类型不允许数据重复，如果添加的数据在set中已经存在，将只保留一份
- set虽然与hash的存储结构相同，但是无法启用hash中存储值的空间

**应用场景**

*黑名单*

	资讯类信息类网站追求高访问量，但是由于其信息的价值，往往容易被不法分子利用，通过爬虫技术，快速获取信息，个别特种行业网站信息通过爬虫获取分析后，可以转换成商业机密进行出售。例如第三方火车票、机票、酒店刷票代购软件，电商刷评论、刷好评
	
	同时爬虫带来的伪流量也会给经营者带来错觉，产生错误的决策，有效避免网站被爬虫反复爬取成为每个网站都要考虑的基本问题。在基于技术层面区分出爬虫用户后，需要将此类用户进行有效的屏蔽，这就是黑名单的典型应用

> 不是说爬虫一定要做摧毁性的工作，有些小型网站需要爬虫为其带来一些流量

*白名单*

	对于安全性更高的应用访问，仅仅靠黑名单是不能解决问题的，此时需要设定可访问的用户群体，依赖白名单做更为苛刻的访问验证

*解决方案*

- 基于经营战略设定问题用户发现、鉴别规则
- 周期性更新满足规则的用户黑名单，加入set集合
- 用户行为信息达到后与黑名单进行对比，确认行为去向
- 黑名单过滤IP地址：应用于开放游客访问权限的信息源
- 黑名单过滤设备信息：应用于限定访问设备的信息源
- 黑名单过滤用户：应用于基于访问权限的信息源

#### 实践案例

**业务场景**

使用微信的过程中，当微信接收消息后，会默认将最近接收的消息置顶，当多个好友及关注的订阅号同时发送消息时，该排序会不停的进行交替。同时还可以将重要的会话设置为置顶。一旦用户离线后，再次打开微信时，消息该按照什么样的顺序显示？

**解决方案**

- 依赖list的数据具有顺序的特征对消息进行管理，将list结构作为栈使用
- 对置顶与普通会话分别创建独立的list分别管理
- 当某个list中接收到用户消息后，将消息发送方的id从list的一侧加入list（此处设定左侧）
- 多个相同id发出的消息反复入栈会出现问题，在入栈之前无论是否具有当前id对应的消息，先删除对应id
- 推送消息时先推送指定会话list，再推送普通会话list，推送完成的list清除所有数据
- *消息的数量，也就是微信用户对话数量采用计数器的思想另行记录，伴随list操作同步更新*

### 常用指令

#### key常用指令

- key是一个字符串，通过key获取redis中保存的数据
- 对于key自身状态的相关操作，例如：删除，判断存在，获取类型等
- 对于key有效性控制相关操作，例如：有效期设定，判定是否有效，有效状态的切换等
- 对于key快速查询操作，例如：按制定策略查询key
- ...

**基本操作**

- 删除指定key
  `del key`
- 获取key是否存在
  `exists key`
- 获取key的类型
  `type key`

![](http://images.hellocode.top/fibyocn4Ttu7a2R.png)

**扩展操作**

- 排序
  `sort`
- 改名
  `rename key newkey`
  `renamenx key newkey`

![](http://images.hellocode.top/1cblM9NgsaGIxeZ.png)

**时效性控制**【重要】

- 为指定key设置有效期

  ```redis
  expire key seconds
  pexpire key milliseconds
  expireat key timestamp
  pexpireat key milliseconds-timestamp
  ```

- 获取key的有效时间

  ```redis
  ttl key
  pttl key
  ```

  > ttl获取秒，pttl获取毫秒
  > -1表示永久有效，-2表示不存在（失效或本来就不存在）

- 切换key从时效性转换为永久性

  ```redis
  persist key
  ```

![](http://images.hellocode.top/rUIto8pfkXBLRdD.png)

**查询模式**

- 查询key
  `keys pattern`

*查询模式规则*

- `*`匹配任意数量的任意符号
- `?`配合一个任意符号
- `[]`匹配一个指定符号

> `keys *`——查询所有
>
> `keys hello*`——查询所有以hello开头
>
> `keys *code`——查询所有以code结尾
>
> `keys ??code`——查询所有前面两个字符任意，后面以code结尾
>
> `keys user:?`——查询所有以user:开头，最后一个字符任意
>
> `keys u[st]er:1`——查询所有以u开头，以er:1结尾，中间包含一个字母：s或t

![](http://images.hellocode.top/43wnIQA1LmklgWt.png)

#### 数据库常用指令

**key的重复问题**

- key是由程序员定义的
- redis在使用的过程中，伴随着操作数据的增加，会出现大量的数据以及对应的key
- 数据不区分种类、类别混杂在一起，极易出现重复或冲突

**解决方案**

- redis为每个数据库提供有16个数据库，编号从0到15
- 每个数据库之间的数据相互独立

> 这些数据库公用redis内存，具体每个多大：未知
>
> 默认16个数据库，但也可以在配置文件中修改，但一般会使用默认设置

**基本操作**

- 切换数据库
  `select index`
- 其他操作
  `ping`

![](http://images.hellocode.top/L3lzaB8SWMGY5Pq.png)

**扩展操作**

- 数据移动
  `move key db`
- 数据总量
  `dbsize`
- 数据清除
  `flushdb`——清空当前数据库
  `flushall`——清空所有数据库

![](http://images.hellocode.top/hxqojzDRfPeVrs7.png)

### Jedis

#### 快速入门

**编程语言与Redis**

- Jedis用于Java语言连接Redis服务，并提供对应的操作API
- Java语言连接Redis服务
  Jedis
  SpringData Redis
  Lettuce

> 除了Java语言，类似C、C++、PHP、Python等语言，都有对应的库可以实现对Redis的连接和操作

**准备工作**

1. 导入jar包：https://mvnrepository.com/artifact/redis.clients/jedis
2. 获取连接对象
3. 执行操作
4. 关闭连接

> Jedis接口做的非常好，所有方法名和在Linux下操作都一样，我们只需要注意返回值，有多个值时，都是以List存储

![](http://images.hellocode.top/4fjoIHFaCuJxkXn.png)

*问题*

1. 当前Redis是装在虚拟机中的，有一个对外的虚拟IP，需要使用这个IP来连接（可以使用`ip addr`查询）
2. 修改配置文件，打开bind绑定项
   ![](http://images.hellocode.top/xZaT6e5LDf4cwol.png)
3. 重启Redis服务

> 若还是无法连接，可能是防火墙原因，在虚拟机执行`systemctl stop firewalld`指令

> 在更改redis.conf配置文件绑定ip后，Linux下客户端连接需要指定绑定的IP地址：`redis-cli -h ip地址`

```java
public class JedisTest {
    public static void main(String[] args) {
        // 1. 获取连接对象
        Jedis jedis = new Jedis("192.168.23.129",6379);
        // 2. 执行操作
        jedis.lpush("list1","a","b","c","d");
        List<String> list1 = jedis.lrange("list1", 0, -1);
        for (String s:list1) {
            System.out.println(s);
        }
        // 3. 关闭连接
        jedis.close();
    }
}
```

![](http://images.hellocode.top/TEDtyKVlN2bB8fu.png)

#### 简易工具类

**准备工作**

- 连接池jar包下载：https://mvnrepository.com/artifact/org.apache.commons/commons-pool2
- slf4j下载：https://repo1.maven.org/maven2/org/slf4j/

![](http://images.hellocode.top/DMl86EXGybzqr4s.png)

```java
public class JedisUtils {
    public static Jedis getJedis(){
        // Jedis连接池配置对象
        JedisPoolConfig jpc = new JedisPoolConfig();
        jpc.setMaxTotal(50);    // 最大连接数
        jpc.setMaxIdle(10);     // 初始连接数
        String host = "192.168.23.129";     // 主机IP
        int port = 6379;    // 端口
        // 连接池对象
        JedisPool jp = new JedisPool(jpc,host,port);
        return jp.getResource();    // 获取Jedis对象
    }
}
```

```java
public class JedisTest {
    public static void main(String[] args) {
        Jedis jedis = JedisUtils.getJedis();
        jedis.lpush("list1","a","b","c","d");
        List<String> list1 = jedis.lrange("list1", 0, -1);
        for (String s:list1) {
            System.out.println(s);
        }
        jedis.close();
    }
}
```

**工具类优化**

*配置文件redis.properties*

```properties
redis.maxTotal=50
redis.maxIdel=10
redis.host=192.168.23.129
redis.port=6379
```

*工具类代码*

```java
package top.hellocode.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ResourceBundle;

public class JedisUtils {
    private static int maxTotal;
    private static int maxIdel;
    private static String host;
    private static int port;

    private static JedisPoolConfig jpc;
    private static JedisPool jp;
    static {
        ResourceBundle bundle = ResourceBundle.getBundle("redis");
        maxTotal = Integer.parseInt(bundle.getString("redis.maxTotal"));
        maxIdel = Integer.parseInt(bundle.getString("redis.maxIdel"));
        host = bundle.getString("redis.host");
        port = Integer.parseInt(bundle.getString("redis.port"));

        // Jedis连接池配置对象
        jpc = new JedisPoolConfig();
        jpc.setMaxTotal(maxTotal);    // 最大连接数
        jpc.setMaxIdle(maxIdel);     // 初始连接数

        // 连接池对象
        jp = new JedisPool(jpc,host,port);
    }
    
    public static Jedis getJedis(){
        return jp.getResource();    // 获取Jedis对象
    }
}
```

#### 可视化工具

**Redis Desktop Manager**

![](http://images.hellocode.top/1ULtMRrSCyVZ6nc.png)

- 免费发行版下载：https://github.com/uglide/RedisDesktopManager/releases/tag/0.8.8

- 按照提示安装即可（安装位置推荐D盘，其他默认即可）

- 建立连接
  ![](http://images.hellocode.top/muTGha1tnWpkSqE.png)

### 持久化

- 日常操作的数据都是在内存中的，而真正的信息是保存在硬盘中的
- 内存中的信息在断电后就会丢失，而硬盘中的数据断电后还可以保存下来
- 将数据从内存保存到硬盘中叫做数据的保存，反之就是数据恢复（从硬盘读取到内存中）
- 利用永久性存储介质将数据进行保存，在特定的时间将保存的数据进行恢复的工作机制称为*持久化*
  持久化用于防止数据的丢失，确保数据的安全性

> 持久化常见的两种保存形式
> 保存对应的数据(二进制形式)：快照
>
> 保存操作过程：日志

- 将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据（RDB）
- 将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程（AOF）

#### RDB

RDB启动方式——save指令

- 手动执行一次保存操作
  `save`

*save指令相关配置*

- 设置本地数据库文件名，默认值为dump.rdb，通常设置为`dump-端口号.rdb`
  `dbfilename filename`

- 设置存储.rdb文件的路径，通常设置成存储空间较大的目录中，目录名称data
  `dir path`

- 设置存储至本地数据库时是否压缩数据，默认yes，设置为no，节省CPU运行时间，但存储文件变大
  `rdbcompression yes|no`

- 设置读写文件过程是否进行RDB格式校验，默认yes，设置为no，节约读写10%时间消耗，但存在数据损坏的风险
  `rdbchecksum yes|no`

  > 上述四个配置文件，一般来说设置前两个即可，后两个一般使用默认设置

```redis
bind 192.168.23.129
port 6379
daemonize no
logfile "log-6379.log"
dir /redis/data
dbfilename "dump-6379.rdb"
```

*save指令工作原理*

![](http://images.hellocode.top/LjuSpbTUREKqn3H.png)

- 多个客户端在执行指令时，会有先后顺序问题
- Redis是单线程工作模式，会创建一个任务队列
- 所有指令都会进到队列中，执行一个，消失一个
- 在执行save时，如果数据量很大，会非常耗时，导致save后面的指令处于阻塞状态

> save指令的执行会阻塞当前Redis服务器，直到当前RDB过程完成为止，有可能会造成长时间阻塞，*线上环境不建议使用*

**RDB启动方式——bgsave指令**

- 手动启动后台保存操作，但不是立即执行
  `bgsave`

*bgsave指令相关配置*

- 后台存储过程中如果出现错误现象，是否停止保存操作，默认yes
  `stop-writes-on-bgsave-error yes|no`

- 其他

  ```redis
  dbfilename filename
  dir path
  rdbcompression yes|no
  rdbchecksum yes|no
  ```

> 这里的配置一般情况下采用默认即可

*bgsave指令工作原理*

![](http://images.hellocode.top/yXm2O4SqZGackzL.png)

> bgsave命令是针对save阻塞问题做的优化。
>
> Redis内部所有涉及到RDB操作都采用bgsave的方式，save命令可以放弃使用

**RDB启动方式——save配置**

![](http://images.hellocode.top/uEprnLSzFcg9eKy.png)

- 设置自动持久化的条件，满足限定时间范围内key的变化数量达到指定数量即进行持久化
  `save second changes`

- 参数
  seconds：监控时间范围
  changes：监控key的变化量

  > 简单来说，就是在seconds时间内，如果有changes个数据发生变化，就进行持久化存储

- 范例

  ```redis
  save 900 1
  save 300 10
  save 60 10000
  ```

- 其他

  ```redis
  dbfilename filename
  dir path
  rdbcompression yes|no
  rdbchecksum yes|no
  stop-writes-on-bgsave-error yes|no
  ```

> 配置文件其实和前面的一样，因为都是进行的一件事，只不过最后一个会自动执行

*save配置工作原理*

![](http://images.hellocode.top/q1tAouSIvX5O2rB.png)

> save配置需要根据实际业务情况进行设置，频度过高或过低都会出现性能问题，结果可能是灾难性的
>
> save配置启动后执行的是bgsave操作

**RDB三种启动方式对比**

| 方式           | save指令 | bgsave指令 |
| -------------- | -------- | ---------- |
| 读写           | 同步     | 异步       |
| 阻塞客户端指令 | 是       | 否         |
| 额外内存消耗   | 否       | 是         |
| 启动新进程     | 否       | 是         |

*RDB特殊启动形式*

- 服务器运行过程中重启
  `debug reload`
- 关闭服务器时指定保存数据
  `shutdown save`
- 全量赋值（在主从复制中详解）

*RDB优点*

- RDB是一个紧凑压缩的二进制文件，存储效率较高
- RDB内部存储的是redis在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景
- RDB恢复数据的速度要比AOF快跟多
- 应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复

*RDB缺点*

- RDB方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据

- bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能

- Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象

  > 出现这种情况可以先把redis数据导出到excel或者数据库，再更换redis版本，重新导入

#### AOF

**RDB存储的弊端**

-  存储数据量较大，效率较低，基于快照思想，每次读写都是全部数据，当数据量巨大时，效率非常低
- 大数据量下的IO性能较低
- 基于fork创建子进程，内存产生额外消耗
- 宕机带来的数据丢失风险

**解决思路**

- 不写全数据，仅记录部分数据
- 降低区分数据是否改变的难度，改记录数据为记录操作过程
- 对所有操作均进行记录，排除丢失数据的风险

**AOF概念**

- AOF(Append Only File)持久化：以独立日志的方式记录每次写命令，重启时再重新执行AOF文件中的命令达到恢复数据的目的。与RDB相比可以简单理解为*由记录数据改为记录数据产生的变化*
- AOF的主要作用是解决了数据持久化的实时性，目前已经是Redis持久化的主流方式

> 目前的持久化方案中，AOF是主流方案

*AOF写数据过程*

![](http://images.hellocode.top/89SHyBUgIV6QPsf.png)

**启动AOF相关配置**

- 开启AOF持久化功能，默认no，即不开启状态
  `appendonly yes|no`
- AOF持久化文件名，默认文件名为appendonly.aof，建议配置为appendonly-端口号.aof
  `appendfilename filename`
- AOF持久化文件保存路径，与RDB持久化文件保持一致即可
  `dir path`
- AOF写数据策略，默认为everysec
  `appendfsync always|everysec|no`

*AOF写数据三种策略*

- always(每次)：每次写入操作均同步到AOF文件中
  数据零误差，性能较低，不建议使用
- everysec(每秒)：每秒将缓冲区中的指令同步到AOF文件中，在系统突然宕机的情况下丢失1秒内的数据
  数据准确性较高，性能较高，建议使用，也是默认配置
- no(系统控制)：由操作系统控制每次同步到AOF文件的周期
  整体过程不可控，一般不使用

![](http://images.hellocode.top/zKfjrFENCoLuTiO.png)

> 只会记录对数据有影响的操作，get和未删除成功的del等操作不会记录

**手动AOF重写机制与工作原理**

> 如果客户端对同一个数据进行多次set，AOF就会出现不必要的记录

随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Redis引入了AOF重写机制压缩文件体积。AOF文件重写是将Redis进程内的数据转化为写命令同步到新AOF文件的过程。简单说就是将对同一个数据的若干条命令执行结果转化成最终结果数据对应的指令进行记录

*重写作用*

- 降低磁盘占用量，提高磁盘利用率
- 提高持久化效率，降低持久化写时间，提高IO性能
- 降低数据恢复用时，提高数据恢复效率

*重写规则*

- 进程内具有时效性的数据，并且数据已超时将不再写入文件
- 非写入类的无效指令将被忽略，只保留最终数据的写入命令
- 对同一数据的多条写命令合并为一条命令
  为防止数据量过大造成客户端缓冲区溢出，对list、set、hash、zset等类型，每条指令最多写入64个元素

*重写方式*

- 手动重写
  `bgrewriteaof`
- 自动重写
  `auto-aof-rewrite-min-size size`——按照大小判断是否自动重写
  `auto-aof-rewrite-percentage percentage`——按照百分比判断是否自动重写

*工作原理*

![](http://images.hellocode.top/t6gfkSNhDYO13H8.png)

**AOF自动重写方式**

- 自动重写触发条件设置
  `auto-aof-rewrite-min-size size`
  `auto-aof-rewrite-percentage percentage`
- 自动重写触发比对参数（运行指令info Persistence获取具体信息）
  `aof_current_size`——aof当前尺寸大小
  `aof_base_size`——aof基础尺寸大小
- 自动重写触发条件
  aof_current_size > auto-aof-rewrite-min-size
  (aof_base_size - aof_current_size) / aof_base_size >= auto-aof-rewrite-percentage

*重写流程*

![](http://images.hellocode.top/A2cUT67jJrBRhke.png)

![](http://images.hellocode.top/XWn1lUKtEPM84bR.png)

#### 区别

**RDB VS AOF**

| 持久化方式   | RDB                | AOF                |
| ------------ | ------------------ | ------------------ |
| 占用存储空间 | 小（数据级：压缩） | 大（指令级：重写） |
| 存储速度     | 慢                 | 快                 |
| 恢复速度     | 快                 | 慢                 |
| 数据安全性   | 会丢失数据         | 依据策略决定       |
| 资源消耗     | 高/重量级          | 低/轻量级          |
| 启动优先级   | 低                 | 高                 |

**RDB与AOF的选择之惑**

*对数据非常敏感，建议使用默认的AOF持久化方案*

- AOF持久化策略使用everysecond，每秒钟fsync一次。该策略redis仍可以保持很好的处理性能，当出现问题时，最多丢失0-1秒内的数据。
- 注意：由于AOF文件存储体积较大，且恢复速度较慢

*数据呈现阶段有效性，建议使用RDB持久化方案*

- 数据可以良好的做到阶段内无丢失（该阶段是开发者或运维人员手工维护的），且恢复速度较快，阶段点数据恢复通常采用RDB方案
- 注意：利用RDB实现紧凑的数据持久化会使Redis降的很低，慎重总结

*综合对比*

- RDB与AOF的选择实际上是在做一种权衡，每种都有利有弊
- 如不能承受数分钟以内的数据丢失，对业务数据非常敏感，选用AOF
- 如能承受数分钟以内的数据丢失，且追求大数据集的恢复速度，选用RDB
- 灾难恢复选用RDB
- 双保险策略，同时开启 RDB 和 AOF，重启后，Redis优先使用 AOF 来恢复数据，降低丢失数据的量



## Redis高级

### 删除策略

#### 过期数据

> Redis是一种内存级数据库，所有数据均存放在内存中，内存中的数据可以通过TTL指令获取其状态

- XX：具有时效性的数据
- -1：永久有效的数据
- -2：*已经过期的数据* 或 被删除的数据 或 未定义的数据

**过期的数据真的删除了吗？**

不会被立即删除，会根据对应的数据删除策略进行过期数据的删除

假如同时有大量数据过期，如果立即删除，将会占用CPU性能，影响用户的set和get操作，所以一般来说过期数据并不会立即删除

**时效性数据的存储结构**

![img](http://images.hellocode.top/u=1313047395,467348086&fm=253&fmt=auto&app=138&f=JPG)

> 在对redis中数据设置过期时间后，会在expires域中存储对应数据的内存地址和过期时间（以hash结构进行存储）
>
> 也就是说，进行过期设置后，和数据本身并没有直接关联

#### 数据删除策略

- 定时删除
- 惰性删除
- 定期删除

*数据删除策略的目标*

在内存占用与CPU占用之间寻找一种平衡，顾此失彼都会造成整体redis性能的下降，甚至引发服务器宕机或内存泄漏

**定时删除**

- 创建一个定时器，当key设置有过期时间，且过期时间到达时，由定时器任务立即执行对键的删除操作
- 优点：节约内存，到时就删除，快速释放掉不必要的内存占用
- 缺点：CPU压力很大，无论CPU此时负载量多高，均会占用CPU，会影响redis服务器响应时间和指令吞吐量
- 总结：用处理器性能换取存储空间（时间换空间）

**惰性删除**

- 数据到达过期时间，不做处理，等下次访问数据（get操作）时删除
  - 如果未过期，返回数据
  - 发现已过期，删除，返回不存在
- 优点：节约CPU性能，发现必须删除的时候才删除
- 缺点：内存压力很大，出现长期占用内存的数据
- 总结：用存储空间换取处理器性能（空间换时间）

**定期删除（折中方案）**

![定期删除](http://images.hellocode.top/20200814084151136.png)

- Redis启动服务器初始化时，读取配置server.hz的值，默认为10
- 每秒钟执行server.hz次以下方法
  serverCron()----->databasesCron----->activeExpireCycle()
- `activeExpireCycle()`对每个expires[*]逐一进行检测，每次执行250ms/server.hz（CPU性能的1/4）
- 对某个expires[*]检测时，随机挑选W个key进行检测
  - 如果key超时，删除key
  - 如果一轮中删除的`key的数量>W*25%`，循环该过程
  - 如果一轮中删除的`key数量<=W*25%`，检查下一个expires[*]，0-15循环
  - W取值=ACTIVE_EXPIRE_CYCLE_LOOKUPS_PER_LOOP属性值
- 参数current_db用于记录`activeExpireCycle()`进入哪个expires[*]执行

- 如果`activeExpireCycle()`执行时间到期，下次从currrent_db继续向下执行

----



- **定期删除**：周期性轮询redis库中的时效性数据，采用随机抽取的策略，利用过期数据占比的方式控制删除频度
- 特点
  - CPU性能占用设置有峰值，检测频度可自定义设置
  - 内存压力不是很大，长期占用内存的冷数据会持续清理
- 总结：周期性抽查存储空间（随机抽查，重点抽查）

#### 数据淘汰策略

**当新数据进入redis时，如果内存不足怎么办？**

- Redis使用内存存储数据，在执行每一个命令前，会调用`freeMemoryIfNeeded()`检测内存是否充足。如果内存不满足新加入数据的最低存储要求，redis要临时删除一些数据为当前指令清理存储空间。清理数据的策略称为数据*淘汰策略*或*逐出算法*。
- 注意：逐出数据的过程不是100%能够清理出足够的可使用的内存空间，如果不成功则反复执行。当对所有数据尝试完毕，如不能达到内存清理的要求，将出现错误信息
  `(error) OOM command not allowed when used memory > 'maxmemory'`

**影响数据淘汰的相关配置**

- 最大可使用内存，即占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上
  `maxmemory ?mb`
- 每次选取待删除数据的个数，采用随机获取数据的方式作为待检测删除数据
  `maxmemory-samples count`
- 对数据进行删除的选择策略
  `maxmemory-policy poicy`

*选择策略*

- 检测易失数据（可能会过期的数据集server.db[i].expires ）
  ① volatile-lru：挑选最近最少使用的数据淘汰
  ② volatile-lfu：挑选最近使用次数最少的数据淘汰
  ③ volatile-ttl：挑选将要过期的数据淘汰(并未过期)
  ④ volatile-random：任意选择数据淘汰

![lru和lfu](http://images.hellocode.top/20200814084431352.png)

- 检测全库数据（所有数据集server.db[i].dict ）
  ⑤ allkeys-lru：挑选最近最少使用的数据淘汰
  ⑥ allkeys-lfu：挑选最近使用次数最少的数据淘汰
  ⑦ allkeys-random：任意选择数据淘汰

- 放弃数据驱逐
  ⑧ no-enviction（驱逐）：禁止驱逐数据（redis4.0中默认策略），会引发错误OOM（Out Of Memory）

`maxmemory-policy volatile-lru`

**数据逐出策略配置依据**

连接redis客户端后，使用info命令输出监控信息，查询缓存 hit 和 miss 的次数，根据业务需求调优Redis配置

### 主从复制

#### 简介

**互联网“三高”架构**

- 高并发
- 高性能
- *高可用*
  业界可用性目标5个9，即*99.999%*（一年中可用时长占全年时长的百分比），即服务器宕机时长低于315秒，约5.25分钟

**单机redis的风险与问题**

*问题1：机器故障*

- 现象：硬盘故障，系统崩溃
- 本质：数据丢失，很可能对业务造成灾难性打击
- 结论：基本上会放弃使用redis

*问题2：容量瓶颈*

- 现象：内存不足，从16G升级到64G，从64G升级到128G，无限升级内存
- 本质：穷，硬件条件跟不上
- 结论：放弃使用redis

*结论*

为了避免单点redis服务器故障，准备多台服务器，互相连通。将数据复制多个副本保存在不同的服务器上，*连接在一起*，并保证数据是*同步*的。即使有其中一台服务器宕机，其他服务器依然可以继续提供服务，实现redis的高可用，同时实现数据*冗余备份*

**多台服务器连接方案**

![img](http://images.hellocode.top/427081-20210923131812599-1396892941.png)

- 提供数据方：master

  主服务器，主节点，主库，主客户端

- 接收数据方：slave

  从服务器，从节点，从库，从客户端

- 需要解决的问题
  数据同步（master的数据复制到slave中）

**主从复制**

- 概念：主从复制即将master中的数据即时、有效的复制到slave中
- 特征：一个master可以拥有多个slave，一个slave只对应一个master
- 职责
  - master
    - 写数据
    - 执行写操作时，将出现变化的数据自动同步到slave
    - 读数据（可忽略）
  - slave
    - 读数据
    - 写数据（禁止）

*作用*

- 读写分离：master写，slave读，提高服务器的读写负载能力
- 负载均衡：基于主从结构，配合读写分离，由slave分担master负载，并根据需求的变化，改变slave的数量，通过多个从节点分担数据读取负载，大大提高redis服务器的并发量与数据吞吐量
- 故障恢复：当master出现问题时，由slave提供服务，实现快速的故障恢复
- 数据冗余：实现数据热备份，是持久化之外的一种数据冗余方式
- 高可用基石：基于主从复制，构建哨兵模式与集群，实现redis的高可用方案

#### 工作流程

**主从复制过程大体可以分为3个阶段**

- 建立连接阶段（准备阶段）
- 数据同步阶段
- 命令传播阶段

**阶段一：建立连接阶段**

- 建立slave到master的连接，使master能够识别slave，并保存slave端口号

![img](http://images.hellocode.top/427081-20210923162209200-1027382528.png)

- 步骤1：设置master的地址和端口，保存master信息
- 步骤2：建立socket连接
- 步骤3：发送ping命令（定时器任务）
- 步骤4：身份验证
- 步骤5：发送slave端口信息

至此，主从连接成功

- 当前状态
  - slave：保存master的地址和端口
  - master：保存slave端口
  - 总体：二者创建了连接的socket

*主从连接（slave连接master）*

- 方式一：客户端发送命令
  `slaveof masterip masterport`
- 方式二：启动服务器参数
  `redis-server --slaveof masterip masterport`
- 方式三：服务器配置
  `slaveof masterip masterport`
- slave系统信息（info命令查看）
  - master_link_down_since_seconds
  - masterhost   &   masterport
- master系统信息（info命令查看）
  - slave_listening_port（多个）

*断开主从连接*

- 断开slave与master的连接，slave断开连接后，不会删除已有数据，只是不再接受master发送的数据
  `slaveof no one`

*授权访问*

- master客户端发送命令设置密码
  `requirepass password`
- master配置文件设置密码
  `config set requirepass password`
  `config get requirepass`
- slave客户端发送命令设置密码
  `auth password`
- slave配置文件设置密码
  `masterauth password`
- slave启动服务器设置密码
  `redis-server -a password`

**阶段二：数据同步阶段工作流程**

- 在slave初次连接master后，复制master中的所有数据到slave
- 将slave的数据库状态更新成master当前的数据库状态

![img](http://images.hellocode.top/1886066-20210919210826979-856632534.png)

- 步骤1：请求同步数据

- 步骤2：创建RDB同步数据

- 步骤3：恢复RDB同步数据

- 步骤4：请求部分同步数据

- 步骤5：恢复部分同步数据

  至此，数据同步工作完成

- 当前状态

  - slave：具有master端全部数据，包含RDB过程接收的数据

  - master：保存slave当前数据同步的位置

  - 总体：master、slave之间完成了数据克隆

> slave刚连接master，master会将已有数据复制给slave，称为全量复制；在全量复制过程中，master中可能又会存入新的数据，将进入复制缓冲区，当全量复制完成，再将复制缓冲区的数据同步到slave，称为增量复制（部分复制）

*数据同步阶段master说明*

1. 如果master数据量巨大，数据同步阶段应避开流量高峰期，避免造成master阻塞，影响业务正常执行
2. 复制缓冲区大小设定不合理，会导致数据溢出。如进行全量复制周期太长（缓冲区已存满，继续存入将会造成数据丢失），进行部分复制时发现数据已经存在丢失情况，必须进行第二次全量复制，致使slave陷入死循环状态
3. 可使用下面的指令对复制缓冲区大小进行设置
   `repl-backlog-size ?mb`

4. master单机内存占用主机内存的比例不应该过大，建议使用50%~70%的内存，留下30%~50%的内存用于执行bgsave命令和创建复制缓冲区

*数据同步阶段slave说明*

1. 为避免slave进行全量复制、部分复制时服务器响应阻塞或数据不同步，建议关闭此期间的对外服务
   `slave-serve-stale-data yes|no`
2. 数据同步阶段，master发送给slave信息可以理解为master是slave的一个客户端，主动向slave发送命令
3. 多个slave同时对master请求数据同步，master发送的RDB文件增多，会对宽带造成巨大冲击，如果master宽带不足，因此数据同步需要根据业务需求，适量错峰
4. slave过多时，建议调整拓扑结构，由一主多从结构变为树状结构，中间的节点既是master，也是slave。注意使用树状结构时，由于层级深度，导致深度越高的slave与最顶层master间数据同步延迟较大，数据一致性变差，应谨慎选择

**阶段三：命令传播阶段**

- 当master数据库状态被修改后，导致主从服务器数据库状态不一致，此时需要让主从数据同步到一致的状态，同步的动作称为命令传播
- master将接收到的数据变更命令发送给slave，slave接收命令后执行命令

*命令传播阶段的部分复制*

- 命令传播阶段出现了断网现象
  - 网络闪断闪连----------忽略
  - 短时间网络中断-------部分复制
  - 长时间网络中断-------全量复制

- 部分复制的三个核心要素
  - 服务器的运行id（run id）
  - 主服务器的复制积压缓冲区
  - 主从服务器的复制偏移量

*服务器运行ID（runid）*

- 概念：服务器运行id是每一台服务器每次运行的身份识别码，一台服务器多次运行可以生成多个运行id
- 组成：运行id由40位字符组成，是一个随机的十六进制字符
  例如：fdc9ff13b9bbaab28db42b3d50f852bb5e3fcdce
- 作用：运行id被用于在服务器间进行传输，识别身份
  如果想两次操作均对同一台服务器进行，必须每次操作携带对应的运行id，用于对方识别
- 实现方式：运行id在每台服务器启动时自动生成的，master在首次连接slave时，会将自己的运行id发送给slave，slave保存此id，通过info Server命令，可以查看节点的runid

*复制（积压）缓冲区*

![img](http://images.hellocode.top/1886066-20210919210854296-1379905969.png)

![img](http://images.hellocode.top/1886066-20210919210908901-249531964.png)

- 概念：复制缓冲区，又名复制积压缓冲区，是一个先进先出（FIFO）的队列，用于存储服务器执行过的命令，每次传播命令，master都会将传播的命令记录下来，并存储在复制缓冲区 
  - 复制缓冲区默认数据存储空间大小是1M
  - 当入队元素的数量大于队列长度时，最先入队的元素会被弹出，而新元素会被放入队列
- 作用：用于保存master收到的所有指令（仅影响数据的指令，例如set，select）
- 数据来源：当master接收到主客户端的指令时，除了将指令执行，会将该指令存储到缓冲区中

内部工作原理

- 组成
  - 偏移量
  - 字节值
- 工作原理
  - 通过offset区分不同的slave当前数据传播的差异
  - master记录已发送的信息对应的offset
  - slave记录已接收的信息对应的offset

*主从服务器复制偏移量（offset）*

- 概念：一个数字，描述复制缓冲区中的指令字节位置
- 分类
  - master复制偏移量：记录发送给所有slave的指令字节对应的位置（多个）
  - slave复制偏移量：记录slave接收master发送过来的指令字节对应的位置（一个）
- 作用：同步信息，比对master与slave的差异，当slave断线后，恢复数据使用
- 数据来源
  - master端：发送一次记录一次
  - slave端：接收一次记录一次

**数据同步+命令传播阶段工作流程**

![img](http://images.hellocode.top/1886066-20210919210929394-1517708878.png)

*心跳机制*

- 进入命令传播阶段后，master与slave间需要进行信息交换，使用心跳机制进行维护，实现双方连接保持在线
- master心跳
  - 内部指令：PING
  - 周期：由repl-ping-slave-period决定，默认10秒
  - 作用：判断slave是否在线
  - 查询：INFO replication    获取slave最后一次连接时间间隔，lag项维持在0或1视为正常
- slave心跳任务
  - 内部指令：REPLCONF ACK{offset}
  - 周期：1秒
  - 作用1：汇报slvae自己的复制偏移量，获取最新的数据变更指令
  - 作用2：判断master是否在线

心跳阶段注意事项

- 当slave多数掉线，或延迟过高时，master为保障数据稳定性，将拒绝所有信息同步操作
  `min-slave-to-write 2`
  `min-slave-max-lag 8`
  slave数量少于2个，或者所有slave的延迟都大于等于8秒时，强制关闭master写功能，停止数据同步
- slave数量由slave发送REPLCONF ACK命令做确认
- slave延迟由slave发送REPLCONF ACK命令做确认

#### 常见问题

**频繁的全量复制（1）**

伴随着系统的运行，master的数据量会越来越大，一旦master重启，runid将发生变化，会导致全部slave的全量复制操作

*内部优化调整方案*

1. master内部创建master_replid变量，使用runid相同的策略生成，长度41位，并发送给所有slave

2. 在master关闭时执行命令 `shutdown save`，进行RDB持久化，将runid与offset保存到RDB文件中

   - `repl-id`     `repl-offset`
   - 通过`redis-check-rdb`命令可以查看该信息

3. master重启后加载RDB文件，恢复数据

   重启后，将RDB文件中保存的repl-id与repl-offset加载到内存中

   - `master_repl_id = repl`       `master_repl_offset = repl-offset`
   - 通过info命令可以查看该信息

*作用*：本机保存上次runid，重启后恢复该值，使所有slave认为还是之前的master

**频繁的全量复制（2）**

- 问题现象：网络环境不佳，出现网络中断，slave不提供服务
- 问题原因：复制缓冲区过小，断网后slave的offset越界，触发全量复制
- 最终结果：slave反复进行全量复制
- 解决方案：修改复制缓冲区大小
  `repl-backlog-size ?mb`
- 建议设置如下
  1. 测算从master到slave的重连平均时长second
  2. 获取master平均每秒产生写命令数据总理write_size_per_second
  3. 最优复制缓冲区空间 = 2 * second * write_size_per_second

**频繁的网络中断（1）**

- 问题现象：master的CPU占用过高 或 slave频繁断开连接
- 问题原因
  - slave每1秒发送REPLCONF ACK命令到master
  - 当slave接到了慢查询时（keys * ，hgetall等），会大量占用CPU性能
  - master每1秒调用复制定时函数replicationCron()，比对slave发现长时间没有进行响应
- 最终结果：master各种资源（输出缓冲区、宽带、连接等）被严重占用
- 解决方案：通过设置合理的超时时间，确认是否释放slave
  `repl-timeout seconds`
  该参数定义了超时时间的阈值（默认60秒），超过该值，释放slave

**频繁的网络中断（2）**

- 问题现象：slave与master连接断开
- 问题原因
  - master发送ping指令频度较低
  - master设定超时时间较短
  - ping指令在网络中存在丢包
- 解决方案：提高ping指令发送的频度
  `repl-ping-slave-period seconds`
  超时时间repl-time的时间至少是ping指令频度的5到10倍，否则slave很容易判定超时

**数据不一致**

- 问题现象：多个slave获取相同数据不同步
- 问题原因：网络信息不同步，数据发送有延迟
- 解决方案
  - 优化主从间的网络环境，通常放置在同一个机房部署，如使用阿里云等云服务器时要注意此现象
  - 监控主从节点延迟（通过offset）判断，如果slave延迟过大，暂时屏蔽程序对该slave的数据访问
    `slave-serve-stale-data yes|no`
    开启后仅响应info、slaveof等少数命令（慎用，除非对数据一致性要求很高）

### 哨兵模式

#### 简介

![img](http://images.hellocode.top/u=1367093581,1207155087&fm=253&fmt=auto&app=138&f=PNG)

哨兵（sentinel）是一个分布式系统，用于对主从结构中的每台服务器进行监控，当出现故障时通过投票机制选择新的master并将所有slave连接到新的master

**作用**

- 监控
  - 不断地检查master和slave是否正常运行
  - master存活检测、master与slave运行情况检测
- 通知（提醒）：当被监控的服务器出现问题时，向其他（哨兵间，客户端）发送通知
- 自动故障转移：断开master与slave连接，选取一个slave作为master，将其他slave连接新的master，并告知客户端新的服务器地址

> 注意：哨兵也是一台redis服务器，只是不提供数据相关服务，通常哨兵的数量配置为单数

#### 部署

- 配置一拖二的主从结构（模拟）
- 配置三个哨兵（配置相同，端口不同），参看sentinel.conf（模拟）
- 启动哨兵
  `redis-sentinel filename.conf`

**配置哨兵**

- 设置哨兵监听的主服务器信息，sentinel_number表示参与投票的哨兵数量（一般设置为哨兵数量的一半+1）
  `sentinel monitor master_name master_host master_port sentinel_number`
- 设置判定服务器宕机时长，该设置控制是否进行主从切换
  `sentinel down-after-milliseconds master_name million_seconds`
- 设置故障切换的最大超时时长
  `sentinel failover-timeout master_name million_seconds`
- 设置主从切换后，同时进行数据同步的slave数量，数值越大，要求网络资源越高，数值越小，同步时间越长
  `sentinel parallel-syncs master_name sync_slave_number`

```shell
port 26379
dir /data/26379                                        ####哨兵sentinel的工作目录
sentinel monitor mymaster 127.0.0.1 6379 2             #### 这行的意思是当有2个哨兵服务器认为master失联，那么这时客观上就认为主节点失联了。这里的按照所有的(哨兵节点/2)+1的个数来判断
sentinel down-after-milliseconds mymaster 30000        #### 指定多少毫秒之后，主节点没有应答哨兵sentinel 此时，哨兵主观上认为主节点下线，默认是30秒
sentinel parallel-syncs mymaster 1                     #### 这个配置是指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行同步，如果这个数字越小，完成failover时间就越长，
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　#如果这个数字越大，对物理机的CPU、内存资源消耗的就越大。

sentinel failover-timeout mymaster 180000             
###故障转移的超时时间(1：同一个sentinel对同一个master两次failover之间的间隔时间。
　　　　　　　　　　　#2：当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确master那里同步数据时。
　　　　　　　　　　　#3：当先要取消一个正在进行的failover所需要的时间，
　　　　　　　　　　　#4：当进行failover时，配置所有slave指向新的master所需要的最大时间。不过，即使过了这个超时，slaves依然被正确配置为执向master,但是就不按parallel-syncs所配置的规则) 

#以上配置就可以正常的启动哨兵
```

#### 工作原理

- 哨兵在进行主从切换过程中经历三个阶段
  - 监控阶段
    - 同步信息
  - 通知阶段
    - 保持联通
  - 故障转移阶段
    - 发现问题，标记主观下线与客观下线
    - 竞选负责人
    - 优选新master
    - 新master上任，其他slave切换master，原master作为slave故障恢复后连接

**阶段一：监控阶段**

![img](http://images.hellocode.top/1594604-20201208103503956-1285626051.png)

- 用于同步各个节点的状态信息
  - 获取各个sentinel的状态（是否在线）
  - 获取master的状态
    - master的属性
      - runid
      - role:master
    - 各个slave的详细信息
  - 获取所有slave的状态（根据master中的slave信息）
    - slave属性
      - runid
      - role:slave
      - master_host、master_port
      - offset
      - ......

**阶段二：通知阶段**

![img](http://images.hellocode.top/1594604-20201208104907311-1580930825.png)

哨兵内部互通消息，同步消息（所监控服务对应的状态）

**阶段三：故障转移阶段**

- 当某个sentinel检测到某服务故障之后，会把对应的故障服务标记为`SRI_S_DOWN`，并在对应的哨兵网中通知其他sentinel（*主观下线*）
- 其他sentinel接收到通知后，将会共同向对应服务发出消息(故障ip、端口、runid等等)，检查是否故障，如果确定故障，会将其标记为`SRI_O_DOWN`状态（*客观下线*）

![img](http://images.hellocode.top/1594604-20201208105113980-1490176343.png)

- 在多个sentinel中，首先会在内部进行选举（谁先申请就选举谁），选出票多的作为本次处置中的领导
- 有可能存在一轮选举并没有选举出的情况（票数持平），将会重复重新进行选举

*处置阶段*

- 服务器列表中挑选备选master（排除）
  - 不在线的
  - 响应慢的
  - 与原master断开时间久的
  - 优先原则
    - 优先级
    - offset
    - runid

- 处置完成，发送指令（sentinel）
  - 向新的master发送slaveof no one
  - 向其他slave发送slaveof 新masterIP端口

### 集群

**业务发展过程中遇到的峰值瓶颈**

- redis提供的服务OPS可以达到10万/秒，但是如果当前业务已经超过10万/秒
- 内存单机容量达到256G，但是当前业务需求内存容量1T
- 使用集群的方式可以快速解决上述问题

#### 简介

- 集群就是使用网络将若干台计算机联通起来，并提供统一的管理方式，使其对外呈现单机的服务效果

**作用**

- 分散单台服务器的访问压力，实现负载均衡
- 分散单台服务器的存储压力，实现可扩展性
- 降低单台服务器宕机带来的业务灾难

#### 数据结构

Redis是使用Cluster进行集群结构设计

**单机**

![d6594ec756c885d5ed169365b7d0add4.png](http://images.hellocode.top/d6594ec756c885d5ed169365b7d0add4.png)

**集群**

![874dbc2cfd19cd478f3eedf22dabd446.png](http://images.hellocode.top/874dbc2cfd19cd478f3eedf22dabd446.png)

- Redis提供一个CRC16函数将key转换成一个值（类似于hash值），再通过%16384得到一个数（对Redis进行16384的等分，每一份代表一个存储空间，每台计算机保存若干台空间），假设为37，这个37用来确定该数据在集群中存在的位置

![e6ccaa590637cfd78be78e57fedf398a.png](http://images.hellocode.top/e6ccaa590637cfd78be78e57fedf398a.png)

- 如果一台计算机宕机，或者新加入一台计算机之后该怎么办？

- 假设，目前有三个台机器，现在又加了一台机器

![2ee17b4f54be2bffb10d723dc332a4f3.png](http://images.hellocode.top/2ee17b4f54be2bffb10d723dc332a4f3.png)

- 将会在已有体系结构中的空间各自拿出来一部分（槽，可以理解为一个存储空间就是一个槽，一共16384个槽），放入新机器的存储空间
- 通过这种方式，增强了集群的可扩展性

![ccf299ff8b48a9f969731b4974ea39ba.png](http://images.hellocode.top/ccf299ff8b48a9f969731b4974ea39ba.png)

*集群内部通讯设计*

- 各个数据库相互通信，保存各个库中槽的编号数据
- 假设现在来发过来一条指令key，如果在当前主机中存储，则直接命中，未在当前主机存储，则告知具体的存储位置，保障最多两次即可命中数据
  - 一次命中，直接返回
  - 一次未命中，告知具体位置

![a115bc0bffa0af71f6d3cbc9b127ac08.png](http://images.hellocode.top/a115bc0bffa0af71f6d3cbc9b127ac08.png)

#### 部署

- 配置服务器（3主3从）
- 建立通信（Meet）
- 分槽（Slot）
- 搭建主从（master-slave）

**Cluster配置**

- 是否启用cluster，加入cluster节点
  `cluster-enabled yes|no`
- cluster配置文件名，该文件属于自动生成，仅用于快速查找文件并查询文件内容
  `cluster-config-file filename`
- 节点服务响应超时时间，用于判定该节点是否下线或切换为从节点
  `cluster-node-timeout milliseconds`
- master连接的slave最小数量
  `cluster-migration-barrier min_slave_number`

**Cluster节点操作命令**（了解即可）

- 查看集群节点信息
  `cluster nodes`
- 更改slave指向新的master
  `cluster replicate master-id`
- 发现一个新节点，新增master
  `cluster meet ip:port`
- 忽略一个没有solt的节点
  `cluster forget server_id`
- 手动故障转移
  `cluster failover`

**redis-cli命令**

- 创建集群

  ```shell
  redis-cli --cluster create masterhost1:masterport1 masterhost2:masterport2
  masterhost3:masterport3 [masterhostn:masterportn ...] slavehost1:slaveport1
  slavehost2:slaveport2 slavehost3:slaveport3 --cluster-replicas n 
  ```

  - master与slave的数量要匹配，一个master对应n个slave，由最后的参数n决定
  - master与slave的匹配顺序为第一个master与前n个master分为一组，形成主从结构

**配置文件**

```shell
port 6501
dir "/redis/data"
dbfilename "dump-6501.rdb"
cluster-enabled yes
cluster-config-file "cluster-6501.conf"
cluster-node-timeout 5000
```

> 搭建集群后，存入key时会计算出该key应该存入哪个服务器，所以在连接客户端时应该`redis-cli -c -h ip -p port`，加上`-c`，表示以集群模式启动，将会在集群服务器客户端间实现自动切换，完成数据存储

#### 节点操作

**redis-cli命令**

- 添加master到当前集群中，连接时可以指定任意现有节点地址与端口
  `redis-cli --cluster add-node new-master-host:new-master-port now-host:now-port`
- 添加slave
  `redis-cli --cluster add-node new-slave-host:new-slave-port master-host:master-port --cluster-slave --cluster-master-id masterid`
- 删除节点，如果删除的节点是master，必须保障其中没有槽slot
  `redis-cli --cluster del-node del-slave-host:del-slave-port del-slave-id`

> 添加master时，`now-host:now-port`随便输入一个已经添加到集群中的服务即可
>
> 但是新添加master后，并没有为其分槽，需要进行重新分槽操作

- 重新分槽，分槽是从具有槽的master中划分一部分给其他master，过程中不创建新的槽
  `redis-cli --cluster reshard new-master-host:new-master-port --cluster-from src-master-id1,src-master-id2,src-master-idn --cluster-to target-master-id --cluster-slots slots`
  - 将需要参与分槽的所有masterid不分先后顺序添加到参数中，使用`,`分隔
  - 指定目标得到的槽的数量，所有的槽将平均从每个来源的master处获取
- 重新分配槽，从具有槽的master中分配指定数量的槽到另一个master中，常用于清空指定master中的槽
  `redis-cli --cluster reshard src-master-host:src-master-port --cluster-from src-master-id --cluster-to target-master-id --cluster-slots slots --cluster-yes`

### 企业级解决方案

#### 缓存预热

> 缓存预热就是系统启动前，提前将相关的缓存数据直接加载到缓存系统。避免在用户请求的时候，先查询数据库，然后再将数据库缓存的问题！用户直接查询事先被预热的缓存数据

**宕机**

服务器启动后迅速宕机

**问题排查**

1. 请求数量较高
2. 主从之间数据吞吐量较大，数据同步操作频度较高

**解决方案**

*前期准备工作*

1. 日常例行统计数据访问记录，统计访问频度较高的热点数据
2. 利用LRU数据删除策略，构建数据留存队列
   例如：storm与kafka配合

*准备工作*

1. 将统计结果中的数据分类，根据级别，redis优先加载级别较高的热点数据
2. 利用分布式多服务器同时进行数据读取，提速数据加载过程
3. 热点数据主从同时预热

*实施*

1. 使用脚本程序固定触发数据预热过程
2. 如果条件允许，使用了CDN（内容分发网络），效果会更好

#### 缓存雪崩

> 缓存雪崩就是瞬间过期数据量太大，导致对数据库服务器造成压力。如能够有效避免过期时间集中，可以有效解决雪崩现象的出现（约40%），配合其他策略一起使用，并监控服务器的运行数据，根据运行记录做快速调整

**数据库服务器崩溃（1）**

1. 系统平稳运行过程中，忽然数据库连接量激增
2. 应用服务器无法及时处理请求
3. 大量408，500错误页面出现
4. 客户反复刷新页面获取数据
5. 数据库崩溃
6. 应用服务器崩溃
7. 重启应用服务器无效
8. Redis服务器崩溃
9. Redis集群崩溃
10. 重启数据库后再次被瞬间流量放倒

**问题排查**

1. 在一个*较短*的时间内，缓存中*较多*的key*集中过期*
2. 此周期内请求访问过期的数据，redis未命中，redis向数据库获取数据
3. 数据库同时接收到大量的请求无法及时处理
4. Redis大量请求被积压，开始出现超时现象
5. 数据库流量激增，数据库崩溃
6. 重启后仍然面对缓存中无数据可用
7. Redis服务器资源被严重占用，Redis服务器崩溃
8. Redis集群呈现崩塌，集群瓦解
9. 应用服务器无法及时得到数据响应请求，来自客户端的请求数量越来越多，应用服务器崩溃
10. 应用服务器，redis，数据库全部重启，效果不理想

**问题分析**

- 短时间范围内
- 大量key集中过期

**解决方案（道）**

1. 更多的页面静态化处理
2. 构建多级缓存架构
   Nginx缓存+redis缓存+ehcache缓存
3. 检测Mysql严重耗时业务进行优化
   对数据库的瓶颈排查：例如超时查询、耗时较高事务等
4. 灾难预警机制
   监控redis服务器性能指标
   - CPU占用、CPU使用率
   - 内存容量
   - 查询平均响应时间
   - 线程数
5. 限流、降级
   短时间范围内牺牲一些客户体验，限制一部分请求访问，降低应用服务器压力，待业务低俗运转后再逐步放开访问

**解决方案（术）**

1. LRU与LFU切换
2. 数据有效期策略调整
   - 根据业务数据有效期进行分类错峰，A类90分钟，B类80分钟，C类70分钟
   - 过期时间使用固定时间+随机值的形式，稀释集中到期的key的数量
3. 超热数据使用永久key
4. 定期维护（自动+人工）
   对即将过期数据做访问量分析，确认是否延时，配合访问量统计，做热点数据的延时
5. 加锁
   慎用！

#### 缓存击穿

> 缓存击穿就是单个高热数据过期的瞬间，数据访问量较大，未命中redis后，发起了大量对统一数据的数据库访问，导致对数据库服务器造成压力。应对策略应该在业务数据分析与预防方面进行，配合运行监控测试与即时调整策略，毕竟单个key的过期监控难度较高，配合雪崩处理策略即可

**数据库服务器崩溃（2）**

1. 系统平稳运行过程中
2. 数据库连接量瞬间激增
3. Redis服务器无大量key过期
4. Redis内存平稳，无波动
5. Redis服务器CPU正常
6. 数据库崩溃

**问题排查**

1. Redis中某个key过期，该key访问量巨大
2. 多个数据请求从服务器直接压到Redis后，均为命中
3. Redis在短时间内发起了大量对数据库中同一数据的访问

**问题分析**

- 单个key高热数据
- key过期

**解决方案（术）**

1. 预先设定
   以电商为例，每个商家根据店铺等级，指定若干款主打商品，在购物节期间，加大此类信息key的过期时长
   注意：购物节不仅仅指当天，以及后续若干天，访问峰值呈现逐渐降低的趋势
2. 现场调整
   监控访问量，对自然流量激增的数据延长过期时间获设置为永久性key
3. 后台刷新数据
   启动定时任务，高峰期来临之前，刷新数据有效期，确保不丢失
4. 二级缓存
   设置不同的失效时间，保障不会被同时*淘汰*就行
5. 加锁
   分布式锁，防止被击穿，但是要注意也是性能瓶颈，慎重！

#### 缓存穿透

> 缓存穿透访问了不存在的数据，跳过了合法数据的redis数据缓存阶段，每次访问数据库，导致对数据库服务器造成压力。通常此类数据的出现量是一个较低的值，当出现此类情况以毒攻毒，并及时*报警*。应对策略应该在临时预案防范方面多做文章
>
> 无论黑名单还是白名单，都是对整体系统的压力，警报解除后尽快移除

**数据库服务器崩溃（3）**

1. 系统平稳运行过程中
2. 应用服务器流量随时间增量较大
3. Redis服务器命中率随时间逐步降低
4. Redis内存平稳，内存无压力
5. Redis服务器CPU占用激增
6. 数据库服务器压力激增
7. 数据库崩溃

**问题排查**

1. Redis中大面积出现未命中
2. 出现非正常URL访问（访问的key根本不存在）

**问题分析**

- 获取的数据在数据库中也不存在，数据库查询未得到对应数据
- Redis获取到null数据未进行持久化，直接返回
- 下次此类数据到达重复上述过程
- 出现黑客攻击服务器

**解决方案（术）**

1. 缓存null
   对查询结构为null的数据进行缓存（长期使用，定期清理），设定短时限，例如30~60秒，最高5分钟
2. 白名单策略
   - 提前预热各种分类数据id对应的bitmaps，id作为bitmaps的offset，相当于设置了数据白名单。当加载正常数据时放行，加载异常数据时直接拦截（效率偏低）
   - 使用布隆过滤器（有关布隆过滤器的命中问题对当前状况可以忽略）
3. 实施监控
   实时监控redis命中率（业务正常范围时，通常会有一个波动值）与null数据的占比
   - 非活动时段波动：通常检测3-5倍，超出5倍纳入重点排查对象
   - 活动时段波动：通常检测10-50倍，超过50倍纳入重点排查对象
     根据倍数不同，启动不同的排查流程。然后使用黑名单进行防控（运营）
4. key加密
   问题出现后，临时启动防灾业务key，对key进行业务层传输加密服务，设定校验程序，过来的key校验
   例如每天随机分配60个加密串，挑选2到3个，混淆到页面数据id中，发现访问key不满足规则，驳回数据访问

#### 性能指标监控

**监控指标**

- 性能指标：Performance
- 内存指标：Memory
- 基本活动指标：Basic_activity
- 持久性指标：Persistence
- 错误指标：Error

*监控指标——性能指标（Performance）*

- 响应请求的平均时间
  `latency`
- 平均每秒处理请求总数量
  `instantaneous_ops_per_sec`
- 缓存查询命中率（通过查询总次数与查询得到非nil数据总次数计算而来）
  `hit_rate(calculated)`

*监控指标——内存指标（Memory）*

- 当前内存使用量
  `used_memory`
- 内存碎片率（关系到是否进行碎片整理）
  `mem_fragmentation_ratio`
- 为避免内存溢出删除的key的总数量
  `evicted_keys`
- 基于阻塞操作（BLPOP等）影响的客户端数量
  `blocked_clients`

*监控指标——基础活动指标（Basic_activity）*

- 当前客户端连接总数
  `connected_clients`
- 当前连接slave总数
  `connected_slaves`
- 最后一次主从信息交换距现在的秒数
  `master_last_io_seconds_ago`
- key的总数
  `keyspace`

*监控指标——持久化指标（Persistence）*

- 当前服务器最后一次RDB持久化的时间
  `rdb_last_save_time`
- 当前服务器最后一次RDB持久化后数据变化总量
  `rdb_changes_since_last_save`

*监控指标——错误指标（Error）*

- 被拒绝连接的客户端总数（基于达到最大连接值的因素）
  `rejected_connections`
- key未命中的总次数
  `keyspace_misses`
- 主从断开的秒数
  `master_link_down_since_seconds`

**监控方式**

- 工具
  - Cloud Insight Redis
  - Prometheus
  - Redis-stat
  - Redis-faina
  - RedisLive
  - zabbix
- 命令
  - benchmark
  - redis-cli
    - monitor
    - slowlog

*benchmark*

- 测试当前服务器的并发性能
  `redis-benchmark [-h] [-p] [-c] [-n <requests]> [-k]`
- 范例1：50个连接，10000次请求对应的性能
  `redis-benchmark`
- 范例2：100个连接，5000次请求对应的性能
  `redis-benchmark -c 100 -n 5000`

![1612364934240](http://images.hellocode.top/1540879-20210203231705857-1634323855.png)

*monitor*

- 启动服务器调试信息
  `monitor`

*slowlog*

- 获取慢查询日志
  `slowlog [operator]`
  - get：获取慢查询日志信息
  - len：获取慢查询日志条目数
  - reset：重置慢查询日志
- 相关配置
  `slowlog-log-slower-than 1000  # 设置慢查询的时间下限，单位：微秒`
  `slowlog-max-len 100     # 设置慢查询命令对应的日志显示长度，单位：命令数`