---
title: "JavaWEB"
order: 8
category:
  - Java
---

# JavaWEB

## 一、企业开发简介

### 1、JavaEE规范

- JavaEE(Java Enterprise Edition)：Java企业版
- 它是由SUN公司领导、各个厂家共同制定并得到广泛认可的工业标准
- JavaEE早期叫做J2EE，但是没有继续采用其命名规则。J2EE的版本从1.0开始到1.4结束
- JavaEE规范是很多Java开发技术的总称。这些技术规范都是沿用自J2EE的。一共包括了13个技术规范。

  包括：JDBC, JNDI, EJB, RMI, IDL/CORBA, JSP, Servlet, XML, JMS, JTA, JTS, JavaMail, JAF

### 2、WEB概述

**概述**

- WEB在计算机领域中代表的是网络
- 像我们之前所用的WWW，它是World Wide Web 三个单词的缩写，称为：万维网
- 网络相关技术的出现是为了让我们在网络的世界中获取资源，这些资源的存放之处，我们把它叫做网站
- 我们通过输入网站的地址（网址），就可以访问网站中提供的资源（不区分局域网或广域网）



**资源分类**

- 静态资源
  
  网站中提供给人们展示的资源是一成不变的，也就是说不同人或者在不同时间，看到的内容都是一样的
  
  作为开发者来说，我们编写的HTML, CSS, JavaScript 都属于静态资源
  
- 动态资源
  
  网站中提供给人们展示的资源是由程序产生的，在不同的时间或者不同的人由于身份的不同，所看到的内容是不一样的
  
  作为网站开发者来说，我们编写的JSP、Servlet等都属于动态资源

### 3、系统结构

> 在之前的学习中，开发的都是Java工程。这些工程在企业中称之为项目或者产品。都是有系统架构的！

**基础结构划分**

- CS结构：（Client Server）客户端+服务器的方式（把不同的应用直接安装在客户端上）
- BS结构：（Browser Server）浏览器+服务器的方式

**技术选型划分**

- Model1模型
- Model2模型
- MVC模型
- 三层架构 + MVC模型

**部署方式划分**

- 一体化结构
- 垂直拆分结构
- 分布式结构
- 微服务结构

## 二、tomcat

### 1、服务器

- 服务器是计算机的一种，它比普通计算机运行更快、负载更高、价格更贵。服务器在网络中为其它客户机（如PC机、智能设备等）提供计算或者应用服务。服务器具有高速的CPU运算能力、长时间的可靠运行、强大的I/O外部数据吞吐能力以及更好的扩展性。

- 而我们这里所说的服务器，其实是web服务器，或者应用服务器。它本质就是一个软件，通过和硬件相结合，从而达到帮助我们来发布应用的功能，让用户通过客户机访问我们的应用。


**常用的应用服务器**

| 服务器名称  | 说明                                                |
| ----------- | --------------------------------------------------- |
| weblogic    | 实现了JavaEE规范，重量级服务器，又称为JavaEE容器    |
| websphereAS | 实现了JavaEE规范，重量级服务器                      |
| JBOSSAS     | 实现了JavaEE规范，重量级服务器，免费的              |
| Tomcat      | 实现了jsp/servlet规范，是一个轻量级服务器，开源免费 |

### 2、概述

- Tomcat是Apache软件基金会的Jakarta项目组中的一个核心项目，由Apache、Sun和其它一些公司及个人共同开发而成。由于有了Sun公司的参与和支持，最新的Servlet、JSP规范总能在Tomcat中得到体现。因为Tomcat技术先进、性能稳定，而且免费，所以深受Java爱好者的喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web应用服务器。
- Tomcat官网：https://tomcat.apache.org/
- Tomcat各个版本所需要的支持

