---
prev: ./some-other-page
next: false
sidebar: heading
---

# Java基础


## Java基础语法

### 前期准备

1. **环境搭建**(https://www.java.com/zh-CN/)

   - 了解JRE和JDK

   - JDK的下载和安装

2. **常用DOS命令**

   ![](https://s2.loli.net/2022/06/06/wBTuCAIjm6YWxhL.png)

3. **第一个Java程序**

   ![](https://s2.loli.net/2022/06/06/3JXPZ2ftglLI5es.png)

   ```java
   public class Hello{									//定义一个名为Hello的类（
       public static void main(String[] args){			//main入口
           System.out.println("Hello World");			//打印输出Hello World
       }
   }
   ```

   

### 数据类型



1. **常量**：在程序的执行过程中，其值不会发生改变的量（数据）。

![](https://s2.loli.net/2022/06/06/kQilfqzOVZdct8m.png)

2. **变量**：就是内存中的==存储空间==，空间中存储着经常发生改变的值。

![](https://s2.loli.net/2022/06/06/Ny4uzcPJ3Zax1Se.png)

3. **基本数据类型**

![](https://s2.loli.net/2022/06/06/Ja9UA3IutwWO7br.png)

4. **引用数据类型**

### 键盘录入

1. **目的**：为了让数据更加灵活
2. **步骤**
   
   * 导包：`import java.util.Scanner;`		(需要写在class上面)
   * 创建对象：`Scanner sc = new Scanner(System.in);`        (只有sc可以改变，其他属于固定格式)
   * 使用变量接收数据:`int i = sc.nextInt();`			(只有i和sc变量可以改变，其他属于固定格式)
   
3. **实例**

   ```java
   import java.util.Scanner;	//导包
   public class input{		//创建input类
       public static void main(String[] args){		//主入口
           Scanner scan = new Scanner(System.in);	//创建对象
           int a = scan.nextInt();		//使用变量接收数据
           System.out.println(a);		//打印输出数据
       }
   }
   ```

### 标识符

1. **标识符**：就是给类、方法、变量等起名字的符号
2. **定义规则**
   
   * 由==数字==、==字母==、==下划线==(_)和==美元符==($)组成。
   * 不能以数字开头
   * 不能是关键字
   * 严格区分大小写
   