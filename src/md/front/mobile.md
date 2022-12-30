---
title: "移动端开发"
order: 5
category:
  - 前端
---

# 移动端开发


## 1. 移动端基础

### 1.1 浏览器现状

PC端常见浏览器 & 移动端常见浏览器

 <table style="margin-left: auto; margin-right: auto;">
        <tr >
            <td style="width:50%">
<h3>PC端常见浏览器</h3>
360浏览器、谷歌浏览器、火狐浏览器、QQ浏览器、百度浏览器、搜狗浏览器、IE浏览器。
            </td>
            <td style="width:50%">
<h3>移动端常见浏览器</h3>
UC浏览器，QQ浏览器，欧朋浏览器，百度手机浏览器，360安全浏览器，谷歌浏览器，搜狗手机浏览器，猎豹浏览器，以及其他杂牌浏览器。
            </td>
        </tr>
</table>

国内的UC和QQ，百度等手机浏览器都是根据Webkit修改过来的内核，国内尚无自主研发的内核，就像国内的手机操作系统都是基于Android修改开发的-样。  
**总结：兼容移动端主流浏览器，处理Webkit内核浏览器即可。**

### 1.2 手机屏幕现状

- 移动端设备屏幕尺寸非常多， 碎片化严重。
- Android设备有多种分辨率: 480x800， 480x854， 540x960， 720x1280 ， 1080x1920等， 还有传说中的2K ， 4k屏。
- 近年来iPhone的碎片化也加剧了， 其设备的主要分辨率有: 640x960， 640x1 136， 750x1334， 1242x2208等。
- 作为开发者无需关注这些分辨率，因为我们常用的尺寸单位是px。

### 1.3 移动端调试方法

- Chrome DevTools（谷歌浏览器）的模拟手机调试
- 搭建本地web服务器，手机和服务器一个局域网内，通过手机访问服务器
- 使用外网服务器，直接IP或域名访问

### 1.4 总结

- 移动端浏览器我们主要对webkit内核进行兼容
- 我们现在开发的移动端主要针对手机端开发
- 现在移动端碎片化比较严重，分辨率和屏幕尺寸大小不一
- 学会用谷歌浏览器模拟手机界面以及调试

## 2. 视口

视口（viewport）就是浏览器显示页面内容的屏幕区域。视口可以分为布局视口、视觉视口和理想视口

### 2.1 布局视口 layout viewport

- 一般移动设备的浏览器都默认设置了一个布局视口，用于解决早期的PC端页面在手机上显示的问题。
- iOS， Android基本都将这个视口分辨率设置为980px ，所以PC上的网页大多都能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

![1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/front-end/1.79jc9yhphdw0.jpg)

### 2.2 视觉视口 visual viewport

- 字面意思，它是用户正在看到的网站的区域。注意:是网站的区域。
- 我们可以通过缩放去操作视觉视口， 但不会影响布局视口，布局视口仍保持原来的宽度。

![2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/front-end/2.2ycuucitoz6.jpg)

### 2.3 理想视口 ideal viewport

- 为了使网站在移动端有最理想的浏览和阅读宽度而设定
- 理想视口个对设备来讲，是最理想的视口尺寸
- 需要手动添写 `meta` 视口标签通知浏览器操作
- meta视口标签的主要目的：**布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽**

### 2.4 meta视口标签

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">
```
|属性|解释说明|
|-|-|
|`width`|宽度设置的是 `viewport` 宽度，可以设置 `device-width` 特殊值|
|`initial-scale`|初始缩放比，大于 0 的数字|
|`maximum-scale`|最大缩放比，大于 0 的数字|
|`minimum-scale`|最小缩放比，大于 0 的数字|
|`user-scalable`|用户是否可以缩放，yes 或 no ( 1或0)|

### 2.5 总结

- 视口就是浏览器显示页面内容的屏幕区域
- 视口分为布局视口、视觉视口和理想视口
- 我们移动端布局想要的是理想视[ 就是手机屏幕有多宽，我们的布局视口就有多宽
- 想要理想视口，我们需要给我们的移动端页面添加meta视口标签

### 2.6 标准的viewport设置

- 视口宽度和设备保持一致：`width=device-width`
- 视口的默认缩放比例 1.0：`initial-scale=1.0`
- 不允许用户自行缩放：`user-scalable=no`
- 最大允许的缩放比例 1.0：`maximum-scale=1.0`
- 最小允许的缩放比例 1.0：`minimum-scale=1.0`

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">
```

## 3. 二倍图

### 3.1 物理像素&物理像素比

