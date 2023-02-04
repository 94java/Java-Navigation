---
title: "新特性"
order: 7
category:
  - Java
---
# 新特性

## JDK8

### Lambda表达式

#### 快速体验

**使用匿名内部类存在的问题**

当需要启动一个线程去完成任务时，通常会通过 Runnable 接口来定义任务内容，并使用 Thread 类来启动该线程

*传统代码*

```java
public class Demo01LambdaIntro {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("新线程任务执行！");
            }
        }).start();
    }
}
```

由于面向对象的语法要求，首先创建一个 Runnable 接口的匿名内部类对象来指定线程要执行的任务内容，再将其交 给一个线程来启动。

代码分析: 

对于 Runnable 的匿名内部类用法，可以分析出几点内容： 

- Thread 类需要 Runnable 接口作为参数，其中的抽象 run 方法是用来指定线程任务内容的核心 
- 为了指定 run 的方法体，不得不需要 Runnable 接口的实现类 
- 为了省去定义一个 Runnable 实现类的麻烦，不得不使用匿名内部类 
- 必须覆盖重写抽象 run 方法，所以方法名称、方法参数、方法返回值不得不再写一遍，且不能写错 
- 而实际上，似乎只有方法体才是关键所在

*Lambda体验*

Lambda是一个匿名函数，可以理解为一段可以传递的代码。 

Lambda表达式写法,代码如下： 

借助Java 8的全新语法，上述 Runnable 接口的匿名内部类写法可以通过更简单的Lambda表达式达到相同的效果

```java
public class Demo01LambdaIntro {
    public static void main(String[] args) {
        new Thread(() -> System.out.println("新线程任务执行！")).start(); // 启动线程
    }
}
```

这段代码和刚才的执行效果是完全一样的，可以在JDK 8或更高的编译级别下通过。从代码的语义中可以看出：我们 启动了一个线程，而线程任务的内容以一种更加简洁的形式被指定。 

我们只需要将要执行的代码放到一个Lambda表达式中，不需要定义类，不需要创建对象。

**优点**

简化匿名内部类的使用，语法更加简单。

#### 标准格式

Lambda省去面向对象的条条框框，Lambda的标准格式格式由3个部分组成：

```java
(参数类型 参数名称) -> {
    代码体;
}
```

格式说明：

- `(参数类型 参数名称)`：参数列表 
- `{代码体;}`：方法体 
- `-> `：箭头，分隔参数列表和方法体

**Lambda与方法的对比**

匿名内部类

```java
public void run() {
    System.out.println("aa");
}
```

Lambda

```java
() -> System.out.println("bb！")
```

#### 练习

**无参数无返回值的Lambda**

```java
interface Swimmable {
    public abstract void swimming();
}
```

```java
package com.itheima.demo01lambda;
public class Demo02LambdaUse {
    public static void main(String[] args) {
        goSwimming(new Swimmable() {
            @Override
            public void swimming() {
                System.out.println("匿名内部类游泳");
            }
        });
        goSwimming(() -> {
            System.out.println("Lambda游泳");
        });
    }
    public static void goSwimming(Swimmable swimmable) {
        swimmable.swimming();
    }
}

```

**有参数有返回值的Lambda**

下面举例演示 java.util.Comparator 接口的使用场景代码，其中的抽象方法定义为： 

- `public abstract int compare(T o1, T o2); `

当需要对一个对象集合进行排序时， Collections.sort 方法需要一个 Comparator 接口实例来指定排序的规则

*传统写法*

```java
public class Person {
    private String name;
    private int age;
    private int height;
    // 省略其他
}
```

```java
package com.itheima.demo01lambda;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
public class Demo03LambdaUse {
    public static void main(String[] args) {
        ArrayList<Person> persons = new ArrayList<>();
        persons.add(new Person("刘德华", 58, 174));
        persons.add(new Person("张学友", 58, 176));
        persons.add(new Person("刘德华", 54, 171));
        persons.add(new Person("黎明", 53, 178));
        Collections.sort(persons, new Comparator<Person>() {
            @Override
            public int compare(Person o1, Person o2) {
                return o1.getAge() - o2.getAge();
            }
        });
        for (Person person : persons) {
            System.out.println(person);
        }
    }
}
```

