# 基于Github的博客方案

## 特点

* 托管在Github上，省心
* 使用Git做版本管理，可控
* 页面简洁，舒服
* 使用Markdown写作，高效

## 基本需求

* 懂得基本Git操作
* 会用Markdown写作
* 懂得NodeJs基础操作
* 有Github账号

## 方案介绍

### 目录结构

```sh
index.html              #通过域名访问时的首页，由README.md生成
README.md               #首页内容，通过repo页面访问时自动显示
2017                    #文章归档目录，以年份组织
  ├─020400about         #包含一篇文章所有资源的目录。
  │      index.html     #通过域名访问时的文章入口，由文章的README.md生成
  │      README.md      #通过repo页面访问时文章的内容
```

### 访问入口

1. 通过Github的repo浏览页面访问  
    示例：[https://github.com/meizilp/meizilp.github.io](https://github.com/meizilp/meizilp.github.io)  
    此时README.md中的内容会被自动呈现出来。
1. 通过username.github.io访问  
    示例：[https://meizilp.github.io](https://meizilp.github.io)  
    此时index.html中的内容会被呈现出来。

### 写文章

1. 按照目录命名规则(目录名为 <月份><日期><序号><文章标题>)创建目录。
1. 创建README.md文件，并编写内容。(可以参见[《基于VsCode打造Markdown编辑器》](../020402markdown_editor_vscode) )

### 发布文章

1. 将文章的markdown文件转换为html。
    可以通过showdown转换。  
    ```sh
    npm install -g showdown  
    showdown makehtml -i README.md -o index.html
    ```
1. 根目录的README.md增加文章链接，并重新生成html。
1. 将新创建的文件加入repo，commit之后push到github。

### TODO

* 编写node脚本自动执行生成及发布的操作