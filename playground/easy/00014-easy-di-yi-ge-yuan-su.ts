/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

  例如：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // 应推导出 'a'
  type head2 = First<arr2> // 应推导出 3
  ```

  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type First<T extends any[]> = any

// Solution:
// type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never
// your answers
//answer1
// type First<T extends any[]> = T extends [] ? never : T[0]

//answer2
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

//answer3
type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14/answer/zh-CN
  > 查看解答：https://tsch.js.org/14/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/


// Note: 
// 三种方法

// your answers
//answer1
// type First<T extends any[]> = T extends [] ? never : T[0]

// //answer2
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

//answer3
// type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never
// 知识点：
// infer A：推断数组第一个元素的类型

// ...infer rest：推断剩余数组元素的类型（使用解构语法）

// infer 只能在 extends 条件类型的子句中使用

// 空数组情况下 infer A  不会推断出undefined吗？
// 空数组 [] 无法匹配模式 [infer A, ...infer rest]
// 因为模式要求至少有一个元素（infer A）
// 所以直接进入 false 分支，返回 never


// infer的例子：
// https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%BB%8B%E7%BB%8D
// type ParamType<T> = T extends (arg: infer P) => any ? P : T;
// interface User {
//   name: string;
//   age: number;
// }

// type Func = (user: User) => void;

// type Param = ParamType<Func>; // Param = User
// type AA = ParamType<string>; // string
// 整句表示为：如果 T 能赋值给 (arg: infer P) => any，则结果是 (arg: infer P) => any 类型中的参数 P，否则返回为 T。
