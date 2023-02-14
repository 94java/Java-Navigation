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
  

简单来说：*内存在读，内存在写*

- 按流向分：输入流、输出流

- 按数据类型分：字节流、字符流

  字节流：操作所有类型的文件（包括音频、视频、图片等）

  字符流：只能操作纯文本文件（包括Java文件、txt文件等）

  一般来说，我们说的IO流的分类是按照*数据类型*来分的

> 纯文本文件：用windows自带的记事本打开能读得懂的文件

![img](http://images.hellocode.top/b6d5fba9b07c454ea68fbb0d98cdb23b.png)



[[toc]]

## 一、File

用处

1. 在读写数据时告诉虚拟机要操作的文件/文件夹在哪

2. 对文件/文件夹本身进行操作，包括创建、删除等

File:是文件和目录路径名的抽象表示

- 表示系统中的文件或者文件夹的路径

- 文件和目录可以通过File封装成对象
- File封装的对象仅仅是一个路径名。它可以是存在的，也可以是不存在的
- File类只能对文件本身进行操作，不能读写文件里面存储的数据

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

> FileOutputStream：操作本地文件的字节输出流，可以把程序中的数据写出到本地文件中

**步骤**

- 创建字节输出流对象(`FileOutputStream fos = new FileOutputStream("指定文件的路径")  `)
  - 参数是字符串表示的路径或者File对象都是可以的
  - 如果文件不存在，会创建一个新的文件，但是要保证父级路径是存在的
  - 如果文件已经存在，会清空文件
- 写数据(`fos.write(数据)`)
  - 给write方法传递一个整数时，写入的数据是这个整数在ASCII码表中对应的字符
- 释放资源(`fos.close();`)
  - 释放资源指令，表示告诉操作系统，已经不再使用这个文件了。每次使用完流必须要释放资源

**字节流写数据的3种方式**

| 方法名                                 | 说明                                                     |
| -------------------------------------- | -------------------------------------------------------- |
| void write(int b)                      | 一次写一个数据                                           |
| void write(byte[] b)                   | 一次写一个字节数组数据                                   |
| void write(byte[] b, int off, int len) | 一次写一个字节数组的部分数据(参数：数组、起始索引、个数) |

**两个小问题**

*字节流写完数据如何实现换行*

- 写完数据后，加换行符
- Windows：`\r\n`（回车换行）
- Linux：`\n`
- Mac：`\r`

> 在windows操作系统中，Java对回车换行进行了优化，虽然完整的是`\r\n`，但是当我们写其中一个`\r`或者`\n`，Java也可以实现换行，因为Java在底层会补全。建议不要省略

*字节流写数据如何实现追加写入呢(保留原数据)？*

- 在`public FileOutputStream(String name, boolean append)`

- true表示续写开关，保留原数据；默认为false

### 2、字节流读数据

> FileInputStream：操作本地文件的字节输入流，可以把本地文件中的数据读取到程序中来

**步骤**

- 创建字节输入流对象(`FileInputStream fis = new FileInputStream("a.txt");`)

  - 如果文件存在，不会报错；如果文件不存在，那么直接报错
  
- 读数据(`int read = fis.read();`)

  - 一次读取一个字节，返回值就是本次读到的那个字节数据，也就是字符在码表中对应的那个数字

  - 如果想要看到的是字符数据，一定要强转成char
  - 读到文件末尾了，read方法会返回-1
  
- 释放资源(`fis.close();`)

  - 每次使用完流必须要释放资源

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

> 复制文件，其实就是把文件中的内容从一个文件中读取出来(*数据源*)，然后写入到另一个文件中(*目的地*)

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
		fos.close();
		fis.close();
	}
}
```

> 释放资源的先后顺序小技巧：先开启的后释放

### 4、定义小数组拷贝

- 如果操作的文件过大，那么速度就会很慢

- 为了解决速度问题，字节流通过创建字节数组，可以一次读写多个数据


一次读一个字节数组的方法

- `public int read(byte[] buffer)`：从输入流读取最多b.length个字节的数据
- 一次读取一个字节数组的数据，每次读取会尽可能把数组装满
- 字节数组的长度一般是1024的整数倍，例如5M：`1024*1024*5`
- 返回值是读入缓冲区的总字节数，也就是本次实际的读取字节个数，并且会把读取到的数据放入定义的字节数组中

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

### 5、IO流中不同JDK版本捕获异常的方式

**基本做法**

```java
try{
    可能出现异常的代码;
}catch(异常类名 变量名){
    异常的处理代码;
}finally{
    执行所有资源释放操作;
}

