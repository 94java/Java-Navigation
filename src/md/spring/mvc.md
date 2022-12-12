---
title: "SpringMVC"
order: 4
category:
  - Spring
---

# SpringMVC

**三层架构**

- 表现层 / 控制层：负责数据展示
- 业务层：负责业务处理
- 数据层 / 持久层：负责数据操作

![](http://images.hellocode.top/CXiytOkV5bR2dlo.png)

**MVC**

MVC（Model View Controller）：一种用于设计创建web应用程序表现层的模式

- Model（模型）：数据模型，用于封装数据
- View（视图）：页面视图，用于展示数据
  - jsp
  - html
  - thymeleaf
- Controller（控制器）：处理用户交互的调度器，用于根据用户需求处理程序逻辑
  - Servlet
  - *SpringMVC*

![](http://images.hellocode.top/AmCBe5I2f3ZR8ok.png)

## 一、入门案例

> SpringMVC是一种基于Java实现MVC模型的轻量级Web框架

- 使用简单
- 性能突出（相比现有的框架技术）
- 灵活性强

### 1、案例制作

- XML版
- XML+注解版*（主体）*
- 纯注解版*（变形）*

> 基于Spring环境开发
>
> SpringMVC版本与Spring版本同步------5.1.9

*导坐标*

```xml
<dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.1</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--spring-web-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--spring-mvc-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
  </dependencies>
<!--TomCat插件-->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>
```

*定义表现层业务处理器Controller，并配置成spring的bean（等同于Servlet）*

*设定具体的Controller的访问路径（等同于Servlet在web.xml中的配置），设置返回页面*

```java
@Controller
public class UserController {
    @RequestMapping("/save")
    public String save(){
        System.out.println("user mvc controller is running...");
        return "success.jsp";
    }
}
```

*该bean的处理需要使用独立的配置文件扫描（XML版）*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="top.hellocode"/>
</beans>
```

*web.xml中配置SpringMVC核心控制器，用于将请求转发到对应的具体业务处理器Controller中（等同于Servlet配置）*

```xml
<servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
</servlet>

<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

**步骤**

- 导入坐标
- 定义Controller类
- 配置DispatcherServlet
- 配置访问路径
- 配置跳转页面

### 2、技术架构图

![](http://images.hellocode.top/PI6kTVtRXlq3chd.png)

- DispatcherServlet：前端控制器，是整体流程控制的中心，由其调用其他组件处理用户的请求，有效的降低了组件间的耦合性
- HandlerMapping：处理器映射器，负责根据用户请求找到对应具体的Handler处理器
- Handler：处理器，业务处理的核心类，通常由开发者编写，描述具体的业务
- View Resolver：视图解析器，将处理结果生成view视图
- View：视图，最终产出结果，常用视图如jsp、html

![](http://images.hellocode.top/1Th76dbUEjcXHfQ.png)

## 二、基本配置

#### Controller加载控制

- SpringMVC的处理器对应的bean必须按照规范格式开发，为避免加入无效的bean可通过bean加载过滤器进行包含设定或排除设定，表现层bean标注通常设定为`@Controller`

  ```xml
  <context:component-scan base-package="top.hellocode">
      <context:include-filter 
               type="annotation" 
               expression="org.springframework.stereotype.Controller"/>
  </context:component-scan>
  ```

- 业务层与数据层bean加载由Spring控制，参照Spring加载方式
- 表现层bean加载由SpringMVC单独控制
  - 表现层处理器bean使用注解`@Controller`声明
  - bean加载控制使用包含性过滤器
  - 过滤器类型为通过注解进行过滤
  - 过滤的注解名称为`Controller`

#### 静态资源加载

- 核心控制器拦截的是所有请求，需要对静态资源请求进行放行，通过配置放行资源实现

  ```xml
  <mvc:resources mapping="/img/**" location="/img/"/>
  <mvc:resources mapping="/js/**" location="/js/"/>
  ```

- 使用简化格式可以放行所有普通资源调用，无需一一枚举
  `<mvc:default-servlet-handler />`

#### 中文乱码处理

- SpringMVC提供专用的中文字符过滤器，用于处理乱码问题

```XML
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

#### 注解驱动

*使用注解形式转化SpringMVC核心配置文件为配置类*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月17日 11:26
 */
@Configuration
@ComponentScan(value = "top.hellocode",includeFilters =
    @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {Controller.class})
)
public class SpringMVCConfiguration implements WebMvcConfigurer {
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**").addResourceLocations("/img/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
    }

    // 简化格式（和上面的二选一即可）
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}
```

*基于servlet3.0规范，自定义Servlet容器初始化配置类，加载SpringMVC核心配置类*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月17日 11:31
 */
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    // 加载SpringMVC的配置文件
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringMVCConfiguration.class);
        return ctx;
    }

    // 映射配置
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
        CharacterEncodingFilter cef = new CharacterEncodingFilter();
        cef.setEncoding("UTF-8");
        FilterRegistration.Dynamic registration = servletContext.addFilter("characterEncodingFilter", cef);
        registration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST,DispatcherType.FORWARD,DispatcherType.INCLUDE),false,"/*");
    }
}
```

*bean加载过滤（注解版）*

```java
/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年07月17日 11:26
 */
@Configuration
@ComponentScan(value = "top.hellocode",includeFilters =
    @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {Controller.class})
)
public class SpringMVCConfiguration implements WebMvcConfigurer {
}
```

*静态资源加载过滤（注解版）*

- 配置类实现WebMvcConfigurer接口，覆盖addResourceHandlers方法，在其中对具体的资源进行设定

  ```java
  public class SpringMVCConfiguration implements WebMvcConfigurer {
      public void addResourceHandlers(ResourceHandlerRegistry registry) {
          registry.addResourceHandler("/img/**").addResourceLocations("/img/");
          registry.addResourceHandler("/css/**").addResourceLocations("/css/");
      }
  }
  ```

- 或覆盖configureDefaultServletHandling方法，使用Servlet默认过滤规则

  ```java
  public class SpringMVCConfiguration implements WebMvcConfigurer {
      public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
          configurer.enable();
      }
  }
  ```

*中文乱码处理（注解版）*

> 在Servlet3.0规范启动服务器时做的工作通过实现ServletContainerInitializer接口，在onStartup方法中完成，包括监听器注册、过滤器注册等

```java
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
        CharacterEncodingFilter cef = new CharacterEncodingFilter();
        cef.setEncoding("UTF-8");
        FilterRegistration.Dynamic registration = servletContext.addFilter("characterEncodingFilter", cef);
        registration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST,DispatcherType.FORWARD,DispatcherType.INCLUDE),false,"/*");
    }
}
```

*ServletContainerInitConfig*

```java
public class ServletContainerInitConfig extends AbstractDispatcherServletInitializer {
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringMVCConfig.class);
        return ctx;
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```

## 三、请求

#### 请求参数

- SpringMVC将传递的参数封装到处理器方法的形参中，达到快速访问参数的目的
  访问URL：`http://localhost/requestParam?name=hellocode`

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(String name){
      System.out.println("name="+name);
      return "page.jsp";
  }
  ```

- 请求参数类型
  - 普通类型参数
  - POJO类型参数
  - 数组类型参数
  - 集合类型参数

**普通类型参数**

- 参数名与处理器方法形参名保持一致
  访问URL：`http://localhost/requestParam?name=hellocode&age=14`

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(String name,String age){
      System.out.println("name="+name+",age="+age);
      return "page.jsp";
  }
  ```

*参数设定*

- 名称：`@RequestParam`

- 类型：形参注解

- 位置：处理器类中的方法形参前方

- 作用：绑定请求参数与对应处理方法形参间的关系

- 范例

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(@RequestParam(
      							name = "userName",
      							required = true,
      							defaultValue = "hellocode") String name){
      System.out.println("name=" + name);
      return "page.jsp";
  }
  ```

  - 访问路径：`/requestParam/userName=hellocode`

**POJO类型参数**

- 当POJO中使用简单类型属性时，参数名称与POJO类属性名保持一致
  访问URL：`http://localhost/requestParam?name=hellocode&age=14`

  ```java
  public class User{
      private String name;
      private Integer age;
  }
  ```

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(User user){
      System.out.println("name="+user.getName());
      return "page.jsp";
  }
  ```

- 当POJO类型属性与其他形参出现同名问题时，将被同时赋值
  建议使用`@RequestParam`注解进行区分

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(User user, String age){
      System.out.println("user.age=" + user.getAge() + ",age=" + age);
      return "page.jsp";
  }
  ```

  ```java
  public class User{
      private String name;
      private Integer age;
  }
  ```

  > 这时age既会给User中的age属性赋值，同时也会给方法的形参age赋值

*复杂POJO类型参数*

- 当POJO中出现对象属性时，参数名称与对象层次结构名称保持一致
  访问URL：`http://localhost/request?address.province=beijing`

