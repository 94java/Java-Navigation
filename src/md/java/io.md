---
title: "IO"
order: 5
category:
  - Java
---

# IO

- I表示input，是数据从硬盘进内存的过程，称之为读

  O表示output，是数据从内存到硬盘的过程，称之为写

- IO的数据传输，可以看作是一种数据的流动，按照流动的方向，以内存为参照物，进行读写操作
  简单来说：**内存在读，内存在写**

- 按流向分：输入流、输出流

- 按数据类型分：字节流、字符流

  字节流：操作所有类型的文件（包括音频、视频、图片等）

  字符流：只能操作纯文本文件（包括Java文件、txt文件等）

  一般来说，我们说的IO流的分类是按照**数据类型**来分的

> 纯文本文件：用windows自带的记事本打开能读得懂的文件

[[toc]]

## 一、File

用处

1. 在读写数据时告诉虚拟机要操作的文件/文件夹在哪

2. 对文件/文件夹本身进行操作，包括创建、删除等

File:是文件和目录路径名的抽象表示

- 文件和目录可以通过File封装成对象
- File封装的对象仅仅是一个路径名。它可以是存在的，也可以是不存在的

### 1、构造方法

|              方法名               |                             说明                             |
| :-------------------------------: | :----------------------------------------------------------: |
|       File(String pathname)       |  通过将给定的路径名字符串转换为抽象路径名来创建新的File实例  |
| File(String parent, String child) | 从父路径名字符串和子路径名字符串创建新的File实例（路径拼接） |
|  File(File parent, String child)  |  从父抽象路径名和子路径名字符串创建新的File实例（路径拼接）  |

> Q：为什么要把字符串表示形式的路径变为File对象？
>
> A：就是为了使用File类里面的方法

**绝对路径和相对路径**

- 绝对路径：从盘符开始（完整的路径）
- 相对路径：相对当前项目下的路径

### 2、常用操作

**创建功能**

| 方法名                         | 说明                       |
| ------------------------------ | -------------------------- |
| public boolean createNewFile() | 创建一个新的空的文件       |
| public boolean mkdir()         | 创建一个单级文件夹（了解） |
| public boolean mkdirs()        | 创建一个多级文件夹         |

- createNewFile：只能创建文件

  如果文件存在，创建失败，返回false

  如果文件不存在，创建文件，返回true，要求文件所在文件夹必须存在

- mkdir：只能创建单级文件夹【了解即可】

- mkdirs：可以创建单级文件夹，也可以创建多级文件夹

**删除功能**

`public boolean delete()`：删除由此抽象路径名表示的文件或目录

- 删除后不进回收站，不能恢复
- 可以删除文件，也可以删除文件夹
- 如果删除的是文件，直接删除。如果删除的是文件夹，只能删除空文件夹

**判断和获取功能**

|            方法名            |                   说明                   |
| :--------------------------: | :--------------------------------------: |
| public boolean isDirectory() |   测试此抽象路径名表示的File是否为目录   |
|   public boolean isFile()    |   测试此抽象路径名表示的File是否为文件   |
|   public boolean exists()    |    测试此抽象路径名表示的File是否存在    |
|   public String getName()    | 返回由此抽象路径名表示的文件或目录的名称 |

> getName方法：如果调用者是文件，那么获取的是文件名和后缀名；如果调用者是文件夹，那么获取的是文件夹的名字

**高级获取功能**

`public File[] listFiles()`：返回此抽象路径名表示的目录中的文件和目录的File对象数组

- 进入文件夹，获取这个文件夹里面所有的文件和文件夹的File对象，并把这些File对象都放在一个数组中返回
- 包括隐藏文件和隐藏文件夹，都可以获取出来

> 当调用者是一个文件或不存在时，会返回一个null
>
> 当调用者是一个空文件夹时，会返回一个长度为0的数组
>
> 当调用者是一个有权限才能进入的文件夹时，会返回一个null