这种做法在面向对象的思想中，似乎也是“理所当然”的。其中 Comparator 接口的实例（使用了匿名内部类）代表 了“按照年龄从小到大”的排序规则。

*Lambda写法*

```java
package com.itheima.demo01lambda;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
public class Demo03LambdaUse {
    public static void main(String[] args) {
        ArrayList<Person> persons = new ArrayList<>();
        persons.add(new Person("刘德华", 58, 174));
        persons.add(new Person("张学友", 58, 176));
        persons.add(new Person("刘德华", 54, 171));
        persons.add(new Person("黎明", 53, 178));
        Collections.sort(persons, (o1, o2) -> {
            return o1.getAge() - o2.getAge();
        });
        for (Person person : persons) {
            System.out.println(person);
        }
        System.out.println("-----------------");
        List<Integer> list = Arrays.asList(11, 22, 33, 44);
        list.forEach(new Consumer<Integer>() {
            @Override
            public void accept(Integer integer) {
                System.out.println(integer);
            }
        });
        System.out.println("-----------------");
        list.forEach((s) -> {
            System.out.println(s);
        });
    }
}
```

#### 实现原理

```java
@FunctionalInterface
interface Swimmable {
    public abstract void swimming();
}
```

**匿名内部类**

```java
public class Demo04LambdaImpl {
    public static void main(String[] args) {
        goSwimming(new Swimmable() {
            @Override
            public void swimming() {
                System.out.println("使用匿名内部类实现游泳");
            }
        });
    }
    public static void goSwimming(Swimmable swimmable) {
        swimmable.swimming();
    }
}

```

我们可以看到匿名内部类会在编译后产生一个类： Demo04LambdaImpl$1.class