- 物理像素点指的是屏幕显示的最小颗粒，是物理真实存在的。这是商在出厂时就设置好了，比如苹果6\7\8是750*1334
- 我们开发时候的1px不是一定等于1个物理像素的心
- PC端页面，1个px等于1个物理像素的,但是移动端就不尽相同
- **一个px的能显示的物理像素点的个数，称为物理像素比**或屏幕像素比
- PC端和早前的手机屏幕/普通手机屏幕：1CSS像素= 1 物理像素的，物理像素比为 1。而移动端就不尽相同，例如iphone6/7/8的物理像素比为 2。
- Retina (视网膜屏幕)是一种显示技术，可以将把更多的物理像素点压缩至一块屏幕里，从而达到更高的分辨率,并提高屏幕显示的细腻程度。

### 3.2 二倍图

准备的图片比实际大小大 2 倍，这就是二倍图。

### 3.3 二倍图解决方案

- 我们需要一个 50\*50 像素（CSS像素）的图片，直接放到 iphone8 里面会放大 2 倍 100\* 100 会模糊。
- 我们采取的是 放一个 100\*100 图片然后手动的把这个图片缩小为 50\* 50（css像素）
- 我们准备的图片比我们实际需要的大小大 2 倍，这就方式就是2倍图

### 3.4 多倍图

- 对于一张50px * 50px的图片，在手机Retina屏中打开,按照刚才的物理像素比会放大倍数,这样会造成图片模糊
- 在标准的viewport设置中,使用倍图来提高图片质量,解决在高清设备中的模糊问题
- 通常使用二倍图,因为iPhone 6\7\8的影响，但是现在- 还存在3倍图4倍图的情况,这个看实际开发公司需求
- 背景图片注意缩放问题
- **实际开发中，使用PS切图可以按照需要切出2/3倍图**。

### 3.5 背景缩放 background-size

background size属性规定背景图像的尺寸

```css
background-size: 背景图片宽度 背景图片高度 | 宽度 | 百分比 | cover | contain; 
```

- 只写一个参数肯定是宽度高度省略了会 等比例缩放
- 单位可以给百分比
- cover 完全覆盖盒子，图片可能有部分显示不全
- contain 是盒子完全包含图片，图片拉伸到最大

## 4. 移动端开发选择

### 4.1 移动端主流方案

#### 4.1.1 单独制作移动端页面（主流）

> 京东商城手机版、淘宝触屏版

通常情况下，网址域名前面加m（mobile）可以打开移动端。通过判断设备，如果是移动设备打开，则 **跳到移动端页面。**


#### 4.1.2 响应式页面兼容移动端（其次）

> 三星手机官网：www.samsung.com。

通过判断屏幕宽度来改编样式，响应式兼容不同终端。  
缺点：**制作麻烦，需要花费大量精力取调兼容新问题。**

### 4.2 总结

现在市场常见的移动端开发有 **单独制作移动端页面** 和 **响应式页面** 两种方案。  
现在市场 **主流的选择还是单独制作移动端页面**。

## 5. 移动端技术解决方案

### 5.1 移动端浏览器

移动端浏览器基本以 webkit 内核为主，因此我们就考虑 webkit 兼容性问题。  
我们可以放心使用 H5 和 CSS3 样式。  
同时我们浏览器的私有前缀，只需要考虑加上 webkit 就行。

### 5.2 CSS初始化

移动端初始化推荐使用 normalize.css，优点：
- 保护了有价值的默认值
- 修复了浏览器的bug
- 是模块化的
- 拥有详细的文档

官网：https://necolas.github.io/normalize.css/

### 5.3 CSS3 盒子模型 box-sizing

- 传统盒子模型宽度计算：盒子宽度 = CSS中设置的 width + border + padding
- CSS3 传统盒子模型：盒子宽度 =  CSS中设置的 width（包含了border+padding）。也就是说，CSS3盒子模型的padding和border不会再撑大盒子了。

```css
/* CSS3盒子模型 */
box-sizing: border-box;
/* 传统盒子模型 */
box-sizing: content-box;
```

<font color=red size=4>传统 or CSS3盒子模型？</font>
- 移动端可以全部CSS3盒子模型
- PC端如果完全需要兼容，就用传统默默是；不考虑兼容性，选择CSS3盒子模型。

### 5.4 特殊样式

```css
/* CSS3盒子模型 */
box-sizing: border-box;
-webkit-box-sizing: border-box;
/* 点击高亮需要清除，设置为 transparent 完全透明 */
-webkit-tap-highlight-color: transparent;
/* 在移动端默认外观在ios上加上这个属性才能给按钮和输入框自定义样式 */
-webkit-appearance: none;
/* 禁用长按页面时弹出的菜单 */
img, a {-webkit-touch-callout: none;}
```

## 6. 移动端常见布局

### 6.1 移动端技术选型

#### 6.1.1 单独制作移动端页面（主流）

- 流式布局（百分比布局）
- flex 弹性布局（强烈推荐）
- less + rem + 媒体查询布局
- 混合布局

#### 6.1.2 响应式页面兼容移动端（其次）

- 媒体查询
- bootstrap

### 6.2 流式布局