### 3、练习

练习一：在当前模块下的aaa文件夹中创建一个a.txt文件

```java
import java.io.File;
import java.io.IOException;

public class Demo1{
    public static void main(String[] args) throws IOException{
        File file = new File("File\\aaa");
        if(!file.exists()){		// 如果文件夹不存在，创建文件夹
            file.mkdirs();
        }
        File newFile = new File(file, "a.txt");
        newFile.createNewFile();		// 要保证文件所在的文件夹必须存在
    }
}
```

练习二：删除一个多级文件夹

```java
import java.io.File;

public class Demo2{
    public static void main(String[] args){
        File src = new File("C:\\Users\\lihao\\Desktop\\cs");
        deleteDir(src);
    }
    
    private static void deleteDir(File src){
        // 递归思路
        // 套路：
        // 1.进入----得到src文件夹里面所有内容的File对象
        File[] files = src.listFiles();
        // 2.遍历----得到src文件夹里面每一个文件和文件夹的File对象
        for(File file:files){
            // 3.判断----如果遍历到的File对象是一个文件就直接删除
            if(file.isFile()){
                file.delete();
            }else{		// 4.判断----如果遍历到的File对象是一个文件夹,递归
                deleteDir(file); 			// 参数一定要是src文件夹里面的文件夹File对象
            }
        }
        src.delete();
    }
}
```

练习三：统计一个文件夹中每种文件的个数并打印

```java
public class Demo3{
    public static void main(String[] args){
        File file = new file("File");
        HashMap<String, Integer> hm = new HashMap<>();
        getCount(hm, file);
        System.out.println(h)
    }
    
    private static void getCount(HashMap<String, Integer> hm, File file){
        File[] files = file.listFiles();
        for(File f:files){
            if(f.isFile()){
                String fileName = f.getName();
                String[] fileNameArr = fileName.split("\\.");
                if(fileNameArr.length == 2){
                    String fileEndName = fileNameArr[1];
                    if(hm.containsKey(fileEndName)){
                        // 已经存在
                        // 将已经出现的次数获取出来
                        Integer count = hm.get(fileEndName);
                        // 该文件再次出现
                        count++;
                        hm.put(fileEndName, count);
                    }else{
                        // 不存在
                        // 当前文件是第一次出现
                        hm.put(fileEndName, 1);
                    }
                }
            }else{
                getCount(hm, f);
            }
        }
    }
}
```


## 二、字节流

### 1、字节流写数据

**步骤**

- 创建字节输出流对象(`FileOutputStream fos = new FileOutputStream("a.txt")  `)
- 写数据(`fos.write(数据)`)
- 释放资源(`fos.close();`)

**注意点**

- 如果文件不存在，会自动创建出来；如果文件存在，会把文件清空
- 给write方法传递一个整数时，写入的数据是这个整数在ASCII码表中对应的字符
- 释放资源指令，表示告诉操作系统，已经不再使用这个文件了。每次使用完流必须要释放资源

**字节流写数据的3种方式**

| 方法名                                 | 说明                         |
| -------------------------------------- | ---------------------------- |
| void write(int b)                      | 一次写一个数据               |
| void write(byte[] b)                   | 一次写一个字节数组数据       |
| void write(byte[] b, int off, int len) | 一次写一个字节数组的部分数据 |

**两个小问题**

- 字节流写完数据如何实现换行
  
写完数据后，加换行符：`\r`   `\n` 
  
- 字节流写数据如何实现追加写入呢(保留原数据)？

  在`public FileOutputStream(String name, boolean append)`
  
  true表示续写开关，保留原数据；默认为false

### 2、字节流读数据

**步骤**

- 创建字节输入流对象(`FileInputStream fis = new FileInputStream("a.txt");`)

  如果文件存在，不会报错；如果文件不存在，那么直接报错
- 读数据(`int read = fis.read();`)

  一次读取一个字节，返回值就是本次读到的那个字节数据，也就是字符在码表中对应的那个数字

  如果想要看到的是字符数据，一定要强转成char
