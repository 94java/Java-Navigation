---
title: "并发"
order: 4
category:
  - Java
---
# 并发

[[toc]]



## 一、基础知识

- 多线程是指从软件或者硬件上实现多个线程并发执行的技术
- 具有多线程能力的计算机因有硬件支持而能够在同一时间执行多个线程，提升性能

### 1、并发和并行

- 并行：在同一时刻，有多个指令在多个CPU上同时执行
- 并发：在同一时刻，有多个指令在单个CPU上交替执行

### 2、进程和线程

进程：就是操作系统中正在运行的一个应用程序
- 独立性：进程是一个能独立运行的基本单位，同时也是系统分配资源和调度的独立单位
- 动态性：进程的实质是程序的一次执行过程，进程是动态产生，动态消亡的
- 并发性：任何进程都可以和其他进程一起并发执行

线程：是进程中的单个顺序控制流，是一条执行路径
- 单线程：一个进程如果只有一条执行路径，则称为单线程程序
- 多线程：一个进程如果有多条执行语句，则称为多线程程序

### 3、实现方式

#### 3.1. 继承Thread类的方式进行实现

- 定义一个MyThread继承Thread类

- 在MyThread类中重写run()方法

- 创建MyThread类的对象

- 启动线程

```java
// MyThread类
public class MyThread extends Thread{
    @Override
    public void run{
        // 代码就是线程在开启之后执行的代码
        for(int i = 0; i < 100; i++){
            System.out.println("线程开启了" + i);
        }
    }
}
```

```java
// 测试类
public class Demo{
    public static void main(String[] args){
        // 创建两个线程对象
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        // 开启一条线程
        t1.start();
        // 开启第二条线程
        t2.start();
    }
}
```

>多线程程序，线程交替进行执行，是随机的，所以每次执行的结果可能都不一样

run()方法和start()方法的区别

- `run()`：封装线程执行的代码，直接调用，相当于普遍方法的调用，并没有开启线程

- `start()`：启动线程，然后由JVM调用此线程的run()方法

#### 3.2. 实现Runnable接口的方式进行实现

- 定义一个类MyRunnable实现Runnable接口
- 在MyRunnable类中重写run()方法
- 创建MyRunnable类的对象
- 创建Thread类的对象，把MyRunnable对象作为构造方法的参数
- 启动线程

```java
// MyRunnable类
public class MyRunnable implements Runnable{
    @Override
    public void run(){
        // 线程启动后执行的代码
        for(int i = 0; i < 100; i++){
            System.out.println("线程开启了" + i);
        }
    }
}
```

```java
// 测试类
public class Demo{
    public static void main(String[] args){
        // 创建了一个参数的对象
        MyRunnable mr = new MyRunnable();
        // 创建了一个线程对象，并把参数传递给这个线程
        // 在线程启动之后，执行的就是参数里面的run方法
        Thread t = new Thread(mr);
        t.start();
        
        MyRunnable mr2 = new MyRunnable();
        Thread t2 = new Thread(mr2);
        t2.start();
    }
}
```

#### 3.3. 利用Callable和Future接口方式实现

- 定义一个MyCallable实现Callable接口
- 在MyCallable类中重写call()方法
- 创建Mycallable类的对象
- 创建Future的实现类FutureTask对象，把Mycallable对象作为构造方法的参数
- 创建Thread类的对象，把FutureTask对象作为构造方法的参数
- 启动线程

```java
// MyCallable类
public class MyCallable implements Callable<String>{
    @Override
    public String call() throws Exception{
        for(int i = 0; i < 100; i++){
            System.out.println("线程启动了" + i);
        }
        // 返回值就表示线程运行完毕之后的结果
        return "完成";
    }
}
```

```java
// 测试类
public class Demo{
    public static void main(String[] args){
        // 线程开启之后执行里面的call方法
        MyCallable mc = new MyCallable();
        // 可以获取线程执行完毕之后的结果，也可以作为参数传递给Thread对象
        FutureTack<String> ft = new FutureTask<>(mc);
        // 创建线程对象
        Thread t = new Thread(ft);
        // 开启线程
        ft.start();
        // 获取线程执行完毕返回的结果
        String s = ft.get();		// get方法不能在start方法前执行
        System.out.println(s);
    }
}
```

#### 3.4. 三种方式的对比

