/*
  18 - 获取元组长度
  -------
  by sinoon (@sinoon) #简单 #tuple

  ### 题目

  创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

  例如：

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > 在 Github 上查看：https://tsch.js.org/18/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Length<T> = any

// Solution:
type Length<T extends readonly any[]> = T['length']

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/18/answer/zh-CN
  > 查看解答：https://tsch.js.org/18/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

// Note;
// 知识点：
//  索引访问类型 Indexed Access Types
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
// type[Key] 语法：通过键名访问类型属性的类型
// 键名key必须是字面量或联合类型：这里是字符串字面量 'length'

// T['length'] 取元组的长度，length就是元祖所具有的属性，即key
const test = ['123', '456'] as const
type a = typeof test['length']
// a = 2

// 类似的 T[number] 取元组中的每个元素 获取联合类型
// T[number] 表示：访问类型 T 的所有数字索引对应的值类
const test2 = ['123', '456'] as const
type b = typeof test2[number]
// b = '123' | '456'