- 流式布局，就是百分比布局，也称非固定像素布局。
- 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充
- 流式布局方式是移动web开发使用的比较常见的布局方式。
![FlowLayout1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/FlowLayout1.556mbehtar80.png)
- `max-width` 最大宽度（`max-height` 最大高度）
- `min-width` 最小宽度（`min-height` 最小高度）

#### 6.2.1 流式布局举例

```css
/* 1. 主体大盒子设置为 100% */
body {
    width: 100%;
    min-width: 320px;
    max-width: 640px;
}
/* 2. 主体的某一块区域，不设置高度和宽度 */
/* 3. 该区域内的部分按照比例分配宽度，设置浮动。 */
.seckill div:nth-child(2) ul li {
    /* 共6块区域，1/6=16.66% */
    width: 16.66%;
    display: block;
    float: left;
}
/* 4. 小区域内部放置的图片设置宽度为 100% */
.seckill div:nth-child(2) ul li img {
    width: 100%;
}
```

### 6.3 流式布局案例：京东移动端首页

- 案例模板：https://m.jd.com/
- 代码参考（本人）：https://www.aliyundrive.com/s/u8SmJQP1vjy

#### 6.3.1 二倍精灵图做法

- 在 firework 里面把精灵图等比例缩放为原来的一半（使用fireworks修改宽度和高度即可缩放）
- 之后根据大小测坐标（然后测量x、y坐标）
- 注意代码里 `background-size` 也要写：精灵图原来宽度的一半

```css
background: url(../images/jd-sprites.png) no-repeat -81px 0;
/* 原始图大小为400px左右 */
background-size: 200px auto;
```

#### 6.3.2 图片格式

##### ① DPG图片压缩技术

京东自主研发推出DPG图片压缩技术，经测试该技术，可直接节省用户近50%的浏览流量，**极大的提升了用户的网页打开速度**。能够兼容jpeg，实现全平台、全部浏览器的兼容支持，经过内部和外部上万张图片的人眼浏览测试后发现，**压缩后的图片和webp的清晰度对比没有差距**。

##### ② webp 图片格式

谷歌开发的一种旨在 **加快图片加载速度** 的图片格式。图片压缩体积大约只有JPEG的2/3，并能 **节省大量的服务器宽带资源和数据空间**。


## 1. flex 布局优势

### 1.1 传统布局与flex布局

#### 1.1.1 传统布局

- 兼容性好
- 布局繁琐
- 局限性，不能再移动端很好的布局

#### 1.1.2 flex 弹性布局

- 操作方便，布局简单，移动端应用很广泛
- PC端浏览器支持情况差
- IE11或更低版本，不支持或部分支持

#### 1.1.3 建议

1. 若是PC端布局，建议传统布局。
2. 若是移动端布局或者不考虑兼容性的PC端布局，还是使用flex弹性布局。

## 2. flex 布局原理

flex 是 flexible Box 的缩写，意为 “弹性布局”，用来为盒状模型提供最大的灵活性，**任何一个容器都可以指定为 flex 布局**。

- 为父盒子设为 `flex` 布局后，子元素的 `float`、`clear`、`vertical-align` 属性将失效。
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布 = flex 布局

采用 Flex 布局的元素，称为 **Flex容器**（flex container），简称 “容器”。它的所有子元素自动成为容器成员，称为 **Flex项目**（flex item），简称 “项目”。

- flex项目本身也可以成为容器，称为子容器。则上一级则称为父容器。
- 子容器可以横向排列也可以纵向排列。
- 原理总结：**通过给父盒子添加flex属性，来控制子盒子的位置和排列方式**。

![Flex1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/Flex1.1414v8dfngcg.png)

## 3. flex 布局父项常见属性

### 3.1 常见父项属性

以下由 6 个属性是对父元素设置的。
- `flex-direction`：设置主轴方向
- `justify-content`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素排列方式（单行）
- `flex-flow`：复合属性，相当于同时设置了 `flex-direction` 和 `flex-wrap`

### 3.2 flex-direction ⭐

`flex-direction` 设置主轴方向。

#### 3.2.1 主轴与侧轴

在 flex 布局中，分为主轴和侧轴两个方向，同时的叫法有：行和列、x轴和y轴。
- 默认主轴方向为 x 轴方向，水平向右
- 默认侧轴方向为 y 轴方向，垂直向下

![Flex2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/Flex2.5l3abdtll5c0.png)

#### 3.2.2 属性值

`flex-direction` 属性决定主轴的方向（即项目的排列方向）  
注意：主轴和侧轴是会变化的，取决于 `flex-direction` 设置谁为主轴，则另外一个即为侧轴。子元素是靠主轴来排列的。

|属性值|说明|
|-|-|
|row|默认值，从左到右|
|row-reverse|从右到左|
|column|从上到下|
|column-reverse|从下到上|

### 3.3 justify-content ⭐

`justify-content` 设置 **主轴** 上子元素排列方式。  

> [!WARNING]
> 使用此属性之前一定要确定好主轴是哪个。

