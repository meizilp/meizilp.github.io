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

1. 字符串路由路径  
  '/' 根路径  
  '/about' 目录 /about
1. 字符串模式路由路径  
  传入时注意有引号。  
  '/ab?cd' 包含0个或者1个b。匹配/acd或者/abcd。  
  '/ab+cd' 包含至少1个b。匹配/abcd或/abbcd类似的。  
  '/ab*cd' ab和cd之间内容无所谓。  
  '/ab(cd)?e' 包含0个或者1个cd。匹配/abe或者/abcde。  
1. 正则表达式路由路径  
  传入时没有引号，直接以'/'开头(JS中的正则表达式直接量定义方法)。  
  参考：<http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp>  
  /abc/ 所有路径中包含abc的。比如/nnabcnn  
  /abc/i 所有路径中包含abc的，忽略大小写。比如/nnabCnn  
  /.*fly$/ 以fly结尾的
1. 路由参数  
  参考：<https://www.npmjs.com/package/path-to-regexp>  
  这个库会把express风格的路径转为正则表达式和参数数组，在express中不支持这个库中的通配符。  
  参数名称前增加冒号，类似于`:foo`，那么就定义了一个命名参数。这个参数放到路径中，以`/`分割。  
  命名参数的名字只能由字母、数字和下划线组成。  
  `/:foo/:bar` 这个路径定义了两个参数。如果实际路径是`/foo/plane`，那就会和`/foo`这个路径匹配，并且`bar`的值是`plane`。  
  命名参数的值可以通过`req.params.参数名`类似的形式获得到，比如上面的例子`req.params.bar`的值就是`plane`。  
  `/:foo?` 表示foo是可选参数，如果没传递值就是`undefined`。
  `/icon-:res(\\d+).png` 找到`:`后面`res`就是参数名称；`d+`限定只有数字类型的才符合这个路由。比如`/icon-77.png`符合，但是`/icon-aa.png`不符合。  

### 路由响应函数

`function (req,res) {}` 或  
`function (req,res,next) {next()}` 形式。  
 第2种形式中`next`和`req`、`res`一样都是调用者传递过来的实参。

## 路由处理

### 路由对象

在Express中App实际上是对一个Router路由对象进行了封装。  
Router对象包含一个Stack数组，里面每个元素都是一个Layer对象(A类)；  
Layer(A类)有一个route属性，可以为undefined，也可以指向一个route对象；  
router对象也包含一个stack数组，里面的每个元素也是一个Layer对象(B类)。但B类Layer对象没有route属性，多了method属性来保存http请求类型。

### 路由方法

Express支持对应HTTP METHOD的路由方法，比如`app.get()`等。  
通过路由方法把路由响应函数和路由路径、HTTP方法关联起来。  
路由方法每次可以关联一个或者多个响应函数。  
每一个路由方法都会在Router对象的Stack数组中增加一个Layer对象（A类），即使同时关联了多个响应函数也是只增加一个A类Layer对象。  
通过路由方法增加的Layer对象（A类）都有一个route属性，route属性中的stack数组根据关联的响应函数数量包含有一个或多个Layer对象(B类)。  
`app.all()`会把所有的HTTP METHOD都关联上，此时会在Router的Stack数组中增加一个Layer对象（A类），这个Layer对象(A类)中的route属性中的stack数组中又包含数十个Layer对象（B类）。  
同一个路由路径有多种方法设置多个响应函数：  
  1. 多次调用路由方法。采用这种方式时，每调用一次路由方法都会在Router对象的Stack数组中增加一个Layer对象(A类)，最终增加多个。每个A类Layer对象中包含route属性，route属性中的stack数组包含一个B类Layer对象。
  1. 把多个函数或者把元素都是函数的数组作为参数来调用路由方法。采用这种方式时，只会在Router对象的Stack数组中增加一个Layer对象(A类)，这个A类Layer对象也包含route属性，route属性中的stack数组包含多个B类Layer对象。
  1. 采用`app.route()`函数，把多个方法串起来。采用这种方式时效果等同于第二种。

