/*
一、 迭代器
需要定义好next()方法，以及迭代完的返回值done
*/

// 创建range迭代器
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function() {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true }
    }
  };
  return rangeIterator;
}

// 使用range迭代器处理数据
let it = makeRangeIterator(1, 10, 2);
let result = it.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}
console.log("Iterated over sequence of size: ", result.value); // 5

/*
二、 生成器
*/

// 使用生成器同样可以达到上例效果
function* makeRangeIterator(start = 0, end = 100, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}

// 生成器也可以使用yield接收数据
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    let reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}

const sequence = fibonacci();
console.log(sequence.next().value);     // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3
console.log(sequence.next().value);     // 5
console.log(sequence.next().value);     // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2

/*
三、 可迭代的
一个对象拥有可迭代行为，如for...of的遍历，那么该对象为可迭代对象
为实现可迭代，对象必须实现 @@iterator方法，意味着该对象或其原型链中的任一对象必须具有一个带Symbol.iterator键的属性
*/

// 自定义可迭代对象
var myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}
for (let value of myIterable) {
  console.log(value);
} // 1  2  3


// 专用于可迭代对象的语法

for (let value of ['a', 'b', 'c']) {
  console.log(value);
}

[...'abc']; // ["a", "b", "c"]

function* gen() {
  yield* ['a', 'b', 'c'];
}
gen().next(); // { value: "a", done: false }

[a, b, c] = new Set(['a', 'b', 'c']);
a; // "a"