|属性值|说明|
|-|-|
|flex-start|默认值，从头部开始，若主轴是x轴，则从左到右|
|flex-end|从尾部开始排列|
|center|在主轴剧中对齐（若主轴是x，则水平居中）|
|space-around|平分剩余空间|
|space-between|**先向两边贴紧，再平分剩余空间（重要）**|

### 3.4 flex-wrap ⭐

`flex-wrap` 设置子元素是否换行。  
默认情况下，项目都排在一条线（又称轴线）上，`flex-wrap` 属性定义，**flex 布局中默认是不换行的**。  
> [!TIP]
> 若父盒子一行上装不开，则会缩小子元素的宽度，从而仍然一行显示。

|属性值|说明|
|-|-|
|nowrap|默认值，不换行|
|wrap|换行|
|wrap-reverse|反向换行|

### 3.5 align-items ⭐

`align-items` 设置侧轴上的子元素排列方式（单行）。

该属性控制子项在侧轴（默认是y轴）上的排列方式，**在子项为单项的时候使用**。

|属性值|说明|
|-|-|
|flex-start|从上到下|
|flex-end|从下到上|
|center|挤在一起（垂直居中）|
|strech|拉伸（默认值）|

### 3.6 align-content 

`align-content` **设置侧轴上的子元素的排列方式（多行）**

设置子项在侧轴上的排列方式并且 **只能用于子项出现换行的情况（多行），在单行下是没有效果的**。

|属性值|说明|
|-|-|
|flex|默认值，在侧轴的头部开始排列|
|flex-end|在侧轴的尾部开始排列|
|center|在侧轴中间显示|
|space-around|子项在侧轴平分剩余空间|
|space-between|子项在侧轴先分布在两头，再平分剩余空间|
|strech|设置子项元素高度任意平分父元素高度|

### 3.7 align-content 和 align-items 区别

- `align-items` 适用于单行情况下，只有上下对齐、居中和拉伸
- `align-content` 适用于 **换行（多行）**情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸以及平分剩余空间等属性值

> [!TIP]
> 单行用 `align-items`，多行用 `align-content`。

### 3.8 flex-flow 以及小总结

`flex-flow` 属性是 `flex-direction` 和 `flex-wrap` 属性的复合属性。

```css
flex-flow: row wrap;
```

- `flex-direction`：设置主轴方向
- `justify-container`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素的排列方式（单行）
- `flex-flow` ：复合属性，相当于同时设置了 `flex-direction` 和 `flow-wrap`

## 4. flex 布局子项常见属性

### 4.1 flex 属性 ⭐

`flex` 属性定义子项目 **分配剩余空间**，用 `flex` 表示占多少份数。`flex` 的值可以是整数，可以是百分数。

```css
.item {
    flex: <number>; /*default 0*/
}
```

> [!TIP]
> 例如要平分一个盒子，则不给定子元素宽度（高度），然后给每一个子元素设置属性：`flex: 1`。

### 4.2 align-self 

`align-self` 控制子项自己在侧轴上的排列方式。

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `strech`。

|属性值|描述|
|-|-|
|`auto`|默认值，继承父盒子的 align-items 值。|
|`strech`|元素被拉伸以适应容器。|
|`center`|元素位于容器的中心|
|`flex-start`|元素位于容器的开头|
|`flex-end`|元素位于容器的结尾|

### 4.3 order

`order` 属性定义项目的排列顺序。

数值越小，排列越靠前，默认为 `0`。

> [!ATTENTION]
> 注意：和 `z-index` 不一样。

## 5. 携程网首页案例制作

### 5.1 技术选型

- 方案：单独制作移动端页面
- 技术：布局采用flex布局

### 5.2 背景线性突变

语法1：用于移动端，必须带私有前缀 `-webkit-`
```css
background: -webkit-linear-gradient(left, red, blue);
background: -webkit-linear-gradient(top left, red, blue);
```

> [!TIP]
> 携程首页代码以及图片资源: https://www.aliyundrive.com/s/jKWLJVyshCe


## 1. rem 基础

`rem`（root em）是一个单位，类似于 `em`。区别：
- `em` 是相对于父元素字体大小。 
-  `rem` 的基准是 **相对于html元素的字体大小**。  

比如，根元素（html）设置 `font-size: 12px`，非根元素设置 `width: 2rem`，则换成 `px` 就是 `24px`。  
优点：**通过修改html元素字体的大小来改变页面中元素的大小从而整体控制整个页面**。

## 2. 媒体查询

### 2.1 定义

媒体查询（Media Query）是 CSS3 的新语法。
- 使用 `@media` 查询，可以针对不同的媒体类型定义不同的样式
- `@media` **可以针对不同屏幕尺寸设置不同的样式**
- 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果手机、安卓手机、平板等设备都用到媒体查询

### 2.2 语法规范

```css
@media mediatype and|not|only (media feature) {
    CSS3-Code;
}
```
- 以 `@media` 开头
- mediatype 是媒体类型
- 关键字 `and`、`not`、`only`
- `media feature` 媒体特性，必须有小括号

