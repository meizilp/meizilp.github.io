# 模块

* 任何包含顶级`import`或`export`的文件都是一个模块。
* 默认情况下某个模块中的变量、函数、类等在此模块外部是不可见的。
* 模块中通过`export`导出的内容才可以在此模块外通过`import`导入后使用。

## 导出

### 在声明上导出

在声明前增加export关键字，interface、class也是如此。

```ts
export const numberRegexp = /^[0-9]+$/;
```

### 通过导出语句导出

单独书写一个`export {导出内容}`或者`export {导出内容 as 新名字}`语句导出。  
同一个部分可以同时通过多个名字导出，导入时使用哪个名字都可以。  
但是不能导入名字1，而使用名字2，没有被明确导入的名字是不能被编译器识别到的。

```ts
class ZipCodeValidator {
    //...
}
export { ZipCodeValidator };    //直接通过导出语句导出。export {要导出的内容}
export { ZipCodeValidator as mainValidator };   //导出时也可以重新指定一个名称。导入时就要用新名称才行了。
```

### 重新导出其他模块的内容

```ts
export interface m1_1 { //通过声明导出本模块的接口
    name: string
}

interface m1_2 {
    name: string
}
export { m1_2 } //通过语句导出本模块的接口

import { m2_1 } from './modules2';
export { m2_1 }     //已经导入的可以再次被导出

export { m2_2 as m22} from './modules2'   //不先导入，直接就把其它模块的内容再次导出
export * from './modules3'  //直接把其它模块的所有内容导出

let m21: m2_1 = { name: "m21" }     //已经导入的可以在本文件中使用
//let m22: m2_2 = { name: "m22" }   //但是如果只是通过export转手一次，被转手的并不能直接在本文件中使用
```

看一下使用的代码：

```ts
import { m1_1 } from './modules1'               //modules1自己定义并导出的接口
import { m1_2 as m12 } from './modules1'        //modules1自定义的接口，导入时改个名字
import { m2_1, m22 } from './modules1'          //通过modules1中转的接口
import { m3_1 } from './modules1'               //modules3中定义的所有都通过modules1中转过来了

let o11: m1_1 = { name: "m1_1" }        //导入的原来的名字
let o12: m12 = { name: "m1_2" }         //只能用新名字m12，而不能用原来的名字
let o21: m2_1 = { name: "m2_1" }
let o22: m22 = { name: "m2_2" }
let o31: m3_1 = { name: "m3_1" }
```

重新导出最常见的用途是一个库中多个模块的导出汇总到一个模块文件中，方便导入时使用。

## 导入

```ts
import { ZipCodeValidator } from "./ZipCodeValidator";  //从指定模块导入指定内容，要用{}包括起来，名字要和导出的一致
let myValidator = new ZipCodeValidator();

import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";   //导入时还可以把导入内容重命名
let myValidator = new ZCV();

import * as validator from "./ZipCodeValidator";    //也可以整个模块导入
let myValidator = new validator.ZipCodeValidator(); //此时使用模块中内容时就要通过'.'操作符了

import "./my-module.js";    //单纯的建立关联关系，不关心导入了什么。一般用于引入一些全局变量。
```

## 默认导出

每个模块可以有最多不超过一个的默认导出。默认导出使得导入时可以更方便。  
因为默认导出是唯一的，所以导入时不需要通过导出名字来确定要导入的内容，所以默认导出甚至可以没有名字。  
默认导出的内容和普通导出的内容的导入形式是不同的。  

直接导出数字作为默认：
  ```ts
  export default 123
  import num from "./number"      //导入时命名
  ```
分离式导出接口作为默认(接口只能通过分离这种才能作为default导出)：
  ```ts
  interface m1_2 {
      name: string
  }
  export default m1_2     //导出前面声明的接口
  ```
直接在类的实现上指明导出作为默认(函数也可以这么干）：
  ```ts
  export default class ZipCodeValidator {
    //...
  }
  import validator from "./ZipCodeValidator";   //导入时不用{}，可以用不同的名字
  let myValidator = new validator();
  ```
省略作为默认导出的函数的名字：
  ```ts
  export default function (s: string) {     //函数可以没有名字。类也可以这么干，但是接口不行。
      //...
  }
  ```

## 外部模块

外部模块通过声明来使用，这些声明保存在`.d.ts`类型的头文件中。  
可以每个模块一个头文件，也可以通过`module`关键字把多个模块保存在一个头文件中。  

```ts
declare module "myurl" {        //declare module "模块名称"
    export interface Url {      //只有export的才能被看到
        proto?: string
        path?: string
    }
    export default function parse(url: string): string  //可以有default
}

declare module "mypath" {   //第二个模块
    export let sep: string
    export default function normalize(p: string): string    //也可以有个default
}
```

使用的时候，只要`.d.ts`文件能够被编译器按照路径搜索规则找到，那么就可以使用这个模块。

```ts
import { Url } from 'myurl';    //导入某个内容
import pf from 'myurl'  //导入默认的内容
import * as url from 'myurl'    //导入全部内容
```

有时有的js库没有头文件，可以快速写一个模块声明，然后就能用了。

```ts
declare module "hot-new-module";
```

```ts
import x, {y} from "hot-new-module";    //所有的内容都被当作any类型
x(y);
```

## 创建模块的建议

* 尽可能的在顶层导出。
* 如果仅导出单个class或者function，那么用default来默认导出。
* 使用明确的名字导入。但如果要导入大量内容时，建议使用`import * as XXX from "module"`形式的导入。
* 使用重新导出对已有模块进行扩展。(新类从原类继承，新类导出时使用原类的名字，导入的地方改成从扩展后的模块导入，这样导入的实际就是扩展后的新类了，虽然名字还是原类的名字)