- 释放资源(`fis.close();`)

**读取多个字节数据**

> 当读取到文件结束时，会返回-1

```java
int b;
while((b = fis.read()) != -1){
    System.out.println((char)b);
}
fis.close();
```

### 3、复制文件案例

需求：把`E:\\\study\\\a.txt` 复制到当前模块下

> 复制文件，其实就是把文件中的内容从一个文件中读取出来(**数据源**)，然后写入到另一个文件中(**目的地**)

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class Demo2 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		FileInputStream fis = new FileInputStream("E:\\study\\test.txt");
		FileOutputStream fos = new FileOutputStream("test.txt");
		int b;
		while((b = fis.read()) != -1){
			fos.write(b);
		}
		fis.close();
		fos.close();
	}
}
```

### 4、定义小数组拷贝

- 如果操作的文件过大，那么速度就会很慢

- 为了解决速度问题，字节流通过创建字节数组，可以一次读写多个数据


一次读一个字节数组的方法

- `public int read(byte[] b)`：从输入流读取最多b.length个字节的数据
- 返回的是读入缓冲区的总字节数，也就是实际的读取字节个数

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class Demo3 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		FileOutputStream fos = new FileOutputStream("a.test");
		FileInputStream fis = new FileInputStream("E:\\study\\test.txt");
		byte[] bytes = new byte[1024];
		int len;		// 本次读取到的有效字节个数-----这次读了几个字节
		while((len = fis.read(bytes)) != -1){
			fos.write(bytes, 0, len);
		}
		fis.close();
		fos.close();
	}
}
```

## 三、缓冲流

> 字节缓冲流：提高读和写的效率

- BufferedOutputStream：字节缓冲输出流
- BufferedInputStream：字节缓冲输入流

**构造方法**

- 字节缓冲输出流：`BufferedOutputStream(OutputStream out)`

- 字节缓冲输入流：`BufferedInputStream(InputStream in)`

- 字节缓冲流仅仅提供缓冲区（数组），而真正的读写数据还得依靠基本的字节流对象进行操作

```java
import java.io.*;

public class Demo1 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		// 创建字节缓冲输入流
        // 在底层创建了一个默认长度为8192的字节数组
		BufferedInputStream bis = new BufferedInputStream(new FileInputStream("E:\\study\\test.txt"));
		// 创建字节缓冲输出流
		BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("test.txt"));
		
		int b;
		while((b = bis.read()) != -1){
			bos.write(b);
		}
        // f
		bis.close();
		bos.close();
	}
}
```

## 四、字符流&字符缓冲流

### 1、编码表

**基础知识**

- 计算机中储存的信息都是用二进制数表示的
- 按照某种规则，将字符变成二进制，再存储到计算机中，称为编码
- 按照同样的规则，将存储在计算机中的二进制数解析显示出来，称为解码
- 编码和解码的方式必须要一致，否则会导致乱码

**常用编码表**

- ASCII（美国信息交换标准代码）：包括了数字，大小写字符和一些常见的标点符号
  
  注意：ASCII码表中是没有中文的

- GBK：windows系统默认的码表。兼容ASCII码表，也包含了21003个汉字，并支持繁体汉字以及部分日韩文字
  
注意：GBK是中国的码表，一个中文以两个字节的形式存储。但不包含世界上所有国家的文字
  
- Unicode码表：由国际组织ISO制定，是统一的万国码，计算机科学领域里的一项业界标准，容纳世界上大多数国家的所有常见文字和符号

  但是因为表示的字符太多，所有Unicode码表中的数字不是直接以二进制的形式存储到计算机的

  会先通过UTF-7,UTF-7.5,UTF-8,UTF-16,以及UTF-32进行编码，再存储到计算机，其中最常见的就是UTF-8

  注意：Unicode是万国码，以UTF-8编码后一个中文以三个字节的形式存储