// 手动释放资源
```

**JDK7方案**

```java
try(创建流对象1;创建流对象2){
    可能出现异常的代码;
}catch(异常类名 变量名){
    异常的处理代码;
}

// 资源用完最终自动释放
```

**JDK9方案**

```java
创建流对象1;
创建流对象2;
try(流1; 流2){
    可能出现异常的代码;
}catch(异常类名 变量名){
    异常的处理代码;
}

// 资源用完最终自动释放
```

> 注意：只有实现了`AutoCloseable`的类最终才能够自动释放资源

## 三、字节缓冲流

> 字节缓冲流：提高读和写的效率

- BufferedOutputStream：字节缓冲输出流
- BufferedInputStream：字节缓冲输入流

**构造方法**

- 字节缓冲输出流：`BufferedOutputStream(OutputStream out)`

- 字节缓冲输入流：`BufferedInputStream(InputStream in)`

- 字节缓冲流仅仅提供缓冲区（8192长度的字节数组），而真正的读写数据还得依靠基本的字节流对象进行操作

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
        // 释放资源（基本流不用手动关闭，会自动关闭）
		bos.close();
		bis.close();
	}
}
```

## 四、字符流&字符缓冲流

### 1、字符集

**基础知识**

- 计算机中储存的信息都是用二进制数表示的
- 1个bit代表1位，1个字节有8个bit位，字节是计算机最小的存储单元
- 按照某种规则，将字符变成二进制，再存储到计算机中，称为编码
- 按照同样的规则，将存储在计算机中的二进制数解析显示出来，称为解码
- 编码和解码的方式必须要一致，否则会导致乱码

**常用编码表**

> 计算机在存储英文时，一个字节足以

*ASCII*（美国信息交换标准代码）：包括了数字，大小写字符和一些常见的标点符号

- ASCII 字符集由美国相关组织规定，其中共有 128 个数据。
- 常用的字符有 48 到 57 是十个阿拉伯数字，65 到 90 是 26 个大写英文字母，97 到 122 是小写英文字母。

- 编码规则：前面补0，补齐8位（计算机最小存储单元一字节）

