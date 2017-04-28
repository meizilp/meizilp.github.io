# 声明文件

库的头文件，以`.d.ts`结尾，为编译器提供库的类型信息。

## 使用第三方库

* 安装头文件  
  比如要使用node库，那么执行`npm install @types/node --save-dev`就会将对应的头文件安装到`node_modules/@types/`目录下。
* 使用头文件中的声明(头文件位于@types目录)
  ```ts
  import * as os from "os"      //象引入本地模块一样，通过模块名引入模块
  console.log(os.totalmem())
  console.log(process.cwd())    //象使用本地全局变量一样，直接使用全局变量名
  ```
  此外当运行时，要确保第三方库真正的运行代码能加载，否则虽然能通过编译，但是运行时还是会出错。加载的方式有两种：  
  1. 当通过node运行时，通过`npm install`安装到`node_modules`目录后就可以被node搜索到并加载。
  但此种情况下第三方库中的全局变量是无法使用的，如果使用了，那么运行时会提示引用错误(node库例外，因为node运行环境中有这些全局变量)。
  1. 当通过网页运行时，那么在网页中先增加第三方库的链接，此种情况下第三方的全局变量先建立，可以被外部使用。

  PS:关于`export =`  
  * 很多第三方库采用了`export =`的形式导出变量，现在也支持用`import * as SSS from "module"`的形式引入了。
  * 每个模块只能有一个`export =`，不过一个文件中可以有多个模块。
  * 如果文件的根层级采用了`export =`，那么这个文件中就不能再出现其他module了。
  * 如果一个module中出现了`export =`，那么这个module中的全局变量就在外部看不到了。

## 搜索第三方库

如果不是太确定库的头文件准确名称，可以在<https://www.npmjs.com>输入 `@types 模糊名称` 来搜索确认。  

## 编写一个库

### 存放目录

* `node_modules/@types`目录：
  此目录约定只存放头文件，放在此目录中时，库的目录名以及头文件名是什么无关紧要，使用时直接引入模块就可以使用。只会对编译期间有影响。
* `node_modules`目录(建议位置)：
  整个项目文件都可以放在此目录，也可以只放实现代码。  
  如果头文件位于此目录，那么使用时在代码文件头部应增加`/// <reference types="模块目录名">`，然后就可以直接引入模块使用了。  
  对于编译器来说，如果使用时代码头部增加了三斜杠引用指令，目录名称是什么无关紧要；如果没使用三斜杠引用指令，那么目录名至少要和文件中的某一个模块同名，这样编译器才能推断出到哪个目录查找这个模块。  
  但是当运行时，node是把模块名当作目录名来查找模块代码的，所以模块名和目录名还是要一致。
* 其他位置(比如项目根目录)：
  此时使用模块的地方必须通过`/// <reference path="模块头文件路径">`指明准确的头文件加载路径。和上面不同的一是属性名称变为了`path`，
  二是从目录名变为了头文件路径。并且如果是为node编写，那么import时也不能只提供模块名，还要加上路径，这样node才能找到，
  但是这么写ts编译器又报错，所以还是不要放到其他位置。

### 创建自定义库

1. 在项目根目录创建库目录，名称随意(建议和库名称一致)，因为后面引用时会增加引用指令。
  ```sh
  mkdir mylib0427
  npm init    #输入库的名称mylib，其余的默认值
  ```
1. 修改package.json文件(如果头文件名称为index.d.ts并且在库的根目录，此步可以省略)
  ```json
  {
    "main": "index.js",
    "types": "index.d.ts",    //有了这个才能知道从哪个文件获取类型信息
  }
  ```
1. 创建实现代码，并进行编译
  ```ts
  export function sayHiWithExport() { //输出的函数
    console.log("Hi.Hi.")
  }

  function sayHi() {  //不输出的函数
    console.log("Hi,internal.")
  }

  export let a = 3  //在模块中输出的变量

  export function changeA(v) {  //修改模块变量的值
    a = v
  }

  export var papa = 8 //输出的全局变量，在node运行时是访问不到的，在页面中才能访问
  ```
  编译后的代码：(模块默认编译为了commonjs，因为node还不支持原生的export)
  ```js
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function sayHiWithExport() {
      console.log("Hi.Hi.");
  }
  exports.sayHiWithExport = sayHiWithExport;    //通过commonjs的机制，在默认的exports对象上增加
  function sayHi() {      //只定义，没输出的函数
      console.log("Hi,internal.");
  }
  exports.a = 3;  //变量输出
  function changeA(v) {
      exports.a = v;
  }
  exports.changeA = changeA;  //函数输出
  exports.papa = 8; //变量输出
  ```
1. 创建头文件。按照package.json中配置的文件名创建
  ```ts
  declare module "mylib0427" { //模块名称和目录名称要一致，因为node运行时要通过这个名称查找代码
    export let a: number;   //通过模块输出变量，只能读(编译器检测)
    export function sayHiWithExport(): void;  //输出函数
    export function changeA(v: any): void;  //修改模块输出的变量
  }

  declare module "haha" { //第二个模块，node会找不到这个模块。。。声明了也跟没声明一样
      export let b: number;
  }

  declare var papa: number  //全局变量
  ```
  PS:如果头文件中没有`declare module`这种形式，比如用`tsc -d`自动生成的头文件，此时要至少有一个export才能使这个文件作为module处理。

### 使用自定义库

```ts
/// <reference types="mylib0427" />   //因为放在node_modules中，并且目录名和模块名称一直，可以省略

import * as w from "mylib0427"    //引入模块

console.log(process.cwd())  //node的模块process可以直接使用

console.log(w.a)    //模块中的变量
w.changeA(100)    //模块中的函数
console.log(w.a)

w.papa = 200        //通过模块访问全局变量，因为头文件中没这个声明，编译器会报错，但运行没问题
console.log(w.papa)

//papa = 300      //直接通过全局变量访问，虽然编译器不报错，但node运行时会报错
```

编译后的代码：

```js
/// <reference types="mylib0427" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const w = require("mylib0427");   //加载模块
console.log(process.cwd());
console.log(w.a);
w.changeA(100);
console.log(w.a);
w.papa = 200;
console.log(w.papa);
```

## 贡献头文件`

参考<http://definitelytyped.org/guides/contributing.html>以及<https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html>