#### 2.2.1 mediatype 查询类型

将不同终端设备划分成不同的类型，称为媒体类型。

|值|解释说明|
|-|-|
|`all`|用于所有设备|
|`print`|用于打印机和打印浏览|
|`screen`|用于电脑屏幕，平板电脑，智能手机等|

#### 2.2.2 关键字 and not only

关键字将媒体类型特性连接到一起作为媒体查询的条件。
- `and`：可以将多个类型或多个媒体类型连接到一起成为媒体查询的条件
- `not`：排除某个媒体类型，相当于 “非” 的意思，可以省略
- `only`：指定某个特定的媒体类型，可以省略

#### 2.2.3 媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个，注意他们要加小括号包含。

|值|解释|
|-|-|
|`width`|定义输出设备中页面可见区域的宽度|
|`min-width`| 定义输出设备中页面最小可见区域宽度|
|`max-width`|定义输出设备中页面最大可见区域宽度|

**媒体查询的价值：媒体查询可以根据不同的屏幕尺寸改变不同的样式。**

举例
```css
/* 在屏幕上并且最大的宽度是800像素设置我们想要的样式 */
@media screen and (max-width: 800px) {
    body {
        background-color: pink;
    }
}
/* 在屏幕上并且最大的宽度是500像素设置我们想要的样式 */
@media screen and (max-width: 500px){
    body {
        background-color: purple;
    }
}
```

### 2.3 媒体查询+rem实现元素动态大小变化

`rem` 单位是跟着 `html` 来走的，有了 `rem` 页面元素可以设置不同大小尺寸媒体查询可以根据不同设备宽度来修改样式。  
**媒体查询+rem** 就可以实现不同设备宽度，实现页面元素大小的动态变化。
```css
@media screen and (min-width: 320px) {
    html {
        font-size: 50px;
    }
}
@media screen and (min-width: 640px) {
    html {
        font-size: 100px;
    }
}
```

### 2.4 引入资源（理解）

当样式比较繁多的时候，我们可以针对不同的媒体使用不同 stylesheets（样式表）。原理，**就是直接在 link 中判断设备的尺寸，然后引用不同的css文件**。

#### 2.4.1 语法规范