![](http://images.hellocode.top/tomcat%E5%90%84%E4%B8%AA%E7%89%88%E6%9C%AC%E6%89%80%E9%9C%80%E8%A6%81%E7%9A%84%E6%94%AF%E6%8C%81.png)

**下载和安装**

- 下载：官网下载
- 安装：直接解压即可

**目录组成**

- bin：一些二进制可执行文件
- conf：保存配置文件的路径
- lib：Tomcat在运行过程中所需要的jar包
- logs：日志文件
- temp：临时文件
- webapps：项目发布目录（一个文件夹代表一个web应用）（ROOT代表根项目）
- work：工作目录

### 3、基本使用

1. 启动
   
   `startup.bat`：Windows下启动执行文件

   `startup.sh`：Linux下启动执行文件

   > 启动后浏览器访问:http://localhost:8080可以进入欢迎界面（Tomcat默认端口为8080）
   
2. 停止

   `shutdown.bat`：Windows下关闭执行文件

   `shutdown.sh`：Linux下关闭执行文件

3. 部署项目

   在webapps目录下创建一个文件夹

   将资源放到该文件夹中

   启动tomcat，输入正确路径

**常见问题**

1. 启动问题
   
   启动窗口一闪而过：没有配置jdk环境变量![](http://images.hellocode.top/tomcat%E4%B8%80%E9%97%AA%E8%80%8C%E8%BF%87.png)

   java.net.BindException：端口8080被占用

2. 控制台乱码问题解决

   conf-logging.properties

   修改`java.util.logging.ConsoleHandler.encoding = UTF-8`

   > Tomcat默认UTF-8，CMD命令窗口默认GBK，将UTF-8改为GBK即可解决乱码问题

**IDEA集成Tomcat**

1. 点击Run -》 Edit Configurations
2. 点击Defaults -》 Tomcat Servlet -》 Local
3. 点击Configure -》Tomcat Home -》 选择tomcat所在路径

**Linux下的安装**

1. 上传压缩包到/home路径：`put d:/apache-tomcat-9.0.58.tar.gz`
2. 解压压缩包：`tar -zxvf 压缩包名`
3. 进入bin目录下：`cd apache-tomcat-9.0.58/bin`
4. 启动tomcat服务：`./startup.sh`
5. 使用浏览器测试：浏览器打开对应Linux服务器ip地址:8080

### 4、Java WEB项目

1. 新建项目模型，选择Java Enterprise
   
   确定JDK版本、Appalication Server版本
   
2. 右键Add Framework Support...

3. 勾选Web Appalication选项

**项目组成详解**

- src：存放Java源代码
- web：存放项目相关资源（html、css、js、jsp、图片等）
- WEB-INFO：存放相关配置的（web.xml等）

**IDEA发布项目**

1. 点击Run -》 Edit Configurations

2. 点击Tomcat Server -》 Deployment
   
   Application Context是项目访问路径，/代表默认路径，多个项目中只能有一个默认路径
   
3. 点击Tomcat Server -》 Server 

   设置关联浏览器

   两个Update resources设置

   设置JDK、端口号

4. 启动Tomcat服务

5. 验证结果（浏览器）

**通过war包发布项目**

1. 在项目的web路径下打war包：`jar -cvf myweb.war .`
2. 将打好的war包剪切到tomcat的webapps路径下
3. 启动tomcat服务，自动解压war包
4. 验证结果

### 5、配置文件

**配置默认端口号**

主配置文件`server.xml`

`<Connector>`标签中，port属性代表Tomcat默认端口号(8080)

![image-20220212123024799](http://images.hellocode.top/tomcat%E7%AB%AF%E5%8F%A3%E5%8F%B7.png)

> http协议默认端口号为80，Tomcat默认端口号与其不一致，所以每次访问网站需要加上端口号
> 如果是80端口，就不需要加端口号
> 真正发布网站的时候，都需要将tomcat默认端口号改为80，这样在访问网站的时候就不需要加端口号了

**配置虚拟目录**

> 作用：可以发布任意目录下的项目

1. 编辑==server.xml== 配置文件，找到`<Host>`标签

2. 加入以下内容
   
   `<Context path="/mytest" docBase="e:/test" />`

   ![image-20220212124231399](http://images.hellocode.top/tomcat%E8%99%9A%E6%8B%9F%E7%9B%AE%E5%BD%95.png)

> `path`：访问资源的虚拟目录名称（表示在浏览器地址栏中的访问路径）
> `docBase`表示需要发布的项目的真实路径

**配置虚拟主机**

> 作用：可以指定访问路径的名称

1. 编辑==server.xml== 配置文件，找到`<Engine>`标签
2. 加入以下内容
   ![image-20220212125002395](http://images.hellocode.top/tomcat%E9%85%8D%E7%BD%AE%E8%99%9A%E6%8B%9F%E4%B8%BB%E6%9C%BA.png)

> `name`：虚拟主机名称
>
> `appBase`：项目所保存的根路径
>
> `unpackWARs`：是否自动解压war包
>
> `autoDeploy`：是否自动发布
>
> `Context`：同虚拟目录

3. 修改hosts文件
   
   绑定IP地址和对应的域名
   
   文件路径：`c:\Windows\System32\drivers\etc`
   
   ![image-20220212125816008](http://images.hellocode.top/tomcat%E7%BB%91%E5%AE%9A%E5%9F%9F%E5%90%8D.png)

## 三、HTTP协议

### 1、概述

- HTTP(Hyper Text Transfer Protocol)：超文本传输协议
- HTTP协议是基于 TCP/IP 协议的（安全）
- 超文本：比普通文本更加强大（还有图片、音频等等）
- 传输协议：客户端和服务端的通信规则（握手规则）

**组成部分**

- 请求：客户端发起请求到服务器
- 响应：服务器收到客户端的请求后发起响应给客户端

> 除了手动发起的请求外，JavaScript、CSS、图片等资源会自动发起请求

### 2、协议的请求

**请求的组成部分**

1. 请求行：请求方式 提交路径(提交参数) HTTP/版本号

2. 请求头

   | 名称              | 说明                                                   |
   | ----------------- | ------------------------------------------------------ |
   | Accept            | 客户端浏览器所支持的MIME类型                           |
   | Accept-Encoding   | 客户端浏览器所支持的压缩编码格式。最常用的就是gzip压缩 |
   | Accept-Language   | 客户端浏览器所支持的语言。一般都是zh_CN或en_US等       |
   | Referer           | 告知服务器，当前请求的来源                             |
   | Content-Type      | 请求正文所支持的MIME类型                               |
   | Content-Length    | 请求正文的长度                                         |
   | User-Agent        | 浏览器相关信息                                         |
   | Connection        | 连接的状态。Keep-Alive保持连接                         |
   | If-Modified-Since | 客户端浏览器缓存文件的最后修改时间                     |
   | Cookie            | 会话管理相关，非常的重要                               |

3. 请求空行：普通换行，用于区分请求头和请求体

4. 请求体：只有POST提交方式才有请求体，用于显示提交参数

**请求的方式**

GET
![](http://images.hellocode.top/get%E8%AF%B7%E6%B1%82%E6%96%B9%E5%BC%8F.png)

POST
![](http://images.hellocode.top/post%E8%AF%B7%E6%B1%82%E6%96%B9%E5%BC%8F.png)

> 只有POST请求方式存在请求体，GET请求方式没有请求体
> get提交的参数在请求行中，post提交的参数在请求体中

### 3、协议的响应

**响应的组成部分**

1. 响应行：请求方式 HTTP/版本号 状态码 状态描述
   
==常见状态码==
   
   | 状态码  | 说明                                 |
   | ------- | ------------------------------------ |
   | 200     | 一切OK                               |
   | 302/307 | 请求重定向，两次请求，地址栏发生变化 |
   | 304     | 请求资源未发生变化，使用缓存         |
   | 404     | 请求资源未找到                       |
| 500     | 服务器错误                           |
   
2. 响应头

   | 名称                   | 说明                                       |
   | ---------------------- | ------------------------------------------ |
   | Location               | 请求重定向的地址，常与302，307配合使用     |
   | Server                 | 服务器相关信息                             |
   | Content-Type           | 响应正文的MIME类型                         |
   | Content-Length         | 响应正文的长度                             |
   | Content-Disposition    | 告知客户端浏览器，以下载的方式打开响应正文 |
   | Refresh                | 定时刷新                                   |
   | Last-Modified          | 服务器资源的最后修改时间                   |
   | Set-Cookie             | 会话管理相关，非常的重要                   |
   | Expires:-1             | 服务器资源到客户端浏览器后的缓存时间       |
   | Catch-Control:no-catch | 不要缓存                                   |

3. 响应空行：普通换行，用于区分响应头和响应体

4. 响应体：将资源文件发送给客户端浏览器进行解析

## 四、Servlet

- Servlet是运行在Java服务器端的程序，用于接收和响应来自客户端基于HTTP协议的请求

- 是一个接口(javax.servlet.Servlet)，常用实现类：GenericServlet、HttpServlet(继承自GenericServlet)
- 所有的客户端请求都会经过service方法进行处理
- 初始化会调用init方法，销毁时会调用destroy方法

### 1、执行过程

1. 客户端浏览器向Tomcat服务器发起请求
2. Tomcat服务器解析请求地址(URL)
3. Tomcat根据地址找到对应的项目
4. 找到项目中的web.xml文件
5. 解析请求资源地址(URI)
6. 找到项目的资源(对应的Java类)
7. 执行service方法，响应给客户端浏览器

**关系视图**

![](http://images.hellocode.top/Servlet%E5%85%B3%E7%B3%BB%E8%A7%86%E5%9B%BE.png)

### 2、实现方式

1. 实现Servlet接口，实现所有的抽象方法，该方式支持最大程度的自定义
2. 继承GenericServlet抽象类，必须重写service方法，其他方法可选择重写。该方式让我们开发servlet变得简单。但是这种方式与HTTP协议无关
3. 继承HttpServlet抽象类，需要重写doGet和doPost方法。该方式表示请求和响应都需要和HTTP协议相关

### 3、生命周期

> 对象的生命周期，就是对象从出生到死亡的过程。即：出生 =》活着 =》死亡。官方说法是对象创建到销毁的过程

- 出生（`init()`）：请求第一次到达Servlet时，对象就创建出来，并且初始化成功。只出生一次，将对象放到内存中
- 活着（`service()`）：服务器提供服务的整个过程中，该对象一直存在，每次都是执行service方法
- 死亡（`destory()`）：当服务器停止时，或者服务器宕机时，对象死亡

**结论：**Servlet对象只会创建一次，销毁一次。所以Servlet对象只有一个实例。如果一个对象实例在应用中是唯一的存在，那么就称他为单例模式

### 4、线程安全问题

**结论：**一个浏览器代表一个线程，多个浏览器代表多个线程。按理说应该是每个浏览器查看的都是自己的信息。但结果浏览器中数据混乱。因此，我们可以认为Servlet是线程不安全的！

**解决：**定义类成员要谨慎。如果是共用的，并且只会在初始化时赋值，其它时间都是获取的话，那么是没问题的。如果不是共用的，或者每次使用都有可能对其赋值，那就要考虑线程安全的问题了，可以将其定义到doGet或doPost方法内或者使用同步功能即可

### 5、映射方式

具体名称的方式。访问的资源路径必须和映射配置完全相同**【常用】**

```xml
<servlet>
    <servlet-name>Demo</servlet-name>
    <servlet-class>study.servlet.Demo</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>Demo</servlet-name>
    <url-pattern>/Demo</url-pattern>
</servlet-mapping>
```

`/` 开头 + 通配符的方式。只要符合目录结构即可，不用考虑结尾是什么

```xml
<servlet>
    <servlet-name>Demo2</servlet-name>
    <servlet-class>study.servlet.Demo2</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>Demo2</servlet-name>
    <url-pattern>/Demo2/*</url-pattern>
</servlet-mapping>
```

通配符 + 固定格式结尾的方式。只要符合固定结尾格式即可，不用考虑前面的路径

```xml
<servlet>
    <servlet-name>Demo2</servlet-name>
    <servlet-class>study.servlet.Demo2</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>Demo2</servlet-name>
    <url-pattern>*.test</url-pattern>
</servlet-mapping>
```

**注意：**优先级问题。越是具体的优先级越高，越是模糊的 优先级越低。第一种 > 第二种 > 第三种



**多路径映射**

- 我们可以给一个Servlet配置多个访问映射，从而根据不同的请求路径来实现不同的功能

场景分析

- 如果访问的资源路径是/vip，商品价格打9折
- 如果访问的资源路径是/vvip，商品价格打5折
- 如果访问的资源路径是其它，商品价格不打折

采用第二种映射方式实现多路径映射(`/` + 通配符)

```java
package study.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class Demo3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取浏览器路径
        String requestURI = req.getRequestURI();
        // 分隔路径
        String path = requestURI.substring(requestURI.lastIndexOf("/"));
        // 路径判断，区分价格
        if(path.equals("/vip")){
            System.out.println("100元");
        }else if(path.equals("/vvip")){
            System.out.println("200元");
        }else System.out.println("300元");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 6、创建时机

**第一次访问时创建**

- 优势：减少对服务器内存的浪费。提高了服务器启动的效率
- 弊端：如果有一些要在应用加载时就做的初始化操作无法完成

**服务器加载时创建**

- 优势：提前创建好对象，提高了首次执行的效率。可以完成一些应用加载时要完成的初始化操作
- 弊端：对服务器内存占用较多，影响了服务器启动的效率

**修改Servlet创建时机**

- 在`<servlet>`标签中，添加`<load-on-startup>`标签

  `<load-on-startup>1</load-on-startup>`

- 正整数代表服务器加载时创建，值越小，优先级越高。负整数或不写代表第一次访问时创建

### 7、默认Servlet

默认Servlet是由服务器提供的一个Servlet。它配置在 Tomcat 的 conf 目录中的 web.xml 中
![image-20220213180659839](http://images.hellocode.top/%E9%BB%98%E8%AE%A4Servlet.png)

它的映射路径是`<url-pattern>/<url-pattern>`。我们在发送请求时，首先会在我们项目中的web.xml 中查找映射配置，找到则执行。但是当找不到对应的Servlet 路径时，就去找默认的 Servlet ，由默认Servlet 处理

所以，一切都是Servlet

## 五、ServletConfig

- ServletConfig 是Servlet 的配置参数对象，在Servlet 的规范中，允许为每一个Servlet 都提供一些 初始化的配置。所以，每个Servlet 都有一个自己的ServletConfig
- 作用：在Servlet 的初始化时，把一些配置信息（键值对的形式）传递给Servlet
- 生命周期：和Servlet 相同

### 1、配置方式

在`<servlet>`标签中，通过 `<init-param>`标签来配置。有两个子标签

- `<param-name>`：代表初始化参数的key
- `<param-value>`：代表初始化参数的value

```xml
<servlet>
    <servlet-name>servletConfigDemo</servlet-name>
    <servlet-class>study.servlet.servletConfigDemo</servlet-class>
    
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>desc</param-name>
        <param-value>This is ServletConfig</param-value>
    </init-param>
</servlet>
```

### 2、常用方法

| 返回值                | 方法名                        | 说明                     |
| --------------------- | ----------------------------- | ------------------------ |
| `String`              | getInitParameter(String name) | 根据参数名称获取参数的值 |
| `Enumeration<String>` | getInitParameterNames()       | 获取所有参数名称的枚举   |
| `String`              | getServletName()              | 获取Servlet的名称        |
| `ServletContext`      | getServletContext()           | 获取ServletContext对象   |

通过init方法，来对ServletConfig对象进行赋值

```java
private ServletConfig config;
public void init(ServletConfig config) throws ServletException{
    this.config = config;
}
```

枚举项遍历

```java
Enumeration<String> keys = config.getInitParameterNames();
while(keys.hasMoreElements()){
    String key = keys.nextElement();
    String value = config.getInitParameter(key);
    System.out.println(key + "--" + value);
}
```

```java
// ServletConfigDemo测试代码
package study.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

public class ServletConfigDemo extends HttpServlet {
    private ServletConfig config;
    // 通过init方法对config赋值，获取ServletConfig对象
    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 根据name获取value
        String encoding = config.getInitParameter("encoding");
        System.out.println("encoding:" + encoding);

        // 获取所有name并遍历
        Enumeration<String> names = config.getInitParameterNames();
        while(names.hasMoreElements()){
            String name = names.nextElement();
            String value = config.getInitParameter(name);
            System.out.println(name + "---" + value);
        }
        // 获取Servlet-name
        String sname = config.getServletName();
        System.out.println("Servlet-name：" + sname);
        // 获取ServletContext对象
        ServletContext servletContext = config.getServletContext();
        System.out.println(servletContext);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

## 六、ServletContext

- ServletContext 是应用上下文对象（应用域对象）。每一个应用中只有一个 ServletContext 对象
- 作用：可以配置和获得应用的全局初始化参数，可以实现Servlet 之间的数据共享
- 生命周期：应用一加载则创建，应用被停止则销毁

### 1、域对象

- 域对象指的是对象有作用域，也就是作用范围。域对象可以实现数据的共享。不同作用范围的域对象，共享数据的能力也不一样

- 在Servlet 规范中，一共有4个域对象。ServletContext 就是其中的一个。他也是web 应用中最大的作用域，也叫 application 域

  它可以实现整个应用之间的数据共享

**四大域对象**

| 域对象名称     | 范围     | 级别                     | 备注                                     |
| -------------- | -------- | ------------------------ | ---------------------------------------- |
| PageContext    | 页面范围 | 最小，只能在当前页面使用 | 因范围太小，开发中用的很少               |
| ServletRequest | 请求范围 | 一次请求或当前请求转发用 | 请求转发之后，再次转发时请求域丢失       |
| HttpSession    | 会话范围 | 多次请求数据共享时使用   | 多次请求共享数据，但不同的客户端不能共享 |
| ServletContext | 应用范围 | 最大，整个应用都可以使用 | 尽量少用，如果对数据有修改需要做同步处理 |

### 2、配置方式

在`<web-app>`标签中，通过`<context-param>`标签来配置。有两个子标签

- `<param-name>`：代表全局初始化参数的key
- `<param-value>`：代表全局初始化参数的value

```xml
<context-param>
	<param-name>globalencoding</param-name>
	<param-value>UTF-8</param-value>
</context-param>
<context-param>
	<param-name>globaldesc</param-name>
	<param-value>This is ServletContext</param-value>
</context-param>
```

### 3、常用方法

| 返回值 | 方法名                        | 说明                                   |
| ------ | ----------------------------- | -------------------------------------- |
| String | getInitParameter(String name) | 根据名称获取全局配置的参数             |
| String | getContextPath()              | 获取当前应用的访问虚拟目录             |
| String | getRealPath(String path)      | 根据虚拟目录获取应用部署的磁盘绝对路径 |

> `HttpServlet`类继承自`GenericServlet`类
> `GenericServlet`类中有`getServletContext`方法，可以直接获取`ServletContext`对象

| 返回值 | 方法名                                  | 说明                           |
| ------ | --------------------------------------- | ------------------------------ |
| void   | setAttribute(String name, Object value) | 向应用域对象中存储数据         |
| Object | getAttribute(String name)               | 通过名称获取应用域对象中的数据 |
| void   | removeAttribute(String name)            | 通过名称移除应用域对象中的数据 |

```java
package study.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

public class ServletContextDemo extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        Enumeration<String> names = servletContext.getInitParameterNames();
        while(names.hasMoreElements()){
            String name = names.nextElement();
            String value = servletContext.getInitParameter(name);
            System.out.println(name + "====" + value);

        }
        resp.setContentType("text/html;charset=UTF-8");
        String contextPath = servletContext.getContextPath();
        String realPath = servletContext.getRealPath(contextPath);
        PrintWriter pw = resp.getWriter();
        pw.write("虚拟目录为：" + contextPath + "<br>");
        pw.write("真实目录为：" + realPath);

        servletContext.setAttribute("use","lisi");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

## 七、注解开发

**Servlet3.0 规范**

- 我们使用的是Tomcat 9版本。JavaEE规范要求是8.对应的Servlet 版本应该是4.x 版本。但是，在企业开发中，稳定要远比追求新版本重要。所以我们会降低版本使用，用的是Servlet 3.1版本。
- 其实我们之前的操作全部是基于 Servlet 2.5版本规范的，也就是借助于配置文件的方式。后来随着软件开发逐步的演变，基于注解的配置开始流行。而Servlet 3.0版本也就开始支持注解开发了
- Servlet 3.0版本既保留了2.5版本的配置方式，同时有支持了全新的注解配置方式。它可以完全不需要 web.xml 配置文件，就能实现 Servlet 的配置，同时还有一些其他的新特性。

### 1、自动注解开发

**实现步骤**

1. 创建一个 web 项目
2. 定义一个类，继承HttpServlet
3. 重写 doGet 和 doPost方法
4. 在类上使用@WebServlet 注解并配置Servlet
5. 部署并启动项目
6. 通过浏览器测试

```java
@WebServlet("/servletDemo")
public class ServletDemo extends HttpServlet{
    
}
```

![](http://images.hellocode.top/%E6%B3%A8%E8%A7%A3%E8%AF%A6%E8%A7%A3.png)

### 2、手动创建容器

> Servlet 3.0 规范除了使用自动注解的配置方式外，还支持手动创建 Servlet 容器的方式。如果使用必须遵循其编写规范。在3.0 版本加入了一个新的接口：ServletContainerInitializer，需要重写onStartup方法

**步骤**

1. 定义一个类，继承HttpServlet

2. 重写 doGet 和 doPost方法

3. 定义一个类，实现ServletContainerInitializer接口

4. 在src 目录下创建一个META-INF的包

5. 在 META-INF 包下创建一个services 的包

6. 在 services 包下创建一个 javax.servlet.ServletContainerInitializer 的文件

7. 文件中的内容为容器实现类的全类名

8. 在容器实现类中的 onStartup 方法中完成注册 Servlet

   ```java
   public void onStartup(Set<Class<?>> set, ServletContext servletContext){
       // 1.创建ServletDemo类的对象
       ServletDemo servletDemo = new ServletDemo();
       // 2. 在ServletContext 对象中添加Servlet，并得到Servlet的动态配置对象
       ServletRegistration.Dynamic registration = servletContext.addServlet("ServletDemo", servletDemo);
       // 3. 配置Servlet
       registration.addMapping("/servletDemo");	// 映射访问资源的路径
       registration.setLoadOnStartup(1);	// 设置Servlet加载时机
   }
   ```

9. 部署并启动项目

10. 通过浏览器测试

## 八、请求对象

**请求：**获取资源。在BS架构中，就是客户端浏览器向服务端发出询问。

**请求对象：**就是在项目中用于发送请求的对象(`ServletRequest`和`HttpServletRequest`)

> ServletRequest 和 HttpServletRequest 都是接口，但是Tomcat 服务器会帮我们处理好实现类的赋值等工作，我们不需要关心这些

### 1、获取各种路径

| 返回值       | 方法名           | 说明                |
| ------------ | ---------------- | ------------------- |
| String       | getContextPath() | 获取虚拟目录名称    |
| String       | getServletPath() | 获取Servlet映射路径 |
| String       | getRemoteAddr()  | 获取访问者ip地址    |
| String       | getQueryString() | 获取请求的消息数据  |
| String       | getRequestURI()  | 获取统一资源标识符  |
| StringBuffer | getRequestURL()  | 获取统一资源定位符  |

```java
package study.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/request")
public class RequestDemo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String contextPath = req.getContextPath();
        String servletPath = req.getServletPath();
        String remoteAddr = req.getRemoteAddr();
        String queryString = req.getQueryString();
        String requestURI = req.getRequestURI();
        StringBuffer requestURL = req.getRequestURL();

        PrintWriter pw = resp.getWriter();
        pw.println("contextPath= " + contextPath);
        pw.println("servletPath= " + servletPath);
        pw.println("remoteAddr= " + remoteAddr);
        pw.println("queryString= " + queryString);
        pw.println("requestURI= " + requestURI);
        pw.println("requestURL= " + requestURL);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 2、获取请求头

| 返回值                | 方法名                  | 说明                     |
| --------------------- | ----------------------- | ------------------------ |
| `String`              | getHeader(String name)  | 根据请求头名称获取一个值 |
| `Enumeration<String>` | getHeaders(String name) | 根据请求头名称获取多个值 |
| `Enumeration<String>` | getHeaderNames()        | 获取所有请求头名称       |

```java
package study.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

@WebServlet("/request2")
public class RequestDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getHeader("host"));
        System.out.println(req.getHeader("user-agent"));
        Enumeration<String> headers = req.getHeaders("user-agent");
        while(headers.hasMoreElements()){
            String s = headers.nextElement();
            System.out.println(s);
        }
        System.out.println("===============");
        Enumeration<String> names = req.getHeaderNames();
        while(names.hasMoreElements()){
            System.out.println(names.nextElement());
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 3、获取请求参数信息

| 返回值                 | 方法名                          | 说明                 |
| ---------------------- | ------------------------------- | -------------------- |
| `String`               | getParameter(String name)       | 根据名称获取数据     |
| `String[]`             | getParameterValues(String name) | 根据名称获取所有数据 |
| `Enumeration<String>`  | getParameterNames()             | 获取所有名称         |
| `Map<String,String[]>` | getParameterMap()               | 获取所有参数的键值对 |

```java
package study.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.*;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Map;
import java.util.Set;

@WebServlet("/request3")
public class RequestDemo3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getParameter("username"));
        System.out.println("================");
        for (String hobby : req.getParameterValues("hobby")) {
            System.out.println(hobby);
        }
        System.out.println("===================");
        Enumeration<String> parameterNames = req.getParameterNames();
        while(parameterNames.hasMoreElements()){
            String name = parameterNames.nextElement();
            for (String value : req.getParameterValues(name)) {
                System.out.println(value);
            }
        }
        System.out.println("===================");
        Map<String, String[]> parameterMap = req.getParameterMap();
        for (String key : parameterMap.keySet()) {
            String[] value = parameterMap.get(key);
            System.out.println(key + " === " + value);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```



**获取请求参数并封装对象**

1. 手动封装方式
   
   成员变量名称和参数name属性值保持一致
   
2. 反射封装方式

   属性描述器：`PropertyDescriptor`(根据名称获取到对象中对应的get和set方法)

3. 工具类封装方式

   `beanutils`工具类，`populate`方法

```java
package study.servlet;

import study.servlet.bean.Student;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

/*
*   封装对象------反射方式
* */
public class RequestDemo5 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取所有数据
        Map<String, String[]> map = req.getParameterMap();
        // 封装学生对象
        Student stu = new Student();
        // 遍历集合
        for(String name : map.keySet()){
            String[] value = map.get(name);
            try {
                // 获取Student对象的属性描述器
                PropertyDescriptor pd = new PropertyDescriptor(name, stu.getClass());
                // 获取对应的set方法
                Method writeMethod = pd.getWriteMethod();
                // 执行方法
                writeMethod.invoke(stu,value);
            } catch (IntrospectionException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

```java
package study.servlet;

import org.apache.commons.beanutils.BeanUtils;
import study.servlet.bean.Student;

/*
*   封装对象------工具类方式
	需要导包：BeanUtils
* */
public class RequestDemo6 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取所有数据
        Map<String, String[]> map = req.getParameterMap();
        // 封装学生对象
        Student stu = new Student();
        try {
            BeanUtils.populate(stu, map);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 4、流对象获取请求信息

| 返回值             | 方法名           | 说明           |
| ------------------ | ---------------- | -------------- |
| BufferedReader     | getReader()      | 获取字符输入流 |
| ServletInputStream | getInputStream() | 获取字节输入流 |

> 用IO流获取请求信息时，不支持get方式，只支持post提交方式
>
> 获得到的流对象都不是自己new出来的，不需要close释放资源，会由请求对象处理并释放

```java
package study.servlet;

import org.apache.commons.beanutils.BeanUtils;
import study.servlet.bean.Student;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

/*
*   流对象获取数据
* */
@WebServlet("/request7")
public class RequestDemo7 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 字符流(必须是post请求方式)
        BufferedReader br = req.getReader();
        String line;
        while((line = br.readLine()) != null) System.out.println(line);
        
        // 字节流
        ServletInputStream is = req.getInputStream();
        byte[] arr = new byte[1024];
        int len;
        while((len = is.read(arr)) != -1){
            System.out.println(new String(arr, 0, len));
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 5、中文乱码问题

- GET方式
  
  没有乱码问题，在Tomcat 8 版本后已经解决
  
- POST方式
  
  有乱码问题，可以通过 setCharacterEncoding() 方法来解决（编码格式要和页面编码格式一致）

```java
package study.servlet;

/*
*   中文乱码问题
* */
@WebServlet("/request8")
public class RequestDemo8 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String name = req.getParameter("name");
        System.out.println(name);
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 6、请求域

- 请求域(request域)：可以在一次请求范围内进行共享数据。

- 一般用于请求转发的多个资源中共享数据


**请求对象操作共享数据方法**

| 返回值 | 方法名                                  | 说明                           |
| ------ | --------------------------------------- | ------------------------------ |
| void   | setAttribute(String name, Object value) | 向请求域对象中存储数据         |
| Object | getAttribute(String name)               | 通过名称获取请求域对象中的数据 |
| void   | removeAttribute(String name)            | 通过名称移除请求域对象中的数据 |

### 7、请求转发

> 请求转发：客户端的一次请求到达以后，发现需要借助其他 Servlet 来实现功能(浏览器请求，A发现做不了，转发给B去做)

**特点**

- 浏览器地址栏不变
- 域对象中的数据不丢失
- 负责转发的Servlet 转发前后的响应正文会丢失
- 由转发的目的地来响应客户端

| 返回值            | 方法名                                            | 说明                         |
| ----------------- | ------------------------------------------------- | ---------------------------- |
| RequestDispatcher | getRequestDispatcher(String name)                 | 获取请求调度对象             |
| void              | forward(ServletRequest req, ServletResponse resp) | 实现转发(用请求调度对象调用) |

```java
package study.servlet.request;

/*
*   请求转发
* */
@WebServlet("/request9")
public class RequestDemo9 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置共享数据
        req.setAttribute("name","张三");
        // 获取请求调度对象
        RequestDispatcher rd = req.getRequestDispatcher("/request10");
        // 请求转发
        rd.forward(req, resp);
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

```java
package study.servlet.request;

/*
*   转发目的
* */
@WebServlet("/request10")
public class RequestDemo10 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取共享数据
        System.out.println(req.getAttribute("name"));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### 8、请求包含

> 请求包含：可以合并其他Servlet 中的功能一起响应给客户端(浏览器请求，A只能做一半，另一半让B做)

**特点**

- 浏览器地址栏不变
- 域对象中的数据不丢失
- 被包含的 Servlet 响应头会丢失

| 返回值            | 方法名                                            | 说明             |
| ----------------- | ------------------------------------------------- | ---------------- |
| RequestDispatcher | getRequestDispatcher(String name)                 | 获取请求调度对象 |
| void              | include(ServletRequest req, ServletResponse resp) | 实现包含         |

```java
package study.servlet.request;

/*
*   请求包含
* */
@WebServlet("/request11")
public class RequestDemo11 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置共享数据
        req.setAttribute("name","张三");
        // 获取请求调度对象
        RequestDispatcher rd = req.getRequestDispatcher("/request10");
        // 请求转发
        rd.include(req, resp);
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

## 九、响应对象

- 响应：回馈结果。在 BS 架构中，就是服务器给客户浏览器反馈结果

- 响应对象：就是在项目中用于发送响应的对象
  
  `ServletResponse`（接口）

  `HttpServletResponse`（继承自ServletResponse，基于http协议的接口）
  
  > 和请求对象一样，不需要我们去写实现类，在Tomcat 服务器创建好，在执行 `doGet` 或者 `doPost` 方法时，服务器会把相应的实现类对象传递

### 1、常见状态码

| 状态码 | 说明                         |
| ------ | ---------------------------- |
| 200    | 成功                         |
| 302    | 重定向                       |
| 304    | 请求资源未改变，使用缓存     |
| 400    | 请求错误，常见于请求参数错误 |
| 404    | 请求资源未找到               |
| 405    | 请求方式不支持               |
| 500    | 服务器错误                   |

### 2、字节流响应消息

| 返回值              | 方法名                                    | 说明                               |
| ------------------- | ----------------------------------------- | ---------------------------------- |
| ServletOutputStream | getOutputStream()                         | 获取响应字节输出流对象             |
| void                | setContentType("text/html;charset=UTF-8") | 设置响应内容类型，解决中文乱码问题 |

**步骤：**

1. 获取字节输出流对象
2. 定义一个消息（一个字符串）
3. 通过字节流对象输出

> 获取到的字节输出流对象不需要close释放，会由响应对象处理并释放

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取字节输出流
    ServletOutputStream os = resp.getOutputStream();
    String s = "字节输出流响应消息";
    os.write(s.getBytes());
}
```

> **未出现乱码问题**：浏览器默认gbk编码，idea默认UTF-8编码；但是`getBytes`方法在将字符串转为字节数组时，如果不传递参数指定编码，就会根据当前系统平台默认编码进行转换，Windows系统默认编码为gbk，和浏览器一致，故未出现乱码

```java
// 统一编码格式为UTF-8并解决乱码问题
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 设置相应内容类型，并设置编码格式（告知浏览器应该采用的编码格式）
    resp.setContentType("text/html;charset=UTF-8");
    // 获取字节输出流
    ServletOutputStream os = resp.getOutputStream();
    String s = "字节输出流响应消息";
    os.write(s.getBytes("UTF-8"));
}
```

### 3、字符流响应消息

| 返回值      | 方法名                                    | 说明                               |
| ----------- | ----------------------------------------- | ---------------------------------- |
| PrintWriter | getWriter()                               | 获取响应字符输出流对象             |
| void        | setContentType("text/html;charset=UTF-8") | 设置响应内容类型，解决中文乱码问题 |

> 步骤和上面字节流一样，同样不需要自己close释放资源

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	// 设置相应内容类型，并设置编码格式（告知浏览器应该采用的编码格式）
	resp.setContentType("text/html;charset=UTF-8");
	// 获取字符输出流对象
	PrintWriter pw = resp.getWriter();
	pw.write("字符输出流响应消息");
}
```

### 4、响应图片

1. 通过文件的相对路径获取绝对路径(getRealPath)
2. 创建字节输入流对象，关联读取的图片路径
3. 通过响应对象获取字节输出流对象
4. 循环读取和写出图片

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    String realPath = getServletContext().getRealPath("/img/tx.png");
    // 创建字节输入流对象，关联图片
    BufferedInputStream is = new BufferedInputStream(new FileInputStream(realPath));
    // 获取字节输出流对象，响应图片
    ServletOutputStream os = resp.getOutputStream();
    // 循环读写
    byte[] arr = new byte[1024];
    int len;
    while((len = is.read(arr)) != -1){
        os.write(arr, 0, len);
    }
    // 释放资源
    is.close();
}
```

### 5、设置缓存

> 缓存：对于不经常变化的数据，我们可以设置合理的缓存时间，以避免浏览器频繁请求服务器。以此来提高效率

| 返回值 | 方法名                               | 说明               |
| ------ | ------------------------------------ | ------------------ |
| void   | setDateHeader(String name,long time) | 设置消息头添加缓存 |

例：`resp.setDateHeader("Expires",System.currentTimeMillis() + 1*60*60*1000);` ：设置一个小时缓存时间

- Expires 就是过期的意思
- 时间单位为毫秒，1秒等于1000毫秒

### 6、定时刷新

> 定时刷新：过了指定时间后，页面自动进行跳转

| 返回值 | 方法名                              | 说明               |
| ------ | ----------------------------------- | ------------------ |
| void   | setHeader(String name,String value) | 设置消息头定时刷新 |

- 例：`resp.setHeader("Refresh","3;URL=要跳转的路径")`

- 单位为秒

### 7、请求重定向

> 请求重定向：客户端的一次请求到达后，发现需要借助其他Servlet 来实现功能

- 特点：浏览器地址栏会发生改变，两次请求，请求域对象中不能共享数据，可以重定向到其他服务器


**重定向实现原理**

1. 设置响应状态码为302：`resp.setStatus(302);`

2. 设置响应的资源路径(响应到哪里去，通过响应消息头 location 来指定)：

   `resp.setHeader("location","/response/responseDemo")`

**响应对象重定向方法**

| 返回值 | 方法名                    | 说明       |
| ------ | ------------------------- | ---------- |
| void   | sendRedirect(String name) | 设置重定向 |

### 8、文件下载

1. 创建字节输入流，关联读取的文件

2. 设置响应消息头支持的类型：`resp.setHeader("Content-Type","application/octet-stream")`
   
   Content-Type：消息头名称，代表所支持的类型
   
   application/octet-stream：消息头参数，代表应用的类型为字节流
   
3. 设置响应消息头以下载方式打开资源：`resp.setHeader("Content-Disposition","attachment;filename=下载的文件名称")`

   Content-Disposition：消息头名称，代表处理形式

   attachment;filename=xxx：消息头参数，代表附件的形式进行处理，filename代表指定下载文件的名称

4. 通过响应对象获取字节输出流对象

5. 循环读写

6. 释放资源

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 创建字节输入流，关联读取的文件
    String realPath = req.getServletContext().getRealPath("/img/tx.png");
    BufferedInputStream bis = new BufferedInputStream(new FileInputStream(realPath));
    // 设置响应消息头支持的类型
    resp.setHeader("Content-Type", "application/octet-stream");
    // 设置响应消息头以下载方式打开资源
    resp.setHeader("Content-Disposition","attachment;filename=file.png");
    // 通过响应对象获取字节输出流对象
    ServletOutputStream os = resp.getOutputStream();
    int len;
    byte[] arr = new byte[1024];
    while((len = bis.read(arr)) != -1){
        os.write(arr, 0, len);
    }
    // 释放资源
    bis.close();
}
```

## 十、Cookie

### 1、会话

- 会话：浏览器和服务器之间的多次请求和响应
- 为了实现一些功能，浏览器和服务器之间可能会产生多次的请求和响应，从浏览器访问服务器开始，到访问服务器结束（关闭浏览器、到了过期时间）。这期间产生的多次请求和响应加在一起就称之为浏览器和服务器之间的一次会话
- 会话过程所产生的一些数据，可以通过会话技术(Cookie 和 Session)保存。

### 2、概述

**Cookie：**客户端会话管理技术

- 把要共享的数据保存到客户端
- 每次请求时，把会话信息带到服务器端，从而实现多次请求的数据共享

**作用**：可以保存客户端访问网站的相关内容，从而保证每次访问时先从本地缓存中获取，以此提高效率

**特点**

- 是一个普通的Java类
- 两个必须属性：name 和value
- 每个网站最多20个Cookie，浏览器存储的Cookie总数不大于300个，每个Cookie大小限制在4kb

### 3、Cookie属性

| 属性名  | 作用                   | 是否重要 |
| ------- | ---------------------- | -------- |
| name    | Cookie的名称           | 必须属性 |
| value   | Cookie的值(不支持中文) | 必须属性 |
| path    | Cookie的路径           | 重要     |
| domain  | Cookie的域名           | 重要     |
| maxAge  | Cookie的存活时间(s)    | 重要     |
| version | Cookie的版本号         | 不重要   |
| comment | Cookie的描述           | 不重要   |

### 4、方法

| 方法名                            | 作用                                     |
| --------------------------------- | ---------------------------------------- |
| Cookie(String name, String value) | 构造方法创建对象                         |
| 属性对应的set和get方法            | 赋值和获取值(name有final修饰，无set方法) |

- 向客户端添加Cookie：`void HttpServletResponse.addCookie(Cookie cookie)`
- 获取所有的Cookie：`Cookie[] HttpServletRequest.getCookies()`

### 5、练习

- 需求说明：通过Cookie记录最后访问时间，并在浏览器上显示出来
- 最终目的：掌握Cookie的基本使用，从创建到添加客户端，再到从服务器端获取

**实现步骤**

1. 通过响应对象写出一个提示信息
2. 创建Cookie对象，指定name和value
3. 设置Cookie最大存活时间
4. 通过响应对象将Cookie对象添加到客户端
5. 通过请求对象获取Cookie对象
6. 将Cookie对象中的访问时间写出

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 通过响应对象写出一个提示信息
    resp.setContentType("text/html;charset=UTF-8");
    PrintWriter pw = resp.getWriter();
    pw.write("您的最后访问时间为：");
    pw.write("<br>");
    // 创建Cookie对象，指定name和value
    Cookie cookie = new Cookie("time", System.currentTimeMillis()+"");
    // 设置Cookie最大存活时间
    cookie.setMaxAge(3600);
    // 通过响应对象将Cookie对象添加到客户端
    resp.addCookie(cookie);
    // 通过请求对象获取Cookie对象
    Cookie[] cookies = req.getCookies();
    // 将Cookie对象中的访问时间写出
    for(Cookie ck : cookies){
        if("time".equals(ck.getName())){
            String value = ck.getValue();
            // 格式化时间
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String lastTime = sdf.format(new Date(Long.parseLong(value)));
            pw.write(lastTime);
        }
    }
}
```

### 6、注意事项

**数量限制**
每个网站最多只能用20个Cookie，且大小不能超过4kb，所有网站的Cookie总数不超过300个

**名称限制**

- Cookie的名称只能包含ASCII码表中的字母、数字字符。不能包含逗号、分号、空格，不能以$开头。
- Cookie的值不支持中文

**存活时间限制**：`setMaxAge()`方法接收数字

- 负整数：当前会话有效，浏览器关闭则清除（默认）
- 0：立即清除
- 正整数：以秒为单位设置存活时间

**访问路径限制**

- 取自第一次访问的资源路径前缀
- 只要以这个前缀开头（包括子级路径）就能获取到，反之获取不到
- 设置路径：`setPath()`方法设置指定路径

## 十一、Session

HttpSession：服务器端会话管理技术

- 本质也是采用客户端会话管理技术
- 只不过在客户端保存的是一个特殊标识，而共享的数据保存到了服务器端的内存对象中。
- 每次请求时，会将特殊标识带到服务器端，根据这个标识来找到对应的内存空间，从而实现数据共享
- 是Servlet规范中四大域对象之一的会话域对象

作用：可以实现数据共享

| 域对象         | 功能   | 作用                                   |
| -------------- | ------ | -------------------------------------- |
| ServletContext | 应用域 | 在整个应用之间实现数据共享             |
| ServletRequest | 请求域 | 在当前的请求或请求转发之间实现数据共享 |
| HttpSession    | 会话域 | 在当前会话范围之间实现数据共享         |

### 1、常用方法

| 返回值 | 方法名                                  | 说明              |
| ------ | --------------------------------------- | ----------------- |
| void   | setAttribute(String name, Object value) | 设置共享数据      |
| Object | getAttribute(String name)               | 获取共享数据      |
| void   | removeAttribute(String name)            | 移除共享数据      |
| String | getId()                                 | 获取唯一标识名称  |
| void   | Invalidate()                            | 让session立即失效 |

### 2、对象获取

HttpSession 是一个接口，对应的实现类对象是通过HttpServletRequest 对象来获取

| 返回值      | 方法名                     | 说明                                                  |
| ----------- | -------------------------- | ----------------------------------------------------- |
| HttpSession | getSession()               | 获取HttpSession对象                                   |
| HttpSession | getSession(boolean create) | 获取HttpSession对象，未获取到是否自动创建（默认true） |

### 3、练习

- 需求说明：通过第一个Servlet 设置共享数据用户名，并在第二个Servlet 获取到
- 最终目的：掌握HttpSession 的基本使用，如何获取和使用

**实现步骤**

1. 在第一个 Servlet 中获取请求的用户名
2. 获取 HttpSession 对象
3. 将用户名设置到共享数据中
4. 在第二个 Servlet 中获取 HttpSession 对象
5. 获取共享数据用户名
6. 将获取到的用户名响应给客户端浏览器

```java
// Session01
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 在第一个 Servlet 中获取请求的用户名
    String username = req.getParameter("username");
    // 获取 HttpSession 对象
    HttpSession session = req.getSession();
    // 将用户名设置到共享数据中
    session.setAttribute("username",username);
}
```

```java
// session02
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 在第二个 Servlet 中获取 HttpSession 对象
    HttpSession session = req.getSession();
    // 获取共享数据用户名
    Object username = session.getAttribute("username");
    // 将获取到的用户名响应给客户端浏览器
    PrintWriter pw = resp.getWriter();
    pw.write(username+"");
}
```

### 4、注意事项

- 唯一标识的查看：借助浏览器开发者工具（JSESSIONID）

- 浏览器禁用Cookie
  
  方式一：通过提示信息告知用户，大部分网站采用的解决方式【推荐】

  方式二：通过`resp.enconeURL`方法实现url重写（地址栏拼接jsessionid）【了解】

**钝化和活化**

- 钝化：序列化。把长时间不用，但还不到过期时间的HttpSession进行序列化，写到磁盘上

- 活化：相反的状态

- 钝化时间
  
  第一种情况：当访问量很大时，服务器会根据getLastAccessTime 来进行排序，对长时间不用，但还没到过期时间的HttpSession进行序列化
  
  第二种情况：当服务器进行重启的时候，为了保持客户HttpSession 中的数据，也要对其进行序列化

> HttpSession 的序列化由服务器自动完成，我们无需关心

## 十二、JSP

> 目前JSP用的已经不多了，这部分内容建议了解就行了，不必过分的深究

- JSP(Java Server Pages)：是一种动态网页技术标准
- JSP 部署在服务器上，可以处理客户端发送的请求，并根据请求内容动态的生成 HTML、XML 或其他格式文档的 Web网页，然后再响应给客户端。
- Jsp 是基于Java 语言的，它的本质就是 Servlet

| 类别       | 使用场景                               |
| ---------- | -------------------------------------- |
| HTML       | 开发静态资源，无法添加动态资源         |
| CSS        | 美化页面                               |
| JavaScript | 给网页添加一些动态效果                 |
| Servlet    | 编写Java 代码，实现后台功能处理        |
| JSP        | 包含了显示页面技术，也具备Java代码功能 |

### 1、快速入门

1. 创建一个web项目
2. 在web 目录下创建一个 index.jsp 文件
3. 在文件中写一句内容为：这是我的第一个jsp
4. 部署并启动项目
5. 通过浏览器测试

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        第一个jsp
    </body>
</html>
```

### 2、执行过程

1. 客户端浏览器发送请求到Tomcat 服务器
2. Tomcat 服务器解析请求地址
3. 找到具体的应用
4. 找到对应的jsp文件
5. 将jsp文件翻译为.java的文件
6. 编译Java文件
7. 响应给客户端

**文件内容介绍**

生成的Java 文件目录

- 继承自 HttpJspBase类，而HttpJspBase继承自 HttpServlet(==JSP本质上就是一个 Servlet==)
- jsp显示页面本质上就是通过获取输出流对象并通过write写出

### 3、语法

- JSP注释：`<%-- 注释的内容 --%>`
- Java代码块：`<% Java代码 %>`
- JSP表达式：`<%=表达式%>`
- JSP声明：`<%! 声明变量或方法 %>`

**说明**

- `System.out.println()`：普通输出语句，输出在控制台上
- `out.println()`：JspWriter 对象，将内容输出在浏览器页面上，不会自动换行
- `<%="要输出的内容"%>`就相当于`out.println("要输出的内容")`
- 在声明中，如果加`!`，代表声明的是成员变量；如果不加`!`，代表声明的是局部变量；如果是声明方法，就必须加`!`

### 4、指令

**page 指令**：`<%@ page 属性名=属性值 属性名=属性值... %>`

| 属性名       | 作用                                                         |
| ------------ | ------------------------------------------------------------ |
| contentType  | 响应正文支持的类型和设置编码格式                             |
| language     | 使用的语言，默认是Java                                       |
| errorPage    | 当前页面出现异常后跳转的页面                                 |
| isErrorPage  | 是否抓住异常，如果为true则页面中就可以使用异常对象，默认是false |
| import       | 导包 import= "java.util.ArrayList"                           |
| session      | 是否创建 HttpSession 对象，默认是true                        |
| buffer       | 设定 JspWriter 输出jsp内容缓存的大小，默认8kb                |
| pageEncoding | 翻译jsp时所用的编码格式                                      |
| isEIgnored   | 是否忽略EL表达式，默认是false                                |

**include 指令**：可以包含其他页面

- `<%@ include file=包含的页面 %>`

**taglib 指令**：可以引入外部标签库

- `<%@ taglib uri=标签库的地址 prefix=前缀名称 %>`

### 5、注意事项

**九大隐式对象**（不用创建，可以直接使用）

| 隐式对象名称 | 代表实际对象                           |
| ------------ | -------------------------------------- |
| request      | javax.servlet.http.HttpServletRequest  |
| response     | javax.servlet.http.HttpServletResponse |
| session      | javax.servlet.http.HttpSession         |
| application  | javax.servlet.ServletContext           |
| page         | java.lang.Object                       |
| config       | javax.servlet.ServletConfig            |
| exception    | java.lang.Throwable                    |
| out          | javax.servlet.jsp.JspWriter            |
| pageContext  | javax.servlet.jsp.PageContext          |

**PageContext 对象**

- 是 JSP 独有的， Servlet 中没有
- 是四大域对象之一的页面域对象，还可以操作其他三个域对象中的属性
- 还可以获取其他八个隐式对象
- 生命周期是随着 JSP 的创建而存在，随着 JSP 的结束而消失。每个JSP 页面都有一个 PageContext 对象

**四大域对象**

| 域对象名称     | 范围     | 级别                     | 备注                                     |
| -------------- | -------- | ------------------------ | ---------------------------------------- |
| PageContext    | 页面范围 | 最小，只能在当前页面使用 | 因范围太小，开发中用的很少               |
| ServletRequest | 请求范围 | 一次请求或当前请求转发用 | 请求转发之后，再次转发时请求域丢失       |
| HttpSession    | 会话范围 | 多次请求数据共享时使用   | 多次请求共享数据，但不同的客户端不能共享 |
| ServletContext | 应用范围 | 最大，整个应用都可以使用 | 尽量少用，如果对数据有修改需要做同步处理 |

### 6、MVC模型

- M(Model)：模型。用于封装数据，封装的是数据模型
- V(View)：视图。用于显示数据，动态资源用 JSP页面，静态资源用 HTML 页面
- C(Controller)：控制器。用于处理请求和响应，例如 Servlet

![](http://images.hellocode.top/MVC.png)

### 7、EL表达式

- EL(Expression Language)：表达式语言
- 在 JSP 2.0 规范中加入的内容，也是 Servlet 规范的一部分
- 作用：在 JSP 页面中获取数据，让我们的 JSP 脱离 Java代码块和 JSP 表达式
- 语法：`${表达式内容}`

#### 7.1. 快速入门

1. 创建一个web 项目
2. 在web 目录下创建 jsp文件
3. 在文件中向域对象添加数据
4. 使用三种方式获取域对象中的数据(Java代码块、JSP表达式、EL表达式)
5. 部署并启动项目
6. 通过浏览器测试

```jsp
<%--
    Created by IntelliJ IDEA.
    User: lihao
        Date: 2022/2/25
            Time: 10:04
                To change this template use File | Settings | File Templates.
                --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>EL表达式快速入门</title>
    </head>
    <body>
        <% request.setAttribute("username","zhangsan"); %>

        <%--java代码块--%>
        <% out.println(request.getAttribute("username")); %><br>
        <%-- jsp表达式 --%>
        <%=request.getAttribute("username")%><br>
        <%--EL表达式--%>
        ${username}
    </body>
</html>
```

#### 7.2. 获取数据

1. 获取基本数据类型的数据

   `${数据名}`

2. 获取自定义对象类型的数据

   `${对象名.属性名}`

   这里获取到对象的成员变量的原理是通过调用get方法获取，所以不必担心private私有问题

3. 获取数组类型的数据

   `${数组名[索引]}`

4. 获取List 集合类型的数据

   `${集合[索引]}`

5. 获取 Map 集合类型的数据

   `${集合.key值}`：获取key对应的value

```jsp
<%@ page import="study.servlet.bean.Student" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %><%--
    Created by IntelliJ IDEA.
    User: lihao
        Date: 2022/2/25
            Time: 10:10
                To change this template use File | Settings | File Templates.
                --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>EL表达式获取数据</title>
    </head>
    <body>
        <%
        Student stu = new Student("张三",23);
        int[] arr = {1,2,3,4,5};
        ArrayList<String> list = new ArrayList<>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");
        HashMap<String,String> map = new HashMap<>();
        map.put("user","zhangsan");
        map.put("age","28");
        pageContext.setAttribute("stu",stu);
        pageContext.setAttribute("arr",arr);
        pageContext.setAttribute("list",list);
        pageContext.setAttribute("map",map);
        %>
        <%--EL表达式获取数据--%>
        ${stu.name}<br>     <%--获取自定义对象类型的数据--%>
        ${arr[2]}<br>       <%--获取数组类型的数据--%>
        ${list[1]}<br>      <%--获取List 集合类型的数据--%>
        ${map.user}         <%--获取 Map 集合类型的数据--%>
    </body>
</html>
```

#### 7.3. 注意事项

- EL 表达式没有空指针异常
- EL 表达式没有索引越界异常
- EL 表达式没有字符串的拼接

**使用细节**

- EL 表达式能够获取到四大域对象的数据，根据名称从小到大在域对象中查找
- 还可以获取 JSP 其他八个隐式对象，并调用对象中的方法

#### 7.4. 运算符

**关系运算符**

| 运算符   | 作用     | 示例                       | 结果  |
| -------- | -------- | -------------------------- | ----- |
| == 或 eq | 等于     | `${5 == 5}` 或 `${5 eq 5}` | true  |
| != 或 ne | 不等于   | `${5 != 5}` 或 `${5 ne 5}` | false |
| < 或 lt  | 小于     | `${3 < 5}` 或 `${3 lt 5}`  | true  |
| > 或 gt  | 大于     | `${3 > 5}` 或 `${3 gt 5}`  | false |
| <= 或 le | 小于等于 | `${3 <= 5}` 或 `${3 le 5}` | true  |
| >= 或 ge | 大于等于 | `${3 >= 5}` 或 `${3 ge 5}` | false |

**逻辑运算符**

| 运算符     | 作用 | 示例                        | 结果         |
| ---------- | ---- | --------------------------- | ------------ |
| && 或 and  | 并且 | `${A && B}` 或 `${A and B}` | true / false |
| `||` 或 or | 或者 | `${A || B}` 或 `${A or B}`  | true / false |
| ! 或 not   | 取反 | `${!A}` 或 `${not A}`       | true / false |

**其他运算符**

| 运算符                   | 作用                                                         |
| ------------------------ | ------------------------------------------------------------ |
| empty                    | 1. 判断对象是否为null<br />2. 判断字符串是否为空字符串<br />3. 判断容器元素是否为0 |
| 条件 ? 表达式1 : 表达式2 | 三元运算符                                                   |

#### 7.5. 隐式对象

| 隐式对象名称     | 对应JSP隐式对象 | 说明                     |
| ---------------- | --------------- | ------------------------ |
| pageContext      | pageContext     | 功能完全相同             |
| applicationScope | 无              | 操作应用域对象数据       |
| sessionScope     | 无              | 操作会话域对象数据       |
| requestScope     | 无              | 操作请求域对象数据       |
| pageScope        | 无              | 操作页面域对象数据       |
| header           | 无              | 获取请求头数据           |
| headerValues     | 无              | 获取请求头数据(多个值)   |
| param            | 无              | 获取请求参数数据         |
| paramValues      | 无              | 获取请求参数数据(多个值) |
| initParam        | 无              | 获取全局配置参数数据     |
| cookie           | 无              | 获取Cookie对象           |

```jsp
<%--
    Created by IntelliJ IDEA.
    User: lihao
        Date: 2022/2/25
            Time: 10:21
                To change this template use File | Settings | File Templates.
                --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>隐式对象</title>
    </head>
    <body>
        <%--pageContext对象，可以获取其他三个域对象和JSP中八个隐式对象--%>
        ${pageContext.request.requestURL}<br>

        <%--applicationScope sessionScope requestScope pageScope 操作四大域对象中的数据--%>
        ${pageContext.setAttribute("username","zhangsan")}
        ${pageScope.username}<br>

        <%--header headerValues 获取请求头数据--%>
        ${header["connection"]}
        ${headerValues["connection"][0]}
        ${header.connection}<br>

        <%--param paramValues 获取请求参数数据--%>
        ${param.username}
        ${paramValues.hobby[0]}<br>

        <%--initParam 获取全局配置参数--%>
        ${initParam.globaldesc}<br>

        <%--cookie 获取cookie信息--%>
        ${cookie}   <%--直接写cookie获取到的是一个map集合--%>
        <br>
        ${cookie.JSESSIONID.value}
    </body>
</html>
```

### 8、JSTL

- JSTL(Java Server Pages Standarded Tag Library)：JSP 标准标签库
- 主要提供给开发人员一个标准通用的标签库
- 开发人员可以利用这些标签来取代 JSP 页面上的Java代码，从而提高程序的可读性，降低程序的维护难度

| 组成      | 作用       | 说明                    |
| --------- | ---------- | ----------------------- |
| core      | 核心标签库 | 通用的逻辑处理          |
| fmt       | 国际化     | 不同地域显示不同语言    |
| functions | EL 函数    | EL 表达式可以使用的方法 |
| sql       | 操作数据库 | 了解                    |
| xml       | 操作XML    | 了解                    |

**核心标签**

| 标签名称                                                     | 功能分类 | 属性       | 作用           |
| ------------------------------------------------------------ | -------- | ---------- | -------------- |
| \<标签名:if\>                                                | 流程控制 | 核心标签库 | 用于条件判断   |
| \<标签名:choose\><br />\<标签名:when><br />\<标签名:otherwise\> | 流程控制 | 核心标签库 | 用于多条件判断 |
| \<标签名:forEach>                                            | 迭代遍历 | 核心标签库 | 用于循环遍历   |

**使用步骤**

1. 创建一个 web 项目
2. 在 web目录下创建一个 WEB-INF 目录
3. 在 WEB-INF 目录下创建一个 libs 目录，将 JSTL 的 jar 包导入
4. 创建 JSP 文件，通过 taglib 导入 JSTL 标签库
5. 对流程控制和迭代遍历的标签进行使用
6. 部署并启动项目
7. 通过浏览器查看

```jsp
<%@ page import="java.util.ArrayList" %><%--
    Created by IntelliJ IDEA.
    User: lihao
        Date: 2022/2/25
            Time: 10:45
                To change this template use File | Settings | File Templates.
                --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--导入核心库并起标签名--%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<html>
    <head>
        <title>JSTL【JSP标准标签库】</title>
    </head>
    <body>
        ${pageContext.setAttribute("score","A")}

        <%--对成绩进行判断--%>
        <c:if test="${score eq 'A'}">
            优秀
        </c:if>
        <hr>

        <%--多条件判断--%>
        <c:choose>
            <c:when test="${score eq 'A'}">优秀</c:when>
            <c:when test="${score eq 'B'}">良好</c:when>
            <c:when test="${score eq 'C'}">及格</c:when>
            <c:when test="${score eq 'D'}">较差</c:when>
            <c:otherwise>成绩非法</c:otherwise>
        </c:choose>
        <hr>

        <%--循环遍历--%>
        <%
        ArrayList<String> list = new ArrayList<>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");
        list.add("ddd");
        pageContext.setAttribute("list",list);
        %>
        <c:forEach items="${list}" var="str">
            ${str}<br>
        </c:forEach>
    </body>
</html>
```

## 十三、Filter

- 在程序中访问服务器资源时，当一个请求到来，服务器首先判断是否有过滤器与请求资源相关联，如果有，过滤器可以将请求拦截下来，完成一些特定的功能，再由过滤器决定是否交给请求资源。如果没有相关联的过滤器则像之前那样直接请求资源了。响应也是类似的
- 过滤器一般完成用于通用的操作，例如：登录验证、统一编码处理、敏感字符过滤等等......

### 1、概述

> 是一个接口。如果想实现过滤器的功能，必须实现该接口

**核心方法**

| 返回值 | 方法名                                                       | 作用                     |
| ------ | ------------------------------------------------------------ | ------------------------ |
| void   | init(FilterConfig config)                                    | 初始化方法               |
| void   | doFilter(ServletRequest request, ServletResponse response, FilterChain chain) | 对请求资源和响应资源过滤 |
| void   | destroy()                                                    | 销毁方法                 |

**配置方式**

- 方式一：配置文件（web.xml）
- 方式二：注解方式

### 2、FilterChain

- FilterChain 是一个接口，代表过滤器链对象。由Servlet 容器提供实现类对象。直接使用即可

- 过滤器可以定义多个，就会组成过滤器链


**核心方法**

| 返回值 | 方法名                                                     | 说明     |
| ------ | ---------------------------------------------------------- | -------- |
| void   | doFilter(ServletRequest request, ServletResponse response) | 放行方法 |

> 如果有多个过滤器，在第一个过滤器中调用下一个过滤器，依此类推。直到到达最终访问资源
>
> 如果只有一个过滤器，放行时，就会直接到达最终访问资源

### 3、过滤器使用

需求说明：通过 Filter 过滤器解决多个资源写出中文乱码的问题

**实现步骤**

1. 创建一个 web 项目
2. 创建两个 Servlet 功能类，都向客户端写出中文数据
3. 创建一个 Filter 过滤器实现类，重写 doFilter 核心方法
4. 在方法内解决中文乱码，并放行
5. 部署并启动项目
6. 通过浏览器测试

```java
package study.servlet.filter;


import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
@WebFilter("/filter01")
public class filter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("filter执行了");
        // 处理乱码
        servletResponse.setContentType("text/html;charset=UTF-8");
        // 放行
        filterChain.doFilter(servletRequest,servletResponse);
    }
    @Override
    public void destroy() {}
}
```

### 4、使用细节

**配置方式**

- 注解方式：`@WebFilter(拦截路径)`
- 配置文件方式

```xml
<!--声明-->
<filter>
	<filter-name>demo</filter-name>
    <filter-class>全类名</filter-class>
</filter>
<!--映射-->
<filter-mapping>
	<filter-name>demo</filter-name>
    <url-pattern>/拦截路径</url-pattern>
</filter-mapping>
```

**多个过滤器使用顺序**

如果有多个过滤器，取决于过滤器映射的顺序

### 5、生命周期

- 创建
  
  当应用加载时实例化对象并执行init初始化方法
  
- 服务
  
  对象提供服务的过程，执行 doFilter 方法
  
- 销毁
  
  当应用卸载时或服务器停止时对象销毁。执行 destroy 方法

### 6、FilterConfig

> FilterConfig 是一个接口。代表过滤器的配置对象，可以加载一些初始化参数

**核心方法**

| 返回值                 | 方法名                        | 作用               |
| ---------------------- | ----------------------------- | ------------------ |
| `String`               | getFilterName()               | 获取过滤器对象名称 |
| `String`               | getInitParameter(String name) | 根据name获取 value |
| `Enumeration\<String>` | getInitParameterNames()       | 获取所有参数的key  |
| `ServletContext`       | getServletContext()           | 获取应用上下文对象 |

```xml
<filter>
    <filter-name>demo</filter-name>
    <filter-class>全类名</filter-class>
    
    <init-param>
        <param-name>username</param-name>
        <param-value>zhangsan</param-value>
    </init-param>
</filter>
```

### 7、五种拦截行为

> Filter 过滤器默认拦截的是请求，但是在实际开发中，我们还有请求转发和请求包含，以及由服务器触发调用的全局错误页面。默认情况下过滤器是不参与过滤的，要想使用，就需要我们配置

**拦截方式**

```xml
<!--声明-->
<filter>
	<filter-name>demo</filter-name>
    <filter-class>全类名</filter-class>
</filter>
<!--映射-->
<filter-mapping>
	<filter-name>demo</filter-name>
    <url-pattern>/拦截路径</url-pattern>
    
    <dispatcher>REQUEST</dispatcher>
    <dispatcher>FORWARD</dispatcher>
    <dispatcher>INCLUDE</dispatcher>
    <dispatcher>ERROR</dispatcher>
    <dispatcher>ASYNC</dispatcher>
</filter-mapping>
```

- REQUEST：默认值，浏览器直接请求的资源会被过滤器拦截

- FORWARD：转发访问资源会被过滤器拦截

- INCLUDE：包含访问资源

- ERROR：全局错误跳转资源

- ASYNC：异步访问资源 

**全局错误页面配置**

```xml
<error-page>
    <!--根据异常类型配置-->
    <exception-type>java.lang.exception</exception-type>
    <location>/error.jsp</location>
</error-page>
<error-page>
    <!--根据状态码配置-->
	<error-code>404</error-code>
    <location>/error.jsp</location>
</error-page>
```

## 十四、Listener

> 观察者设计模式，所有的监听器都是基于观察者设计模式的

- 在程序当中，我们可以对：对象的创建销毁、域对象中属性的变化、会话相关内容进行监听

- Servlet 规范中共计 8 个监听器，监听器都是以接口形式提供，具体功能需要我们自己来完成

**三个组成部分**

1. 事件源：触发事件的对象
2. 事件：触发的动作，封装了事件源
3. 监听器：当事件源触发事件后，可以完成功能

### 1、分类

#### 1.1. 监听对象的创建和销毁的监听器

**ServletContextListener**

> 用于监听 ServletContext 对象的创建和销毁

核心方法

| 返回值 | 方法名                                      | 作用                 |
| ------ | ------------------------------------------- | -------------------- |
| void   | contextInitialized(ServletContextEvent sce) | 对象创建时执行该方法 |
| void   | contextDestroyed(ServletContextEvent sce)   | 对象销毁时执行该方法 |

- 参数：ServletContextEvent 代表事件对象
- 事件对象中封装了事件源，也就是 ServletContext
- 真正的事件指的是创建或销毁 ServletContext 对象的操作

**HttpSessionListener**

> 用于监听 HttpSession 对象的创建和销毁

核心方法

| 返回值 | 方法名                                | 作用                 |
| ------ | ------------------------------------- | -------------------- |
| void   | sessionCreated(HttpSessionEvent se)   | 对象创建时执行该方法 |
| void   | sessionDestroyed(HttpSessionEvent se) | 对象销毁时执行该方法 |

- 参数：HttpSessionEvent 代表事件对象
- 事件对象中封装了事件源，也就是 HttpSession
- 真正的事件指的是创建或销毁 HttpSession 对象的操作

**ServletRequestListener**

> 用于监听 ServletRequest 对象的创建和销毁

核心方法

| 返回值 | 方法名                                      | 作用                 |
| ------ | ------------------------------------------- | -------------------- |
| void   | requestInitialized(ServletRequestEvent sre) | 对象创建时执行该方法 |
| void   | requestDestroyed(ServletRequestEvent sre)   | 对象销毁时执行该方法 |

- 参数：ServletRequestEvent 代表事件对象
- 事件对象中封装了事件源，也就是 ServletRequest
- 真正的事件指的是创建或销毁 ServletRequest 对象的操作

#### 1.2. 监听域对象属性变化的监听器

**ServletContextAttributeListener**

> 用于监听 ServletContext 应用域中属性的变化

核心方法

| 返回值 | 方法名                                               | 作用                     |
| ------ | ---------------------------------------------------- | ------------------------ |
| void   | attributeAdded(ServletContextAttributeEvent scae)    | 域中添加属性时执行该方法 |
| void   | attributeRemoved(ServletContextAttributeEvent scae)  | 域中移除属性时执行该方法 |
| void   | attributeReplaced(ServletContextAttributeEvent scae) | 域中替换属性时执行该方法 |

- 参数：ServletContextAttributeEvent 代表事件对象
- 事件对象中封装了事件源，也就是 ServletContext
- 真正的事件指的是添加、移除、替换应用域中属性的操作

**HttpSessionAttributeListener**

> 用于监听 HttpSession 会话域中属性的变化

核心方法

| 返回值 | 方法名                                        | 作用                     |
| ------ | --------------------------------------------- | ------------------------ |
| void   | attributeAdded(HttpSessionBindingEvent se)    | 域中添加属性时执行该方法 |
| void   | attributeRemoved(HttpSessionBindingEvent se)  | 域中移除属性时执行该方法 |
| void   | attributeReplaced(HttpSessionBindingEvent se) | 域中替换属性时执行该方法 |

- 参数：HttpSessionBindingEvent 代表事件对象
- 事件对象中封装了事件源，也就是 HttpSession
- 真正的事件指的是添加、移除、替换会话域中属性的操作

**ServletRequestAttributeListener**

> 用于监听 ServletRequest 请求域中属性的变化

核心方法

| 返回值 | 方法名                                               | 作用                     |
| ------ | ---------------------------------------------------- | ------------------------ |
| void   | attributeAdded(ServletRequestAttributeEvent srae)    | 域中添加属性时执行该方法 |
| void   | attributeRemoved(ServletRequestAttributeEvent srae)  | 域中移除属性时执行该方法 |
| void   | attributeReplaced(ServletRequestAttributeEvent srae) | 域中替换属性时执行该方法 |

- 参数：ServletRequestAttributeEvent 代表事件对象
- 事件对象中封装了事件源，也就是 ServletRequest
- 真正的事件指的是添加、移除、替换请求域中属性的操作

#### 1.3. 监听会话相关的感知型监听器

> 感知型监听器：在定义好之后就可以直接使用，不需要再通过注解或xml文件进行配置

**HttpSessionBindingListener**

> 用于感知对象和会话域绑定的监听器

核心方法

| 返回值 | 方法名                                      | 作用                                   |
| ------ | ------------------------------------------- | -------------------------------------- |
| void   | valueBound(HttpSessionBindingEvent event)   | 数据添加到会话域中（绑定）时执行该方法 |
| void   | valueUnbound(HttpSessionBindingEvent event) | 数据从会话域中移除（解绑）时执行该方法 |

- 参数：HttpSessionBindingEvent 代表事件对象
- 事件对象中封装了事件源，也就是 HttpSession
- 真正的事件指的是添加、移除会话域中数据的操作

**HttpSessionActivationListener**

> 用于感知会话域对象钝化和活化的监听器

核心方法

| 返回值 | 方法名                                    | 作用                         |
| ------ | ----------------------------------------- | ---------------------------- |
| void   | sessionWillPassivate(HttpSessionEvent se) | 会话域中数据钝化时执行该方法 |
| void   | sessionDidActivate(HttpSessionEvent se)   | 会话域中数据活化时执行该方法 |

- 参数：HttpSessionEvent 代表事件对象
- 事件对象中封装了事件源，也就是 HttpSession
- 真正的事件指的是会话域中数据钝化、活化的操作

### 2、使用

**配置监听器**

- 注解方式：`@WebListener`

- xml文档方式

```xml
<listener>
	<listener-class>监听器对象实现类的全路径</listener-class>
</listener>
```

**监听对象的**

- ServletContextListener
- HttpSessionListener
- ServletRequestListener

```java
package study.servlet.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.annotation.WebServlet;

@WebServlet("/listener01")
@WebListener
public class listener01 implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("监听到了对象的创建");
        ServletContext servletContext = servletContextEvent.getServletContext();
        // 添加属性
        servletContext.setAttribute("username","张三");
        // 替换属性
        servletContext.setAttribute("username","李四");
        // 移除属性
        servletContext.removeAttribute("username");

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("监听到了对象的销毁");
    }
}
```

**监听属性变化的**

- ServletContextAttributeListener
- HttpSessionAttributeListener
- ServletRequestAttributeListener

```java
package study.servlet.listener;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/listener02")

public class listener02 implements ServletContextAttributeListener {
    @Override
    public void attributeAdded(ServletContextAttributeEvent servletContextAttributeEvent) {
        System.out.println("监听到了属性的添加");
        ServletContext servletContext = servletContextAttributeEvent.getServletContext();
        Object username = servletContext.getAttribute("username");
        System.out.println(username);
    }

    @Override
    public void attributeRemoved(ServletContextAttributeEvent servletContextAttributeEvent) {
        System.out.println("监听到了属性的移除");
        ServletContext servletContext = servletContextAttributeEvent.getServletContext();
        Object username = servletContext.getAttribute("username");
        System.out.println(username);
    }

    @Override
    public void attributeReplaced(ServletContextAttributeEvent servletContextAttributeEvent) {
        System.out.println("监听到了属性的替换");
        ServletContext servletContext = servletContextAttributeEvent.getServletContext();
        Object username = servletContext.getAttribute("username");
        System.out.println(username);
    }
}
```

**会话相关的感知型**

- HttpSessionBindingListener
- HttpSessionActivationListener