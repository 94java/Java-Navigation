---
title: "容器"
order: 3
category:
  - Java
---
# 容器

[[toc]]

## 一、概述

### 1、初识Collection

> 是单列集合的顶层接口，它表示一组对象，这些对象也成为Collection的元素
>
> JDK不提供此接口的任何直接实现，它提供更具体的子接口（如Set和List）实现

**数组和集合的对比**

- 数组的长度不可变，集合的长度可变
- 数组可以存储基本数据类型和引用数据类型
  集合只能存储引用数据类型。如果要存储基本数据类型，需要存储对应的包装类

**集合体系结构**
![](http://images.hellocode.top/%E9%9B%86%E5%90%88%E7%9A%84%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84.jpeg)

### 2、常见成员方法

| 方法名                     | 说明                               |
| -------------------------- | ---------------------------------- |
| boolean add(E e)           | 添加元素                           |
| boolean remove(Object o)   | 从集合中移除指定的元素             |
| boolean removeif(Object o) | 根据条件进行删除                   |
| void clear()               | 清空集合                           |
| boolean contains(Object o) | 判断集合中是否存在指定的元素       |
| boolean isEmpty()          | 判断集合是否为空                   |
| int size()                 | 集合的长度，也就是集合中元素的个数 |

### 3、Collection集合的遍历

#### 3.1. 迭代器遍历

- Iterator：迭代器，集合的专用遍历方式
- `Iterator<E> iterator()`:返回集合中的迭代器对象，该迭代器对象默认指向当前集合的0索引

**Iterator中的常用方法**

- `boolean hasNext()`：判断当前位置是否有元素可以被取出
- `E next()`:获取当前位置的元素，并将迭代器对象移向下一个索引位置

**步骤**

1. 获取迭代器的对象:`Iterator<E> it = list.iterator();`
2. 利用迭代器的成员方法进行遍历

#### 3.2. 增强for循环

> 简化数组和Collection集合的遍历

- 它是JDK5之后出现的，其内部原理是一个Iterator迭代器
- 实现Iterable接口的类才可以使用迭代器和增强for

**格式**

```java
for(元素数据类型 变量名 : 数组或者Collection集合){
    // 在此处使用变量即可，该变量就是元素
}
// 数据类型一定是集合或者数组元素的类型
// 变量名在循环的过程中，依次表示集合或者数组中的每一个元素
```

> 在增强for中，修改第三方变量的值不会影响到集合中的元素

**三种循环的使用场景**

- 如果需要操作索引，使用普通for循环
- 如果在遍历的过程中需要删除元素，请使用迭代器
- 如果仅仅想遍历，那么使用增强for

#### 3.3. 案例

```java
// 需求：创建一个Collection集合存储学生对象的集合，存储3个学生对象，使用程序实现在控制台遍历该集合

// ----------Student类--------------------
public class Student{
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
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
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}


// ----------Test类--------------------
import java.util.ArrayList;
import java.util.Iterator;

public class test {
    public static void main(String[] args) {
        ArrayList<Student> list = new ArrayList<>();

        Student s1 = new Student("张三", 23);
        Student s2 = new Student("李四", 16);
        Student s3 = new Student("王五", 31);
        list.add(s1);
        list.add(s2);
        list.add(s3);

        // 迭代器遍历
        Iterator<Student> it = list.iterator();
        while (it.hasNext()) {
            Student s = it.next();
            System.out.println(s);
        }

        System.out.println("----------------------");

        // 增强for遍历
        for (Student s : list) {
            System.out.println(s);
        }
    }
}

```

## 二、分类

### 1、List

#### 1.1. 概述

- 有序集合，这里的有序指的是存取顺序
- 用户可以精确控制列表中每个元素的插入位置，用户可以通过整数索引访问元素，并搜索列表中的元素
- 与Set集合不同，列表通常允许重复的元素

#### 1.2. 常用方法

|             方法名             |                  说明                  |
| :----------------------------: | :------------------------------------: |
| void add(int index, E element) |   在此集合中的指定位置插入指定的元素   |
|      E remove(int index)       | 删除指定索引处的元素，返回被删除的元素 |
|  E set(int index, E element)   | 修改指定索引处的元素，返回被修改的元素 |
|        E get(int index)        |          返回指定索引处的元素          |

#### 1.3. 数据结构

> 数据结构是计算机存储、组织数据的方式。是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率

**栈**

- 栈是一种数据先进后出的模型
- 只允许在一端进行操作
- 数据进栈的过程称为压/进栈
- 数据进栈的过程称为弹/出栈

**队列**

- 队列是一种先进先出的模型
- 在两端进行操作
- 数据进栈的过程称为入队
- 数据进栈的过程称为出队

**数组**

- 数组是一个查询快、增删慢的模型

- 查询数据通过地址值和索引定位，查询任意数据耗时相同，查询速度快
- 删除数据时，要将原始数据删除，同时后面每个数据前移，删除效率低
- 添加数据时，添加位置后的每个数据后移，再添加元素，添加效率极低

**链表**

- 链表是一个查询慢、增删快的模型（对比数组）

#### 1.4. List常用实现类

- ArrayList：底层数据结构是动态数组，查询快、增删慢
- Vector：和 ArrayList 类似，但它是线程安全的。

- LinkedList：底层数据结构是双向链表，查询慢、增删快。LinkedList 还可以用作栈、队列和双向队列。

**LinkedList特有功能**

|          方法名           |               说明               |
| :-----------------------: | :------------------------------: |
| public void addFirst(E e) |    在该列表开头插入指定的元素    |
| public void addLast(E e)  |  将指定的元素追加到此列表的末尾  |
|    public E getFirst()    |     返回此列表中的第一个元素     |
|    public E getLast()     |    返回此列表中的最后一个元素    |
|  public E removeFirst()   |  从此列表中删除并返回第一个元素  |
|   public E removeLast()   | 从此列表中删除并返回最后一个元素 |

### 2、Set

- 可以去除重复
- 存取顺序不一致
- 没有带索引的方法，所以不能使用普通for遍历循环，也不能通过索引来获取、删除Set集合里面的元素

#### 2.1. 常见实现类

- TreeSet：基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，TreeSet 则为 O(logN)。
- HashSet：基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。
- LinkedHashSet：具有 HashSet 的查找效率，并且内部使用双向链表维护元素的插入顺序。

#### 2.2. TreeSet

**特点**

- 不包含重复元素的集合
- 没有带索引的方法
- 可以将元素按照规则进行排序(需要制定排序规则)

**自然排序Comparable的使用**

- 使用空参构造创建TreeSet集合

- 自定义类实现`Comparable`接口

- 重写里面的`compareTo`方法，制定排序规则

  ```java
  @Override
  public int compareTo(Student o){
      int result = this.age - o.age;
      return result;
  }
  ```


原理

- 如果返回值为负数，表示当前存入的元素是较小值，存左边
- 如果返回值为0，表示当前存入的元素跟集合中元素重复了，不存
- 如果返回值为正数，表示当前存入的元素是较大值，存右边

**比较器排序Comparator的使用**

- TreeSet的带参构造方法使用的是比较器排序对元素进行排序的

- 比较器排序，就是让集合构造方法接收`Comparator`的实现类对象，重写`compare(T o1, T o2)`方法

- 重写方法时，一定要注意排序规则必须要按照要求的主要条件和次要条件来写

  ```java
  @Override
  public int compare(Teacher o1, Teacher o2){
      // o1表示现在要存入的那个元素
      // o2表示已经存入到集合中的元素
      
      // 主要条件
      int result = o1.getAge() - o2.getAge();
      // 次要条件
      result = result == 0 ? o1.getName().compareTo(o2.getName()) : result;
      return result;
  }
  ```

**两种比较方式小结**

- 自然排序：自定义类实现Comparable接口，重写compareTo方法，根据返回值进行排序
- 比较器排序：创建TreeSet对象的时候传递Comparator的实现类对象，重写compare方法，根据返回值进行排序
- 在使用的时候，默认使用自然排序，当自然排序不满足现在的需求时，使用比较排序

**练习**：创建3个学生对象，属性为姓名，语数英成绩，按照总分从小到大顺序打印到控制台

```java
// Student类

public class Student implements Comparable<Student>{
	private String name;
	private int chinese;
	private int english;
	private int math;
	
	public Student(String name, int chinese, int english, int math) {
		super();
		this.name = name;
		this.chinese = chinese;
		this.english = english;
		this.math = math;
	}
	public Student() {
		super();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getChinese() {
		return chinese;
	}
	public void setChinese(int chinese) {
		this.chinese = chinese;
	}
	public int getEnglish() {
		return english;
	}
	public void setEnglish(int english) {
		this.english = english;
	}
	public int getMath() {
		return math;
	}
	public void setMath(int math) {
		this.math = math;
	}
	public int getSum(){
		int res;
		res = chinese + math + english;
		return res;
	}
	@Override
	public String toString() {
		return "Student [name=" + name + ", chinese=" + chinese + ", english=" + english + ", math=" + math + "]" + "总分为：" + getSum();
	}
	@Override
	public int compareTo(Student o) {
		// TODO Auto-generated method stub
		int res = this.getSum() - o.getSum();
		res = res == 0 ? this.getChinese() - o.getChinese() : res;
		res = res == 0 ? this.getMath() - o.getMath() : res;
		res = res == 0 ? this.getName().compareTo(o.getName()) : res;
		return res;
	}
}

```

```java
// 测试类

import java.util.TreeSet;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		TreeSet<Student> stu = new TreeSet<>();
		Student s1 = new Student("李四", 80, 80, 80);
		Student s2 = new Student("张三", 80, 80, 80);
		Student s3 = new Student("王五", 80, 80, 80);
		stu.add(s1);
		stu.add(s2);
		stu.add(s3);
		for(Student student : stu){
			System.out.println(student);
		}
	}
}
```

#### 2.3. HashSet

##### 2.3.1 平衡二叉树

二叉查找树

- 二叉查找树，又称二叉排序树或者二叉搜索树

特点

- 每一个节点上最多有两个子节点
- 每一个节点的左子节点都是小于自己的
- 每一个节点的右子节点都是大于自己的

平衡二叉树

- 二叉树左右两个子树的高度差不超过1
- 任意节点的左右两个子树都是一颗平衡二叉树

左旋

- 触发时机：当添加一个节点后，可能已经破坏平衡，就会触发旋转机制
- 左旋就是将根节点的右侧往左拉，原先的右子节点变成新的父节点，并把多余的左子节点出让，给已经降级的根节点当右子节点

右旋：将根节点的左侧往右拉，左子节点变成了新的父节点，并把多余的右子节点出让，给已经降级的根节点当左子节点

##### 2.3.2 红黑树

- 红黑树是一种自平衡的二叉查找树，是计算机科学中用到的一种数据结构，又叫平衡二叉B树

- 它是一种特殊的二叉查找树，红黑树的每一个节点上都有存储位表示节点的颜色

- 每一个节点可以是红或者黑；红黑树不是高度平衡的，它的平衡是通过“红黑规则”进行实现的


**红黑规则**

- 每一个节点或是红色的，或者是黑色的
- 根节点必须是黑色
- 如果一个节点没有子节点或者父节点，则该节点相应的指针属性值为Nil，这些Nil视为叶节点，每个叶节点(Nil)是黑色的
- 如果某一个节点是红色，那么它的子节点必须是黑色（不能出现两个红色节点相连的情况）
- 对每一个节点，从该节点到其所有后代叶节点的简单路径上，均包含相同数目的黑色节点

**添加节点**

- 添加节点的颜色，可以是红色的，也可以是黑色的
- 添加节点时，默认颜色为红色效率更高
- 当添加的节点为根节点时，直接变为黑色
- 当其父节点为根节点时，则不需要做任何操作
- 其父节点为红色，叔叔节点也是红色
  - 将父节点设为黑色，将叔叔节点也设为黑色
  - 将祖父节点设为红色
  - 如果祖父节点为根节点，则将根节点再次变为黑色
- 其父节点为黑色，不需要进行任何操作
- 其父节点为红色，叔叔节点也是黑色
  - 将父节点设为黑色
  - 将祖父节点设为红色
  - 以祖父节点为支点进行旋转

##### 2.3.3 HashSet

特点

- 底层数据结构是哈希表
- 不能保证存储和取出顺序完全一致
- 没有带索引的方法，不能使用普通for循环遍历
- 由于是Set集合，所以元素唯一

基本使用

```java
import java.util.HashSet;
import java.util.Iterator;

//import java.util.TreeSet;

public class Hash {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HashSet<String> hs = new HashSet<>();
		hs.add("hello");
		hs.add("world");
		hs.add("java");
		hs.add("java");
		hs.add("java");
		hs.add("java");
		
		Iterator<String> it = hs.iterator();
		while(it.hasNext()){
			String s = it.next();
			System.out.println(s);
		}
	}
}
```

哈希值（哈希码值）：是JDK根据对象的地址或者属性值，算出来的int类型的整数

- Object类中`hashCode`方法可以获取对象的哈希值
- `int hashCode()`:根据对象的地址值计算出来的哈希值

对象的哈希值特点

- 如果没有重写hashCode方法，那么是根据对象的地址值计算出的哈希值
- 同一个对象多次调用hashCode()方法返回的哈希值是相同的
- 不同对象的哈希值是不一样的
- 如果重写了hasCode()方法，一般是通过对象的属性值计算出哈希值
- 如果不同的对象属性值是一样的，那么计算出来的哈希值也是一样的

### 3、Map

- `Interface Map<K, V> `

  K:键的数据类型

  V:值的数据类型

- 键不能重复，值可以重复

- 键和值是一 一对应的，每一个键只能找到自己对应的值

- （键+值）这个整体我们称之为“键值对” 或者“键值对对象”，在Java中叫做“Entry对象”

- 双列集合一次可以存两个元素（一对数据）

**创建Map对象**

- 多态的方式

- 具体的实现类HashMap/TreeMap

  ```java
  import java.util.HashMap;
  import java.util.Map;
  
  public class Base {
  
  	public static void main(String[] args) {
  		// TODO Auto-generated method stub
  		Map<String, String> stu = new HashMap<>();
  		stu.put("2020033001", "张三");
  		stu.put("2020033002", "李四");
  		stu.put("2020033003", "王五");
  		System.out.println(stu);
  	}
  }
  ```

**基本功能**

|               方法名                |                 说明                 |
| :---------------------------------: | :----------------------------------: |
|        V put(K key, V value)        |               添加元素               |
|        V remove(Object key)         |          根据键删除值对元素          |
|            void clear()             |         移除所有的键值对元素         |
|   boolean containsKey(Object key)   |       判断集合是否包含指定的键       |
| boolean containsValue(Object value) |       判断集合是否包含指定的值       |
|          boolean isEmpty()          |           判断集合是否为空           |
|             int size()              | 集合的长度，也就是集合中键值对的个数 |

> put方法中，如果要添加的键不存在，则会把键值对都添加到集合中；如果键存在，则会把原先的值覆盖，并当作返回值返回

**Map集合的获取功能**

|              方法名               |           说明           |
| :-------------------------------: | :----------------------: |
|         `Set<K> keySet()`         |     获取所有键的集合     |
|        `V get(Object key)`        |       根据键获取值       |
| `Set<Map.Entry<K, V>> entrySet()` | 获取所有键值对对象的集合 |
|           `K getKey()`            |          获得键          |
|          `V getValue()`           |          获得值          |

#### 3.1. HashMap

- HashMap是Map里面的一个实现类。

- 没有额外需要学习的特有方法，直接使用Map里面的方法就可以了

- HashMap和HashSet的底层原理都是哈希表结构

- 依赖hashCode方法和equals方法保证键的唯一

- 如果键要存储的是自定义对象，需要重写hashCode和equals方法


**案例**：创建一个HashMap集合，键是学生对象（Student），值是籍贯（String）。存储三个键值对元素，并遍历

```java
// Student类

public class Student {
	private String name;
	private int age;
	
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + age;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Student other = (Student) obj;
		if (age != other.age)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}
```

```java
// 实现类

import java.util.HashMap;
import java.util.Set;
import java.util.Map;

public class HashDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HashMap<Student,String> hm = new HashMap<>();
		Student s1 = new Student("张三",23);
		Student s2 = new Student("李四",22);
		Student s3 = new Student("王五",22);
		hm.put(s1, "江苏");
		hm.put(s2, "西安");
		hm.put(s3, "北京");
		
		// 遍历方式一：获取所有的键，再找对应的值
		Set<Student> keys = hm.keySet();
		for(Student key : keys){
			String value = hm.get(key);
			System.out.println(key + "------" + value);
		}
		System.out.println("====================");
		
		// 遍历方式二：先获取到所有的键值对对象，再获取到里面的每一个键和值
		Set<Map.Entry<Student, String>> entries = hm.entrySet();
		for(Map.Entry<Student, String> entry: entries){
			Student key = entry.getKey();
			String value = entry.getValue();
			System.out.println(key + "------" + value);
		}
		System.out.println("====================");
		
		// 遍历方式三：
		hm.forEach(
				(Student key, String value)->{
					System.out.println(key + "-----" + value);
				}
		);
	}
}
```

#### 3.2. TreeMap

- TreeMap是Map里面的一个实现类

- 没有额外需要学习的特有方法，直接使用Map里面的方法就可以了

- TreeMap和TreeSet一样，底层都是红黑树结构的

- 依赖自然排序或者比较器排序，对键进行排序

- 如果键存储的是自定义对象，需要实现Comparable接口或者在创建TreeMap对象时侯给出比较器排序规则


练习：创建一个TreeMap集合，键是学生对象（Student），值是籍贯（String）

​			学生属性姓名和年龄，按照年龄进行排序并遍历

```java
// Student类
public class Student implements Comparable<Student>{
	private String name;
	private int age;
	
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

	@Override
	public int compareTo(Student o){
		// 按照年龄进行排序
		int result = this.getAge() - o.getAge();
		// 次要条件，按照姓名排序
		result = result == 0 ? this.getName().compareTo(o.getName()) : result;
		return result;
    }
}
```

```java
// 实现类
import java.util.TreeMap;
public class TreeMapTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		TreeMap<Student, String> tm = new TreeMap<>();
		
		Student s1 = new Student("张三",23);
		Student s2 = new Student("李四",22);
		Student s3 = new Student("王五",22);
		
		tm.put(s1, "江苏");
		tm.put(s2, "北京");
		tm.put(s3, "天津");
		
		tm.forEach(
				(Student key, String value)->{
					System.out.println(key + "----" + value);
				}
		);
    }
}
```

## 三、补充内容

### 1、可变参数

> 就是形参的个数是可以变化的

```java
// 需求：定义一个方法求N个数的和

// 在JDK5之前，会把所有的数据都先放到一个数组中，自定义方法形参只要写一个数组就可以了

public static void main(String[] args){
    int[] arr = {1, 2, 3, 4, 5};
    int sum1 = getSum(arr);
    System.out.println(sum1);
}
public static int getSum(int[] arr){
    int sum = 0;
    for(int i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}
```

- 格式：`修饰符 返回值类型 方法名(数据类型...变量名){ }`


**注意事项**

- 可变参数的底层其实就是一个数组
- 如果一个方法有多个参数，包含可变参数，那么可变参数要放在最后

```java
public static void main(String[] args){
    int sum = getSum(1, 2, 3, 4, 5, 6, 7);
    System.out.println(sum);
}
public static int getSum(int...arr){
    int sum = 0;
    for(int i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}
```

**创建不可变集合**

- 在List、Set、Map接口中，都存在of方法，可以创建一个不可变的集合
- 这个集合不能添加、删除、修改

|                   方法名                   |                说明                |
| :----------------------------------------: | :--------------------------------: |
|   `static <E> List<E> of(E...elements)`    | 创建一个具有指定元素的List集合对象 |
|    `static <E> Set<E> of(E...elements)`    | 创建一个具有指定元素的Set集合对象  |
| `static <K, V> Map<K, V> of(E...elements)` | 创建一个具有指定元素的Map集合对象  |

**应用场景**

- 集合元素的批量添加：`ArrayList<String> list = new ArrayList<>(List.of("a", "b", "c", "d"));`

### 2、Stream流

::: tip
Stream流属于jdk8内容，在新特性分类下还会有更详细的说明
:::

#### 2.1. Stream流的三类方法

- 获取Stream流

  创建一条流水线，并把数据放到流水线上准备进行操作

- 中间方法

  流水线上的操作

  一次操作完毕之后，还可以继续进行其他操作

- 终结方法

  一个Stream流只能有一个终结方法

  是流水线上的最后一个方法

#### 2.2. Stream流的获取方法

- 单列集合

  可以使用Collection接口中的默认方法stream()生成流:`集合对象.stream();`

  `default Stream<E> stream()`

- 双列集合

  间接的生成流

  可以先通过keySet或者entrySet获取一个Set集合，再获取Stream流:`集合对象.keySet().stream();` 

  `集合对象.entrySet().stream();`

- 数组

  Arrays中的静态方法stream生成流：`Arrays.stream(数组名);`

- 同种数据类型的多个数据

  1, 2, 3, 4, 5, 6...

  "aaa", "bbb", "ccc", ...

  使用`Stream.of(T...values)`生成流

#### 2.3. 中间方法

- `Stream<T> filter(Predicate predicate)`:用于对流中的数据进行过滤

  Predicate接口中的方法

  boolean test(T t)：对给定的参数进行判断，返回一个布尔值

- `Stream<T> limit(long maxSize)`：截取指定参数个数的数据

- `Stream<T> skip(long n)`：跳过指定参数个数的数据

- `static <T> Stream<T> concat(Stream a, Stream b)`：合并a和b两个流为一个流

- `Stream<T> distinct()`：去除流中重复的元素，底层依赖(hashCode和equals方法)

#### 2.4. 终结方法

- void forEach(Consumer action):对此流的每个元素执行操作

  Consumer接口中的方法：`void accept(T t)`:对给定的参数执行此操作

- long count():返回此流中的元素数

> 在Stream流中无法直接修改集合，数组等数据源中的数据

#### 2.5. 收集方法

- `R collect(Collector collector)`

工具类Collectors提供了具体的收集方式：

- `public static <T> Collector toList()`:把元素收集到List集合中
- `public static <T> Collector toSet()`：把元素收集到Set集合中
- `public static Collector toMap(Function keyMapper, Function valueMapper)`：把元素收集到Map集合中

> collect方法只能获取到流中剩余的每一个数据，在底层不能创建容器，也不能把数据添加到容器中，需要用Collectors

#### 2.6. 练习

现在有两个ArrayList集合，分别存储6名男演员和6名女演员，要求完成以下操作

- 男演员只要名字为3个字的前两人
- 女演员只要姓杨的，并且不要第一个
- 把过滤后的男演员和女演员姓名合并到一起
- 把上一步操作后的元素作为构造方法的参数创建演员对象，遍历数据

```java
package Stream;

import java.util.ArrayList;
import java.util.stream.Stream;

public class Demo{
    public static void main(String[] args){
        ArrayList<String> manList = new ArrayList<>();
        manList.add("张国立");
        manList.add("张晋");
        manList.add("刘烨");
        manList.add("郑尹健");
        manList.add("徐峥");
        manList.add("王宝强");
        ArrayList<String> womanList = new ArrayList<>();
        womanList.add("杨紫");
        womanList.add("关晓彤");
        womanList.add("张天爱");
        womanList.add("杨幂");
        womanList.add("赵丽颖");
        
        Stream<String> stream1 = manList.stream().filter(name -> name.length() == 3).limit(2);
        
        Stream<String> stream2 = womanList.stream().filter(name -> name.startsWith("杨")).skip(1);
        
        Stream.concat(stream1, stream2).forEach(name -> System.out.println(name));;
    }
}
```

## 四、源码解析