**重点**

Windows默认使用码表为GBK，一个字符两个字节

idea和以后工作默认使用Unicode的UTF-8编解码格式，一个中文三个字节

#### 字符串的编码解码

**编码**

- `byte[] getBytes()`：使用平台默认字符集将该String编码为一系列字节，将结果存储到新的字节数组中
- `byte[] getBytes(String charsetName)`：使用指定的字符集将该String编码为一系列字节，将结果存储到新的字节数组中

**解码**

- `String(byte[] bytes)`：通过使用平台的默认字符集解码指定的字节数组来构造新的String
- `String(bytes,String charsetName)`：通过指定的字符集解码指定的字节数组来构造新的String

```java
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class Demo1 {

	public static void main(String[] args) throws UnsupportedEncodingException {
		// TODO Auto-generated method stub
		String s = "好好学习，天天向上";
		// 利用默认的GBK将中文编码为一系列的字节
		byte[] bytes1 = s.getBytes();
		System.out.println(Arrays.toString(bytes1));
		// 指定为UTF-8编码格式
		byte[] bytes2 = s.getBytes("UTF-8");
		System.out.println(Arrays.toString(bytes2));
		byte[] bytes3 = {-70, -61, -70, -61, -47, -89, -49, -80, -93, -84, -52, -20, -52, -20, -49, -14, -55, -49};
		byte[] bytes4 = {-27, -91, -67, -27, -91, -67, -27, -83, -90, -28, -71, -96, -17, -68, -116, -27, -92, -87, -27, -92, -87, -27, -112, -111, -28, -72, -118};
		String s1 = new String(bytes3);
		String s2 = new String(bytes4,"UTF-8");
		System.out.println(s1);
		System.out.println(s2);
	}
}
```

> 为什么字节流读取文本文件，可能出现乱码？
> 因为字节流一次读一个字节，而不管GBK还是UTF-8一个中文都是多个字节，用字节流每次只能读其中的一部分，所有就会出现乱码问题

#### 字符流读取中文的过程

**字符流 = 字节流 + 编码表**

- 不管是在哪张码表中，中文的第一个字节一定是负数

- 想要进行拷贝，一律使用字节流或者字节缓冲流
  
  想要把文本文件中的数据读到内存中，请使用字符输入流
  
  想要把内存中的数据写到文本文件中，请使用字符输出流
  
- GBK码表一个中文两个字节，UTF-8编码格式一个中文三个字节

### 2、写出数据

**步骤**

- 创建字符输出流对象
  - 如果文件不存在，就创建。但要保证父级路径存在
  - 如果文件存在就清空
- 写数据
  - 如果写出int类型的整数，实际写出的是整数在码表中对应的字母（如果要写整数，用字符串写）
  - 写出字符串数据，是把字符串本身原样写出
- 释放资源（每次操作完最后必须释放资源）

**字符流写数据的5种方式**

|                  方法名                   |         说明         |
| :---------------------------------------: | :------------------: |
|             void write(int c)             |      写一个字符      |
|          void write(char[] cbuf)          |   写出一个字符数组   |
| void write(char[] cbuf, int off, int len) | 写出字符数组的一部分 |
|          void write(String str)           |     写一个字符串     |
| void write(String str, int off, int len)  | 写一个字符串的一部分 |