|                            | 优点                                         | 缺点                                       |
| -------------------------- | :------------------------------------------- | ------------------------------------------ |
| 实现Runnable、Callable接口 | 扩展性强，实现该接口的同时还可以继承其他的类 | 编程相对复杂，不能直接使用Thread类中的方法 |
| 继承Thread类               | 编程比较简单，可以直接使用Thread类中的方法   | 可扩展性较差，不能再继承其他的类           |

### 4、线程类的常见方法

**获取线程的名称**

- `String getName()`：返回此线程的名称
- 如果不设置名称，默认Thread-数字

**设置线程的名字**

- `void setName(String name)`：将此线程的名称更改为等于参数name
- 通过构造方法也可以设置线程名称

**获得当前线程对象**

- `public static Thread currentThread()`：返回对当前正在执行的线程对象的引用

**线程休眠**

- `public static void sleep(long time)`：让线程休眠指定的时间，单位为毫秒

### 5、线程调度

**多线程的并发运行**

- 计算机中的CPU，在任意时刻只能执行一条机器指令。每个线程只有获得CPU的使用权才能执行代码。
  各个线程轮流获得CPU的使用权，分别执行各自的任务。

**线程有两种调度模型**

- 分时调度模型：所有线程轮流使用CPU的使用权，平均分配每个线程占用CPU的时间片
- 抢占式调度模型：优先让优先级高的线程使用CPU，如果线程的优先级相同，那么会随机选择一个，优先级高的线程获取的CPU时间片相对多一些
- Java采用的是抢占式调度模型

**线程的优先级**

- `public final void setPriority(int Priority)`：设置线程的优先级,默认优先级为5,范围为[1,10]
- `public final int getPriority()`：获取线程的优先级

### 6、后台线程/守护线程

- `public final void setDaemon(boolean on)`：设置为守护线程

- 当主要线程执行完毕之后，守护线程也没有继续执行下去的必要了
  
  但守护线程不会在主线程执行完毕后立即停止，因为他还占有着CPU的 使用权，还会再执行一会

## 二、线程安全问题

### 1、卖票案例

需求：某电影院目前正在上映国产大片，共有100张票，而它有3个窗口卖票，请设计一个程序模拟该电影院卖票

**思路**

定义一个类Ticket实现Runnable接口，里面定义一个成员变量：`private int ticketCount = 100;`

在Ticket类中重写run()方法实现卖票，代码步骤如下
- 判断票数大于0，就卖票，并告知是哪个窗口卖的
- 票数减一
- 卖光之后，线程停止

定义一个测试类TicketDemo，里面有main方法，代码步骤如下
- 创建Ticket类的对象
- 创建三个Thread类的对象，把Ticekt对象作为构造方法的参数，并给出对应的窗口名称
- 启动线程

```java
// Ticket类
public class Ticket implements Runnable{
	private int ticket = 100;
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true){
			if(ticket == 0){
				// 卖完了
				break;
			}else{
				ticket--;
				System.out.println(Thread.currentThread().getName() + "正在卖票，当前还剩余：" + ticket + "张票");
			}
		}
	}
	
}

```

```java
// Demo类
public class Demo {
	public static void main(String[] args){
		// 为了多个线程共享一个类中的数据，所以只需要创建一个ticket对象
        Ticket ticket = new Ticket();
		
		Thread t1 = new Thread(ticket);
		Thread t2 = new Thread(ticket);
		Thread t3 = new Thread(ticket);
		
		t1.setName("窗口1");
		t2.setName("窗口2");
		t3.setName("窗口3");
		t1.start();
		t2.start();
		t3.start();
	}
}
```

**卖票案例的思考**

在实际生活中，售票时出票也是需要时间的，所以在出售一张电影票的时候，需要一点时间的延迟，假定每次出票时间为100毫秒，可使用`sleep()`方法实现

**问题**

- 相同的票出现了很多次
- 出现了负数票数

**原因**：在睡眠期间，其他线程抢占CPU使用权，因为都操作的是同一个数据，导致自减操作的时候出现负数

**卖票案例数据安全问题的解决**

为什么出现问题?（这也是判断多线程程序是否会有数据安全问题的标准）

- 多线程操作共享数据

如何解决多线程安全问题呢？

- 基本思想：让程序没有安全问题的环境

怎么实现呢？

- 把多条语句操作共享数据的代码给锁起来，让任意时刻只能有一个线程执行即可
- Java中提供了同步代码块的方式来解决

### 2、同步代码块

>  锁多条语句操作共享数据，可以使用同步代码块来实现

