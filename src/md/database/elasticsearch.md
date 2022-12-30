---
title: "ElasticSearch"
order: 7
category:
  - 数据库
---

# ElasticSearch

## 概述

- ElasticSearch 是一个基于Lucene的搜索服务器（ES相当于封装了Lucene，简化开发）
- 是一个分布式、高扩展、高实时的搜索与数据分析引擎
- 基于RESTful web接口
- Elasticsearch是用Java语言开发的，并作为Apache许可条款下的开放源码发布，是一种流行的企业级搜索引擎
- 官网：https://www.elastic.co
- 应用场景
  - 搜索：*海量*数据的查询
  - 日志数据分析
  - 实时数据分析

![在这里插入图片描述](http://images.hellocode.top/5e6b40ebe9b7482d91cce2526605ac03.png)

> ElasticSearch和Mysql分工不同，MySQL负责存储数据，ElasticSearch负责搜索数据

**数据库查询的问题**

1. 如果使用模糊查询

   `SELECT * FROM goods WHERE title LIKE ‘%手机%’;`

   如果使用模糊查询，左边有通配符`%`，就不会走索引，会全表扫描，*性能低*

2. 查询title中包含‘华为手机’的信息

   是出现华为或者出现手机都行，不是整体

   如果要实现上面的需求，关系型数据库提供的查询，*功能太弱*

### 倒排索引

**正向索引**

| Key          | Value                     |
| ------------ | ------------------------- |
| 《静夜思》   | 床前明月光...             |
| 《春晓》     | 春眠不觉晓...             |
| 《水调歌头》 | 明月几时有？把酒问青天... |

（反向）**倒排索引**

> 倒排索引：将各个文档中的内容，进行分词，形成词条。然后记录词条和数据的唯一标识（id）的对应关系，形成的产物

![1580887667417](http://images.hellocode.top/4453b55ec1f2b2021d37dde979d5f28f.png)

### 存储和搜索原理

**存储**

![1581143412491](http://images.hellocode.top/d7ab929a799c27a7c56e91bd690d961d.png)

**搜索**

1. 使用“手机”作为关键字查询

   生成的倒排索引中，词条会排序，形成一颗树形结构，提升词条的查询速度

2. 使用“华为手机”作为关键字查询（ES会先分词，再查询）

   华为：1,3

   手机：1,2,3

![1581143489911](http://images.hellocode.top/4b0e5ba753a4dbe4974cea3d907aeef7.png)

### 安装

**ElasticSearch**

1. 下载：https://www.elastic.co/cn/downloads/elasticsearch

2. 执行解压操作

   ```shell
   # 解压到opt目录下，-C大写
   tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz -C /opt
   ```

3. 创建普通用户

   因为安全问题，ElasticSearch不允许root用户直接运行，所以要创建新用户，在root用户中创建新用户，执行如下命令

   ```shell
   useradd hellocode  # 新增hellocode用户
   passwd hellocode	# 为hellocode设置密码
   ```

4. 为新用户授权

   ```shell
   chown -R hellocode:hellocode /opt/elasticsearch-7.8.0	# 文件夹所有者
   ```

5. 修改elasticsearch.yml文件

   ```shell
   vim /opt/elasticsearch-7.8.0/config/elasticsearch.yml
   ```

   ```shell
   #==============================Elasticsearch Configuration=====================
   cluster.name: my-application
   node.name: node-1
   network.host: 0.0.0.0
   http.port: 9200
   cluster.initial_master_nodes: ["node-1"]
   ```

   cluster.name：配置elasticsearch的集群名称，默认是elasticsearch。建议修改成一个有意义的名称

   node.name：节点名，elasticsearch会默认随机指定一个名字，建议指定一个有意义的名字，方便管理

   network.host：设置为0.0.0.0允许外网访问

   http.port：Elasticsearch的http访问端口

   cluster.initial_master_nodes：初始化新的集群时需要此配置来选举master

   xpack.security.http.ssl：关闭ssl，否则访问不了

6. 修改配置文件

   新创建的hellocode用户最大可创建文件数太小，最大虚拟内存太小，切换到root用户，编辑下列配置文件，添加类似如下内容

   ```shell
   # 切换root用户
   su root
   
   # 1. =====最大可创建文件数太小=======
   vim /etc/security/limits.conf
   # 在文件末尾添加下面内容
   hellocode soft nofile 65536
   hellocode hard nofile 65536
   * hard nproc 4096
   # 注：* 代表Linux所有用户名称
   
   
   # 2.=======最大虚拟内存太小========
   vim /etc/sysctl.conf
   # 在文件中增加下面内容
   vm.max_map_count=655360
   # 重新加载，输入下面命令
   sysctl -p
   ```

7. 启动ElasticSearch

   ```shell
   # 切换用户
   su hellocode
   # 进入到es的bin目录
   cd /opt/elasticsearch-7.8.0/bin
   # 启动
   ./elasticsearch
   ```

   浏览器访问：http://ip:9200

   需要关闭防火墙或者开启9200端口

![image-20221226120933000](http://images.hellocode.top/image-20221226120933000.png)

> 访问不了常见问题：9200端口没有开放；es配置文件中开启了ssl认证；可以访问需要密码的话可以在es配置文件开启免密访问

**辅助插件**

*Postman*

- 官网：https://www.postman.com/

*Kibana*

Kibana是一个针对ElasticSearch的开源分析及可视化平台，用来搜索、查看交互存储在ElasticSearch索引中的数据。使用Kibana，能够经过各类图表进行高级数据分析及展现

Kibana让海量数据更容易理解。它操作简单，基于浏览器的用户界面可以快速创建仪表板（dashboard）实时显示ElasticSearch查询动态

1. 下载：https://www.elastic.co/cn/downloads/kibana

2. 上传并解压

   ```shell
   # 解压到/opt目录下
   tar -zxvf kibana-7.8.0-linux-x86_64.tar.gz -C /opt
   ```

3. 修改Kibana配置

   ```shell
   vim /opt/kibana-7.8.0-linux-x86_64/config/kibana.yml
   ```

   ```shell
   server.port: 5601
   server.host: "0.0.0.0"
   server.name: "kibana-hellocode"
   elasticsearch.hosts: ["http://127.0.0.1:9200"]
   elasticsearch.requestTimeout: 99999
   ```

   server.port：http访问端口

   server.host：ip地址，0.0.0.0表示可以远程访问

   server.name：kibana服务名

   elasticsearch.hosts：elasticsearch地址

   elasticsearch.requestTimeout：请求elasticsearch超时时间，默认为30000，此处可根据情况设置

4. 启动

   由于Kibana不建议使用root启动，如果用root启动，需要加`--allow-root`参数

   ```shell
   # 进入kibana目录
   cd /opt/kibana-7.8.0-linux-x86_64/bin
   # 开放5601端口
   firewall-cmd --zone=public --add-port=5601/tcp --permanent
   # 重新加载防火墙配置
   firewall-cmd --reload
   # 启动
   ./kibana --allow-root
   ```

   访问：http://ip:5601

![image-20221226132058500](http://images.hellocode.top/image-20221226132058500.png)

![image-20221226132120868](http://images.hellocode.top/image-20221226132120868.png)

## 脚本操作ES

**核心概念**

- 索引（index）

  ES存储数据的地方，可以理解为关系型数据库中的数据库概念

- 映射（mapping）

  mapping定义了每个字段的类型、字段所使用的分词器等。相当于关系型数据库中的表结构

- 文档（document）

  ES中的最小数据单元，常以json格式显示。一个document相当于关系型数据库中的一行数据

- 倒排索引

  一个倒排索引由文档中所有不重复词的列表构成，对于其中每个词，对应一个包含它的文档id列表

- 类型（type）

  一种type就像一类表。如用户表、角色表等。在ES 7.x默认type为_doc

  - ES 5.x中一个index可以由多种type
  - ES 6.x中一个index只能有一种type
  - ES 7.x以后，将逐步移除type这个概念，现在的操作已经不再使用，默认_doc

### RESTful风格介绍

- REST（Representational State Transfer），表述性状态转移，是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。就是一种定义接口的规范
- 基于HTTP
- 可以使用XML格式定义或JSON格式定义
- 每一个URI代表1种资源
- 客户端使用GET、POST、PUT、DELETE 4个表示操作方式的动词对服务端资源进行操作
  - GET：用来获取资源
  - POST：用来新建资源（也可以用于更新资源）
  - PUT：用来更新资源
  - DELETE：用来删除资源

### 操作索引

> 操作可以使用Postman或者Kibana，推荐Kibana（更方便）

**添加索引**

- *【PUT】*`http://ip:9200/索引名称`

**查询索引**

- *【GET】*`http://ip:9200/索引名称1,索引名称2,...`

- *【GET】*`http://ip:9200/_all`

**删除索引**

- *【DELETE】*`http://ip:9200/索引名称1,索引名称2,...`

**关闭索引**（关闭后能查到，但是不能往里面添加数据）

- *【POST】*`http://ip:9200/索引名称/_close`

**打开索引**

- *【POST】*`http://ip:9200/索引名称/_open`



### 数据类型

**简单数据类型**

- 字符串

  - text：会分词，不支持聚合
  - keyword：不会分词，将全部内容作为一个词条，支持聚合

- 数值

  | 类型         | 说明                                              |
  | ------------ | ------------------------------------------------- |
  | long         | 带符号的64位整数，最小值：-263263，最大值：263262 |
  | integer      | 带符号的32位整数，最小值：-231231，最大值：231230 |
  | short        | 带符号的16位整数，最小值：-32768，最大值：32767   |
  | byte         | 带符号的8位整数，最小值：-128，最大值127          |
  | double       | 双精度64位IEEE 754浮点数，限制为有限值            |
  | float        | 单精度32位IEEE 754浮点数，限制为有限值            |
  | half_float   | 半精度16位IEEE 754浮点数，限制为有限值            |
  | scaled_float | 由a支持的有限浮点数long，由固定double比例因子缩放 |

  

- 布尔：boolean
- 二进制：binary
- 范围类型
  
  - integer_range,float_range,long_range,double_range,date_range
- 日期：date

**复杂数据类型**

- 数组：[]
- 对象：{}

### 操作映射

**添加映射**

```http
PUT person/_mapping
{
  "properties":{
    "name":{
      "type":"keyword"
    },
    "age":{
      "type":"integer"
    }
  }
}
```

> 当出现readonly等问题导致执行失败的话，可以选择清理磁盘或者执行下面命令

```http
PUT person/_settings
{
  "index.blocks.read_only_allow_delete": "false"
}
```

**查询映射**

```http
GET person/_mapping
```

**创建索引并添加映射**

```http
PUT person
{
  "mappings": {
    "properties": {
      "name":{
        "type": "keyword"
      },
      "age":{
        "type": "integer"
      }
    }
  }
}
```

**添加字段**

```http
PUT person/_mapping
{
  "properties":{
    "address":{
      "type":"text"
    }
  }
}
```

![image-20221226152606152](http://images.hellocode.top/image-20221226152606152.png)

### 操作文档

> 如果没有手动添加对应的映射，直接添加文档，会自动生成映射（不推荐）

**添加文档**

```shell
# 添加文档，指定id（这里的1）
PUT person/_doc/1
{
  "name":"张三",
  "age":20,
  "address":"陕西西安市"
}

# 添加文档，不指定id
POST person/_doc
{
  "name":"李四",
  "age":30,
  "address":"陕西宝鸡市"
}
```

> 注意：指定id时可以用`PUT`，也可以用`POST`，但是如果不指定id，那就只能用`POST`请求方式

**查询文档**

```shell
# 查询文档，将id替换成真实id即可
GET person/_doc/id
# 查询所有文档
GET person/_search
```

**修改文档**

```shell
# 修改文档
PUT person/_doc/1
{
  "name":"张三三",
  "age":20,
  "address":"陕西西安市"
}
```

> id存在则修改，id不存在则为添加

**删除文档**

```shell
# 删除文档
DELETE person/_doc/id
```

![image-20221226153735063](http://images.hellocode.top/image-20221226153735063.png)

### 查询文档

> ES默认使用的分词器是standard，一个字一个词。添加映射的时候没有指定，就会使用默认分词器

```shell
# 创建索引，添加映射，指定使用ik分词器
PUT person
{
  "mappings": {
    "properties": {
      "name":{
        "type": "keyword"
      },
      "address":{
        "type": "text",
        "analyzer": "ik_max_word"
      }
    }
  }
}
```

**词条查询：term**

- 词条查询不会分析查询条件，只有当词条和查询字符串完全匹配时才匹配搜索

```shell
# term 词条查询
GET person/_search
{
  "query": {
    "term": {
      "address": {
        "value": "华为"
      }
    }
  }
}
```

**全文查询：match**

- 全文查询会分析查询条件，先将查询条件进行分词，然后查询，求并集

```shell
GET person/_search
{
  "query": {
    "match": {
      "address": "华为手机"
    }
  }
}
```

## 分词器

> 将一段文本，按照一定逻辑，分析成多个词语的一种工具

### ES内置分词器

- Standard Analyzer：默认分词器，按词切分，小写处理
- Simple Analyzer：按照非字母切分（符号被过滤），小写处理
- Stop Analyzer ：小写处理，停用词过滤（the ，a，is）

- Whitespace Analyzer ：按照空格切分，不转小写

- Keyword Analyzer ：不分词，直接将输入当做输出

- Patter Analyzer ：正则表达式，默认` \W+(非字符分割)`

- Language ：提供了 30 多种常见语言的分词器

> ES内置的分词器对中文很不友好，处理方式为：一个字一个词

```json
GET _analyze
{
	"analyzer":"standard",
	"text":"我爱北京天安门"
}
```

```json
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "<IDEOGRAPHIC>",
      "position" : 0
    },
    {
      "token" : "爱",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "<IDEOGRAPHIC>",
      "position" : 1
    },
    {
      "token" : "北",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "<IDEOGRAPHIC>",
      "position" : 2
    },
    {
      "token" : "京",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "<IDEOGRAPHIC>",
      "position" : 3
    },
    {
      "token" : "天",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "<IDEOGRAPHIC>",
      "position" : 4
    },
    {
      "token" : "安",
      "start_offset" : 5,
      "end_offset" : 6,
      "type" : "<IDEOGRAPHIC>",
      "position" : 5
    },
    {
      "token" : "门",
      "start_offset" : 6,
      "end_offset" : 7,
      "type" : "<IDEOGRAPHIC>",
      "position" : 6
    }
  ]
}

```

### IK分词器

- IKAnalyzer是一个开源的，基于Java语言开发的轻量级的中文分词工具包
- 是一个基于Maven构建的项目
- 具有60万字/秒的高速处理能力
- 支持用户词典扩展定义
- 下载地址：https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v7.8.0

**安装**

*jdk*

ElasticSearch要使用ik，就要先构建ik的jar包，要用到maven包管理工具，而maven需要Java环境，ES内置了jdk，所以可以将JAVA_HOME设置为ES内置的jdk

```shell
vim /etc/profile
# 在profile文件末尾添加
# java environment
export JAVA_HOME=/opt/elasticsearch-7.8.0/jdk
export PATH=$PATH:${JAVA_HOME}/bin

# 保存退出后，重新加载profile
source /etc/profile
```

*maven*

```shell
# 下载
wget https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz

# 解压
tar -zxvf apache-maven-3.8.6-bin.tar.gz

# 设置软连接
ln -s apache-maven-3.8.6 maven
```

```shell
# 设置path
vim /etc/profile.d/maven.sh

# 将下面内容复制到文件，保存
export MAVEN_HOME=/opt/maven
export PATH=${MAVEN_HOME}/bin:${PATH}

# 保存后刷新使其生效
source /etc/profile.d/maven.sh
```

*ik分词器*

```shell
# 切换到elasticsearch-7.8.0目录
cd /opt/elasticsearch-7.8.0/plugins
# 新建目录
mkdir analysis-ik
cd analysis-ik

# 下载
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.8.0/elasticsearch-analysis-ik-7.8.0.zip

# 解压
unzip elasticsearch-analysis-ik-7.8.0.zip
```

拷贝辞典

```shell
cp -R /opt/elasticsearch-7.8.0/plugins/analysis-ik/config/* /opt/elasticsearch-7.8.0/config
```

需要重启ES

**使用**

> IK分词器有两种分词模式：`ik_max_word`和`ik_smart`模式

*ik_max_word*

会将文本做最细粒度的拆分，比如会将“乒乓球明年总冠军”拆分为“乒乓球、乒乓、球、明年、总冠军、冠军”

![image-20221227113614877](http://images.hellocode.top/image-20221227113614877.png)

*ik_smart*

将文本做粗粒度的拆分

![image-20221227114038310](http://images.hellocode.top/image-20221227114038310.png)

## Java API

### SpringBoot整合ES

1. 搭建SpringBoot工程

2. 引入ElasticSearch相关坐标

   ```xml
   <!--es相关坐标-->
   <dependency>
       <groupId>org.elasticsearch.client</groupId>
       <artifactId>elasticsearch-rest-high-level-client</artifactId>
       <version>7.8.0</version>
   </dependency>
   <dependency>
       <groupId>org.elasticsearch.client</groupId>
       <artifactId>elasticsearch-rest-client</artifactId>
       <version>7.8.0</version>
   </dependency>
   <dependency>
       <groupId>org.elasticsearch</groupId>
       <artifactId>elasticsearch</artifactId>
       <version>7.8.0</version>
   </dependency>
   ```

3. 测试

**单体项目**

> 指不在SpringBoot环境下，就需要自己new对象，而整合SpringBoot指的是将对应的对象交给SpringBoot管理

```java
@Test
void contextLoads() {
    RestHighLevelClient client = new RestHighLevelClient(RestClient.builder(
        new HttpHost(
            "192.168.36.128",
            9200,
            "http"
        )
    ));
    System.out.println(client);
}
```

**SpringBoot**

编写配置文件：application.yml

> 自定义配置，需要自己手动读取数据：`@ConfigurationProperties(prefix = "elasticsearch")`(需要set方法)

```yaml
elasticsearch:
  host: 192.168.36.128
  port: 9200
```

定义配置类

```java
/**
 * @author HelloCode
 * @blog https://www.hellocode.top
 * @date 2022年12月27日 12:50
 */
@Configuration
@ConfigurationProperties(prefix = "elasticsearch")
public class ElasticSearchConfig {
    private String host;
    private int port;

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

    @Bean
    public RestHighLevelClient client(){
        return new RestHighLevelClient(RestClient.builder(
                new HttpHost(
                        host,
                        port,
                        "http"
                )
        ));
    }
}
```

```java
@SpringBootTest
class EsDemoApplicationTests {
    @Autowired
    private RestHighLevelClient client;

    @Test
    void contextLoads() {
        System.out.println(client);
    }

}
```

### 操作索引

1. 使用RestHighLevelClient获取操作索引的对象
2. 具体操作，获取返回值
3. 根据返回值判断结果

**添加索引**

```java
@Test
void addIndex() throws IOException {
    // 使用RestHighLevelClient获取操作索引的对象
    IndicesClient indices = client.indices();
	// 具体操作，获取返回值
    CreateIndexRequest createRequest = new CreateIndexRequest("hellocode");  // 指定索引名称
    CreateIndexResponse response = indices.create(createRequest, RequestOptions.DEFAULT);
    // 根据返回值判断结果
    System.out.println(response.isAcknowledged());
}
```

```java
@Test
void addIndexAndMapping() throws IOException {
    IndicesClient indices = client.indices();
    // 设置索引名
    CreateIndexRequest createRequest = new CreateIndexRequest("hellocode");
    // 设置mappings
    String mapping = "{\n" +
        "      \"properties\" : {\n" +
        "        \"address\" : {\n" +
        "          \"type\" : \"text\",\n" +
        "          \"analyzer\" : \"ik_max_word\"\n" +
        "        },\n" +
        "        \"name\" : {\n" +
        "          \"type\" : \"keyword\"\n" +
        "        }\n" +
        "      }\n" +
        "    }";
    createRequest.mapping(mapping, XContentType.JSON);
    CreateIndexResponse response = indices.create(createRequest, RequestOptions.DEFAULT);
    System.out.println(response.isAcknowledged());
}
```

**查询索引**

```java
@Test
void getIndex() throws IOException {
    IndicesClient indices = client.indices();
    GetIndexRequest getRqeust= new GetIndexRequest("hellocode");
    GetIndexResponse response = indices.get(getRqeust, RequestOptions.DEFAULT);
    Map<String, MappingMetadata> mappings = response.getMappings();
    for (String key : mappings.keySet()) {
        System.out.println(key+":"+mappings.get(key).getSourceAsMap());
    }
}

// hellocode:{properties={address={analyzer=ik_max_word, type=text}, name={type=keyword}}}
```

**删除索引**

```java
@Test
void deleteIndex() throws IOException {
    IndicesClient indices = client.indices();
    DeleteIndexRequest deleteRequest = new DeleteIndexRequest("hellocode");
    AcknowledgedResponse response = indices.delete(deleteRequest, RequestOptions.DEFAULT);
    System.out.println(response.isAcknowledged());
}
```

**判断索引是否存在**

```java
@Test
void existsIndex() throws IOException {
    IndicesClient indices = client.indices();
    GetIndexRequest getRequest = new GetIndexRequest("hellocode");
    boolean exists = indices.exists(getRequest, RequestOptions.DEFAULT);
    System.out.println(exists);
}
```

### 操作文档

**添加文档**

使用map作为数据对象

```java
@Test
void addDoc() throws IOException {
    // 数据对象 map
    Map data = new HashMap();
    data.put("name","冯榕汕");
    data.put("address","贵州省遵义市正安县土坪镇");
    // 获取操作文档的对象
    IndexRequest request = new IndexRequest("hellocode").id("6").source(data);
    // 添加数据,获取结果
    IndexResponse response = client.index(request, RequestOptions.DEFAULT);

    System.out.println(response.getId());
}
```

使用对象作为数据对象

```java
@Test
void addDoc2() throws IOException {
    // 数据对象
    Person person = new Person();
    person.setId("7");
    person.setName("侯浩晨");
    person.setAddress("新疆维吾尔自治区吐鲁番市高昌区高昌路街道");
    String data = JSON.toJSONString(person);	// fastjson

    // 获取操作文档的对象
    IndexRequest request = new IndexRequest("person").id(person.getId()).source(data,XContentType.JSON);
    // 添加数据,获取结果
    IndexResponse response = client.index(request, RequestOptions.DEFAULT);

    System.out.println(response.getId());
}
```

**修改文档**

添加文档时，id存在则修改，id不存在则添加

**根据id查询文档**

```java
@Test
void findDocById() throws IOException {
    GetRequest getRequest = new GetRequest("person","1");
    // 或者 GetRequest getRequest = new GetRequest("person").id("1");
    GetResponse response = client.get(getRequest, RequestOptions.DEFAULT);
    System.out.println(response.getSourceAsString());

    // {"name":"胡文昊","address":"湖北省荆州市石首市天鹅洲开发区"}
}
```

**删除文档**

```java
@Test
void delDoc() throws IOException {
    DeleteRequest deleteRequest = new DeleteRequest("person").id("1");
    // 或者 DeleteRequest deleteRequest = new DeleteRequest("person","1");
    DeleteResponse response = client.delete(deleteRequest, RequestOptions.DEFAULT);
    System.out.println(response.getId());
}
```

## 高级操作

### 批量操作

Bulk批量操作是将文档的增删改查一系列操作，通过一次请求全都做完。减少网络传输次数

**脚本**

语法

```shell
POST /_bulk
{"action":{"metadata"}}
{"data"}
```

示例

```shell
POST _bulk
{"delete":{"_index":"person","_id":"5"}}
{"create":{"_index":"person","_id":"6"}}
{"name":"六号","age":20,"address":"陕西"}
{"update":{"_index":"person","_id":"2"}}
{"doc":{"name":"二号"}}
```

> 不能换行，多个操作相互互不干扰

**JavaAPI**

```java
@Test
void testBulk() throws IOException {
    // 创建bulkRequest对象，整合所有操作
    BulkRequest bulkRequest = new BulkRequest();
    // 删除2号记录
    DeleteRequest deleteRequest = new DeleteRequest("person","2");
    bulkRequest.add(deleteRequest);
    // 添加1号记录
    Map data = new HashMap();
    data.put("name","阎伟");
    data.put("address","北京市市辖区顺义区牛栏山地区");
    IndexRequest indexRequest = new IndexRequest("person").id("1").source(data);
    bulkRequest.add(indexRequest);
    // 修改6号记录
    Map data2 = new HashMap();
    data2.put("name","沈洋");
    UpdateRequest updateRequest = new UpdateRequest("person","6").doc(data2);
    bulkRequest.add(updateRequest);
    BulkResponse response = client.bulk(bulkRequest, RequestOptions.DEFAULT);
    System.out.println(response.status());
}
```

### 导入数据

需求：将数据库Goods表中的数据导入到ES中

1. 创建goods索引
2. 查询Goods表数据
3. 批量添加到ES中

### 查询操作

#### matchAll

> 查询所有文档
>
> 不写from和size的话默认一次展示10条数据

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"match_all":{}
	},
	"from":0,
	"size":100
}
```

**JavaAPI**

```java
@Test
void testMatchAll() throws IOException {
    // 2.构建查询请求对象，指定查询的索引名称
    SearchRequest searchRequest = new SearchRequest("person");
    //4. 创建查询条件构建器SearchSourceBuilder
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // 6. 查询条件
    QueryBuilder query = QueryBuilders.matchAllQuery(); //查询所有文档
    // 5. 指定查询条件
    sourceBuilder.query(query);
    //3.添加查询条件构建器 SearchSourceBuilder
    searchRequest.source(sourceBuilder);
    //8. 添加分页信息
    sourceBuilder.from(0);
    sourceBuilder.size(100);
    // 1.查询，获取查询结果
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);

    // 7.命中对象
    SearchHits hits = response.getHits();
    // 7.1 获取总记录数
    System.out.println("总记录数："+hits.getTotalHits().value);
    SearchHit[] searchHits = hits.getHits();
    for (SearchHit hit : searchHits) {
        // 获取json字符串格式的数据
        System.out.println(hit.getSourceAsString());
    }
}
```

#### termQuery

> term查询：不会对查询条件进行分词

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"term":{
			"字段名称":{
				"value":"查询条件"
			}
		}
	}
}
```

**JavaAPI**

```java
@Test
void testTerm() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // 指定查询的字段和值
    QueryBuilder query = QueryBuilders.termQuery("address", "华为");
    sourceBuilder.query(query);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

#### matchQuery

- 会对查询条件进行分词
- 然后将分词后的查询条件和词条进行等值匹配
- 默认取并集（OR）

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"match":{
			"字段名称":"查询条件"
		}
	}
}
```

> 如果想要指定取交集还是并集，可以通过下面的方式

```shell
GET 索引名称/_search
{
	"query":{
		"match":{
			"字段名称":{
				"query":"查询条件",
				"operate":"操作（or或and）"
			}
		}
	}
}
```

**JavaAPI**

```java
@Test
void testMatch() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("address", "华为手机");
    // 求交集
    matchQueryBuilder.operator(Operator.AND);
    //matchQueryBuilder.operator(Operator.OR);

    sourceBuilder.query(matchQueryBuilder);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

#### 模糊查询

- wildcard查询：会对查询条件进行分词。还可以使用通配符`?`（任意单个字符）和`*`（0个或多个字符）
- regexp查询：正则查询
- prefix查询：前缀查询

**脚本**

```shell
# wildcard
GET 索引名称/_search
{
	"query":{
		"wildcard":{
			"查询字段":{
				"value":"查询条件"
			}
		}
	}
}
```

```shell
# 正则
GET 索引名称/_search
{
	"query":{
		"regexp":{
			"查询字段":"正则表达式"
		}
	}
}
```

```shell
# 前缀查询
GET 索引名称/_search
{
	"query":{
		"prefix":{
			"查询字段":"查询条件"
		}
	}
}
```

**JavaAPI**

```java
/*
* 模糊查询：Wildcard
* */
@Test
void testWildcardQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    WildcardQueryBuilder query = QueryBuilders.wildcardQuery("address","陕*");
    sourceBuilder.query(query);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

```java
/*
* 模糊查询：Regexp
* */
@Test
void testRegexpQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    RegexpQueryBuilder query = QueryBuilders.regexpQuery("address", "\\w+(.)*");
    sourceBuilder.query(query);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

```java
/*
* 模糊查询：Prefix
* */
@Test
void testPrefixQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    PrefixQueryBuilder query = QueryBuilders.prefixQuery("address", "贵");
    sourceBuilder.query(query);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

> 在使用时，使用`华*`可以，但是如果使用`*华`，就会全表搜索，效率很慢，对应的索引也会失效

#### 范围&排序查询

> range范围查询：查找指定字段在指定范围内包含值

**脚本**

```shell
# gte大于等于，也可以写gt大于，lte同理
GET 索引名称/_search
{
	"query":{
		"range":{
			"查询字段":{
				"gte":10,
				"lte":20
			}
		}
	},
	"sort":[
		{
			"字段名":{
				"order":"desc"
			}
		}
	]
}
```

**JavaAPI**

```java
@Test
void testRangeQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("goods");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // 范围查询
    RangeQueryBuilder query = QueryBuilders.rangeQuery("price");
    // 指定上限
    query.lte(3000);
    // 指定下限
    query.gte(2000);

    sourceBuilder.query(query);

    // 排序
    sourceBuilder.sort("price", SortOrder.DESC);
    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

> 排序在任何查询中都可以使用，默认asc升序

#### queryString查询

- 会对查询条件进行分词
- 然后将分词后的查询条件和词条进行等值匹配
- 默认取并集（OR）
- 可以指定多个查询字段

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"query_string":{
			"fields":["字段1","字段2",...],
			"query":"查询条件1 OR 查询条件2"
		}
	}
}
```

```shell
GET 索引名称/_search
{
	"query":{
		"simple_query_string":{
			"fields":["字段1","字段2",...],
			"query":"查询条件"
		}
	}
}
```

> simple_query_string相比查询条件不支持OR和AND

**JavaAPI**

```java
@Test
    void testQueryStringQuery() throws IOException {
        SearchRequest searchRequest = new SearchRequest("goods");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        // QueryString
        QueryStringQueryBuilder query = QueryBuilders.queryStringQuery("华为手机")
                .field("title").field("categoryName").field("brandName")
                .defaultOperator(Operator.AND);

        sourceBuilder.query(query);
        
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits searchHits = search.getHits();
        System.out.println("总记录数：" + searchHits.getTotalHits().value);
        for (SearchHit hit : searchHits.getHits()) {
            System.out.println(hit.getSourceAsString());
        }
    }
```

#### 布尔查询

> boolQuery：对多个查询条件进行连接，使用较多

- must（and）：条件必须成立
- must_not（not）：条件必须不成立
- should（or）：条件可以成立
- filter：条件必须成立，性能比must高。不会计算得分（字段匹配度）

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"bool":{
			"must":[{}],
			"filter":[{}],
			"must_not":[{}],
			"should":[{}]
		}
	}
}
```

> 条件可以不同时出现，选择需要使用的即可

**JavaAPI**

```java
@Test
void testBoolQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("goods");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // BoolQuery
    BoolQueryBuilder query = QueryBuilders.boolQuery();
    // 构建查询条件
    QueryBuilder termQuery = QueryBuilders.termQuery("brandName","华为");
    query.must(termQuery);

    QueryBuilder matchQuery = QueryBuilders.matchQuery("title","手机");
    query.filter(matchQuery);

    QueryBuilder rangeQuery = QueryBuilders.rangeQuery("price").gte(2000).lte(3000);
    query.filter(rangeQuery);

    sourceBuilder.query(query);

    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    SearchHits searchHits = search.getHits();
    System.out.println("总记录数：" + searchHits.getTotalHits().value);
    for (SearchHit hit : searchHits.getHits()) {
        System.out.println(hit.getSourceAsString());
    }
}
```

#### 聚合查询

- 指标聚合：相当于MySQL中的聚合函数：max、min、avg、sum等
- 桶聚合：相当于MySQL中的group by操作。不要对text类型的数据进行分组，会失败（text会分词）

**脚本**

```shell
# 指标聚合
GET 索引名称/_search
{
	"query":{
		"match":{
			"title":"查询条件"
		}
	},
	"aggs":{
		"查询结果名（例如max_price）":{
			"聚合函数名":{
				"field":"字段名"
			}
		}
	}
}
```

```shell
# 桶聚合
GET 索引名称/_search
{
	"query":{
		"match":{
			"字段名":"查询条件"
		}
	},
	"aggs":{
		"查询结果名（例如goods_brand）":{
			"terms":{
				"field":"字段名",
				"size":10
			}
		}
	}
}
```

**JavaAPI**

```java
@Test
void testAggQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("goods");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // 聚合查询
    MatchQueryBuilder query = QueryBuilders.matchQuery("title", "手机");

    sourceBuilder.query(query);

    // 查询品牌列表
    // 第一个参数表示自定义名称，将来用于获取数据。第二个参数是分组的字段
    AggregationBuilder agg = AggregationBuilders.terms("goods_brands").field("brandName").size(100);
    sourceBuilder.aggregation(agg);

    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    
    // 获取聚合结果
    Aggregations aggregations = search.getAggregations();
    Map<String, Aggregation> aggMap = aggregations.asMap();
    Terms goods_brands = (Terms) aggMap.get("goods_brands");
    List<? extends Terms.Bucket> buckets = goods_brands.getBuckets();
    for (Terms.Bucket bucket : buckets) {
        System.out.println(bucket.getKey());
    }
}
```

#### 高亮查询

高亮三要素

- 高亮字段
- 前缀（html标签）
- 后缀（html标签）

> 通过给高亮字段添加html标签配合css样式实现高亮

**脚本**

```shell
GET 索引名称/_search
{
	"query":{
		"match":{
			"字段名":"查询条件"
		}
	},
	"highlight":{
		"fields":{
			"字段名":{
				"pre_tags":"<标签名>",
				"post_tags":"</标签名>"
			}
		}
	}
}
```

**JavaAPI**

```java
@Test
void testHighLightQuery() throws IOException {
    SearchRequest searchRequest = new SearchRequest("person");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    // 高亮查询
    MatchQueryBuilder query = QueryBuilders.matchQuery("address", "华为");

    sourceBuilder.query(query);

    // 设置高亮
    HighlightBuilder highlighter = new HighlightBuilder();
    // 设置三要素
    highlighter.field("address").preTags("<font color='red'>").postTags("</font>");
    sourceBuilder.highlighter(highlighter);

    searchRequest.source(sourceBuilder);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    // 获取高亮结果
    SearchHits hits = search.getHits();
    for (SearchHit hit : hits) {
        Map<String, HighlightField> highlightFields = hit.getHighlightFields();
        HighlightField highlightField = highlightFields.get("address");
        Text[] fragments = highlightField.fragments();
        System.out.println(fragments[0]);
    }
}


// <font color='red'>华为</font>5G手机
```

### 索引别名&重建索引

**重建索引**

- 随着业务需求的变更，索引的结果可能发生改变
- ES的索引一旦创建，只允许添加字段，不允许改变字段。因为改变字段，需要重建倒排索引，影响内部缓存结构，性能太低
- 此时就需要重建一个新的索引，并将原有索引的数据导入到新索引中

```shell
#新建索引省略
#拷贝数据如下：
POST _reindex
{
  "source": {
    "index": "源索引"
  },
  "dest": {
    "index": "目的索引"
  }
}
```

**索引别名**

> 在重建了索引之后，代码中还用的是之前的索引名，要么改代码，要么给索引起别名（推荐）

```shell
# 1.删除原索引
# 2.给重建的索引起别名
POST 原索引名/_alias/别名
```

## 集群

### 相关概念

- 集群：多个人做一样的事
- 分布式：多个人做不一样的事

![img](http://images.hellocode.top/2220513-20220731233607272-1277340621.png)

- 集群解决的问题：让系统高可用、分担请求压力(负载均衡)
- 分布式解决的问题：分担存储和计算的压力提速、解耦

**ElasticSearch集群特点**

- elasticsearch天然支持分布式
- elasticsearch的设计隐藏了分布式本身的复杂性

**ElasticSearch集群分布式架构相关概念**

- 集群（cluster）：一组拥有共同的cluster name的节点
- 节点（node）：集群中的一个elasticsearch实例
- 索引（index）：es存储数据的地方。相当于database的概念
- *分片*（shard）：索引可以被拆分为不同的部分进行存储，称为分片。在集群环境下，一个索引的不同分片可以拆分到不同的节点中
- 主分片（primary shard）：相当于副本分片的定义
- 副本分片（replica shard）：每个主分片可以有一个或多个副本分片，数据和主分片一样

### 集群搭建

1. 修改配置文件，对需要加入集群的es配置做关联修改

```yaml
#集群名称，同一集群要配置一样
cluster.name: hellocode-es
#节点名称
node.name: hellocode-1 
#是不是有资格主节点
node.master: true
#是否存储数据
node.data: true
#最大集群节点数
node.max_local_storage_nodes: 3 
#ip地址
network.host: 0.0.0.0
#端口
http.port: 9200
#内部节点之间沟通端口
transport.tcp.port: 9700
#es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["localhost:9700","localhost:9800","localhost:9900"]
#es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举master
cluster.initial_master_nodes: ["hellocode-1", "hellocode-2","hellocode-3"] 
#数据和存储路径
path.data: /opt/data
path.logs: /opt/logs
```

2. 访问集群状态信息 http://ip:9200/_cat/health?v

![img](http://images.hellocode.top/2220513-20220731233046328-1442373888.png)

健康状况结果解释：

- cluster：集群名称
- status：集群状态
  - green：健康
  - yellow：分配了所有主分片，但至少缺少一个副本，此时集群数据仍旧完整
  - red：部分主分片不可用，可能已经丢失数据
- node.total：在线的节点总数量
- node.data：在线的数据节点的数量
- shards：存活的分片数量
- pri：存活的主分片数量
  - 正常情况下 shards的数量是pri的两倍
- relo：迁移中的分片数量
  - 正常情况为 0
- init：初始化中的分片数量 
  - 正常情况为 0
- unassign：未分配的分片
  - 正常情况为 0
- pending_tasks：准备中的任务，任务指迁移分片等
  - 正常情况为 0
- max_task_wait_time：任务最长等待时间
- active_shards_percent：正常分片百分比 
  - 正常情况为 100%

### kibana管理集群

1. 修改kibana配置文件

```shell
vim  kibana-7.8.0-linux-x86_64-cluster/config/kibana.yml
# 加入下面的配置
elasticsearch.hosts: ["http://localhost:9201","http://localhost:9202","http://localhost:9203"]
```

2. 启动

3. 访问：http://ip:5601

![img](http://images.hellocode.top/2220513-20220731233239599-267100522.png)

![img](http://images.hellocode.top/2220513-20220731233256290-595073109.png)

![img](http://images.hellocode.top/2220513-20220731233337519-2069699336.png)

### JavaAPI访问集群

```java
@Bean
public RestHighLevelClient client(){
    return new RestHighLevelClient(RestClient.builder(
        new HttpHost(
            host,
            port,
            "http"
        ),
        new HttpHost(
            host2,
            port2,
            "http"
        ),
        new HttpHost(
            host3,
            port3,
            "http"
        )
    ));
}
```

> 其他没有变化，只是在创建RestHighLevelClient的时候传递的参数是 一个就是单点架构，多个就是集群访问

### 集群原理

#### 分片

**分片配置**

- 在创建索引时，如果不指定分片配置，则默认主分片1，副本分片1。

- 在创建索引时，可以通过settings设置分片，一旦设置就不能再修改

```shell
#分片配置 
#"number_of_shards": 3, 主分片数量 
#"number_of_replicas": 1 主分片备份数量，每一个主分片有一个备份 
# 3个主分片+3个副分片=6个分片 
PUT cluster_test1 
{ 
	"settings": { 
		"number_of_shards": 3, 
		"number_of_replicas": 1 
	},
	"mappings": { 
		"properties": { 
			"name":{ 
				"type": "text" 
			} 
		} 
	} 
}
```

**分片与自平衡**

- 当节点挂掉后，挂掉的节点分片会自平衡到其他节点中

- 注意：分片数量一旦确定好，不能修改。

**索引分片推荐配置方案：**

- 每个分片推荐大小10-30GB

- 分片数量推荐 = 节点数量 * 1~3倍

思考：比如有1000GB数据，应该有多少个分片？多少个节点？

- 每个分片20GB 则可以分为40个分片

- 分片数量推荐 = 节点数量 * 1~3倍 --> 40/2=20 即20个节点

#### 路由

> 文档存入对应的分片，ES计算分片编号的过程，称为路由。

怎么知道应该存放到哪个分片中呢？

查询时，根据文档id，Elasticsearch又该去哪个分片中查询数据呢?

- 路由算法 ：shard_index = hash(id) % number_of_primary_shards（分片索引 = hash(id) % 主分片数量）

![在这里插入图片描述](http://images.hellocode.top/893797b2db6b4033b8eb3876f981b272.png)

#### 脑裂

**ElasticSearch 集群正常状态**

- 一个正常es集群中只有一个主节点（Master），主节点负责管理整个集群。如创建或删除索引，跟踪哪些节点是群集的一部分，并决定哪些分片分配给相关的节点。

- 集群的所有节点都会选择同一个节点作为主节点。

**脑裂现象**

![在这里插入图片描述](http://images.hellocode.top/02822bfbc54147d88b1d0377a5ab81d5.png)

脑裂问题的出现就是因为从节点在选择主节点上出现分歧导致一个集群出现多个主节点从而使集群分裂，使得集群处于异常状态。

**脑裂产生的原因**

1. 网络延迟

   一般es集群会在内网部署，也可能在外网部署，比如阿里云

   内网一般不会出现此问题，外网的网络出现问题的可能性大些

2. 节点负载

   主节点的角色既为master又为data

   数据访问量较大时，可能会导致Master节点停止响应（假死状态）

3. JVM内存回收:当Master节点设置的JVM内存较小时，引发JVM的大规模内存回收，造成ES进程失去响应。

**避免脑裂**

1. 网络原因：discovery.zen.ping.timeout 超时时间配置大一点。默认是3S

2. 节点负载：角色分离策略

   候选主节点配置为：

   ```shell
   node.master: true
   node.data: false
   ```

   数据节点配置为：

   ```shell
   node.master: false
   node.data: true
   ```

3. JVM内存回收：修改 config/jvm.options 文件的 -Xms 和 -Xmx 为服务器的内存一半。