```java
import java.io.FileWriter;
import java.io.IOException;

public class Demo2 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		
		// 创建字符输出流对象
		FileWriter fw = new FileWriter("src\\CharStream\\a.txt");
		// FileWriter fw = new FileWriter(new File("CharStream\\a.txt"));
		
		
		// 写出数据(一次一个字符)
		// method1(fw);
		
		// 写一个字符数组
		// method2(fw);
		
		// 写出字符数组的一部分
		// method3(fw);
		
		// 写出一个字符串[重点]
		// method4(fw);
		
		// 写出一个字符串的一部分（了解）
		// method5(fw);
		
		// 释放资源
		fw.close();
		
		
	}

	private static void method5(FileWriter fw) throws IOException {
		fw.write("好好学习，天天向上", 3, 4);
	}

	private static void method4(FileWriter fw) throws IOException {
		String line = "好好学习,";
		fw.write(line);
		fw.write("天天向上");
	}

	private static void method3(FileWriter fw) throws IOException {
		char[] chars = {97, 98, 99, 100, 101, 102, 103};
		fw.write(chars, 3, 4);
	}

	private static void method2(FileWriter fw) throws IOException {
		char[] chars = {97, 98 ,99, 100, 101};
		fw.write(chars);
	}

	private static void method1(FileWriter fw) throws IOException {
		fw.write(97);
		fw.write(98);
		fw.write(99);
	}
}
```

**flush和close方法**

| 方法名  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| flush() | 刷新流，还可以继续写数据                                     |
| close() | 关闭流，释放资源，但是在关闭之前会先刷新流。一旦关闭，就不能再写数据 |

> 在写数据后，必须执行刷新流才能将内容最终写入文件种(close会在关闭流前刷新流)

### 3、字符流读数据的过程

**步骤**

- 创建字符输入流对象：`FileReader fr = new FileReader("a.txt");` `FileReader fr = new FileReader(new File("a.txt"));`
- 读取数据：`fr.read();`
- 释放资源：`fr.close();`

**一次读取多个字符**

```java
import java.io.FileReader;
import java.io.IOException;

public class Demo3 {
	public static void main(String[] args) throws IOException{
		// 创建对象
		FileReader fr = new FileReader("src\\CharStream\\a.txt");
		
		// 创建数组
		char[] chars = new char[1024];
		int len;
		while((len = fr.read(chars)) != -1){
			System.out.println(new String(chars, 0, len));
		}
		
		// 释放资源
		fr.close();
	}
}
```

**练习**

保存键盘录入的数据：将用户键盘录入的用户名和密码保存到本地实现永久化存储

要求用户名独占一行，密码独占一行

```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Demo4 {
	public static void main(String[] args) throws IOException{
		Scanner sc = new Scanner(System.in);
		System.out.println("【用户注册】");
		System.out.print("请输入用户名(6位)：");
		String userName = sc.next();
		System.out.print("请输入密码(6位)：");
		String passWord = sc.next();
		FileWriter fw = new FileWriter("user.txt");
		fw.write(userName + "\n" + passWord);
		fw.close();
		System.out.println("注册成功！");
		System.out.println("【用户登录】");
		System.out.print("请输入用户名：");
		String user = sc.next();
		System.out.print("请输入密码：");
		String pass = sc.next();
		FileReader fr = new FileReader("user.txt");
		char[] chars = new char[1024];
		int len;
		while((len = fr.read(chars)) != -1){
			userName = new String(chars, 0, 6);
			passWord = new String(chars, 7 , 6);
		}
		if(user.equals(userName) && pass.equals(passWord)){
			System.out.println("登录成功！");
		}else{
			System.out.println("密码错误，登录失败！");
		}
	}
}
```

### 4、字符缓冲流

- BufferedWriter(字符缓冲输出流)：可以将数据高效的写出
- BufferedReader(字符缓冲输入流)：可以将数据高效的读取到内存

> 需要传入FileWriter或者FileReader对象，不能直接传入字符串地址或者File对象

**字符缓冲流特有方法**

BufferedWriter

- `void newLine()`：写一行行分隔符，行分隔符字符串由系统属性定义（回车换行）

BufferedReader

- `public String readLine()`：读一行文字。结果包含行内的内容的字符串，不包括任何行终止字符，如果流的结尾已经到达，则为null

**练习**