**格式**

```java
synchronized(任意对象){			// 锁的对象一定要是唯一的
    多条语句操作共享数据的代码
}
```

- 锁默认情况是打开的，只要有一个线程进去执行代码了，锁就会关闭

- 当线程执行完毕出来了，锁才会自动打开


**同步的好处和弊端**

- 好处：解决了多线程的数据安全问题
- 弊端：当线程很多的时候，因为每个线程都会去判断同步上的锁，这是很耗费资源的，无形中会降低程序的运行效率

### 3、同步方法

- 同步方法：就是把synchronized关键字加到方法前
- 格式：`修饰符 synchronized 返回值类型 方法名(方法参数){ }`

**同步代码块和同步方法的区别**

- 同步代码块可以锁住指定代码，同步方法是锁住方法中的所有代码

- 同步代码块可以指定锁对象，同步方法不能指定锁对象

- 同步方法的锁对象为：`this`
  
  同步静态方法的锁对象为：`类名.class`（表示字节码文件的对象）

### 4、Lock锁

- 虽然可以理解同步代码块和同步方法的锁对象问题，但是并没有直接看到在哪里加上了锁，在哪里释放了锁，为了更清晰的表达如何加锁和释放锁，JDK5以后提供了一个新的锁对象Lock
  
  Lock实现提供比使用synchronized方法和语句可以获得更广泛的锁定操作

**Lock中提供了获得锁和释放锁的方法**

- `void lock()`：获得锁
- `void unlock()`：释放锁

Lock是接口不能直接实例化，要采用它的实现类`ReentrantLock`

- ReentrantLock的构造方法：`ReentrantLock()`

### 5、死锁

- 线程死锁是指由于两个或者多个线程互相持有对方所需要的资源，导致这些线程处于等待状态，无法前往执行
- 解决方法：不要写锁的嵌套即可

## 三、生产者和消费者

> 生产者消费者模式是一种十分经典的多线程协作的模式，弄懂生产者消费者问题能够让我们对多线程编程的理解更加深刻

等待和唤醒的方法

> 为了体现生产和消费过程中的等待和唤醒，Java提供了几个方法供我们使用，这几个方法在Object类中

| 方法名           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| void wait()      | 导致当前线程等待，直到另一个线程调用该对象的notify()方法或notifyAll()方法 |
| void notify()    | 唤醒正在等待对象监视器的单个线程                             |
| void notifyAll() | 唤醒正在等待对象监视器的所有线程                             |

**代码实现**

- while(true)死循环
- synchronized 锁，锁对象要唯一
- 判断，共享数据是否结束

```java
/*消费者步骤：
1.判断桌子上是否有汉堡包
2.如果没有就等待
3.如果有就开吃
4.吃完之后，桌子上的汉堡包就没有了
	叫醒等待的生产者继续生产
汉堡包的总数量减一*/

/*生产者步骤：
1.判断桌子上是否有汉堡包
	如果有就等待，没有就生成
2.把汉堡包放在桌子上
3.叫醒等待的消费者开吃*/
```

```java
// Desk类
package ThreadDemo;

package ThreadDemo;

public class Desk {
	// 状态：桌上有无汉堡包
	private boolean flag;
	// 数量
	private int count;
	// 锁对象
	private final Object lock = new Object();
	public Desk(boolean flag, int count) {
		super();
		this.flag = flag;
		this.count = count;
	}
	public Desk() {
		super();
	}
	public boolean isFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public Object getLock() {
		return lock;
	}
	@Override
	public String toString() {
		return "Desk [flag=" + flag + ", count=" + count + ", lock=" + lock + "]";
	}	
}
```

```java
// 吃货类
package ThreadDemo;

public class Foodie extends Thread{
	private Desk desk;
	
	public Foodie(Desk desk) {
		super();
		this.desk = desk;
	}
	
	public void run(){
		while(true){
			synchronized(desk.getLock()){
				if(desk.getCount() == 0){
					break;
				}else{
					if(desk.isFlag()){		// 桌上有就开吃
						System.out.println("吃货正在吃汉堡包");
						desk.setCount(desk.getCount() - 1);
						desk.setFlag(false);
						desk.getLock().notifyAll();   // 叫醒厨师继续生产
					}else{		// 如果没有就等待
						try {
							desk.getLock().wait();
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}
	}
}
```

