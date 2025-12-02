/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #简单 #promise #built-in

  ### 题目

  假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

  例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > 这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)

  > 在 Github 上查看：https://tsch.js.org/189/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type MyAwaited<T> = any
type MyPromise<T> = Promise<T> | {
  then: (onfulfilled: (arg: T) => any) => any
}
type MyAwaited<T extends MyPromise<any>> = T extends MyPromise<infer U> ? (U extends MyPromise<any> ? MyAwaited<U> : U) : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/189/answer/zh-CN
  > 查看解答：https://tsch.js.org/189/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

// Note:
// 知识点：

// never 类型
//  never 是 TypeScript 的底部类型
// 在联合类型中会被自动过滤掉
// type Test = 'a' | never | 'b'  // 'a' | 'b'

// infer 类型推断
// 在类型中使用 infer 类型推断，获取实际的类型中
// infer U 就是推断出U类型
// 例如：
// type MyAwaited<T extends MyPromise<any>> = T extends MyPromise<infer U> ? (U extends MyPromise<any> ? MyAwaited<U> : U) : never
// 这里的 infer U 就是类型推断，获取类型中的类型

// 类型递归(type recursion)
// 在类型中使用递归，获取深层次的类型