![image-20230116194850128](http://images.hellocode.top/b6d4dcf8-9bae-11ed-8598-5cea1d84200c.png)

> 注意：ASCII码表中是没有中文的

*GBK*：windows系统默认的码表(系统显示ANSI)。兼容ASCII码表，也包含了21003个汉字，并支持繁体汉字以及部分日韩文字

![image-20230116200359193](http://images.hellocode.top/b70be8a6-9bae-11ed-bf4d-5cea1d84200c.png)

![image-20230116201545704](http://images.hellocode.top/b748d4ee-9bae-11ed-a3c0-5cea1d84200c.png)

- 汉字两个字节存储（一个字节只能存储256个值，不够）
- 从左到右，前面的第一个字节为高位字节，后面的第二个字节为低位字节
- 高位字节二进制一定以1开头，转成十进制之后是一个负数（区分中英文）

> 注意：GBK是中国的码表，一个中文以两个字节的形式存储。但不包含世界上所有国家的文字

*Unicode码表*：由国际组织ISO制定，是统一的万国码，计算机科学领域里的一项业界标准，容纳世界上大多数国家的所有常见文字和符号

- 同样的，Unicode 完全兼容 ASCII 字符集，但是其编码规则有所不同。例如 UTF-16（使用 2-4 个字节），UTF-32（固定使用 4 个字节），UTF-8等，其中 UTF-8 是我们实际开发中常用的编码方式，其使用 1 到 4 个字节的可变字符编码。

- 但是因为表示的字符太多，所有Unicode码表中的数字不是直接以二进制的形式存储到计算机的

- 会先通过UTF-7,UTF-7.5,UTF-8,UTF-16,以及UTF-32进行编码，再存储到计算机，其中最常见的就是UTF-8

- 在 UTF-8 字符编码规则中，ASCII字符集中的字符使用 1 个字节存储，中日韩文字等使用 3 个字节存储，其具以下的规则：

  ![image-20230116204529634](http://images.hellocode.top/b7865b70-9bae-11ed-b68c-5cea1d84200c.png)

  例如 “汉” 字，在 Unicode 字符集中是 47802，转化为二进制是`1011101010111010`，其进行 UTF-8 编码以后是：

  ```
  11101011 1010101010 10111010
  ```

> 注意：Unicode是万国码，以UTF-8编码后一个中文以三个字节的形式存储

> UTF-8不是一个字符集，只是Unicode字符集的一种编码方式

**重点**

- Windows默认使用码表为GBK，一个英文一个字节，一个中文两个字节

- idea和以后工作默认使用Unicode的UTF-8编解码格式，一个英文一个字节，一个中文三个字节

#### 1.1. 字符串的编码解码

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

> IDEA默认采用UTF-8编码，Esclipe默认采用GBK进行编码

**为什么字节流读取文本文件，可能出现乱码？**

- 因为字节流一次读一个字节，而不管GBK还是UTF-8一个中文都是多个字节，用字节流每次只能读其中的一部分，所有就会出现乱码问题
- 编码和解码的方式不统一

*解决*

1. 不要使用字节流读取文本文件
2. 编码解码时使用同一个码表，同一个编码方式

#### 1.2. 字符流读取中文的过程

**字符流 = 字节流 + 编码表**

- 不管是在哪张码表中，中文的第一个字节一定是负数
- GBK码表一个中文两个字节，UTF-8编码格式一个中文三个字节

特点

- 输入流：一次读取一个字节，遇到中文时，一次读取多个字节
- 输出流：底层会把数据按照指定的编码方式进行编码，变成字节再写到文件中

使用场景

- 想要进行拷贝，一律使用字节流或者字节缓冲流
  
- 想要把文本文件中的数据读到内存中，请使用字符输入流
- 想要把内存中的数据写到文本文件中，请使用字符输出流

### 2、写出数据

**步骤**

- 创建字符输出流对象

  | 构造方法                                             | 说明                             |
  | ---------------------------------------------------- | -------------------------------- |
  | `public FileWriter(File file)`                       | 创建字符输出流关联本地文件       |
  | `public FileWriter(String pathname)`                 | 创建字符输出流关联本地文件       |
  | `public FileWriter(File file, boolean append)`       | 创建字符输出流关联本地文件，续写 |
  | `public FileWriter(String pathname, boolean append)` | 创建字符输出流关联本地文件，续写 |

  - 如果文件不存在，就创建。但要保证父级路径存在
  - 如果文件存在且没开启续写，则清空

  > 会创建一个长度为8192的字节数组，写出时先写进缓冲区，当以下三种情况发生时，写入本地文件：
  >
  > 1. 缓冲区满了，会自动将缓冲区数据刷新到本地文件
  > 2. 手动刷新：flush方法
  > 3. 关闭流：在关流之前会自动调用一下flush方法

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
| flush() | 刷新流，将缓冲区中的数据刷新到本地文件中，还可以继续写数据   |
| close() | 关闭流，释放资源，但是在关闭之前会先刷新流。一旦关闭，就不能再写数据 |

> 在写数据后，必须执行刷新流才能将内容最终写入文件种(close会在关闭流前刷新流)

### 3、读取数据

**步骤**

- 创建字符输入流对象

  | 构造方法                             | 说明                       |
  | ------------------------------------ | -------------------------- |
  | `public FileReader(File file)`       | 创建字符输入流关联本地文件 |
  | `public FileReader(String pathname)` | 创建字符输入流关联本地文件 |

  > 底层会关联文件，并创建缓冲区（长度为8192的字节数组）

- 读取数据

  | 成员方法                         | 说明                         |
  | -------------------------------- | ---------------------------- |
  | `public int read()`              | 读取数据，读到末尾返回-1     |
  | `public int read(char[] buffer)` | 读取多个数据，读到末尾返回-1 |

  - 按字节进行读取，遇到中文，一次读取多个字节，读取后解码，返回一个十进制整数
  - 读到文件末尾了，read方法返回-1

  > 底层：
  >
  > 1. 判断缓冲区中是否有数据可以读取
  >
  > 2. 缓冲区中没有数据：就从文件中获取数据，装到缓冲区，每次尽可能装满缓冲区。如果文件中也没有数据了，返回-1
  >
  > 3. 缓冲区有数据：就从缓冲区读取。
  >
  >    空参的read方法：一次读取一个字节，遇到中文读取多个字节，把字节解码并转成十进制返回
  >
  >    有参的read方法：把读取字节，解码，强转三步合并了，强转之后的字符放到数组中

- 释放资源 / 关流：`public int close();`

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

### 4、综合练习

#### 4.1. 拷贝

需求：拷贝一个文件夹，需要考虑子文件夹



#### 4.2. 文件加密

为了保证文件的安全性，就需要对原始文件进行加密存储，在使用的时候再对其进行解密处理

**加密原理**

- 对原始文件中的每一个字节数据进行更改，然后将更改以后的数据存储到新的文件中

**解密原理**

- 读取加密之后的文件，按照加密的规则反向操作，变成原始文件



#### 4.3. 修改文件中的数据

- 文本文件中有以下的数据：`2-1-9-4-7-8`

- 将文件中的数据进行排序，变成以下的数据：`1-2-4-7-8-9`

### 5、字符缓冲流

- BufferedWriter(字符缓冲输出流)：可以将数据高效的写出
- BufferedReader(字符缓冲输入流)：可以将数据高效的读取到内存

> 需要传入FileWriter或者FileReader对象，不能直接传入字符串地址或者File对象

#### 5.1. 字符缓冲流特有方法

BufferedWriter

- `void newLine()`：写一行行分隔符，行分隔符字符串由系统属性定义（跨平台换行）

BufferedReader

- `public String readLine()`：读一行文字。结果包含行内的内容的字符串，不包括任何行终止字符，如果流的结尾已经到达，则为null

#### 5.2. 练习

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

**拷贝文件**

四种方式拷贝文件，并统计各自用时

- 字节流的基本流：一次读写一个字节
- 字节流的基本流：一次读写一个字节数组
- 字节缓冲流：一次读写一个字节
- 字节缓冲流：一次读写一个字节数组

**修改文本顺序**

需求：把《出师表》的文章顺序进行恢复到一个新文件中



**软件运行次数**

需求：实现一个验证程序运行次数的小程序，要求如下：

1. 当程序运行超过3次时给出提示：本软件只能免费使用3次，欢迎您注册会员后继续使用~
2. 程序运行演示如下：
   - 第一次运行控制台输出：欢迎使用本软件，第1次使用免费~
   - 第二次运行控制台输出：欢迎使用本软件，第2次使用免费~
   - 第三次运行控制台输出：欢迎使用本软件，第3次使用免费~
   - 第四次及以后运行控制台输出：本软件只能免费使用3次，欢迎您注册会员后继续使用~

### 6、小结

- 字节流用来拷贝文件
- 字符流用来进行文件的读写
- 缓冲流用来提高效率

## 五、转换流&对象操作流&Properties

### 1、转换流

是对字符流的一个增强，是字符和字节流之间的桥梁，使用时可以按照字符流的步骤使用

- 字符转换输入流：InputStreamReader，字节流到字符流的桥梁，把字节流转换为字符流
- 字符转换输出流：OutputStreamWriter，字符流到字节流的桥梁，把字符流转换为字节流

**使用场景**

- 在JDK11以前，可用于指定编码读写`InputStreamReader("a.txt","utf-8");`【了解即可】

- 在JDK11之后，字符流新推出了一个构造，也可以指定编码表
  
  `FileReader fr = new FileReader("a.txt",charset.forName("UTF-8"));`
  
- 字节流想要使用字符流中的方法

**案例1**

- 需求1：手动创建GBK的文件，把文件中的中文读取到内存中，不能出现乱码

- 需求2：把一段中文按照GBK的方式写到本地文件

- 需求3：将本地文件中的GBK文件，转成UTF-8



**案例2**

利用字节流读取文件中的数据，每次读取一整行，而且不能出现乱码

### 2、序列化流

> 特点：可以把对象以字节的形式写到本地文件，直接打开文件，是读不懂的，需要再次用对象操作流读到内存中

**对象操作流分为两类**

- 对象操作输出流(对象序列化流)：ObjectOutputStream，就是将对象写到本地文件中，或者在网络中传输对象
  - `public final void writeObject(Object object)`：把对象序列化（写出）到文件中
  - 被序列化的对象需要实现Serializable接口（否则会出现NotSerializableException异常）
  - 序列化流写到文件中的数据是不能修改的，一旦修改就无法再次读回来了
- 对象操作输入流(对象反序列化流)：ObjectInputStream，把写到本地文件中的对象读到内存中，或者接收网络中传输的对象
  - `public Object readObject()`：把序列化到本地文件中的对象，读取到程序中来


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

**用对象序列化流序列化了一个对象后，假如我们修改了对象所属的Javabean类（对象实现类），读取数据会不会出问题？**

- serialVersionUID序列号：如果没有手动定义，虚拟机会根据类中的信息自动计算出一个序列号
- 如果我们修改了类中的信息，虚拟机会再次计算出一个序列号

**如果出问题了，如何解决？**

不让虚拟机计算序列号，自己手动给出一个不变的序列号

- `private static final long serialVersionUID = 1L;`

- 1L可以自定义，只要不超出long的范围即可

**如果一个对象中的某个成员变量的值不想被序列化，又该如何实现？**

- 使用关键字`transient`（瞬态关键字）修饰，该关键字标记的成员变量不参与序列化过程

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
		/**while(true){
			try{
				Student stu = (Student) ois.readObject();
				System.out.println(stu);
			} catch(IOException e){
				break;
			}
		}
		*/
        ArrayList<Student> list = (ArrayList<Student>) ois.readObject();
        for(Student stu : list){
            System.out.println(stu);
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

## 六、打印流

**分类**：打印流一般是指：PrintStream、PrintWriter两个类

**特点**

- 打印流只能操作文件目的地，不能操作数据源（只有写，没有读）
- 特有的写出方法可以实现，数据原样写出
  - 打印：97，文件中：97
  - 打印：true，文件中：true
- 特有的写出方法，可以实现自动刷新，自动换行（打印一次数据 = 写出 + 换行 + 刷新）

### 1、字节打印流

| 构造方法                                                     | 说明                         |
| ------------------------------------------------------------ | ---------------------------- |
| `public PrintStream(OutputStream/File/String)`               | 关联字节输出流/文件/文件路径 |
| `public PrintStream(String fileName, Charset charset)`       | 指定字符编码                 |
| `public PrintStream(OutputStream out, boolean autoFlush)`    | 自动刷新                     |
| `public PrintStream(OutputStream out, boolean autoFlush, String encoding)` | 指定字符编码且自动刷新       |

> 字节流底层没有缓冲区，开不开自动刷新都一样

| 成员方法                                           | 说明                                         |
| -------------------------------------------------- | -------------------------------------------- |
| `public void write(int b)`                         | 常规方法：规则和之前一样，将指定的字节写出   |
| `public void println(Xxx xx)`                      | *特有方法*：打印任意数据，自动刷新，自动换行 |
| `public void print(Xxx xx)`                        | *特有方法*：打印任意数据，不换行             |
| `public void printf(String format,Object... args)` | *特有方法*：带有占位符的打印语句，不换行     |

### 2、字符打印流

| 构造方法                                                     | 说明                         |
| ------------------------------------------------------------ | ---------------------------- |
| `public PrintWriter(Writer/File/String)`                     | 关联字节输出流/文件/文件路径 |
| `public PrintWriter(String fileName, Charset charset)`       | 指定字符编码                 |
| `public PrintWriter(Write w, boolean autoFlush)`             | 自动刷新                     |
| `public PrintWriter(Write w, boolean autoFlush, Charset charset)` | 指定字符编码且自动刷新       |

> 字符打印流底层有缓冲区，想要自动刷新需要开启

| 成员方法                                           | 说明                                         |
| -------------------------------------------------- | -------------------------------------------- |
| `public void write(int b)`                         | 常规方法：规则和之前一样，将指定的字节写出   |
| `public void println(Xxx xx)`                      | *特有方法*：打印任意数据，自动刷新，自动换行 |
| `public void print(Xxx xx)`                        | *特有方法*：打印任意数据，不换行             |
| `public void printf(String format,Object... args)` | *特有方法*：带有占位符的打印语句，不换行     |

**System.out.println()**

- `PrintStream ps = System.out;`，获取打印流的对象，此打印流在虚拟机启动的时候，由虚拟机创建，默认指向控制台
- 特殊的打印流，也叫系统中的标准输出流，是不能关闭的，在系统中是唯一的

## 七、解压缩流/压缩流

### 1、解压缩流

- 需要是.zip后缀的压缩包
- 压缩包里面的每一个文件，对应Java中的ZipEntry对象
- 解压本质：把每一个ZipEntry按照层级拷贝到本地另一个文件夹中

**步骤**

1. 创建一个File表示要解压的压缩包

   `File src = new File("D:\\aaa.zip");`

2. 创建一个File表示解压的目的地

   `File dest = new File("D:\\");`

3. 定义一个方法用来解压

   ```java
   public static void unzip(File src, File dest) throws IOException{
       // 创建一个解压缩流用来读取压缩包中的数据
       ZipInputStream zip = new ZipInputStream(new FileInputStream(src));
       // 获取到压缩包里面的每一个zipentry对象
       ZipEntry entry;
       while((entry = zip.getNextEntry()) != null){
           System.out.println(entry);
           if(entry.isDirectory()){
               // 文件夹：需要在目的地dest处创建一个同样的文件夹
               File file = new File(dest, entry.toString());
               file.mkdirs();
           }else{
               // 文件：需要读取到压缩包中的文件，并把它存放到目的地dest文件夹中（按照层级目录进行存放）
               FileOutputStream fos = new FileOutputStream(new File(dest, entry.toString()));
               int b;
               while((b = zip.read()) != -1){
                   // 写到目的地
                   fos.write(b);
               }
               fos.close();
               // 表示在压缩包中的一个文件处理完毕了
               zip.closeEntry();
           }
       }
   }
   ```

### 2、压缩流

- 压缩包里面的每一个文件，对应Java中的ZipEntry对象
- 压缩本质：把每一个（文件 / 文件夹）看出ZipEntry对象放到压缩包中

需求：把`D:\\a.txt`打包成一个压缩包

1. 创建一个File表示要压缩的文件

   `File src = new File("D:\\a.txt");`

2. 创建一个File表示压缩包的位置

   `File dest = new File("D:\\");`

3. 定义一个方法用来压缩

   ```java
   public static void toZip(File src, File dest) throw IOException{
       // 1. 创建压缩流关联压缩包
       ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File(dest,"a.zip")));
       // 2.创建ZipEntry对象，表示压缩包里面的每一个文件夹和文件
       // 参数：压缩包中的路径
       ZipEntry entry = new ZipEntry("a.txt");
       // 3. 把ZipEntry对象放到压缩包中
       zos.putNextEntry(entry);
       // 4. 把src中的数据写到压缩包当中
       FileInputStream fis = new FileInputStream(src);
       int b;
       while((b = fis.read()) != -1){
           zos.write(b);
       }
       zos.closeEntry();
       zos.close();
       fis.close();
   }
   ```

**案例：压缩文件夹**

```java
public static void main(String[] args){
    // 1. 创建File对象表示要压缩的文件夹
    File src = new File("D:\\aaa");
    // 2. 创建File对象表示压缩包放在哪里（压缩包的父级路径）
    File destParent = src.getParentFile(); 
    // 3. 创建File对象表示压缩包的路径
    File dest = new File(destParent, src.getName() + ".zip");
    // 4. 创建压缩流关联压缩包
    ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(dest));
    // 5. 获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包中
    toZip(file,zos,src.getName());
    // 6. 释放资源
    zos.close();
}

// 参数一：数据源
// 参数二：压缩流
// 参数三：压缩包内部的路径
public static void toZip(File src, ZipOutputStream zos, String name){
    // 1. 进入src文件夹
    File[] files = src.listFiles();
    // 2. 遍历数组
    for(File file : files){
        // 3. 判断-文件，变成ZipEntry对象，放入到压缩包中
        ZipEntry entry = new ZipEntry(name + "\\" + file.getName());
        zos.putNextEntry(entry);
        // 读取文件数据，写到压缩包
        FileInputStream fis = new FileInputStream(file);
        int b;
        while((b = fis.read()) != -1){
            zos.write(b);
        }
        fis.close();
        zos.closeEntry();
    }else{
        // 4. 判断-文件夹，递归
        toZip(file,zos,name + "\\" + file.getName());
    }
}
```

## 八、常用工具包

### 1、Commons-io

> Commons-io是apache开源基金会组织提供的一组有关IO操作的开源工具包。Commons-io工具包提供了很多有关io操作的类。有两个主要的类FileUtils, IOUtils

**作用**：提供IO流的开发效率

commons-io工具包提供了很多有关io操作的类，见下表：

| 包                                  | 功能描述                                     |
| ----------------------------------- | -------------------------------------------- |
| org.apache.commons.io               | 有关Streams、Readers、Writers、Files的工具类 |
| org.apache.commons.io.input         | 输入流相关的实现类，包含Reader和InputStream  |
| org.apache.commons.io.output        | 输出流相关的实现类，包含Writer和OutputStream |
| org.apache.commons.io.serialization | 序列化相关的类                               |

```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.4</version>
</dependency
```

#### 1.1. IOUtils 工具类

包路径：org.apache.commons.io.IOUtils;

处理输入 - 输出流。所有成员字段和方法都是静态的

常用静态变量：

```java
static String LINE_SEPARATOR;                        // 行分隔符
static String LINE_SEPARATOR_UNIX = "\n";            // Unix系统的行分隔符
static String LINE_SEPARATOR_WINDOWS = "\r\n";        // Windows系统的行分隔符
```

常用静态方法：

注：类中的所有处理InputStream的方法都带有内部的缓冲区，所以不需要再使用 `BufferedReader`或者 `BufferedInputStream`，默认的缓冲区大小为4K，不过也可以自定义它的大小。

```java
// 把input输入流中的内容拷贝到output输出流中，返回拷贝的字节个数(适合文件大小为2GB以下)
static int copy(Reader input, Writer output)                            // 字符流
static int copy(InputStream input, OutputStream output)                    // 字节流
static void copy(InputStream input, Writer output, Charset encoding)
// 把input输入流中的内容拷贝到output输出流中，返回拷贝的字节个数(适合文件大小为2GB以上)
static long copyLarge(InputStream input, OutputStream output)
static long copyLarge(Reader input, Writer output)
    
// 从流中读取内容，并转换为String的list
static List<String> readLines(InputStream input)
static List<String> readLines(InputStream input, String encoding)
        // input 的类型可以为 InputStream，Reader
        // encoding 的类型可以为 Charset，String

// 把数据写入到输出流中
static void write(String data, OutputStream output)
static void write(String data, OutputStream output, String encoding)
// 把string的List写入到输出流中
static void writeLines(Collection<?> lines, String lineEnding, OutputStream output)
static void writeLines(Collection<?> lines, String lineEnding, OutputStream output, String encoding)
        // data 的类型可以为 byte[]，CharSequence，StringBuffer，String
        // output 的类型可以为 OutputStream，Writer
        // encoding 的类型可以为 Charset，String

// 无条件的关闭一个可被关闭的对象而不抛出任何异常。
// 重载支持关闭所有的InputStream、OutputStream、Reader和Writer。
static void closeQuietly(Closeable closeable)

// 比较两个Reader对象的内容是否相同，相同返回true，否则返回false
static boolean contentEquals(Reader input1, Reader input2)
static boolean contentEquals(InputStream input1, InputStream input2)
// 比较两个Reader对象的内容是否相同，忽略行结束符而比较内容
static boolean contentEqualsIgnoreEOL(Reader input1, Reader input2)

// 从InputStream中返回一个行迭代器。行迭代器将持有一个打开的InputStream的引用。迭代结束后，应当关闭stream来释放内部资源。
static LineIterator lineIterator(InputStream input, String encoding)
        // input 的类型可以为 InputStream，Reader
        // encoding 的类型可以为 Charset，String。传null则使用默认的

// 返回字符输入流缓冲流
static BufferedReader toBufferedReader(Reader reader)
static BufferedReader toBufferedReader(Reader reader, int size)
// 返回字节输入流缓冲流
static InputStream toInputStream(CharSequence input)
static InputStream toInputStream(CharSequence input, String encoding)

// 返回字符串
static String toString(Reader input)
static String toString(InputStream input, String encoding)
static String toString(URI uri)
static String toString(URI uri, Charset encoding)
static String toString(URL url, Charset encoding)
static String toString(URL url, String encoding)
        // input 的类型可以为 InputStream，Reader，byte[]
```

#### 1.2. FileUtils 工具类

包路径：org.apache.commons.io.FileUtils;

操作文件的工具类

常见工具类：

```java
// 读取一个文件以字符串形式返回
static String readFileToString(File file)
static String readFileToString(File file, String encoding)

// 文件复制
static void copyFile(File srcFile, File destFile)
// 复制整个文件夹到另外一个地方
static void copyDirectory(File source, File destination)
// 复制整个文件夹到另外一个地方，过滤一些指定的文件（比如名字，修改时时间等等）
static void copyDirectory(File source, File destination, FileFilter filter)
// 把一个文件复制到一个文件夹中
static void copyFileToDirectory(File srcFile, File destDir)
// 文件夹复制
static void copyDirectoryToDirectory(File srcDir, File destDir)

// 使用指定的编码将CharSequence写入文件中
static void write(File file, CharSequence data)
// 将集合按行写入到文件中
static void writeLines(File file, Collection<?> lines)
// 把字符串写入到一个文件中
static void writeStringToFile(File file, String data)

// 返回一个File对象
static File getFile(String... names)
// 返回表示系统临时目录的File对象
static String getTempDirectory()
// 返回表示用户目录的File对象
static String getUserDirectory()
// 创建了一个迭代器，可以按行遍历给定的文件
static LineIterator lineIterator(File file)
// 返回目录内容的大小
static long sizeOfDirectory(File directory)

// 比较两个文件的内容，返回比较的结果
static boolean contentEquals(File file1, File file2)

// 递归的删除一个文件夹
static void deleteDirectory(File directory)
```

#### 1.3. FilenameUtils 工具类

路径：org.apache.commons.io.FilenameUtils;

常用方法：

```java
// 获取当前系统格式化路径
static String normalize(String filename)
// 获取当前系统无结尾分隔符的路径
static String normalizeNoEndSeparator(String filename)

// 合并目录和文件名为文件全路径
static String concat(String basePath, String fullFilenameToAdd)

// 获取文件名称，包含后缀
static String getName(String filename)
// 获取文件路径去除目录和后缀后的文件名
static String getBaseName(String filename)
// 获取文件的后缀
static String getExtension(String filename)
// 获取文件的完整目录(示例：/D:/aa/bb/cc/)
static String getFullPath(String filename)
// 获取文件的目录不包含结束符(示例：/D:/aa/bb/cc)
static String getFullPathNoEndSeparator(String filename)
// 获取去除前缀的路径(示例：D:/aa/bb/cc/)
static String getPath(String filename)
// 获取去除前缀并结尾去除分隔符的路径(示例：D:/aa/bb/cc)
static String getPathNoEndSeparator(String filename)
// 获取前缀
static String getPrefix(String filename)
// 获取最后一个.(文件名与拓展名的分隔符)的位置
static int indexOfExtension(String filename)
// 获取最后一个分隔符的位置
static int indexOfLastSeparator(String filename)

// 转换分隔符为当前系统分隔符
static String separatorsToSystem(String path)
// 转换分隔符为linux系统分隔符
static String separatorsToUnix(String path)
// 转换分隔符为windows系统分隔符
static String separatorsToWindows(String path)

// 判断文件路径是否相同
static boolean equals(String filename1, String filename2)
// 判断文件路径是否相同，格式化并大小写不敏感    // IOCase.INSENSITIVE
static boolean equals(String filename1, String filename2, boolean normalized, IOCase caseSensitivity)
// 判断文件路径是否相同，格式化并大小写敏感
static boolean equalsNormalized(String filename1, String filename2)
// 判断文件路径是否相同，不格式化，大小写敏感根据系统规则：windows：敏感；linux：不敏感
static boolean equalsOnSystem(String filename1, String filename2)

// 判断文件扩展名是否等于指定扩展名
static boolean isExtension(String filename, String extension)
// 判断文件扩展名是否包含在指定字符串数组中
static boolean isExtension(String filename, String[] extensions)
// 判断文件扩展名是否包含在指定集合中
static boolean isExtension(String filename, Collection<String> extensions)

// 判断文件扩展名是否和指定规则匹配，大小写敏感
static boolean wildcardMatch(String filename, String wildcardMatcher)
// 判断文件扩展名是否和指定规则匹配，大小写不敏感        // IOCase.INSENSITIVE
static boolean wildcardMatch(String filename, String wildcardMatcher, IOCase caseSensitivity)
// 判断文件扩展名是否和指定规则匹配，根据系统判断敏感型：windows:不敏感；linux：敏感
static boolean wildcardMatchOnSystem(String filename, String wildcardMatcher)
    
// 移除文件的扩展名
static String removeExtension(String filename)
// 判断目录下是否包含指定文件或目录
static boolean directoryContains(String canonicalParent, String canonicalChild)
```

### 2、Hutool工具包

| 相关类            | 说明                          |
| ----------------- | ----------------------------- |
| IoUtil            | 流操作工具类                  |
| FileUtil          | 文件读写和操作的工具类        |
| FileTypeUtil      | 文件类型判断工具类            |
| WatchMonitor      | 目录、文件监听                |
| ClassPathResource | 针对ClassPath中资源的访问封装 |
| FileReader        | 封装文件读取                  |
| FileWriter        | 封装文件写入                  |