读取文件中的数据，排序后再次写到本地文件

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
public class Demo5 {
	public static void main(String[] args) throws IOException{
		// 创建字符缓冲输入流对象
		BufferedReader br = new BufferedReader(new FileReader("sort.txt"));
		String s = br.readLine();		// 8 7 5 2 1 3 4 9 10 6
		String[] n = s.split(" ");
		int[] num = new int[n.length];
		for(int i = 0; i < n.length; i++){
			int number = Integer.parseInt(n[i]);
			num[i] = number;
		}
		Arrays.sort(num);
		br.close();
		// 写入
		BufferedWriter bw = new BufferedWriter(new FileWriter("sort.txt"));
		for(int i = 0; i < num.length; i++){
			bw.write(num[i] + " ");
			bw.flush();
		}
		bw.close();
	}
}
```

### 5、小结

- 字节流用来拷贝文件
- 字符流用来进行文件的读写
- 缓冲流用来提高效率

## 五、转换流&对象操作流&Properties

### 1、转换流

- 输入流：InputStreamReader，字节流到字符流的桥梁，把字节流转换为字符流
- 输出流：OutputStreamWriter，字符流到字节流的桥梁，把字符流转换为字节流

**使用场景**

- 在JDK11以前，可用于指定编码读写`InputStreamReader("a.txt","utf-8");`

- 在JDK11之后，字符流新推出了一个构造，也可以指定编码表
  
  `FileReader fr = new FileReader("a.txt",charset.forName("UTF-8"));`

### 2、对象操作流

> 特点：可以把对象以字节的形式写到本地文件，直接打开文件，是读不懂的，需要再次用对象操作流读到内存中

**对象操作流分为两类**

- 对象操作输出流(对象序列化流)：ObjectOutputStream，就是将对象写到本地文件中，或者在网络中传输对象

- 对象操作输入流(对象反序列化流)：ObjectInputStream，把写到本地文件中的对象读到内存中，或者接收网络中传输的对象


```java
// User类
package Streamio;

import java.io.Serializable;

//	如果想要这个类的对象能被序列化，那么这个类就必须实现一个接口
public class User implements Serializable{
	
	//	成员变量
	private String userName;
	private String passWord;
	
	//	构造方法
	public User() {
		super();
	}
	public User(String userName, String passWord) {
		super();
		this.userName = userName;
		this.passWord = passWord;
	}
	//	成员方法
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	@Override
	public String toString() {
		return "User [userName=" + userName + ", passWord=" + passWord + "]";
	}	
}
```

> Serializable接口的意义：标记性接口，里面没有任何抽象方法，只要一个类实现类这个Serializable接口，那么就表示这个类的对象可以被序列化

```java
// 实现类	对象操作输出流
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Demo1 {
	public static void main(String[] args) throws FileNotFoundException, IOException {
		User user = new User("zhangsan","qwer");
		// 需求：把这个用户信息保存到本地文件
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("a.txt"));
		oos.writeObject(user);
		oos.close();
	}
}
```

```java
// 实现类  写：对象操作输入流
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Demo2 {
	public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException {
		// TODO Auto-generated method stub
		ObjectInputStream ois = new ObjectInputStream(new FileInputStream("a.txt"));
		User o = (User) ois.readObject();
		System.out.println(o);
		ois.close();
	}
}
```

#### 2.1. 注意点

用对象序列化流序列化了一个对象后，假如我们修改了对象所属的Javabean类（对象实现类），读取数据会不会出问题？
- serialVersionUID序列号：如果没有手动定义，虚拟机会根据类中的信息自动计算出一个序列号
- 如果我们修改了类中的信息，虚拟机会再次计算出一个序列号

如果出问题了，如何解决？
- 不让虚拟机计算序列号，自己手动给出一个不变的序列号
  
  `private static final long serialVersionUID = 1L;`
  
  1L可以自定义，只要不超出long的范围即可

如果一个对象中的某个成员变量的值不想被序列化，又该如何实现？

- 使用关键字`transient`修饰，该关键字标记的成员变量不参与序列化过程

#### 2.2. 练习

案例：用对象操作流读写多个对象

```java
// 需求：创建多个JavaBean类对象写到文件中，再次读取到内存
// Student类
import java.io.Serializable;

