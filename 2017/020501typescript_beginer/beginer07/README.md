# Express 基础

## Node的事件循环

NodeJS本身只有一个事件主循环，所有的事件都是依次执行，如果前面的事件堵塞那么后面的事件不会得到处理。  

1. 能否通过`setTimeout`启动定时器解决堵塞的问题？  
   不能。  
   定时器只是把回调函数加入到了事件队列中，等时间到了后触发，此时同步执行的代码仍然会堵塞后续事件的处理。  
   有时候看上去象是解决了，实际上是因为定时器事件还在排队中，没有堵塞队列，所以后续事件不受影响；也可能是定时器事件
   回调函数执行时间短，没有造成阻塞。
1. 同步代码堵塞是否会影响已经启动的`setInterval`定时器？  
   会的。  
   因为已经启动的定时器也是排在事件队列中的，当事件处理堵塞时仍然会影响。
1. 能否通过`async`来使函数变为异步函数解决堵塞的问题？  
   不能。  
   异步函数中的同步代码仍然是同步执行的，该阻塞的还是会阻塞。
1. 如果一个路径处理堵住了，后续所有路由都会堵住吗？  
   是的。  
   即使是不同的路径，也会堵住，因为新的响应事件无法被处理。
1. 访问网址会堵塞吗？  
   用node内置的http访问验证是不会的。  
   即使在没有获取到内容之前，其它的请求仍然能够处理。  
   这是因为node对于IO处理是异步的。
1. 怎么解决堵塞的问题？  
   一是事件处理函数中减少CPU时间占用。  
   二可以通过`pm2`类似的工具开多个node进程做负载均衡。  
   三是可以通过node中的线程扩展模块，开线程运行同步代码。

## Hello express

1. 安装Express: `npm install express --save`
1. 安装Express头文件： `npm install @types/express --save-dev`
1. 代码实现及运行，然后通过`http://localhost:3000`访问

```ts
import * as express from "express"  //导入express库

let app = express()     //创建express实例

app.get('/', function (req, res) {    //设置处理根目录get请求的回调函数
  res.send('Hello Express!')
})

app.listen(3000, function () {  //启动服务在3000端口listen
  console.log('Example app listening on port 3000!')
})
```

## 路由

### 路由路径

#### 字符串路由路径

/ 根路径
/about 目录 /about

#### 字符串模式路由路径

传入时注意有引号。  
'/ab?cd' 包含0个或者1个b。匹配/acd或者/abcd。  
'/ab+cd' 包含至少1个b。匹配/abcd或/abbcd类似的。  
'/ab*cd' ab和cd之间内容无所谓。  
'/ab(cd)?e' 包含0个或者1个cd。匹配/abe或者/abcde。  

#### 正则表达式路由路径

传入时没有引号，直接以'/'开头(JS中的正则表达式直接量定义方法)。  
参考：<http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp>  

/abc/ 所有路径中包含abc的。比如/nnabcnn
/abc/i 所有路径中包含abc的，忽略大小写。比如/nnabCnn
/.*fly$/ 以fly结尾的

### 路由参数

参考：<https://www.npmjs.com/package/path-to-regexp>  

### 路由对象

### 路由处理

一个路由可以有多个路由处理函数；  
前一个路由函数中调用了`next()`，则后一个路由函数才会被调用。

### 路由处理过程

客户端访问路径，路由函数依次被调用.  
在res.send或者res.end后客户端得到数据，否则客户端会一直等待。  
在res没有send或者end时，如果路由处理函数没有堵塞（比如在等待异步IO操作就不会堵塞），
则不会影响node为新的请求提供服务（chrome浏览器有额外的现象，同一个路径如果前一个没返回，
chrome不会发出新请求，看上去就好像所有请求都被堵塞了一样，实际上如果换个路由路径，则可以
看到新的请求马上被响应。edge浏览器没有发现这种行为。）

## 静态文件

## 错误处理

比如访问google超时的错误如何捕获？