```css
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

举例
```css
/* 当屏幕大于 640px，一行显示两个 */
/* 小于 640px 的，一行显示一个 */
<link rel="stylesheet" href="style320.css" media="screen and (min-width: 320px)">
<link rel="stylesheet" href="style640.css" media="screen and (min-width: 640px)">
```

> [!TIP]
> 引入资源就是针对于不同的屏幕尺寸，调用不同的css文件

## 3. Less 基础

### 3.1 维护 CSS 的弊端

CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。
- CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的。
- 不方便维护及扩展，不利于复用。
- CSS 没有很好的计算能力。
- 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目。

### 3.2 Less 介绍

Less（Leaner Style Sheets的缩写）是一门 CSS 扩展语言，也称为 CSS 预处理器。  

作为CSS的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。  

它在CSS的语法基础之上，**引入了变量，Mixin（混入），运算以及函数等功能，大大简化了CSS的编写，并且降低了CSS的维护成本**，就像它的名称所说的那样，Less可以让我们用更少的代码做更多的事情。  

Less中文网址: http://lesscss.cn  
常见的CSS预处理器：Sass、Less、Stylus  

实质：**Less是一门 CSS 预处理语言，它扩展了 CSS 的动态特性。**

### 3.3 Less 使用

我们首先新建一个后缀名为less的文件，在这个less文件里面书写less语句。现阶段学习：
- Less变量
- Less编译
- Less嵌套
- Less运算

### 3.4 Less 变量

变量是指没有固定的值，CSS 中一些颜色和数值经常使用。
```less
@变量名:值;
```

举例
```less
// 定义一个粉色变量
@color: pink;
@font14: 14px;
body {
    background-color: @color;
}
div {
    background-color: @color;
    font-size: @font14;
}
```

#### 3.4.1 变量命名规范

- 必须有 `@` 前缀
- 不能包含特殊字符
- 不能以数字开头（除去前缀 `@` 的部分）
- 大小写敏感

### 3.5 Less 编译

本质上，Less包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的CSS文件。  

所以，我们需要把我们的less文件，编译生成为css文件，这样我们的html页面才能使用。  

在 VS Code 中，**使用 Easy Less 插件** 可以即时编译生成 CSS 文件，再引入即可。

### 3.6 Less 嵌套

类似于html元素之间的嵌套，Less 里也可以把选择器嵌套。
```less
#header {
    .logo {
        width: 100px;
    }
}
```

等同于：
```css
#header .logo {
     width: 100px;
}
```

#### 3.6.1 Less 中伪类、交集选择器、伪元素选择器的写法

要在 less 中写伪类、交集选择器、伪元素选择器，则要在内层选择器的前面加上 `&`。
- 内层选择器前面没有 `&`，则它被解析为父选择器的后代；
- 若有 `&`，则被解析为父元素自身或父元素的伪类。

```css
a:hover {
    color: red;
}
```

Less嵌套写法：
```less
a {
    &:hover {
        color: red;
    }
}
```

### 3.7 Less 运算 ⚡

任何数字、颜色或者变量都可以参与运算，Less 提供了加（`+`）、减（`-`）、乘（`*`）、除（`/`）算数运算。

#### 3.7.1 注意

- 对于除法运算，需要用圆括号括起来
- 运算符的作用左右两侧要有空格
- 运算数若只有一个带有单位，则最后结果以此为单位
- 若有多个单位，则以第一个单位为准

## 4. rem 适配方案

### 4.1 rem 适配方案

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
2. 使用媒体查询根据不同设备按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小变化元素尺寸也会发生变化，从而达到等比缩放的适配。

### 4.2 rem 实际开发适配方案

1. 按照设计稿与设备宽度的比例，动态计算并设置html根标签的font-size大小;（媒体查询）
2. CSS中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为rem为单位的值。

### 4.3 rem 适配方案技术使用（市场主流）

#### 4.3.1 方案1

- less
- 媒体查询
- rem

#### 4.3.2 方案2（推荐）

- flexible.js
- rem

> [!TIP]
> 两种方案都存在，方案2更简单，目前不需要了解里面的代码。

### 4.4 rem 实际开发适配方案1

rem + 媒体查询 + less技术

#### 4.4.1 设计稿常见尺寸宽度

|设备|常见宽度|
|-|-|
|iphone45|640px|
|**iphone678**|**750px**|
|Android|常见320px、360px、375px、384px、400px、720px。**大部分4.7~5寸的安卓设备为720px**|

> [!TIP]
> 一般情况下，我们以一套或两套效果图适应大部分的屏幕，放弃极端屏或对其优雅降级，牺牲一些效果 **现在基本以750为准**。

#### 4.4.2 动态设置 html 标签 font-size 大小

1. 假设设计稿是750px  
2. **假设我们把整个屏幕划分为15等份（划分标准不一可以是20份也可以是10等份）**
3. 每一份作为 html 字体大小，这里就是 50px  
4. 那么在 320px 设备的时候，字体大小为 320/15 就是 21.33px
5. 用我们页面元素的大小除以不同的 html 字体大小会发现他们比例还是相同的
6. 比如我们以 750 为标准设计稿
7. 一个 100*100像素 的页面元素在750屏幕下，就是 100/50 转换为 rem 是 2rem * 2rem 比例是 1 比 1
8. 320 屏幕下，html 字体大小为 21.33 则 2rem = 42.66px，此时宽和高都是42.66但是宽和高的比例还是 1 比 1
9. 但是已经能实现不同屏幕下页面光素盒子等比例缩放的效果

##### 具体步骤

1. 首先选一套标准尺寸，例如以 750 为准
2. 用 **屏幕尺寸** 除以 **划分的份数**，得到 html 里面的文字尺寸大小。此时我们知道，不同屏幕下得到的文字大小是不一样的。
3. **页面元素的 rem 值** = **页面元素在750像素下的px值** / **html里面的文字大小**

### 4.4 rem 实际开发适配方案2

## 5. 使用适配方案1制作苏宁移动端首页

### 5.1 技术选型

- 方案：单独制作移动页面方案
- 技术：布局采用 `rem` 适配布局（less + rem + 媒体查询）
- 设计图：设计图采用 750px 设计尺寸

### 5.2 项目结构

- css
- images
- upload
- index.css

### 5.3 设置视口标签以及引入初始化样式

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-sacle=1.0">
<link rel="stylesheet" href="css/normalize.css">
```

### 5.4 设置公共common.less文件

1. 新建common.less设置好最常见的屏幕尺寸，利用媒体查询设置不同的html字体大小
，因为除了首页其他页面也需要
2. 我们关心的尺寸有320px、360px、375px、384px、400px、414p、424px、480px、540px、720px、750px
3. 划分的份数我们定为15等份
4. 因为我们pc端也可以打开我们苏宁移动端首页，我们默认html字体大小为50px，**注意这句话写到最上面**

```less
// 设置常见屏幕尺寸修改  html 文字大小
// PC屏幕下：
html {
    font-size: 50px;
}
// 划分份数：15
// 适配屏幕：320px、360px、375px、384px、400px、414p、424px、480px、540px、720px、750px
@num: 15;
// 320
@media screen and (min-width: 320px) {
    html {
        font-size: (320px / @num);
    }
}
// 360
@media screen and (min-width: 360px) {
    html {
        font-size: (360px / @num);
    }
}
```

### 5.5 新建 index.less 文件

1. 新建 index.less，写首页样式
2. 将刚才设置好的 common.less 引入到 index.less 里面，语法如下：
  ```less
  // 在 index.less 中导入 common.less
  @import "common";
  ```