![img](http://images.hellocode.top/9dacef404344457298390898ea1c6279.png)

- 当POJO中出现集合，保存简单数据，使用多个相同名称的参数为其进行赋值
  访问URL：`http://localhost/requestParam?nick=Jock1&nick=Jock2`

  ```java
  public class User{
      private List<String> nick;
  }
  ```

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(User user){
      System.out.println("user.nick=" + user.getNick());
      return "page.jsp";
  }
  ```

- 当POJO中出现List，保存对象数据，参数名称与对象层次结构名称保持一致，使用数组格式描述集合中对象的位置
  访问URL：`http://localhost/requestParam?addresses[0].province=bj&addresses[1].province=tj`

  ```java
  public class User{
      private String name;
      private Integer age;
      private List<Address> addresses;
  }
  ```

  ```java
  public class Address{
      private String province;
      private String city;
      private String address;
  }
  ```

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(User user){
      System.out.println("user.addresses=" + user.getAddress());
      return "page.jsp";
  }
  ```

- 当POJO中出现Map，保存对象数据，参数名称与对象层次结构名称保持一致，使用映射格式描述集合中对象的位置
  访问URL：`http://localhost/requestParam?addressMap['home'].province=bj&addressMap['job'].province=tj`

  ```java
  public class User{
      private String name;
      private Integer age;
      private Map<String,Address> addressMap;
  }
  ```

  ```java
  public class Address{
      private String province;
      private String city;
      private String address;
  }
  ```

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(User user){
      System.out.println("user.addressMap=" + user.getAddressMap());
      return "page.jsp";
  }
  ```

**数组类型参数**

- 请求参数名与处理器方法形参名保持一致，且请求参数数量>1个
  访问URL：`http://localhost/requestParam?nick=Jock&nick=zahc`

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(String[] nick){
      System.out.println(nick[0] + "," + nick[1]);
      return "page.jsp";
  }
  ```

**集合类型参数**

- 保存简单型数据，请求参数名与处理器方法形参名保持一致，且请求参数数量>1个
  访问URL：`http://localhost/requestParam?nick=Jock&nick=skaa`

  ```java
  @RequestMapping("/requestParam")
  public String requestParam(@RequestParam("nick") List<String> nick){
      System.out.println(nick);
      return "page.jsp";
  }
  ```

>  SpringMVC默认将List作为对象处理，赋值前先创建对象，然后将nick作为对象的属性进行处理。由于List是接口，无法创建对象，报无法找到构造方法异常；修复类型为可创建对象的ArrayList类型后，对象可以创建，但没有nick属性，因此数据为空。此时需要告知SpringMVC的处理器nick是一组数据，而不是一个单一数据。通过@RequestParam注解，将数量大于1个names参数打包成参数数组后， SpringMVC才能识别该数据格式，并判定形参类型是否为数组或集合，并按数组或集合对象的形式操作数据。

- 集合存储引用类型数据POJO使用异步调用的形式进行，此处了解即可

#### 类型转换器

- SpringMVC对接收的数据进行自动类型转换，该工作通过Converter接口实现

**标量转换器**

| 方法                           | 解释                                                        |
| ------------------------------ | ----------------------------------------------------------- |
| StringToBooleanConverter       | String→Boolean                                              |
| ObjectToStringConverter        | Object→String                                               |
| StringToNumberConverterFactory | String→Number（ Integer、 Long等）                          |
| NumberToNumberConverterFactory | Number子类型之间(Integer、 Long、 Double等)                 |
| StringToCharacterConverter     | String→java.lang.Character                                  |
| NumberToCharacterConverter     | Number子类型(Integer、 Long、 Double等)→java.lang.Character |
| CharacterToNumberFactory       | java.lang.Character→Number子类型(Integer、 Long、 Double等) |
| StringToEnumConverterFactory   | String→enum类型                                             |
| EnumToStringConverter          | enum类型→String                                             |
| StringToLocaleConverter        | String→java.util.Local                                      |
| PropertiesToStringConverter    | java.util.Properties→String                                 |
| StringToPropertiesConverter    | String→java.util.Properties                                 |

**集合、数组相关转换器**

| 方法                            | 解释                                            |
| ------------------------------- | ----------------------------------------------- |
| ArrayToCollectionConverter      | 数组→集合（ List、 Set）                        |
| CollectionToArrayConverter      | 集合（ List、 Set） →数组                       |
| ArrayToArrayConverter           | 数组间                                          |
| CollectionToCollectionConverter | 集合间（ List、 Set）                           |
| MapToMapConverter               | Map间                                           |
| ArrayToStringConverter          | 数组→String类型                                 |
| StringToArrayConverter          | String→数组， trim后使用“,”split                |
| ArrayToObjectConverter          | 数组→Object                                     |
| ObjectToArrayConverter          | Object→单元素数组                               |
| CollectionToStringConverter     | 集合（ List、 Set） →String                     |
| StringToCollectionConverter     | String→集合（ List、 Set）， trim后使用“,”split |
| CollectionToObjectConverter     | 集合→Object                                     |
| ObjectToCollectionConverter     | Object→单元素集合                               |

**默认转换器**

| 方法                            | 解释          |
| ------------------------------- | ------------- |
| ObjectToObjectConverter         | Object间      |
| IdToEntityConverter             | Id→Entity     |
| FallbackObjectToStringConverter | Object→String |

**日期类型格式转换**

```xml
<!--6.启用自定义Converter-->
<mvc:annotation-driven conversion-service="conversionService"/>
<!--1.设定格式类型Converter，注册为Bean，受SpringMVC管理-->
<bean id="conversionService"
      class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
    <!--2.自定义Converter格式类型设定，该设定使用的是同类型覆盖的思想-->
    <property name="formatters">
        <!--3.使用set保障相同类型的转换器仅保留一个，避免冲突-->
        <set>
            <!--4.设置具体的格式类型-->
            <bean class="org.springframework.format.datetime.DateFormatter">
                <!--5.类型规则-->
                <property name="pattern" value="yyyy-MM-dd"/>
            </bean>
        </set>
    </property>
</bean>
```

**日期类型格式转换（注解简化版）**

- 名称： `@DateTimeFormat`

- 类型： *形参注解*、成员变量注解

- 位置：形参前面 或 成员变量上方

- 作用：为当前参数或变量指定类型转换规则

- 范例

  ```java
  public String requestParam12(@DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
      System.out.println("date="+date);
      return "page.jsp";
  }
  ```

  ```java
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date birthday;
  ```

> 注意：需要在SpringMVC配置文件中加上注解驱动标签 `<mvc:annotation-driven/>`

**自定义类型转换器**

- 自定义类型转换器，实现Converter接口，并制定转换前与转换后的类型

```xml
<!--1.将自定义Converter注册为Bean，受SpringMVC管理-->
<bean id="myDateConverter" class="com.itzhuzhu.converter.MyDateConverter"/>
<!--2.设定自定义Converter服务bean-->
<bean id="conversionService"
      class="org.springframework.context.support.ConversionServiceFactoryBean">
    <!--3.注入所有的自定义Converter，该设定使用的是同类型覆盖的思想-->
    <property name="converters">
        <!--4.set保障同类型转换器仅保留一个，去重规则以Converter<S,T>的泛型为准-->
        <set>
            <!--5.具体的类型转换器-->
            <ref bean="myDateConverter"/>
        </set>
    </property>
</bean>
```

```java
//自定义类型转换器，实现Converter接口，接口中指定的泛型即为最终作用的条件
//本例中的泛型填写的是String，Date，最终出现字符串转日期时，该类型转换器生效
public class MyDateConverter implements Converter<String, Date> {
    //重写接口的抽象方法，参数由泛型决定
    public Date convert(String source) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        //类型转换器无法预计使用过程中出现的异常，因此必须在类型转换器内部捕获，不允许抛出，框架无法预计此类异常如何处理
        try {
            date = df.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

```xml
<!--开启注解驱动，加载自定义格式化转换器对应的类型转换服务-->
<mvc:annotation-driven conversion-service="conversionService"/>
```

#### 请求映射

- 名称：`@RequestMapping`

- 类型：*方法注解*

- 位置：处理器类中的方法定义上方

- 作用：绑定请求地址与对应处理方法间的关系

- 范例

  ```java
  @RequestMapping("/requestURL")
  public String requestURL(){
      return "page.jsp";
  }
  ```

  - 访问路径：/requestURL

----

- 名称： `@RequestMapping`

- 类型： *类注解*

- 位置：处理器类定义上方

- 作用：为当前处理器中所有方法设定公共的访问路径前缀

- 访问URL：`http://localhost:8080/user/requestParam14`

- 如果返回的有图片，那么图片也要放在user包下

  ```java
  @Controller
  @RequestMapping("/user")
  public class UserController {
      @RequestMapping("/requestParam")
      public String requestParam() {
          return "page.jsp";
          // return "/page.jsp"; 如果类上配置了RequestMapping，在返回文件前加个/也是可以访问到的
      }
  }
  ```

**常用属性**

```java
@RequestMapping(
    value="/requestParam15", //设定请求路径，与path属性、 value属性相同
    method = RequestMethod.GET, //设定请求方式
    params = "name", //设定请求参数条件
    headers = "content-type=text/*", //设定请求消息头条件
    consumes = "text/*", //用于指定可以接收的请求正文类型（MIME类型）
    produces = "text/*" //用于指定可以生成的响应正文类型（MIME类型）
)
public String requestParam15() {
    return "/page.jsp";
}
```

## 四、响应

- 页面
  - HTML（页面）
  - JSP（页面+数据）
  - ......
- 数据
  - JSON数据
  - XML数据
  - 文本数据
- 文件
  - 数据流

> 不论是页面、数据还是文件，最终传递的都是数据流

#### 无数据跳转页面

- 当处理器方法的返回值类型为String类型，即可通过具体的返回值设置访问的页面

  ```java
  @Controller
  public class UserController{
      @RequestMapping("/showPage")
      public String showPage(){
          System.out.println("user mvc controller is running ...");
          return "page.jsp";
      }
  }
  ```

**页面跳转方式**

- 转发（默认）

  ```java
  @RequestMapping("/showPage1")
  public String showPage1(){
      System.out.println("user mvc controller is running ...");
      return "forward:page.jsp";
  }
  ```

- 重定向

  ```java
  @RequestMapping("/showPage2")
  public String showPage2(){
      System.out.println("user mvc controller is running ...");
      return "redirect:page.jsp";
  }
  ```

> 注意：页面访问地址中需要带`/`

**页面访问快捷设定**

- 展示页面的保存位置通常固定，且结构相似，可以设定通用的访问路径，简化页面配置格式

  ```xml
  <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
  	<property name="prefix" value="/WEB-INF/pages/" />
      <property name="suffix" value=".jsp" />
  </bean>
  ```

  ```java
  public String showPage(){
      return "page";
  }
  ```

- 如果未设定返回值，使用void类型，则默认使用访问路径作页面地址的前缀后缀

  ```java
  @RequestMapping("/showPage6")
  public void showPage5(){
  }
  ```

  等同于

  ```java
  @RequestMapping("/showPage6")
  public String showPage5(){
      return "showPage6";
  }
  ```

#### 带数据跳转页面

**方式一**：使用HttpServletRequest类型形参进行数据传递

```java
@RequestMapping("/showPageAndData")
public String showPageAndData(HttpServletRequest request){
    request.setAttribute("name","hellocode");
    return "page";
}
```

**方式二**：使用Model类型形参进行数据传递

```java
@RequestMapping("/showPageAndData")
public String showPageAndData(Model model){
    model.addAttribute("name","hellocode");
    Book book = new Book();
    book.setName("SpringMVC入门实战");
    book.setPrice(66.6D);
    model.addAttribute("book",book);
    return "page";
}
```

**方式三**：使用ModelAndView类型形参进行数据传递，将该对象作为返回值传递给调用者（*推荐*）

```java
@RequestMapping("/showPageAndData")
public ModelAndView showPageAndData(ModelAndView modelAndView){
    modelAndView.addObject("name","hellocode");
    Book book = new Book();
    book.setName("SpringMVC入门实战");
    book.setPrice(66.6D);
    modelAndView.addObject("book",book);
    modelAndView.setViewName("page.jsp");		// 如果配置了快捷方式，省略前后缀
    return modelAndView;
}
```

> 方式三同样支持forward和redirect

----

- String：仅封装跳转页面的基本信息，底层由ModelAndView实现
- Model：仅封装数据
- ModelAndView：封装数据并封装视图，包含Model和View两个对象

#### 纯数据返回（JSON）

**方式一**：使用response对象完成数据返回

```java
@RequestMapping("/showData")
public void showData(HttpServletResponse response) throws IOException{
    response.getWriter().print("message");
}
```

**方式二**：（简化格式）

```java
@RequestMapping("/showData")
@ResponseBody
public String showData(){
    return "message";
}
```

----

**返回JSON**

> 需要导入json相应的maven坐标

*方式一*：基于response返回数据的简化格式，返回JSON数据

```java
@RequestMapping("/showData")
@ResponseBody
public String showData() throws JsonProcessingException{
    ObjectMapper om = new ObjectMapper();
    Book book = new Book();
    book.setName("SpringMVC入门实战");
    book.setPrice(88.8d);
    return om.writeValueAsString(book);
}
```

*方式二*：使用SpringMVC提供的消息类型转换器将对象与集合数据自动转换为JSON数据

```java
@RequestMapping("/showData")
@ResponseBody
public Book showData() throws JsonProcessingException{
    Book book = new Book();
    book.setName("SpringMVC入门实战");
    book.setPrice(88.8d);
    return book;
}
```

- 手工添加信息类型转换器

  ```xml
  <bean class = "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
      <property name="messageConverters">
          <list>
              <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
          </list>
      </property>
  </bean>
  ```

  上述配置可通过SpringMVC注解驱动来简化

  ```xml
  <mvc:annotation-driven />
  ```

  注解驱动格式

  ```java
  @Configuration
  @ComponentScan("top.hellocode")
  @EnableWebMvc
  public class SpringMvcConfiguration{
  }
  ```

#### Servlet相关接口

**HttpServletRequest / HttpServletResponse / HttpSession**

- SpringMVC提供访问原始Servlet接口API的功能，通过形参声明即可

```java
@RequestMapping("/servletApi")
public String servletApi(HttpServletRequest request, HttpServletResponse response, HttpSession session){
    System.out.println(request);
    System.out.println(response);
    System.out.println(session);
    request.setAttribute("name","itheima");
    System.out.println(request.getAttribute("name"));
    return "page.jsp";
}
```

**Head数据获取**

- 名称： `@RequestHeader`

- 类型： *形参注解*

- 位置：处理器类中的方法形参前方

- 作用：绑定请求头数据与对应处理方法形参间的关系

- 范例：

  ```java
  @RequestMapping("/headApi")
  public String headApi(@RequestHeader("Accept-Language") String head){
      System.out.println(head);
      return "page.jsp";
  }
  ```

**Cookie数据获取**

- 名称： `@CookieValue`

- 类型： *形参注解*

- 位置：处理器类中的方法形参前方

- 作用：绑定请求Cookie数据与对应处理方法形参间的关系

- 范例：

  ```java
  @RequestMapping("/cookieApi")
  public String cookieApi(@CookieValue("JSESSIONID") String jsessionid){
      System.out.println(jsessionid);
      return "page.jsp";
  }
  ```

**Session数据获取**

- 名称： `@SessionAttribute`

- 类型： *形参注解*

- 位置：处理器类中的方法形参前方

- 作用：绑定请求Session数据与对应处理方法形参间的关系

- 范例：

  ```java
  @RequestMapping("/sessionApi")
  public String sessionApi(@SessionAttribute("name") String name){
      System.out.println(name);
      return "page.jsp";
  }
  ```

**Session数据设置**（了解）

- 名称： `@SessionAttributes`

- 类型： *类注解*

- 位置：处理器类上方

- 作用：声明放入session范围的变量名称，适用于Model类型数据传参

- 范例：

  ```java
  @Controller
  @SessionAttributes(names={"name"})
  public class ServletController {
      @RequestMapping("/setSessionData2")
      public String setSessionDate2(Model model) {
          model.addAttribute("name", "Jock2");
          return "page.jsp";
      }
  }
  ```

**注解式参数数据封装底层原理**

- 数据的来源不同，对应的处理策略要进行区分
  - Head
  - Cookie
  - Session
- SpringMVC使用策略模式进行处理分发
  - 顶层接口： HandlerMethodArgumentResolver
  - 实现类： ……

## 五、异步调用

#### 发送异步请求

**内容回顾**

```html
<a href="javascript:void(0);" id="testAjax">访问controller</a>
<script type="text/javascript" src="/js/jquery-3.3.1.min.js"></script>
<script type="text/javascript">
    $(function(){
    $("#testAjax").click(function(){ 		//为id="testAjax"的组件绑定点击事件
        $.ajax({ 							//发送异步调用
            type:"POST", 					//请求方式： POST请求
            url:"ajaxController", 			//请求参数（也就是请求内容）
            data:'ajax message', 			//请求参数（也就是请求内容）
            dataType:"text", 				//响应正文类型
            contentType:"application/text", //请求正文的MIME类型
        });
    });
});
</script>
```

- 名称： `@RequestBody`

- 类型： *形参注解*

- 位置：处理器类中的方法形参前方

- 作用：将异步提交数据组织成标准请求参数格式，并赋值给形参

- 范例：

  ```javascript
  //为id="testAjax"的组件绑定点击事件
  $("#testAjax").click(function(){
  	//发送异步调用
  	$.ajax({
  		//请求方式：POST请求
  		type:"POST",
  		//请求的地址
  		url:"ajaxController",
  		//请求参数（也就是请求内容）
  		data:'ajax message',
  		//响应正文类型
  		dataType:"text",
  		//请求正文的MIME类型
  		contentType:"application/text",
  	});
  });
  ```

  ```java
  
  @RequestMapping("/ajaxController")
  public String ajaxController(@RequestBody String message){
      System.out.println(message);
      return "page.jsp";
  }
  ```

- 注解添加到Pojo参数前方时，封装的异步提交数据按照Pojo的属性格式进行关系映射

  ```javascript
  //为id="testAjaxPojo"的组件绑定点击事件
  $("#testAjaxPojo").click(function(){
      $.ajax({
          type:"POST",
          url:"ajaxPojoToController",
          data:'{"name":"Jock","age":39}',
          dataType:"text",
          contentType:"application/json",
      });
  });
  ```

  ```java
  @RequestMapping("/ajaxPojoToController")
  //如果处理参数是POJO，且页面发送的请求数据格式与POJO中的属性对应，@RequestBody注解可以自动映射对应请求数据到POJO中
  //注意：POJO中的属性如果请求数据中没有，属性值为null，POJO中没有的属性如果请求数据中有，不进行映射
  public String  ajaxPojoToController(@RequestBody User user){
      System.out.println("controller pojo :"+user);
      return "page.jsp";
  }
  ```

- 注解添加到集合参数前方时，封装的异步提交数据按照集合的存储结构进行关系映射

```javascript
//为id="testAjaxList"的组件绑定点击事件
$("#testAjaxList").click(function(){
    $.ajax({
        type:"POST",
        url:"ajaxListToController",
        data:'[{"name":"Jock","age":39},{"name":"Jockme","age":40}]',
        dataType:"text",
        contentType:"application/json",
    });
});
```

```java
@RequestMapping("/ajaxListToController")
//如果处理参数是List集合且封装了POJO，且页面发送的数据是JSON格式的对象数组，数据将自动映射到集合参数中
public String  ajaxListToController(@RequestBody List<User> userList){
    System.out.println("controller list :"+userList);
    return "page.jsp";
}
```

#### 返回异步请求数据

**异步请求响应**（回顾）

```javascript
//为id="testAjaxReturnJson"的组件绑定点击事件
$("#testAjaxReturnJson").click(function(){
    //发送异步调用
    $.ajax({
        type:"POST",
        url:"ajaxReturnJson",
        //回调函数
        success:function(data){
            //打印返回结果
            alert(data);
        }
    });
});
```

```java
//使用注解@ResponseBody可以将返回的页面不进行解析，直接返回字符串，该注解可以添加到方法上方或返回值前面
@RequestMapping("/ajaxReturnString")
//    @ResponseBody
public @ResponseBody String ajaxReturnString(){
    System.out.println("controller return string ...");
    return "page.jsp";
}
```

方法返回值为POJO时，自动封装数据成json对象数据

```java
@RequestMapping("/ajaxReturnJson")
@ResponseBody
//基于jackon技术，使用@ResponseBody注解可以将返回的POJO对象转成json格式数据
public User ajaxReturnJson(){
    System.out.println("controller return json pojo...");
    User user = new User();
    user.setName("Jockme");
    user.setAge(39);
    return user;
}
```

方法返回值为List时，自动封装数据成json对象数组数据

```java
@RequestMapping("/ajaxReturnJsonList")
@ResponseBody
//基于jackon技术，使用@ResponseBody注解可以将返回的保存POJO对象的集合转成json数组格式数据
public List ajaxReturnJsonList(){
    System.out.println("controller return json list...");
    User user1 = new User();
    user1.setName("Tom");
    user1.setAge(3);

    User user2 = new User();
    user2.setName("Jerry");
    user2.setAge(5);

    ArrayList al = new ArrayList();
    al.add(user1);
    al.add(user2);

    return al;
}
```

- 名称：`@ResopnseBody`（复习）

- 类型：*方法注解*、*返回值注解*

- 位置：处理器类中的方法前方

- 作用：将异步提交的数据组织成标准请求参数格式，并赋值给形参

- 范例

  ```java
  //使用注解@ResponseBody可以将返回的页面不进行解析，直接返回字符串，该注解可以添加到方法上方或返回值前面
  @RequestMapping("/ajaxReturnString")
  //@ResponseBody
  public @ResponseBody String ajaxReturnString(){
      System.out.println("controller return string ...");
      return "page.jsp";
  }
  ```

#### 跨域访问

- 当通过域名A下的操作访问域名B下的资源时，称为跨域访问
- 跨域访问时，会出现无法访问的现象

![](http://images.hellocode.top/wGR64PirLfeXJKk.png)



**跨域环境搭建**

- 为当前主机添加备用域名
  - 修改windows安装目录中的host文件
  - 格式：ip 域名
- 动态刷新DNS
  - 命令：`ipconfig /displaydns`
  - 命令：`ipconfig/flushdns`

**跨域访问支持**

- 名称： `@CrossOrigin`

- 类型： *方法注解* 、*类注解*

- 位置：处理器类中的方法上方 或 类上方

- 作用：设置当前处理器方法/处理器类中所有方法支持跨域访问

- 范例：

```java
@RequestMapping("/cross")
@ResponseBody
//使用@CrossOrigin开启跨域访问
//标注在处理器方法上方表示该方法支持跨域访问
//标注在处理器类上方表示该处理器类中的所有处理器方法均支持跨域访问
@CrossOrigin
public User cross(HttpServletRequest request){
    User user = new User();
    user.setName("Jockme");
    user.setAge(40);
    return user;
}
```

## 六、拦截器

#### 概念

![](http://images.hellocode.top/Yk9FxAhsD6ijnzc.png)

- 拦截器（Interceptor）是一种动态拦截方法调用的机制
- 作用（增强）
  - 在指定方法调用前后执行预先设定后的代码
  - 阻止原始方法的执行
- 核心原理：AOP思想
- 拦截器链：多个拦截器按照一定的顺序，对原始被调用功能进行增强

![](http://images.hellocode.top/1HpxjdrV4s8cDBR.png)

**拦截器VS过滤器**

- 归属不同：Filter属于Servlet技术，Interceptor属于SpringMVC技术

- 拦截内容不同：Filter对所有访问进行增强，Interceptor仅针对SpringMVC的访问进行增强

#### 自定义拦截器

**拦截器开发**

- 制作拦截器功能类（通知）
- 配置拦截器的执行位置（切入点）

**步骤**

- 实现HandlerInterceptor接口

  ```java
  @Component //注意当前类必须受Spring容器控制
  //定义拦截器类，实现HandlerInterceptor接口
  public class MyInterceptor implements HandlerInterceptor {
       @Override
      // 原始方法调用前执行的内容
      // 返回值类型可以拦截控制的执行，true放行，false终止
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          System.out.println("preHandle..." + contentType);
          return true;
      }
  
      @Override
      // 原始方法调用后执行的内容
      public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
          System.out.println("postHandle...");
      }
  
      @Override
      // 原始方法调用完成后执行的内容
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          System.out.println("afterCompletion...");
      }
  }
  ```

- 配置拦截器

  - 配置执行位置
  - 配置拦截器执行类

  ```xml
  <mvc:interceptors>
      <mvx:interceptor>
      	<mvc:mapping path="/showPage" />
          <bean class="top.hellocode.interceptor.MyInterceptor" />
      </mvx:interceptor>
  </mvc:interceptors>
  ```

  > 注意：配置顺序为先配置执行位置，后配置执行类

**拦截器工作流程**

![](http://images.hellocode.top/oezQ17y9ElhPxBS.png)

#### 配置与方法参数

**方法参数**

- HttpServletRequest：请求
- HttpServletResponse：响应

- handler：就是封装了Method方法，简单来说就是操作与原始方法相关的东西，就是通过这个对象去操作

- ModelAndView：是handle运行完，返回的东西。通过这个参数可以对执行完的结果进行修正，例如如果你出现了什么问题，会让你去B页面

- Exception：如果InterceptorController抛出异常，在这个afterCompletion方法里面可以拦截过滤，然后根据异常做处理

> preHandle方法：handle运行之前要做的事，写在这个方法里面，例如做参数的格式处理、权限校验等等
>
> postHandle方法：运行之后对里面数据进行处理。例如它返回了一个json数据，在这里面我想再加一条JSON数据，就需要在这里面做，比如如果你之前返回的是页面A，我在这里可以换成页面B，比如你之前登录的有session状态，我在这里可以清掉
>
> afterCompletion方法：就干一件事，如果里面有异常，在这里可以根据异常对它进行处理

![](http://images.hellocode.top/Vy9KjXzOdspeSRt.png)

![](http://images.hellocode.top/xVtaNnzsDQmIHJR.png)

![](http://images.hellocode.top/37btq5QEaUGSNKZ.png)

**配置**

![](http://images.hellocode.top/qJy7XrHl9U1R3pZ.png)

#### 责任链模式

- 当配置多个拦截器时，形成拦截器链
- 拦截器链的运行顺序参照配置的先后顺序
- 当拦截器中出现对原始处理器的拦截，后面的拦截器均终止运行
- 当拦截器运行中断，仅运行配置在前面的拦截器的afterCompletion操作

![](http://images.hellocode.top/KvIDqQ8h24kWVNl.png)

**责任链模式**

- 责任链模式是一种行为模式
- 特征：沿着一条预先设定的任务链顺序执行，每个结点具有独立的工作任务
- 优势:
  - 独立性:只关注当前节点的任务，对其他任务直接放行到下一节点
  - 隔离性:具备链式传递特征，无需知晓整体链路结构，只需等待请求到达后进行处理即可
  - 灵活性:可以任意修改链路结构动态新增或删减整体链路责任
  - 解耦:将动态任务与原始任务解耦
- 弊端:
  - 链路过长时，处理效率低下
  - 可能存在节点上的循环引用现象，造成死循环，导致系统崩溃
- 拦截器链的运行顺序
  - preHandler:与配置顺序相同，必定运行
  - postHandler:与配置顺序相反，可能不运行
  - afterCompletion:与配置顺序相反，可能不运行

## 七、异常处理

#### 异常处理

**HandlerExceptionResolver接口**（异常处理器）

> 定义自己的异常处理器，需要实现SpringMVC提供的异常处理器接口，并且将自定义异常处理器类定义为Spring控制的bean（加注解@Component）

```java
@Component // 配上注解Spring看到实现了这个接口就知道是异常处理器了
public class ExceptionResolver implements HandlerExceptionResolver {
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response,
                                         Object handler,
                                         Exception ex) {
        System.out.println("异常处理器正在执行中");
        ModelAndView modelAndView = new ModelAndView();
        //定义异常现象出现后，反馈给用户查看的信息
        modelAndView.addObject("msg","出错啦！ ");
        //定义异常现象出现后，反馈给用户查看的页面
        modelAndView.setViewName("error.jsp");
        return modelAndView;
    }
}
```

- 根据异常的种类不同，进行分门别类的管理，返回不同的信息

  ```java
  public class ExceptionResolver implements HandlerExceptionResolver {
      @Override
      public ModelAndView resolveException(HttpServletRequest request,
                                           HttpServletResponse response,
                                           Object handler,
                                           Exception ex) {
          System.out.println("my exception is running ...."+ex);
          ModelAndView modelAndView = new ModelAndView();
          
          if( ex instanceof NullPointerException){
              modelAndView.addObject("msg","空指针异常");
          }else if ( ex instanceof  ArithmeticException){
              modelAndView.addObject("msg","算数运算异常");
          }else{
              modelAndView.addObject("msg","未知的异常");
          }
          
          modelAndView.setViewName("error.jsp");
          return modelAndView;
      }
  }
  ```

#### 注解异常处理

**使用注解实现异常分类管理**

- 名称：`@ControllerAdvice`

- 类型：*类注解*

- 位置：异常处理器类上方

- 作用：设置当前类为异常处理器类

- 范例

  ```java
  @Component
  @ControllerAdvice
  public class ExceptionAdvice{
      @ExceptionHandler(NullPointerException.class)
      public void doNullException(){
          System.out.println("null exception ...");
      }
      //@ExceptionHandler(Exception.class)
      //@ResponseBody
      //public String doException(Exception ex){		// 如果需要拿到异常对象，可以加到方法形参处
      //    return "未知的异常";
      //}
  }
  ```

----



- 名称： `@ExceptionHandler`

- 类型： *方法注解*

- 位置：异常处理器类中针对指定异常进行处理的方法上方

- 作用：设置指定异常的处理方式

- 范例

  ```java
  @Component // 异常类只能有一个，多个的情况会都执行，会报错
  @ControllerAdvice
  public class ExceptionAdvice {
  
  // 可以根据不同的异常  写多个异常方法
  	@ExceptionHandler(NullPointerException.class)// 调用异常名
  	@ResponseBody // 只让结果返回的是字符串类型的，否则会直接去匹配页面
  		public String doOtherException(Exception ex){ // 写上参数可以拿到具体的参数
     			return "出错啦，请联系管理员！ ";
  	} 
  }
  ```

  > 说明：处理器方法可以设定多个

**两种异常处理方式对比**

- 注解处理器可以拦截到入参类型转换异常
- 非注解处理器无法拦截到入参类型转换异常

#### 项目异常处理方案

**异常分类**

- 业务异常
  - 规范的用户行为产生的异常
  - 不规范的用户行为操作产生的异常
- 系统异常
  - 项目运行过程中可预计且无法避免的异常
- 其他异常
  - 编程人员未预期到的异常

**异常处理方案**

- 业务异常
  - 发送对应消息传递给用户，提醒规范操作
- 系统异常
  - 发送固定消息传递给用户，安抚用户
  - 发送特定消息给运维人员，提醒维护
  - 记录日志
- 其他异常
  - 发送固定消息传递给用户，安抚用户
  - 发送特定消息给编程人员，提醒维护
    - 纳入预期范围内
  - 记录日志

**自定义异常**

> 通过自定义异常将所有的异常现象进行分类管理，以统一的格式对外呈现异常消息

- 异常定义格式

  ```java
  public class BusinessException extends RuntimeException{
      public BusinessException(){
          super();
      }
      // 覆盖父类所有的构造方法，转调父类构造方法
  }
  ```

- 异常触发方式

  ```java
  if(user.getName().trim().length() < 4){
      throw new BusinessException("用户名长度必须在4位以内，请重新输入！");
  }
  ```

----

*用户行为异常*（业务异常）

```java
//自定义异常继承RuntimeException，覆盖父类所有的构造方法
public class BusinessException extends RuntimeException {
    public BusinessException() {
    }

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusinessException(Throwable cause) {
        super(cause);
    }

    public BusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
```

*系统异常*

```java
//自定义异常继承RuntimeException，覆盖父类所有的构造方法
public class SystemException extends RuntimeException {
    public SystemException() {
    }

    public SystemException(String message) {
        super(message);
    }

    public SystemException(String message, Throwable cause) {
        super(message, cause);
    }

    public SystemException(Throwable cause) {
        super(cause);
    }

    public SystemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
```

*自定义异常触发类*

```java
@Controller
public class UserController {
    @RequestMapping("/save")
    @ResponseBody
    public List<User> save(@RequestBody User user) {
        System.out.println("user controller save is running ...");

        //模拟业务层发起调用产生了异常
        //        int i = 1/0;
        //        String str = null;
        //        str.length();

        //对用户的非法操作进行判定，并包装成异常对象进行处理，便于统一管理
        if(user.getName().trim().length() < 8){
            throw new BusinessException("对不起，用户名长度不满足要求，请重新输入！");
        }
        if(user.getAge() < 0){
            throw new BusinessException("对不起，年龄必须是0到100之间的数字！");
        }
        if(user.getAge() > 100){
            throw  new SystemException("服务器连接失败，请尽快检查处理！");
        }


        User u1 = new User();
        u1.setName("Tom");
        u1.setAge(3);
        User u2 = new User();
        u2.setName("Jerry");
        u2.setAge(5);
        ArrayList<User> al = new ArrayList<User>();
        al.add(u1);
        al.add(u2);

        return al;
    }
}
```

*AJAX处理*

```jsp
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;UTF-8" %>

<a href="javascript:void(0);" id="testException">访问springmvc后台controller，传递Json格式POJO</a><br/>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.3.1.min.js"></script>

<script type="text/javascript">
    $(function () {
        $("#testException").click(function(){
            $.ajax({
                contentType:"application/json",
                type:"POST",
                url:"save",
                /*通过修改参数，激活自定义异常的出现*/
                // name长度低于8位出现业务异常
                // age小于0出现业务异常
                // age大于100出现系统异常
                // age类型如果无法匹配将转入其他类别异常
                data:'{"name":"Jock","age":"111"}',
                dataType:"text",
                //回调函数
                success:function(data){
                    alert(data);
                }
            });
        });
    });
</script>
```

## 八、实用技术

#### 文件上传下载

![](http://images.hellocode.top/iSjbkICsWUGYnAr.png)

**MultipartResolver接口**

- MultipartResolver接口定义了文件上传过程中的相关操作，并对通用性操作进行了封装

  - MultipartResolver接口底层实现类CommonsMultipartResolver
  - CommonsMultipartResolver并未自主实现文件上传下载对应的功能，而是调用了apache的文件上传下载组件

  ```xml
  <!--文件上传下载-->
  <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.4</version>
  </dependency>
  ```

*SpringMVC配置*

```xml
<mvc:annotation-driven/>

<context:component-scan base-package="top.hellocode"/>

<!--配置文件上传处理器  id是multipartResolver，固定，不能变-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!--设置上传大小-->
    <property name="maxUploadSize" value="1024000000"/>
</bean>
```

*控制器*

```java
@RequestMapping(value = "/fileupload")
public void fileupload(MultipartFile file){
    // transferTo上传文件用的
    file.transferTo(new File("file.png"));
}
```

*页面表单*

```jsp
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;UTF-8" %>

<form action="/fileupload" method="post" enctype="multipart/form-data">
    <%--文件上传表单的name属性值一定要与controller处理器中方法的参数对应，否则无法实现文件上传--%>
    上传LOGO：<input type="file" name="file"/><br/>
    上传照片：<input type="file" name="file1"/><br/>
    上传任意文件：<input type="file" name="file2"/><br/>
    <input type="submit" value="上传"/>
</form>
```

> 注意：页面表单中的input的name值必须和控制器中的形参名一一对应，否则无法获取对应文件对象

**服务器上传文件注意事项**

1. 文件命名问题，获取上传文件名，并解析文件名与扩展名
   `file.getOriginalFilename();`

2. 文件名过长问题

3. 文件保存路径

   ```java
   ServletContext context = request.getServletContext();
   String basePath = context.getRealPath("/uploads");
   File file = new File(basePath + "/");
   if(!file.exists()) file.mkdirs();
   ```

4. 重名问题

   ```java
   String uuid = UUID.randomUUID().toString().replace("-","").toUpperCase();
   ```

```java
@RequestMapping(value = "/fileupload")
//参数中定义MultipartFile参数，用于接收页面提交的type=file类型的表单，要求表单名称与参数名相同
public String fileupload(MultipartFile file,MultipartFile file1,MultipartFile file2, HttpServletRequest request) throws IOException {
    System.out.println("file upload is running ..."+file);
    //        MultipartFile参数中封装了上传的文件的相关信息
    //        System.out.println(file.getSize());  文件大小
    //        System.out.println(file.getBytes().length);  文件所有的字节都在这个里面
    //        System.out.println(file.getContentType());   文件的类型
    //        System.out.println(file.getName());    file文件名
    //        System.out.println(file.getOriginalFilename());   上传的文件名
    //        System.out.println(file.isEmpty());   是否为空
    //首先判断是否是空文件，也就是存储空间占用为0的文件
    if(!file.isEmpty()){
        //如果大小在范围要求内正常处理，否则抛出自定义异常告知用户（未实现）
        //获取原始上传的文件名，可以作为当前文件的真实名称保存到数据库中备用
        String fileName = file.getOriginalFilename();
        //设置保存的路径
        String realPath = request.getServletContext().getRealPath("/images");
        //保存文件的方法，指定保存的位置和文件名即可，通常文件名使用随机生成策略产生，避免文件名冲突问题
        file.transferTo(new File(realPath,file.getOriginalFilename()));
    }
    //测试一次性上传多个文件
    if(!file1.isEmpty()){
        String fileName = file1.getOriginalFilename();
        //可以根据需要，对不同种类的文件做不同的存储路径的区分，修改对应的保存位置即可
        String realPath = request.getServletContext().getRealPath("/images");
        file1.transferTo(new File(realPath,file1.getOriginalFilename()));
    }
    if(!file2.isEmpty()){
        String fileName = file2.getOriginalFilename();
        String realPath = request.getServletContext().getRealPath("/images");
        file2.transferTo(new File(realPath,file2.getOriginalFilename()));
    }
    // 重名的问题：不使用用户上传的文件名，把上传的文件名封装成一个变量，再使用UUID重新赋一个名，这样用户的是用户的，服务器的是服务器的
     String uuid = UUID.randomUUID().toString().replace("-","").toUpperCase();
     return "page.jsp";
}
```

#### Restful

**Rest**

- Rest(REpresentational State Transfer)：一种网络资源的访问风格，定义了网络资源的访问方式
- 传统风格访问路径
  - `http://localhost/user/get?id=1`
  - `http://localhost/deleteUser?id=1`
- Rest风格访问路径
  - `http://localhost/user/1`
- Restful是按照Rest风格访问网络资源
- 优点
  - 隐藏资源的访问行为，通过地址无法得知做的是何种操作
  - 书写简化

**Rest行为约定方式**

- GET（查询）		`http://localhost/user/1   GET`
- POST（保存）		`http://localhost/user   POST`
- PUT（更新）		`http://localhost/user   PUT`
- DELETE（删除）		`http://localhost/user   DELETE`

> 注意：上述行为是约定方式，约定不是规范，可以打破，所以称Rest风格，而不是Rest规范

**Restful开发入门**

SpringMVC支持Restful

- 请求路径访问配置发生变化
  - 控制器定义方式发生变化
  - 页面调用方式发生变化

*Restful风格基本配置*

```java
//@Controller
//@ResponseBody
/*为如果要想返回的是字符串的话，
就必须在，每一个方法上面添加@ResponseBody，当@ResponseBody放在类上面时(现在的位置),
就可以省略在每一个方法上面添加@ResponseBody*/
//设置rest风格的控制器
@RestController/*可以使用这个注解替换@Controller和@ResponseBody*/
//设置公共访问路径，配合下方访问路径使用
@RequestMapping("/user")
public class UserController {

    //rest风格访问路径完整书写方式
    @RequestMapping("/user/{id}")//当类上面没有@RequestMapping("/user/")时，这个访问的是webapp里面的user目录下的success.jsp
	//@RequestMapping与参数的名称必须一样
    //使用@PathVariable注解获取路径上配置的具名变量，该配置可以使用多次，也就是说通过这个可以获取原先使用localhost/user?id=1，替换为localhost/user/1的效果一样，主要是获取地址栏的变量
    public String restLocation(@PathVariable Integer id){
        System.out.println("restful is running ....");
        return "success.jsp";
    }

    //rest风格访问路径简化书写方式，配合类注解@RequestMapping使用
    @RequestMapping("{id}")//当类上面有@RequestMapping("/user/")时，访问效果与上面的一样
	//@RequestMapping与参数的名称必须一样
	//@PathVariable：路径中的变量
    public String restLocation2(@PathVariable Integer id){
        System.out.println("restful is running ....get:"+id);//如果在浏览器地址栏输入localhost/user/100时，这里在控制台打印的是restful is running ....get:100
        return "success.jsp";
    }
}
```

**Restful风格配置**

![](http://images.hellocode.top/TLrWXixGBHKnsmb.png)

![](http://images.hellocode.top/YOneZAt4RbiTIDv.png)

![](http://images.hellocode.top/aWEDKSIX7Vhbr6p.png)

```java
//@Controller
//@ResponseBody
/*为如果要想返回的是字符串的话，
就必须在，每一个方法上面添加@ResponseBody，当@ResponseBody放在类上面时(现在的位置),
就可以省略在每一个方法上面添加@ResponseBody*/
//设置rest风格的控制器
@RestController/*可以使用这个注解替换@Controller和@ResponseBody*/
//设置公共访问路径，配合下方访问路径使用
@RequestMapping("/user")
public class UserController {

    //接收GET请求配置方式
    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    //接收GET请求简化配置方式
    @GetMapping("{id}")//等同于 @RequestMapping(value = "{id}",method = RequestMethod.GET)
    public String get(@PathVariable Integer id){
        System.out.println("restful is running ....get:"+id);//地址栏输入：localhost/page.jsp，访问page.jsp，此时jsp的form表单的method是post ，在控制台返回打印的是restful is running ....post:1
        return "success.jsp";
    }

    //接收POST请求配置方式
    @RequestMapping(value = "{id}",method = RequestMethod.POST)
    //接收POST请求简化配置方式
    @PostMapping("{id}")
    public String post(@PathVariable Integer id){
        System.out.println("restful is running ....post:"+id);
        return "success.jsp";
    }

    //接收PUT请求简化配置方式
    @RequestMapping(value = "{id}",method = RequestMethod.PUT)
    //接收PUT请求简化配置方式
    @PutMapping("{id}")
    public String put(@PathVariable Integer id){
        System.out.println("restful is running ....put:"+id);
        return "success.jsp";
    }

    //接收DELETE请求简化配置方式
    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    //接收DELETE请求简化配置方式
    @DeleteMapping("{id}")
    public String delete(@PathVariable Integer id){
        System.out.println("restful is running ....delete:"+id);
        return "success.jsp";
    }
}
```

**postman**

- 一款可以发送Restful风格请求的工具，方便开发调试，首次运行需要联网注册

![](http://images.hellocode.top/KfihaLkc5zHCZoM.png)

#### 表单校验

**表单校验分类**

- 校验位置
  - 客户端校验
  - 服务端校验
- 校验内容与对应方式
  - 格式校验
    - 客户端：使用js技术，利用正则表达式校验
    - 服务端：使用校验框架
  - 逻辑校验
    - 客户端：使用ajax发送要校验的数据，在服务端完成逻辑校验，返回校验结果
    - 服务端：接收到完整的请求后，在执行业务操作前，完成逻辑校验

**表单校验规则**

- 长度：例如用户名长度，评论字符数量
- 非法字符：例如用户名组成
- 数据格式：例如Email格式、IP地址格式
- 边界值：例如转账金额上限，年龄上下限
- 重复性：例如用户名是否重复
- ......

**表单校验框架**

- JSR（Java Specification Requests）：Java 规范提案
  - 303:提供bean属性相关校验规则
- JCP（Java Community Process）：Java社区

规范列表（简单了解）：

*企业应用技术*

- Contexts and Dependency Injection for Java (Web Beans 1.0) (JSR 299)
- Dependency Injection for Java 1.0 (JSR 330)@postConstruct, @PreDestroy
- *Bean Validation 1.0 (JSR 303)*
- Enterprise JavaBeans 3.1 (includes Interceptors 1.1) (JSR 318)
- Java EE Connector Architecture 1.6 (JSR 322)
- Java Persistence 2.0 (JSR 317)
- Common Annotations for the Java Platform 1.1 (JSR 250)
- Java Message Service API 1.1 (JSR 914)
- Java Transaction API (JTA) 1.1 (JSR 907)
- JavaMail 1.4 (JSR 919)

*Web应用技术*

- Java Servlet 3.0 (JSR 315)
- JavaServer Faces 2.0 (JSR 314)
- JavaServer Pages 2.2/Expression Language 2.2 (JSR 245)
- Standard Tag Library for JavaServer Pages (JSTL) 1.2 (JSR 52)

- Debugging Support for Other Languages 1.0 (JSR 45)

*模块化 (JSR 294)*

- Swing应用框架 (JSR 296)
- JavaBeans Activation Framework (JAF) 1.1 (JSR 925)
- Streaming API for XML (StAX) 1.0 (JSR 173)

*管理与安全技术*

- Java Authentication Service Provider Interface for Containers (JSR 196)
- Java Authorization Contract for Containers 1.3 (JSR 115)
- Java EE Application Deployment 1.2 (JSR 88)
- J2EE Management 1.1 (JSR 77)

*Java SE中与Java EE有关的规范*

- JCache API (JSR 107)
- Java Memory Model (JSR 133)
- Concurrency Utilitie (JSR 166)
- Java API for XML Processing (JAXP) 1.3 (JSR 206)
- Java Database Connectivity 4.0 (JSR 221)
- Java Management Extensions (JMX) 2.0 (JSR 255)
- Java Portlet API (JSR 286)

*Web Service技术*

- Java Date与Time API (JSR 310)
- Java API for RESTful Web Services (JAX-RS) 1.1 (JSR 311)
- Implementing Enterprise Web Services 1.3 (JSR 109)
- Java API for XML-Based Web Services (JAX-WS) 2.2 (JSR 224)
- Java Architecture for XML Binding (JAXB) 2.2 (JSR 222)
- Web Services Metadata for the Java Platform (JSR 181)
- Java API for XML-Based RPC (JAX-RPC) 1.1 (JSR 101)
- Java APIs for XML Messaging 1.3 (JSR 67)
- Java API for XML Registries (JAXR) 1.0 (JSR 93)

**Hibernate框架**

- 包含一套独立的校验框架hibernate-validator

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.1.0.Final</version>
</dependency>
```

> tomcat7：搭配hibernate-validator版本`5.*.*.Final`
>
> tomcat8.5↑：搭配hibernate-validator版本`6.*.*.Final`

**开启校验**

- 名称：`@Valid`、`@Validated`

- 类型：*形参注释*

- 位置：处理器类中的实体类类型的方法形参前方

- 作用：设定对当前实体类类型参数进行校验

- 范例

  ```java
  @RequestMapping("/addemployee")
  public String addEmployee(@Valid Employee employee){
      System.out.println(employee);
  }
  ```

  > 注意：开启校验仅能对实体类类型参数进行，校验是对实体类类型参数中的属性进行校验

**设定校验规则**

- 名称：`@NotNull`等

- 类型：*属性注解*等

- 位置：实体类属性上方

- 作用：设定当前属性校验规则

- 范例

  ```java
  public class Employee{
      @NotNull(message = "姓名不能为空")
      private String name;		// 员工姓名
  }
  ```

  > 每个校验规则所携带的参数不同，根据校验规则进行相应的调整
  >
  > 具体的校验规则查看对应的校验框架进行获取

**获取校验信息**

```java
@RequestMapping(value = "/addemployee")
public String addEmployee(@Valid Employee employee, Errors errors, Model model){
    System.out.println(employee);
    if(errors.hasErrors()){
        for(FieldError error : errors.getFieldErrors()){
            model.addAttribute(error.getField(),error.getDefaultMessage());
        }
        return "addemployee.jsp";
    }
    return "success.jsp";
}
```

通过形参Errors获取校验结果数据，通过Model接口将数据封装后传递到页面显示

```java
<form action="/addemployee" method="post">
    员工姓名：<input type="text" name="name"><span style="color:red">${name}</span><br/>
    员工年龄：<input type="text" name="age"><span style="color:red">${age}</span><br/>
    <input type="submit" value="提交">
</form>
```

页面获取后台封装的校验结果信息

**快速使用**

1. 编写实体类，存放表单数据。并且设置校验规则

   ```java
   @Data
   @NoArgsConstructor
   @AllArgsConstructor
   public class User {
       @NotBlank(message = "姓名不能为空")
       private String name;
   
       @NotNull(message = "年龄不能为空")//此处不能用NotBlank,因为该注解只能校验字符串，而age是数字
       @Max(message = "年龄不能超过100",value = 100)
       @Min(message = "年龄不能小于1",value = 1)
       private Integer age;
   }
   ```

2. 编写处理器，接受表单数据，并且启用校验

   ```java
   @Controller
   @RequestMapping("/user")
   @CrossOrigin
   public class UserController {
   
       @RequestMapping("/reg")
       @ResponseBody
       public Map method(@Validated User user, Errors errors){//errors中存放校验失败的提示信息
           HashMap<Object, Object> map = new HashMap<>();
           HashMap<Object, Object> errorInfo = new HashMap<>();//存放字段名对应的错误提示
           //判断是否有错误信息
           if(errors.hasErrors()){
               for (FieldError e : errors.getFieldErrors()) {//errors.getFieldErrors()获取所有的错误信息
                   //e.getField()表示获取属性名，e.getDefaultMessage()获取错误提示信息
                   errorInfo.put(e.getField(),e.getDefaultMessage());
               }
           }
   
           if(errorInfo.size()==0){//没有错误数据
               map.put("status",true);
           }else{
               map.put("status",false);
               map.put("errorInfos",errorInfo);
           }
   
           return map;
       }
   }
   ```

3. 测试

*步骤小结*

1. 方法参数上开启校验：@Valid 、 @Validated
2. Bean的属性上设置校验规则：@NotBlank(message = “姓名不能为空”)
3. 通过参数Errors获取错误信息
   - 获取所有错误：errors.getFieldErrors()
   - 获取错误字段：error.getField()
   - 获取错误提示：error.getDefaultMessage()
   - 将错误信息放置到model中显示给用户 -> JSP页面中${name}

**实际的校验规则**

- 同一个字段有多个约束条件
- 引用类型字段如何校验
- 根据业务不同需要调整是否参与校验

**多规则校验**

同一个字段有多个约束条件，比如对于年龄的校验:

if (age !=null && age >18 && age < 60)

```java
@NotNull(message = "请输入您的年龄")
@Max(value = 60,message = "年龄最大值不允许超过60岁")
@Min(value = 18,message = "年龄最小值不允许低于18岁")
private Integer age;//员工年龄
```

**嵌套校验**

引用类型字段如何校验，比如Employee中有address属性记录地址

- 名称：`@Valid`
- 类型：*属性注解*
- 位置：实体类中的引用类型属性上方
- 作用：设定当前应用类型属性中的属性开启校验

1. 在address属性上添加@Valid注解，开启嵌套属性校验

   ```java
   public class Employee {
       //实体类中的引用类型通过标注@Valid注解，设定开启当前引用类型字段中的属性参与校验
       @Valid
       private Address address;
       
       //添加address属性的get，set方法
   }
   ```

2. 开启嵌套校验后，被校验对象内部需要添加对应的校验规则，并添加嵌套属性的get，set方法

   ```java
   //嵌套校验的实体中，对每个属性正常添加校验规则即可
   public class Address {
       @NotBlank(message = "请输入省份名称")
       private String provinceName;//省份名称
   
       @NotBlank(message = "请输入城市名称")
       private String cityName;//城市名称
   
       @NotBlank(message = "请输入详细地址")
       private String detail;//详细住址
   
       @NotBlank(message = "请输入邮政编码")
       @Size(max = 6, min = 6, message = "邮政编码由6位组成")
       private String zipCode;//邮政编码
       
       //添加get，set方法
       
   }
   ```

   ```java
   @PostMapping(value = "/addemployee")
   public String addEmployee(@Valid Employee employee, Errors errors, Model m) {
       //Errors对象用于封装校验结果，如果不满足校验规则，对应的校验结果封装到该对象中，包含校验的属性名和校验不通过返回的消息
       //判定Errors对象中是否存在未通过校验的字段
       if (errors.hasErrors()) {
           //获取所有未通过校验规则的信息
           List<FieldError> fieldErrors = errors.getFieldErrors();
           for (FieldError error : fieldErrors) {
               //将校验结果信息添加到Model对象中，用于页面显示，后期实际开发中无需这样设定，返回json数据即可
               //name = 姓名不能为空 -> ${name}
               m.addAttribute(error.getField(), error.getDefaultMessage());
               //address.cityName = 请输入城市名称 -> ${requestScope['address.provinceName']}
               //m.addAttribute("address.provinceName", "请输入省份名称");
           }
   
           //el获取对象属性值
           Address address = new Address();
           address.setProvinceName("test省份不能为空");
           //${address.provinceName}
           m.addAttribute("address", address);
   
           //当出现未通过校验的字段时，跳转页面到原始页面，进行数据回显
           return "addemployee.jsp";
       }
       return "success.jsp";
   }
   ```

3. 在jsp页面中获取嵌套属性中的错误信息
   `${requestScope['address.cityName']}`

   ```jsp
   <%--注意，引用类型的校验未通过信息不是通过对象进行封装的，直接使用对象名.属性名的格式作为整体属性字符串进行保存的，和使用者的属性传递方式有关，不具有通用性，仅适用于本案例--%>
   省：<input type="text" name="address.provinceName"><span style="color:red">${requestScope['address.provinceName']}</span><br/>
   市：<input type="text" name="address.cityName"><span
                                                      style="color:red">${requestScope['address.cityName']}</span><br/>
   ```

*3种判定空校验器的区别*

- String 选择@NotBlank，底层会调用"字符串".trim()清除前后空格

- int, double 选择@NotNull，不能使用@NotBlank

- 数组选择@NotEmpty

| 表单数据           | @NotNull | @NotEmpty | @NotBlank |
| ------------------ | -------- | --------- | --------- |
| String s = null;   | false    | false     | false     |
| String s = "";     | true     | false     | false     |
| String s = "    "; | true     | true      | false     |
| String s = "Jock"; | true     | true      | true      |

**分组校验**
根据业务不同需要调整是否参与校验，比如同一个模块，新增和修改时校验规则是不一致的

- 新增用户：新增时用户名不能为空
- 修改用户：修改时不能修改用户名，所以不用强制用户名不能为空

> 解决方案：对不同种类的属性进行分组，在校验时可以指定参与校验的字段所属的组类

1. 根据业务类型使用接口定义分组为Save, Update

   ```java
   public interface Save {
   }
   ```

   ```java
   public interface Update {
   }
   ```

2. 在实体类Employee中为属性设置所属组，可以设置多个
   姓名不能为空只在新增时校验

   ```java
   @NotEmpty(message = "姓名不能为空",groups = {Save.class})
   private String name;//员工姓名
   ```

   年龄校验新增和修改都需要校验

   ```java
   @NotEmpty(message = "年龄不能为空",groups = {Save.class, Update.class})
   private Integer age;//员工年龄
   ```

3. 在Controller的方法参数上开启分组校验，并指定使用哪一种分组：@Validated({Save.class})

   ```java
   //新增Employee
   @RequestMapping("/addemployee")
   public String addEmployee(@Validated({Save.class}) Employee employee,
                                Errors errors, Model m) {
   }
   
   //更新Employee
   @PostMapping(value = "/updateEmployee")
   public String updateEmployee(@Validated({Update.class}) EmployeeGroup employee,
                                Errors errors, Model m) {
   }
   ```

## 九、SSM整合

**SSM（Spring+SpringMVC+Mybatis）**

- Spring（框架基础）
- Mybatis（mysql+druid+pagehelper）
- Spring整合Mybatis（junit测试业务层接口）
- SpringMVC
  - rest风格（postman测试请求结果）
  - 数据封装json（jackson）
- Spring整合SpringMVC
  - Controller调用Service
- 其他
  - 表现层数据封装
  - 自定义异常

**案例环境**

![](http://images.hellocode.top/jPc9OXoJDLwszgC.png)

#### SSM整合

**Part0：项目基础结构搭建**

- 创建项目，组织项目结构，创建包
- 创建表与实体类
- 创建三层架构对应的模块、接口与实现类，建立关联关系
  - 数据层接口（代理自动创建实现类）
  - 业务层接口+业务层实现类
  - 表现层类

![](http://images.hellocode.top/f4JIsrMPQDpXENh.png)

```java
package top.hellocode.service;

import com.github.pagehelper.PageInfo;
import org.springframework.transaction.annotation.Transactional;
import top.hellocode.domain.Student;

import java.util.List;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月11日 16:25
 */
@Transactional(readOnly = true)
public interface StudentService {
    /**
     * @Description:新增学生信息
     * @param student:
     * @return: void
     */
    @Transactional(readOnly = false)
    public void save(Student student);

    /**
     * @Description:删除学生信息
     * @param id:
     * @return: void
     */
    @Transactional(readOnly = false)
    public void delete(Integer id);

    /**
     * @Description:修改学生信息
     * @param student:
     * @return: void
     */
    @Transactional(readOnly = false)
    public void update(Student student);

    /**
     * @Description:查询单个学生信息
     * @param :
     * @return: void
     */
    public Student get(Integer id);

    /**
     * @Description:查询全部学生信息
     * @param :
     * @return: void
     */
    public PageInfo<Student> getAll(int page, int size);
}
```



**Part1+Part2：SSM整合**

- 创建MyBatis映射文件
- 创建Spring配置文件
  - 组件扫描
- 整合MyBatis到Spring环境中
  - SqlSessionFactoryBean
  - 数据源（druid+jdbc.properties）
  - 映射扫描
  - 注解事务
  - 分页插件
- 创建单元测试

*配置分页插件与事务*

*整合junit测试业务层接口*

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.46</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.21</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.3</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.3</version>
    </dependency>
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper</artifactId>
        <version>5.1.2</version>
    </dependency>


    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.9.0</version>
    </dependency>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
    </dependency>
</dependencies>

<!--TomCat插件-->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <port>80</port>
                <path>/</path>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="top.hellocode.dao.StudentDao">
    <insert id="save" parameterType="top.hellocode.domain.Student">
        INSERT INTO student(name,age,birthday)VALUES(#{name},#{age},#{birthday})
    </insert>

    <delete id="delete" parameterType="int">
        DELETE FROM student WHERE uuid = #{id}
    </delete>

    <update id="update" parameterType="top.hellocode.domain.Student">
        UPDATE student SET name=#{name},age=#{age},birthday=#{birthday} WHERE uuid=#{uuid}
    </update>

    <select id="get" parameterType="int" resultType="top.hellocode.domain.Student">
        select * from student where uuid=#{id}
    </select>

    <select id="getAll" resultType="top.hellocode.domain.Student">
        select * from student
    </select>
</mapper>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd">

    <context:component-scan base-package="top.hellocode">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <context:property-placeholder location="classpath:*.properties"/>
    <!--注解事务驱动-->
    <tx:annotation-driven transaction-manager="txManager"/>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <bean class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="typeAliasesPackage" value="top.hellocode.domain"/>
        <property name="plugins">
            <array>
                <bean class="com.github.pagehelper.PageInterceptor">
                    <property name="properties">
                        <props>
                            <prop key="helperDialect">mysql</prop>
                            <prop key="reasonabke">true</prop>
                        </props>
                    </property>
                </bean>
            </array>
        </property>
    </bean>

    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="top.hellocode.dao"/>
    </bean>

    <!--事务-->
    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
</beans>
```

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://192.168.23.129/springmvc_ssm
jdbc.username=root
jdbc.password=密码
```

```java
package top.hellocode.service;

import com.github.pagehelper.PageInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import top.hellocode.domain.Student;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月11日 17:14
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class StudentServiceTest {
    @Autowired
    private StudentService studentService;

    @Test
    public void getAll() {
        PageInfo<Student> all = studentService.getAll(1, 10);
        for (Student student : all.getList()) {
            System.out.println(student);
        }
    }
}
```

**Part3：SpringMVC**

- web.xml加载SpringMVC
- rest风格
- 数据封装为json数据

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<!--
  - This is the Cocoon web-app configurations file
  -
  - $Id$
  -->
<web-app version="2.4"
         xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">

  <!-- Servlet Filters ================================================ -->

  <!--
    - Declare a filter for multipart MIME handling
    -->
  <!--加载spring核心配置文件-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>

  <!--启动服务时，通过监听器加载spring运行环境-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>

  <filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>


  <servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
  </servlet>

  <servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven/>

    <context:component-scan base-package="top.hellocode.controller"/>
</beans>
```

**Part4：Spring整合SpringMVC**

- web.xml加载Spring环境
- Controller调用Service

```java
package top.hellocode.controller;

import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.hellocode.controller.results.Code;
import top.hellocode.controller.results.Result;
import top.hellocode.domain.Student;
import top.hellocode.service.StudentService;

import java.util.List;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月11日 16:25
 */
@RestController
@RequestMapping("/stu")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public Result save(Student student){
        try{
            studentService.save(student);
            return new Result(Code.SAVE_OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new Result(Code.SAVE_ERR);
        }
    }

    @DeleteMapping("{uuid}")
    public Result delete(@PathVariable Integer uuid){
        try{
            studentService.delete(uuid);
            return new Result(Code.DEL_OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new Result(Code.DEL_ERR);
        }
    }

    @PutMapping
    public Result update(Student student){
        try{
            studentService.update(student);
            return new Result(Code.UPDATE_OK);
        }catch (Exception e){
            e.printStackTrace();
            return new Result(Code.UPDATE_ERR);
        }
    }

    @GetMapping("{uuid}")
    public Result get(@PathVariable Integer uuid){
        try{
            Student student = studentService.get(uuid);
            return new Result(Code.GET_OK,student);
        }catch (Exception e){
            e.printStackTrace();
            return new Result(Code.GET_ERR);
        }
    }

    @GetMapping("{page}/{size}")
    public Result getAll(@PathVariable Integer page, @PathVariable Integer size){
        try{
            PageInfo<Student> all = studentService.getAll(page, size);
            return new Result(Code.GET_OK,all);
        }catch (Exception e){
            e.printStackTrace();
            return new Result(Code.GET_ERR);
        }
    }
}
```

**Part5-1：表现层数据封装**

前端接收表现层返回的数据种类

- 操作是否成功：true/false
- 单个数据：1,100,true,...
- 对象数据：json对象,...
- 集合数据：json数组,...

*返回数据格式设计*

- 状态
- 数据
- 消息

*返回数据状态设计*

- 根据业务不同设计不同的状态码
  - 404
  - 500
  - 200
  - ......

```java
package top.hellocode.controller.results;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月12日 9:36
 */
public class Result {
    private Integer code;      //结果编码
    private Object data;    // 返回数据
    private String message;     // 消息

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Result(Integer code) {
        this.code = code;
    }

    public Result(Integer code, Object data) {
        this.code = code;
        this.data = data;
    }

    public Result(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}

```

```java
package top.hellocode.controller.results;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月12日 9:36
 */
public class Code {
    // 成功
    public static final Integer SAVE_OK = 20011;
    public static final Integer DEL_OK = 20021;
    public static final Integer UPDATE_OK = 20031;
    public static final Integer GET_OK = 20041;

    // 失败
    public static final Integer SAVE_ERR = 20010;
    public static final Integer DEL_ERR = 20020;
    public static final Integer UPDATE_ERR = 20030;
    public static final Integer GET_ERR = 20040;
}
```

**Part5-2：自定义异常**

- 设定自定义异常，封装程序执行过程中出现的问题，便于表现层进行统一的异常拦截并进行处理
  - BusinessException
  - SystemException
- 自定义异常消息返回时需要与业务正常执行的消息按照统一的格式进行处理

```java
package top.hellocode.system.exception;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月12日 9:48
 */
public class BusinessException extends RuntimeException{
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public BusinessException() {
        super();
    }

    public BusinessException(String message,Integer code) {
        super(message);
        this.code = code;
    }

    public BusinessException(String message, Throwable cause,Integer code) {
        super(message, cause);
        this.code = code;
    }

    public BusinessException(Throwable cause,Integer code) {
        super(cause);
        this.code = code;
    }

    protected BusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace,Integer code) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.code = code;
    }
}
```

```java
package top.hellocode.controller.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import top.hellocode.controller.results.Result;
import top.hellocode.system.exception.BusinessException;

/**
 * @author HelloCode
 * @site https://www.hellocode.top
 * @date 2022年08月12日 9:50
 */
@Component
@ControllerAdvice
public class ProjectExceptionAdvice {
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public Result doBusinessException(BusinessException e){
        return new Result(e.getCode(),e.getMessage());
    }
}
```

#### 注解版SSM整合

**web.xml**

- 同前期设置，添加加载spring核心配置文件,生成spring核心容器(主容器/父容器/根容器）

  ```java
  package top.hellocode.config;
  
  import org.springframework.web.context.WebApplicationContext;
  import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
  import org.springframework.web.filter.CharacterEncodingFilter;
  import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;
  
  import javax.servlet.*;
  import java.util.EnumSet;
  
  /**
   * @author HelloCode
   * @site https://www.hellocode.top
   * @date 2022年07月23日 15:54
   */
  public class ServletContainerInitConfig extends AbstractDispatcherServletInitializer {
      protected WebApplicationContext createServletApplicationContext() {
          AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
          ctx.register(SpringMVCConfig.class);
          return ctx;
      }
  
      protected String[] getServletMappings() {
          return new String[]{"/"};
      }
  
      protected WebApplicationContext createRootApplicationContext() {
          AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
          ctx.register(SpringConfig.class);
          return ctx;
      }
  
      @Override
      public void onStartup(ServletContext servletContext) throws ServletException {
          super.onStartup(servletContext);
  
          CharacterEncodingFilter filter = new CharacterEncodingFilter();
          filter.setEncoding("UTF-8");
          FilterRegistration.Dynamic registration = servletContext.addFilter("characterEncodingFilter", filter);
          registration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST,DispatcherType.FORWARD,DispatcherType.INCLUDE),false,"/*");
      }
  }
  ```

- 父容器：spring环境加载后形成的容器，包含spring环境下所有的bean
- 子容器：当前springmvc环境加载后形成的容器，不包含spring环境下的bean
- 子容器可以访问父容器中的资源，父容器不可用访问子容器中的资源

**applicationContext.xml**

```java
//扫描组件，排除SpringMVC对应的bean，等同于<context:component-scan />
@ComponentScan(value = "com.itheima",excludeFilters = {
    @ComponentScan.Filter(type= FilterType.ANNOTATION,classes = {Controller.class})})
@PropertySource("classpath:jdbc.properties")
@Import({JdbcConfig.class,MyBatisConfig.class})
//等同于<tx:annotation-driven transaction-manager="txManager"/>，导入的默认名称为transactionManager
@EnableTransactionManagement
public class SpringConfig {
    //等同于<bean   class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    @Bean("transactionManager")
    public DataSourceTransactionManager getDataSourceTxManager(@Autowired DataSource dataSource){
        DataSourceTransactionManager dtm = new DataSourceTransactionManager();
        //等同于<property name="dataSource" ref="dataSource"/>
        dtm.setDataSource(dataSource);
        return dtm;
    }
}  
```

**spring-mvc.xml**

```java
@Configuration
@ComponentScan("test.controller")
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {
}
```

> *EnableWebMvc*
> 支持ConversionService的配置，可以方便配置自定义类型转换器
> 支持@NumberFormat注解格式化数字类型
> 支持@DateTimeFormat注解格式化日期数据，日期包括Date,Calendar,JodaTime（JodaTime要导包）
> 支持@Valid的参数校验(需要导入JSR-303规范)
> 配合第三方jar包和SpringMVC提供的注解读写XML和JSON格式数据

**UserDao.xml**

**jdbc.properties（保留）**