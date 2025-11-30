/*
  4 - 实现 Pick
  -------
  by Anthony Fu (@antfu) #简单 #union #built-in

  ### 题目

  不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

  **从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > 在 Github 上查看：https://tsch.js.org/4/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type MyPick<T, K> = any

// Solution:
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4/answer/zh-CN
  > 查看解答：https://tsch.js.org/4/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/




// Note:
// 题解：https://github.com/type-challenges/type-challenges/issues/13427
// 知识点：
// keyof: 取interface的键后保存为联合类型
interface userInfo {
  name: string
  age: number
}
type keyofValue = keyof userInfo
// keyofValue = "name" | "age"

// in: 取联合类型的值，主要用于数组和对象的构建
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}

// 用于实际开发，举个例子：
// function getValue(o:object, key: string){
//   return o[key]
// }
// const obj1 = { name: '张三', age: 18 }
// const values = getValue(obj1, 'name')

// 这样写丧失了ts的优势：
// 无法确定返回值类型
// 无法对key进行约束

function getValue<T extends Object,K extends keyof T>(o: T,key: K): T[K] {
  return o[key]
}
const obj1 = { name: '张三', age: 18}
const values = getValue(obj1, 'name')
// 如果第二个参数不是obj1中的参数就会报错
