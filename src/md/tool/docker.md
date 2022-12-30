---
title: "Docker"
order: 3
category:
  - 工具 | 部署
---

# Docker

## 一、概述

> Docker是一种容器技术，解决软件跨环境迁移的问题

- Docker 是一个开源的应用容器引擎
- 诞生于2013年初，基于Go语言实现，dotCloud公司出品（后改名为Docker Inc）
- Docker可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上
- 容器是完全使用沙箱机制，相互隔离
- 容器性能开销极低
- Docker从17.03 版本之后分为CE（Community Edition：社区版）和 EE（Enterprise Edition：企业版）

### 1、安装

- Docker可以运行在MAC、Windows、CentOS、UBUNTU等操作系统上
- 官网：https://www.docker.com/

1. yum 包更新到最新

   `yum update`

2. 安装需要的软件包，yum-util提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

   `yum install -y yum-utils device-mapper-persistent-data lvm2`

3. 设置yum源

   `yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`

4. 安装Docker，出现输入的界面都按y

   `yum install -y docker-ce`

5. 查看docker版本，验证是否安装成功

   `docker -v`

### 2、架构

![img](http://images.hellocode.top/576507-docker1.png)

**镜像（Image）**：Docker镜像（Image），相当于是一个root文件系统。比如官方镜像ubuntu：16.04就包含了完整的一套Ubuntu 16.04最小系统的root文件系统

**容器（Container）**：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等

**仓库（Repository）**：仓库可以看成一个代码控制中心，用来保存镜像



**配置镜像加速器**

默认情况下，将从docker hub（https://hub.docker.com）上下载docker镜像，在国外，速度很慢。一般都会配置镜像加速器

- USTC：中科大镜像加速器（https://docker.mirrors.ustc.edu.cn）
- 阿里云
- 网易云
- 腾讯云

*阿里云*

1. 登录阿里云官网：https://www.aliyun.com/
2. 搜索容器镜像服务
3. 选择镜像加速器，按照说明配置即可

![image-20221225113153869](http://images.hellocode.top/image-20221225113153869.png)

## 二、命令

### 1、服务相关

**启动docker服务**

- `systemctl start docker`

**停止docker服务**

- `systemctl stop docker`

**重启docker服务**

- `systemctl restart docker`

**查看docker服务状态**

- `systemctl status docker`

**开机启动docker服务**

- `systemctl enable docker`

### 2、镜像相关

**查看镜像（本地）**

- `docker images`

- `docker images -q`（查看所有镜像id）

**搜索镜像（远程）**

- `docker search xxx`

**拉取镜像（远程）**，如果不知道镜像版本，可以去docker hub搜索查看

- `docker pull xxx:版本号`（不写版本号就是latest最新版）

**删除镜像（本地）**（remove images=>rmi）

```shell
# 删除指定本地镜像
docker rmi 镜像id/镜像名:版本
# 删除本地所有镜像
docker rmi `docker images -q`
```

### 3、容器相关

**查看容器**

```shell
# 查看正在运行的容器
docker ps
# 查看所有容器
docker ps -a
# 查看所有容器id
docker ps -aq
```

**创建容器**

```shell
docker run 参数
```

- `-i`：保持容器运行。通常与`-t`同时使用。加入it这两个参数后，容器创建后自动进入容器中，退出容器后，容器自动关闭
- `-t`：为容器重新分配一个伪输入终端，通常与`-i`同时使用
- `-d`：以守护（后台）模式运行容器。创建一个容器在后台运行，需要使用`docker exec`进入容器。退出后，容器不会关闭
- `-it`创建的容器一般称为交互式容器，`-id`创建的容器一般称为守护式容器
- `--name`：为创建的容器命名

**进入容器**

```shell
docker exec 参数
# 范例: docker exec -it c1（容器名）
```

**启动容器**

```shell
docker start 容器id/name
```

**停止容器**

```shell
docker stop 容器id/name
```

**删除容器**（运行状态的容器不能删除，要先停止）

```shell
# 删除指定容器
docker rm 容器id/name
# 删除所有容器
docker rm `docker ps -aq`
```

**查看容器信息**

```shell
docker inspect 容器id/name
```

## 三、容器数据卷

### 1、概念

**数据卷**

![img](http://images.hellocode.top/723bdba01962f27f316ff83d2dd2e126.png)

- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以挂载多个数据卷

**作用**

1. 容器数据持久化
2. 外部机器和容器间接通信
3. 容器之间数据交换

### 2、配置

- 创建启动容器时，使用`-v`参数设置数据卷

  ```shell
  docker run ... -v 宿主机目录(文件):容器内目录(文件) ...
  ```

*注意：*

- 目录必须是绝对路径
- 如果目录不存在，会自动创建
- 可以挂载多个数据卷（用多个`-v`）

![在这里插入图片描述](http://images.hellocode.top/ab105f9ed35c4b7393a2a0380d25c877.png)

> 一个数据卷可以挂载多个容器，这样可以实现不同容器间的数据交换

### 3、数据卷容器

多容器进行数据交换方法：

1. 多个容器挂载同一个数据卷
2. 数据卷容器

![在这里插入图片描述](http://images.hellocode.top/bb533312a70b4751a480474829c4d2d4.png)

**配置数据卷容器**

1. 创建启动c3数据卷容器，使用`-v`参数设置数据卷

   ```shell
   # /volume指的是容器目录，会在宿主机自动分配一个数据卷目录
   docker run -it --name=c3 -v /volume centos:7 /bin/bash
   ```

2. 创建启动c1 c2容器，使用`--volumes-from`参数 设置数据卷

   ```shell
   docker run -it --name=c1 --volumes-from c3 centos:7
   
   docker run -it --name=c2 --volumes-from c3 centos:7
   ```

> 即使c3挂了，也不会影响c1 c2容器的通信

## 四、应用部署

### 1、MySQL

1. 搜索mysql镜像
2. 拉取mysql镜像
3. 创建容器
4. 操作容器中的mysql

**端口映射**

![img](http://images.hellocode.top/cd696c7793666f68e852cfd4dffe4003.png)

- 容器内的网络服务和外部机器不能直接通信
- 外部机器和宿主机可以直接通信
- 宿主机和容器可以直接通信
- 当容器中的网络服务需要被外部机器访问时，可以将容器中提供服务的端口映射到宿主机的端口上。外部机器访问宿主机的该端口，从而间接访问容器的服务
- 这种操作称为：*端口映射*

```shell
# 在/root目录下创建mysql目录用于存储mysql数据信息
mkdir ~/mysql
cd ~/mysql
```

```shell
# \ 用于命令较长时换行输入
docker run -id \
-p 3307:3306 \
--name=c_mysql \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:5.6
```

- `-p 3307:3306`：将容器的3306端口映射到宿主机的3307端口（一般宿主机和容器端口一样，演示用3307便于区分）
- `-v $PWD/conf:/etc/mysql/conf.d`：将主机当前目录下的conf/my.cnf挂载到容器的/etc/mysql/my.cnf。配置目录
- `-v $PWD/logs:/logs`：将主机当前目录下的logs目录挂载到容器的/logs。日志目录
- `-v $PWD/data:/var/lib/mysql`：将主机当前目录下的data目录挂载到容器的/var/lib/mysql。数据目录
- `-e MYSQL_ROOT_PASSWORD=123456`：初始化root用户的密码

### 2、Tomcat

1. 搜索Tomcat镜像
2. 拉取Tomcat镜像
3. 创建容器
4. 部署项目
5. 测试访问

**映射**

```shell
# 在/root目录下创建tomcat目录用于存储tomcat数据信息
mkdir ~/tomcat
cd ~/tomcat
```

```shell
docker run -id --name=c_tomcat \
-p 8080:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat
```

- `-p 8080:8080`：将容器的8080端口映射到宿主机的8080端口
- `-v $PWD:/usr/local/tomcat/webapps`：将主机中当前目录挂载到容器的webapps

### 3、Nginx

1. 搜索Nginx镜像
2. 拉取Nginx镜像
3. 创建容器
4. 测试访问

**映射**

```shell
mkdir ~/nginx
cd ~/nginx
mkdir conf
cd conf
# 在~/nginx/conf/下创建nginx.conf文件，粘贴下面内容
vim nginx.conf
```

```shell
user  nginx;
worker_processes  1;
 
error_log  /var/log/nginx/error.log warn;
pid       /var/run/nginx.pid;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    include       /etc/nginx/mime.types;
	
    default_type  application/octet-stream;
	
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
	
	
    sendfile        on;
    #tcp_nopush     on;
	
    keepalive_timeout  65;
 
    #gzip  on;
    
    include /etc/nginx/conf.d/*.conf;
}
```

```shell
docker run -id --name=c_nginx \
-p 80:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx
```

- `-p 80:80`：将容器的80端口映射到宿主机的80端口
- `-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf`：将主机当前目录下的/conf/nginx.conf挂载到容器的 /etc/nginx/nginx.conf。配置目录
- `-v $PWD/logs:/var/log/nginx`：将主机当前目录下的logs目录挂载到容器的/var/log/nginx。日志目录

### 4、Redis

1. 搜索Redis镜像
2. 拉取Redis镜像
3. 创建容器
4. 测试访问

**映射**

```shell
docker run -id --name=c_redis -p 6379:6379 redis:6.0
```

## 五、Dockerfile

### 1、镜像原理

![img](http://images.hellocode.top/a2e59b95627129b54a1b234f9ed1ad7b.png)

- Docker镜像是由特殊的文件系统叠加而成
- 最底端是bootfs，并使用宿主机的bootfs
- 第二层是root文件系统rootfs，称为base image
- 然后再网上可以叠加其他的镜像文件
- 统一文件系统（Union File System）技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户的角度看来，只存在一个文件系统
- 一个镜像可以放在另一个镜像的上面。位于下面的镜像称为父镜像，最底部的镜像成为基础镜像
- 当从一个镜像启动容器时，Docker会在最顶层加载一个读写文件系统作为容器

### 2、镜像制作

**容器转为镜像**

```shell
# 容器转镜像
docker commit 容器id 镜像名称:版本号
# 镜像转压缩文件
docker save -o 压缩文件名称 镜像名称:版本号
# 压缩文件还原为镜像
docker load -i 压缩文件名称
```

> 数据卷（挂载）的文件不会被commit到镜像中

**dockerfile**

![img](http://images.hellocode.top/1f6bf15e29fd4b5af69181dd1ea2a679.png)

- Dockerfile 是一个文本文件
- 包含了一条条的指令
- 每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像
- 对于开发人员：可以为开发团队提供一个完全一致的开发环境
- 对于测试人员：可以直接拿开发时所构建的镜像或者通过Dockerfile文件构建一个新的镜像开始工作了
- 对于运维人员：在部署时，可以实现应用的无缝移植
- Dochub网址：https://hub.docker.com

### 3、关键字

|   关键字    |           作用           |                             备注                             |
| :---------: | :----------------------: | :----------------------------------------------------------: |
|    FROM     |        指定父镜像        |               指定dockerfile基于那个image构建                |
| MAINTAINER  |         作者信息         |                 用来标明这个dockerfile谁写的                 |
|    LABEL    |           标签           | 用来标明dockerfile的标签 可以使用Label代替Maintainer 最终都是在docker image基本信息中可以查看 |
|     RUN     |         执行命令         | 执行一段命令 默认是/bin/sh 格式: RUN command 或者 RUN [“command” , “param1”,“param2”] |
|     CMD     |       容器启动命令       | 提供启动容器时候的默认命令 和ENTRYPOINT配合使用.格式 CMD command param1 param2 或者 CMD [“command” , “param1”,“param2”] |
| ENTRYPOINT  |           入口           |            一般在制作一些执行就关闭的容器中会使用            |
|    COPY     |         复制文件         |                 build的时候复制文件到image中                 |
|     ADD     |         添加文件         | build的时候添加文件到image中 不仅仅局限于当前build上下文 可以来源于远程服务 |
|     ENV     |         环境变量         | 指定build时候的环境变量 可以在启动的容器的时候 通过-e覆盖 格式ENV name=value |
|     ARG     |         构建参数         | 构建参数 只在构建的时候使用的参数 如果有ENV 那么ENV的相同名字的值始终覆盖arg的参数 |
|   VOLUME    | 定义外部可以挂载的数据卷 | 指定build的image那些目录可以启动的时候挂载到文件系统中 启动容器的时候使用 -v 绑定 格式 VOLUME [“目录”] |
|   EXPOSE    |         暴露端口         | 定义容器运行的时候监听的端口 启动容器的使用-p来绑定暴露端口 格式: EXPOSE 8080 或者 EXPOSE 8080/udp |
|   WORKDIR   |         工作目录         | 指定容器内部的工作目录 如果没有创建则自动创建 如果指定/ 使用的是绝对地址 如果不是/开头那么是在上一条workdir的路径的相对路径 |
|    USER     |       指定执行用户       | 指定build或者启动的时候 用户 在RUN CMD ENTRYPONT执行的时候的用户 |
| HEALTHCHECK |         健康检查         | 指定监测当前容器的健康监测的命令 基本上没用 因为很多时候 应用本身有健康监测机制 |
|   ONBUILD   |          触发器          | 当存在ONBUILD关键字的镜像作为基础镜像的时候 当执行FROM完成之后 会执行 ONBUILD的命令 但是不影响当前镜像 用处也不怎么大 |
| STOPSIGNAL  |    发送信号量到宿主机    |     该STOPSIGNAL指令设置将发送到容器的系统调用信号以退出     |
|    SHELL    |   指定执行脚本的shell    |      指定RUN CMD ENTRYPOINT 执行命令的时候 使用的shell       |

**自定义centos7镜像**

1. 默认登录路径为：/usr
2. 可以使用vim

*步骤*

1. 定义父镜像：`FROM centos:7`（宿主机有直接使用，没有自动下载）
2. 定义作者信息：`MAINTAINER hellocode <hellocode@163.com>`
3. 执行安装vim的命令：`RUN yum install -y vim`
4. 定义默认的工作目录：`WORKDIR /usr`
5. 定义容器启动执行的命令：`CMD /bin/bash`

```dockerfile
FROM centos:7
MAINTAINER hellocode<hellocode@163.com>
RUN yum install -y vim
WORKDIR /usr
CMD /bin/bash
```

*构建*

- `docker build 参数 .`
  - `-f`：dockerfile文件路径
  - `-t`：制作的镜像名称
- `docker build -f ./centos_dockerfile -t hellocode_centos:1 .`

**发布springboot项目**

1. 定义父镜像：`FROM java:8`
2. 定义作者信息：`MAINTAINER hellocode <hellocode@163.com>`
3. 将jar包添加到容器：`ADD springboot.jar app.jar`
4. 定义容器启动执行的命令：`CMD java -jar app.jar`
5. 通过dockerfile构建镜像：`docker build -f dockerfile文件路径 -t 镜像名称:版本 .`

## 六、服务编排

> 微服务架构的应用系统中一般包含若干个微服务，每个微服务一般都会部署多个实例，如果每个微服务都要手动启停，维护的工作量会很大

- 要从Dockerfile build image或者去docker hub拉取image
- 要创建多个container
- 要管理这些container（启动停止删除）

**服务编排**：按照一定的业务规则批量管理容器

### 1、Docker Compose

> Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止

![img](http://images.hellocode.top/70ce853676b22ee2f8e0521b4ea15aef.png)

1. 利用Dockerfile定义运行环境镜像
2. 使用`docker-compose.yml`定义组成应用的各服务
3. 运行`docker-compose up` 启动应用

**安装**

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
# 设置文件可执行权限
chmod +x /usr/local/bin/docker-compose
# 查看版本信息
docker-compose -version
```

*卸载*

```shell
# 二进制包方式安装的，卸载二进制文件即可
rm /usr/local/bin/docker-compose
```

### 2、案例

使用docker compose 编排 nginx + springboot项目

1. 创建docker-compose目录

   ```shell
   mkdir ~/docker-compose
   cd ~/docker-compose
   ```

2. 编写docker-compose.yml文件（名称固定）

   ```yaml
   # docker-compose版本
   version: '3'
   # 要启动的服务
   services:
     nginx:
       # 镜像
       image: nginx
       # 端口映射
       ports:
         - 80:80
       # 当前项目要挂载的项目
       links:
         - boot
       # 数据卷
       volumes:
         - ./nginx/conf.d:/etc/nginx/conf.d
     boot:
       image: boot:1
       # 对外暴露的端口
       expose:
         - "8080"
   ```

3. 创建目录：`mkdir -p ./nginx/conf.d`

4. 在./nginx/conf.d目录下编写hellocode.conf文件

   ```shell
   server{
   	listen 80;
   	access_log off;
   	
   	location / {
   		proxy_pass http://boot:8080;
   	}
   }
   ```

   > 这里的boot对应上面docker-compose.yml中`links`挂载的boot

5. 在~/docker-compose 目录下使用docker-compose 启动容器

   ```shell
   # 前台启动
   docker-compose up
   # 后台启动
   docker-compose up -d
   ```

6. 测试访问

![image-20221225164023907](http://images.hellocode.top/image-20221225164023907.png)

## 七、私有仓库

Docker官方的[Docker hub](https://hub.docker.com/)是一个用于管理公共镜像的仓库，我们可以从上面拉取镜像 到本地，也可以把我们自己的镜像推送上去。但是，有时候我们的服务器无法访问互联网，或者你不希望将自己的镜像放到公网当中，那么我们就需要搭建自己的私有仓库来存储和管理自己的镜像

**搭建私有仓库**

```shell
# 1、拉取私有仓库镜像 
docker pull registry
# 2、启动私有仓库容器
docker run -id --name=registry -p 5000:5000 registry
# 3、打开浏览器 输入地址http://私有仓库服务器ip:5000/v2/_catalog，看到{"repositories":[]} 表示私有仓库 搭建成功
# 4、修改daemon.json   
vim /etc/docker/daemon.json
# 在上述文件中添加一个key，保存退出。此步用于让 docker 信任私有仓库地址；注意将私有仓库服务器ip修改为自己私有仓库服务器真实ip 
{"insecure-registries":["私有仓库服务器ip:5000"]} 
# 5、重启docker 服务 
systemctl restart docker
docker start registry
```

**上传镜像至私有仓库**

```shell
# 1、标记镜像为私有仓库的镜像
docker tag centos:7 私有仓库服务器IP:5000/centos:7

# 2、上传标记的镜像
docker push 私有仓库服务器IP:5000/centos:7
```

**从私有仓库拉取镜像**

```shell
#拉取镜像
docker pull 私有仓库服务器ip:5000/centos:7
```

## 八、docker和虚拟机比较

![认识容器](http://images.hellocode.top/d0536dec931d4a441e8ca2eef36afa89.png)

**容器**

> 一句话概括容器：容器就是将软件打包成标准化单元，以用于开发、交付和部署

- 容器镜像是轻量的、可执行的独立软件包 ，包含软件运行所需的所有内容：代码、运行时环境、系统工具、系统库和设置。
- 容器化软件适用于基于 Linux 和 Windows 的应用，在任何环境中都能够始终如一地运行。
- 容器赋予了软件独立性，使其免受外在环境差异（例如，开发和预演环境的差异）的影响，从而有助于减少团队间在相同基础设施上运行不同软件时的冲突

**容器和虚拟机的比较**

![img](http://images.hellocode.top/34c0eb24b257d0c1c8721b94f7e9b29f.png)

*相同*

- 容器和虚拟机具有相似的资源隔离和分配优势

*不同*

- 容器虚拟化的是操作系统，虚拟机虚拟化的是硬件
- 传统的虚拟机可以运行不同的操作系统，容器只能运行同一类操作系统

![img](http://images.hellocode.top/c41f811c7e14c3fe856d53fb170e8f8f.png)

- 容器是一个应用层抽象，用于将代码和依赖资源打包在一起。 多个容器可以在同一台机器上运行，共享操作系统内核，但各自作为独立的进程在用户空间中运行 。与虚拟机相比， 容器占用的空间较少（容器镜像大小通常只有几十兆），瞬间就能完成启动 。
- 虚拟机 (VM) 是一个物理硬件层抽象，用于将一台服务器变成多台服务器。 管理程序允许多个 VM 在一台机器上运行。每个 VM 都包含一整套操作系统、一个或多个应用、必要的二进制文件和库资源，因此 占用大量空间 。而且 VM 启动也十分缓慢 

两者有不同的使用场景。*虚拟机更擅长于彻底隔离整个运行环境*。例如，云服务提供商通常采用虚拟机技术隔离不同的用户。*而 Docker 通常用于隔离不同的应用* ，例如前端，后端以及数据库

容器与虚拟机两者是可以共存的

![img](http://images.hellocode.top/78113d656d5f9df6e0e376e521f0a9b6.png)
