# Typescript开发环境搭建（Windows)

## NodeJS安装

1. 从<https://nodejs.org>下载安装后安装。
1. 配置npm镜像仓库，以加速下载包的速度。
    * 执行`npm config set registry "https://registry.npm.taobao.org"`。
    * 执行`npm config list`确认配置是否已经保存。
1. 配置代理（部分Module安装时需要从其他网站下载一些东西，可能需要）
    * 执行`npm config set proxy "http://127.0.0.1:1080"`。(要求本地1080端口已经有代理软件)
    * 不需要时可以执行`npm config delete proxy`删除。
    * 临时需要时通过`--proxy "http://127.0.0.1:1080"`参数启用。

## Typescript编译器安装

1. 参考<https://www.typescriptlang.org>
1. 执行`npm install -g typescript`
1. 执行`tsc -v`确认版本号

## 第一段ts代码

1. 创建文件`helloworld.ts`  
1. 文件内容为：`console.log('Hello World!');` 
1. 编译ts代码：`tsc helloworld.ts`生成`helloworld.js`
1. 执行：`node helloworld.js`
1. 终端会输出`Hello World!`

## 第一个ts工程

1. 创建目录`mkdir ts`
1. 进入目录`cd ts`
1. 执行`tsc --init`会生成默认的`tsconfig.json`工程配置文件
1. 同样创建`helloworld.ts`
1. 执行`tsc`，就会编译出`helloworld.js`  

> <https://www.typescriptlang.org/docs/handbook/tsconfig-json.html>