```java
// 厨师类
package ThreadDemo;

public class Cooker extends Thread{
	private Desk desk;
	
	public Cooker(Desk desk) {
		super();
		this.desk = desk;
	}

	public void run(){
		while(true){
			synchronized(desk.getLock()){
				if(desk.getCount() == 0){
					break;
				}else{
					if(!desk.isFlag()){		// 桌上没有汉堡包就生产
						System.out.println("厨师正在生产第" + (11 - desk.getCount()) + "个汉堡包");
						desk.setFlag(true);
						desk.getLock().notifyAll();		// 叫醒吃货来吃汉堡包
					}else{			// 有就等待
						try {
							desk.getLock().wait();
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}
	}
}

```

```java
// 测试类
package ThreadDemo;

public class Demo {
	
	public static void main(String[] args){
		Desk desk = new Desk(false, 10);
		Foodie fd = new Foodie(desk);
		Cooker ck = new Cooker(desk);
		fd.start();
		ck.start();
	}
}
```

**阻塞队列实现等待唤醒机制**

阻塞队列继承结构：

Iterable(接口) -> Collection(接口) -> Queue(接口) -> BlockingQueue(接口) -> ArrayBlockingQueue(实现类) / LinkedBlockingQueue(实现类)

BlockingQueue的核心方法：

- `put(anObject)`：将参数放入队列，如果放不进去会阻塞

- `take()`：取出第一个参数，取不到会阻塞

常见BlockingQueue：

- `ArrayBlockingQueue`：底层是数组，有界
- `LinkedBlockingQueue`：底层是链表，无界。但不是真正的无界，最大为int的最大值

**代码实现**

```java
// 吃货类
package ThreadDemo2;

import java.util.concurrent.ArrayBlockingQueue;

public class Foodie extends Thread{
	private ArrayBlockingQueue<String> list;
	
	
	public Foodie(ArrayBlockingQueue<String> list) {
		super();
		this.list = list;
	}


	public void run(){
		while(true){
			try {
				System.out.println("吃货吃了一个" + list.take());
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```

```java
// 厨师类
package ThreadDemo2;

import java.util.concurrent.ArrayBlockingQueue;

public class Cooker extends Thread{
	private ArrayBlockingQueue<String> list;

	public Cooker(ArrayBlockingQueue<String> list) {
		super();
		this.list = list;
	}

	@Override
	public void run() {
		while(true){
			try {
				list.put("汉堡包");
				System.out.println("厨师放了一个汉堡包");
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
}

```

```java
// 测试类
package ThreadDemo2;

import java.util.concurrent.ArrayBlockingQueue;

public class Demo {

	public static void main(String[] args) {
		// 创建一个阻塞队列，容量为1
		ArrayBlockingQueue<String> list = new ArrayBlockingQueue<>(1);
		
		// 创建相应的生产者和消费者
		Foodie fd = new Foodie(list);
		Cooker ck = new Cooker(list);
		
		// 开启对应的线程
		ck.start();
		fd.start();
	}

}
```

## 四、线程池&volatile

### 1、线程状态

