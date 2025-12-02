/*
  43 - 实现 Exclude
  -------
  by Zheeeng (@zheeeng) #简单 #built-in #union

  ### 题目

  实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

  > 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

  例如：

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > 在 Github 上查看：https://tsch.js.org/43/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type MyExclude<T, U> = any

// type MyExclude<T, U extends T> = keyof {
//   [P in keyof T ]: (P extends U ? never : P)
// }
type MyExclude<T, U > = T extends U ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/43/answer/zh-CN
  > 查看解答：https://tsch.js.org/43/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

// Note：

// T extends U 是如何检查的：主要分为三种，基本类型检查，联合类型检查，对象类型检查

// a) 联合类型，采取分配检查（遍历），例如：
// 对于 T extends U，当 T 是 A | B | C 时：
// 1. 拆分成 A extends U, B extends U, C extends U
// 2. 每个结果用 | 连接
// 上述题目的过程是：
// type Example = MyExclude<'a' | 'b' | 'c', 'a'>
// 等价于：
// ('a' extends 'a' ? never : 'a') |
// ('b' extends 'a' ? never : 'b') |
// ('c' extends 'a' ? never : 'c')
// = never | 'b' | 'c' = 'b' | 'c'

// b)对象类型检查
//   // 1. 属性存在性
//   type T1 = { name: string }
//   type U1 = { name: string; age: number }
//   type R1 = T1 extends U1 ? true : false  // false，T1 缺少 age

//   // 2. 属性类型兼容性
//   type T2 = { getName(): string }
//   type U2 = { getName: () => string }
//   type R2 = T2 extends U2 ? true : false  // true，函数类型兼容
//  type Test2 = () => void extends Function ? true : false     // true （函数类型兼容，不是完全相等）
//   type Test2 = () => number extends Function ? true : false     //

//   // 3. 可选属性
//   type T3 = { name?: string }
//   type U3 = { name: string }
//   type R3 = T3 extends U3 ? true : false  // false，可选不能赋给必需
//   type R4 = U3 extends T3 ? true : false  // true，必需可以赋给可选

// never 类型
//  never 是 TypeScript 的底部类型
// type T1 = never extends string ? true : false  // true
// type T2 = string extends never ? true : false  // false
// 在联合类型中会被自动过滤掉
// type Test = 'a' | never | 'b'  // 'a' | 'b'
