<template><div><h1 id="java基础" tabindex="-1"><a class="header-anchor" href="#java基础" aria-hidden="true">#</a> Java基础</h1>
<h2 id="java基础语法" tabindex="-1"><a class="header-anchor" href="#java基础语法" aria-hidden="true">#</a> Java基础语法</h2>
<h3 id="前期准备" tabindex="-1"><a class="header-anchor" href="#前期准备" aria-hidden="true">#</a> 前期准备</h3>
<ol>
<li>
<p><strong>环境搭建</strong>(<a href="https://www.java.com/zh-CN/" target="_blank" rel="noopener noreferrer">https://www.java.com/zh-CN/<ExternalLinkIcon/></a>)</p>
<ul>
<li>
<p>了解JRE和JDK</p>
</li>
<li>
<p>JDK的下载和安装</p>
</li>
</ul>
</li>
<li>
<p><strong>常用DOS命令</strong></p>
<figure><img src="https://s2.loli.net/2022/06/06/wBTuCAIjm6YWxhL.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p><strong>第一个Java程序</strong></p>
<figure><img src="https://s2.loli.net/2022/06/06/3JXPZ2ftglLI5es.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello</span><span class="token punctuation">{</span>									<span class="token comment">//定义一个名为Hello的类（</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>			<span class="token comment">//main入口</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>			<span class="token comment">//打印输出Hello World</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<ol>
<li><strong>常量</strong>：在程序的执行过程中，其值不会发生改变的量（数据）。</li>
</ol>
<figure><img src="https://s2.loli.net/2022/06/06/kQilfqzOVZdct8m.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li><strong>变量</strong>：就是内存中的<mark>存储空间</mark>，空间中存储着经常发生改变的值。</li>
</ol>
<figure><img src="https://s2.loli.net/2022/06/06/Ny4uzcPJ3Zax1Se.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li><strong>基本数据类型</strong></li>
</ol>
<figure><img src="https://s2.loli.net/2022/06/06/Ja9UA3IutwWO7br.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="4">
<li><strong>引用数据类型</strong></li>
</ol>
<h3 id="键盘录入" tabindex="-1"><a class="header-anchor" href="#键盘录入" aria-hidden="true">#</a> 键盘录入</h3>
<ol>
<li>
<p><strong>目的</strong>：为了让数据更加灵活</p>
</li>
<li>
<p><strong>步骤</strong></p>
<ul>
<li>导包：<code v-pre>import java.util.Scanner;</code>		(需要写在class上面)</li>
<li>创建对象：<code v-pre>Scanner sc = new Scanner(System.in);</code>        (只有sc可以改变，其他属于固定格式)</li>
<li>使用变量接收数据:<code v-pre>int i = sc.nextInt();</code>			(只有i和sc变量可以改变，其他属于固定格式)</li>
</ul>
</li>
<li>
<p><strong>实例</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>	<span class="token comment">//导包</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> input<span class="token punctuation">{</span>		<span class="token comment">//创建input类</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>		<span class="token comment">//主入口</span>
        <span class="token class-name">Scanner</span> scan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//创建对象</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> scan<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">//使用变量接收数据</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">//打印输出数据</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="标识符" tabindex="-1"><a class="header-anchor" href="#标识符" aria-hidden="true">#</a> 标识符</h3>
<ol>
<li>
<p><strong>标识符</strong>：就是给类、方法、变量等起名字的符号</p>
</li>
<li>
<p><strong>定义规则</strong></p>
<ul>
<li>由<mark>数字</mark>、<mark>字母</mark>、<mark>下划线</mark>(_)和<mark>美元符</mark>($)组成。</li>
<li>不能以数字开头</li>
<li>不能是关键字</li>
<li>严格区分大小写</li>
</ul>
</li>
</ol>
</div></template>