![](http://images.hellocode.top/%E7%BA%BF%E7%A8%8B%E7%8A%B6%E6%80%81.png)

**虚拟机中线程的六种状态**

- 新建状态（NEW）			------			创建线程对象
- 就绪状态（RUNNABLE）				------					start方法
- 阻塞状态（BLOCKED）			-------   无法获得锁对象
- 等待状态（WAITING）           ---------   wait方法
- 计时等待（TIMED_WAITING）            -------- sleep等方法
- 结束状态（TERMINATED）              --------     全部代码运行完毕

### 2、线程池

以前写多线程的弊端

- 用到线程的时候就创建
- 用完之后线程消失

**解决方案**

- 创建一个池子（线程池），池子是空的-------创建Executors中的静态方法

- 有任务需要执行时，才会创建线程对象
  当任务执行完毕，线程对象归还给池子----------submit方法

- 所有任务全部执行完毕，关闭连接池---------shutdown方法

> 池子会自动的帮我们创建对象，任务执行完毕，也会自动把线程对象归还池子
>
> Executors----------可以帮助我们创建线程池对象
>
> ExecutorService---------可以帮助我们控制线程池

**代码实现**

- `static ExecutorService newCachedThreadPool()`：创建一个默认的线程池，池子中默认是空的，默认最多可容纳int类型的最大值

- `static newFixedThreadPool(int nThreads)`：创建一个指定最多线程数量的线程池


```java
package Executor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Demo1 {

	public static void main(String[] args) throws InterruptedException {
		// 创建一个线程池对象
		ExecutorService executorService = Executors.newCachedThreadPool();
        // ExecutorService executorService = Executors.newFixedThreadPool()
		// 提交任务
		executorService.submit(()->{
			System.out.println(Thread.currentThread().getName() + "执行了");
		});
		
		Thread.sleep(2000);
		
		executorService.submit(()->{
			System.out.println(Thread.currentThread().getName() + "执行了");
		});
		
		executorService.shutdown();
	}

}
```

**ThreadPoolExecutor**

核心元素

- 核心线程数量（一旦创建，不能销毁，除非线程池整体被销毁）---------不能小于0

- 线程池中的最大线程数量-------------不能小于等于0，最大数量>=核心线程数量

- 空闲线程最大存活时间-------------不能小于0

- 时间单位-------------时间单位，使用TimeUnit的静态属性

- 任务队列--------不能为null

- 创建线程工厂---------------不能为null

- 任务的拒绝策略-----------------不能为null
  
  ThreadPoolExecutor.AbortPolicy-----丢弃任务并抛出RejectedExecutionException异常，是默认的策略
  
  ThreadPoolExecutor.DiscardPolicy----丢弃任务，但是不抛出异常。不推荐的做法
  
  ThreadPoolExecutor.DiscardOldestPolicy-----抛弃队列中等待最久的任务，然后把当前的任务加入队列中
  
  ThreadPoolExecutor.CallerRunsPolicy----调用任务的run()方法绕过线程池直接执行

代码实现

```java
package ThreadPool;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MyThreadPoolDemo {

	public static void main(String[] args) {
		ThreadPoolExecutor pool = new ThreadPoolExecutor(
				2,
				5,
				2,
				TimeUnit.SECONDS,
				new ArrayBlockingQueue<>(10),
				Executors.defaultThreadFactory(),
				new ThreadPoolExecutor.AbortPolicy());
		pool.submit(()->{
			System.out.println(Thread.currentThread().getName() + "在执行");
		});
		pool.submit(()->{
			System.out.println(Thread.currentThread().getName() + "在执行");
		});
		pool.shutdown();
	}
}
```

### 3、Volatile

**问题描述**

当A线程修改了共享数据时，B线程没有及时获取到最新的值，如果还在使用原先的值，就会出现问题

**JMM**

- 在Java虚拟机中，堆内存是唯一的，而每一个线程都有自己独立的栈内存
- 每一个线程在使用堆里面的变量的时候，都会先拷贝一份到变量的副本中
- 在线程中，每一次使用的是从变量的副本中获取的

**Volatile关键字**：强制线程在每次使用的时候，都会看一下共享区域最新的值

**问题解决方案**

- Volatile关键字
- synchronized同步代码块（也具有强制线程查看共享数据中的最新值）
  - 线程获得锁
  - 清空变量副本
  - 拷贝共享变量最新的值到变量副本中
  - 执行代码
  - 将修改后变量副本的值赋给共享数据
  - 释放锁

## 五、原子性&并发工具类

> 所谓原子性是指在一次或多次操作中，要么所有的操作全部都得到了执行并且不会受到任何因素的干扰而中断，要么所有的操作都不执行，多个操作是一个不可分割的整体

- `count++`不是一个原子性操作，也就是说他在执行的过程中，有可能被其他线程打断操作

- volatile关键字不能保证原子性，只能保证每次线程共享数据的时候是最新值

- synchronized同步代码块可以保证原子性，但是速度相对比较慢

### 1、原子类AtomicInteger

|                 方法名                 |                             说明                             |
| :------------------------------------: | :----------------------------------------------------------: |
|         public AtomicInteger()         |              初始化一个默认值为0的原子型Integer              |
| public AtomicInteger(int initialValue) |               初始化一个指定值的原子型Integer                |
|               int get()                |                            获取值                            |
|         int getAndIncrement()          |     以原子方式将当前值加1，注意，这里返回的是自增前的值      |
|         int incrementAndGet()          |     以原子方式将当前值加1，注意，这里返回的是自增后的值      |
|        int addAndGet(int data)         | 以原子方式将输入的数值与实例中的值(AtomicInteger里的value)相加，并返回结果 |
|        int getAndSet(int value)        |           以原子方式设置为newValue的值，并返回旧值           |

```java
// MyAtomThread类
public class MyAtomThread implements Runnable{
   AtomicInteger ac = new AtomicInteger();
   
    public void run(){
        for(int i = 0; i < 100; i++){
            int count = ac.incrementAndGet();
            System.out.println("已经送了" + count + "个冰淇淋");
        }
    }
}
```

```java
// 测试类
public class Demo{
    public static void main(String[] args){
        MyAtomThread atom = new MyAtomThread();
        
        for(int i = 0; i < 100; i++){
            new Thread(atom).start();
        }
    }
}
```

**AtomicInteger原理**

- 自旋锁 + CAS算法
- CAS算法：有3个操作数(内存值V, 旧的预期值A, 要修改的值B)
  - 当旧的预期值A == 内存值  此时修改成功，将V改为B
  - 当旧的预期值A != 内存值  此时修改失败，不做任何操作
  - 并重新获取现在的最新值(这个重新获取的动作就是自旋)

### 2、悲观锁和乐观锁

**synchronized和CAS的区别**

相同点：在多线程情况下，都可以保证共享数据的安全性

不同点
- synchronized总是从最坏的角度出发，认为每次获取数据的时候，别人都有可能修改，所以每次操作共享数据之前，都会上锁。（悲观锁）

- CAS是从乐观的角度出发，假设每次获取数据别人都不会修改，所以不会上锁。只不过在修改共享数据的时候，会检查一下，别人有没有修改过这个数据。（乐观锁）
  
  如果别人修改过，就再次获取最新值（自旋）
  
  如果别人没有修改过，就直接修改

### 3、并发工具类

#### 3.1. Hashtable

> HashMap是线程不安全的（多线程环境下可能会存在问题）

为了保证数据的安全性我们可以使用Hashtable，但是Hashtable的效率低下

- Hashtable采取悲观锁synchronized的形式保证数据的安全性
- 只要有线程访问，会将整张表全部锁起来，所以Hashtable的效率低下

#### 3.2. ConcurrentHashMap

> ConcurrentHashMap是线程安全的，而且效率也比较高，继承于Map

**JDK1.7原理解析**

创建对象
- 创建一个默认长度16，默认加载因子0.75的数组，数组名Segment，这个大数组一旦创建，无法扩容
- 再创建一个长度为2的小数组，把地址值赋值给0索引，其它索引都为null

添加
- 第一次会根据键的哈希值计算出在大数组中应存入的位置

- 如果为null，则按照模板创建小数组

  创建完毕，会二次哈希，计算出在小数组中应存入的位置，直接存入

- 如果不为null，就会根据记录的地址值找到小数组

  二次哈希，计算出在小数组中应存入的位置

- 如果需要扩容，则将小数组扩容两倍

- 如果不需要扩容，则判断小数组的这个位置有没有元素。如果没有元素，则直接存，如果有元素，则会调用equals方法，比较属性值

  如果equals为true，则不存

  如果equals为false，则形成哈希桶结构

**JDK1.8原理解析**

- 底层结构：哈希表（数组、链表、红黑树的结合体）
- 结合CAS机制 + synchronized同步代码块形式保证线程安全

**总结**

- 如果使用空参构造创建ConcurrentHashMap对象，则什么事情都不做
  在第一次添加元素的时候创建哈希表
- 计算当前元素应存入的索引
- 如果该索引位置为null，则利用CAS算法，将本结点添加到数组中
- 如果该索引位置不为null，则利用volatile关键字获得当前位置最新的结点地址，挂在他下面，形成链表
- 当链表的长度大于等于8时，自动转换为红黑树
- 以链表或者红黑树头结点为锁对象，配合悲观锁保证多线程操作集合时数据的安全性

#### 3.3. CountDownLatch

使用场景：让某一条线程等待其他线程执行完毕后再执行

|              方法名              |                         说明                         |
| :------------------------------: | :--------------------------------------------------: |
| public CountDownLatch(int count) | 参数传递线程数，表示等待线程数量。并定义了一个计数器 |
|       public void await()        |     让线程等待，当计数器为0时，会唤醒等待的线程      |
|     public void countDown()      |           当前线程执行完毕，会将计数器减一           |

#### 3.4. Semaphore

使用场景：可以控制访问特定资源的线程数量

**步骤**

- 创建Semaphore对象：`new Semaphore(int n)`

  n表示最多可发放通行证的数量

- acquire()方法发放通行证

- release()方法收回通行证

