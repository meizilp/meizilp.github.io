# 使用Typescript开发Node程序

## 项目创建

创建项目目录后，执行`tsc --init`，会生成`tsconfig.json`配置文件。  
考虑后面调试需要`sourceMap`信息，所以修改配置文件，打开`sourceMap:true`选项。

## 安装头文件

1. 执行`npm --init`初始化npm包信息
1. 执行`npm install @types/node --save-dev`安装node头文件，并保存开发时依赖信息到npm包信息中

## 创建代码文件

在项目根目录下创建`main.ts`：

```ts
import * as os from "os"                //从node库引入os模块
import * as http from "http"            //从node库引入http模块

console.log(os.platform())              //输出当前的运行平台

let server = http.createServer((req, res) => {              //创建一个httpserver
    res.writeHead(200, { 'Content-Type': 'text/html' })     //收到请求后回调处理函数，写入响应
    res.write('<h1>Hello world!</h1>')
    res.end()
})

let port = 3000
server.listen(port)     //在3000端口监听

console.log(`Server is running at port:${port}`)    //输出运行信息
```

## 编译

1. 通过组合按键`ctrl + \``来激活VsCode的终端窗口
1. 执行`tsc`默认就会编译当前目录的工程
1. 生成的代码文件
  ```js
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var os = require("os");         //编译成了node的模块导入方式
    var http = require("http");
    console.log(os.platform());
    var server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Hello world!</h1>');
        res.end();
    });
    var port = 3000;
    server.listen(port);
    console.log("Server is running at port:" + port);
    //# sourceMappingURL=main.js.map            //关联上map文件
  ```

## 运行

执行`node main.js`，可以看到终端输出。此时打开浏览器，输入`localhost:3000`就可以看到页面。  
可以观察到虽然代码已经执行完毕，但并不代表程序一定就完成了，这儿就是http库还在后台持续运行。  
PS:此处只使用的node库，所以不需要用`npm`再安装其他的库，这和使用其他的第三方库还是有些差异。

## 断点调试

1. 切换到VsCode的调试视图，默认是没有配置文件的，需要创建。
1. 创建断点后，点击运行就可以了。