### 模块化路由

通过`express.Router()`可以得到一个router对象，这个router对象也可以通过路由方法关联响应函数；在router对象中路由路径都是相对于此router被挂载时的路径；此router导出后可以通过`app.use()`来进行挂载。

### 中间件

`function (req, res, next) {next()}` 形式。

### 使用中间件

通过`app.use()`将中间件和路径关联。

### app.use和app.all的不同

1. 路径匹配规则不一样：`app.use()`路径只匹配前缀；`app.all()`需要完全匹配。比如：app.use("/product",mymiddleware) 只要product开头 /product、/product/a 、/product/a/b都能匹配。
app.all( "/product" , handler) 那么就只能匹配/product了，不能匹配/product/a之类的；
app.all( "/product/*" , handler); 能匹配/product/a、/product/a/b，但是不能匹配/product。
1. 创建Layer对象的数量规则不一样：`app.all()`无论使用多少个函数作为参数，只创建一个A类Layer对象；`app.use()`如果有多个函数作为参数，那么会创建多个A类Layer对象。

### 路由处理过程

1. 客户端访问路径，A类Layer对象被遍历。
1. 如果A类Layer对象的路径匹配，那么调用响应函数。  
1. 响应函数中可以通过`req.body`获取`post`过来的参数，通过`req.query`获取通过url传递参数,通过`req.params`获取通过路由参数传递过来的参数。
1. 在`res.send`或者`res.end`后客户端得到数据，否则客户端会一直等待。在res没有send或者end时，如果路由处理函数没有堵塞（比如在等待异步IO操作），则不会影响node为新的请求提供服务（chrome浏览器有额外的现象，同一个路径如果前一个没返回，chrome不会发出新请求，看上去就好像所有请求都被堵塞了一样，实际上如果换个路由路径，则可以看到新的请求马上被响应。edge浏览器没有发现这种行为。）
1. 同一个路由路径如果有多个响应函数，那么前一个响应函数要调用`next()`，后一个响应函数才会被执行，并且执行后仍然会返回到上一个响应函数中继续执行。
1. `next('route')`告知当前A类Layer已经处理完毕，即使有尚未遍历的B类Layer也不用管了，继续下一个A类Layer来处理。因为`app.use()`挂载时每个函数都会创建一个A类Layer，并且此A类Layer没有B类Layer，所以对于`app.use()`挂载的响应函数中的`next('route')`等同于`next()`，都是继续下一个A类Layer处理；而通过`app.get()`类似的方法挂载的响应函数，因为A类Layer中可能包含多个B类Layer，此时`next('route')`的效果就和`next()`不一样了，此时`next()`是调用下一个B类Layer，如果所有的B类Layer都调用完成了，就是此A类Layer处理完毕，而`next('route')`在这个时候就是不再调用剩下的B类Layer，直接标记此A类Layer处理完毕。
1. next('其它字符串') 会转到错误处理

## 静态文件

通过`express.static`中间件来完成静态文件的访问。  
`app.use(express.static('public'))`，那么`public`目录下的文件都可以通过url访问了，比如`http://localhost:3000/hello.html`（注意url中不包含存放静态文件的目录名）。  
如果有多个静态文件目录，那么可以多次调用`express.static`中间件函数，Express会按照设置时的顺序依次在目录中查找文件。  
虚拟url路径：通过`app.use('/static', express.static('public'))`形式可以创建虚拟路径前缀，这时url中需要改成`http://localhost:3000/static/hello.html`类似的形式。从路由匹配上也可以理解，`static`路由被`express.static`中间件处理。  
绝对资源路径：`app.use(express.static(__dirname+'/public'))`，node启动进程时所在的目录(可能和程序不在一个目录)会影响相对路径，所以使用绝对资源路径(通过`__dirname`组合路径)定位资源更安全。

## 错误处理

比如访问google超时的错误如何捕获？
