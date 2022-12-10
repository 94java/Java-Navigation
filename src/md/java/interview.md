---
title: "面试宝典"
order: 8
---


# Java基础


## Java基础语法

## 前期准备

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

   

## 数据类型



1. **常量**：在程序的执行过程中，其值不会发生改变的量（数据）。

![](https://s2.loli.net/2022/06/06/kQilfqzOVZdct8m.png)

2. **变量**：就是内存中的==存储空间==，空间中存储着经常发生改变的值。

![](https://s2.loli.net/2022/06/06/Ny4uzcPJ3Zax1Se.png)

3. **基本数据类型**

![](https://s2.loli.net/2022/06/06/Ja9UA3IutwWO7br.png)

4. **引用数据类型**

## 键盘录入

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
   
3. **常见命名约定**

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

### 类型转换

1. **隐式转换**：将数据类型中，==取值范围小的==数据，==给取值范围大的==类型赋值，可以直接赋值

   ```java
   int a = 10;		//int占4字节
   double b = a;	//double占8字节
   ```

   > 简单记：小的给大的，可以直接给
   > 4升的油，倒入8升的桶，可以直接倒入
   > 小的数据和大的数据类型运算，小的会先提升为大的数据类型再进行运算
   > byte short char 这三种数据在运算的时候，无论是否有更高的数据类型，都会提升为int，然后再进行运算

   ![](https://s2.loli.net/2022/06/06/9i8UwNOcMK6kej5.png)

2. **强制转换**：把一个表示==数据范围大==的数值或者变量赋值给另一个表示==数据范围小的变量==
   格式：目标数据类型 变量名 = (目标数据类型)值或者变量;

   ```java
   int a = 10;		//int 4字节
   byte b = (byte)a;		//byte 1字节
   int c = (int)88.88;
   ```

   > 强制类型转换，有可能会发生精度损失
   > 精度损失：简单理解，将容积为8升的水倒入容积为4升的桶中，多出的水会洒掉

3. **类型转换案例**

   * 请判断下列代码是否存在问题，如果有，请指出并改正[^1.51][^1.52]

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

[^1.51]: ③中错误，在byte short char运算时，会直接提升为int，然后再进行运算;
[^1.52]: ④正确：Java存在常量优化机制，3和4是两个常量，会在编译的时候让3和4进行相加，然后判断7是否在byte的取值范围内

### 运算符

1. **运算符**：对常量或者变量进行操作的符号

2. **表达式**：用运算符把常量或者变量连接起来符合Java语法的式子就可以称为表达式。
   	          不同运算符连接的表达式体现的是不同类型的表达式。

   ```java
   int a = 10;
   int b = 20;
   int c = a + b; 
   ```

3. **算术运算符**：加（+）、减（-）、乘（*）、除（/）、取余（%）
   加、减、乘都和小学一样，在用除法时，两整数相除只能得到整数，想要得到小数必须有==浮点数==参与运算
   取余即指取结果的余数

> 字符之间相加时，字符会根据ASCII码值提升为int类型进行运算	（0--48   a--97   A--65）

```java
int a = 1;
char b = 'a';
System.out.println(a + b);		//输出98
```

> 字符串之间相加时，可以使用+和（任意数据类型）拼接
> 当‘+’操作中出现字符串时，这个‘+’是字符串连接符，而不是算术运算符
> 在‘+’操作中，如果出现了字符串，就是连接运算符，否则就是算术运算符，当连续进行‘+’操作时，从左到右逐个执行

```java
System.out.println("java" + 666);		//java666
System.out.println(1 + 99 +"java");		//100java
System.out.println("5+5=" + 5 + 5);		//5+5=55
System.out.println("5+5=" + (5 + 5));	//5+5=10
```

4. **自增自减运算符**：自增（++）、自减（--）
   *  ==单独使用时==，++和--在前或者在后时结果都一样
   * 当参与其他操作时，在前则==先==自增（自减）==后==进行操作；在后则表示==先==进行相应操作==后==进行自增（自减）
   * ==只能操作变量，不能操作常量==

5. **赋值运算符**：赋值(=)、加后赋值(+=)、减后赋值(-=)、乘后赋值(*=)、除后赋值(/=)、取余后赋值(%=)

   ```java
   int a = 10;
   a += 20;	//a = a + 20
   System.out.println(a);		//30
   ```

   ==注意==：扩展运算符底层会自带强制类型转换的功能

6. **关系（比较）运算符**：等于(\==)、不等(!=)、大于(>)、大于等于(>=)、小于(<)、小于等于(<=)
   ==注意==：返回结果只有==true==或者==false==

7. **逻辑运算符**

   * &（与）：并且，全真则真，一假则假

   * |（或）：或者，全假则假，一真则真

   * !（非）：取反，真假假真

   * ^（异或）：两同为假，不同为真

   * 短路逻辑运算符

     &&(短路与)：作用和&相同，但有短路效果

     ||(短路与)：作用和|相同，但有短路效果

     > 		逻辑短路：&&遇到false直接为false,不执行后面代码;||遇到true则直接为true，不执行后续代码

8. **三元运算符**

   * 格式：`关系表达式 ? 表达式1 : 表达式2;`

   * 执行流程

     首先计算==关系表达式==的值
     若为==true==则取表达式1的值
     若为==false==则取表达式2的值

### 流程控制

1. **流程控制语句**：通过一些语句，来控制程序的执行流程

2. **顺序结构语句**：程序中最简单最基本的流程控制，没有特定的语法结构，按照代码的先后顺序依次执行，程序中大多数代码都是这样的

3. **if语句**

   - 格式1：

     ```java
     if(关系表达式){
         语句体1；
     }else{
         语句体2;
     }
     ```

   - 执行流程：
     首先计算关系表达式的值
     如果关系表达式的值为true则执行语句体1
     如果关系表达式为false就执行语句体2
     继续执行后续代码

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

   - 格式2(多条件判断)：

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

   4. **switch语句**

      - 格式：

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

      - 格式说明:

        表达式==（将要被匹配的值）==取值为byte、short、int、char、JDK5、以后还可以是枚举，JDK7以后可以是String
        case:后面跟的是要和表达式比较的值==（被匹配的值）==
        break：表示中断，结束的意思，用来结束switch语句
        default：表示所有的情况都不匹配的时候，就执行该处的内容，和if语句的else相似

      - case穿透：

        现象：当开始case穿透，后续的case就不会具有匹配的效果，内部的语句都会执行

        			直到看见break，或者将整体switch语句执行完毕，才会结束
        
     应用场景：当多个case语句出现重复现象，就可以考虑使用case穿透来优化代码
   
5. **for循环**（推荐明确循环次数时使用）
   
   - 格式：
   
        ```java
        for(初始化语句;条件判断语句;条件控制语句){
            循环体语句;
        }
     ```
   
      - 执行流程：
        执行初始化语句
        执行条件判断语句，看其结果是true还是false
                如果是false，循环结束
                如果是true，循环继续
        执行循环体语句
        执行条件控制语句
     回到第2步继续循环
   
   - 案例
   
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
        
        > System.out.print()为同行打印，不换行
        > System.out.println()自带换行效果，类似于html中的块级元素，独占一行。括号内无内容时可以当作换行符来使用
   
6. **while循环**(不明确循环次数时推荐while)

   - 格式：

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

7. **do...while循环**（使用较少）

   - 格式：

     ```java
     do{
         循环体语句;
         条件控制语句;
     }while(条件判断语句);
     ```

   > **三种循环的区别：**
   > for循环和while循环先判断条件是否成立，然后决定是否执行循环体（先判断后执行）
   > do...while循环先执行一次循环体，然后判断条件是否成立，是否继续执行循环体（先执行后判断）
   > 条件控制语句中所控制的自增变量，因为归属于for循环的语法结构中，在for循环结束后，就==不能再次被访问==到了
   > 条件控制语句所控制的自增变量，对于while循环来说不归属其语法结构中，在while循环结束后，该变量==还可以继续使用==

6. **死循环**

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

   	例如：键盘录入一个1-100之间的整数（用户可能出现误操作现象）

   ```java
   while(true){
       Scanner sc = new Scanner(System.in);
       int a = sc.nextInt();
       if(a >= 1 && a <= 100){
           b
       }
   }
   ```

7. **continue与break关键字**
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
     // 语句前只允许加一个标号，标号后面不能跟大括号。通过用break后加标号对处于标号中的语句进行控制。往往标号后是for.while.do-while等循环。
     ```

### Random

- **作用**：用于产生一个随机数

- **使用步骤**

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

- **猜数字案例**

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