## 6. rem 适配方案2

### 6.1 简洁高效的 rem 适配方案 flexible.js

>[!TIP]
>技术方案1（less+媒体查询+rem）效果很好，但是过于繁琐。因此介绍第二种 rem 方案。

手机淘宝团队出的简洁高效移动端适配库。  
我们再也 **不需要在写不同屏幕的媒体查询**，因为里面js做了处理。  
它的原理是把 **当前设备划分为10等份**，但是不同设备下，比例还是一致的。  
我们要做的，**就是确定好我们当前设备的html文字大小就可以了**。  
比如当前设计稿是750px，那么我们只需要把html文字大小设置为75px(750px/10)就可以里面页面元素rem值：页面元素的px值/ 75。
剩余的，**让flexible.js来去算**。

flexible.js 项目地址：https://github.com/amfe/lib-flexible

### 6.2 使用适配方案2制作苏宁移动端首页

- 方案：我们采取单独制作移动页面方案
- 技术：布局采取rem适配布局2（flexible.js + rem）
- 设计图：本设计图采用 750px 设计尺寸

#### 6.2.1 前期准备

引入 normalize.css 和 flexible.js，将相关文件和文件夹创建好。

#### 6.2.2 vscode cssrem 插件

自动将 `px` 单位转换成 `rem` 的插件。**需要手动设置cssroot字体大小为75**

#### 6.2.3 注意

flexible.js 按照屏幕尺寸修改 html 的 `font-size` 大小，当处于PC端口时，宽度会过大。需要额外设置一个媒体查询：

```css
/* search-content */
/* 若设备屏幕超过 750px，则按照 750设计稿布局 */
@media screen  and (min-width: 750px) {
    html {
        font-size: 75px !important;
    }
}
```


## 1. 响应式开发

### 1.1 响应式开发原理

就是使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。

|设备划分|尺寸区间|
|-|-|
|超小屏幕（手机）|`w < 768px`|
|小屏设备（平板）|`768px <= w < 992px`|
|中等屏幕（桌面显示器）|`992px <= w < 1200px`|
|宽屏设备（大桌面显示器）|`w >= 1200px`|

### 1.2 响应式布局容器

响应式 **需要一个父级作为布局容器，来配合子级元素来实现变化效果。**  

原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化。

平时我们的响应式尺寸划分（但是我们也可以根据实际情况自己定义划分）：
- 超小屏幕（手机，小于768px）：设置宽度为 `100%`
- 小屏幕（平板，大于等于768px）：设置宽度为 `750px`
- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为 `970px`
- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为 `1170px`

代码实现：  
HTML部分：
```html
<!-- 布局容器 -->
<div class="container"></div>
```
CSS部分：
```css
.container {
    height: 150px;
    margin: 0 auto;
    background-color: pink;
}
/* 超小屏幕 小于 768 布局容器宽度为 100% */
@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
}
/* 小屏幕 大于等于 768，布局容器 750px */
@media screen and (min-width: 768px) {
    .container {
        width: 750px;
    }
}
/* 中等屏幕 */
@media screen and (min-width: 992px) {
    .container {
        min-width: 970px;
    }
}
/* // 大屏幕 */
@media screen and (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

### 1.3 案例：响应式导航

- 当我们屏幕大于等于 800 像素，我们给 `nav` 宽度为 800px，因为里面子盒子需要浮动，所以 `nav` 需要清除浮动。
- `nav` 里面包含 8 个小 `li` 盒子，每个盒子的宽度定为 100px，高度为30px，浮动一行显示。
- 当我们屏幕缩放，宽度小于 800 像素的时候，`nav` 盒子宽度修改为 100% 宽度。
- `nav` 里面的8个小 `li`，宽度修改为 33.33%，这样一行就只能显示 3 个小 `li` ，剩余下行显示。

代码：
HTML部分:
```html
<div class="container">
    <ul>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
    </ul>
</div>
```

CSS部分：
```css
* {
    padding: 0;
    margin: 0;
}

ul {
    list-style: none;
}

.container {
    width: 750px;
    margin: 0 auto;
}

.container ul li {
    width: 93.75px;
    height: 30px;
    background-color: green;
    float: left;
}

