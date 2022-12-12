---
title: "基础"
order: 2
category:
  - Java
---

[[toc]]


# Java基础

::: tip
在开始学习前，请确保已正确配置了开发环境，Java官网：https://www.java.com/zh-CN/
:::

## 一、基础语法

### 1、第一个Java程序

![](http://images.hellocode.top/3JXPZ2ftglLI5es.png)

```java
public class Hello{									//定义一个名为Hello的类（
    public static void main(String[] args){			//main入口
        System.out.println("Hello World");			//打印输出Hello World
    }
}
```

### 2、数据类型

- 常量：在程序的执行过程中，其值不会发生改变的量（数据）。

![](http://images.hellocode.top/kQilfqzOVZdct8m.png)

- 变量：就是内存中的存储空间，空间中存储着经常发生改变的值。

![](http://images.hellocode.top/Ny4uzcPJ3Zax1Se.png)

- 基本数据类型

![](http://images.hellocode.top/Ja9UA3IutwWO7br.png)

- 引用数据类型：除了上述8种基本数据类型，其余的都是引用数据类型（引用类型存放在堆里，基本类型存放在栈里）

### 3、键盘录入

::: info 这在正式开发中并不常用，适用于学习阶段或者调试程序
:::

- 目的：为了让数据更加灵活
- 使用步骤
  - 导包：`import java.util.Scanner;`		(需要写在class上面)
  - 创建对象：`Scanner sc = new Scanner(System.in);` 
  - 使用变量接收数据:`int i = sc.nextInt();`

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

> 除了`nextInt()`接收int类型数据，还可以使用`nextLine()`、`next()`等方法接收字符串等数据

### 4、标识符

> 就是给类、方法、变量等起名字的符号

**定义规则**

- 由==数字==、==字母==、==下划线==(_)和==美元符==($)组成。
- 不能以数字开头
- 不能是关键字
- 严格区分大小写

**常见命名约定**

- 小驼峰命名法：==方法==、==变量==

  约定1：标识符是一个单词的时候，首字母小写
  范例1：`name`
  约定2：标识符由多个单词组成的时候，第一个单词首字母小写，其他单词首字母大写
  范例2：`firstName`

- 大驼峰命名法：==类==

  约定1：标识符是一个单词的时候，首字母大写
  范例1：`Student`
  约定2：标识符由多个单词组成的时候，每个单词首字母都大写
  范例2：`GoodStudent`

### 5、类型转换

**隐式转换**：将数据类型中，==取值范围小的==数据，==给取值范围大的==类型赋值，可以直接赋值

```java
int a = 10;		//int占4字节
double b = a;	//double占8字节
```

> 小的给大的，可以直接给
>
> 小的数据和大的数据类型运算，小的会先提升为大的数据类型再进行运算

byte short char 这三种数据在运算的时候，无论是否有更高的数据类型，都会提升为int，然后再进行运算

![](http://images.hellocode.top/9i8UwNOcMK6kej5.png)

**强制转换**：把一个表示==数据范围大==的数值或者变量赋值给另一个表示==数据范围小的变量==
格式：`目标数据类型 变量名 = (目标数据类型)值或者变量;`

```java
int a = 10;		//int 4字节
byte b = (byte)a;		//byte 1字节
int c = (int)88.88;
```

强制类型转换，有可能会发生精度损失

> 精度损失：简单理解，将容积为8升的水倒入容积为4升的桶中，多出的水会洒掉

**类型转换案例**

```java
public class Test{
    public static void main(String[] args){
        byte a = 3;			//①
        byte b = 4;			//②
        byte c = a + b;		//③
        byte d = 3 + 4;		//④
    }
}
```

> ③中错误，在byte short char运算时，会直接提升为int，然后再进行运算;
>
> ④正确：Java存在常量优化机制，3和4是两个常量，会在编译的时候让3和4进行相加，然后判断7是否在byte的取值范围内

### 6、运算符

> 对常量或者变量进行操作的符号

**表达式**：用运算符把常量或者变量连接起来符合Java语法的式子就可以称为表达式。
    不同运算符连接的表达式体现的是不同类型的表达式。

```java
int a = 10;
int b = 20;
int c = a + b; 
```

**算术运算符**：加（+）、减（-）、乘（*）、除（/）、取余（%）

- 在使用除法时需要注意，5/2的结果是2而不是2.5。想要得到小数必须有==浮点数==参与运算

- 字符之间相加时，字符会根据ASCII码值提升为int类型进行运算（0--48   a--97   A--65）
- 在`+`操作中，如果出现了字符串，就是连接运算符，否则就是算术运算符，当连续进行`+`操作时，从左到右逐个执行

```java
int a = 1;
char b = 'a';
System.out.println(a + b);		//输出98

System.out.println("java" + 666);		//java666
System.out.println(1 + 99 +"java");		//100java
System.out.println("5+5=" + 5 + 5);		//5+5=55
System.out.println("5+5=" + (5 + 5));	//5+5=10
```

**自增自减运算符**：自增（++）、自减（--）

*  单独使用时，`++`和`--`在前或者在后时结果都一样
*  当参与其他操作时，在前则先自增（自减）后进行操作；在后则表示先进行相应操作后进行自增（自减）
*  只能操作变量，不能操作常量

**赋值运算符**：赋值(=)、加后赋值(+=)、减后赋值(-=)、乘后赋值(*=)、除后赋值(/=)、取余后赋值(%=)

```java
int a = 10;
a += 20;	//a = a + 20
System.out.println(a);		//30
```

> 注意：扩展运算符底层会自带强制类型转换的功能

**关系（比较）运算符**：等于(\==)、不等(!=)、大于(>)、大于等于(>=)、小于(<)、小于等于(<=)

- 返回结果只有true或者false

**逻辑运算符**

* &（与）：并且，全真则真，一假则假

* |（或）：或者，全假则假，一真则真

* !（非）：取反，真假假真

* ^（异或）：两同为假，不同为真

* 短路逻辑运算符

  &&(短路与)：作用和&相同，但有短路效果

  ||(短路与)：作用和|相同，但有短路效果

> 逻辑短路：`&&`遇到false直接为false,不执行后面代码;`||`遇到true则直接为true，不执行后续代码

**三元运算符**

* 格式：`关系表达式 ? 表达式1 : 表达式2;`

* 执行流程

  首先计算关系表达式的值
  若为true则取表达式1的值
  若为false则取表达式2的值

### 7、流程控制

> 通过一些语句，来控制程序的执行流程

**顺序结构语句**：程序中最简单最基本的流程控制，没有特定的语法结构，按照代码的先后顺序依次执行，程序中大多数代码都是这样的

#### 7.1. if语句

**格式1**

```java
if(关系表达式){
    语句体1；
}else{
    语句体2;
}
```

**执行流程**

1. 首先计算关系表达式的值

2. 如果关系表达式的值为true则执行语句体1

3. 如果关系表达式为false就执行语句体2

4. 继续执行后续代码

```java
import java.util.Scanner;
public class a{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入您的年龄：");
		int age = sc.nextInt();
		if(age >= 18){
			System.out.println("您已成年，可以进入");
		}else{
			System.out.println("对不起，您未成年，不能进入");
		}
	}
}
```

> 如果if语句中的语句体只有一条，那么大括号{}可以省略不写，但是不建议，容易混淆
> if语句小括号后面不要写分号;

**格式2(多条件判断)**

```java
if(判断条件){
    语句体1;
}else if(判断条件2){
    语句体2;
}
...
else{
    语句体n+1;
}
```

```java
import java.util.Scanner;

public class a{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入您的成绩：");
		int score = sc.nextInt();
		if(score >= 90 && score <= 100){
			System.out.println("优秀");
		}else if(score >= 80 && score < 90){
			System.out.println("良好");
		}else if(score >=60 && score < 80){
			System.out.println("及格");
		}else if(score <60 && score >= 0){
			System.out.println("不及格");
		}else{
			System.out.println("请输入正确的成绩！");
		}
	}
}
```

#### 7.2. switch语句

**格式**

```java
switch(表达式){
    case 值1:
        语句体1；
        break;
    case 值2;
        语句体2;
        break;
    ....
    default:
        语句体n+1;
        break;
}
```

**格式说明**

- 表达式（将要被匹配的值）取值为byte、short、int、char、枚举（jdk5）、String（jdk7）
- case:后面跟的是要和表达式比较的值（被匹配的值）
- break：表示中断，结束的意思，用来结束switch语句
- default：表示所有的情况都不匹配的时候，就执行该处的内容，和if语句的else相似

**case穿透**

- 现象：当开始case穿透，后续的case就不会具有匹配的效果，内部的语句都会执行。直到看见break，或者将整体switch语句执行完毕，才会结束
- 应用场景：当多个case语句出现重复现象，就可以考虑使用case穿透来优化代码

#### 7.3. for循环

> 推荐在明确循环次数时使用

**格式**

```java
for(初始化语句;条件判断语句;条件控制语句){
    循环体语句;
}
```

**执行流程**

1. 执行初始化语句
2. 执行条件判断语句，看其结果是true还是false
   - 如果是false，循环结束
   - 如果是true，循环继续
3. 执行循环体语句
4. 执行条件控制语句
5. 回到第2步继续循环

**案例**

```java
//在控制台输出1-5
for(int i = 1;i <= 5;i++){
    System.out.println(i);
}
```

```java
//求1-5的数据和
int sum = 0;
for(int i = 1;i <= 5;i++){
    sum += i;
}
System.out.println(sum);
```

```java
//求1-100的偶数和
int sum = 0;
for(int i = 1;i <= 100;i++){
    if(i % 2 == 0){
        sum += i;
    }
}
System.out.println(sum);
```

```java
//输出所有的水仙花数
//水仙花数：是一个三位数，个位、十位、百位的数字立方和等于原数
for(int i = 100;i <= 999;i++){
    int sum;
    int a = i % 10;
    int b = i / 10 % 10;
    int c = i / 100;
    sum = a * a * a + b * b * b + c * c * c;
    if(sum == i){
        System.out.println(i);
    }
}
```

> `System.out.print()`为同行打印，不换行
> `System.out.println()`自带换行效果，类似于html中的块级元素，独占一行。括号内无内容时可以当作换行符来使用

#### 7.4. while循环

> 不明确循环次数时推荐while

**格式**

```java
while(条件判断语句){
    循环体语句;
    条件控制语句;
}
```

```java
int i = 1;
while(int i <= 100){
    System.out.println(i);
    i++;
}
```

#### 7.5. do...while循环

> 使用较少

**格式**

```java
do{
    循环体语句;
    条件控制语句;
}while(条件判断语句);
```

**三种循环的区别：**

- for循环和while循环先判断条件是否成立，然后决定是否执行循环体（先判断后执行）
- do...while循环先执行一次循环体，然后判断条件是否成立，是否继续执行循环体（先执行后判断）
- for循环语句中所控制的自增变量，在循环结束后，就不能再次被访问到了

#### 7.6. 死循环

```java
//for
for(;;){
    循环体语句;
}
//while
while(true){
    循环体语句;
}
//do...while
do{
    循环体语句;
}while(true);
```

- 应用场景：

​	例如：键盘录入一个1-100之间的整数（用户可能出现误操作现象）

```java
while(true){
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    if(a >= 1 && a <= 100){
        b
    }
}
```

> for循环中，条件语句可以省略，但是`;`不能省略

#### 7.7. continue与break关键字

- continue：跳过某次循环内容，继续开始下一层循环，只能在循环中使用
- break：跳出整个循环，终止循环体内容的执行，只能在循环和switch中使用
- 标号：可以给语句块加标号赋予它们名称，标号位于语句之前。标号只能被continue和break引用。

```java
public class Test{
    public static void main(String[] args){
        int n = 1;
        lo:				//标号
        while(true){
            switch(n){
                case 1:
                    System.out.println("1");
                    break lo;			//通过标号，这里的break将结束外层while循环
            }
        }
    }
}
```

> 语句前只允许加一个标号，标号后面不能跟大括号。通过用break后加标号对处于标号中的语句进行控制。往往标号后是for、while、do-while等循环

### 8、Random

**作用**：用于产生一个随机数

**使用步骤**

1. 导包

   ```java
   import java.util.Random;
   ```

2. 创建对象

   ```java
   Random r = new Random();
   ```

3. 获取随机数

   ```java
   int number = r.nextInt(10);		//获取数据的范围:[0,10)，包括0，不包括10
   int number = r.nextInt(10) + 1;		//获取数据的范围:[1,10]，包括1，也包括10
   ```

**猜数字案例**

```java
import java.util.Random;
import java.util.Scanner;
public class a{
    public static void main(String[] args){
        Random r = new Random();
        int ran = r.nextInt(100) + 1;
        while(true){
            System.out.print("请输入您猜的数字：");
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt();
            if(n > ran){
                System.out.println("猜大了~~");
            }else if(n < ran){
                System.out.println("猜小了~~");
            }else {
                System.out.println("猜恭喜你，猜对了，答案就是" + ran);
                break;
            }
        }
    }
}
```

> 除了使用Random这个类，Math类中也有生成随机数的方法

### 9、数组

> 数组（array）：是一种容器，用来存储==同种==数据类型（或者比它所占字节小的）的多个值

**格式**

```java
//1.数据类型[] 变量名	【最常用】
int[] array;

//2.数据类型 变量名[]		
int array[];
```

#### 9.1. 初始化

> 在Java中，数组必须先初始化，才能使用
>
> 所谓初始化，就是在内存中，为数组容器开辟空间，并将数据存入容器的过程

**动态初始化**：初始化时只指定数组长度，由系统为数组分配初始值

- 只明确元素个数，不明确具体数值时推荐使用

- 格式：`数据类型[] 变量名 = new 数据类型[数组长度];`
- 范例：`int[] arr = new int[3];`
- 注意：打印数组变量名，输出的是数组在内存中的地址值

**静态初始化**：初始化时就可以指定数组要存储的元素，系统还会自动计算出该数组的长度

- 需求中明确了具体数据，直接静态初始化即可

- 格式：`数据类型[] 变量名 = new 数据类型[]{数据1,数据2,数据3,....};`
- 范例：`int[] arr = new int[]{1,2,3};`
- 简化格式：`int[] arr = {1,2,3};`

**内存分配**

> Java程序在运行时，需要在内存中分配空间，为了提高效率，就对空间进行了不同区域的划分
>
> 每一片区域都有特定的处理数据的方式和内存管理方式

- 栈内存：方法运行时，进入的内存，局部变量都存放于这块内存当中
- 堆内存：new出来的内容（引用类型）就会进入堆内存，并且会存在地址值

- 方法区：字节码文件加载时进入的内存
- 本地方法栈：调用操作系统相关资源
- 寄存器：交给CPU去使用

#### 9.2. 数组元素访问

- 数组内存地址的访问：`数组名`
- 数组内部保存的数据的访问：`数组名[索引]`
- 索引从0开始，是连续的，逐一增加
- 数组在创建完毕后，没有赋值也能取出，取出的为默认值

**默认值**

- 整数——0
- 浮点数——0.0
- 布尔——false
- 字符——空字符
- 引用数据类型——null

**数组遍历**：将数组中所有的元素取出来

- 动态获取数组元素个数：`数组名.length`

```java
int arr = {1,2,3,4,5,6,7,8,9};
for(int i = 0; i <= arr.length; i++){
    System.out.println(arr[i]);
}
```

> 注意：遍历是指取出数据的过程，不要局限的理解为：遍历就是打印

#### 9.3. 数据常见操作

**获取最值**

- 定义一个变量，用于保存最大值（或最小值）
- 取数组中的第一个值作为变量的初始值（假设第一个值就是最大/小值）

- 与数组中的剩余数据逐个对比

```java
int[] arr = {1, 2, 3, 4, 5, 6, 7000, 8, 919};
int max = arr[0];
for(int i = 0; i < arr.length; i++){
    if(arr[i] > max) max = arr[i];
}
System.out.println("最大值为：" + max);
```

**数组元素求和**

```java
import java.util.Scanner;
public class test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[];
        int sum = 0;
        for(int i = 0; i < arr.length; i++){
            System.out.print("请输入第" + (i+1) + "个数值：");
            int n = sc.nextInt();
            sum += n;
        }
        System.out.println("数组内的元素的和为：" + sum);
    }
}
```

**数组基本查找**

```java
int[] arr = {19, 28, 37, 46, 50};
Scanner sc = new Scanner(System.in);
System.out.print("请输入您要查找的数据：");
int n = sc.nextInt();
for(int i = 0; i < arr.length; i++){
    if(arr[i] == n){
        System.out.println("您要查找的数据索引为：" + i);
        break;
    }
}
```

#### 9.4. 数组的高级操作

##### 9.4.1. 二分查找

- 前提：数组的元素按照大小、顺序排列
- 每次去掉一半的查找范围


**步骤**

- 定义两个变量，表示要查找的范围。默认min=0，max = 最大索引

- 循环查找，但是min <= max

- 计算出mid的值

- 判断mid位置的元素是否为要查找的元素，如果是直接返回对应索引

- 如果要查找的值在mid左半边，那么min值不变，max = mid - 1，继续下次循环查找

- 如果要查找的值在mid右半边，那么max值不变，max = mid + 1，继续下次循环查找

- 当min > max时，表示要查找的元素在数组中不存在，返回-1

  ```java
  public class MyBinarySearchDemo{
      public static void main(String[] args) {
          int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
          int number = 10;
          int index = binarySearchForIndex(arr, number);
          System.out.println(index);
      }
  
      private static int binarySearchForIndex(int[] arr, int number) {
          // 定义查找的范围
          int min = 0;
          int max = arr.length - 1;
          // 循环查找  min <= max
          while (min <= max) {
              // 计算中间位置
              int mid = (min + max) >> 1;            // 右移一位，也是除以二的意思
              // mid指向的元素 > number
              if (arr[mid] > number) {
                  // 表示要查找的元素在左边
                  max = mid - 1;
              }
              // mid指向的元素 < number
              else if (arr[mid] < number) {
                  // 表示要查找的元素在右边
                  min = mid + 1;
              } else {
                  // mid指向的元素 == number
                  return mid;
              }
          }
          // 如果min大于了max就表示元素不存在，返回-1
          return -1;
      }
  }
  ```

##### 9.4.2. 冒泡排序

> 排序：将一组数据按照固定的规则进行排列

冒泡排序：相邻的数据两两比较，小的放前面，大的放后面。

**步骤**

- 相邻的元素两两比较，大的放右边，小的放左边，找到最大值
- 第一次循环结束，最大值已经找到，在数组的最右边
- 下一次只要在剩余的元素中找最大值就可以了

- 如果有n个数据进行排序，总共需要比较n - 1次
- 每一次比较完毕，下一次的比较就会少一个数据参与

```java
public class MyBubbleSortDemo{
    public static void main(String[] args){
        int[] arr = {3, 5, 2, 1, 4};
        bubbleSort(arr);
        printArr(arr);
    }
    
    private static void bubbleSort(int[] arr){
        // 循环排序
        // 外层循环控制次数，比数组的长度少一次
        for(int i = 0; i < arr.length - 1; i++){
            // 内存循环就是实际比较的次数
            for(int j = 0; j < arr.length - 1 - i; j++){
                // -1为了让数组不越界，-i 是每轮结束后都会减少比较
                if(arr[j] > arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
    
    private static void printArr(int[] arr){
        // 循环遍历
        for(int i = 0; i < arr.length; i++){
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
```

##### 9.4.3. 递归

> 以编程角度来看，递归指的是方法定义中调用方法本身的现象

解决问题的思路：把一个复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算

**递归解决问题要有两个内容**

- 递归出口：否则会出现内存溢出
- 递归规则：与原问题相似的规模较小的问题

**案例**

```java
// 求1~100的和（递归实现）
public class MyFactorialDemo1{
    public static void main(String[] args){
        int sum = getSum(100);
        System.out.println(sum);
    }
    
    private static int getSum(int i){
        if(i == 1){
            return 1;
        }else{
            return i + getSum(i - 1);		// i + (i - 1)的和
        }
    }
}
```

```java
// 需求：用递归求5的阶乘，并把结果在控制台输出
public class MyFactorialDemo2{
    public static void main(String[] args){
        int result = getJc(5);
        System.out.println(result);
    }
    
    private static int getJc(int i){
        // 出口
        if(i == 1){
            return 1;
        }else{
            // 规则（递归下一次调用的，一定更接近出口）
            return i * getJc(i - 1);
        }
    }
}
```

##### 9.4.4. 快排

- 冒泡排序算法中，一次循环结束，就相当于确定了当前的最大值，也能确定最大值在数组中应存入的位置。

- 快速排序算法中，每一次递归时以第一个数为基准数，找到数组中所有比基准数小的。再找到所有比基准数大的。小的全部放左边，大的全部放右边，确定基准数的正确位置

  ```java
  public class MyQuiteSortDemo{
      public static void main(String[] args) {
          int[] arr = {6, 1, 2, 7, 9, 3, 4, 5, 10, 8};
          quiteSort(arr, 0, arr.length - 1);
          for (int i = 0; i < arr.length; i++) {
              System.out.print(arr[i] + " ");
          }
      }
  
      private static void quiteSort(int[] arr, int left, int right) {
          if (right < left) {
              return;
          }
  
          // 记录两个值
          int left0 = left;
          int right0 = right;
  
          // 计算出基准数
          int baseNumber = arr[left0];
          while (left != right) {
              // 1.从右开始找比基准数小的
              while (arr[right] >= baseNumber && right > left) {
                  right--;
              }
              // 2.从左开始找比基准数大的
              while (arr[left] <= baseNumber && right > left) {
                  left++;
              }
              // 3.交换两个值的位置
              int temp = arr[left];
              arr[left] = arr[right];
              arr[right] = temp;
          }
          // 4. 基准数归位
          int temp = arr[left];
          arr[left] = arr[left0];
          arr[left0] = temp;
  
          // 再次递归调用方法
          quiteSort(arr, left0, left - 1);
          quiteSort(arr, left + 1, right0);
      }
  }
  ```

### 10、方法

> 方法就是一段具有独立功能 的代码块，不调用就不执行

#### 10.1. 基本使用

- 方法必须先创建才可以使用，该过程称为方法的定义
- 方法创建后并不是直接运行的，需要手动使用后才执行，该过程称为方法调用

**方法定义**

```java
public void 方法名(){
    //方法体
}
```

**方法调用**：`方法名();`

**注意**

- 方法必须先定义后调用，否则程序将会报错
- 方法与方法之间是平级关系，不能嵌套定义
- 在方法没有被调用的时候，都在方法区中的字节码文件（.class）中存储
- 方法被调用的时候，需要进入到栈内存中运行

#### 10.2. 带参方法

**形参和实参**
形参：全称形式参数，是指方法定义中的参数
实参：全称实际参数，是指方法调用中的参数

**定义**

```java
public void 方法名(参数){
    //方法体
}
```

单个参数：`数据类型 变量名`
多个参数：`数据类型 变量名1 , 数据类型 变量名2 , .....`
**调用**

- `方法名(变量名/常量值);`
- `方法名(变量名1/常量值1 , 变量名2/常量值2 , ...);`

> 方法调用时，参数的数量与类型必须与方法定义中的设置相匹配，否则程序将会报错
>

**带参数方法练习**

```java
// 需求：设计一个方法（print）用于打印n到m之间的所有的奇数
public class a{
    public static void main(String[] args){
        print(10, 20);
    }
    public static void print(int n, int m){
        for(int i = n; i <= m; i++){
            if(i % 2 != 0) {
                System.out.println(i);
            }
        }
    }
}
```

#### 10.3. 带返回值方法

**定义**

```java
public 返回值数据类型 方法名(参数){
    return 数据;
}
```

- 方法定义时，return后面的返回值与方法定义上的数据类型要匹配，否则就会报错
- 在执行代码时，return语句后面的语句都不会执行，属于无效代码
- `return;`可以用于结束方法，也就是方法从栈内存中弹出去，该过程称为方法的弹栈

**调用**：`数据类型 变量名 = 方法名(参数);`



**方法通用格式**

```java
public 修饰符 返回值类型 方法名(参数){
    方法体;
    return 数据;
}
```

> 上面的案例中，方法都有static修饰符，现在只需要知道，在main中调用方法，对应的方法必须由static修饰即可

#### 10.4. 方法重载

> 方法名相同，参数也完全相同，称为方法的重复定义，是一种冲突性的错误
> 在调用方法的时候，Java虚拟机会通过参数的不同来区分同名的方法

- 在同一个类中，定义了多个==同名==的方法，但每个方法具有==不同的参数类型==或==参数个数==，这些同名的方法，就构成了重载关系
- 好处：不用记忆过多繁琐的方法名字
- 注意：识别方法之间是否是重载关系，只看方法名和参数，和返回值无关

> 对于调用方法的人来说，方法的形参数据类型的重要程度要远远高于返回值，所以方法签名就由==方法名+形参列表==构成

**方法重载练习**

```java
// 需求：使用方法重载思想，设计比较两个整数是否相同的方法，兼容全整数类型(byte,short,int,long)
public static void main(String[] args){
    System.out.println(compare(20, 30));
}
public static boolean compare(byte a, byte b){
    return a == b;
}
public static boolean compare(short a, short b){
    return a == b;
}
public static boolean compare(int a, int b){
    return a == b;
}
public static boolean compare(long a, long b){
    return a == b;
}
```

#### 方法的参数传递

1. 当传入基本数据类型时，传入的是具体的数值，且方法中的变量和main中的变量并无联系
2. 当传入引用类型时，传入的是具体的内存地址，这种情况可以在方法中改变引用类型变量的值

**案例**

```java
// 需求：设计一个方法用于数组遍历，要求遍历的结果是在一行上的。例如：[11,22,33,44,55]
public static void main(String[] args) {
        int[] arr = {11, 22, 33, 44, 55};
        printArray(arr);
}
public static void printArray(int[] arr) {
     System.out.print("[");
     for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i]);
        if (i == arr.length - 1) System.out.print("]");
        else {
           System.out.print(", ");
        }
     }
}
```

```java
// 需求：设计一个方法用于获取数组元素中的最大值
public static void main(String[] args){
    int[] arr = {11,33,44,88,22};
    System.out.println("数组中的最大值为：" + max(arr));
}
public static int max(int[] arr){
    int max = arr[0];
    for(int i = 0; i < arr.length; i++){
        if(arr[i] > max) max = arr[i];
    }
    return max;
}
```

```java
// 需求：设计一个方法，该方法中能够同时获取最大值和最小值
public static void main(String[] args){
    int[] arr = {11,22,33,44,2,2393,55};
    int[] res = get(arr);
    System.out.println("最大值为：" + res[0]);
    System.out.println("最小值为：" + res[1]);
}
public static int[] get(int[] arr){
    int max = arr[0];
    int min = arr[0];
    for(int i = 0; i < arr.length; i++){
        if(arr[i] > max) max = arr[i];
        if(arr[i] < min) min = arr[i];
    }
    int[] arrMaxAndMin = {max, min};
    return arrMaxAndMin;
}
```

> 注意：return语句只能同时返回一个值，需要返回多个值的话可以使用数组

### 11、进制

> 指进位制，是人们规定的一种进位方式

#### 11.1. 常见进制

- 二进制：逢二进一，借一当二（只有0和1）
- 八进制：逢八进一，借一当八（0，1，2，3，4，5，6，7）
- 十进制：逢十进一，借一当十
- 十六进制：0\~9，a\~f（其中a\~f表示10~15）

> 计算机数据在底层运算的时候，都是以==二进制==进行的，了解不同的进制，便于我们对数据的运算过程理解的更加深刻

**进制表示**

> 在Java中，数值默认都是==十进制==，不需要加任何修饰

- 二进制：数值前面以`0b`开头，b大小写都可
- 八进制：数值前面以`0`开头
- 十六进制：数值前面以`0x`开头，x大小写都可

注意：书写的时候，虽然加入了进制的标识，但打印在控制台展示的时候都是==十进制==数据

**进制转换**

- 任意进制到十进制公式：系数*基数的权次幂 相加

  - 系数：每一【位】上的数
  - 基数：几进制，就是几
  - 权：从数值的右侧，以0开始，逐个+1增加

- 十进制到任意进制的转换公式：除基取余

  - 使用源数据，不断地除以基数（几进制就是除几）得到余数

  - 一直除到商为0为止
  - 最后将余数倒序拼起来即可

- 快速进制转换法：8421码

  - 8421码又称BCD码，是BCD代码中最常用的一种
  - BCD：（Binary-Coded Decimal）二进制码十进制数
  - 在这种编码方式中，每一位二进制值的1都是代表一个固定数值，把每一位的1代表的十进制数加起来得到的结果就是他所代表的十进制数

#### 11.2. 原码反码补码

> 计算机中的数据，都是以二进制补码的形式在运算。补码是通过反码和原码推算出来的

**原码**：（可直观的看出数据大小）就是二进制定点表示法，最高位为符号位，0正1负，其余位表示数值的大小
一个字节等于8个比特位，也就是8个二进制位

**反码**：（将原码转换为补码）正数的反码与其原码相同，负数的反码是对其原码逐位取反，但符号位除外
**补码**：（数据以该状态进行运算）正数的补码与其原码相同，负数的补码是在其反码的末位加1

> 正数的原反补都是相同的
>
> 负数的【反码】，是根据【原码】取反（0变1，1变0）得到的 （符号位不变）
>
> 负数的【补码】，是根据【反码】的末尾+1得到的

#### 11.3. 位运算

> 位运算指的是二进制位的运算，先将十进制数转换成二进制后再进行运算

在二进制位运算中，1表示true，0表示false

- `&` 位与：遇false则false，遇0则0
- `|` 位或：遇true则true，遇1则1
- `^` 位异或：相同为false，不同为true  (a = a ^ b ^ b)
- `~` 取反：全部取反，0变1，1变0（也包括符号位）

**位移运算符**

`<<` 有符号左移运算，二进制位向左移动，左边符号位丢弃，右边补齐0

运算规律：向左移动几位，就是乘以2的几次幂

`>>` 有符号右移运算：二进制位向右移动，使用符号位进行补位

运算规律：向右移动几位，就是除以2的几次幂

`>>>` 无符号右移运算符，无论符号位是0还是1，都补0

**案例**

```java
// 需求：在不使用第三方变量的情况下，实现两数据交换
public static void main(String[] args){
    int a = 10;
    int b = 20;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    System.out.println(a);
    System.out.println(b);
}
```

```java
// 需求：实现数组元素的反转（交换数组中元素的值）
int[] arr = {11, 22, 33, 44, 55, 66, 77};
for(int start = 0, end = arr.length - 1; start < end; start++, end--){
    int temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
}
for(int i = 0 ; i < arr.length; i++){
    System.out.println(arr[i]);
}
```

### 12、二维数组

> 二维数组也是一种容器，不同于一维数组，该容器存储的都是一维数组容器

**定义格式**

- 格式1：`数据类型[][] 变量名;`
- 格式2：`数据类型 变量名[];`
- 格式3：`数据类型[] 变量名[];`

**动态初始化**：

- `数据类型[][] 变量名 = new 数据类型[m][n];`
- m 表示这个二维数组可以存放多少个一维数组(行)
- n 表示每一个一维数组，可以存放多少个元素(列)

**拓展**：将一个提前创建好的一维数组存储到二维数组中

```java
int[] arr = {11, 22, 33};
int[][] arr2 = new int[1][3];
arr2[0] = arr;
System.out.println(arr2[0][2]);
```

**静态初始化**：

- 格式：`数据类型[][] 变量名 = new 数据类型[][]{{元素1, 元素2,...}, {元素1, 元素2,...}...};`

  ```java
  int[][] arr = new int[][]{
      {1, 2, 3}, 
      {4, 5, 6}
  };
  ```

- 简化格式：`数据类型[][] 变量名 = {{元素1, 元素2,...}, {元素1, 元素2,...}, ...};`

  ```java
  int[][] arr = {
      {1, 2, 3}, 
      {4, 5, 6}
  };
  ```

**二维数组遍历**

- 已知一个二维数组 `arr = {{11, 22, 33}, {33, 44, 55}};`

- 遍历数组，取出所有元素并打印

```java
int[][] arr = {{11, 22, 33}, {33, 44, 55}};
for(int i = 0; i < arr.length; i++){
    for(int j = 0; j < arr[i].length; j++){
        System.out.println(arr[i][j]);
    }
}
```

**案例**

二维数组求和

```java
int sum = 0;
int[][] arr = {{22, 66, 44}, {77, 33, 88}, {25, 45, 65}, {11, 66, 99}};
for(int i = 0; i < arr.length; i++){
    for(int j = 0; j < arr[i].length; j++){
        sum += arr[i][j];
    }
}
System.out.println(sum);
```

## 二、面向对象

**面向对象和面向过程的思想对比**

- 面向过程编程(Procedure Oriented Programming)：是一种以**过程**为中心的编程思想，实现功能的每一步，都是自己实现的

- 面向对象编程(Object Oriented Programming)：是一种以**对象**为中心的编程思想，通过指挥对象实现具体的功能

  对象：指客观存在的事物（万物皆对象）

### 1、类和对象

> 类是对现实生活中一类具有 ==共同属性== 和 ==行为== 的事物的抽象

“类”是对事物，也就是对象的一种描述，可以将类理解为一张设计图，根据设计图，可以创建出具体存在的事物

**类的组成**

- 属性：该事物的各种特征
- 行为：该事物存在的功能（能够做的事情）

- 对象：是能够看得到摸得着的真实存在的实体

> 类是对对象的描述
>
> 对象是类的实体
>
> 一个类可以创建出多个对象

**类的定义**

类的组成：属性和行为

- 属性：在代码中通过==成员变量==来体现（类中方法外的变量）
- 行为：在代码中通过==成员方法==来体现

类的定义步骤

1. 定义类

2. 编写类的成员变量

3. 编写类的成员方法

```java
public class 类名{
    // 成员变量
    变量1的数据类型 变量1;
    String name;		// 未赋值默认null
    变量2的数据类型 变量2;
    int age;			// 未赋值默认0
    ......
    // 成员方法 方法1
    public void study(){
        System.out.println("学习");
    }
    方法2;
    ......
}
```

**对象的创建和使用**

- 创建对象

  格式：`类名 对象名 = new 类名();`

- 使用对象

  使用成员变量：`对象名.变量名`

  使用成员方法：`对象名.方法名();`

案例：定义一个类，然后定义一个手机测试类，在手机测试类中通过对象完成成员变量和成员方法的使用

```java
public class Phone{
    // 成员变量：品牌、价格、....
    String brand;
    int price;
    // 成员方法：打电话、发短信、....
    public void call(String name){
        System.out.println("给" + name + "打电话");
    }
    public void sendMessage(){
        System.out.println("群发短信");
    }
}
```

### 2、对象内存图

**单个对象内存图**
![](http://images.hellocode.top/%E5%8D%95%E4%B8%AA%E5%AF%B9%E8%B1%A1%E5%86%85%E5%AD%98%E5%9B%BE.png)

**两个对象内存图**
![](http://images.hellocode.top/%E4%B8%A4%E4%B8%AA%E5%AF%B9%E8%B1%A1%E5%86%85%E5%AD%98%E5%9B%BE.png)

**两个引用指向同一对象内存图**

![](http://images.hellocode.top/src=http___img-blog.csdnimg.cn_20190829154808628.png_x-oss-process=image_watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNjA5NDc1,size_16,color_FFFFFF,t_70&refer=http___img-blog.webp)

**垃圾回收**

> 当堆内存中，对象 或 数组产生的地址，通过任何方式都不能被找到后，就会被判定为内存中的“垃圾”

垃圾会被Java垃圾回收器，在空闲的时候自动进行清理

**成员变量和局部变量**

- 成员变量：类中方法外的变量；存放于堆内存；随着对象的存亡而存亡；有默认的初始化值
- 局部变量：方法中的变量；存放于栈内存；随着方法调用存在，方法调用完毕结束；无默认初始化值，必须先定义、赋值再使用

### 3、封装

**private**关键字：权限修饰符，可以用来修饰成员，来提高数据的安全性

- 特点：只能在==本类==当中进行访问，外界需要访问可以定义方法来进行 设置值 和 获取值
- 针对private修饰的成员变量，如果需要被其他类引用，提供相应的操作
  - 提供`get变量名();`方法，用于获取成员变量的值，方法用`public`修饰
  - 提供`set变量名();`方法，用于设置成员变量的值，方法用`public`修饰

```java
// 新建Student类
public class Student{
    private String name;
    private int age;
    
    public void setName(String n){
        name = n;
    }
    public String getName(){
        return name;
    }
    public void setAge(int a){
        age = a;
    }
    public int getAge(){
        return age;
    }
    public void show(){
        System.out.println(name + age);
    }
}
```

**this**关键字：可以调用本类的成员（变量，方法），解决局部变量和成员变量重名问题

- 局部变量和成员变量如果重名，Java使用的是就近原则

- `this`代表所在类的对象引用，方法被哪个对象调用，this就代表哪个对象

```java
public class Student{
    private int age;
    public void method(int age){
        this.age = age;			// 添加this关键字，使前一个age成为成员变量，再将局部变量age赋值过去
    }
}
```

**this内存原理**

![img](http://images.hellocode.top/8b3f7f31ad6f4d7daac8fbdda2b0327d.png)

**封装**

- 面向对象三大特征之一（==封装==、==继承==、==多态==）
- 隐藏实现细节，仅对外暴露公共的访问方式（类似于插线板）

常见体现：
- 将 代码 抽取到 方法 中，是对代码的一种封装；将 属性 抽取到 类 中，是对 数据 的一种封装
- 私有的成员变量，提供set和get方法

好处
- 提高了代码的安全性
- 提高了代码的复用性

### 4、构造方法

> 构建、创造对象的时候，所调用的方法

**格式**

1. 方法名与类名相同，大小写也要一致
2. 没有返回值类型，连void也没有
3. 没有具体的返回值（不能由return带回结果数据）

```java
public class Student{
    public Student(){
        System.out.println("这是Student类的构造方法");
    }
}
```

**执行时机**

1. 创建对象的时候调用，每创建一次对象，就会执行一次构造方法
2. 不能手动调用构造方法

**作用**：用于给对象的数据（属性）进行 初始化

```java
class Student{
    private int age;
    public Student(int age){
        this.age = age;
    }
}
```

**注意事项**

- 如果没有定义构造方法，系统将给出一个默认的无参数的构造方法
- 如果定义了构造方法，系统将不再提供默认的构造方法

**标准类的代码编写和使用**

```java
/*
	JavaBean类：封装数据的类
*/
public class Student{
    // 私有变量
    private String name;
    private int age;
    
    // 无参数构造方法
    public Student(){}
    //有参数构造方法
    public Student(String name, int age){
        this.name = name;
        this.age = age;
    }
    
    //set/get方法
    public void setName(String name){
        this.name = name;
    }
    
    public String getName(){
        return name;
    }
    
    public void setAge(int age){
        this.age = age;
    }
    
    public String getAge(){
        return age;
    }
}
```

### 5、分类和static

#### 5.1. 分类思想

> 分类思想：分工协作，专人干专事

- domain类：实体类，封装对应的实体信息
- Dao类：(Data Access Object缩写)用于访问存储数据的数组或集合（数据库）
- Service类：用来进行业务逻辑的处理（例如：判读录入的id是否存在）
- Controller类：和用户打交道（接收用户需求，采集用户信息，返回数据给用户）

#### 5.2. 分包思想

> 分包思想：如果将所有的类文件都放在同一个包下，不利于管理和后期维护

对于不同功能的类文件，可以放在不同的包（本质上就是文件夹）下进行管理

**创建包**（单级包、多级包）

- 多级包之间使用"."进行分割

- 多级包的定义规范：公司的网站地址翻转（去掉www）

- 比如：www.hellocode.top
  
  后期所定义的包结构就是:top.hellocode.其他的包名。

- 包的命名规则：英文字母都是小写

**包的定义**

- 使用`package`关键字定义包
- 格式：`package 包名;`（如果是多级包，中间用"."进行分割）

**包的注意事项**

- package语句必须是程序的第一条可执行代码
- package语句在一个Java文件中只能有一个
- 如果没有package，默认表示无包名

**类与类之间的访问**

- 同一个包下的访问
  
  不需要导包，直接使用即可
  
- 不同包下的访问
  1. import 导包后访问
  
  2. 通过全类名（包名+类名）访问
     
     应用场景：多个包下，出现了相同的类名，就可以使用这种方式进行区分

**注意事项**

import、package、class三个关键字的摆放位置存在顺序关系

- package必须是程序的第一条可执行代码
- import需要写在package下面
- class需要在import下面

#### 5.3. static关键字

> static关键字是静态的意思，修饰符，可以修饰成员变量、成员方法

- 被static修饰的成员变量，一般叫做静态变量
- 被static修饰的成员方法，一般叫做静态方法

**特点**

- 被类所有的对象共享，是我们判断是否使用静态关键字的条件
- 随着类的加载而加载，优先于对象存在，对象需要类被加载后，才能创建
- 可以通过类名调用，也可以通过对象名调用（推荐使用类名调用）

**注意**

- 静态方法中，只能访问静态成员（成员变量、成员方法）
- 静态方法中，没有this关键字

### 6、继承

> 让 类与类之间产生关系（子父类关系），子类可以直接使用父类中非私有的成员

- 格式：`public class 子类名 extends 父类名{}`
- 范例：`public class Zi extends Fu{}`
- Fu:是父类，也被称为基类、超类
- Zi：是子类，也被称为派生类

#### 6.1. 优劣

**优点**

- 提高了代码的复用性
- 提高了代码的维护性
- 让类与类之间产生了关系，是多态的前提

**弊端**

- 继承是侵入性的

- 降低了代码的灵活性
  

继承关系，导致子类 必须 拥有父类非私有属性和方法，让子类自由的世界中多了些约束

- 增强了代码的耦合性（代码与代码之间存在的关联都可以称之为“耦合”）

  > 程序设计追求“高内聚，低耦合”

**应用场景**

- 当类与类之间，存在相同（共性）的内容，并且产生了is am的关系，就可以考虑使用继承，来优化代码

**Java继承的特点**

- Java只支持单继承，不支持多继承，但支持多层继承

#### 6.2. 成员变量

**访问顺序**

1. 在子类自身局部范围找

2. 在子类自身成员范围找

3. 在父类成员范围找

> 如果子父类中，出现了重名的成员变量，通过 就近原则 ，会优先使用子类的
> 如果一定要使用父类的，可以通过`super`关键字进行区分

**super关键字**

- `super`和`this`关键字的用法相似
- this：代表本类对象的引用
- super：代表父类存储空间的标识（可以理解为父类对象引用）

#### 6.3. 方法重写

> 在继承体系中，子类出现了和父类中一模一样的方法声明，可以在子类中对父类方法进行重写

**应用场景**

当子类需要父类的功能，而功能主体子类有自己特有内容，可以重写父类中的方法，这样，既沿袭了父类的功能，又定义了子类特有的内容

**区别**

- 方法重写：在继承体系中，子类出现了和父类一模一样的方法声明（方法名，参数列表，返回值类型）
- 方法重载：在同一个类中，方法名相同，参数列表不同，与返回值无关

> 方法重写是子类对父类方法的增强，方法重载是针对同一个方法名的不同参数做扩展

**注意事项**

- 父类中私有方法不能被重写

- 父类静态方法，子类必须通过静态方法进行重写

  > 严格来说，静态方法不能被重写！
  >
  > 如果子类中，也存在一个一模一样的方法，可以理解为子类将父类中同名的方法隐藏了起来，并非是方法重写！

- 父类非静态方法，子类也必须通过非静态方法进行重写

- 子类重写父类方法时，访问权限必须大于等于父类

#### 6.4. 权限修饰符

|   修饰符    | 同一个类中 | 同一个包中子类无关类 | 不同包的子类 | 不同包的无关类 |
| :---------: | :--------: | :------------------: | :----------: | :------------: |
| **private** |     √      |                      |              |                |
|    默认     |     √      |          √           |              |                |
|  protected  |     √      |          √           |      √       |                |
| **public**  |     √      |          √           |      √       |       √        |

#### 6.5. 构造方法

子类中所有的构造方法默认都会访问父类中无参的构造方法

> 子类在初始化的时候，有可能会使用到父类中的数据，如果父类没有完成初始化，子类将无法使用父类的数据(子类在初始化前，一定要先完成父类的初始化)

- 构造方法的第一条语句默认都是:`super();`
- 注意：如果我们编写的类，没有手动指定父类，系统也会自动继承Object（Java继承体系中的最顶层父类）


**访问特点**

- 如果父类中没有空参构造方法，只有带参构造方法，会出现错误
- 可以在子类通过super，手动调用父类的带参构造方法

> 注意：`this()`和`super()`调用构造方法时，必须放在构造方法的第一行有效语句，并且二者不能共存

### 7、抽象类

- 抽象方法：将共性的行为（方法），抽取到父类之后，发现该方法的实现逻辑无法在父类中给出具体明确，该方法就可以定义为抽象方法。
- 抽象类：如果一个类中存在抽象方法，那么该类就必须声明为抽象类。

> 使用abstract修饰并且没有方法体的方法叫做抽象方法。包含抽象方法的类一定是抽象类

**定义格式**

- 抽象方法：`public abstract 返回值类型 方法名(参数列表);`
- 抽象类：`public abstract class 类名{}`

#### 7.1. 注意事项

- 抽象类不能实例化（创建对象）
- 抽象类中有构造方法（在创建子类对象时，初始化抽象类自动调用）
- 抽象类的子类
  - 要么重写父类中所有的抽象方法
  - 要么将自己也变成一个抽象类（了解）
- 抽象类中的方法
  - 抽象类中可以没有抽象方法，但是有抽象方法的类一定是抽象类

#### 7.2. 模板设计模式

- 设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。

  使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性、程序的重用性。
  通俗来说就是==写代码的风格==

- 模板设计模式：把抽象整体就可以看做成一个模板，模板中不能决定的东西定义成抽象方法
  				让使用模板的类（继承抽象类的类）去重写抽象方法实现需求

- 优势：模板已经定义了通用结构，使用者只需要关心自己需要实现的功能即可

#### 7.3. final关键字

- 修饰方法：表明该方法是最终方法，不能被重写
- 修饰变量：表明该变量是常量，不能再次被赋值
  - 修饰基本数据类型变量：其值不能被更改
  - 修饰引用数据类型变量：地址值不能被更改，但是可以修改对象的属性值
  - final修饰成员变量，需要在创建的时候直接赋值或者在构造方法结束之前完成赋值
- 修饰类：表明该类是最终类，不能被继承

**常量的命名规范**

- 如果是一个单词，所有字母大写
- 如果是多个单词，所有字母大写，每个单词中间使用下划线_分隔

### 8、代码块

> 在Java中，使用`{}`括起来的代码都被称为代码块

**分类**

局部代码块
- 位置：方法中定义
- 作用：限定变量的生命周期，及早释放，提高内存利用率

构造代码块
- 位置：类中方法外定义
- 特点：每次构造方法执行的时候，都会执行该代码块中的代码，并且在构造方法执行前执行
- 作用：将多个构造方法中相同的代码，抽取到构造代码块中，提高代码的复用性

静态代码块
- 位置：类中方法外定义
- 特点：需要通过`static`关键字修饰，随着类的加载而加载，并且只执行一次
- 作用：在类加载的时候做一些数据初始化的操作

### 9、接口

> 当一个类中所有方法都是抽象方法的时候，我们就可以将其定义为接口
>
> 接口也是一种引用数据类型，它比抽象类还要抽象

**意义**

- 规则的定义
- 程序的扩展性

**定义和特点**

- 使用interface关键字：`public interface 接口名{}`

- 接口不能实例化（创建对象）

- 接口和类之间是实现关系，通过`implements`关键字表示
  
  `public class 类名 implements 接口名{}`

- 支持单接口实现，也支持多实现

  `public class 类名 implements 接口名1,接口名2{}`

**接口的子类（实现类）**

- 要么重写接口中的所有抽象方法
- 要么是抽象类

**成员的特点**

- 成员变量

  只能是常量，系统会默认加入三个关键字:`public`、`static`、`final`

- 构造方法
  

接口中不存在构造方法

- 成员方法
  

只能是抽象方法（JDK7以前），系统会默认加入两个关键字：`public`、`abstract`

> **JDK8中接口成员的特点**
>
> 允许接口中定义非抽象方法，但是需要使用关键字`default`修饰，这些方法就是默认方法
>
> 定义格式：`public default 返回值类型 方法名(参数列表){}`
>
> 默认方法不是抽象方法，所以不强制重写，但是可以被重写，重写的时候去掉default关键字
>
> public可以省略，但是default不能省略
>
> 如果实现了多个接口，多个接口中存在相同的方法声明，子类就必须对该方法进行重写

**使用思路**

- 如果发现一个类中所有的方法都是抽象方法，那么就可以将该类改进为一个接口
- 涉及到了接口大面积更新方法，而不想去修改每一个实现类，就可以将更新的方法，定义为带有方法体的默认方法
- 希望默认方法的调用更加简洁，可以考虑设计为static静态方法(需要去掉default关键字)
- 默认方法中出现了重复的代码，可以考虑抽取出一个私有方法(需要去掉default关键字)

**类和接口的关系**

- 类和类的关系
  
  继承关系，只能单继承，但是可以多层继承
  
- 类和接口的关系
  
  实现关系，可以单实现，也可以多实现，还可以在继承一个类的同时实现多个接口
  
- 接口和接口的关系
  
  继承关系，可以单继承，也可以多继承

### 10、多态

> 同一个对象，在不同时刻表现出来的不同形态

**前提**

- 要有（继承 / 实现）关系
- 要有方法重写
- 要有父类引用，指向子类对象

**成员访问特点**

- 构造方法：同继承一样，子类会通过super访问父类构造方法
- 成员变量：编译看（等号）左边（父类），执行看（等号）右边（父类）
- 成员方法：编译看（等号）左边（父类），执行看（等号）右边（子类）

**优劣点**

- 好处：提高了程序的扩展性
  
  具体体现：定义方法的时候，使用父类型作为参数，该方法就可以接收这父类的任意子类对象
  
- 弊端：不能使用子类的特有功能

> 如果被转的引用类型变量，对应的实际类型和目标类型不是同一种类型，那么在转换的时候就会出现 ClassCastException 异常

**instanceof关键字**

- 使用格式：`变量名 instanceof 类型`
- 通俗的理解：判断关键字左边的变量，是否是右边的类型，返回boolean类型结果
- 可以在强制转型前使用该关键字进行判断，以增强程序的健壮性

### 11、内部类

> 就是在一个类中定义一个类。举例：在A类的内部定义一个B类，B类就被称为内部类

#### 11.1. 成员内部类

- 位置：在类的成员位置

- 创建内部类对象的格式：`外部类名.内部类名 对象名 = new 外部类对象().new 内部类对象()`

**内部类的访问特点**

- 内部类可以直接访问外部类的成员，包括私有
- 外部类要访问内部类的成员，必须创建对象

也属于成员，可以被一些修饰符修饰
- `private`
  
  私有成员内部类访问：在自己所在的外部类中创建对象访问
  
- `static`
  
  静态成员内部类访问格式：`外部类名.内部类名 对象名 = new 外部类名.内部类名();`
  
  静态成员内部类中的静态方法：`外部类名.内部类名.方法名();`

#### 11.2. 局部内部类

- 概述：局部内部类是在方法中定义的类，所以外界无法直接使用，需要在方法内部创建对象并使用，该类可以直接访问外部类的成员，也可以访问方法内的局部变量

- 位置：类的局部位置

#### 11.3. 匿名内部类

> 本质上是一个特殊的局部内部类(定义在方法内部)【使用次数远远大于成员内部类和局部内部类】

- 前提：需要存在一个接口或类

- 格式

  ```java
  new 类名或者接口名(){
      重写方法;
  }
  ```

- 理解：将继承\实现，方法重写，创建对象三个步骤放在了一步进行

- 使用场景

  当方法的形式参数是接口或者抽象类时，可以将匿名内部类作为实际参数进行传递

### 12、Lambda表达式

> Lambda表达式，是对匿名内部类进行了优化，代码更少，关注点更加明确

**函数式编程思想**

在数学中，函数就是有输入量、输出量的一套计算方案，也就是“拿数据做操作”

面向对象思想强调“必须通过对象的形式来做事情”

函数式思想则尽量忽略面向对象的复杂语法：“强调做什么，而不是以什么形式去做”

Lambda表达式就是函数式思想的体现

**标准格式**

- 格式：`(形式参数) -> {代码块}`
- 形式参数：如果有多个参数，参数之间用逗号隔开；如果没有参数，留空即可
- `->`:由英文中画线和大于符号组成，固定写法，代表指向动作
- 代码块：是我们具体要做的事情，也就是以前写的方法体内容

**使用前提**

- 有一个接口
- 接口中有且仅有一个抽象方法

**练习**

1. 编写一个接口(`ShowHandler`)

2. 在该接口中存在一个抽象方法(show),该方法是无参数无返回值

3. 在测试类(`ShowHandlerDemo`)中存在一个方法(`useShowHandler`)

   方法的参数是`ShowHandler`类型的

   在方法内部调用了`ShowHandler`的show方法

```java
public class TestLambda{
    public static void main(String[] args){
        // 匿名内部类实现
        useShowHandler(new ShowHandler(){
            @Override
            public void show(){
                System.out.println("我是匿名内部类中的show方法");
            }
        });
        
        // Lambda实现
        useShowHandler(() -> {System.out.println("我是匿名内部类中的show方法");});
    }
    public static void useShowHandler(ShowHandler showHandler){
        showHandler.show();
    }
}

interface ShowHandler{
    void show();
}
```

1. 首先存在一个接口(`StringHandler`)
2. 在该接口中存在一个抽象方法(`printMessage`),该方法是有参数无返回值
3. 在测试类(`StringHandlerDemo`)中存在一个方法(`useStringHandler`)，方法的参数是`StringHandler`类型的，在方法内部调用了`StringHandler`的`printMessage`方法

```java
public class StringHandlerDemo{
    public static void main(String[] args){
        // 匿名内部类实现
        useStringHandler(new StringHandler(){
            @Override
            public void printMessage(String msg){
                System.out.println("我是匿名内部类." + msg);
            }
        });
        
        // Lambda实现
        useStringHandler((String msg) -> {System.out.println("我是Lambda" + msg);});
    }
    
    public static void useStringHandler(StringHandler stringHandler){
        stringHandler.printMessage("坚持学习！");
    }
}

interface StringHandler{
    void printMessage(String msg);
}
```

**省略规则**

- 参数类型可以省略，但是有多个参数的情况下，不能只省略一个
- 如果参数有且仅有一个，那么小括号可以省略
- 如果代码块的语句只有一条，可以省略大括号和分号，甚至是return

```java
useStringHandler(msg -> System.out.println("我是Lambda" + msg));
```

**Lambda表达式和匿名内部类的区别**

所需类型不同

- 匿名内部类：可以是接口，也可以是抽象类，还可以是具体类
- Lambda：只能是接口

使用限制不同

- 如果接口中有且仅有一个抽象方法，可以使用Lambda表达式，也可以使用匿名内部类
- 如果接口中多于一个抽象方法，只能使用匿名内部类，而不能使用Lambda表达式

实现原理不同

- 匿名内部类：编译之后，产生一个单独的.class字节码文件
- Lambda表达式：编译之后，没有一个单独的.class字节码文件，对应的字节码会在运行的时候动态生成

## 三、API

> API(**A**pplication **P**rogramming **I**nterface):应用程序编程接口

编写程序去控制踢足球，程序需要向机器人发出向前跑、向后跑、射门、抢球等各种命令。机器人厂商一定会提供一些用于控制机器人的接口类，这些类中定义好了操作机器人各种动作的方法。其实，这些接口类就是机器人厂商提供给应用程序编程的接口，大家把这些类称为API。

### 1、Object

> 每个类都可以将Object作为父类。所有类都直接或间接的继承自该类

- 当我们打印一个对象时就是打印这个对象的`toString()`方法的返回值
- 如果没有对该方法进行重写，默认使用Object中定义的`toString()`方法
- Object类的toString方法得到的是对象的地址值

#### 1.1. 常用方法

|              方法名               |                            说明                            |
| :-------------------------------: | :--------------------------------------------------------: |
|     public String toString()      | 返回对象的字符串表示形式。建议所有子类重写该方法，自动生成 |
| public boolean equals(另一个对象) | 比较对象是否相等。默认比较地址，重写可以比较内容，自动生成 |

#### 1.2. 面试题

```java
public class InterviewTest{
    public static void main(String[] args){
        String s1 = "abc";
        StringBuilder sb = new StringBuilder("abc");
        System.out.println(s1.equals(sb));		// false
        // 此时调用的是String类中的equals方法
		// 会先判断是否是字符串，若不是字符串则不会比较属性值，直接返回false
        System.out.println(sb.equals(s1));		// false
        // 此时调用的是StringBuilder中的equals方法，StringBuilder并没有该方法，则继承Object中的equals方法
        // 即比较地址值，返回false
    }
}
```

#### 1.3. Objects

- 无构造方法，所有成员方法都是静态方法(static)，可以直接根据类名调用


**常用方法**

|                     方法名                     |                          说明                          |
| :--------------------------------------------: | :----------------------------------------------------: |
|      public static String toString(对象)       |             返回参数中对象的字符串表示形式             |
| public static String toString(对象,默认字符串) | 返回对象的字符串表示形式，如果对象为空，返回默认字符串 |
|       public static Boolean isNull(对象)       |                    判断对象是否为空                    |
|      public static Boolean nonNull(对象)       |                   判断对象是否不为空                   |

### 2、Arrays

> Arrays类包含用于操作数组的各种方法

|                     方法名                      |                说明                |
| :---------------------------------------------: | :--------------------------------: |
|     public static String toString(int[] a)      | 返回指定数组的内容的字符串表示形式 |
|        public static void sort(int[] a)         |     按照数字顺序排列指定的数组     |
| public static int binarySearch(int[] a,int key) |   利用二分查找返回指定元素的索引   |

`public static int binarySearch(int[] a,int key)`

1. 数组必须有序

2. 如果查找的元素存在，那么返回的是这个元素实际的索引

3. 如果要查找的元素不存在，那么返回的是(-插入点-1)

   插入点：如果这个元素在数组中，他应该在的索引位置

### 3、String和StringBuilder

#### 3.1. String

> String类在`java.lang`包下，使用时不需要导包（在这个包下的类都可以直接使用）

String类代表字符串，Java程序中的所有字符串字面值（如："abc"）都作为此类的方法实现

**常见构造方法**

- `public String()`：创建一个空白字符串对象，不含有任何内容
- `public String(char[] chs)`：根据字符数组的内容，来创建字符串
- `public String(String original)`：根据传入的字符串内容，来创建字符串对象
- `String s = "abc";`：直接赋值的方式创建字符串对象，内容就是abc

> String 这个类比较特殊，打印其对象名的时候，不会出现内存地址，而是该对象所记录的真实内容（重写了`toString()`）

**创建字符串对象的区别对比**

以`""`方式给出的字符串，只要字符序列相同（顺序和大小写），无论在程序代码中出现几次，JVM都只会建立一个String对象，并在字符串常量池中维护

> 字符串常量池：当使用双引号创建字符串对象的时候，系统会检查该字符串是否在字符串常量池中存在。若不存在，则创建；存在则不会重新创建，直接使用

> 注意：字符串常量池从JDK7开始，从方法区挪到了堆内存
>
> 扩展：`==`在比较基本数据类型时比较值，在比较引用数据类型时比较地址是否相同

通过new创建的字符串对象，每一次new都会申请一个内存空间，虽然内容相同，但是地址值不同

**特点**

- Java程序中所有双引号字符，都是String类的对象
- 字符串不可变，它们的值在创建后不能被更改
- 虽然String的值是不可变的，但是他们可以被共享

**字符串比较**

字符串是对象，他比较内容是否相同，是通过`equals()`实现的：

```java
String s1 = "abc";
String s2 = "ABC";
s1.equals(s2);		//false
//equalsIgnoreCase()方法比较字符串不区分大小写
s1.equalsIgnoreCase(s2);	//true	
```

**常用方法**

|                            方法名                            |                             说明                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                    char charAt(int index)                    |               返回指定索引处的char值（0开始）                |
|                         int length()                         |                      返回此字符串的长度                      |
|                     char[] toCharArray()                     |               将当前字符串拆分为字符数组并返回               |
|               String substring(int beginIndex)               | 从传入的索引位置处，向后截取，一直截取到末尾，得到新的字符串并返回 |
|        String substring(int beginIndex, int endIndex)        | 从beginIndex索引位置开始截取，截取到endIndex索引位置，得到新的字符串并返回（含头不含尾） |
| String replace(CharSequence target, CharSequence replacement) | 将当前字符串中的target(被替换的旧值)内容，使用replacement(替换的新值)进行替换,返回新的字符串 |
|                 String[] split(String regex)                 | 根据传入的字符作为规则进行切割，将切割后的内容存入字符串数组中，并将字符串返回(数组) |

**案例**

```java
// 需求：已知用户名和密码，请用程序实现模拟用户登录，总共给三次机会，登录之后，给出相应的提示
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        String userName = "abcde";
        String passWord = "abc666";
        int count = 0;
        Scanner sc = new Scanner(System.in);
        for(int i = 0; i < 3; i++){
            System.out.print("请输入用户名：");
            String user = sc.nextLine();
            System.out.print("请输入密码：");
            String pass = sc.nextLine();
            if(userName.equals(user) && passWord.equals(pass)){
                System.out.println("恭喜您，登录成功！");
                break;
            }else{
                System.out.println("账号或密码错误，请重试");
                count++;
            }
        }
        if(count >= 3) System.out.println("登录失败次数过多，请稍后重试");
    }
}
```

```java
// 需求：键盘录入一个字符串，使用程序实现在控制台遍历该字符串，将字符串拆分为字符数组
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入字符串：");
        String s = sc.nextLine();
        /*
        for(int i = 0; i < s.length(); i++){
            System.out.print(s.charAt(i) + " ");
        }
        */
        char[] chars = s.toCharArray();
        for(int i = 0; i < chars.length; i++){
            System.out.print(chars[i] + " ");
        }
    }
}
```

```java
//需求： 键盘录入一个字符串，统计该字符串中大写字母字符，小写字母字符，数字字符出现的次数（不考虑其他字符）
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入字符串：");
        String s = sc.nextLine();
        char[] chars = s.toCharArray();
        int num = 0;
        int english = 0;
        int English = 0;
        for(int i = 0; i < chars.length; i++){
            if(chars[i] >= '0' && chars[i] <= '9') num++;
            else if(chars[i] >= 'a' && chars[i] <= 'z') english++;
            else if(chars[i] >= 'A' && chars[i] <= 'Z') English++;
        }
        System.out.println("数字：" + num + " 小写字母：" + english + " 大写字母:" + English);
    }
}
```

```java
// 需求：以字符串的形式从键盘接收一个手机号，将中间四位号码屏蔽
// 最终效果：183****4828
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入手机号：");
        String s = sc.nextLine();
        String begin = s.substring(0, 3);
        String end = s.substring(7, 11);
        System.out.println("最终手机号为：" + begin + "****" + end);
    }
}
```

```java
// 需求：键盘录入一个字符串，如果字符串中包含（TMD），则使用***替换
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入内容：");
        String s = sc.nextLine();
        String result = s.replace("TMD", "***");
        System.out.println("您输入的内容为：" + result);
    }
}
```

```java
// 需求：以字符串的形式从键盘录入学生信息，例如："张三,23"从该字符串中切割出有效数据，封装为Student学生对象

// 新建一个Student类
public class Student{
    private String name;
    private String age;
    public Student(){}
    public Student(String name, String age){
        this.name = name;
        this.age = age;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getAge(){
        return age;
    }
    public void setAge(String age){
        this.age = age;
    }
}

//-----------下面为一个新的class文件-----------

import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入您的信息：");
        String stuInfo = sc.nextLine();
        String[] sArr = stuInfo.split(",");
        Student stu = new Student(sArr[0], sArr[1]);
        System.out.println("姓名：" + stu.getName() + " 年龄：" + stu.get)
    }
}
```

#### 3.2. StringBuilder

> 当字符串之间使用 + 拼接的时候，系统底层会自动创建一个StringBuilder对象，然后再调用其append方法完成拼接，拼接后，再调用toString方法转换为String类型

- 概述：StringBuilder 是一个可变的字符串类，我们可以把它看成是一个容器

- 作用：提高字符串的操作效率


**构造方法**

- `public StringBuilder()` ：创建一个空白可变字符串对象，不含有任何内容

- `public StringBuilder(String str)`：根据字符串的内容，来创建可变字符串对象

**常用方法**

| 方法名                                | 说明                        |
| ------------------------------------- | --------------------------- |
| public StringBuilder append(任意类型) | 添加数据，并返回对象本身    |
| public StringBuilder reverse()        | 返回相反的字符序列          |
| public int length()                   | 返回长度（字符出现的个数）  |
| public String toString()              | 把StringBuilder转换为String |

```java
StringBuilder sb = new StringBuilder();
//链式编程：如果一个方法返回的是对象类型，对象就可以继续向下调用方法
sb.append("red").append("blue").append("green");
```

**StringBuilder 提高效率原理**

当String类型字符串以 + 拼接时，系统默认在堆内存中new一个StringBuilder类型对象，通过append()方法完成拼接，再通过toString()将StringBuilder类型转换为String类型。

而使用StringBuilder则可以省去不必要的步骤

**案例**

```java
// 需求：键盘接收一个字符串，程序判断出该字符串是否是对称字符串，并在控制台打印是或不是
// 对称字符串：123321、111			非对称字符串：123123
import java.util.Scanner;
public class Test{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入内容：");
        String s = sc.nextLine();
        StringBuilder ss = new StringBuilder(s);
        String sss = ss.reverse().toString();
        if(s.equals(sss)){
            System.out.println("是");
        }else{
            System.out.println("不是");
        }
    }
}
```

```java
// 需求：定义一个方法，把int数组中的数据按照指定的格式拼接成一个字符串返回，调用该方法，并在控制台输出结果。
// 例如：数组为：int[] arr = {1, 2, 3};	执行方法后的输出结果为：[1,2,3]
public static void main(String[] args){
    int[] arr = {1, 2, 3};
    String s = arrayToString(arr);
    System.out.println(s);
}
// 定义一个方法，返回值类型 String ，参数列表int[] arr
public static String arrayToString(int[] arr){
    StringBuilder sb = new StringBuilder("【");
    for(int i = 0; i < arr.length; i++){
        if(i == arr.length - 1){
            sb.append(arr[i]).append("】");
        }else{
            sb.append(arr[i]).append(",");
        }
    }
    return sb.toString();
}
```

### 4、Math和System

#### 4.1. Math类

> Math包含执行基本数字运算的方法

没有构造方法，所有成员都是静态的(static)，可以直接通过类名调用

**常用方法**

|                   方法名                    |                 说明                 |
| :-----------------------------------------: | :----------------------------------: |
|        public static int abs(int a)         |           返回参数的绝对值           |
|     public static double ceil(double a)     |               向上取整               |
|    public static double floor(double a)     |               向下取整               |
|      public static int round(float a)       |               四舍五入               |
|     public static int max(int a,int b)      |       返回两个int值中的较大值        |
|     public static int min(int a,int b)      |       返回两个int值中的较小值        |
| public static double pow(double a,double b) |           返回a的b次幂的值           |
|        public static double random()        | 返回值为double的随机值   [0.0 , 1.0) |

#### 4.2. System类

不能被实例化（不能被创建对象）

**常用方法**

|                           方法名                            |                   说明                    |
| :---------------------------------------------------------: | :---------------------------------------: |
|             public static void exit(int status)             | 终止当前运行的Java虚拟机，非0表示异常终止 |
|           public static long currentTimeMillis()            |        返回当前时间(以毫秒为单位)         |
| arraycopy(数据源数组,起始索引,目的地数组,起始索引,拷贝个数) |                 数组copy                  |

### 5、BigDecimal

> 可以用来精确计算（如果想要精确运算，请使用字符串构造）

**构造方法**

| 方法名                 | 说明         |
| ---------------------- | ------------ |
| BigDecimal(double val) | 参数为double |
| BigDecimal(String val) | 参数为String |

**常用方法**

|                          方法名                           | 说明 |
| :-------------------------------------------------------: | :--: |
|           BigDecimal add(另一个BigDecimal对象)            | 加法 |
|         BigDecimal subtract(另一个BigDecimal对象)         | 减法 |
|         BigDecimal multiply(另一个BigDecimal对象)         | 乘法 |
|          BigDecimal divide(另一个BigDecimal对象)          | 除法 |
| BigDecimal divide(另一个BigDecimal对象,精确几位,舍入模式) | 除法 |

舍入模式：

- 进一法：`ROUND_UP`
- 去尾法：`ROUND_FLOOR`
- 四舍五入：`ROUND_HALE_UP`

### 6、包装类

包装类旨在将基本数据类型封装为对象

好处在于可以在对象中定义更多的功能方法操作该数据

常用的操作之一：用于基本数据类型与字符串之间的转换

| 基本数据类型 |  包装类   |
| :----------: | :-------: |
|     byte     |   Byte    |
|    short     |   Short   |
|     int      |  Integer  |
|     long     |   Long    |
|    float     |   Float   |
|    double    |  Double   |
|     char     | Character |
|   boolean    |  Boolean  |

#### 6.1. Integer类

**构造方法**

- `public Integer(int value)`：根据int创建Integer对象【过时】
- `public Integer(String s)`：根据String值创建Integer对象【过时】
- `public static Integer valueof(int i)`：返回表示指定的int值的Integer实例
- `public static Integer valueof(String s)`：返回一个保存指定值的Integer对象String

**成员方法**

- `static int parseInt(String s)`：将字符串类型的整数变成int类型的整数

```java
// int 转换为 String
// 方式一：+ ""
int i1 = 100;
String s1 = i1 + "";

// 方式二：可以调用String类中的valueof方法
String s2 = String.valueof(i1);
```

**练习**

```java
// 案例：字符串中数据的处理
// 需求：有一个字符串："91 27 46 38 50"，把其中的每一个数存到int类型的数组中
public class MyIntegerDemo{
    public static void main(String[] args){
        String s = "91 27 46 38 50";
        // 获取字符串中的每一个数字
        String[] strArr = s.split(" ");
        // 创建一个int类型数组
        int[] numberArr = new int[strArr.length];
        // 把strArr中的数据进行类型转换并存入到int数组中
        for(int i = 0; i < strArr.length; i++){
            int number = Integer.parseInt(strArr[i]);
            numberArr[i] = number;
        }
        // 遍历int类型的数组
        for(int i = 0; i < numberArr.length; i++){
            System.out.println(numberArr[i]);
        }
    }
}
```

#### 6.2. 装箱与拆箱

**自动装箱**

- 装箱：把一个基本数据类型变成与之对应的包装类
- 自动：Java底层会帮我们自动的调用`valueof()`
- 使用格式：`Integer i1 = 100;`

**自动拆箱**

- 拆箱：把一个包装类型，变成对应的基本数据类型

- 使用格式：`int i = i1;`

  `i1`为Integer对象

### 7、时间日期类

- 世界标准时间：格林尼治时间/格林威治时间，简称GMT
- 中国标准时间：世界标准时间 + 8小时
- 计算机中的时间原点：1970年1月1日 00:00:00

**时间换算公式**

- 1秒 = 1000毫秒
- 1毫秒 = 1000微秒
- 1微秒 = 1000纳秒

#### 7.1. Date类

> Date代表了一个特定的时间，精确到毫秒

**构造方法**

|         方法名         |                             说明                             |
| :--------------------: | :----------------------------------------------------------: |
|     public Date()      |       创建一个Date对象，表示默认时间(电脑中的当前时间)       |
| public Date(long data) | 创建一个Date对象，表示指定时间(从计算机时间原点开始，过了指定毫秒后的时间) |

**常用成员方法**

|             方法名             |         说明         |
| :----------------------------: | :------------------: |
|     public long getTime()      | 获取时间对象的毫秒值 |
| public void setTime(long time) | 设置时间，传递毫秒值 |

#### 7.2. SimpleDateFormat类

> SimpleDateFormat可以对Date对象，进行格式化和解析

- 格式化：Date对象  \==\=\=》2021年1月1日 00:00:00
- 解析：2021年1月1日 00:00:00 ===\=》Date对象

**常用的模式字母及对应关系**

- y   -----   年
- M ----- 月
- d ----- 日
- H   -----   时
- m ----- 分 
- s ----- 秒
- 2021-01-01 00:00:00 ---- yyyy-MM-dd HH:mm:ss

**构造方法**

|                 方法名                  |                   说明                   |
| :-------------------------------------: | :--------------------------------------: |
|        public SimpleDateFormat()        |  构造一个SimpleDateFormat,使用默认格式   |
| public SimpleDateFormat(String pattern) | 构造一个SimpleDateFormat，使用指定的格式 |

**成员方法**

|                方法名                 |                 说明                 |
| :-----------------------------------: | :----------------------------------: |
| public final String format(Date date) |    将日期格式化成日期/时间字符串     |
|   public Date parse(String source)    | 从给定字符串的开始解析文本以生成日期 |

## 四、异常

> 程序在执行的过程中，出现的非正常的情况，最终会导致JVM的非正常停止。语法错误不算在异常体系中

![mark](http://images.hellocode.top/YaHreJb8buHd.png)

### 1、JVM的默认处理方案

如果程序出现了问题，我们没有做任何处理，最终JVM会做默认的处理

- 把异常的名称，异常原因及异常出现的位置等信息输出在了控制台
- 程序停止执行（哪里出现异常就在哪里停止程序的运行）

### 2、throws

- 格式:`throws 异常类名;`

- 注意：这个格式是写在方法的定义处，表示声明一个异常。

**说明**

- 指告诉==调用者==，在调用的时候可能出现这样的异常，如果方法中没有出现异常，正常执行。

- 如果出现了异常，则是交给==调用者==处理，若调用者没有处理，则最终还是交给==JVM虚拟机==处理。

- 如果声明的异常是一个运行时异常，那么声明的代码可以省略
- 如果声明的异常是一个编译时异常，则必须要在方法后面进行显示声明

### 3、throw

- 格式：`throw new 异常();`
- 注意：这个格式是在方法内，表示当前代码手动抛出一个异常，下面的代码不再执行了。

**throw和throws的区别**

|                     throws                     |                   throw                    |
| :--------------------------------------------: | :----------------------------------------: |
|        用在方法声明后面，跟的是异常类名        |        用在方法内，跟的是异常对象名        |
| 表示声明异常，调用该方法有可能会出现这样的异常 | 表示手动抛出异常对象，由方法体内的语句处理 |

**意义**

1. 在方法中，当传递的参数有误，没有继续运行下去的意义了，则采取抛出处理，表示让该方法结束运行
2. 告诉调用者方法中可能会出现问题

### 4、try...catch...finally

**格式**

```java
try{
    可能出现异常的代码;
}catch(异常类名 变量名){
    异常的处理代码;
}finally {
    最终执行的代码；（一般是释放资源）
}
```

优点：可以让程序继续向下执行。

**常见问题**

- 如果try中没有问题，会把try中代码全部执行完毕，但不会执行catch内的代码
- 当try中出现问题，直接跳转到catch语句中，try下面的语句就不会再执行，当catch内的语句全部执行完毕，会继续执行下面代码
- 出现多个异常，就需要写多个catch语句。如果多个异常之间存在子父类关系，那么父类一定要写在下面
- finally无论有无异常，最终都会执行，一般用来释放资源

### 5、异常的成员方法

| 方法名                 | 说明                                 |
| ---------------------- | ------------------------------------ |
| String getMessage()    | 返回此throwbale的详细消息字符串      |
| String toString()      | 返回此可抛出的简短描述               |
| void printStackTrace() | 把异常的信息输出在控制台（红色字体） |

### 6、两种处理异常方式小结

**抛出 throw throws**

- 在方法中，当传递的参数有误，没有继续执行下去的意义了，则采取抛出处理，表示让该方法结束运行
- 告诉调用者出现了问题

**捕获 try...catch...finally**

能让代码继续运行下去

**案例：键盘录入数据**

```java
// 需求：
// 键盘录入学生的姓名和年龄，其中年龄为18-25岁
// 超出这个范围是异常数据不能赋值，需要重新录入，一直录入到正确为止
public class ExceptionDemo{
    public static void main(String[] args){
        Student s = new Student();
        
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入姓名：");
        String name = sc.nextLine();
        String name = sc.nextLine();
        while(true){
            System.out.print("请输入年龄：");
        	String ageStr = sc.nextLine();
        	try{
                int age = Integer.parseInt(ageStr);
            	s.setAge(age);
                break;
            }catch(NumberFormatException e){
                System.out.println("请输入一个整数");
                continue;
            }catch(RuntimeException e){
                System.out.println("请输入一个符合范围的年龄");
                continue;
            }
        	
        }
        System.out.println(s);
    }   
}
```

```java
// Student类
public class Student{
    private String name;
    private int age;
    
    public Student();
    
    public void setName(String name){
        this.name = name;
    }
    public void setAge(int age){
        if(age >= 18 && age <= 25){
            this.age = age;
        }else{
            throw new RuntimeException("年龄超出了范围");
        }
    }
    public String getName(){
        return name;
    }
    public int getAge(){
        return age;
    }
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 7、自定义异常

目的：为了让异常信息更加见名知意

**步骤**

1. 定义异常类
2. 写继承关系
3. 完善构造方法（空参/有参）

## 五、泛型

> 是JDK5有的特性，提供了编译时类型安全检测机制

**泛型的好处**

- 把运行时期的问题提前到了编译期间
- 避免了强制类型转换

### 1、泛型的使用

- 类后面 --------------->  泛型类
- 方法声明上 ---------------> 泛型方法
- 接口后面 ---------------> 泛型接口

> 使用泛型时，只能是引用数据类型（基本类型要使用对应的包装类）

### 2、泛型类

- 如果一个类后面有`<E>`，表示这个类是一个泛型类
- 在创建泛型类对象时，必须要给这个泛型确定具体的数据类型

> 尖括号内的字母可以自定义，并不是一定要是E等，只是这些比较常用

**泛型的定义格式**

- `<类型>`：指定一种类型的格式

- 尖括号里面可以任意书写，按照变量的定义规则即可。一般只写一个字母。

- 比如：`<E>、<T>、<Q>、<K,M>`

**泛型类的定义格式**：`修饰符 class 类名<类型>{ }`

```java
public class MyGenericityClass<E> {
	private E element;

	public E getElement() {
		return element;
	}

	public void setElement(E element) {
		this.element = element;
	}

	@Override
	public String toString() {
		return "MyGenericityClass [element=" + element + "]";
	}
}
```

### 3、泛型方法

- 定义格式：`修饰符 <类型> 返回值类型 方法名(类型 变量名){ }`

- 范例：`public <T> void show(T t){ }`

```java
// 定义一个泛型方法，传递一个集合和四个元素，将元素添加到集合中并返回
public class GenericityMethod{
    public static void main(String[] args){
        addElement(new ArrayList<String>, "a", "b", "c", "d");
    }
    
    public static <T> ArrayList<T> addElement(ArrayList<T> list, T t1, T t2, T t3, T t4){
        list.add(t1);
        list.add(t2);
        list.add(t3);
        list.add(t4);
        return list;
    }
}
```

### 4、泛型接口

**使用方式**

- 实现类也不给泛型
- 实现类确定具体的数据类型

**泛型接口的定义格式**：`修饰符 interface 接口名<类型>{ }`

```java
public class GenericityInterface{
	public static void main(String[] args){
		GenericityImpl<String> genericity = new GenericityImpl<>();
		genericity.method("ccccccc");
	}
}

interface Genericity<E> {
	public abstract void method(E e);
}


class GenericityImpl<E> implements Genericity<E>{
	public void method(E e){
		System.out.println(e);
	}
}
```

### 5、通配符

- 类型通配符:`<?>`

- `ArrayList<?>`：表示元素类型未知的ArrayList，它的元素可以匹配任何的类型

  但是并不能把元素添加到ArrayList中了，获取出来的也是父类类型

- 类型通配符上限：`<? extends 类型>`

  比如：`ArrayList<? extends Number>`:它表示的类型是Number或者其子类型

- 类型通配符下限：`<? super 类型>`

  比如：`ArrayList<? super Number>`：他表示传进来的类型可以是Number类型，也可以是Number的父类类型

```java
import java.util.ArrayList;

public class tongpeifu {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<Integer> list1 = new ArrayList<>();
		ArrayList<String> list2 = new ArrayList<>();
		list1.add(11);
		list2.add("ssacs");
		printList(list1);
		printList(list2);
	}

	private static void printList(ArrayList<?> list) {
		// TODO Auto-generated method stub
		System.out.println(list);
		
	}
}
```

## 六、类加载器&反射

### 1、类加载器

> 负责将.class文件（存储的物理文件）加载到内存中

**加载时机**

用到就加载，不用不加载

- 创建类的实例（对象）
- 调用类的类方法（静态方法）
- 访问类或者接口的类变量，或者为该类变量赋值（静态变量）
- 使用反射方式来强制创建某个类或接口对应的`java.lang.Class`对象
- 初始化某个类的子类
- 直接使用java.exe命令来运行某个主类

**加载过程**

加载 ---> 验证 ---> 准备 ---> 解析 ---> 初始化

> 又将验证 ---> 准备 ---> 解析这三步称为==链接==

加载

- 通过一个类的全限定名来获取定义此类的二进制字节流（包名+类名；用流进行传输）
- 将这个字节流所代表的静态存储结构转化为运行时数据结构（将这个类加载到内存中）
- 在内存中生成一个代表这个类的java.lang.Class对象，任何类被使用时，系统都会为之建立一个java.lang.Class对象（加载完毕创建一个class对象）

链接

- 验证：确保Class文件字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身安全（文件中的信息是否符合虚拟机规范、有没有安全隐患）
- 准备：负责为类的类变量（静态变量）分配内存，并设置默认初始化值（初始化静态变量）
- 解析：将类的二进制数据流中的符号引用替换为直接引用（本类中用到了其他类，此时就要找到对应的类）

初始化

- 根据程序员通过程序制定的主观计划去初始化类变量和其他资源（静态变量赋值以及初始化其他资源）

**分类**

- 启动类加载器(Bootstrap ClassLoader)：虚拟机内置的类加载器
- 平台类加载器(Platform Classloader)：负责加载JDK中一些特殊的模块(继承启动类加载器)
- 系统类加载器(System Classloader)：负责加载用户类路径上所指定的类库(继承平台类加载器)(用的最多)
- 自定义类加载器(UserClassloader)：自定义的类加载器(继承系统类加载器)（用的不多）

**双亲委派模型**

- 当使用最下层的类加载器加载字节码文件时，首先会把加载任务逐层委派给父类加载器，直到最顶层的启动类加载器中
- 这些加载器都有各自的加载范围，当父类加载器无法完成加载请求时，就会一层层往下返回

```java
// 可以获得系统类加载器
ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
// 得到父类加载器
ClassLoader platformClassloader = systemClassLoader.getParent()
```

**常用方法**

| 方法名                                  | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| loadClass(String name, boolean resolve) | 加载指定名称(包括包名)的二进制类型                           |
| findClass(String name)                  | 当loadClass方法中父类加载失败时，调用自己的findClass方法来完成类加载 |
| defineClass(byte[] b, int off, int len) | 将byte字节流解析成JVM能够识别的Class对象                     |
| resolveClass(Class<?> c)                | 让使用类的Class对象创建完成也同时被解析                      |

### 2、反射

在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意属性和方法

这种动态获取信息以及动态调用对象方法的功能称为Java语言的**反射**机制

> 利用反射调用它类中的属性和方法时，无视修饰符
>

#### 2.1. 获取Class对象

| 以前调用一个类中的方法 |      反射调用一个类中的方法       |
| :--------------------: | :-------------------------------: |
| 创建这个类的对象(new)  | 反射方式：创建对象(利用Class对象) |
|     用对象调用方法     |        反射方式：调用方法         |

- 源代码阶段：`Class.forName(String className)`  通过Class类静态方法传递全类名获取Class对象
- Class对象阶段：`类名.class`  
- Runtime运行时阶段：`对象.getClass()`

#### 2.2. 获取Constructor对象

- `Constructor<?>[] getConstructors()`：返回所有公共构造方法对象的数组
- `Constructor<?>[] getDeclaredConstructors()` ：返回所有构造方法对象的数组（包括私有）
- `Constructor<T> getConstructor(Class<?>... parameterTypes)`：返回单个公共构造方法对象
- `Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)`：返回单个构造方法对象（包括私有）

**利用Constructor创建对象**

`T newInstance(Object...initargs)`：根据指定的构造方法创建对象

```java
package fanshe;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class Demo1 {

	public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		// 获取字节码文件
		Class clazz = Class.forName("fanshe.Student");
		
		// 获取构造方法
		Constructor constructor = clazz.getConstructor(String.class, int.class);
		
		// 利用newInstance 创建对象
		Student student = (Student) constructor.newInstance("张三", 11);
		System.out.println(student);

	}
}
```

> 在Class类中，有一个newInstance 方法，可以利用空参直接创建一个对象
>
> ```java
> Class clazz = Class.forName("fanshe.Student");
> Student stu = (Student)clazz.newInstance();
> ```
>
> 不过这个方法现在已经过时了，了解即可

```java
// 获取一个私有的构造方法并创建对象
package fanshe;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class Demo2 {

	public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		// 获取字节码文件
		Class clazz = Class.forName("fanshe.Student");
		
		// 获取构造方法
		Constructor constructor = clazz.getConstructor(String.class, int.class);
        
		// 被private修饰的成员，不能直接使用
        // 如果用反射强行获取并使用，需要临时取消访问检查
        constructor.setAccessible(true);
        
		// 利用newInstance 创建对象
		Student student = (Student) constructor.newInstance("张三", 11);
		System.out.println(student);

	}
}
```

**注意**

- 在获取到的构造方法创建对象时，如果是public，可以直接创建对象

- 如果是非public的，需要临时取消检查，然后再创建对象`setAccessible(boolean)`（暴力反射）

> 在使用反射操作私有方法以及变量时也需要临时取消检查

#### 2.3. 反射获取成员变量

**步骤**

1. 获得class对象

2. 获得Field对象

| 方法名                                | 说明                                   |
| ------------------------------------- | -------------------------------------- |
| Field[] getFields()                   | 返回所有公共成员变量对象的数组         |
| Field[] getDeclaredFields()           | 返回所有成员变量对象的数组（包括私有） |
| Field[] getField(String name)         | 返回单个公共成员变量对象               |
| Field[] getDeclaredField(String name) | 返回单个公共成员变量对象（包括私有）   |

3. 赋值或者获取值

   `void set(Object obj, Object value)`：给指定对象的成员变量赋值

   `Object get(Object obj)`：返回指定对象的Field的值

**代码实现**

```java
package fanshe;

import java.lang.reflect.Field;

public class Demo2 {

	public static void main(String[] args) throws NoSuchFieldException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException {
		// 获取class对象
		Class clazz = Class.forName("fanshe.Student");
		// 获取Field对象
		Field field = clazz.getDeclaredField("name");
		// 创建一个对象
		Student stu = (Student)clazz.newInstance();
		// 关闭访问检查（私有变量）
		field.setAccessible(true);
		// 赋值
		field.set(stu, "张三");
		System.out.println(stu);
	}
}
```

#### 2.4. 获取Method对象

**步骤**

1. 获取class对象

2. 获取Method对象

| 方法名                                                       | 说明                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Method[] getMethods()                                        | 返回所有公共成员方法对象的数组，包括继承的           |
| Method[] getDeclaredMethods()                                | 返回所有成员方法对象的数组，不包括继承的，包括私有的 |
| Method[] getMethod(String name, Class<?>...parameterTypes)   | 返回单个公共成员方法对象                             |
| Method[] getDeclaredMethod(String name, Class<?>...parameterTypes) | 返回单个成员方法对象（包括私有）                     |

3. 运行方法

   `Object invoke(Object obj, Object...args)`：运行方法

   参数一：表示用哪个对象调用该方法

   参数二：调用方法的传递的参数（如果没有就不写）

   返回值：方法的返回值（没有就不写）

**代码演示**

```java
package fanshe;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Demo3 {
	public static void main(String[] args) throws NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		// 获取class对象
		Class clazz = Class.forName("fanshe.Student");
		// 获取Method对象
		Method method = clazz.getDeclaredMethod("function", String.class, int.class);
		// 创建对象
		Student stu = (Student)clazz.newInstance();
		// 运行
		method.setAccessible(true);
		method.invoke(stu, "张三",23);
	}
}
```

## 七、xml

### 1、概述

- 由万维网联盟（W3C）推出
  
  是Web领域最具权威和影响力的国际中立性技术标准机构
  
- 可扩展的标记语言XML(标准通用标记语言下的一个子集)
  
  标记语言：通过标签来描述数据的一门语言（标签也称为元素）
  
  可扩展：标签的名字是可以自己定义的

作用：
- 用于进行存储数据和传输数据
- 作为软件的配置文件

### 2、规则

**标签规则**

- 标签由一对尖括号和合法的标识符组成
- 标签必须成对出现
- 特殊标签可以不成对，但是必须要有结束标记
- 标签中可以定义属性，属性和标签名空格隔开；属性值必须用引号引起来
- 标签需要正确的嵌套

**语法规则**

- 文件后缀名为：xml

- 文档声明必须是第一行第一列
  
  `<?xml version = "1.0" encoding = "UTF-8" standalone = "yes"?>`
  
  version：该属性是必须存在的
  
  encoding：该属性不是必须的，声明打开当前xml文件的时候应该使用什么字符编码表
  
  standalone：该属性不是必须的，描述XML文件是否依赖其他的xml文件，取值为yes/no
  
- 必须存在一个根标签，有且仅有一个

- XML文件中可以定义注释信息

- XML文件中可以存在特殊字符（\&lt;  \&gt;......）

- XML文件中可以存在CDATA区
  
  `<![CDATA[...内容...]]>`

**演示**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--根标签-->
<students>
    <!--第一个学生信息-->
	<student id="1">
    	<name>张三</name>
        <age>23</age>
        <info>学生 &lt; &gt;信息</info>
        <!--CDATA区内的内容都会原样输出，大于号和小于号等不用使用特殊字符转义-->
        <message><![CDATA[内<>容]]></message>
    </student>
    <!--第二个学生信息-->
    <student id="2">
    	<name>李四</name>
        <age>24</age>
        <info></info>
    </student>
</students>
```

### 3、解析

- 解析就是从xml中获取到数据

- DOM(Document Object Model)文档对象模型：就是把文档的各个组成部分看做成对应的对象
  

会把xml文件全部加载到内存。在内存中形成一个树形结构，再获取到对应的值

**常见的解析工具**

- JAXP:SUN公司提供的一套XML的解析的API
- JDOM：开源组织提供了一套XML的解析的API-jdom
- DOM4J：开源组织提供了一套XML的解析的API-dom4j（全称：Dom For Java）
- pull：主要应用在Android手机端解析XML

#### 3.1. DOM4J

下载地址：https://dom4j.github.io/

**常用方法**

- `SAXReader saxReader = new SAXReader();`：获取一个解析器对象
- `Document document = saxReader.read(new File("xml文件路径"))`：利用解析器把xml文件加载到内存中，并返回一个文档对象
- `Element rootElement = document.getRootElement()` ：获取到根标签
- `List list = rootElement.elements()` ：获取调用者所有的子标签，并加入到集合，最终返回这个集合
- `List list = rootElement.elements("标签名")` ：获取调用者所有的指定的子标签，会把这些子标签放到一个集合中并返回

- `Attribute attribute = element.attribute("属性名")` ：获取标签对应的属性
- `String id = attribute.getValue()`：获取对应属性的值
- `Element nameElement = element.element("标签名");`：获取调用者指定的子标签
- `String name = nameElement.getText()`：获取这个标签的标签体内容

**代码**

```java
package MyXml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class Demo {

	public static void main(String[] args) throws DocumentException {
		// 获取一个解析器对象
		SAXReader saxReader = new SAXReader();
		// 利用解析器把xml文件加载到内存中
		Document document = saxReader.read(new File("src\\MyXml\\Students.xml"));
		// 获取到根标签
		Element rootElement = document.getRootElement();
		// 获取子标签
		List<Element> list = rootElement.elements("student");
		// 遍历获取每个student信息
		ArrayList<Student> s = new ArrayList();
		for(Element element : list){
			// 获取属性
			Attribute attribute = element.attribute("id");
			String id = attribute.getText();
			// 获取name
			Element nameElement = element.element("name");
			String name = nameElement.getText();
			// 获取age
			Element ageElement = element.element("age");
			int age = Integer.parseInt(ageElement.getText());
			Student stu = new Student(id,name,age);
			s.add(stu);
		}
		System.out.println(s);
	}
}
```

### 4、DTD&schema

#### 4.1. 约束

- 用来限定xml文件中可使用的标签以及属性

分类
- DTD
- schema

#### 4.2. DTD约束

**步骤**

- 创建一个文件，这个文件的后缀名为.dtd

- 看xml文件中使用了哪些元素
  
  `<!ELEMENT>`可以定义元素：`<!ELEMENT persons>`
  
- 判断元素是简单元素还是复杂元素
  - 简单元素：没有子元素`<!ELEMENT name (#PCDATA)>`
  - 复杂元素：有子元素的元素`<!ELEMENT person (name,age)>`
  
- 引入DTD

**引入DTD约束的三种方法**

- 引入本地dtd：`<!DOCTYPE 根标签名 SYSTEM 'DTD文件路径'>`
- 在xml文件内部引入：`<!DOCTYPE 根标签名 [DTD文件内容]>`
- 引入网络dtd：`<!DOCTYPE 根标签名 PUBLIC "dtd文件名称" "dtd文档的URL">`

**DTD语法规则**

1. 定义一个元素：`<!ELEMENT 元素名 元素类型>`

- 简单元素

  EMPTY：表示标签体为空

  ANY：表示标签体可以为空也可以不为空

  PCDATA：表示该标签的内容部分为字符串

- 复杂元素

  直接写子元素名称

  多个子元素可以用`,`或者`|`隔开；

  `,`表示定义子元素的顺序

  `|`表示子元素只能出现任意一个

  `？`表示零次或多次；`+`表示一次或多次；`*`表示零次或多次；如果不写默认表示出现一次

2. 定义一个属性：`<!ATTLIST 元素名称 属性名称 属性类型 属性约束>`

- 属性类型：CDATA类型（普通的字符串）

- 属性约束

  #REQUIRED：必需的

  #IMPLIED：属性不是必需的

  #FIXED value：属性值是固定的

#### 4.3. schema约束

schema和DTD的区别

- schema约束文件也是一个xml文件，符合xml语法，后缀名为.xsd

- 一个xml中可以引用多个schema约束文件，多个schema使用名称空间区分（名称空间类似于java包名）

- dtd里面元素类型的取值比较单一常见的是PCDATA类型，但是在schema里面可以支持很多个数据类型

- schema语法更加复杂

> schame文件用来约束一个xml文件，因为其自身也是一个xml文件，所以同时也被别的文件约束着

步骤

- 创建一个文件，这个文件后缀名为.xsd

- 定义文档声明

- schema文件的根标签为：`<schema>`

- 在`<schema>`中定义属性：
  
  `xmlns=http://www.w3.org/2001/XMLSchema`（声明这个schema文件是一个约束文件，同时也被约束）
  
- 在`<schema>`中定义属性：
  
  `targetNamespace=唯一的url地址`（指定当前这个schema文件的名称空间）
  
- 在`<schema>`中定义属性：
  
  `elementFormDefault="qualified"`（表示当前schema文件是一个质量良好的文件）
  
- 通过element定义元素

- 判断当前元素是简单元素还是复杂元素

代码实现

```xml
<? xml version="1.0" encoding="UTF-8" ?>
<schema
	xmlns="http://www.w3.org/2001/XMLSchema"
    targetNamespace="http://www.baidu.com/javase"
    elementFormDefault="qualified"
>
	<!--定义persons复杂元素-->
    <element name="persons">
        <complexType>		<!--复杂元素-->
            <sequence>		<!--里面元素必须按顺序-->
            	<!--定义person复杂元素-->
                <element name="person">
                    <complexType>
                        <sequence>
                        	<!--定义name和age简单元素-->
                            <element name = "name" type = "string"></element>
                            <element name = "age" type = "int"></element>
                        </sequence>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```

引入schema文件约束

- 在根标签上定义属性
  
  `xmlns:xsi ="http://www.w3.org/2001/XMLSchema-instance"`（表示当前文件被别人约束）
  
- 通过xmlns引入约束文件的名称空间
  
  `xmlns = "约束文件的名称空间"`
  
- 给某一个xmlns属性添加一个标识，用于区分不同的名称空间
  格式为`xmlns:标识 = "名称空间地址"`
  
  标识是可以任意的，但是一般取值都是xsi
  
- 通过`xsi:schemaLocation`指定名称空间所对应的约束文件路径
  
  格式为：`xsi:schemaLocation = "名称空间url 文件路径"`


Schema定义属性

- `<attribute name="id" type="string" use="required"></attribute>`
  
  use中两个选项：requried(必需的)、optional(可选的)

## 八、枚举

用常量表示季节的弊端

- 代码不够简洁
- 不同类型的数据是通过名字区分的
- 不安全，由于是数字类型，就有可能使用这几个值做一些运算操作；

> 为了间接的表示一些固定的值，Java提供了枚举

### 1、枚举格式

> 枚举：是指将变量的值一一列出来，变量值只限于列举出来的值的范围内

**格式**

```java
public enum s{
    枚举项1,枚举项2,枚举项3;
}
```

```java
// 定义一个枚举类，用来表示春、夏、秋、冬
public enum Season{
    SPRING,SUMMER,AUTUMN,WINTER;
}
```

### 2、枚举特点

- 所有枚举类都是Enum的子类

- 可以通过"枚举类名.枚举项名称"去访问指定的枚举项

- 每一个枚举项其实就是该枚举的一个对象

- 枚举也是一个类，也可以去定义成员变量

- 枚举类的第一行上必须是枚举项，最后一个枚举项后的分号是可以省略的，但是如果枚举类有其他的东西，这个分号就不能省略。建议不要省略

- 枚举类可以有构造器，但必须是private的，它默认的也是private的。

- 枚举类也可以有抽象方法，但是枚举项必须重写该方法

```java
public enum Season{
    SPRING("春"){
       // 枚举类中有抽象方法，必须重写
        public void show(){
            System.out.println(this.name);
        }
    },
    SUMMER("夏"){
        public void show(){
            System.out.println(this.name);
        }
        
    },
    AUTUMN("秋"){
        public void show(){
            System.out.println(this.name);
        }
        
    },
    WINTER("冬"){
        public void show(){
            System.out.println(this.name);
        }
        
    };
    // 成员变量
    public String name;
    // 有参构造
    private Season(String name){
        this.name = name;
    }
    // 抽象方法
    public abstract void show();
}
```

### 3、枚举的方法

| 方法名                                             | 说明                                 |
| -------------------------------------------------- | ------------------------------------ |
| `String name()`                                    | 获取枚举项的名称                     |
| `int ordinal()`                                    | 返回枚举项在枚举类中的索引值         |
| `int compareTo(E o)`                               | 比较两个枚举项，返回的是索引值的差值 |
| `String toString()`                                | 返回枚举常量的名称                   |
| `static <T> T valueOf(Class<T> type, String name)` | 获取指定枚举类中的指定名称的枚举值   |
| `values()`                                         | 获得所有的枚举项                     |

## 九、注解

> 主要作用：对程序进行标注和解释

### 1、 基本使用

| 注解名                                      | 说明                   |
| ------------------------------------------- | ---------------------- |
| @Override                                   | 概述子类重写父类的方法 |
| @Deprecated                                 | 概述方法过时           |
| @SuppressWarnings                           | 压制警告               |
| @Retention(value = RetentionPolicy.RUNTIME) | 表示这个注解的存活时间 |

**注释和注解**

- 注释：给程序员看
- 注解：给编译器看(让虚拟机看到程序中的注解，注解代表程序的一些特殊功能)

**自定义注解**

```java
public @interface 注解名称{
    public 属性类型 属性名 () default 默认值;		//这里只能是public，可省略
}
```

- 属性类型可以为基本数据类型、String、Class、注解、枚举以及以上类型的一维数组

- 在使用注解的时候如果注解里面的属性没有指定默认值，那么就需要手动给出注解属性的设置值

> 特殊属性value：在使用注解时如果只给value赋值，那么可以直接设置
>

`isAnnotationPresent(Class<? extends Annotation> annotationClass)`

- 判断当前方法上是否有指定的注解

- 参数：注解的字节码文件对象

- 返回值：布尔结果

  true存在；false不存在

### 2、元注解

> 就是描述注解的注解

| 元注解名    | 说明                                  |
| ----------- | ------------------------------------- |
| @Target     | 指定了注解能在哪里使用                |
| @Retention  | 可以理解为保留时间（生命周期）        |
| @Inherited  | 表示修饰的自定义注解可以被子类继承    |
| @Documented | 表示该自定义注解，会出现在API文档里面 |

- `@Target`：成员变量(ElementType.FIELD)，类(ElementType.TYPE)，成员方法(ElementType.METHOD)

- `@Retention`：不写默认只能存活在java文件(不能存活在class文件中)，括号写上`RetentionPolicy.RUNTIME`就可以存活到字节码中

## 十、单元测试&日志技术

### 1、单元测试

> Junit是一个Java编程语言的单元测试工具。Junit是一个非常重要的测试工具

#### 1.1. Junit特点

- 是一个开放源代码的测试工具
- 提供注解来识别测试方法
- 可以让编写代码更快，并提高质量
- 优雅简洁、简单
- 在一个条中显示进度，如果运行良好是绿色；运行失败为红色

#### 1.2. 基本使用

- 将junit的jar包导入到工程中
- 编写测试方法，该测试方法必须是公共的无参数无返回值的非静态方法
- 在测试方法上使用`@Test`注解标注该方法是一个测试方法
- 选中测试方法右键通过junit运行该方法

#### 1.3. 常用注解

| 注解    | 含义               |
| ------- | ------------------ |
| @Test   | 表示测试该方法     |
| @Before | 在测试的方法前运行 |
| @After  | 在测试的方法后运行 |

### 2、日志技术

#### 2.1. 概述

> 日志：程序中的日志可以用来记录程序在运行时的点点滴滴，并可以进行永久存储

**区别**

|          | 输出语句                   | 日志技术                                 |
| -------- | -------------------------- | ---------------------------------------- |
| 取消日志 | 需要修改代码，灵活性比较差 | 不需要修改代码，灵活性比较好             |
| 输出位置 | 只能是控制台               | 可以将日志信息写入到文件或者数据库中     |
| 多线程   | 和业务代码处于一个线程中   | 多线程方式记录日志，不影响业务代码的性能 |



**体系结构**

![](http://images.hellocode.top/%E6%97%A5%E5%BF%97%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84.png)

#### 2.2. Log4j

> 是Apache的一个开源项目

- 通过Log4j，可以控制日志信息输送的目的地是控制台、文件等位置

- 也可以控制每一条日志输出格式
- 通过定义每一条日志信息的级别，能够更细致的控制日志的生成过程
- 这些可以通过一个配置文件来灵活的进行配置，不需要修改应用的代码

**Log4j开发流程**

- 导入log4j的相关jar包

- 编写log4j配置文件(log4j.properties/log4j.xml)

- 在代码中获取日志的对象

  - log4j自己的api(不推荐使用)

    弊端：如果以后要更换日志的实现类，那么下面的代码就要跟着改

    `private static final Logger LOGGER = Logger.getLogger(.class字节码文件);`

  - 使用slf4j里面的api来获取日志的对象

    好处：如果更换日志的实现类，下面的代码不需要更改

    `private static final Logger LOGGER = LoggerFactory.getLogger(clss字节码文件)`

- 按照级别设置记录日志信息


**Log4j组成**

Loggers(记录器)：日志的级别

- DEBUG：打印基本信息

- INFO：打印重要信息

- WARN：打印可能出现问题的信息

- ERROR：出现错误的信息，不影响程序运行

- FATAL：重大错误，程序可以停止

> DEBUG<INFO<WARN<ERROE<FATAL
>
> Log4j有一个规则：只输出级别不低于设定级别的日志文件

Appenders(输出源)：日志要输出的地方，如控制台(Console)、文件(Files)等。

- `org.apache.log4j.ConsoleAppender`（控制台）

- `org.apache.log4j.FileAppender`（文件）

```properties
log4j.appender.ca = org.apache.log4j.ConsoleAppender
log4j.appender.ca.设置1 = 值1
log4j.appender.ca.设置2 = 值2
```

Layouts(布局)：日志输出的格式

- `org.apache.log4j.PatternLayout`(可以灵活的指定布局模式)【最常用】

- `org.apache.log4j.SimpleLayout`(包含日志信息的级别和信息字符串)

- `org.apache.log4j.TTCCLayout`(包含日志产生的时间、线程、类别等信息)

```properties
log4j.appender.ca.layout = org.apache.log4j.PatternLayou
log4j.appender.ca.layout.设置1 = 值1
log4j.appender.ca.layout.设置2 = 值2
```

**配置文件详解**

配置根Logger

- 格式：`log4j.rootLogger = 日志级别, appenderName1, appenderName2, ...`
- 日志级别：OFF FATAL ERROR WARN INFO DEBUG ALL或者自定义的级别
- appenderName1：就是指定日志信息要输出到哪里。可以同时指定多个输出目的地，用逗号隔开
- 例如：`log4j.rootLogger = INFO, ca, fa`

配置文件

- ConsoleAppender常用的选项

  `ImmediateFlush = true`：表示所有消息都会被立即输出，设置为false则不输出，默认为true

  `Target = System.err`：默认值是System.out

- FileAppender常用的选项

  `ImmediateFlush = true`：表示所有消息都会立即被输出。设为false则不输出，默认值是true

  `Append = false`：true表示将消息添加到指定文件中，原来的消息不覆盖；false则将消息覆盖指定的文件内容，默认值为true

  `File = D:/logs/logging.log4j`：指定消息输出到logging.log4j文件中

配置Layout

- PatternLayout常用的选项

  `ConversionPattern=%m%n`：设定以怎样的格式显示消息

  【格式化符号说明可以查看网上的资料做一个了解】

**Log4j使用步骤**

1. 导入相关的依赖(jar)

2. 将资料中的properties配置文件复制到src目录下

3. 在代码中获取日志的对象

4. 按照级别设置记录日志信息