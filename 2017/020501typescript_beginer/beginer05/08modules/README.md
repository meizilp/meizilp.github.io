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