@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
    .container ul li {
        width: 33.33%;
    }
}
```

## 2. Bootstrap 前端开发框架

### 2.1 Bootstrap 简介

Bootstrap 来自 Twitter（推特），是目前最受欢迎的前端框架。Bootstrap 是基于HTML、CSS 和JAVASCRIPT 的，它简洁灵活，使得Web 开发更加快捷。
- 中文官网：http://www.bootcss.com/
- 官网：http://getbootstrap.com/

框架：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。使用者要按照框架所规定的某种规范进行开发。  

Bootstrap 优点：
- 标准化的 html+css 编码规范
- 提供了一套简洁、直观、强悍的组件
- 有自己的生态圈，不断的更新迭代
- 让开发更简单，提高了开发的效率

### 2.2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。
控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。
Bootstrap 使用四步曲：
- 创建文件夹结构
- 创建 html 骨架结构
- 引入相关样式文件
- 书写内容

1. 创建文件夹结构
    ```
    bootstrap
      -css
      -fonts
      -js
    css
    images
    index.html
    ```
2. HTML 骨架结构
    ```html
    <!--要求当前网页使用IE浏览器最高版本的内核来渲染-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放-->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <!--[if lt IE 9]>
    <!-- 解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题 -->
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <!--解决ie9以下浏览器对css3 Media Query 的不识别-->
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    ```
3. 引入相关样式文件
    ```html
    <!-- Bootstrap 核心样式-->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    ```
4. 书写内容
    - 直接拿 Bootstrap 预先定义好的样式来使用
    - 修改 Bootstrap 原来的样式，注意权重问题
    - 学好 Bootstrap 的关键在于知道它定义了哪些样式，以及这些样式能实现什么样的效果

### 2.3 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 `.container` 容器，它提供了两个作此用处的类。

1. `container` 类
    - 响应式布局的容器固定宽度
    - 大屏( >=1200px) 宽度定为1170px
    - 中屏( >=992px) 宽度定为970px
    - 小屏( >=768px) 宽度定为750px
    - 超小屏(100%)
2. `container-fluid` 类
    - 流式布局容器百分百宽度
    - 占据全部视口（viewport）的容器。


## 3. Bootstrap 栅格系统

### 3.1 栅格系统简介

栅格系统英文为 “grid systems”，也有人翻译为 “网格系统”，它是指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局。  

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

### 3.2 栅格选型参数

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。
![bootstrap1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/JavaScript/bootstrap1.1m7bvtbk5nb4.png)
- 按照不同屏幕划分为 1~12 等份
- 行（row）可以去除父容器作用15px的边距
- xs-extra small：超小；sm-small：小；md-medium：中等；lg-large：大；
- 列（column）大于12，多余的 “列（column）”所在的元素将被作为一个整体另起一行排列
- 每一列默认有左右15像素的 `padding`
- 可以同时为一列指定多个设备的类名，以便划分不同份数例如 `class="col-md-4 col-sm-6"`

例如，`col-lg-3 col-md-4 col-sm-6 col-xm-12` 表示随着屏幕尺寸的缩小，每一行能放的盒子变为 4、3、2、1。
```html
<!-- 有12个，则可以占满一行 -->
<div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">1</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">2</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">3</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">4</div>
</div>
<!-- 有12个，则可以占满一行，不同份数表示了所占比例 -->
<div class="row">
    <div class="col-lg-1">1</div>
    <div class="col-lg-2">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-6">4</div>
</div>
<!-- 不足12个，则空出多余 -->
<div class="row">
    <div class="col-lg-3">1</div>
    <div class="col-lg-3">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-2">4</div>
</div>
<!-- 超出12个，则放到下一行 -->
<div class="row">
    <div class="col-lg-3">1</div>
    <div class="col-lg-3">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-4">4</div>
</div>
```

以上代码布局效果如下：
![bootstrap2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/JavaScript/bootstrap2.4p4qg771eju0.png)

### 3.3 列嵌套

栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-6">第一小列</div>
                <div class="col-md-6">第二小列</div>
            </div>
        </div>
        <div class="col-md-4">第二列</div>
        <div class="col-md-4">第三列</div>
    </div>
</div>
```

布局效果如下：
![bootstrap3](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap3.6h721zqvizg0.png)

### 3.4 列偏移

使用 `.col-md-offset-*` 类可以将列向右侧偏移。这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（margin）。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">1</div>
        <div class="col-md-4 col-md-offset-4">2</div>
    </div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">0</div>
    </div>
</div>
```

布局效果如下：
![bootstrap4](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap4.6be7qk9e7a00.png)

### 3.5 列排序

通过使用 `.col-md-push-*` 和 `.col-md-pull-*` 类就可以很容易的改变列（`column`）的顺序。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">左侧盒子</div>
        <div class="col-md-8">右侧盒子</div>
    </div>
    <div class="row">
        <div class="col-md-4 col-md-push-8">左侧盒子</div>
        <div class="col-md-8 col-md-pull-4">右侧盒子</div>
    </div>
</div>
```

布局效果如下：
![bootstrap5](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap5.5cko3xntd2c0.png)

### 3.6 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示
或隐藏页面内容。除了有 `.hidden-xm` 等响应式隐藏工具类外，还有 `.visible-xm` 等响应式显示工具类，当屏幕处于超小屏幕（手机）时显示。

![bootstrap6](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap6.shwuo5yaj4w.png)

## 4. 阿里百秀首页案例

- 技术选型：HTML5/CSS3/Bootstrap3
- 项目地址：https://github.com/Hacker-C/Alibaixiu
- 域名访问：https://alibaixiu.vercel.app