![image-20230201150516995](http://images.hellocode.top/image-20230201150516995.png)

使用XJad反编译这个类，得到如下代码：

```java
package com.itheima.demo01lambda;
import java.io.PrintStream;
// Referenced classes of package com.itheima.demo01lambda:
// Swimmable, Demo04LambdaImpl
static class Demo04LambdaImpl$1 implements Swimmable {
    public void swimming()
    {
        System.out.println("使用匿名内部类实现游泳");
    }
    Demo04LambdaImpl$1() {
    }
}
```

**Lambda**

```java
public class Demo04LambdaImpl {
    public static void main(String[] args) {
        goSwimming(() -> {
            System.out.println("Lambda游泳");
        });
    }
    public static void goSwimming(Swimmable swimmable) {
        swimmable.swimming();
    }
}

```

运行程序，控制台可以得到预期的结果，但是并没有出现一个新的类，也就是说Lambda并没有在编译的时候产生一 个新的类。使用XJad对这个类进行反编译，发现XJad报错。使用了Lambda后XJad反编译工具无法反编译。我们使用 JDK自带的一个工具： javap ，对字节码进行反汇编，查看字节码指令。 

在DOS命令行输入：

```bash
javap -c -p 文件名.class
-c：表示对代码进行反汇编
-p：显示所有类和成员
```

反汇编后效果如下：

```java
C:\Users\>javap -c -p Demo04LambdaImpl.class
Compiled from "Demo04LambdaImpl.java"
public class com.itheima.demo01lambda.Demo04LambdaImpl {
public com.itheima.demo01lambda.Demo04LambdaImpl();
Code:
0: aload_0
1: invokespecial #1 // Method java/lang/Object."<init>":()V
4: return
public static void main(java.lang.String[]);
Code:
0: invokedynamic #2, 0 // InvokeDynamic #0:swimming:
()Lcom/itheima/demo01lambda/Swimmable;
5: invokestatic #3 // Method goSwimming:
(Lcom/itheima/demo01lambda/Swimmable;)V
8: return
public static void goSwimming(com.itheima.demo01lambda.Swimmable);
Code:
0: aload_0
1: invokeinterface #4, 1 // InterfaceMethod
com/itheima/demo01lambda/Swimmable.swimming:()V
6: return
private static void lambda$main$0();
Code:
0: getstatic #5 // Field
java/lang/System.out:Ljava/io/PrintStream;
3: ldc #6 // String Lambda游泳
5: invokevirtual #7 // Method java/io/PrintStream.println:
(Ljava/lang/String;)V
8: return
}
```

可以看到在类中多出了一个私有的静态方法 lambda$main$0 。这个方法里面放的是什么内容呢？我们通过断点调试 来看看：

![image-20230201150736659](http://images.hellocode.top/image-20230201150736659.png)

可以确认 lambda$main$0 里面放的就是Lambda中的内容，我们可以这么理解 lambda$main$0 方法：

```java
public class Demo04LambdaImpl {
    public static void main(String[] args) {
        ...
    }
    private static void lambda$main$0() {
        System.out.println("Lambda游泳");
    }
}

```

关于这个方法 lambda$main$0 的命名：以lambda开头，因为是在main()函数里使用了lambda表达式，所以带有 $main表示，因为是第一个，所以$0。 

如何调用这个方法呢？其实Lambda在运行的时候会生成一个内部类，为了验证是否生成内部类，可以在运行时加 上 -Djdk.internal.lambda.dumpProxyClasses ，加上这个参数后，运行时会将生成的内部类class码输出到一个文 件中。使用java命令如下：

```bash
java -Djdk.internal.lambda.dumpProxyClasses 要运行的包名.类名
```

根据上面的格式，在命令行输入以下命令：

```bash
C:\Users\>java -Djdk.internal.lambda.dumpProxyClasses
com.itheima.demo01lambda.Demo04LambdaImpl
Lambda游泳
```

执行完毕，可以看到生成一个新的类，效果如下：

![image-20230201150926747](http://images.hellocode.top/image-20230201150926747.png)

反编译 Demo04LambdaImpl$$Lambda$1.class 这个字节码文件，内容如下：

```java
// Referenced classes of package com.itheima.demo01lambda:
// Swimmable, Demo04LambdaImpl
final class Demo04LambdaImpl$$Lambda$1 implements Swimmable {
    public void swimming()
    {
        Demo04LambdaImpl.lambda$main$0();
    }
    private Demo04LambdaImpl$$Lambda$1()
    {
    }
}

```

可以看到这个匿名内部类实现了 Swimmable 接口，并且重写了 swimming 方法， swimming 方法调用 Demo04LambdaImpl.lambda$main$0() ，也就是调用Lambda中的内容。最后可以将Lambda理解为：

```java
public class Demo04LambdaImpl {
    public static void main(String[] args) {
        goSwimming(new Swimmable() {
            public void swimming() {
                Demo04LambdaImpl.lambda$main$0();
            }
        });
    }
    private static void lambda$main$0() {
        System.out.println("Lambda表达式游泳");
    }
    public static void goSwimming(Swimmable swimmable) {
        swimmable.swimming();
    }
}
```

**小结**

- 匿名内部类在编译的时候会一个class文件 
- Lambda在程序运行的时候形成一个类
  - 在类中新增一个方法,这个方法的方法体就是Lambda表达式中的代码
  - 还会形成一个匿名内部类,实现接口,重写抽象方法
  - 在接口的重写方法中会调用新生成的方法

#### 省略格式

在Lambda标准格式的基础上，使用省略写法的规则为：

1. 小括号内参数的类型可以省略 
2. 如果小括号内有且仅有一个参数，则小括号可以省略
3. 如果大括号内有且仅有一个语句，可以同时省略大括号、return关键字及语句分号

```java
(int a) -> {
    return new Person();
}
```

省略后

```java
a -> new Person()
```

#### 前提条件

Lambda的语法非常简洁，但是Lambda表达式不是随便使用的，使用时有几个条件要特别注意： 

1. 方法的参数或局部变量类型必须为接口才能使用Lambda
2. 接口中有且仅有一个抽象方法

```java
public interface Flyable {
    public abstract void flying();
}
```

```java
public class Demo05LambdaCondition {
    public static void main(String[] args) {
        test01(() -> {
        });
        Flyable s = new Flyable() {
            @Override
            public void flying() {
            }
        };
        Flyable s2 = () -> {
        };
    }
    public static void test01(Flyable fly) {
        fly.flying();
    }
}
```



### Stream流