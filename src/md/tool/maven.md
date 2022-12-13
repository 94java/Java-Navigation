---
title: "Maven"
order: 4
category:
  - 工具 | 部署
---

# Maven

## Maven基础

### 基本概念

**传统项目管理状态分析**

- jar包不统一，jar包不兼容
- 工程升级维护过程操作繁琐
- ......

#### Maven是什么

- Maven的本质是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型
- POM(Project Object Model)：项目对象模型

![](http://images.hellocode.top/Gh9ZiXqP1yIsOJg.png)

*作用*

- 项目构建：提供标准的、跨平台的自动化项目构建方式
- 依赖管理：方便快捷的管理项目依赖的资源（jar包），避免资源间的版本冲突问题
- 统一开发结构：提供标准的、统一的项目结构

#### 下载与安装

- 官网：http://maven.apache.org
- 下载地址：http://maven.apache.org/download.cgi
- Maven属于绿色版软件，解压即安装
  ![](http://images.hellocode.top/AhGVCyN91pTIezR.png)
- 依赖Java，需要配置JAVA_HOME
- 设置MAVEN自身的运行环境，需要配置MAVEN_HOME
- 测试环境配置结果（命令行）
  `MVN`

#### 仓库

- 仓库：用于存储资源，包含各种jar包

> jar包获取过程：先在本地仓库查找，如果没有，就去中央仓库获取
>
> 中央仓库由Maven开发团队自己维护，包含了全世界99%的jar包

- 中央仓库不在国内，随着用户的增多，下载速度可能会很慢
  对应的解决方法就是私服，就是自己的公司服务器从中央仓库获取到自己所需的资源，保存到私服，速度非常快

**分类**

- 本地仓库：用于存储资源，包含各种jar包
- 远程仓库：非本机电脑上的仓库，为本地仓库提供资源
  - 中央仓库：Maven团队维护，存储所有资源的仓库
  - 私服：部门/公司范围内存储资源的仓库，从中央仓库获取资源

*私服的作用*

- 保存具有版权的资源，包含购买或自主研发的jar
  - 中央仓库中的jar都是开源的，不能存储具有版权的资源
- 一定范围内共享资源，仅对内部开放，不对外共享

#### 坐标

**什么是坐标？**

- Maven中的坐标用于描述仓库中资源的位置
- https://repo1.maven.org/maven2
- https://mvnrepository.com/【牢记】

**主要组成**

- groupId：定义当前Maven项目隶属组织名称（通常是域名反写，例如：org.mybatis）
- artifactId：定义当前Maven项目名称（通常是模块名称，例如CRM、SMS）
- version：定义当前项目版本号
- packaging：定义该项目的打包方式（不属于Maven坐标，会用到，简单了解）

**作用**

- 使用唯一标识，唯一性定位资源位置，通过该标识可以将资源的识别与下载工作交由机器完成

#### 仓库配置

**生成本地仓库**

- 使用win+R打开命令行输入MVN

- 在C盘，user目录下，对应你的用户名下会生成一个m2文件夹，就是本地仓库

*自定义本地仓库位置*

- 在D盘新建一个目录，在该目录下创建一个repository文件夹作为本地仓库

- 修改mvean的安装文件夹中conf下的settings.xml文件
  ![](http://images.hellocode.top/C4z3xOf9WYRBKjn.png)
- 把settings.xml文件，复制到自定义仓库目录下（和respository同层）

*Maven启动后，会自动保存下载的资源到本地仓库*

- 默认位置
  `<localRepository>${user.home}/.m2/repository</localRepository>`
  当前目录位置为登录用户名所在目录下的.m2文件夹中

- 自定义位置
  `<localRepository>E:\maven\repository</localRepository>`
  当前目录位置为E:\maven\repository文件夹中，要求此目录同级必须有一个setting.xml文件

- 在用户setting文件中配置阿里云镜像仓库

  ```xml
  <mirrors>
  	<!--配置具体的仓库下载镜像-->
      <mirror>
      	<!--此镜像的唯一标识符，用来区分不同的mirror元素-->
          <id>nexus-aliyun</id>
          <!--对哪种仓库进行镜像，简单说就是替代哪个仓库-->
          <mirrorOf>central</mirrorOf>
          <!--镜像名称-->
          <name>Nexus aliyun</name>
          <!--镜像URL-->
          <url>http://maven.aliyun.com/nexus/content/groups/public</url>
      </mirror>
  </mirrors>
  ```

  ![](http://images.hellocode.top/JbkNUzYc1WtHjxi.png)

  > 修改配置后别忘了替换本地仓库中的setting文件

*全局setting与用户setting区别*

- 全局setting定义了当前计算机中Maven的公共配置
- 用户setting定义了当前用户的配置
- 这两个东西尽量保持一致

### 快速入门

#### 手工制作

**目录结构**

![](http://images.hellocode.top/qX1xGUezyLQv6Bj.png)

**pom.xml文件**（与src同级）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
  
	<groupId>top.hellocode</groupId>
	<artifactId>project</artifactId>
	<version>1.0</version>
	<packaging>jar</packaging>

	<dependencies>
		<dependency>
		  <groupId>junit</groupId>
		  <artifactId>junit</artifactId>
		  <version>4.12</version>
		</dependency>
	</dependencies>
</project>
```

**Maven项目构建命令**

- Maven构建命令使用mvn开头，后面添加功能参数，可以一次执行多个命令，使用空格分割

  ```shell
  mvn compile		# 编译
  mvn clean		# 清理
  mvn test		# 测试
  mvn package		# 打包
  mvn install		# 安装到本地仓库
  ```

  > 在pom.xml所在文件夹内执行上述 DOS命令（cmd）
  >
  > 第一次执行上述指令，都会先下载对应的插件等等

**插件创建工程**

- 创建工程

  ```shell
  mvn archetype:generate
  	-DgroupId={project-packaging}
  	-DartifactId={project-name}
  	-DarchetypeArtifactId=maven-archetype-quickstart
  	-DinteractiveMode=false
  ```

*范例*

- 创建Java工程

  ```shell
  mvn archetype:generate -DgroupId=top.hellocode -DartifactId=java-project -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
  ```

- 创建web工程

  ```shell
  mvn archetype:generate -DgroupId=top.hellocode -DartifactId=web-project -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
  ```

> 使用插件创建工程要求所在文件夹不是一个maven工程的目录，也就是没有pom.xml文件

> web工程目录比Java工程目录多一个webapp目录

#### IDEA生成

**配置Maven**

- IDEA2019版本对3.6.2及以上版本存在兼容性问题，为避免冲突，IDEA中安装使用3.6.1版本

  > 这里我使用的IDEA是2021版本，使用3.8.1及以下的maven版本没有问题，只需要在maven官网下载3.8.1的版本，解压，将之前配置好的setting文件替换掉新下载的setting文件即可

![](http://images.hellocode.top/pcfZ2JTPK7qaFuE.png)

![](http://images.hellocode.top/DIMKtnjpHGVhgE8.png)

![](http://images.hellocode.top/POJojzUmMGAkiEg.png)

*创建Maven工程*

![](http://images.hellocode.top/PG4LrdzKSkgTE9N.png)

![](http://images.hellocode.top/j5oeD9TkIfq4JcC.png)

**骨架创建Maven工程**

*Java工程*

![](http://images.hellocode.top/BiDl5roWy6x7jdS.png)

![](http://images.hellocode.top/zAm3R9fyJcQXLwY.png)

*web工程*

![](http://images.hellocode.top/xTBoGCm4qDAKhl2.png)

![](http://images.hellocode.top/OuVocnGqyFSY7e4.png)

**Tomcat插件安装与web工程启动**

- 下载插件：https://mvnrepository.com/artifact/org.apache.tomcat.maven/tomcat7-maven-plugin

web01的pom：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
-->
<!-- $Id: pom.xml 642118 2008-03-28 08:04:16Z reinhard $ -->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <!--指定pom的模型版本，默认会加-->
  <modelVersion>4.0.0</modelVersion>
  <!--打包方式，Java是jar，web是war-->
  <packaging>war</packaging>

  <!--组织ID-->
  <groupId>top.hellocode</groupId>
  <!--项目ID-->
  <artifactId>web01</artifactId>
  <!--版本号：release（完成版），SNAPSHOT（开发版）-->
  <version>1.0-SNAPSHOT</version>


  <!--设置当前工程的所有依赖-->
  <dependencies></dependencies>
  <!--构建-->
  <build>
    <!--设置插件-->
    <plugins>
      <!--具体插件配置-->
      <plugin>
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat.maven/tomcat7-maven-plugin -->
          <groupId>org.apache.tomcat.maven</groupId>
          <artifactId>tomcat7-maven-plugin</artifactId>
          <version>2.1</version>
          <configuration>
            <!--端口-->
            <port>80</port>
            <!--虚拟路径-->
            <path>/</path>
          </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

> 具体的插件配置中的内容可以在https://mvnrepository.com/中复制

*启动*

![](http://images.hellocode.top/VCOG2F8tWRnzuow.png)

*配置tomcat*

![](http://images.hellocode.top/X1qNBMLpxOAPGIs.png)

### 依赖管理与生命周期

#### 依赖配置与传递

- 依赖指当前项目运行所需的jar，一个项目可以设置多个依赖

- 格式

  ```xml
  <!--设置当前项目所依赖的所有jar-->
  <dependencies>
      <!--设置具体的依赖-->
      <dependency>
          <!--依赖所属群组id-->
          <groupID>junit</groupID>
          <!--依赖所属项目id-->
          <artifactID>junit</artifactID>
  		<!--依赖版本号-->
          <version>4.12</version>
      </dependency>
  </dependencies>
  ```

**依赖传递**

![](http://images.hellocode.top/B2EcqWmT8elL93p.png)

> 依赖具有传递性

- 直接依赖：在当前项目中通过依赖配置建立的依赖关系
- 间接依赖：被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

> 这两个是相对概念

*冲突问题*

- 路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
- 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的

- 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的

*可选依赖*

- 可选依赖指对外隐藏当前所依赖的资源——不透明

  ```xml
  <dependency>
      <groupID>junit</groupID>
      <artifactID>junit</artifactID>
      <version>4.12</version>
     	<!--设置不透明（默认false）--> 
      <optional>true</optional>
  </dependency>
  ```

*排除依赖*

- 排除依赖指主动断开依赖的资源，被排除的资源无需指定版本——不需要

```xml
<dependency>
    <groupID>junit</groupID>
    <artifactID>junit</artifactID>
    <version>4.12</version>
	<!--排除依赖-->    
    <exclusions>
        <exclusion>
			<!--不需要写版本，是排除所有-->
    		<groupID>junit</groupID>
    		<artifactID>junit</artifactID>
        </exclusion>
    </exclusions>
</dependency>
```

#### 依赖范围

- 依赖的jar默认情况可以在任何地方使用，可以通过scope标签设定其作用范围
- 作用范围
  - 主程序范围有效（main文件夹范围内）
  - 测试程序范围有效（test文件夹范围内）
  - 是否参与打包（package指令范围内）

| scope         | 主代码 | 测试代码 | 打包 | 范例        |
| ------------- | ------ | -------- | ---- | ----------- |
| compile(默认) | Y      | Y        | Y    | log4j       |
| test          |        | Y        |      | junit       |
| provided      | Y      | Y        |      | servlet-api |
| runtime       |        |          | Y    | jdbc        |

*带有依赖范围的资源在进行传递时，作用范围将受到影响*(了解即可)

|          | compile | test | provided | runtime |
| -------- | ------- | ---- | -------- | ------- |
| compile  | compile | test | provided | runtime |
| test     |         |      |          |         |
| provided |         |      |          |         |
| runtime  | runtime | test | provided | runtime |

#### 生命周期与插件

**项目构建生命周期**

- Maven构建生命周期描述的是一次构建过程经历了多少个事件
- 大体分为三个阶段
  - clean：清理阶段
  - default：核心工作，例如：编译、测试、打包、部署等
  - site：产生报告，发布站点等

![](http://images.hellocode.top/BQo9CNjAMgcyGq4.png)

*clean生命周期*

- pre-clean：执行一些需要在clean之前完成的工作
- clean：移除所有上一次构建生成的文件
- post-clean：执行一些需要在clean之后立刻完成的工作

*site构建生命周期*

- pre-site：执行一些需要在生成站点文档之前完成的工作
- site：生成项目的站点文档
- post-site：执行一些需要在生成站点文档之后完成的工作，并且为部署做准备
- site-deploy：将生成的站点文档部署到特定服务器上

![](http://images.hellocode.top/4MV8W5vkoXJbhlD.png)

> 生命周期中的事，都是挨着从前往后做，例如做test时，就需要先完成test之前的工作

**插件**

- 插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应的插件功能
- 默认maven在各个生命周期上绑定有预设的功能
- 通过插件可以自定义其他功能

```xml
<!--构建-->
<build>
    <!--设置插件-->
    <plugins>
        <!--具体插件配置-->
        <plugin>
            <!-- https://mvnrepository.com/artifact/org.apache.tomcat.maven/tomcat7-maven-plugin -->
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-source-plugin</artifactId>
            <version>2.1.1</version>
            <executions>
                <execution>
                	<goals>
                    	<goal>jar</goal>
                	</goals>
               		<!--执行阶段--> 
                	<phase>generate-test-resources</phase>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```



## Maven高级

### 分模块开发与设计

![](http://images.hellocode.top/gHTmIqxsnCPEfvX.png)

#### ssm_pojo拆分

- 新建模块
- 拷贝原始项目中对应的相关内容到ssm_pojo模块中
  - 实体类（Student）
  - 配置文件（无）

#### ssm_dao拆分

- 新建模块
- 拷贝原始项目中对应的相关内容到ssm_dao模块中
  - 数据层接口（StudentDao）
  - 配置文件：保留与数据层相关的配置文件（3个）
    - 注意：分页插件本应该在service中进行，但是在配置中与SqlSessionFactoryBean绑定，需要保留
  - pom.xml：引入数据层相关坐标即可，删除springmvc相关坐标
    - spring
    - mybatis
    - spring整合mybatis
    - mysql
    - druid
    - pagehelper
    - 直接依赖ssm_pojo（对ssm_pojo需要执行install指令，将对应的jar包安装到本地仓库）

#### ssm_service拆分

- 新建模块
- 拷贝原始项目中对应的相关内容到ssm_service模块中
  - 业务层接口与实现类（UserService、UserServiceImpl）
  - 配置文件：保留与数据层相关配置文件（1个）
  - pom.xml：引入数据层相关坐标即可，删除springmvc相关坐标
    - spring
    - junit
    - spring整合junit
    - 直接依赖ssm_dao（对ssm_dao模块执行install指令，将其安装到本地仓库）
    - 间接依赖ssm_pojo（由ssm_dao模块负责依赖关系的建立）
  - 修改service模块spring核心配置文件名，添加模块名称，格式：applicationContext-service.xml
  - 修改dao模块spring核心配置文件名，添加模块名称，格式：applicationContext-dao.xml
  - 修改单元测试引入的配置文件名称，由单个文件修改为多个文件

#### ssm_controller拆分

- 新建模块（使用webapp模板）
- 拷贝原始项目中对应的相关内容到ssm_controller模块中
  - 表现层控制器类与相关设置类（StudentController、异常相关、......）
  - 配置文件：保留与表现层相关配置文件（1个）、服务器相关配置文件（1个）
  - pom.xml：引入表现层相关坐标即可，删除mybatis相关坐标
    - spring
    - springmvc
    - jackson
    - servlet
    - tomcat服务器插件
    - 直接依赖ssm_service（对ssm_service模块执行install指令，将其安装到本地仓库）
    - 间接依赖ssm_dao、ssm_pojo
  - 修改web.xml配置文件中加载spring环境的配置文件名称，使用*通配，加载所有applicationContext-开始的配置文件

#### 小节

**分模块开发**

- 模块中仅包含当前模块对应的功能类与配置文件
- spring核心配置根据模块功能不同进行独立制作
- 当前模块所依赖的模块通过导入坐标的形式加入当前模块后才可以使用
- web.xml需要加载所有的spring核心配置文件

### 高级特性

#### 聚合

- 作用：聚合用于快速构建maven工程，一次构建多个项目/模块

*制作方式*

- 创建一个空模块，打包类型定义为pom
  `<packaging>pom</packaging>`

- 定义当前模块进行构建操作时关联的其他模块名称

  ```xml
  <modules>
      <module>../ssm_pojo</module>
      <module>../ssm_dao</module>
      <module>../ssm_service</module>
      <module>../ssm_controller</module>
  </modules>
  ```

> 参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关

#### 继承

- 作用：通过继承可以实现在子工程中沿用父工程中的配置
  - maven中的继承与java中的继承相似，在子工程中配置继承关系

*制作方式*

- 在子工程中声明其父工程坐标与对应的位置

  ```xml
  <!--定义该工程的父工程-->
  <parent>
  	<groupId>top.hellocode</groupId>
      <artifactId>ssm</artifactId>
      <version>1.0-SNAPSHOT</version>
      <!--填写父工程的pom文件-->
      <relativePath>../ssm/pom.xml</relativePath>
  </parent>
  ```

- 在父工程中定义依赖管理

  ```xml
  <!--声明此处进行依赖管理-->
  <dependencyManagement>
  	<!--具体的依赖-->
      <dependencies>
      	<!--spring环境-->
          <dependency>
          	<groupId>org.springframework</groupId>
      		<artifactId>spring-context</artifactId>
      		<version>5.1.9.RELEASE</version>
          </dependency>
      </dependencies>
  </dependencyManagement>
  ```

- 在子工程中定义依赖关系，无需声明依赖版本，版本参照父工程中依赖的版本

  ```xml
  <dependencies>
      <!--spring环境-->
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-context</artifactId>
      </dependency>
  </dependencies>
  ```

**继承的资源**

![](http://images.hellocode.top/pXtWnvLCPR2UDqG.png)

> 插件可以使用`<pluginManagement></pluginManagement>`管理继承

**继承与聚合**

- 作用
  - 聚合用于快速构建项目
  - 继承用于快速配置
- 相同点
  - 聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
  - 聚合与继承均属于设计型模块，并无实际的模块内容
- 不同点
  - 聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
  - 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己

#### 属性

**属性类别**

1. 自定义属性
2. 内置属性
3. Setting属性
4. Java系统属性
5. 环境变量属性

**自定义属性**

- 作用：等同于定义变量，方便统一维护

*定义格式*

```xml
<!--定义自定义属性-->
<properties>
	<spring.version>5.1.9.RELEASE</spring.version>
    <junit.version>4.12</junit.version>
</properties>
```

*调用格式*

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>${spring.version}</version>
</dependency>
```

**内置属性**

- 作用：使用maven内置属性，快速配置

- 调用格式

  ```xml
  ${basedir}
  ${version}
  ```

**Setting属性**

- 作用：使用Maven配置文件setting.xml中的标签属性，用于动态配置

- 调用格式

  ```xml
  ${settings.localRepository}
  ```

**Java系统属性**

- 作用：读取Java系统属性
- 调用格式
  `${user.home}`
- 系统属性查询方式
  `mvn help:system`

#### 版本管理

**工程版本**

- SNAPSHOT（快照版本）
  - 项目开发过程中，为方便团队成员合作，解决模块间相互依赖和实时更新的问题，开发者对每个模块进行构建的时候，输出的临时性版本叫做快照版本（测试阶段版本）
  - 快照版本会随着开发的进展不断更新
- RELEASE（发布版本）
  - 项目开发到进入阶段里程碑后，向团队外部发布较为稳定的版本，这种版本对应的构建文件是稳定的，即使进行功能的后续开发，也不会改变当前发布版本内容，这种版本称为发布版本

**工程版本号约定**

*约定规范*

- <主版本>.<次版本>.<增量版本>.<里程碑版本>
- 主版本：表示项目重大架构的变更，如spring5相较于spring4的迭代
- 次版本：表示有较大的功能增加和变化，或者全面系统的修复漏洞
- 增量版本：表示有重大漏洞的修复
- 里程碑版本：表明一个版本的里程碑（版本内部）。这样的版本同下一个正式版本相比，相对来说不是很稳定，有待更多的测试

*范例*

- 5.1.9.RELEASE

#### 资源管理

![](http://images.hellocode.top/1IzYUSTKMpDwtmn.png)

**配置文件引用pom属性**

- 作用：在任意配置文件中加载pom文件中定义的属性

- 调用格式
  `${jdbc.url}`

- 开启配置文件加载pom属性

  ```xml
  <!--配置资源文件对应的信息-->
  <resources>
  	<resource>
      	<!--设定配置文件对应的位置目录，支持使用属性动态设定路径-->
          <directory>${project.basedir}/src/main/resources</directory>
          <filtering>true</filtering>
      </resource>
  </resources>
  
  <!--配置测试资源文件对应的信息-->
  <testResources>
  	<testResource>
      	<!--设定测试配置文件对应的位置目录，支持使用属性动态设定路径-->
          <directory>${project.basedir}/src/test/resources</directory>
          <filtering>true</filtering>
      </testResource>
  </testResources>
  ```

  > ${project.basedir}类似于通配符，代表工程中每个模块目录
  >
  > 开启配置文件加载pom属性后，就可以在配置文件中调用`<properties>`标签中定义的属性值
  >
  > 上述标签是需要写在pom文件中的`<build>`标签内

#### 多环境开发配置

```xml
<!--创建多环境-->
<profiles>
    <!--定义具体的环境：生产环境-->
    <profile>
        <!--定义环境对应的唯一名称-->
        <id>pro_env</id>
        <properties>
            <jdbc.url>jdbc:mysql://1.1.1.1/springmvc_ssm</jdbc.url>
        </properties>
        <!--设置默认启动-->
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>

    <!--定义具体的环境：开发环境-->
    <profile>
        <!--定义环境对应的唯一名称-->
        <id>dev_env</id>
        <properties>
            <jdbc.url>jdbc:mysql://2.2.2.2/springmvc_ssm</jdbc.url>
        </properties>
    </profile>
    ...
</profiles>
```

**加载指定环境**

- 作用：加载指定环境配置
- 调用格式：`mvn 指令 -P 环境定义id`
- 范例：`mvn install -P pro_env`

#### 跳过测试

> 这部分了解即可

**跳过测试环节的应用场景**

- 整体模块功能未开发
- 模块中某个功能未开发完毕
- 单个功能更新调试导致其他功能失败
- 快速打包
- ......

**三种方式跳过测试**

*使用命令跳过测试*

- 命令：`mvn 指令 -D skipTests`
- 注意：执行的指令生命周期必须包含测试环节

*使用界面操作跳过测试*

![](http://images.hellocode.top/ULKgua4pWvY6XF2.png)

*使用配置跳过测试*

```xml
<!--配置跳过测试-->
<plugin>
    <groupId>org.apache.maven</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>2.22.1</version>
    <configuration>
        <!--设置跳过测试-->
        <skipTests>true</skipTests>

        <!--包含指定的测试用例，支持通配符，**表示任意包下-->
        <includes>
            <include>**/Student*Test.java</include>
        </includes>

        <!--排除指定的测试用例，配置方法同include-->
        <excludes>
            <exclude></exclude>
        </excludes>
    </configuration>
</plugin>
```

### 私服

#### 安装与启动

![](http://images.hellocode.top/6pMb8dELOBI2G5r.png)

**Nexus**

- Nexus是Sonatype公司的一款maven私服产品
- 下载地址：[https://help.sonatype.com/repomanager3/download](https://help.sonatype.com/repomanager3/download)

**启动与配置**

- 启动服务器（命令行启动）
  `nexus.exe /run nexus`
- 访问服务器（默认端口：8081）
  `http://localhost:8081`
- 修改基础配置信息
  - 安装路径下etc目录中nexus-default.properties文件保存有nexus基础配置信息，例如默认访问端口
- 修改服务器运行配置信息
  - 安装路径下bin目录中nexus.vmoptions文件保存有nexus服务器启动对应的配置信息，例如默认占用内存空间

#### 分类与上传

![](http://images.hellocode.top/OHG7Nt9SlPMUkbn.png)

**宿主仓库hosted**

- 保存无法从中央仓库获取的资源
  - 自主研发
  - 第三方非开源项目
- 代理仓库proxy
  - 代理远程仓库，通过nexus访问其他公共仓库，例如中央仓库
- 仓库组group
  - 将若干个仓库组成一个群组，简化配置
  - 仓库组不能保存资源，属于设计型仓库

#### idea上传与下载

![](http://images.hellocode.top/A3fNwpzaJgklZuQ.png)

*配置本地仓库访问私服的权限（setting.xml）*

```xml
<servers>
    <server>
        <id>hellocode-snapshot</id>
        <username>admin</username>
        <password>lh18391794828</password>
    </server>
    <server>
        <id>hellocode-release</id>
        <username>admin</username>
        <password>lh18391794828</password>
    </server>
</servers>
```

*配置本地仓库资源来源（setting.xml）*

```xml
<mirrors>
    <!--配置私服镜像-->
    <mirror>
        <!--此镜像的唯一标识符，用来区分不同的mirror元素-->
        <id>nexus-hellocode</id>
        <!--对哪种仓库进行镜像，简单说就是替代哪个仓库-->
        <mirrorOf>*</mirrorOf>
        <!--镜像URL-->
        <url>http://localhost:8081/repository/maven-public/</url>
    </mirror>
</mirrors>
```

**项目工程访问私服**

- 配置当前项目访问私服上传资源的保存位置（pom.xml）

  ```xml
  <distributionManagement>
      <repository>
          <id>hellocode-release</id>
          <url>http://localhost:8081/repository/hellocode-release/</url>
      </repository>
      <snapshotRepository>
          <id>hellocode-snapshot</id>
          <url>http://localhost:8081/repository/hellocode-snapshot/</url>
      </snapshotRepository>
  </distributionManagement>
  ```

- 发布资源到私服命令
  `mvn deploy`