public class Student implements Serializable{
	private String name;
	private int age;
	private static final long serialVersionUID = 1L;
	public Student() {
		super();
	}
	public Student(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "Student [name=" + name + ", age=" + age + "]";
	}	
}
```

```java
// 实现类
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Demo3 {
	public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException{
		Student s1 = new Student("张三",23);
		Student s2 = new Student("李四",24);
		Student s3 = new Student("王五",25);
		// 写入
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("b.txt"));
		oos.writeObject(s1);
		oos.writeObject(s2);
		oos.writeObject(s3);
		oos.close();
		// 读出
		ObjectInputStream ois = new ObjectInputStream(new FileInputStream("b.txt"));
		while(true){
			try{
				Student stu = (Student) ois.readObject();
				System.out.println(stu);
			} catch(IOException e){
				break;
			}
		}
		ois.close();
	}
}
```

### 3、Properties

- 是一个Map体系的集合类
- Properties中有跟IO相关的方法
- 键值对的数据类型基本都定义为字符串

练习：Properties作为Map集合的使用

```java
package Properties;

import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

public class Demo1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Properties prop = new Properties();
		// 增
		prop.put("唐三", "小舞");
		prop.put("戴沐白", "朱竹青");
		prop.put("奥斯卡", "宁荣荣");
		// 删
		prop.remove("戴沐白");
		// 改
		prop.put("奥斯卡", "朱竹青");
		// 查
		Object value = prop.get("唐三");
		// 遍历
		Set<Object> keys = prop.keySet();
		for(Object key : keys){		// 所有的键
			Object r = prop.get(key);
			System.out.println(key + "=" + r);
		}
		// 所有的键值对对象
		Set<Entry<Object, Object>> entries = prop.entrySet();
		for(Entry<Object, Object> entry :entries){
			Object key = entry.getKey();
			Object val = entry.getValue();
			System.out.println(key + "---" + val);
		}
	}
}
```

**作为集合的特有方法**

|                     方法名                     |                             说明                             |
| :--------------------------------------------: | :----------------------------------------------------------: |
| `Object setProperty(String key, String value)` |   设置集合的键和值，都是String类型，底层调用Hashtable方法    |
|        `String getProperty(String key)`        |               使用此属性列表中指定的键搜索属性               |
|      `Set<String> stringPropertyNames()`       | 从该属性列表中返回一个不可修改的键集，其中键及其对应的值是字符串 |

**Properties和IO流结合的方法**

|                     方法名                      |                             说明                             |
| :---------------------------------------------: | :----------------------------------------------------------: |
|        `void load(InputStream inStream)`        |             从输入字节流读取属性列表(键和元素对)             |
|           `void load(Reader reader)`            |             从输入字符流读取属性列表(键和元素对)             |
| `void store(OutputStream out, String comments)` | 将此属性列表(键和元素对)写入此Properties表中，以适合于使用load(InputStream)方法的格式写入输出字节流 |
|  `void store(Writer writer, String comments)`   | 将此属性列表(键和元素对)写入此Properties表中，以适合使用load(Reader)方法的格式写入输出字符流 |

```java
// 读取
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class Demo2 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		Properties prop = new Properties();
		FileReader fr = new FileReader("src\\Properties\\prop.properties");
		// 调用完了load方法之后，文件中的键值对数据已经在集合中了
		prop.load(fr);
		fr.close();
		System.out.println(prop);
	}
}
```

```java
// 保存
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;

public class Demo3 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		Properties prop = new Properties();
		prop.put("zhangsan", "123");
		prop.put("lisi", "456");
		prop.put("wangwu", "789");
		FileWriter fw = new FileWriter("src\\Properties\\prop.properties");
		prop.store(fw, "注释");		// 注释不填可以填写null
		fw.close();
	}
}
```

